import { business } from '@content/business'
import { Container, Heading, Pill, Section } from '@shared/ui'

import { FloatingCard } from './FloatingCard'

/**
 * template.md hero, unchanged: full viewport, Sage ground, 23vw Anton
 * centrepiece with 0.05s per-letter stagger, 2 floating organic cards with
 * parallax, dual-column bottom with descriptive text and a location label.
 */
export function Hero() {
  const word = business.name.split(' ')[0] ?? business.name

  return (
    <Section
      tone="sage"
      id="hero"
      labelledBy="site-title"
      className="flex min-h-svh flex-col justify-center overflow-hidden pt-32 pb-20"
    >
      <FloatingCard
        name="milkmanContainerShoulder"
        alt=""
        factor={1.4}
        className="top-[12%] -left-[10%] w-[36%] max-w-[260px] md:top-[14%] md:-left-[2%] md:w-[19%]"
      />
      <FloatingCard
        name="milkmanWithCow"
        alt=""
        factor={-1}
        className="right-[-12%] bottom-[6%] w-[42%] max-w-[280px] md:right-[-3%] md:bottom-[4%] md:w-[21%]"
      />

      <Container width="wide" className="relative z-10">
        <div className="flex justify-center">
          <Pill>{business.badge}</Pill>
        </div>

        <Heading
          as="h1"
          variant="hero"
          id="site-title"
          className="-mx-6 mt-6 pb-[0.12em] text-center whitespace-nowrap md:-mx-10"
        >
          {/* Screen readers get the plain word; the staggered spans are decoration. */}
          <span className="sr-only">{business.name}</span>
          <span aria-hidden="true">
            {word.split('').map((letter, i) => (
              <span
                key={`${letter}-${String(i)}`}
                className="letter"
                style={{ animationDelay: `${String(i * 0.05)}s` }}
              >
                {letter}
              </span>
            ))}
          </span>
        </Heading>

        <p className="mt-6 text-center font-body text-[11px] font-bold tracking-[0.4em] text-forest uppercase md:text-[13px]">
          {business.wordmarkTagline}
        </p>

        <div className="mt-16 grid gap-8 border-t border-forest/20 pt-8 md:grid-cols-2 md:gap-16">
          <p className="font-display text-3xl leading-[0.95] tracking-[-0.02em] text-forest md:text-5xl">
            {business.scriptHeadline}
          </p>
          <div className="flex items-end justify-start">
            <p className="font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
              {business.address.city}, {business.address.state}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
