import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vitest/config'

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

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
