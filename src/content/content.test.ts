import { describe, expect, it } from 'vitest'

import { en } from './en'

const { benefits, business, claims, honeyVarieties, navItems, products, ui } = en

/**
 * Content integrity — the highest-value tests on a brochure site.
 * The real failure mode here is someone editing a data file and silently
 * breaking the page or, worse, shipping a fabricated business detail.
 */

describe('business info', () => {
  it('carries the banner mobile as ten bare digits', () => {
    expect(business.phone).toMatch(/^\d{10}$/)
    expect(business.phone).toBe('9381466419')
  })

  it('carries a valid E.164 WhatsApp number', () => {
    expect(business.whatsapp).toMatch(/^\d{11,15}$/)
  })

  it('states the address exactly as the banner does, plus the supplied city', () => {
    expect(business.address.line1).toBe('Bagirtha Colony')
    expect(business.address.line2).toBe('Opposite to Junior Champs School')
    expect(business.address.city).toBe('Mahabubnagar')
    expect(business.address.state).toBe('Telangana')
  })

  it('leaves every field the banner does not cover either absent or genuinely filled', () => {
    // These may legitimately become defined once the owner supplies them. What
    // must never happen is a placeholder shipping as if it were real data.
    const PLACEHOLDER = /^\s*$|tbd|todo|xxx|n\/a|lorem|placeholder|coming soon/i

    const optionalStrings = [business.address.pincode, business.fssai, business.email]
    for (const value of optionalStrings) {
      if (value !== undefined) expect(value).not.toMatch(PLACEHOLDER)
    }

    if (business.hours !== undefined) {
      expect(business.hours.length).toBeGreaterThan(0)
      for (const h of business.hours) {
        expect(h.days).not.toMatch(PLACEHOLDER)
        expect(h.time).not.toMatch(PLACEHOLDER)
      }
    }

    if (business.deliveryAreas !== undefined) {
      expect(business.deliveryAreas.length).toBeGreaterThan(0)
      for (const area of business.deliveryAreas) expect(area).not.toMatch(PLACEHOLDER)
    }
  })

  it('has not yet been given hours, delivery areas or an FSSAI number', () => {
    // Documents current reality. When the owner supplies these, this test is
    // the reminder to delete it — not to weaken the one above.
    expect(business.hours).toBeUndefined()
    expect(business.deliveryAreas).toBeUndefined()
    expect(business.fssai).toBeUndefined()
    expect(business.address.pincode).toBeUndefined()
  })
})

describe('products', () => {
  it('lists the six products from the banner', () => {
    expect(products).toHaveLength(6)
    expect(products.map((p) => p.id)).toEqual([
      'milk',
      'curd',
      'paneer',
      'honey',
      'sweets',
      'ice-creams',
    ])
  })

  it('gives every product a non-empty name and descriptor', () => {
    for (const p of products) {
      expect(p.name.trim().length).toBeGreaterThan(0)
      expect(p.descriptor.trim().length).toBeGreaterThan(0)
    }
  })

  it('carries no prices — the banner shows none', () => {
    for (const p of products) expect(p.price).toBeUndefined()
  })

  it('has unique ids', () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length)
  })
})

describe('honey varieties', () => {
  it('lists the three varieties from the banner', () => {
    expect(honeyVarieties).toHaveLength(3)
  })

  it('gives every variety exactly three bullets', () => {
    for (const v of honeyVarieties) {
      expect(v.bullets).toHaveLength(3)
      for (const b of v.bullets) expect(b.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('claims and benefits', () => {
  it('lists the four claims and four benefits from the banner', () => {
    expect(claims).toHaveLength(4)
    expect(benefits).toHaveLength(4)
  })

  it('never words a claim as a certification', () => {
    const forbidden = /certified|certification|iso|approved by|accredit/i
    for (const c of claims) expect(c.label).not.toMatch(forbidden)
  })
})

describe('nav', () => {
  it('uses in-page anchors only', () => {
    for (const item of navItems) expect(item.href).toMatch(/^#[a-z-]+$/)
  })

  it('has unique hrefs', () => {
    expect(new Set(navItems.map((n) => n.href)).size).toBe(navItems.length)
  })
})

describe('product illustrations', () => {
  it('assigns an image only where a real matching asset exists', () => {
    const withImage = products.filter((p) => p.image !== undefined).map((p) => p.id)
    const without = products.filter((p) => p.image === undefined).map((p) => p.id)

    expect(withImage).toEqual(['milk', 'curd', 'paneer'])
    // No illustration exists for these three. They render as typographic
    // cards rather than borrowing an unrelated image (PLAN.md A7 / Risk 6).
    expect(without).toEqual(['honey', 'sweets', 'ice-creams'])
  })

  it('gives every assigned image descriptive alt text', () => {
    for (const p of products) {
      if (p.image === undefined) continue
      expect(p.image.alt.length).toBeGreaterThan(15)
      expect(p.image.alt).toMatch(/\.$/)
    }
  })
})

describe('ui strings', () => {
  it('provides every chrome string a component needs', () => {
    // A missing key would surface as `undefined` rendered into the page.
    const required: string[] = [
      ui.skipToContent,
      ui.nav.menu,
      ui.nav.close,
      ui.nav.primaryLabel,
      ui.nav.call,
      ui.nav.whatsapp,
      ui.nav.languageName,
      ui.nav.switchLanguageLabel,
      ui.products.heading,
      ui.products.action,
      ui.products.enquire,
      ui.products.enquiryMessage,
      ui.honey.heading,
      ui.visit.heading,
      ui.visit.address,
      ui.visit.mobile,
      ui.visit.hours,
      ui.visit.deliveryAreas,
      ui.visit.callNow,
      ui.visit.orderOnWhatsapp,
      ui.visit.openInMaps,
      ui.visit.orderMessage,
      ui.footer.explore,
      ui.footer.privacy,
      ui.footer.privacyNote,
      ui.footer.fssaiPrefix,
      ui.error.message,
    ]
    for (const value of required) expect(value.trim().length).toBeGreaterThan(0)
  })

  it('declares the placeholders the interpolated messages actually use', () => {
    expect(ui.products.enquiryMessage).toContain('{business}')
    expect(ui.products.enquiryMessage).toContain('{product}')
    expect(ui.visit.orderMessage).toContain('{business}')
  })

  it('keeps the privacy note factually true', () => {
    // PLAN.md B5: the site collects nothing. If that ever changes, this note
    // must change first — it is a claim to the visitor, not decoration.
    const note = ui.footer.privacyNote.toLowerCase()
    expect(note).toContain('no cookies')
    expect(note).toContain('no analytics')
    expect(note).toContain('no contact form')
  })
})
