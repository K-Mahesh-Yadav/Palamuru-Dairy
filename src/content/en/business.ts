import type { BusinessInfo } from '../types'

/**
 * Every value below is transcribed from the promotional banner
 * (PLAN.md A1). Nothing here is inferred.
 */
export const business: BusinessInfo = {
  name: 'Palamuru Dairy',
  wordmarkTagline: 'Pure by Nature, Trusted by Generations',
  scriptHeadline: 'Bringing You the Goodness of Nature',
  badge: '100% Pure & Natural',
  bottomStrip: 'Pure Food • Pure Life • Pure You',

  phone: '9381466419',

  // TODO(whatsapp): UNCONFIRMED. Assumed identical to the banner mobile.
  // The banner shows no WhatsApp number. Confirm before launch.
  whatsapp: '919381466419',

  address: {
    line1: 'Bagirtha Colony',
    line2: 'Opposite to Junior Champs School',
    // City/state supplied by the owner; the banner itself shows neither.
    city: 'Mahabubnagar',
    state: 'Telangana',
    // TODO(pincode): not on the banner, not supplied. Hurts Maps geocoding.
    // pincode: undefined,
  },

  // TODO(hours): not on the banner, not supplied. The Visit section renders
  // no hours block while this is absent. Do not invent opening times.
  // hours: undefined,

  // TODO(delivery): not on the banner, not supplied. Same handling.
  // deliveryAreas: undefined,

  // TODO(fssai): not on the banner. Displaying the FSSAI licence number is a
  // legal requirement for an Indian food business and the strongest trust
  // signal a dairy has. Footer renders it the moment it is filled in.
  // fssai: undefined,

  // No email and no social handles appear anywhere on the banner.
  // email: undefined,
  // social: undefined,
}
