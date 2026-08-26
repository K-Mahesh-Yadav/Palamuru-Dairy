import type { Product } from '../types'

/** Telugu product range. Ids and illustration keys are identical to en. */
export const products: readonly Product[] = [
  {
    id: 'milk',
    name: 'స్వచ్ఛమైన ఆవు పాలు', // Pure Cow Milk
    descriptor: '100% స్వచ్ఛం & సహజం', // 100% Pure & Natural
    image: {
      key: 'holdingMilkContainer',
      alt: 'పాల కేన్‌ను పట్టుకున్న పాలవాడు.',
    },
  },
  {
    id: 'curd',
    name: 'పెరుగు', // Curd
    descriptor: 'తాజా, చిక్కని, రుచికరమైన పెరుగు', // Fresh & Thick, Delicious Curd
    image: {
      key: 'twoContainers',
      alt: 'రెండు చేతుల్లో పాల కేన్లు పట్టుకున్న పాలవాడు.',
    },
  },
  {
    id: 'paneer',
    name: 'పనీర్', // Paneer
    descriptor: 'మెత్తని, తాజా, ప్రొటీన్ అధికం', // Soft, Fresh & High in Protein
    image: {
      key: 'servingCustomer',
      alt: 'కొలత పాత్రతో పాలు కొలిచి ఇస్తున్న పాలవాడు.',
    },
  },
  {
    id: 'honey',
    name: 'తేనె', // Honey
    descriptor: '100% స్వచ్ఛం & సహజం, తాజా తేనె', // 100% Pure & Natural, Farm Fresh Honey
  },
  {
    id: 'sweets',
    name: 'మిఠాయిలు', // Sweets
    descriptor: 'సంప్రదాయ రుచి, స్వచ్ఛమైన పదార్థాలతో', // Traditional Taste, Made with Pure Ingredients
  },
  {
    id: 'ice-creams',
    name: 'ఐస్ క్రీమ్‌లు', // Ice Creams
    descriptor: 'క్రీమీ, రుచికరం, నిజమైన పాలతో', // Creamy, Delicious & Made with Real Milk
  },
]
