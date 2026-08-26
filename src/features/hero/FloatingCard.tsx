import { type IllustrationKey } from '@shared/assets'
import { cn } from '@shared/lib'
import { Illustration } from '@shared/ui'

import { useParallax } from './useParallax'

export interface FloatingCardProps {
  name: IllustrationKey
  alt: string
  /** Parallax multiplier on top of template.md's 0.05 speed factor. */
  factor?: number
  className?: string
}

/**
 * template.md "Floating Organic Cards": 3rem radius, infinite float
 * (translateY -20px / rotate 5deg), plus scroll-depth parallax.
 *
 * Deliberately NOT `priority`. These are decorative (alt="") and are not the
 * LCP element — the Anton headline is. Marking them eager made React's
 * <picture> double-fetch: Chrome starts the PNG `src` during hydration before
 * the <source> elements attach, so both the PNG and the AVIF were downloaded.
 */
export function FloatingCard({ name, alt, factor = 1, className }: FloatingCardProps) {
  const ref = useParallax(factor)

  return (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute', className)}
      style={{ transform: 'translateY(var(--parallax-y, 0px))' }}
    >
      <div className="float overflow-hidden rounded-float bg-cream/40 shadow-float backdrop-blur-sm">
        <Illustration name={name} alt={alt} />
      </div>
    </div>
  )
}
