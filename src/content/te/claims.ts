import type { Claim } from '../types'

/**
 * MARKETING CLAIMS, NOT CERTIFICATIONS — the same rule as en/claims.ts.
 * No certifying body appears on the banner in any language. These must never
 * be worded or styled to imply third-party accreditation.
 */
export const claims: readonly Claim[] = [
  { id: 'pure-natural', label: 'స్వచ్ఛం & సహజం', icon: 'leaf' }, // Pure & Natural
  { id: 'fresh-milk', label: 'తాజా పాలతో తయారీ', icon: 'cow' }, // Made from Fresh Milk
  { id: 'no-preservatives', label: 'ప్రిజర్వేటివ్‌లు లేవు, రసాయనాలు లేవు', icon: 'flask' }, // No Preservatives, No Chemicals
  { id: 'healthy', label: 'ఆరోగ్యకరం & పోషకభరితం', icon: 'heart' }, // Healthy & Nutritious
]
