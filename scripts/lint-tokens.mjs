/**
 * Token gate — PLAN.md B3.
 *
 * Hard rule: src/styles/tokens.css is the only file in the repo that may
 * contain a hex colour literal. An ESLint rule cannot reliably see hex inside
 * arbitrary string expressions, so this grep is the enforceable version.
 *
 * Runs as part of `npm run ci`. Exits non-zero on any violation.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative, sep } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const SRC = join(ROOT, 'src')

/**
 * Files permitted to contain hex literals.
 *
 * - tokens.css   the single source of truth itself
 * - contrast.test.ts  asserts that the tokens ARE these exact values. A test
 *   that pins the palette is the opposite of a component hardcoding a colour;
 *   without the literals here the gate would have nothing to guard.
 */
const ALLOWED = new Set([
  join('src', 'styles', 'tokens.css'),
  join('src', 'styles', 'contrast.test.ts'),
])

/** Extensions that are scanned. */
const SCANNED = new Set(['.ts', '.tsx', '.css'])

const HEX = /#[0-9a-fA-F]{3,8}\b/g

function walk(dir, out = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full, out)
    else if (SCANNED.has(entry.slice(entry.lastIndexOf('.')))) out.push(full)
  }
  return out
}

const violations = []

for (const file of walk(SRC)) {
  const rel = relative(ROOT, file)
  if (ALLOWED.has(rel) || ALLOWED.has(rel.split(sep).join(sep))) continue

  const lines = readFileSync(file, 'utf8').split(/\r?\n/)
  lines.forEach((line, i) => {
    // An SVG fractal-noise data URI is markup, not a design decision; but it
    // still must not carry a brand colour, so we scan it like anything else.
    const found = line.match(HEX)
    if (found) violations.push(`${rel}:${String(i + 1)}  ${found.join(' ')}  |  ${line.trim()}`)
  })
}

if (violations.length > 0) {
  console.error('\n  Hex colour literals found outside src/styles/tokens.css:\n')
  for (const v of violations) console.error(`    ${v}`)
  console.error(
    `\n  ${String(violations.length)} violation(s). Move the value into a token in` +
      ' src/styles/tokens.css and reference it via a Tailwind utility or var().\n',
  )
  process.exit(1)
}

console.log('lint:tokens — clean (no hex outside src/styles/tokens.css)')
