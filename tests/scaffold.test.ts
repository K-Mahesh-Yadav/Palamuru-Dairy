import { describe, expect, it } from 'vitest'

import { App } from '@/app/App'

describe('scaffold', () => {
  it('resolves the @ path alias at runtime', () => {
    expect(typeof App).toBe('function')
  })
})
