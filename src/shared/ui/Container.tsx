import type { ReactNode } from 'react'

import { cn } from '../lib/cn'

const WIDTHS = {
  default: 'max-w-6xl',
  wide: 'max-w-[110rem]',
  full: 'max-w-none',
} as const

export interface ContainerProps {
  children: ReactNode
  width?: keyof typeof WIDTHS
  className?: string
}

/** Max-width + gutters. One prop, three cases. */
export function Container({ children, width = 'default', className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full px-6 md:px-10', WIDTHS[width], className)}>{children}</div>
  )
}
