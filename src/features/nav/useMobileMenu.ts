import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Mobile menu state. Escape closes and focus returns to the trigger —
 * PLAN.md B6. Local useState is the whole store; there is no cross-component
 * state on this site, which is why no state library is installed.
 */
export function useMobileMenu() {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    triggerRef.current?.focus()
  }, [])

  const toggle = useCallback(() => {
    setOpen((v) => !v)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return { open, toggle, close, triggerRef }
}
