import { createContext } from 'react'

import type { Content } from '@content/index'

/**
 * Separated from ContentProvider.tsx so that file exports only a component —
 * which is what react-refresh needs to hot-reload it correctly.
 */
export const ContentContext = createContext<Content | null>(null)
