/**
 * Precompute AVIF + WebP for every illustration (PLAN.md B6).
 *
 * Precomputed rather than a build plugin: the conversion is deterministic and
 * runs once, the results are committed, and the build pipeline stays plain.
 *
 * Sources are 663x450 flat vector art with alpha. They are NOT upscaled — see
 * PLAN.md Risk 9; anything wider than the source goes soft.
 *
 * Run: node scripts/optimize-images.mjs
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import sharp from 'sharp'

const DIR = join(process.cwd(), 'src', 'shared', 'assets', 'illustrations')
const kb = (n) => `${(n / 1024).toFixed(1)} KB`

// Only originals are sources. Generated .avif is skipped; a .webp is only a
// source if no .png of the same name exists (three assets arrived as WebP).
const all = readdirSync(DIR)
const sources = all.filter((f) => {
  if (f.endsWith('.png')) return true
  if (!f.endsWith('.webp')) return false
  return !all.includes(f.replace(/\.webp$/, '.png'))
})

let before = 0
let bestTotal = 0

for (const file of sources) {
  const base = file.replace(/\.(png|webp)$/, '')
  const src = join(DIR, file)
  const srcSize = statSync(src).size
  before += srcSize

  // Read to a buffer so the source handle is closed before we write over it —
  // sharp keeps the file open otherwise, and Windows refuses the overwrite.
  const buf = readFileSync(src)
  const meta = await sharp(buf).metadata()

  const webp = await sharp(buf).webp({ quality: 82, effort: 6 }).toBuffer()
  const avif = await sharp(buf).avif({ quality: 55, effort: 6 }).toBuffer()

  writeFileSync(join(DIR, `${base}.webp`), webp)
  writeFileSync(join(DIR, `${base}.avif`), avif)

  bestTotal += Math.min(webp.length, avif.length)

  console.log(
    `  ${base.padEnd(30)} ${String(meta.width)}x${String(meta.height)}  ` +
      `src ${kb(srcSize).padStart(9)} -> webp ${kb(webp.length).padStart(9)}  avif ${kb(avif.length).padStart(9)}`,
  )
}

console.log(
  `\n  ${String(sources.length)} images: ${kb(before)} -> ${kb(bestTotal)} (best format each)\n`,
)
