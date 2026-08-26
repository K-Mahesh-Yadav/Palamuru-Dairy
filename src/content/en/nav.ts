import type { NavItem } from '../types'

/**
 * hrefs are in-page anchors. Each must match a rendered Section id —
 * asserted by content.test.ts, which is the test that actually catches a
 * broken nav after a copy edit.
 */
export const navItems: readonly NavItem[] = [
  { label: 'Products', href: '#products' },
  { label: 'Honey', href: '#honey' },
  { label: 'Why Us', href: '#about' },
  { label: 'Visit', href: '#visit' },
]
