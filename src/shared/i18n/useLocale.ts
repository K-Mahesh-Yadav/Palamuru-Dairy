import { getContent, LOCALES, LOCALE_PATH, LOCALE_TAG, type Locale } from '@content/index'

import { useContent } from './useContent'

export interface AlternateLocale {
  readonly locale: Locale
  /** BCP 47 tag, for the link's lang/hreflang attributes. */
  readonly tag: string
  /** URL path this locale is served from. */
  readonly path: string
  /** The language's own name, in that language. */
  readonly name: string
}

export interface LocaleInfo {
  readonly locale: Locale
  readonly tag: string
  readonly path: string
  /** Every locale except the active one. */
  readonly alternates: readonly AlternateLocale[]
}

export function useLocale(): LocaleInfo {
  const { locale } = useContent()

  const alternates = LOCALES.filter((l) => l !== locale).map((l) => ({
    locale: l,
    tag: LOCALE_TAG[l],
    path: LOCALE_PATH[l],
    // The switcher must label a language in ITS OWN language — a Telugu
    // reader looking for Telugu is looking for "తెలుగు", not "Telugu".
    name: getContent(l).ui.nav.languageName,
  }))

  return { locale, tag: LOCALE_TAG[locale], path: LOCALE_PATH[locale], alternates }
}
