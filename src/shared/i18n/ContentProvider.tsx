import { useMemo, type ReactNode } from 'react'

import { getContent, type Locale } from '@content/index'

import { ContentContext } from './context'

/**
 * Holds the active locale's content bundle.
 *
 * Lives in `shared`, not `app`, because features consume it — and
 * `features -> app` is backwards under the enforced dependency direction.
 *
 * The locale is fixed per build entry (`/` renders en, `/te/` renders te), so
 * this never changes at runtime. It is context rather than a module constant
 * only so that tests can render either locale without a rebuild.
 */
export interface ContentProviderProps {
  locale: Locale
  children: ReactNode
}

export function ContentProvider({ locale, children }: ContentProviderProps) {
  const value = useMemo(() => getContent(locale), [locale])
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
}
