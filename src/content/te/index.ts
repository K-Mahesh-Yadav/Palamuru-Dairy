import type { Content } from '../types'

import { benefits } from './benefits'
import { business } from './business'
import { claims } from './claims'
import { honeyVarieties } from './honey'
import { navItems } from './nav'
import { products } from './products'
import { ui } from './ui'

/**
 * TRANSLATION STATUS: drafted, NOT native-reviewed.
 *
 * Deliberately not wired into CI — a build cannot verify a judgement only a
 * fluent speaker can make, and failing every run from day one would train
 * people to ignore the failure. It is a launch blocker in LAUNCH.md instead.
 */
export const TRANSLATION_REVIEWED = false

export const te: Content = {
  locale: 'te',
  meta: {
    title: 'పాలమూరు డెయిరీ — ప్రకృతి సిద్ధమైన స్వచ్ఛత, తరతరాల నమ్మకం',
    description:
      'పాలమూరు డెయిరీ, మహబూబ్‌నగర్. స్వచ్ఛమైన ఆవు పాలు, పెరుగు, పనీర్, తేనె, మిఠాయిలు, ఐస్ క్రీమ్. 100% స్వచ్ఛం, ప్రిజర్వేటివ్‌లు లేవు, రసాయనాలు లేవు.',
  },
  business,
  products,
  honeyVarieties,
  claims,
  benefits,
  navItems,
  ui,
}
