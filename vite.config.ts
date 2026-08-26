import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig, type Plugin } from 'vitest/config'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
/**
 * Preload the display font.
 *
 * The hero headline is the LCP element and it is set in Anton, so LCP is
 * font-dependent. Filenames are content-hashed, so the tag has to be injected
 * after the bundle is known rather than hardcoded in index.html.
 * PLAN.md B6: when LCP misses, preload the Anton subset — do not shrink type.
 */
function preloadDisplayFont(): Plugin {
  let href = ''
  return {
    name: 'preload-display-font',
    apply: 'build' as const,
    generateBundle(_options: unknown, bundle: Record<string, unknown>) {
      const match = Object.keys(bundle).find((f) => /anton.*\.woff2$/.test(f))
      href = match === undefined ? '' : `/${match}`
    },
    transformIndexHtml() {
      if (href === '') return []
      return [
        {
          tag: 'link',
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: '' },
          injectTo: 'head-prepend',
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
