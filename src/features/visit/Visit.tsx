import { useReveal } from '@shared/hooks'
import { interpolate, useContent } from '@shared/i18n'
import { formatPhone, mapsHref, telHref, whatsappHref } from '@shared/lib'
import { Button, Container, Heading, Illustration, Section } from '@shared/ui'

/**
 * Replaces template.md's newsletter block (PLAN.md A6, Risk 5).
 *
 * THERE IS NO FORM ON THIS SITE. That is a security decision, not an omission
 * (PLAN.md B5): no endpoint, no PII, no validation library, no honeypot, no
 * rate limiter, and connect-src can stay 'none'. The conversion path is a
 * phone call or a WhatsApp message.
 *
 * `hours` and `deliveryAreas` are not on the banner and have not been
 * supplied. Their blocks render nothing at all while the values are absent —
 * no "coming soon", no placeholder.
 */
export function Visit() {
  const { business, ui } = useContent()
  const { ref, revealed } = useReveal()

  const fullAddress = [
    business.address.line1,
    business.address.line2,
    business.address.city,
    business.address.state,
    business.address.pincode,
  ]
    .filter((part): part is string => part !== undefined)
    .join(', ')

  return (
    <Section tone="olive" id="visit" labelledBy="visit-title" roundTop seam>
      <Container width="wide">
        <div ref={ref} className="reveal" data-revealed={revealed}>
          <Heading as="h2" variant="section" id="visit-title">
            {ui.visit.heading}
          </Heading>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                {ui.visit.address}
              </p>
              <address className="mt-4 font-display text-2xl leading-tight text-forest not-italic md:text-3xl">
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.city}, {business.address.state}
              </address>

              <p className="mt-10 font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                {ui.visit.mobile}
              </p>
              <p className="mt-4 font-display text-4xl text-forest md:text-5xl">
                <a href={telHref(business.phone)} className="hover:opacity-70">
                  {formatPhone(business.phone)}
                </a>
              </p>

              {business.hours ? (
                <>
                  <p className="mt-10 font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                    {ui.visit.hours}
                  </p>
                  <ul className="mt-4 space-y-1 font-body text-sm text-forest">
                    {business.hours.map((h) => (
                      <li key={h.days}>
                        <span className="font-bold">{h.days}</span> — {h.time}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}

              {business.deliveryAreas ? (
                <>
                  <p className="mt-10 font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                    {ui.visit.deliveryAreas}
                  </p>
                  <p className="mt-4 font-body text-sm text-forest">
                    {business.deliveryAreas.join(' · ')}
                  </p>
                </>
              ) : null}

              <div className="mt-12 flex flex-wrap gap-3">
                <Button href={telHref(business.phone)} tone="forest">
                  {ui.visit.callNow}
                </Button>
                <Button
                  href={whatsappHref(
                    business.whatsapp,
                    interpolate(ui.visit.orderMessage, { business: business.name }),
                  )}
                  external
                  tone="gold"
                >
                  {ui.visit.orderOnWhatsapp}
                </Button>
                <Button href={mapsHref(fullAddress)} external variant="ghost" tone="forest">
                  {ui.visit.openInMaps}
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-float bg-cream/50">
              <Illustration name="deliveryMotorbike" alt={ui.alt.deliveryMotorbike} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
