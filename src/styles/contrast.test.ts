import { describe, expect, it } from 'vitest'

import { evaluate, readTokens, type ContrastRow } from '../../scripts/contrast.mjs'

describe('palette contrast (PLAN.md B6)', () => {
  it('carries exactly the six approved tokens', () => {
    expect(readTokens()).toEqual({
      forest: '#184010',
      sage: '#ccd5ae',
      olive: '#e9edc9',
      cream: '#f8f0db',
      moss: '#a3b18a',
      gold: '#e8b84c',
    })
  })

  for (const row of evaluate()) {
    it(`${row.label} is ${row.expected} at ${String(row.ratio)}:1`, () => {
      expect(row.actual).toBe(row.expected)
    })
  }

  it('never allows gold text on a light ground', () => {
    const goldOnLight = evaluate().filter((r: ContrastRow) => r.fg === 'gold' && r.bg !== 'forest')
    expect(goldOnLight).not.toHaveLength(0)
    for (const row of goldOnLight) expect(row.ratio).toBeLessThan(3)
  })
})
