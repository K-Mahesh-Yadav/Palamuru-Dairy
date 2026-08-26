import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

/**
 * Tones respect the gold rule (PLAN.md A3.1): `gold` is always a FILL with
 * forest text, never gold text on a light ground.
 */
const TONES = {
  forest: 'bg-forest text-cream hover:bg-forest/90',
  gold: 'bg-gold text-forest hover:bg-gold/85',
  cream: 'bg-cream text-forest hover:bg-cream/85',
} as const

const VARIANTS = {
  solid: 'px-7 py-4 rounded-full',
  circle: 'aspect-square rounded-full p-8 text-center',
  ghost: 'px-0 py-2 bg-transparent underline underline-offset-8 hover:opacity-70',
} as const

interface BaseProps {
  children: ReactNode
  variant?: keyof typeof VARIANTS
  tone?: keyof typeof TONES
  className?: string
}

/**
 * Polymorphic by PRESENCE OF href, not by an `as` prop — there are exactly two
 * cases here, so a generic polymorphic component is unearned complexity.
 */
export type ButtonProps = BaseProps &
  (
    | { href: string; external?: boolean; onClick?: never; type?: never }
    | { href?: never; external?: never; onClick?: () => void; type?: 'button' | 'submit' }
  )

export function Button({
  children,
  variant = 'solid',
  tone = 'forest',
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    'font-body inline-flex items-center justify-center',
    'text-[11px] font-bold tracking-[0.25em] uppercase',
    'transition-all duration-300 ease-signature',
    VARIANTS[variant],
    rest.href !== undefined || variant !== 'ghost' ? TONES[tone] : '',
    variant === 'ghost' && 'bg-transparent',
    className,
  )

  if (rest.href !== undefined) {
    // rel is unconditional: react/jsx-no-target-blank is set to error, and
    // noreferrer covers referrer leakage that browsers do not imply.
    return (
      <a
        href={rest.href}
        className={classes}
        {...(rest.external === true ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={rest.type ?? 'button'} onClick={rest.onClick} className={classes}>
      {children}
    </button>
  )
}
