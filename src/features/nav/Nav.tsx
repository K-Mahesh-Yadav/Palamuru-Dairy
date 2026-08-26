import { business } from '@content/business'
import { navItems } from '@content/nav'
import { telHref, whatsappHref } from '@shared/lib'

import { useMobileMenu } from './useMobileMenu'

/**
 * template.md header, structure unchanged: fixed top bar, centre pill nav with
 * backdrop-blur, 10px bold uppercase links.
 *
 * DEVIATION FROM template.md (PLAN.md A6, Risk 4): the cart button with its
 * numeric counter is replaced by Call / WhatsApp pills. There is no
 * e-commerce; a cart would be a lie.
 */
export function Nav() {
  const { open, toggle, close, triggerRef } = useMobileMenu()

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[110rem] items-center justify-between px-6 py-5 md:px-10">
        <a href="#main" className="font-display text-lg tracking-[-0.02em] text-forest uppercase">
          <span aria-hidden="true">&ndash;</span> {business.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-2 backdrop-blur-[20px]">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-forest uppercase transition-colors duration-300 ease-signature hover:bg-white/30"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref(business.phone)}
            className="rounded-full bg-forest px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-cream uppercase transition-opacity duration-300 ease-signature hover:opacity-85"
          >
            Call
          </a>
          <a
            href={whatsappHref(business.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-forest uppercase transition-opacity duration-300 ease-signature hover:opacity-85 sm:block"
          >
            WhatsApp
          </a>

          <button
            ref={triggerRef}
            type="button"
            onClick={toggle}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="rounded-full border border-forest/30 px-4 py-2.5 text-[10px] font-bold tracking-[0.2em] text-forest uppercase md:hidden"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label="Primary"
          className="mx-6 rounded-3xl border border-forest/10 bg-cream p-4 shadow-lg md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={close}
                  className="block px-4 py-3 text-[11px] font-bold tracking-[0.2em] text-forest uppercase"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  )
}
