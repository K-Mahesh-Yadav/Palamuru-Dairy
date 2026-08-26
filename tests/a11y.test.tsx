import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { App } from '@/app/App'
import { LOCALES } from '@content/index'
import { ContentProvider } from '@shared/i18n'

describe('accessibility', () => {
  // Both locales, because a translation can break contrast, direction or the
  // heading outline without touching a single line of component code.
  it.each(LOCALES)(
    'has no axe violations on the %s page',
    async (locale) => {
      const { container } = render(
        <ContentProvider locale={locale}>
          <App />
        </ContentProvider>,
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    },
    30000,
  )

  it.each(LOCALES)('marks the %s language switcher with lang and hreflang', (locale) => {
    const { container } = render(
      <ContentProvider locale={locale}>
        <App />
      </ContentProvider>,
    )
    const links = container.querySelectorAll('a[hreflang]')
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      // Without lang, a screen reader announces the other language using
      // this page's phonetics.
      expect(link.getAttribute('lang')).toBeTruthy()
      expect(link.getAttribute('hreflang')).toBeTruthy()
      expect(link.getAttribute('href')).toMatch(/^\//)
    }
  })
})
