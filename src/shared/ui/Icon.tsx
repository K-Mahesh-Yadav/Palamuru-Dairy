import type { ReactNode } from 'react'

/**
 * Inline SVG glyphs. currentColor only — no fill values, so these carry no
 * colour decision and the token gate stays meaningful.
 */
const paths: Record<string, ReactNode> = {
  leaf: <path d="M4 20c0-8 6-14 16-15 0 11-6 16-14 16H4Zm0 0c2-4 5-7 9-9" />,
  cow: (
    <>
      <path d="M4 8c0-2 1-3 3-3h10c2 0 3 1 3 3v3a8 8 0 0 1-16 0V8Z" />
      <path d="M8 13h.01M16 13h.01M10 17h4" />
    </>
  ),
  flask: <path d="M9 3v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V3M8 3h8M7 15h10" />,
  heart: <path d="M12 20s-7-4.5-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.5-7 9-7 9Z" />,
  sprout: <path d="M12 21v-8m0 0C12 8 9 5 4 5c0 5 3 8 8 8Zm0 0c0-4 3-7 8-7 0 4-3 7-8 7Z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Zm-3 9 2 2 4-4" />,
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M9 10h.01M15 10h.01M8.5 14a4.5 4.5 0 0 0 7 0" />
    </>
  ),
}

export function Icon({ name, className }: { name: string; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {paths[name] ?? paths.leaf}
    </svg>
  )
}
