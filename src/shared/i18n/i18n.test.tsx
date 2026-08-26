import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { LOCALES } from '@content/index'

import { ContentProvider } from './ContentProvider'
import { interpolate } from './interpolate'
import { useContent } from './useContent'
import { useLocale } from './useLocale'

function Probe() {
  const { locale, business } = useContent()
  const { tag, path, alternates } = useLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <span data-testid="tag">{tag}</span>
      <span data-testid="path">{path}</span>
      <span data-testid="name">{business.name}</span>
      <span data-testid="alts">
        {alternates.map((a) => `${a.locale}:${a.name}:${a.path}`).join(',')}
      </span>
    </div>
  )
}

describe('interpolate', () => {
  it('substitutes named placeholders', () => {
    expect(interpolate('Hi {business}! About {product}.', { business: 'X', product: 'Y' })).toBe(
      'Hi X! About Y.',
    )
  })

  it('leaves an unknown placeholder visible rather than blanking it', () => {
    // A typo should be obvious in the output, not silently vanish.
    expect(interpolate('Hi {bussiness}!', { business: 'X' })).toBe('Hi {bussiness}!')
  })

  it('substitutes every occurrence', () => {
    expect(interpolate('{a}-{a}', { a: 'z' })).toBe('z-z')
  })
})

describe('useContent', () => {
  it('throws outside a provider rather than guessing a language', () => {
    // Silently defaulting to English would ship the wrong language to a
    // Telugu reader; a loud failure in development is the safer trade.
    expect(() => render(<Probe />)).toThrow(/ContentProvider/)
  })

  it.each(LOCALES)('serves %s content', (locale) => {
    render(
      <ContentProvider locale={locale}>
        <Probe />
      </ContentProvider>,
    )
    expect(screen.getByTestId('locale')).toHaveTextContent(locale)
  })

  it('serves Telugu business copy in Telugu script', () => {
    render(
      <ContentProvider locale="te">
        <Probe />
      </ContentProvider>,
    )
    expect(screen.getByTestId('name').textContent).toMatch(/[\u0C00-\u0C7F]/)
  })
})

describe('useLocale', () => {
  it('reports the tag and path for the active locale', () => {
    render(
      <ContentProvider locale="te">
        <Probe />
      </ContentProvider>,
    )
    expect(screen.getByTestId('tag')).toHaveTextContent('te-IN')
    expect(screen.getByTestId('path')).toHaveTextContent('/te/')
  })

  it('names each alternate in its OWN language', () => {
    // A Telugu reader scanning for their language looks for "తెలుగు",
    // not the English word "Telugu".
    render(
      <ContentProvider locale="en">
        <Probe />
      </ContentProvider>,
    )
    expect(screen.getByTestId('alts')).toHaveTextContent('te:తెలుగు:/te/')
  })

  it('never lists the active locale as an alternate', () => {
    for (const locale of LOCALES) {
      const { unmount } = render(
        <ContentProvider locale={locale}>
          <Probe />
        </ContentProvider>,
      )
      expect(screen.getByTestId('alts').textContent).not.toContain(`${locale}:`)
      unmount()
    }
  })
})
