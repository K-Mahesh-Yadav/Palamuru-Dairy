import { useReveal } from '@shared/hooks'
import { useContent } from '@shared/i18n'
import { Container, Heading, Icon, Illustration, Section } from '@shared/ui'

/**
 * The banner's four upper-right icon rows.
 *
 * These are MARKETING CLAIMS, NOT CERTIFICATIONS (PLAN.md A1). Rendered as
 * plain labelled rows — deliberately no seal, ribbon or badge chrome that
 * could read as third-party accreditation.
 *
 * A5.4: forest-filled circle with a gold glyph, exactly as the banner does.
 */
export function About() {
  const { business, claims, ui } = useContent()
  const { ref, revealed } = useReveal<HTMLUListElement>()

  return (
    <Section tone="sage" id="about" labelledBy="about-title" roundTop seam>
      <Container width="wide">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <Heading as="h2" variant="card" id="about-title" className="text-forest">
              {business.scriptHeadline}
            </Heading>

            <ul ref={ref} className="mt-12 space-y-8">
              {claims.map((claim, i) => (
                <li
                  key={claim.id}
                  className="reveal flex items-center gap-5"
                  data-revealed={revealed}
                  style={{ transitionDelay: `${String(i * 0.08)}s` }}
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-forest text-gold">
                    <Icon name={claim.icon} className="h-6 w-6" />
                  </span>
                  <span className="font-body text-sm font-bold tracking-[0.18em] text-forest uppercase">
                    {claim.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-float bg-cream/50">
            <Illustration name="milkingTheCow" alt={ui.alt.milkingTheCow} />
          </div>
        </div>
      </Container>
    </Section>
  )
}
