import { business } from '@content/business'
import { useReveal } from '@shared/hooks'
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
            Visit
          </Heading>

          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                Address
              </p>
              <address className="mt-4 font-display text-2xl leading-tight text-forest not-italic md:text-3xl">
                {business.address.line1}
                <br />
                {business.address.line2}
                <br />
                {business.address.city}, {business.address.state}
              </address>

              <p className="mt-10 font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                Mobile
              </p>
              <p className="mt-4 font-display text-4xl text-forest md:text-5xl">
                <a href={telHref(business.phone)} className="hover:opacity-70">
                  {formatPhone(business.phone)}
                </a>
              </p>

              {business.hours ? (
                <>
                  <p className="mt-10 font-body text-[11px] font-bold tracking-[0.3em] text-forest/80 uppercase">
                    Hours
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
                    We deliver to
                  </p>
                  <p className="mt-4 font-body text-sm text-forest">
                    {business.deliveryAreas.join(' · ')}
                  </p>
                </>
              ) : null}

              <div className="mt-12 flex flex-wrap gap-3">
                <Button href={telHref(business.phone)} tone="forest">
                  Call now
                </Button>
                <Button
                  href={whatsappHref(
                    business.whatsapp,
                    `Hi ${business.name}! I'd like to place an order.`,
                  )}
                  external
                  tone="gold"
                >
                  Order on WhatsApp
                </Button>
                <Button href={mapsHref(fullAddress)} external variant="ghost" tone="forest">
                  Open in Maps
                </Button>
              </div>
            </div>

            <div className="overflow-hidden rounded-float bg-cream/50">
              <Illustration
                name="deliveryMotorbike"
                alt="A milkman setting off to deliver milk on his motorbike."
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
