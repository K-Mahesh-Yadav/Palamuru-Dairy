import { useReveal } from '@shared/hooks'
import { useContent } from '@shared/i18n'
import { Container, Icon, Section } from '@shared/ui'

/** The banner's four-item benefits strip. */
export function BenefitsBand() {
  const { benefits } = useContent()
  const { ref, revealed } = useReveal<HTMLUListElement>()

  return (
    <Section tone="cream" className="py-16 md:py-20">
      <Container width="wide">
        <ul
          ref={ref}
          className="grid grid-cols-1 gap-8 rounded-[2rem] border border-forest/15 p-8 sm:grid-cols-2 md:grid-cols-4 md:p-10"
        >
          {benefits.map((benefit, i) => (
            <li
              key={benefit.id}
              className="reveal flex items-center gap-4"
              data-revealed={revealed}
              style={{ transitionDelay: `${String(i * 0.08)}s` }}
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                <Icon name={benefit.icon} className="h-5 w-5" />
              </span>
              <span className="font-body text-xs leading-tight font-bold tracking-[0.15em] text-forest uppercase">
                {benefit.label}
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
