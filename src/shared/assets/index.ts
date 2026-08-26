/**
 * Illustration barrel.
 *
 * Images reach features through this module so that feature code never uses a
 * parent-relative path (which would sidestep the cross-feature import rules)
 * and never reaches inside @shared. Exports are URL strings, so this costs
 * nothing at runtime.
 *
 * All sources are 663x450 — see ILLUSTRATION_SIZE. PLAN.md Risk 9: they cannot
 * be rendered much beyond 600 CSS px without going soft.
 */
import atTheLaptop from './illustrations/at-the-laptop.png'
import deliveryMotorbike from './illustrations/delivery-motorbike.png'
import fillingContainer from './illustrations/filling-container.png'
import holdingMilkContainer from './illustrations/holding-milk-container.png'
import milkingTheCow from './illustrations/milking-the-cow.webp'
import milkmanContainerShoulder from './illustrations/milkman-container-shoulder.png'
import milkmanWithCow from './illustrations/milkman-with-cow.png'
import servingCustomer from './illustrations/serving-customer.webp'
import twoContainers from './illustrations/two-containers.png'
import whiteboard from './illustrations/whiteboard.png'

export const ILLUSTRATION_SIZE = { width: 663, height: 450 } as const

export const illustrations = {
  atTheLaptop,
  deliveryMotorbike,
  fillingContainer,
  holdingMilkContainer,
  milkingTheCow,
  milkmanContainerShoulder,
  milkmanWithCow,
  servingCustomer,
  twoContainers,
  whiteboard,
} as const

export type IllustrationKey = keyof typeof illustrations
