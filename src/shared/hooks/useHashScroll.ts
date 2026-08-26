import { useEffect } from 'react'

/**
 * The app is client-rendered, so when someone opens a shared deep link like
 * /#products the browser tries to scroll before React has rendered the
 * section — and silently does nothing. Re-run the scroll once after mount.
 */
export function useHashScroll(): void {
  useEffect(() => {
    const { hash } = window.location
    if (hash.length <= 1) return

    const target = document.querySelector(hash)
    if (!target) return

    // rAF so layout has settled after the first paint.
    const id = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
    return () => {
      cancelAnimationFrame(id)
    }
  }, [])
}
