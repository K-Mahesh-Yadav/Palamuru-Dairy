import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { App } from '@/app/App'
import { ContentProvider } from '@shared/i18n'

describe('accessibility', () => {
  it('has no axe violations on the fully rendered page', async () => {
    const { container } = render(
      <ContentProvider locale="en">
        <App />
      </ContentProvider>,
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
