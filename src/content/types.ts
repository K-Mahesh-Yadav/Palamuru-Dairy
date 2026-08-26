/**
 * Content types for Palamuru Dairy.
 *
 * DISCIPLINE: every field here traces to the banner transcription in
 * PLAN.md A1. Optional fields are the things the banner does NOT cover.
 * With `exactOptionalPropertyTypes` on, an absent field is genuinely absent —
 * a section cannot render a placeholder for it, it renders nothing.
 * Never fabricate a value to fill one of these in.
 */

/** A product in the main range. */
export interface Product {
  readonly id: string
  readonly name: string
  /** Verbatim descriptor from the banner. */
  readonly descriptor: string
  /** Illustration import, or absent where no matching asset exists. */
  readonly image?: { readonly src: string; readonly alt: string }
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
