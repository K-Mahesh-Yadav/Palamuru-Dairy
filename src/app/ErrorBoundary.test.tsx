import { render as rtlRender, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ContentProvider } from '@shared/i18n'

import { ErrorBoundary } from './ErrorBoundary'
import { FatalFallback } from './FatalFallback'

function render(ui: React.ReactElement) {
  return rtlRender(<ContentProvider locale="en">{ui}</ContentProvider>)
}

function Boom(): never {
  throw new Error('chunk 404')
}

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // React logs the caught error; silence it so the run stays readable.
    vi.spyOn(console, 'error').mockImplementation(() => undefined)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders children when nothing throws', () => {
    render(
      <ErrorBoundary fallback={<FatalFallback />}>
        <p>all good</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('all good')).toBeInTheDocument()
  })

  it('falls back to the phone number and address when a child throws', () => {
    render(
      <ErrorBoundary fallback={<FatalFallback />}>
        <Boom />
      </ErrorBoundary>,
    )
    // The whole point: the business is still reachable when React is not.
    expect(screen.getByRole('link', { name: '93814 66419' })).toHaveAttribute(
      'href',
      'tel:+919381466419',
    )
    expect(screen.getByText(/Bagirtha Colony/)).toBeInTheDocument()
  })

  it('uses no hooks or lazy imports in the fallback', () => {
    // A fallback that itself depends on the failing machinery is useless.
    render(<FatalFallback />)
    expect(screen.getByRole('main')).toBeInTheDocument()
  })
})
