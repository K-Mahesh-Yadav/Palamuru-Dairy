import { describe, expect, it } from 'vitest'

import { formatPhone, mapsHref, telHref, whatsappHref } from './links'

describe('telHref', () => {
  it('prepends +91 to a bare 10-digit Indian mobile', () => {
    expect(telHref('9381466419')).toBe('tel:+919381466419')
  })

  it('does not double the country code when one is present', () => {
    expect(telHref('919381466419')).toBe('tel:+919381466419')
  })

  it('strips spaces and punctuation', () => {
    expect(telHref('93814 66419')).toBe('tel:+919381466419')
  })
})

describe('formatPhone', () => {
  it('groups an Indian mobile 5+5', () => {
    expect(formatPhone('9381466419')).toBe('93814 66419')
  })
})

describe('whatsappHref', () => {
  it('builds a bare wa.me link', () => {
    expect(whatsappHref('919381466419')).toBe('https://wa.me/919381466419')
  })

  it('percent-encodes the prefilled message', () => {
    expect(whatsappHref('919381466419', 'Hi! Price for 1L milk?')).toBe(
      'https://wa.me/919381466419?text=Hi!%20Price%20for%201L%20milk%3F',
    )
  })

  it('omits the query when the message is empty', () => {
    expect(whatsappHref('919381466419', '')).toBe('https://wa.me/919381466419')
  })
})

describe('mapsHref', () => {
  it('encodes the address', () => {
    expect(mapsHref('Bagirtha Colony, Mahabubnagar')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Bagirtha%20Colony%2C%20Mahabubnagar',
    )
  })
})
