import { en } from './en'
import type { Content, Locale } from './types'

/**
 * Locale registry. `content` remains a LEAF layer — this file imports nothing
 * outside src/content, which is what `import/no-restricted-paths` enforces.
 */

export const DEFAULT_LOCALE: Locale = 'en'

/** Every locale, in the order they appear in the switcher and the sitemap. */
export const LOCALES = ['en'] as const

const CONTENT: Record<Locale, Content> = { en }

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

export function getContent(locale: Locale): Content {
  return CONTENT[locale]
}

/**
 * URL path each locale is served from. Must match the Vite build entries and
 * the hreflang alternates — asserted in scripts/verify-dist.mjs.
 */
export const LOCALE_PATH: Record<Locale, string> = {
  en: '/',
}

/** BCP 47 tag for <html lang> and hreflang. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en-IN',
}

export type { Content, Locale } from './types'
