import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * Section tones. This is the ONLY colour decision a section author makes.
 *
 * Note there is no 'gold' tone: gold is never a page ground. It appears as a
 * seam rule, as a Pill fill, and as footer text — all of which sit on forest
 * or carry forest text. See PLAN.md A3.1.
 */
const TONES = {
  sage: 'bg-sage text-forest',
  olive: 'bg-olive text-forest',
  cream: 'bg-cream text-forest',
  forest: 'bg-forest text-cream',
} as const

export interface SectionProps {
  children: ReactNode
  tone: keyof typeof TONES
  /** template.md: 5rem rounded top corners separate colour-blocked themes. */
  roundTop?: boolean
  /** PLAN.md A5.1 — 2px gold hairline along the section's top edge. */
  seam?: boolean
  id?: string
  /** id of the Heading that names this section, for aria-labelledby. */
  labelledBy?: string
  className?: string
}

export function Section({
  children,
  tone,
  roundTop = false,
  seam = false,
  id,
  labelledBy,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        'relative w-full py-24 md:py-32',
        TONES[tone],
        roundTop && 'rounded-t-section',
        className,
      )}
    >
      {seam ? (
        <span
          aria-hidden="true"
          className={cn('absolute inset-x-0 top-0 h-0.5 bg-gold', roundTop && 'rounded-t-section')}
        />
      ) : null}
      {children}
    </section>
  )
}
