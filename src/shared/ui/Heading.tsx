import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * Sizes from template.md, unchanged:
 *   hero    23vw, leading 0.75, tracking -0.05em
 *   section 15vw
 * `label` is Inter, uppercase, tracked out 0.2em-0.4em.
 */
const VARIANTS = {
  hero: 'font-display text-[23vw] leading-[0.75] tracking-[-0.05em] uppercase',
  section: 'font-display text-[15vw] leading-[0.8] tracking-[-0.05em] uppercase',
  card: 'font-display text-3xl leading-none tracking-[-0.02em] uppercase md:text-4xl',
  label: 'font-body text-[11px] font-bold tracking-[0.3em] uppercase',
} as const

export interface HeadingProps {
  children: ReactNode
  /**
   * Semantic level. Deliberately decoupled from `variant` so a section can be
   * a correct h2 while being sized like a card heading — the document outline
   * stays valid under a design that sizes purely for impact. PLAN.md B3.
   */
  as: 'h1' | 'h2' | 'h3'
  variant: keyof typeof VARIANTS
  id?: string
  className?: string
}

export function Heading({ children, as: Tag, variant, id, className }: HeadingProps) {
  return (
    <Tag id={id} className={cn(VARIANTS[variant], className)}>
      {children}
    </Tag>
  )
}
