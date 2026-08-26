import type { BusinessInfo } from '../types'

/**
 * Telugu rendering of the banner information.
 *
 * DRAFTED, NOT NATIVE-REVIEWED — see LAUNCH.md. Product nouns and the place
 * name are low risk; the two taglines are copywriting and are the strings most
 * worth a second opinion.
 *
 * Facts are NEVER translated: the phone number, the WhatsApp number and the
 * digits of the address are identical to en/business.ts. Only language changes.
 */
export const business: BusinessInfo = {
  // "Palamuru" is itself the Telugu name for Mahabubnagar, so the brand
  // transliterates naturally rather than needing a translation.
  name: 'పాలమూరు డెయిరీ',

  // en: "Pure by Nature, Trusted by Generations"
  wordmarkTagline: 'ప్రకృతి సిద్ధమైన స్వచ్ఛత, తరతరాల నమ్మకం',

  // en: "Bringing You the Goodness of Nature"
  scriptHeadline: 'ప్రకృతి మంచితనాన్ని మీ ఇంటికి',

  // en: "100% Pure & Natural"
  badge: '100% స్వచ్ఛం & సహజం',

  // en: "Pure Food • Pure Life • Pure You"
  bottomStrip: 'స్వచ్ఛమైన ఆహారం • స్వచ్ఛమైన జీవితం • స్వచ్ఛమైన మీరు',

  // Identical to en — a phone number is a fact, not copy.
  phone: '9381466419',
  whatsapp: '919381466419',

  address: {
    line1: 'బాగీర్థ కాలనీ',
    line2: 'జూనియర్ ఛాంప్స్ స్కూల్ ఎదురుగా',
    city: 'మహబూబ్‌నగర్',
    state: 'తెలంగాణ',
  },

  // Absent for the same reasons as en — the banner covers none of these.
}
