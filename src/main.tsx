import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (PLAN.md B5): keeps style-src 'self' with no Google Fonts
// exception, and removes a render-blocking third-party round trip.
// latin subsets only — the site is English; unicode-range keeps the rest out.
import '@fontsource/anton/latin-400.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-700.css'

import { ContentProvider } from '@shared/i18n'

import { App } from './app/App'
import './styles/global.css'

const root = document.getElementById('root')
if (!root) throw new Error('#root not found in index.html')

createRoot(root).render(
  <StrictMode>
    {/* The provider wraps App rather than living inside it, because the error
        boundary's fallback also reads content — it must resolve even when App
        itself has failed. */}
    <ContentProvider locale="en">
      <App />
    </ContentProvider>
  </StrictMode>,
)
