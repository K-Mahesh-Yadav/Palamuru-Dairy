import { About } from '@features/about'
import { BenefitsBand } from '@features/benefits'
import { Footer } from '@features/footer'
import { Hero } from '@features/hero'
import { HoneyRange } from '@features/honey'
import { Nav } from '@features/nav'
import { Products } from '@features/products'
import { Visit } from '@features/visit'
import { useHashScroll } from '@shared/hooks'

import { ErrorBoundary } from './ErrorBoundary'
import { FatalFallback } from './FatalFallback'

/**
 * NO LAZY LOADING — deliberately, after measuring (PLAN.md B4.6).
 *
 * The plan proposed React.lazy + Suspense for the below-the-fold sections and
 * said to delete it if measurement showed under 10 KB saved. It was built,
 * measured in Chrome, and removed:
 *
 *   - saving was 2.34 KB gzipped (76.08 -> 73.74)
 *   - it deferred NOTHING. React.lazy inside a rendered <Suspense> starts
 *     every import on mount, so all 11 chunks were requested within 244ms at
 *     scrollY 0. Real deferral would need viewport-gated mounting, which is
 *     machinery a seven-section brochure site does not earn.
 *   - the actual page weight is the illustrations, and those are deferred by
 *     loading="lazy" on the img elements, which works with or without this.
 *
 * The error boundary below is kept: its justification is independent — a
 * stale CDN cache can still break a render, and the fallback shows the phone
 * number as static markup.
 */
export function App() {
  useHashScroll()

  return (
    <ErrorBoundary fallback={<FatalFallback />}>
      <div className="noise-overlay" aria-hidden="true" />

      <a
        href="#main"
        className="sr-only bg-forest text-cream focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-6 focus:py-3 focus:text-[11px] focus:font-bold focus:tracking-[0.2em] focus:uppercase"
      >
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <Products />
        <HoneyRange />
        <About />
        <BenefitsBand />
        <Visit />
      </main>

      <Footer />
    </ErrorBoundary>
  )
}
