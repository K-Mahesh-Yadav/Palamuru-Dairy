import type { Product } from '../types'

/**
 * The banner shows five product chips plus the hero milk bottle.
 * Descriptors are verbatim (PLAN.md A1).
 *
 * IMAGES: only three of the six have a matching illustration in Assets/.
 * Honey, Sweets and Ice Creams ship as typographic cards for launch
 * (PLAN.md A7 / Risk 6) — `image` is absent rather than a stand-in.
 */
export const products: readonly Product[] = [
  {
    id: 'milk',
    name: 'Pure Cow Milk',
    descriptor: '100% Pure & Natural',
    image: {
      key: 'holdingMilkContainer',
      alt: 'A milkman carrying a steel milk container.',
    },
  },
  {
    id: 'curd',
    name: 'Curd',
    descriptor: 'Fresh & Thick, Delicious Curd',
    image: {
      key: 'twoContainers',
      alt: 'A milkman carrying a steel milk container in each hand.',
    },
  },
  {
    id: 'paneer',
    name: 'Paneer',
    descriptor: 'Soft, Fresh & High in Protein',
    image: {
      key: 'servingCustomer',
      alt: 'A milkman measuring out milk for a customer.',
    },
  },
  {
    id: 'honey',
    name: 'Honey',
    descriptor: '100% Pure & Natural, Farm Fresh Honey',
  },
  {
    id: 'sweets',
    name: 'Sweets',
    descriptor: 'Traditional Taste, Made with Pure Ingredients',
  },
  {
    id: 'ice-creams',
    name: 'Ice Creams',
    descriptor: 'Creamy, Delicious & Made with Real Milk',
  },
]
