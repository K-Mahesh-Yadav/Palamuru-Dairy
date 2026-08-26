import { About } from '@features/about'
import { BenefitsBand } from '@features/benefits'
import { Footer } from '@features/footer'
import { Hero } from '@features/hero'
import { HoneyRange } from '@features/honey'
import { Nav } from '@features/nav'
import { Products } from '@features/products'
import { Visit } from '@features/visit'
import { useHashScroll } from '@shared/hooks'

export function App() {
  useHashScroll()

  return (
    <>
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
    </>
  )
}
