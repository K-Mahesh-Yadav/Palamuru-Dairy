import { describe, expect, it } from 'vitest'

import { toGraphemes } from './text'

describe('toGraphemes', () => {
  it('splits Latin one character per cluster', () => {
    expect(toGraphemes('PALAMURU')).toHaveLength(8)
  })

  it('keeps Telugu vowel matras attached to their base consonant', () => {
    // పాలమూరు — 7 UTF-16 code units, 4 grapheme clusters.
    const word = 'పాలమూరు'
    expect(word.length).toBe(7) // what split('') would have produced
    expect(toGraphemes(word, 'te')).toEqual(['పా', 'ల', 'మూ', 'రు'])
  })

  it('does not split the Telugu word for dairy into broken glyphs', () => {
    // డెయిరీ — every cluster must carry its own matra.
    const clusters = toGraphemes('డెయిరీ', 'te')
    expect(clusters.join('')).toBe('డెయిరీ')
    for (const c of clusters) {
      // A cluster must never be a bare combining mark (U+0C3E–U+0C56).
      expect(/^[\u0C3E-\u0C56]/.test(c)).toBe(false)
    }
  })

  it('round-trips: joining the clusters reproduces the input exactly', () => {
    for (const s of ['పాలమూరు', 'తేనె', 'పెరుగు', 'Palamuru Dairy', '100% Pure']) {
      expect(toGraphemes(s, 'te').join('')).toBe(s)
    }
  })

  it('returns an empty array for an empty string', () => {
    expect(toGraphemes('')).toEqual([])
  })
})
