import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * PLAN.md A3.1 — the gold rule, encoded.
 *
 * `gold` is a FILL with forest text on it (6.40:1, AA normal). There is no
 * variant that produces gold *text*, because gold text only clears AA on a
 * forest ground and every Pill in the design sits on a light one.
 */
const TONES = {
  gold: 'bg-gold text-forest',
  sage: 'bg-sage text-forest',
} as const

export interface PillProps {
  children: ReactNode
  tone?: keyof typeof TONES
  className?: string
}

export function Pill({ children, tone = 'gold', className }: PillProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-4 py-1.5 font-body',
        'text-[11px] font-bold tracking-[0.2em] uppercase',
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
