import { useContent, useLocale } from '@shared/i18n'
import { cn } from '@shared/lib'

export interface LanguageSwitcherProps {
  className?: string
}

/**
 * A plain link per alternate locale. No JS, no routing, no stored preference.
 *
 * `lang` and `hreflang` are load-bearing, not decoration: without `lang`, a
 * screen reader announces "తెలుగు" using English phonetics. `hreflang` tells
 * the browser and crawlers what is on the other end.
 *
 * There is deliberately no auto-redirect and no remembered choice — both add
 * machinery and can strand a visitor in a language they did not pick.
 */
export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { ui } = useContent()
  const { alternates } = useLocale()

  if (alternates.length === 0) return null

  return (
    <nav aria-label={ui.nav.switchLanguageLabel} className={cn('flex items-center', className)}>
      {alternates.map((alt) => (
        <a
          key={alt.locale}
          href={alt.path}
          lang={alt.locale}
          hrefLang={alt.tag}
          className="rounded-full border border-forest/25 px-4 py-2.5 text-[11px] font-bold tracking-[0.15em] text-forest transition-colors duration-300 ease-signature hover:bg-white/40"
        >
          {alt.name}
        </a>
      ))}
    </nav>
  )
}
