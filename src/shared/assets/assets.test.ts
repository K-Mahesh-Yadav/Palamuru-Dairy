import { describe, expect, it } from 'vitest'

import type { IllustrationKey } from '@content/types'

import { ILLUSTRATION_SIZE, illustrations } from './index'

/**
 * content/types.ts declares IllustrationKey by hand so that the content layer
 * stays a leaf. That hand-written union can drift from the real barrel, so
 * pin them together here.
 */
describe('illustration barrel', () => {
  it('matches the IllustrationKey union declared in content', () => {
    const fromBarrel = Object.keys(illustrations).sort()
    const fromUnion: IllustrationKey[] = [
      'atTheLaptop',
      'deliveryMotorbike',
      'fillingContainer',
      'holdingMilkContainer',
      'milkingTheCow',
      'milkmanContainerShoulder',
      'milkmanWithCow',
      'servingCustomer',
      'twoContainers',
      'whiteboard',
    ]
    expect(fromBarrel).toEqual([...fromUnion].sort())
  })

  it('resolves every key to a real URL', () => {
    for (const [key, url] of Object.entries(illustrations)) {
      expect(url, `${key} did not resolve`).toBeTruthy()
      expect(typeof url).toBe('string')
    }
  })

  it('states the true source dimensions', () => {
    expect(ILLUSTRATION_SIZE).toEqual({ width: 663, height: 450 })
  })

  it('excludes the adulteration and money illustrations', () => {
    const keys = Object.keys(illustrations).join(' ').toLowerCase()
    expect(keys).not.toContain('mixing')
    expect(keys).not.toContain('water')
    expect(keys).not.toContain('money')
    expect(keys).not.toContain('counting')
    expect(keys).not.toContain('victory')
  })
})
