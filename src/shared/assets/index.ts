/**
 * Illustration barrel.
 *
 * Images reach features through this module so feature code never uses a
 * parent-relative path and never reaches inside @shared. Exports are URL
 * strings, so this costs nothing at runtime.
 *
 * Each entry carries all three formats. AVIF and WebP are precomputed by
 * scripts/optimize-images.mjs; the original is the last-resort fallback.
 * All sources are 663x450 — PLAN.md Risk 9: do not render much beyond
 * 600 CSS px or they go soft.
 */
import atLaptopAvif from './illustrations/at-the-laptop.avif'
import atLaptopPng from './illustrations/at-the-laptop.png'
import atLaptopWebp from './illustrations/at-the-laptop.webp'
import motorbikeAvif from './illustrations/delivery-motorbike.avif'
import motorbikePng from './illustrations/delivery-motorbike.png'
import motorbikeWebp from './illustrations/delivery-motorbike.webp'
import fillingAvif from './illustrations/filling-container.avif'
import fillingPng from './illustrations/filling-container.png'
import fillingWebp from './illustrations/filling-container.webp'
import holdingAvif from './illustrations/holding-milk-container.avif'
import holdingPng from './illustrations/holding-milk-container.png'
import holdingWebp from './illustrations/holding-milk-container.webp'
import milkingAvif from './illustrations/milking-the-cow.avif'
import milkingWebp from './illustrations/milking-the-cow.webp'
import shoulderAvif from './illustrations/milkman-container-shoulder.avif'
import shoulderPng from './illustrations/milkman-container-shoulder.png'
import shoulderWebp from './illustrations/milkman-container-shoulder.webp'
import withCowAvif from './illustrations/milkman-with-cow.avif'
import withCowPng from './illustrations/milkman-with-cow.png'
import withCowWebp from './illustrations/milkman-with-cow.webp'
import servingAvif from './illustrations/serving-customer.avif'
import servingWebp from './illustrations/serving-customer.webp'
import twoContainersAvif from './illustrations/two-containers.avif'
import twoContainersPng from './illustrations/two-containers.png'
import twoContainersWebp from './illustrations/two-containers.webp'
import whiteboardAvif from './illustrations/whiteboard.avif'
import whiteboardPng from './illustrations/whiteboard.png'
import whiteboardWebp from './illustrations/whiteboard.webp'

export const ILLUSTRATION_SIZE = { width: 663, height: 450 } as const

export interface IllustrationSources {
  readonly avif: string
  readonly webp: string
  /** Last-resort raster. Three assets arrived as WebP, so this is their webp. */
  readonly fallback: string
}

export const illustrations = {
  atTheLaptop: { avif: atLaptopAvif, webp: atLaptopWebp, fallback: atLaptopPng },
  deliveryMotorbike: { avif: motorbikeAvif, webp: motorbikeWebp, fallback: motorbikePng },
  fillingContainer: { avif: fillingAvif, webp: fillingWebp, fallback: fillingPng },
  holdingMilkContainer: { avif: holdingAvif, webp: holdingWebp, fallback: holdingPng },
  milkingTheCow: { avif: milkingAvif, webp: milkingWebp, fallback: milkingWebp },
  milkmanContainerShoulder: { avif: shoulderAvif, webp: shoulderWebp, fallback: shoulderPng },
  milkmanWithCow: { avif: withCowAvif, webp: withCowWebp, fallback: withCowPng },
  servingCustomer: { avif: servingAvif, webp: servingWebp, fallback: servingWebp },
  twoContainers: {
    avif: twoContainersAvif,
    webp: twoContainersWebp,
    fallback: twoContainersPng,
  },
  whiteboard: { avif: whiteboardAvif, webp: whiteboardWebp, fallback: whiteboardPng },
} as const satisfies Record<string, IllustrationSources>

export type IllustrationKey = keyof typeof illustrations
