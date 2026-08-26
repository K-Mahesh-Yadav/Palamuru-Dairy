/**
 * Content types for Palamuru Dairy.
 *
 * DISCIPLINE: every field in the *business* types traces to the banner
 * transcription in PLAN.md A1. Optional fields are the things the banner does
 * NOT cover. With `exactOptionalPropertyTypes` on, an absent field is genuinely
 * absent — a section cannot render a placeholder for it, it renders nothing.
 * Never fabricate a value to fill one of these in.
 *
 * UiStrings is different: those are interface labels we author, not banner
 * copy, so they may be written and translated freely.
 */

/** Supported locales. `/` serves en, `/te/` serves te. */
export type Locale = 'en' | 'te'

/**
 * Illustration keys. Declared here rather than imported from @shared/assets so
 * that content stays a leaf layer (it may not import shared). A test asserts
 * this union stays in step with the actual asset barrel.
 */
export type IllustrationKey =
  | 'atTheLaptop'
  | 'deliveryMotorbike'
  | 'fillingContainer'
  | 'holdingMilkContainer'
  | 'milkingTheCow'
  | 'milkmanContainerShoulder'
  | 'milkmanWithCow'
  | 'servingCustomer'
  | 'twoContainers'
  | 'whiteboard'

/** A product in the main range. */
export interface Product {
  readonly id: string
  readonly name: string
  /** Verbatim descriptor from the banner. */
  readonly descriptor: string
  /**
   * Illustration for this product, or absent where no matching asset exists.
   * Honey, Sweets and Ice Creams have none — they render as typographic cards
   * rather than borrowing an unrelated image.
   */
  readonly image?: { readonly key: IllustrationKey; readonly alt: string }
  /** NOT ON THE BANNER. Stays undefined until a real price list exists. */
  readonly price?: string
}

/** One of the three honey varieties. */
export interface HoneyVariety {
  readonly id: string
  readonly name: string
  /** Exactly three, verbatim from the banner. */
  readonly bullets: readonly [string, string, string]
}

/** One of the four icon rows in the banner's upper right. */
export interface Claim {
  readonly id: string
  readonly label: string
  /** Key into the icon map in the about feature. */
  readonly icon: string
}

/** One of the four items in the banner's benefits strip. */
export interface Benefit {
  readonly id: string
  readonly label: string
  readonly icon: string
}

export interface NavItem {
  readonly label: string
  /** In-page anchor. Must match a Section id — asserted in content.test.ts. */
  readonly href: string
}

export interface BusinessInfo {
  readonly name: string
  readonly wordmarkTagline: string
  readonly scriptHeadline: string
  readonly badge: string
  readonly bottomStrip: string

  /** Ten digits, no country code — exactly as printed on the banner. */
  readonly phone: string
  /** E.164 without '+', for wa.me. */
  readonly whatsapp: string

  readonly address: {
    readonly line1: string
    readonly line2: string
    readonly city: string
    readonly state: string
    /** NOT ON THE BANNER. */
    readonly pincode?: string
  }

  /** NOT ON THE BANNER — awaiting the owner. Section hides while absent. */
  readonly hours?: readonly { readonly days: string; readonly time: string }[]
  /** NOT ON THE BANNER — awaiting the owner. Section hides while absent. */
  readonly deliveryAreas?: readonly string[]
  /** NOT ON THE BANNER. Legally required for an Indian food business. */
  readonly fssai?: string
  /** No email appears anywhere on the banner. */
  readonly email?: string
  /** No social handles appear anywhere on the banner. */
  readonly social?: readonly { readonly label: string; readonly href: string }[]
}

/** Interface labels. Not banner copy — see the note at the top of this file. */
export interface UiStrings {
  readonly skipToContent: string

  readonly nav: {
    readonly menu: string
    readonly close: string
    readonly primaryLabel: string
    readonly call: string
    readonly whatsapp: string
    /** The name of THIS language, in this language. Shown on the switcher. */
    readonly languageName: string
    readonly switchLanguageLabel: string
  }

  readonly products: {
    readonly heading: string
    readonly action: string
    readonly enquire: string
    /** Placeholders: {business}, {product}. */
    readonly enquiryMessage: string
  }

  readonly honey: {
    readonly heading: string
  }

  readonly visit: {
    readonly heading: string
    readonly address: string
    readonly mobile: string
    readonly hours: string
    readonly deliveryAreas: string
    readonly callNow: string
    readonly orderOnWhatsapp: string
    readonly openInMaps: string
    /** Placeholder: {business}. */
    readonly orderMessage: string
  }

  readonly footer: {
    readonly explore: string
    readonly privacy: string
    readonly privacyNote: string
    readonly fssaiPrefix: string
  }

  readonly error: {
    readonly message: string
  }

  /**
   * Alt text for the section illustrations, keyed by illustration.
   * Alt text is read aloud, so it is user-facing copy and must be translated.
   * Product-card alts live on the product itself, beside the product name.
   */
  readonly alt: {
    readonly milkingTheCow: string
    readonly deliveryMotorbike: string
  }
}

/** Per-page document metadata. Differs per locale for SEO. */
export interface DocumentMeta {
  readonly title: string
  readonly description: string
}

/** Everything one locale provides. getContent(locale) returns this. */
export interface Content {
  readonly locale: Locale
  readonly meta: DocumentMeta
  readonly business: BusinessInfo
  readonly products: readonly Product[]
  readonly honeyVarieties: readonly HoneyVariety[]
  readonly claims: readonly Claim[]
  readonly benefits: readonly Benefit[]
  readonly navItems: readonly NavItem[]
  readonly ui: UiStrings
}
