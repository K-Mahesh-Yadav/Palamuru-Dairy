/**
 * Contrast gate — reproduces the PLAN.md B6 table from the ACTUAL token values
 * in src/styles/tokens.css. If someone edits a token, this fails.
 *
 * Run: node scripts/contrast.mjs   (also asserted by src/styles/contrast.test.ts)
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

/**
 * Walk up from cwd to the repo root (the directory holding package.json) so
 * this resolves identically under `node scripts/contrast.mjs` and under
 * Vitest, where import.meta.url is not a file:// URL.
 */
function repoRoot() {
  let dir = process.cwd()
  for (let i = 0; i < 8; i += 1) {
    if (existsSync(join(dir, 'package.json'))) return dir
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  throw new Error('contrast: could not locate repo root from ' + process.cwd())
}

const CSS = join(repoRoot(), 'src', 'styles', 'tokens.css')

/** @returns {Record<string,string>} token name (without --color-) -> hex */
export function readTokens() {
  const css = readFileSync(CSS, 'utf8')
  /** @type {Record<string,string>} */
  const out = {}
  for (const m of css.matchAll(/--color-([a-z]+):\s*(#[0-9a-fA-F]{6})\s*;/g)) {
    out[m[1]] = m[2]
  }
  return out
}

const srgb = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)

export function luminance(hex) {
  const h = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map((i) => srgb(parseInt(h.slice(i, i + 2), 16) / 255))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function ratio(a, b) {
  const [la, lb] = [luminance(a), luminance(b)]
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/** [foreground, background, label, expectation] — expectation per PLAN.md B6. */
export const PAIRS = [
  ['forest', 'cream', 'Forest text on Cream', 'AAA'],
  ['cream', 'forest', 'Cream text on Forest', 'AAA'],
  ['forest', 'olive', 'Forest text on Olive', 'AAA'],
  ['forest', 'sage', 'Forest text on Sage', 'AAA'],
  ['sage', 'forest', 'Sage text on Forest', 'AAA'],
  ['gold', 'forest', 'Gold text on Forest', 'AA'],
  ['forest', 'gold', 'Forest text on Gold fill', 'AA'],
  ['moss', 'forest', 'Moss text on Forest', 'AA'],
  ['gold', 'cream', 'Gold text on Cream', 'FORBIDDEN'],
  ['gold', 'olive', 'Gold text on Olive', 'FORBIDDEN'],
  ['gold', 'sage', 'Gold text on Sage', 'FORBIDDEN'],
  ['moss', 'cream', 'Moss text on Cream', 'FORBIDDEN'],
]

/** AA normal = 4.5, AAA normal = 7. FORBIDDEN must be under the 3:1 UI floor. */
export function verdict(r) {
  if (r >= 7) return 'AAA'
  if (r >= 4.5) return 'AA'
  if (r >= 3) return 'AA-large/UI only'
  return 'FORBIDDEN'
}

export function evaluate() {
  const t = readTokens()
  return PAIRS.map(([fg, bg, label, expected]) => {
    const r = Math.round(ratio(t[fg], t[bg]) * 100) / 100
    return { fg, bg, label, expected, ratio: r, actual: verdict(r), ok: verdict(r) === expected }
  })
}

if (process.argv[1]?.endsWith('contrast.mjs') === true) {
  const rows = evaluate()
  const t = readTokens()
  console.log('\n  PALAMURU DAIRY — contrast table (from src/styles/tokens.css)\n')
  console.log(
    '  ' +
      Object.entries(t)
        .map(([k, v]) => `${k}=${v}`)
        .join('  '),
  )
  console.log()
  for (const row of rows) {
    const mark = row.ok ? 'ok  ' : 'FAIL'
    console.log(
      `  ${mark} ${row.label.padEnd(26)} ${String(row.ratio).padStart(6)}:1  ${row.actual}`,
    )
  }
  const bad = rows.filter((r) => !r.ok)
  console.log()
  if (bad.length > 0) {
    console.error(`  ${String(bad.length)} pairing(s) no longer match PLAN.md B6.\n`)
    process.exit(1)
  }
  console.log('  All 12 pairings match PLAN.md B6.\n')
}
