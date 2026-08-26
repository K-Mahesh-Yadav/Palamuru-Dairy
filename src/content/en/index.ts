import type { Content } from '../types'

import { benefits } from './benefits'
import { business } from './business'
import { claims } from './claims'
import { honeyVarieties } from './honey'
import { navItems } from './nav'
import { products } from './products'
import { ui } from './ui'

export const en: Content = {
  locale: 'en',
  meta: {
    title: 'Palamuru Dairy — Pure by Nature, Trusted by Generations',
    description:
      'Palamuru Dairy, Mahabubnagar. Pure cow milk, curd, paneer, honey, sweets and ice cream. 100% pure and natural, no preservatives, no chemicals.',
  },
  business,
  products,
  honeyVarieties,
  claims,
  benefits,
  navItems,
  ui,
}
