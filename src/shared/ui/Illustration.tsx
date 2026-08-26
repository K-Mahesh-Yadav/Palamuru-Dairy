import { ILLUSTRATION_SIZE, illustrations, type IllustrationKey } from '../assets'
import { cn } from '../lib'

export interface IllustrationProps {
  name: IllustrationKey
  /** Empty string marks the image as decorative. */
  alt: string
  /** Only the one above-the-fold image should be eager. */
  priority?: boolean
  className?: string
}

/**
 * <picture> with AVIF -> WebP -> original fallback (PLAN.md B6).
 *
 * width/height are always the true source dimensions so the browser reserves
 * the right box before the bytes arrive — this is what keeps CLS near zero.
 */
export function Illustration({ name, alt, priority = false, className }: IllustrationProps) {
  const src = illustrations[name]

  return (
    <picture>
      <source srcSet={src.avif} type="image/avif" />
      <source srcSet={src.webp} type="image/webp" />
      <img
        src={src.fallback}
        alt={alt}
        width={ILLUSTRATION_SIZE.width}
        height={ILLUSTRATION_SIZE.height}
        loading={priority ? 'eager' : 'lazy'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        decoding="async"
        className={cn('h-auto w-full', className)}
      />
    </picture>
  )
}
