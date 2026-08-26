/**
 * Grapheme-cluster splitting.
 *
 * The hero animates one span per "letter". `String.prototype.split('')` splits
 * by UTF-16 code unit, which is correct only for the Basic Latin plane.
 *
 * Telugu writes a syllable as a base consonant plus combining vowel matras:
 * "పాలమూరు" is 7 code units but 4 grapheme clusters (పా · ల · మూ · రు).
 * Splitting it by code unit detaches every matra from its base and renders
 * isolated, broken glyphs — a correctness bug, not a cosmetic one.
 *
 * Intl.Segmenter is the only correct way to do this in the platform. Where it
 * is missing, we return the whole string as ONE cluster so the word renders
 * unstaggered rather than shattered: losing an animation is acceptable,
 * unreadable script is not.
 */
export function toGraphemes(value: string, locale = 'en'): string[] {
  if (value === '') return []

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter(locale, { granularity: 'grapheme' })
    return [...segmenter.segment(value)].map((s) => s.segment)
  }

  return [value]
}

/** Whether per-grapheme animation is safe in this engine. */
export function canSegment(): boolean {
  return typeof Intl !== 'undefined' && 'Segmenter' in Intl
}
