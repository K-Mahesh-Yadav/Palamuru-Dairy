import { describe, expect, it } from 'vitest'

import type { Content } from './types'

import { getContent, LOCALES, LOCALE_PATH, LOCALE_TAG } from './index'

/**
 * Locale parity.
 *
 * The real failure mode of a two-language site is drift: a product added in
 * one language and not the other, a honey variety that loses a bullet, an
 * untranslated key rendering `undefined` into the page. Structure is
 * checkable by machine — meaning is not, which is why the Telugu still needs
 * a human reviewer (LAUNCH.md).
 */

const en = getContent('en')
const te = getContent('te')

/** Every leaf string in an object, with its dotted path. */
function leaves(value: unknown, path = ''): { path: string; value: string }[] {
  if (typeof value === 'string') return [{ path, value }]
  if (Array.isArray(value)) return value.flatMap((v, i) => leaves(v, `${path}[${String(i)}]`))
  if (value !== null && typeof value === 'object') {
    return Object.entries(value).flatMap(([k, v]) => leaves(v, path === '' ? k : `${path}.${k}`))
  }
  return []
}

describe('locale registry', () => {
  it('registers every locale with a path and a tag', () => {
    for (const locale of LOCALES) {
      expect(getContent(locale).locale).toBe(locale)
      expect(LOCALE_PATH[locale]).toMatch(/^\//)
      expect(LOCALE_TAG[locale]).toMatch(/^[a-z]{2}-[A-Z]{2}$/)
    }
  })

  it('serves English from the site root', () => {
    expect(LOCALE_PATH.en).toBe('/')
    expect(LOCALE_PATH.te).toBe('/te/')
  })
})

describe('en / te parity', () => {
  it('exposes exactly the same set of string keys', () => {
    const enPaths = leaves(en)
      .map((l) => l.path)
      .sort()
    const tePaths = leaves(te)
      .map((l) => l.path)
      .sort()
    expect(tePaths).toEqual(enPaths)
  })

  it('leaves no string empty in either locale', () => {
    for (const [name, content] of [
      ['en', en],
      ['te', te],
    ] as const) {
      for (const leaf of leaves(content)) {
        expect(leaf.value.trim(), `${name}:${leaf.path} is empty`).not.toBe('')
      }
    }
  })

  it('keeps product ids and illustration keys identical', () => {
    expect(te.products.map((p) => p.id)).toEqual(en.products.map((p) => p.id))
    expect(te.products.map((p) => p.image?.key)).toEqual(en.products.map((p) => p.image?.key))
  })

  it('keeps honey ids identical with exactly three bullets each', () => {
    expect(te.honeyVarieties.map((h) => h.id)).toEqual(en.honeyVarieties.map((h) => h.id))
    for (const variety of [...en.honeyVarieties, ...te.honeyVarieties]) {
      expect(variety.bullets).toHaveLength(3)
    }
  })

  it('keeps claim and benefit ids and icons identical', () => {
    for (const key of ['claims', 'benefits'] as const) {
      expect(te[key].map((c) => c.id)).toEqual(en[key].map((c) => c.id))
      expect(te[key].map((c) => c.icon)).toEqual(en[key].map((c) => c.icon))
    }
  })

  it('keeps nav anchors identical — hrefs are structure, not copy', () => {
    expect(te.navItems.map((n) => n.href)).toEqual(en.navItems.map((n) => n.href))
  })

  it('never translates a fact', () => {
    // Phone, WhatsApp and the FSSAI slot are data. Translating a digit would
    // be a defect, not a localisation.
    expect(te.business.phone).toBe(en.business.phone)
    expect(te.business.whatsapp).toBe(en.business.whatsapp)
    expect(te.business.fssai).toBe(en.business.fssai)
  })

  it('carries the same interpolation placeholders in both locales', () => {
    const holders = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort()
    expect(holders(te.ui.products.enquiryMessage)).toEqual(holders(en.ui.products.enquiryMessage))
    expect(holders(te.ui.visit.orderMessage)).toEqual(holders(en.ui.visit.orderMessage))
  })

  it('actually contains Telugu script, not copied English', () => {
    const TELUGU = /[\u0C00-\u0C7F]/
    const shouldBeTelugu: string[] = [
      te.business.name,
      te.business.wordmarkTagline,
      te.business.scriptHeadline,
      te.meta.title,
      te.ui.skipToContent,
      te.ui.visit.callNow,
      te.ui.footer.privacyNote,
      ...te.products.map((p) => p.name),
      ...te.honeyVarieties.map((h) => h.name),
      ...te.claims.map((c) => c.label),
      ...te.benefits.map((b) => b.label),
      ...te.navItems.map((n) => n.label),
    ]
    for (const value of shouldBeTelugu) {
      expect(TELUGU.test(value), `not Telugu: ${value}`).toBe(true)
    }
  })

  it('keeps the privacy note factually true in Telugu too', () => {
    // The English asserts no cookies / no analytics / no form. The Telugu must
    // make the same three claims or the site lies to Telugu readers.
    const note = te.ui.footer.privacyNote
    expect(note).toContain('కుకీ') // cookies
    expect(note).toContain('అనలిటిక్స్') // analytics
    expect(note).toContain('ఫారం') // form
  })
})

describe('content shape', () => {
  it('exposes the same top-level keys for every locale', () => {
    const keys = (c: Content) => Object.keys(c).sort()
    expect(keys(te)).toEqual(keys(en))
  })
})
