import type { UiStrings } from '../types'

/**
 * UI chrome — every user-facing string that is NOT business copy from the
 * banner. These lived inline in JSX until the i18n work; a component may no
 * longer contain a literal a user can read.
 *
 * Unlike business.ts, these are not transcribed from the banner. They are
 * interface labels, so they are ours to write — and ours to translate.
 */
export const ui: UiStrings = {
  skipToContent: 'Skip to content',

  nav: {
    menu: 'Menu',
    close: 'Close',
    primaryLabel: 'Primary',
    call: 'Call',
    whatsapp: 'WhatsApp',
    /** Names THIS language, shown on the switcher that leads to it. */
    languageName: 'English',
    switchLanguageLabel: 'Switch language',
  },

  products: {
    heading: 'Products',
    /** Circular CTA beside the section heading. */
    action: 'Visit us',
    /** Per-card CTA revealed on hover/focus. */
    enquire: 'Enquire',
    /** {product} is substituted. Prefilled WhatsApp message. */
    enquiryMessage: "Hi {business}! I'd like to know more about {product}.",
  },

  honey: {
    heading: 'Honey',
  },

  visit: {
    heading: 'Visit',
    address: 'Address',
    mobile: 'Mobile',
    hours: 'Hours',
    deliveryAreas: 'We deliver to',
    callNow: 'Call now',
    orderOnWhatsapp: 'Order on WhatsApp',
    openInMaps: 'Open in Maps',
    orderMessage: "Hi {business}! I'd like to place an order.",
  },

  footer: {
    explore: 'Explore',
    privacy: 'Privacy',
    /** Must stay factually true — see PLAN.md B5 "What data this site collects". */
    privacyNote:
      'This site sets no cookies, runs no analytics and has no contact form. It collects no personal data of any kind. Calling or messaging us uses your own phone or WhatsApp.',
    fssaiPrefix: 'FSSAI Lic. No.',
  },

  error: {
    message: 'Something went wrong loading this page. You can still reach us directly.',
  },

  alt: {
    milkingTheCow: 'A dairy farmer milking a cow by hand into a pail.',
    deliveryMotorbike: 'A milkman setting off to deliver milk on his motorbike.',
  },
}
