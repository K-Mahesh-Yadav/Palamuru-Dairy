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

import { globalHeaders } from './serve-with-headers.mjs'

const DIST = join(process.cwd(), 'dist')
const failures = []
const checks = []

function check(name, ok, detail = '') {
  checks.push({ name, ok, detail })
  if (!ok) failures.push(`${name}${detail === '' ? '' : ` — ${detail}`}`)
}

/** Every locale document that must ship, with the lang tag it must declare. */
const DOCUMENTS = [
  { path: 'index.html', locale: 'en', tag: 'en-IN', url: '/' },
  { path: join('te', 'index.html'), locale: 'te', tag: 'te-IN', url: '/te/' },
]

const docs = DOCUMENTS.map((d) => ({ ...d, html: readFileSync(join(DIST, d.path), 'utf8') }))
const html = docs[0].html
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

// --- Every locale document, not just the English one ------------------------
for (const doc of docs.slice(1)) {
  const inline = [...doc.html.matchAll(/<script(?![^>]*src=)([^>]*)>/g)].filter((m) => {
    const type = /type=["']([^"']+)["']/.exec(m[1] ?? '')?.[1] ?? ''
    return type === '' || /javascript|module/i.test(type)
  })
  check(`no executable inline <script> in ${doc.url}`, inline.length === 0)
  check(`no inline <style> in ${doc.url}`, !/<style[\s>]/i.test(doc.html))
  check(`no style= attribute in ${doc.url}`, !/\sstyle=["']/i.test(doc.html))
}

// --- Locale documents -------------------------------------------------------
for (const doc of docs) {
  check(
    `${doc.url} declares lang="${doc.tag}"`,
    new RegExp(`<html[^>]*lang=["']${doc.tag}["']`).test(doc.html),
  )
  check(`${doc.url} has a canonical link`, /rel="canonical"/.test(doc.html))

  // hreflang must be RECIPROCAL: every document lists every locale plus
  // x-default. If they disagree, Google treats the pages as unrelated.
  for (const other of DOCUMENTS) {
    check(
      `${doc.url} lists hreflang ${other.tag}`,
      new RegExp(`hreflang=["']${other.tag}["']`).test(doc.html),
    )
  }
  check(`${doc.url} declares x-default`, /hreflang=["']x-default["']/.test(doc.html))
}

// A Telugu page whose metadata is still English misreports the business.
const teDoc = docs.find((d) => d.locale === 'te')
if (teDoc) {
  const ld = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(teDoc.html)?.[1] ?? ''
  let ldValid = false
  try {
    JSON.parse(ld)
    ldValid = true
  } catch {
    ldValid = false
  }
  check('/te/ JSON-LD is valid JSON', ldValid)
  check('/te/ JSON-LD is in Telugu script', /[ఀ-౿]/.test(ld))
  check('/te/ <title> is in Telugu script', /<title>[^<]*[ఀ-౿]/.test(teDoc.html))
}

// Each document preloads ITS OWN display font — the locales use different
// families, and Anton contains no Telugu glyphs.
check('/ preloads the Anton subset', /rel="preload"[^>]*anton[^>]*\.woff2/.test(docs[0].html))
if (teDoc) {
  check(
    '/te/ preloads the Telugu display subset',
    /rel="preload"[^>]*noto-sans-telugu-telugu-800[^>]*\.woff2/.test(teDoc.html),
  )
  check(
    '/te/ does not preload a Latin-only display font',
    !/rel="preload"[^>]*anton/.test(teDoc.html),
  )
}

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

// --- Host config drift ------------------------------------------------------
// public/_headers (Cloudflare/Netlify format) is kept so the build stays
// portable, while vercel.json is what actually serves. Two files expressing
// one policy is exactly what drifts silently, so pin them to each other.
const vercel = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf8'))
const globalRule = vercel.headers.find((h) => h.source === '/(.*)')
check('vercel.json sets headers on every path', globalRule !== undefined)

// Reuse the parser that serves these headers, so the check cannot disagree
// with the server about what the file means.
const headersFileGlobal = globalHeaders(headers)

for (const { key, value } of globalRule?.headers ?? []) {
  check(
    `vercel.json and _headers agree on ${key}`,
    headersFileGlobal[key] === value,
    `vercel sends "${value}" but _headers sends "${headersFileGlobal[key] ?? '(missing)'}"`,
  )
}

check(
  '_headers declares no security header vercel.json lacks',
  Object.keys(headersFileGlobal).every((k) => (globalRule?.headers ?? []).some((h) => h.key === k)),
)

check('vercel.json emits the directory these checks read', vercel.outputDirectory === 'dist')
check('vercel.json installs from the committed lockfile', vercel.installCommand === 'npm ci')

// --- Public URLs ------------------------------------------------------------
// A canonical pointing at a domain that does not resolve is worse than no
// canonical: Google follows it, finds nothing, and may decline to index the
// real page. This shipped once with a .example placeholder — hence the gate.
const RESERVED_TLD = /https?:\/\/[^"'\s]*\.(example|invalid|test|localhost)(\/|["'\s]|$)/i
for (const doc of docs) {
  const hit = RESERVED_TLD.exec(doc.html)
  check(`${doc.url} points at no reserved-TLD placeholder domain`, hit === null, hit?.[0] ?? '')
}
for (const asset of ['robots.txt', 'sitemap.xml']) {
  const text = readFileSync(join(DIST, asset), 'utf8')
  const hit = RESERVED_TLD.exec(text)
  check(`${asset} points at no reserved-TLD placeholder domain`, hit === null, hit?.[0] ?? '')
}

// Canonical and hreflang must agree on one origin, or they cancel out.
const origins = new Set()
for (const doc of docs) {
  for (const m of doc.html.matchAll(
    /rel="(?:canonical|alternate)"[^>]*href="(https?:\/\/[^/"]+)/g,
  )) {
    origins.add(m[1])
  }
}
check('canonical and hreflang share a single origin', origins.size === 1, [...origins].join(' vs '))

// Every locale must appear in the sitemap, or half the site is invisible.
const sitemap = readFileSync(join(DIST, 'sitemap.xml'), 'utf8')
for (const doc of docs) {
  check(`sitemap lists ${doc.url}`, sitemap.includes(`${[...origins][0] ?? ''}${doc.url}`))
}

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
