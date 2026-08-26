/**
 * tel: and wa.me builders.
 *
 * There is no contact form on this site (PLAN.md B5): these two links ARE the
 * conversion path, so a malformed one is a lost customer. Tested directly.
 */

/** Digits only, for building a dialable href. */
function digits(value: string): string {
  return value.replace(/[^\d]/g, '')
}

/**
 * `tel:` href. India country code is prepended when the number is a bare
 * 10-digit mobile, so the link dials correctly from outside India too.
 */
export function telHref(phone: string): string {
  const d = digits(phone)
  return d.length === 10 ? `tel:+91${d}` : `tel:+${d}`
}

/** Human-readable phone, grouped as Indian mobiles are normally written. */
export function formatPhone(phone: string): string {
  const d = digits(phone)
  return d.length === 10 ? `${d.slice(0, 5)} ${d.slice(5)}` : d
}

/**
 * wa.me deep link. `number` must already be E.164 without '+'.
 * The prefilled message is encoded; wa.me requires percent-encoding.
 */
export function whatsappHref(number: string, message?: string): string {
  const base = `https://wa.me/${digits(number)}`
  return message === undefined || message === ''
    ? base
    : `${base}?text=${encodeURIComponent(message)}`
}

/** Google Maps search link for a plain-text address. */
export function mapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
