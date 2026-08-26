/**
 * Serve dist/ with the ACTUAL headers from public/_headers.
 *
 * `vite preview` ignores _headers, so a broken CSP would sail through local
 * checks and only surface in production. This parses the real file — the same
 * bytes Cloudflare Pages or Netlify will read — and applies it, so the policy
 * can be verified before deploying.
 *
 * Run: node scripts/serve-with-headers.mjs [port]
 */
import { createReadStream, existsSync, readFileSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize } from 'node:path'

const ROOT = join(process.cwd(), 'dist')
const HEADERS_FILE = join(process.cwd(), 'public', '_headers')
const PORT = Number(process.argv[2] ?? 8788)

/** Parse the Cloudflare/Netlify _headers format into [pattern, headers][]. */
function parseHeaders(text) {
  const rules = []
  let current = null
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trimEnd()
    if (line.trim() === '' || line.trimStart().startsWith('#')) continue
    if (!line.startsWith(' ') && !line.startsWith('\t')) {
      current = { pattern: line.trim(), headers: {} }
      rules.push(current)
      continue
    }
    if (!current) continue
    const idx = line.indexOf(':')
    if (idx === -1) continue
    current.headers[line.slice(0, idx).trim()] = line.slice(idx + 1).trim()
  }
  return rules
}

const rules = parseHeaders(readFileSync(HEADERS_FILE, 'utf8'))

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
}

function matches(pattern, pathname) {
  if (pattern === '/*') return true
  if (pattern.endsWith('/*')) return pathname.startsWith(pattern.slice(0, -1))
  return pattern === pathname
}

createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://localhost:${String(PORT)}`)
  let pathname = decodeURIComponent(url.pathname)
  if (pathname.endsWith('/')) pathname += 'index.html'

  // Reject any traversal outright rather than trying to strip it.
  const safe = normalize(pathname)
  if (safe.includes('..')) {
    res.statusCode = 400
    res.end('bad path')
    return
  }
  const filePath = join(ROOT, safe)
  const target =
    existsSync(filePath) && statSync(filePath).isFile() ? filePath : join(ROOT, 'index.html')
  const servedPath = target === filePath ? pathname : '/index.html'

  for (const rule of rules) {
    if (!matches(rule.pattern, servedPath)) continue
    for (const [k, v] of Object.entries(rule.headers)) res.setHeader(k, v)
  }

  res.setHeader('Content-Type', TYPES[extname(target)] ?? 'application/octet-stream')
  res.statusCode = target === filePath ? 200 : 404
  createReadStream(target).pipe(res)
}).listen(PORT, () => {
  console.log(`serving dist/ with public/_headers applied -> http://localhost:${String(PORT)}`)
  const globalRule = rules.find((r) => r.pattern === '/*')
  console.log(`\n  ${String(Object.keys(globalRule?.headers ?? {}).length)} headers on /*:`)
  for (const k of Object.keys(globalRule?.headers ?? {})) console.log(`    ${k}`)
})
