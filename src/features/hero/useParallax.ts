import { useEffect, useRef } from 'react'

import { usePrefersReducedMotion } from '@shared/hooks'

/**
 * template.md: "scroll-listener that adds additional translateY based on
 * scroll depth (speed factor 0.05)". Value unchanged.
 *
 * Writes a CSS custom property rather than a style string so the transform
 * composes with the `float` keyframes instead of fighting them. Setting it via
 * CSSOM is also unaffected by `style-src 'self'` (PLAN.md B5).
 */
const SPEED = 0.05

export function useParallax<T extends HTMLElement = HTMLDivElement>(factor = 1) {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return

    let frame = 0
    const onScroll = () => {
      if (frame !== 0) return
      frame = requestAnimationFrame(() => {
        el.style.setProperty('--parallax-y', `${String(window.scrollY * SPEED * factor)}px`)
        frame = 0
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== 0) cancelAnimationFrame(frame)
    }
  }, [reduced, factor])

  return ref
}
