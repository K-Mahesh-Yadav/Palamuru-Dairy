/* eslint-disable react-refresh/only-export-components --
   A compound component is an object of components exported from one file;
   that shape is the pattern, and it costs only HMR granularity in dev. */
import type { ReactNode } from 'react'

import { useReveal } from '../hooks'
import { cn } from '../lib'

import { Container } from './Container'
import { Heading } from './Heading'
import { Section } from './Section'

/**
 * COMPOUND COMPONENT — the one place on this site where it earns its place
 * (PLAN.md B4.3).
 *
 * Lives in shared/ rather than features/products because two features consume
 * it (products and honey), and the architecture rule is that cross-feature
 * reuse is promoted to shared rather than imported sideways.
 *
 * Two variants share the grid, the reveal timing, the blur-reveal hover and
 * the card shell, but differ in column count and caption: six dairy products
 * (3x2) and three honey varieties (3x1). Root/Heading/Items lets the honey
 * section reuse all of that without an `isHoney` boolean.
 *
 * Every other section on this site takes plain props. They have one variant
 * each, where a compound API would be ceremony.
 */

const COLUMNS = {
  3: 'md:grid-cols-3',
  2: 'md:grid-cols-2',
} as const

interface RootProps {
  children: ReactNode
  tone: 'olive' | 'cream'
  id: string
  labelledBy: string
}

function Root({ children, tone, id, labelledBy }: RootProps) {
  return (
    <Section tone={tone} id={id} labelledBy={labelledBy} roundTop seam>
      <Container width="wide">{children}</Container>
    </Section>
  )
}

interface GridHeadingProps {
  children: ReactNode
  id: string
  /** template.md pairs the display heading with a large circular CTA. */
  action?: ReactNode
}

function GridHeading({ children, id, action }: GridHeadingProps) {
  return (
    <div className="mb-16 flex items-end justify-between gap-8">
      <Heading as="h2" variant="section" id={id} className="flex-1">
        {children}
      </Heading>
      {action}
    </div>
  )
}

interface ItemsProps {
  children: ReactNode
  columns?: keyof typeof COLUMNS
}

function Items({ children, columns = 3 }: ItemsProps) {
  const { ref, revealed } = useReveal()

  return (
    <div
      ref={ref}
      data-revealed={revealed}
      className={cn('grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2', COLUMNS[columns])}
    >
      {children}
    </div>
  )
}

export const ProductGrid = { Root, Heading: GridHeading, Items }
