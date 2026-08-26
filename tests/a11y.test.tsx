import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { App } from '@/app/App'

describe('accessibility', () => {
  it('has no axe violations on the fully rendered page', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  }, 30000)
})
