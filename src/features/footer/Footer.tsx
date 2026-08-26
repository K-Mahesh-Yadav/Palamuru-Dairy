import { useContent } from '@shared/i18n'
import { formatPhone, telHref, whatsappHref } from '@shared/lib'
import { Container, Heading } from '@shared/ui'

/**
 * template.md footer: Forest ground, Sage text, 12-column grid split 6/6.
 * Structure unchanged. Two content changes, both from PLAN.md:
 *
 *  - A6/Risk 5: the newsletter signup is gone. No form, no list, no backend.
 *    The left 6 columns carry contact details instead.
 *  - A5.3: the bottom row is a full-bleed gold strip carrying the banner's
 *    "PURE FOOD - PURE LIFE - PURE YOU". The copyright line moves from
 *    template.md's 30% opacity to Moss at 100%, because Sage at 30% over
 *    Forest computes to ~1.9:1 and fails. Moss at 100% is 5.18:1.
 */
export function Footer() {
  const { business, navItems, ui } = useContent()
  const year = new Date().getFullYear()

  return (
    <footer className="relative rounded-t-section bg-forest text-sage">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 rounded-t-section bg-gold"
      />

      <Container width="wide" className="py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <Heading as="h2" variant="card" className="text-cream">
              {business.name}
            </Heading>
            <p className="mt-4 font-body text-[11px] font-bold tracking-[0.3em] text-sage uppercase">
              {business.wordmarkTagline}
            </p>

            <address className="mt-10 font-body text-sm leading-relaxed text-sage not-italic">
              {business.address.line1}
              <br />
              {business.address.line2}
              <br />
              {business.address.city}, {business.address.state}
            </address>

            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href={telHref(business.phone)} className="font-bold text-gold hover:opacity-80">
                {formatPhone(business.phone)}
              </a>
              <a
                href={whatsappHref(business.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-gold hover:opacity-80"
              >
                {ui.nav.whatsapp}
              </a>
            </p>

            {business.fssai ? (
              <p className="mt-6 font-body text-xs tracking-[0.15em] text-sage uppercase">
                {ui.footer.fssaiPrefix} {business.fssai}
              </p>
            ) : null}
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
              {ui.footer.explore}
            </p>
            <ul className="mt-6 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[11px] font-bold tracking-[0.2em] text-sage uppercase hover:opacity-70"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.3em] text-gold uppercase">
              {ui.footer.privacy}
            </p>
            <p className="mt-6 font-body text-xs leading-relaxed text-sage">
              {ui.footer.privacyNote}
            </p>
          </div>
        </div>
      </Container>

      <div className="bg-gold">
        <Container width="wide">
          <p className="py-4 text-center text-[11px] font-bold tracking-[0.3em] text-forest uppercase">
            {business.bottomStrip}
          </p>
        </Container>
      </div>

      <Container width="wide">
        <p className="py-6 text-center text-[11px] tracking-[0.2em] text-moss uppercase">
          &copy; {year} {business.name}
        </p>
      </Container>
    </footer>
  )
}
