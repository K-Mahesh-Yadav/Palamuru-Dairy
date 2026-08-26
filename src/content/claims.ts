import type { Claim } from './types'

/**
 * The four icon rows in the banner's upper right.
 *
 * These are MARKETING CLAIMS, NOT CERTIFICATIONS. No certifying body appears
 * anywhere on the banner. They must never be rendered in a way that implies
 * third-party verification — no seals, no "certified" wording, no badge
 * chrome that reads as an accreditation mark. (PLAN.md A1.)
 */
export const claims: readonly Claim[] = [
  { id: 'pure-natural', label: 'Pure & Natural', icon: 'leaf' },
  { id: 'fresh-milk', label: 'Made from Fresh Milk', icon: 'cow' },
  { id: 'no-preservatives', label: 'No Preservatives, No Chemicals', icon: 'flask' },
  { id: 'healthy', label: 'Healthy & Nutritious', icon: 'heart' },
]
