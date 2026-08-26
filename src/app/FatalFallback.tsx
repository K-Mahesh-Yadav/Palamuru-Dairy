import { useContent } from '@shared/i18n'
import { formatPhone, telHref } from '@shared/lib'

/**
 * Static, dependency-light fallback. Uses no hooks, no lazy imports and no
 * illustrations, so it can render even when the rest of the app cannot.
 */
export function FatalFallback() {
  const { business, ui } = useContent()

  return (
    <main id="main" className="flex min-h-svh items-center justify-center bg-cream p-8 text-forest">
      <div className="max-w-md text-center">
        <h1 className="font-display text-5xl uppercase">{business.name}</h1>
        <p className="mt-4 font-body text-[11px] font-bold tracking-[0.3em] uppercase">
          {business.wordmarkTagline}
        </p>
        <p className="mt-10 font-body text-sm leading-relaxed">{ui.error.message}</p>
        <p className="mt-6 font-display text-4xl">
          <a href={telHref(business.phone)}>{formatPhone(business.phone)}</a>
        </p>
        <address className="mt-6 font-body text-sm not-italic">
          {business.address.line1}
          <br />
          {business.address.line2}
          <br />
          {business.address.city}, {business.address.state}
        </address>
      </div>
    </main>
  )
}
