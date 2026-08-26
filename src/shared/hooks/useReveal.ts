import { useEffect, useRef, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * template.md reveal: translateY(100px)/opacity 0 -> translateY(0)/opacity 1
 * over 1.2s with cubic-bezier(0.16, 1, 0.3, 1).
 *
 * Behaviour lives here so it is testable without rendering a section.
 * Reveals once and disconnects — this is decoration, not a live subscription.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(): {
  ref: React.RefObject<T | null>
  revealed: boolean
} {
  const ref = useRef<T>(null)
  const reduced = usePrefersReducedMotion()
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    // Reduced motion: render at the final state immediately, never animate.
    if (reduced) {
      setRevealed(true)
      return
    }

    // Safety net: content must never be stuck at opacity 0. If the API is
    // missing (older engine, some crawlers, print contexts), show everything
    // immediately rather than hiding the page behind an effect that cannot run.
    if (!('IntersectionObserver' in window)) {
      setRevealed(true)
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
    }
  }, [reduced])

  return { ref, revealed }
}
