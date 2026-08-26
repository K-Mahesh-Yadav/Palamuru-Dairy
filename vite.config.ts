import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, type Plugin } from 'vitest/config'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
/**
 * Preload each document's display font.
 *
 * The hero headline is the LCP element, so LCP is font-dependent — and the two
 * locales use different families (Anton has no Telugu glyphs). Filenames are
 * content-hashed, so the tag must be injected once the bundle is known.
 * PLAN.md B6: when LCP misses, preload the display subset — do not shrink type.
 */
function preloadDisplayFont(): Plugin {
  /** entry name -> regex matching its display font file */
  const WANTED: Record<string, RegExp> = {
    en: /anton.*\.woff2$/,
    te: /noto-sans-telugu-telugu-800.*\.woff2$/,
  }
  // Optional-valued: a lookup genuinely can miss if a font fails to emit,
  // and vite.config.ts is checked without noUncheckedIndexedAccess.
  const found: Record<string, string | undefined> = {}

  return {
    name: 'preload-display-font',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      const files = Object.keys(bundle)
      for (const [entry, pattern] of Object.entries(WANTED)) {
        const match = files.find((f) => pattern.test(f))
        if (match !== undefined) found[entry] = `/${match}`
      }
    },
    transformIndexHtml(_html: string, ctx: { path?: string }) {
      // ctx.path is '/index.html' or '/te/index.html'.
      const entry = ctx.path?.includes('/te/') === true ? 'te' : 'en'
      const href = found[entry]
      if (href === undefined) return []
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '' },
          injectTo: 'head-prepend' as const,
        },
      ]
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadDisplayFont()],

  resolve: {
    // MUST mirror `paths` in tsconfig.app.json. TS paths drive type resolution
    // only; these drive runtime resolution. Both have to be edited together.
    alias: {
      '@': r('./src'),
      '@shared': r('./src/shared'),
      '@features': r('./src/features'),
      '@content': r('./src/content'),
    },
  },

  build: {
    rollupOptions: {
      // One static HTML document per locale. No router: the original plan
      // chose extra entries over routing, and a language switch is a page
      // navigation anyway. Real URLs mean Google can index both.
      input: {
        en: r('./index.html'),
        te: r('./te/index.html'),
      },
    },

    // Audience is Indian mobile Chrome — es2022 is safe and cuts transpile weight.
    target: 'es2022',
    // No error-tracking service consumes them; don't ship source of a commercial site.
    sourcemap: false,
    // Prevents Vite emitting an inline <script> that would need a CSP hash.
    // Keeps `script-src 'self'` viable with no 'unsafe-inline'. See PLAN.md B5.
    modulePreload: { polyfill: false },
    // NOTE: `rollupOptions.output.manualChunks` is deliberately omitted. A
    // brochure site does not need manual chunking; the React.lazy boundaries
    // in src/app/App.tsx already split it.
  },

  server: { port: 5173 },
  preview: { port: 4173 },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    css: false,
    include: ['src/**/*.test.{ts,tsx}', 'tests/**/*.test.{ts,tsx}'],
  },
})
