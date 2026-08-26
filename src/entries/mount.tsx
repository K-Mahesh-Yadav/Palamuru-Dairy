import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import type { Locale } from '@content/index'
import { ContentProvider } from '@shared/i18n'

import { App } from '../app/App'

/**
 * Shared mount for every locale entry. Each entry imports only its own fonts
 * and calls this — which is what keeps Telugu's 94.6 KB of webfont off the
 * English page entirely.
 */
export function mount(locale: Locale): void {
  const root = document.getElementById('root')
  if (!root) throw new Error('#root not found in index.html')

  createRoot(root).render(
    <StrictMode>
      {/* The provider wraps App rather than living inside it: the error
          boundary's fallback also reads content, so it must resolve even
          when App itself has failed. */}
      <ContentProvider locale={locale}>
        <App />
      </ContentProvider>
    </StrictMode>,
  )
}
