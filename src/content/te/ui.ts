import type { UiStrings } from '../types'

/** Telugu interface labels. English original in a comment beside each. */
export const ui: UiStrings = {
  skipToContent: 'నేరుగా విషయానికి వెళ్లండి', // Skip to content

  nav: {
    menu: 'మెనూ', // Menu
    close: 'మూసివేయి', // Close
    primaryLabel: 'ప్రధాన నావిగేషన్', // Primary
    call: 'కాల్ చేయండి', // Call
    whatsapp: 'వాట్సాప్', // WhatsApp
    /** This language's own name — shown on the switcher that leads here. */
    languageName: 'తెలుగు',
    switchLanguageLabel: 'భాష మార్చండి', // Switch language
  },

  products: {
    heading: 'ఉత్పత్తులు', // Products
    action: 'మమ్మల్ని కలవండి', // Visit us
    enquire: 'వివరాలు', // Enquire
    // en: "Hi {business}! I'd like to know more about {product}."
    enquiryMessage: 'నమస్తే {business}! {product} గురించి వివరాలు కావాలి.',
  },

  honey: {
    heading: 'తేనె', // Honey
  },

  visit: {
    heading: 'మమ్మల్ని కలవండి', // Visit
    address: 'చిరునామా', // Address
    mobile: 'మొబైల్', // Mobile
    hours: 'పని వేళలు', // Hours
    deliveryAreas: 'మేము డెలివరీ చేసే ప్రాంతాలు', // We deliver to
    callNow: 'ఇప్పుడే కాల్ చేయండి', // Call now
    orderOnWhatsapp: 'వాట్సాప్‌లో ఆర్డర్ చేయండి', // Order on WhatsApp
    openInMaps: 'మ్యాప్స్‌లో చూడండి', // Open in Maps
    // en: "Hi {business}! I'd like to place an order."
    orderMessage: 'నమస్తే {business}! నేను ఆర్డర్ ఇవ్వాలనుకుంటున్నాను.',
  },

  footer: {
    explore: 'విభాగాలు', // Explore
    privacy: 'గోప్యత', // Privacy
    // Must stay factually true in every language — this is a claim to the visitor.
    privacyNote:
      'ఈ సైట్ కుకీలను ఉపయోగించదు, ఎలాంటి అనలిటిక్స్ నడపదు, సంప్రదింపు ఫారం లేదు. ఇది ఎలాంటి వ్యక్తిగత సమాచారాన్నీ సేకరించదు. కాల్ చేయడం లేదా సందేశం పంపడం మీ స్వంత ఫోన్ లేదా వాట్సాప్ ద్వారా జరుగుతుంది.',
    fssaiPrefix: 'ఎఫ్‌ఎస్‌ఎస్‌ఏఐ లైసెన్స్ నం.', // FSSAI Lic. No.
  },

  error: {
    // en: "Something went wrong loading this page. You can still reach us directly."
    message: 'ఈ పేజీ లోడ్ కావడంలో సమస్య వచ్చింది. మీరు నేరుగా మమ్మల్ని సంప్రదించవచ్చు.',
  },

  alt: {
    milkingTheCow: 'ఆవు నుండి చేతితో పాలు పితుకుతున్న రైతు.', // A dairy farmer milking a cow by hand into a pail.
    deliveryMotorbike: 'బైక్‌పై పాలు డెలివరీకి బయలుదేరుతున్న పాలవాడు.', // A milkman setting off to deliver milk on his motorbike.
  },
}
