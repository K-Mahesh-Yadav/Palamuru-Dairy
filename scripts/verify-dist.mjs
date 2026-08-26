/**
 * Post-build security assertions (PLAN.md B7).
 *
 * These must run AFTER `vite build`, against the bytes that actually ship —
 * a source-level test cannot see what the bundler emitted. Wired into
 * `npm run ci` after the build step.
 *
 * Run: node scripts/verify-dist.mjs
 */
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIST = join(process.cwd(), 'dist')
const failures = []
const checks = []

function check(name, ok, detail = '') {
  checks.push({ name, ok, detail })
  if (!ok) failures.push(`${name}${detail === '' ? '' : ` — ${detail}`}`)
}

const html = readFileSync(join(DIST, 'index.html'), 'utf8')
const jsFiles = readdirSync(join(DIST, 'assets')).filter((f) => f.endsWith('.js'))
const js = jsFiles.map((f) => readFileSync(join(DIST, 'assets', f), 'utf8')).join('\n')

// --- CSP invariants ---------------------------------------------------------
// script-src 'self' has no 'unsafe-inline' and no hashes, so any EXECUTABLE
// inline script would be blocked at runtime. A type="application/ld+json"
// block is a data block, never executed, and is not subject to script-src.
const inlineScripts = [...html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>/g)]
const executableInline = inlineScripts.filter((m) => {
  const type = /type=["']([^"']+)["']/.exec(m[1] ?? '')?.[1] ?? ''
  return type === '' || /javascript|module/i.test(type)
})
check(
  'no executable inline <script> in index.html',
  executableInline.length === 0,
  `${String(executableInline.length)} found`,
)

check('no inline <style> in index.html', !/<style[\s>]/i.test(html))
check('no style= attribute in index.html', !/\sstyle=["']/i.test(html))

// --- Link hardening ---------------------------------------------------------
const blanks = (js.match(/_blank/g) ?? []).length
const rels = (js.match(/noopener noreferrer/g) ?? []).length
check(
  'every target=_blank has rel=noopener noreferrer',
  blanks === 0 || rels >= blanks,
  `${String(blanks)} _blank vs ${String(rels)} rel`,
)

// React's own DOM property table contains the string "dangerouslySetInnerHTML",
// so scanning the bundle would always trip. What matters is that OUR source
// never uses it — react/no-danger enforces that at lint time, and this
// asserts the rule is actually configured as an error rather than relaxed.
const srcFiles = (function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.tsx?$/.test(entry.name)) out.push(full)
  }
  return out
})(join(process.cwd(), 'src'))

const usesDanger = srcFiles.filter((f) =>
  readFileSync(f, 'utf8').includes('dangerouslySetInnerHTML'),
)
check('no dangerouslySetInnerHTML in src', usesDanger.length === 0, usesDanger.join(', '))

const eslintConfig = readFileSync(join(process.cwd(), 'eslint.config.js'), 'utf8')
check("react/no-danger is set to 'error'", /'react\/no-danger':\s*'error'/.test(eslintConfig))
check(
  "react/jsx-no-target-blank is set to 'error'",
  /'react\/jsx-no-target-blank':\s*\[\s*'error'/.test(eslintConfig),
)

// --- Secrets ----------------------------------------------------------------
// Anything VITE_-prefixed is inlined as a string literal and is public by
// construction. This asserts nothing that looks like a credential shipped.
const SECRET_PATTERNS = [
  /\bsk-[A-Za-z0-9]{16,}/,
  /\bapi[_-]?key\s*[:=]\s*["'][^"']{8,}/i,
  /\bsecret\s*[:=]\s*["'][^"']{8,}/i,
  /\bpassword\s*[:=]\s*["'][^"']{4,}/i,
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
]
for (const re of SECRET_PATTERNS) {
  check(`no secret matching ${re.source.slice(0, 34)}`, !re.test(js))
}

// --- Headers file -----------------------------------------------------------
const headers = readFileSync(join(process.cwd(), 'public', '_headers'), 'utf8')
for (const directive of [
  "default-src 'none'",
  "script-src 'self'",
  "connect-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'none'",
]) {
  check(`_headers CSP contains ${directive}`, headers.includes(directive))
}
for (const header of [
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'Permissions-Policy',
  'X-Frame-Options',
]) {
  check(`_headers sets ${header}`, headers.includes(header))
}
check("CSP has no 'unsafe-inline'", !headers.includes('unsafe-inline'))
check("CSP has no 'unsafe-eval'", !headers.includes('unsafe-eval'))

// --- Report -----------------------------------------------------------------
for (const c of checks) console.log(`  ${c.ok ? 'ok  ' : 'FAIL'} ${c.name}`)
console.log('')
if (failures.length > 0) {
  console.error(`  ${String(failures.length)} security check(s) failed:\n`)
  for (const f of failures) console.error(`    ${f}`)
  console.error('')
  process.exit(1)
}
console.log(`  all ${String(checks.length)} post-build security checks passed\n`)
