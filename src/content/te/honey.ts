import type { HoneyVariety } from '../types'

/** Telugu honey range. Ids identical to en; exactly three bullets each. */
export const honeyVarieties: readonly HoneyVariety[] = [
  {
    id: 'multiflora',
    name: 'మల్టీఫ్లోరా తేనె', // Multiflora Honey
    bullets: [
      'యాంటీఆక్సిడెంట్లు అధికం', // Rich in Antioxidants
      'రోగనిరోధక శక్తిని పెంచుతుంది', // Boosts Immunity
      'రోజువారీ ఆరోగ్యానికి మేలు', // Good for Daily Wellness
    ],
  },
  {
    id: 'wild-forest',
    name: 'అటవీ తేనె', // Wild Forest Honey
    bullets: [
      'స్వచ్ఛం & ముడి', // Pure & Raw
      'సహజ శక్తి వర్ధిని', // Natural Energy Booster
      'ఖనిజాలు & ఎంజైమ్‌లు అధికం', // Rich in Minerals & Enzymes
    ],
  },
  {
    id: 'small-bee',
    name: 'చిన్న తేనెటీగ తేనె', // Small Bee Honey
    bullets: [
      '100% స్వచ్ఛం & సహజం', // 100% Pure & Natural
      'పోషకాలు అధికం', // Rich in Nutrients
      'సంపూర్ణ ఆరోగ్యానికి తోడ్పడుతుంది', // Supports Overall Health
    ],
  },
]
