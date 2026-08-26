import { useContext } from 'react'

import type { Content } from '@content/index'

import { ContentContext } from './context'

/**
 * The active locale's content. Throws rather than falling back to English:
 * a missing provider is a wiring bug, and silently rendering the wrong
 * language is worse than a loud failure during development.
 */
export function useContent(): Content {
  const content = useContext(ContentContext)
  if (content === null) {
    throw new Error('useContent must be used inside <ContentProvider>')
  }
  return content
}
