import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'

import { describe, expect, it } from 'vitest'

import { luminance, readTokens } from '../../scripts/contrast.mjs'

/**
 * Tailwind opacity utilities (text-forest/60) blend against their ground, and
 * the resulting colour appears in NO token file — so `lint:tokens` cannot see
 * it and neither can the 12-row table in contrast.test.ts. This closes that
 * hole: every alpha text utility in the codebase is blended against the
 * lightest ground it could sit on and must still clear AA for normal text.
 *
 * 11px uppercase labels are normal text, not "large" (which needs 18.66px
 * bold or 24px), so the bar is 4.5:1 — not 3:1.
 */

const AA_NORMAL = 4.5
/** Grounds a light-on-dark-text utility can land on. Sage is the darkest. */
const LIGHT_GROUNDS = ['sage', 'olive', 'cream'] as const

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (entry.endsWith('.tsx')) out.push(full)
  }
  return out
}

function hex(h: string): [number, number, number] {
  const m = h.replace('#', '').match(/../g) ?? []
  return [parseInt(m[0] ?? '0', 16), parseInt(m[1] ?? '0', 16), parseInt(m[2] ?? '0', 16)]
}

function toHex(c: number[]): string {
  return `#${c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`
}

function ratio(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)]
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

describe('alpha text utilities', () => {
  const tokens = readTokens()
  const sources = walk(join(process.cwd(), 'src'))

  const used = new Set<string>()
  for (const file of sources) {
    const content = readFileSync(file, 'utf8')
    for (const m of content.matchAll(/text-(forest|sage|cream|moss|gold)\/(\d+)/g)) {
      used.add(`${m[1] ?? ''}/${m[2] ?? ''}`)
    }
  }

  it('finds the alpha utilities actually in use', () => {
    expect(used.size).toBeGreaterThan(0)
  })

  for (const utility of [...used].sort()) {
    const [name = '', alphaStr = '0'] = utility.split('/')
    const alpha = Number(alphaStr) / 100

    // Anything under 25% opacity is decorative by construction and must be
    // aria-hidden — asserted separately in tests/app.test.tsx.
    if (alpha < 0.25) continue

    for (const ground of LIGHT_GROUNDS) {
      it(`text-${utility} on ${ground} clears AA for normal text`, () => {
        const fg = hex(tokens[name] ?? '#000000')
        const bg = hex(tokens[ground] ?? '#ffffff')
        const blended = toHex(fg.map((v, i) => v * alpha + (bg[i] ?? 0) * (1 - alpha)))
        expect(ratio(blended, tokens[ground] ?? '#ffffff')).toBeGreaterThanOrEqual(AA_NORMAL)
      })
    }
  }
})
