import { cn } from '@shared/lib'

import { useParallax } from './useParallax'

export interface FloatingCardProps {
  src: string
  alt: string
  /** Parallax multiplier on top of template.md's 0.05 speed factor. */
  factor?: number
  className?: string
}

/**
 * template.md "Floating Organic Cards": 3rem radius, infinite float
 * (translateY -20px / rotate 5deg), plus scroll-depth parallax.
 */
export function FloatingCard({ src, alt, factor = 1, className }: FloatingCardProps) {
  const ref = useParallax(factor)

  return (
    <div
      ref={ref}
      className={cn('pointer-events-none absolute', className)}
      style={{ transform: 'translateY(var(--parallax-y, 0px))' }}
    >
      <div className="float overflow-hidden rounded-float bg-cream/40 shadow-float backdrop-blur-sm">
        <img
          src={src}
          alt={alt}
          width={663}
          height={450}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
