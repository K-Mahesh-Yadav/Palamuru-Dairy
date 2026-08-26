# Palamuru Dairy — Template Adaptation + React Implementation Plan

> **First action after approval:** copy this file verbatim to `./PLAN.md` in the project root, then begin Phase 0.

---

## Context

My brother is launching **Palamuru Dairy**, a local dairy in Mahabubnagar, Telangana selling milk, curd, paneer, honey (three varieties), sweets and ice cream. The only existing brand artifact is a printed promotional banner (`WhatsApp Image 2026-08-24 at 8.08.01 PM.jpeg`). There is no website, no logo file, no price list.

We have three inputs: the banner (source of truth for all business facts and the brand palette), `template.md` (a pre-existing design system spec — "Forest and Sage" editorial style with Anton/Inter typography), and `./Assets/` (14 flat-vector milkman illustrations).

**The intended outcome** is a static single-page marketing site that (a) says only what the banner actually says, (b) keeps `template.md`'s design system essentially intact while feeling unmistakably like the banner, and (c) collects zero data — the conversion path is a phone call or a WhatsApp message, not a form.

**Why the constraint on minimal palette change matters:** `template.md` is a coherent, working design language. Rewriting its palette to match the banner exactly would produce a different (and worse) system. The goal is *recognition*, not *reproduction* — three token moves get 90% of the way there.

**Decisions already confirmed by the user (2026-08-27):**

| Question | Answer |
|---|---|
| How to introduce the banner's gold | Add a **6th token**, `GoldLight #E8B84C` — Sage/Olive/Moss untouched |
| Contact form | **None.** `tel:` + WhatsApp deep links only |
| Address | Banner text + **Mahabubnagar, Telangana** |
| Extra info beyond banner | **WhatsApp ordering** and **hours / delivery area** only |
| Prices | **Not shown** |
| FSSAI number | **Not shown** (see Risk 7 — I'd push back on this once) |

---

# PART A — TEMPLATE ADAPTATION

## A1. Banner transcription (verified source of truth)

### Identity
| Field | Value |
|---|---|
| Business name | **PALAMURU DAIRY** |
| Wordmark tagline | PURE BY NATURE, TRUSTED BY GENERATIONS |
| Script headline | Bringing You the Goodness of Nature |
| Corner badge | 100% PURE & NATURAL |
| Bottom strip | PURE FOOD • PURE LIFE • PURE YOU |
| Logo mark | Cow head + bee + honeycomb + small cow, composed inside a "P" |

### Claims (4 icon rows, upper right)
PURE & NATURAL · MADE FROM FRESH MILK · NO PRESERVATIVES / NO CHEMICALS · HEALTHY & NUTRITIOUS

> These are **marketing claims, not certifications**. No certifying body appears anywhere on the banner. They must never be rendered as badges that imply third-party verification.

### Products (5 chips + hero bottle)
| Product | Descriptor (verbatim) |
|---|---|
| Pure Cow Milk (hero bottle, 1 Litre) | 100% Pure & Natural |
| Curd | Fresh & Thick, Delicious Curd |
| Paneer | Soft, Fresh & High in Protein |
| Honey | 100% Pure & Natural, Farm Fresh Honey |
| Sweets | Traditional Taste, Made with Pure Ingredients |
| Ice Creams | Creamy, Delicious & Made with Real Milk |

### Honey sub-range — "PURE & NATURAL HONEY"
| Variety | Bullets (verbatim, exactly 3 each) |
|---|---|
| Multiflora Honey | Rich in Antioxidants · Boosts Immunity · Good for Daily Wellness |
| Wild Forest Honey | Pure & Raw · Natural Energy Booster · Rich in Minerals & Enzymes |
| Small Bee Honey | 100% Pure & Natural · Rich in Nutrients · Supports Overall Health |

### Benefits strip
RICH IN NUTRIENTS · BOOSTS ENERGY · SUPPORTS IMMUNITY · GOODNESS IN EVERY BITE

### Contact
- **Address:** Bagirtha Colony, Opposite to Junior Champs School, Mahabubnagar, Telangana
- **Mobile:** 9381466419
- **Packaging seen:** bottle "PURE COW MILK / 1 Litre", jar "PURE HONEY", tub "PREMIUM ICE CREAM", jars "MULTIFLORA / WILD FOREST / SMALL BEE HONEY"

### NOT on the banner — flagged, not invented
| Missing | Handling |
|---|---|
| Prices (any) | Omitted entirely. `price?: string` stays `undefined`; card shows WhatsApp CTA instead |
| PIN code | Omitted. Address renders without it — hurts Maps geocoding (Risk 10) |
| Email | Omitted. No email anywhere on the site |
| Business hours | `hours?` slot in content module, **user to supply**; section does not render until populated |
| Delivery area | Same — `deliveryAreas?: string[]`, section hidden while empty |
| Website / domain | Not yet purchased (Risk, B8) |
| Social handles | None exist. No social row in footer |
| WhatsApp number | **Assumed same as 9381466419** — must be confirmed in Phase 0 |
| FSSAI licence no. | Omitted per user decision. See Risk 7 |
| GST / legal entity | Omitted |
| Any certification | None exist |

## A2. Colours extracted from the banner (pixel-sampled)

Sampled with GDI+ over the 960×1280 JPEG using dominant-mode analysis per region, not eyeballed.

| Role | Hex | Measurement site | Evidence |
|---|---|---|---|
| Forest (warm) | `#184010` | footer contact bar | mode over 29,404 px; direct pixel `#153C0F` |
| Gold deep | `#A16F0E` | wordmark strokes, bottom-strip ground | hue-filtered 25–60°, sat ≥ 0.45 |
| Gold light | `#E8B84C` | bottom-strip lettering, icon highlights | mode within bottom strip |
| Cream ground | `#F8F0DB` | benefits strip | direct pixel; mode `#F8F0D8` |
| Chip: Curd | `#486810` | product chip row | |
| Chip: Paneer | `#D07000` | product chip row | |
| Chip: Honey | `#D09000` | product chip row | |
| Chip: Sweets | `#A048B0` | product chip row | |
| Chip: Ice Cream | `#C02050` | product chip row | |
| Label: Multiflora | `#701070` | honey label | |
| Label: Wild Forest | `#185008` | honey label | |
| Label: Small Bee | `#600000` | honey label | |

**Decision: the 8 chip/label colours are documented but NOT adopted.** Adding five more hues would restructure the palette and break the template's restraint. Products are differentiated by illustration + Forest/Gold only. Flagged as a possible disagreement (Risk 13).

## A3. Palette: before → after

Three moves. Two adjustments, one addition. **Sage, Olive and Moss are not touched.**

| Token | Before | After | Justification |
|---|---|---|---|
| **Forest** | `#01472e` | `#184010` | Template's forest is **teal/blue-leaning (hue ≈160°)**; the banner's is **warm/yellow-leaning (hue ≈100°)**. Forest is the single most load-bearing token — footer ground, *all* dark text, shadow tint — so leaving it teal makes every screen read as a different brand than the banner. Contrast on cream actually improves: 10.28:1 → 10.38:1. |
| **Cream** | `#fefae0` | `#F8F0DB` | Measured page ground from the banner's benefits strip. Template's cream is ~3% lighter and less saturated. Tiny shift, but this is the page ground, so it sets overall warmth. No practical contrast change. |
| **GoldLight** | *(none)* | `#E8B84C` | **The one addition.** Gold is co-primary on the banner (wordmark, footer-bar ground, icon pins) and the template has no warm token at all — without it the site reads as a generic organic template. Chosen at `#E8B84C` rather than the deeper `#A16F0E` because only the light value clears AA on Forest (6.40:1 vs 2.69:1). |
| Sage | `#ccd5ae` | *unchanged* | Hero ground. Banner has no sage equivalent; warming it would collapse Hero and Products into one colour. |
| Olive | `#e9edc9` | *unchanged* | Products ground. Same reasoning. |
| Moss | `#a3b18a` | *unchanged* | Retained per user decision; earns its place as the footer's low-emphasis text colour (5.18:1 on Forest — see A3.1). |

### A3.1 Gold usage rule (enforced, not advisory)

Gold `#E8B84C` is **dual-purpose** and each use passes AA at exactly 6.40:1:

- ✅ **Gold as text on Forest** → 6.40:1
- ✅ **Gold as a fill with Forest text on it** → 6.40:1
- ❌ **Gold as text on Cream / Sage / Olive** → 1.62:1 / 1.20:1 / 1.53:1 — **forbidden**

This is encoded in the `Section` and `Pill` primitives (B3) so it cannot be violated by a section author.

### A3.2 Mechanical consequence (not a separate token change)
Template's shadow tint `rgba(1, 71, 46, 0.2)` → `rgba(24, 64, 16, 0.2)`. This is Forest re-expressed, not a new decision.

## A4. What is explicitly NOT changing

So the template can be verified intact after implementation:

**Typography — untouched.** Anton for display, Inter for body. Hero 23vw, section titles 15vw, leading 0.75, letter-spacing −0.05em, label tracking 0.2em–0.4em, weights 400/700, uppercase labels.

**Layout system — untouched.** Vertically stacked colour-blocked sections; fixed top nav; centre pill nav with `backdrop-filter: blur(20px)` on `#ffffff1a`; 3-column product grid with `aspect-ratio 4/5` cards; 12-column footer grid split 6/6.

**Radii — untouched.** 5rem sections, 2.5rem cards/images, 3rem floating organic cards. No sharp corners anywhere.

**Motion — untouched.** `cubic-bezier(0.16, 1, 0.3, 1)` on every transition; reveal from `translateY(100px)`/`opacity 0` over 1.2s; `float` keyframes at −20px / 5deg; parallax speed factor 0.05; 0.05s per-letter stagger in the hero.

**Texture — untouched.** Fixed SVG fractal-noise overlay at 0.04 opacity across the viewport.

**Section colour assignment — untouched.** Hero = Sage, Products = Olive, Footer = Forest.

**Component behaviours — untouched.** Blur-reveal card overlay (`rgba(forest, 0.3)` + `blur(2px)`, inner button translates up 32px, white bg / Forest text / tracking-widest). "No black text — always Forest" rule.

## A5. Design-pattern changes (four, all minute)

| # | Change | Why it earns its place |
|---|---|---|
| 1 | **Gold hairline at section seams** — a 2px `GoldLight` rule along the top edge of each 5rem-rounded section boundary | The banner separates every band with a gold or green rule. Cheapest possible way to import that rhythm. Touches no radius, no spacing, no type. |
| 2 | **Product card caption → gold-filled pill** — replace the plain caption with Forest text on a `GoldLight` pill | Directly mirrors the banner's coloured product chips. Reuses the existing pill shape already in the nav spec. One component-level touch. |
| 3 | **Footer bottom row → full-bleed gold strip** carrying "PURE FOOD • PURE LIFE • PURE YOU" in Forest; copyright line moves from **30% → 100% Moss** | Reproduces the banner's signature bottom strip. The opacity change is **forced by accessibility**: Sage at 30% over Forest computes to ≈1.9:1 and fails. Moss at 100% gives 5.18:1. |
| 4 | **Claim / benefit icons → Forest-filled circle with Gold glyph** | Exactly what the banner does. Reuses the "large circular CTA button" shape already specified in the template's Product Grid. No new size or radius introduced. |

**Not changed by any of the above:** spacing scale, type scale, radii, animation curves, noise overlay, grid structure, section ordering.

## A6. Content mapping: `template.md` → real content

| Template section | Real content | Note |
|---|---|---|
| Header / Nav — logo | `PALAMURU DAIRY` (image, see Risk 2) | |
| Header / Nav — links | Products · Honey · Why Us · Visit | |
| Header / Nav — **cart + counter** | → **Call / WhatsApp pill** | **Structural deletion.** No e-commerce exists (Risk 4) |
| Hero — 23vw Anton word | `PALAMURU` | 8 chars ≈ 54vw in Anton — fits |
| Hero — sub-line | PURE BY NATURE, TRUSTED BY GENERATIONS | |
| Hero — dual-column bottom | L: "Bringing You the Goodness of Nature" · R: MAHABUBNAGAR, TELANGANA | Template's "location/origin labels" — exact fit |
| Product grid (3-col) | 6 products → **3 × 2** | Exact fit, no layout change |
| *(new)* Honey range | 3 varieties → **3 × 1**, same grid | Rendered as a **variant** of the existing grid, not a new layout |
| *(new)* Claims | 4 claims → About / Why Us section | |
| *(new)* Benefits strip | 4 benefits → 4-col band inside existing `Section` | One added band; reuses colour-block pattern |
| *(new)* Visit | Address + hours + delivery + Call/WhatsApp | Occupies footer's left 6 columns |
| Footer — **newsletter signup** | → **Visit block** | **Structural deletion.** No form, no list, no backend (Risk 5) |
| Footer — right 6 cols | Products / Honey / Visit + legal links | Unchanged structure |
| Footer — bottom | Gold strip + copyright | Per A5.3 |

## A7. Asset mapping

All 14 files are 663×450. **11 are true PNG with alpha; 3 are WebP renamed `.png`** (verified by magic bytes `RIFF…WEBP`).

| Asset | Section / component | Role |
|---|---|---|
| `holding-container-and-standing-with-a-cow` (2252599) | **Hero** | Primary floating organic card, right. Contains a cow — echoes the logo mark |
| `holding-a-container-on-his-shoulder` (2252601) | **Hero** | Secondary floating card, left. Arms-up silhouette reads well at small size |
| `is-extracting-milk-from-the-cow-in-bucket` (2252593) ⚠ WebP | **About** → "Made from fresh milk" | The source-of-milk proof image |
| `is-filling-milk-in-container-with-bucket` (2252598) | **About** → process | Second process beat |
| `holding-milk-container` (2252602) | **Products** → Pure Cow Milk card | |
| `is-holding-milk-containers-in-both-hands` (2252603) | **Products** → Curd card | |
| `is-giving-milk-to-the-customer…` (2252597) ⚠ WebP | **Products** → Paneer card | Over-the-counter service |
| `is-going-for-selling-milk-on-motorbike` (2252595) | **Visit** → delivery area | Literal delivery |
| `is-holding-the-whiteboard-in-his-hands` (2252596) | **Visit** → hours | Blank board is a natural slot for hours text |
| `is-working-on-the-laptop` (2252605) | **Visit** → order CTA | |
| `is-holding-a-laptop-in-hand` (2252606) | *reserve* | Redundant with 2252605 |
| `is-counting-the-money` (2252592) ⚠ WebP | **EXCLUDE** | Money-counting undercuts the trust framing |
| `holding-money-in-hand-and-showing-victory-sign` (2252591) | **EXCLUDE** | Same reason |
| `is-mixing-water-in-milk` (2252604) | **EXCLUDE — hard** | Depicts **milk adulteration**. Brand-fatal for a "100% pure, no chemicals" dairy |

**Gaps and hazards:**
- **Honey, Sweets and Ice Creams have no illustration** (3 of 6 products). Recommendation for launch: typographic Forest/Gold cards with no image. Sourcing 3 matching illustrations is the better fix (Risk 6).
- Each illustration sits on a warm-grey ellipse shadow (≈`#7a6a63`) that will read slightly off against Sage/Olive. Acceptable; mask if it bothers on review.
- **Rename the 3 WebP files to `.webp` in Phase 0.** Serving WebP bytes as `image/png` breaks image CDNs and optimizer pipelines.

---

# PART B — REACT APPLICATION PLAN

## B1. Scaffolding and full config surface

**Stack:** Vite 7 + React 19 + TypeScript 5.9 + Tailwind CSS v4. Package manager **npm** — ships with Node, lockfile v3, one fewer thing to explain at handoff.

**`.nvmrc`** → `22`. Vite 7 requires Node ≥20.19; 22 is active LTS through Oct 2027.

### `vite.config.ts`
| Setting | Value | Reason |
|---|---|---|
| `plugins` | `@vitejs/plugin-react-swc`, `@tailwindcss/vite` | SWC over Babel — no Babel plugins needed, faster HMR. Tailwind v4 via its Vite plugin, not PostCSS |
| `build.target` | `es2022` | Audience is Indian mobile Chrome. es2022 is safe and cuts transpile weight vs es2015 |
| `build.sourcemap` | `false` in prod | No error-tracking service consumes them; don't ship source of a commercial site |
| `build.rollupOptions.output.manualChunks` | **omitted deliberately** | A 6-section brochure site does not need manual chunking. The lazy boundaries in B4 already split it |
| `build.modulePreload.polyfill` | `false` | Prevents Vite emitting an inline `<script>` that would need a CSP hash (see B5) |
| `resolve.alias` | `@`→`src`, `@shared`, `@features`, `@content` | Must mirror tsconfig `paths` — see the duplication caveat below |
| `server.port` / `preview.port` | 5173 / 4173 | |
| `define` | **nothing** | No env value gets baked in beyond Vite's own `import.meta.env` |

> **Known cost:** TS `paths` affects type resolution only; Vite `alias` affects runtime only. Both must be edited together. There is no way around this short of adding `vite-tsconfig-paths` — which is one more dependency for a 4-line duplication. Not worth it.

### `tsconfig` (project references: `tsconfig.json` → `tsconfig.app.json` + `tsconfig.node.json`)

In `tsconfig.app.json`, `"strict": true` **plus the four flags `strict` does not include**:
- `noUncheckedIndexedAccess` — **the one that actually earns its place here.** The content module is array-driven (`products[0]`), and this forces the undefined check at every access.
- `exactOptionalPropertyTypes` — `hours?: string` must mean "absent", never "explicitly undefined". Directly supports the "flag, don't invent" discipline.
- `noImplicitOverride`, `noFallthroughCasesInSwitch`

Plus `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`, `isolatedModules`, `moduleResolution: "bundler"`, and `paths` mirroring the Vite aliases.

### Tailwind v4 — tokens as single source of truth

Config lives in **CSS** via `@theme` in `src/styles/tokens.css`, not `tailwind.config.js`.

**Why v4 specifically:** `@theme` emits real CSS custom properties, so one token declaration is readable from both a Tailwind utility (`bg-forest`) *and* raw CSS (`var(--color-forest)`). That duality is what makes "nothing below the primitive layer touches raw hex" mechanically enforceable rather than a convention.

Tokens declared:
```
--color-forest  #184010     --font-display   Anton
--color-sage    #ccd5ae     --font-body      Inter
--color-olive   #e9edc9     --radius-section 5rem
--color-cream   #f8f0db     --radius-card    2.5rem
--color-moss    #a3b18a     --radius-float   3rem
--color-gold    #e8b84c     --ease-signature cubic-bezier(0.16,1,0.3,1)
                            --shadow-float   0 25px 50px -12px rgb(24 64 16/0.2)
```
Spacing scale stays at Tailwind's default — no reason to invent one.

> **Fallback:** if the project ends up on Tailwind v3, the same tokens go in `tailwind.config.ts` under `theme.extend`, and the CSS-variable duality must be wired by hand. Prefer v4.

### ESLint (flat config, `eslint.config.js`)
`typescript-eslint` **strictTypeChecked** · `eslint-plugin-react-hooks` · `react-refresh` · **`eslint-plugin-jsx-a11y`** · `eslint-plugin-import`

- **jsx-a11y earns its place**: it is the only automated check that catches a missing `alt` or a click handler on a non-interactive element on a site with no QA process.
- `react/no-danger`: **error** (B5)
- `react/jsx-no-target-blank`: **error** (B5)
- `import/no-restricted-paths`: the boundary rule (B2)

### Prettier
`prettier` + **`prettier-plugin-tailwindcss`** (sorts utility strings — real value once class strings get long) + `eslint-config-prettier`. Config: `semi: false`, `singleQuote: true`, `printWidth: 100`.

### `.env.example`
Two public values only:
```
VITE_SITE_URL=https://<domain-tbd>
VITE_WHATSAPP_NUMBER=919381466419
```
With a comment stating the exposure rule inline. **This site has zero secrets** — the phone and WhatsApp numbers are already printed on a public banner.

### `.gitignore`
`node_modules` · `dist` · `.env` · `.env.local` · `.env.*.local` · `*.local` · `coverage` · `.DS_Store` · `.vite` · `.eslintcache`
**Explicitly NOT ignored:** `package-lock.json`.

### `package.json` scripts
| Script | Command |
|---|---|
| `dev` | `vite` |
| `build` | `tsc -b && vite build` |
| `preview` | `vite preview` |
| `lint` | `eslint .` |
| `lint:fix` | `eslint . --fix` |
| `lint:tokens` | grep gate — fails if any hex appears in `src/**/*.tsx` (B3) |
| `typecheck` | `tsc -b --noEmit` |
| `test` | `vitest run` |
| `test:watch` | `vitest` |
| `format` | `prettier --write .` |
| `format:check` | `prettier --check .` |
| `ci` | `npm run typecheck && npm run lint && npm run lint:tokens && npm run test && npm run build` |

Plus `"engines": { "node": ">=20.19" }`.

## B2. Folder architecture (feature-based)

```
palamuru-dairy/
├─ .github/
│  ├─ workflows/ci.yml
│  └─ dependabot.yml
├─ public/
│  ├─ _headers                    # CSP + security headers, version-controlled
│  ├─ favicon.svg
│  ├─ robots.txt
│  ├─ sitemap.xml
│  └─ og-image.jpg
├─ src/
│  ├─ app/
│  │  ├─ App.tsx                  # composes features; owns lazy boundaries
│  │  └─ ErrorBoundary.tsx
│  ├─ content/                    # ALL copy. Typed data. Imports nothing but ./types
│  │  ├─ types.ts                 # Product, HoneyVariety, Claim, Benefit, NavItem, BusinessInfo
│  │  ├─ business.ts              # name, taglines, address, phone, whatsapp, hours?, deliveryAreas?
│  │  ├─ products.ts              # 6 products
│  │  ├─ honey.ts                 # 3 varieties
│  │  ├─ claims.ts                # 4 claims
│  │  ├─ benefits.ts              # 4 benefits
│  │  └─ nav.ts
│  ├─ features/                   # may import shared + content. NEVER each other
│  │  ├─ nav/       { Nav.tsx, useMobileMenu.ts, index.ts }
│  │  ├─ hero/      { Hero.tsx, FloatingCard.tsx, useParallax.ts, index.ts }
│  │  ├─ products/  { ProductGrid.tsx, ProductCard.tsx, index.ts }
│  │  ├─ honey/     { HoneyRange.tsx, index.ts }
│  │  ├─ about/     { About.tsx, ClaimRow.tsx, index.ts }
│  │  ├─ benefits/  { BenefitsBand.tsx, index.ts }
│  │  ├─ visit/     { Visit.tsx, index.ts }        # address, hours, delivery, CTAs — NO form
│  │  └─ footer/    { Footer.tsx, index.ts }
│  ├─ shared/                     # may import content + styles. NEVER features
│  │  ├─ ui/                      # PRIMITIVES — the only layer that names tokens
│  │  │  ├─ Section.tsx  Container.tsx  Heading.tsx  Button.tsx  Pill.tsx
│  │  │  └─ index.ts
│  │  ├─ hooks/     { useReveal.ts, usePrefersReducedMotion.ts, useMediaQuery.ts }
│  │  ├─ lib/       { cn.ts, links.ts }            # links.ts = tel: / wa.me builders
│  │  └─ assets/illustrations/
│  ├─ styles/
│  │  ├─ tokens.css               # @theme — SINGLE SOURCE OF TRUTH
│  │  ├─ global.css
│  │  └─ noise.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ tests/setup.ts
├─ .env.example  .nvmrc  eslint.config.js  prettier.config.js
├─ tsconfig.json  tsconfig.app.json  tsconfig.node.json
└─ vite.config.ts                 # `test` block lives here — one fewer config file
```

### Dependency direction

```
app  →  features  →  shared  →  { content, styles }
                        ↑
                     content  (leaf: imports nothing but its own types)
```

**Rules:** `shared` must never import `features`. `features` must never import each other — cross-feature reuse gets promoted to `shared`. `content` is a leaf.

### Enforcement — `eslint-plugin-import`

**Two rules, because one is not enough:**

1. **`import/no-restricted-paths`** — zones:
   - `{ target: './src/shared', from: './src/features' }` — shared may not reach into features
   - `{ target: './src/shared', from: './src/app' }`
   - `{ target: './src/content', from: './src/features' }` and `{ target: './src/content', from: './src/shared' }` — content stays a leaf

2. **`import/no-internal-modules`** with `allow: ['@features/*', '@shared/*', '@shared/ui', '@content/*', …]` — this is the reliable half of the cross-feature rule. It forces every cross-feature import through the feature's `index.ts` barrel, which is what actually stops `features/honey` from reaching into `features/products/ProductCard`.

> **Be honest about this:** the cross-feature restriction is the one people get wrong. `no-restricted-paths` alone cannot cleanly express "features may not import *sibling* features" — `no-internal-modules` plus barrels is the enforceable version.

## B3. Design system layer

**Hard rule: `src/styles/tokens.css` is the only file in the repo containing a hex value.**

**Enforcement:** an ESLint rule cannot reliably see hex inside arbitrary string expressions. The enforceable version is a CI grep:
```
npm run lint:tokens   →   grep -rEn '#[0-9a-fA-F]{3,8}\b' src --include=*.tsx --include=*.ts
                          (excluding src/content) must return nothing
```
Runs in `npm run ci`. This is a real gate, not a convention.

### Layer 1 — Tokens (`tokens.css`)
The 6 colours, 3 radii, 2 font families, 1 easing curve, 1 shadow. Nothing else.

### Layer 2 — Primitives (`shared/ui`) — the only components that name tokens

| Primitive | API | Why this shape |
|---|---|---|
| `Section` | `tone: 'sage'\|'olive'\|'cream'\|'forest'`, `roundTop?`, `seam?`, `id` | Owns the 5rem top radius, section padding, the A5.1 gold seam, and the `aria-labelledby` wiring. Tone is the *only* colour decision a section author makes |
| `Container` | `width: 'default'\|'wide'\|'full'` | Max-width + gutters. One prop, three cases |
| `Heading` | `as: 'h1'\|'h2'\|'h3'`, `variant: 'hero'\|'section'\|'card'\|'label'` | **Decoupling `as` from `variant` is the point.** It lets the honey section be a semantic `h2` sized like a card heading without breaking the document outline. This single split is what keeps the a11y heading structure correct under a design that sizes purely for impact |
| `Button` | `variant: 'solid'\|'circle'\|'ghost'`, `tone: 'forest'\|'gold'\|'cream'`, `href?` | Renders `<a>` when `href` is present, `<button>` otherwise. Polymorphic by *presence of href*, not by an `as` prop — there are exactly two cases, so a generic polymorphic component is unearned complexity |
| `Pill` | `tone: 'gold'\|'sage'` | The A5.2 caption + the nav's Call/WhatsApp pill |

`Section`, `Button` and `Pill` encode the **A3.1 gold rule**: `tone="gold"` always pairs Gold fill with Forest text, and there is no API path that produces gold text on a light ground.

### Layer 3 — Composed sections (`features/*`)
Hero · ProductGrid · HoneyRange · About · BenefitsBand · Visit · Footer.
These import **primitives + content only**. They never name a token, never name a hex, never name a radius.

## B4. Named patterns — and what I am rejecting

### Patterns that earn their place

**1. Content / config module** — *highest-value pattern on this project by a wide margin.*
Every string from the banner lives in `src/content/*.ts` as typed data. A price change, a new product, a phone change, or a future Telugu translation becomes a data edit, not a JSX edit. It also makes the "flag, don't invent" discipline **mechanical**: `hours?`, `price?`, `fssai?` are `undefined`, and with `exactOptionalPropertyTypes` the section literally cannot render a placeholder — it renders nothing.

**2. Composition over props-drilling**
`Section` takes `children`. `Products` composes `Section > Container > Heading + ProductCard[]`. No prop travels more than one level. Concretely: no `theme` prop is threaded anywhere — tone lives on `Section` and descendants read CSS custom properties.

**3. Compound components — in exactly one place: `ProductGrid`**
It has two variants (6 dairy products / 3 honey varieties) that share the grid, reveal timing, blur-reveal hover, and card shell but differ in column count and caption. `ProductGrid.Root / .Heading / .Card` lets `HoneyRange` reuse it without an `isHoney` boolean.
**Every other section gets plain props.** Hero, About, Visit and Footer have one variant each — compound there is ceremony.

**4. Custom hooks for behavior**
`useReveal` (IntersectionObserver → the template's `translateY(100px)` / 1.2s / signature curve), `useParallax` (scroll → the 0.05 speed factor), `usePrefersReducedMotion`, `useMobileMenu`. Behaviour is separated from markup so reveal logic is unit-testable without rendering a section.

**5. Error boundary — one, at the app root**
Justification is thin but real: a brochure site with zero dynamic data can still white-screen when a lazy chunk 404s against a stale CDN cache after a deploy. One boundary rendering the phone number and address as static fallback is worth ~30 lines. **Not** per-section boundaries — there is no independently-failing subsystem here.

**6. Lazy loading + Suspense for below-the-fold sections**
Nav and Hero eager; Products, Honey, About, Benefits, Visit, Footer behind `React.lazy` under a single `<Suspense>` with fixed-height skeletons to prevent CLS.
**Honest caveat:** on a site this small the JS saving is a few KB. **The real win is deferring the illustration imports**, which is where the weight actually is. If measurement in Phase 6 shows <10 KB saved, delete this and simplify.

### Patterns rejected — and why

| Rejected | Reason |
|---|---|
| **State management** (Redux/Zustand/Jotai) | There is no cross-component state. Mobile-menu open/closed is `useState` inside `Nav` |
| **Router** (react-router) | Single page, anchor navigation. Costs a dependency plus a 404/SSR story for zero benefit. If a Privacy page is needed later, add a second static entry to `rollupOptions.input` — not a router |
| **i18n framework** | Telugu was not requested. The content module already isolates every string; if it comes, swap `content/en/*` for a locale map. Do not pre-build it |
| **Render props / HOCs** | Hooks cover every case here |
| **Storybook** | Five primitives. Story maintenance would exceed the value; review them in the running app |
| **Atomic Design** (atoms/molecules/organisms) | A type-based taxonomy in disguise — it directly fights the feature-based tree |
| **CMS / headless backend** | Content changes maybe quarterly. A typed `.ts` file plus a redeploy is cheaper and has zero attack surface |
| **Animation library** (Framer Motion ≈35 KB gz) | The template specifies exactly one easing curve and two transforms. CSS transitions + IntersectionObserver do it in ~40 lines. Revisit only for scroll-linked sequences |
| **Form library** (react-hook-form) | There is no form |

## B5. Security and hardening

### Headers — `public/_headers` (read by both Cloudflare Pages and Netlify, so the choice stays portable)

```
/*
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'; manifest-src 'self'; upgrade-insecure-requests
  Strict-Transport-Security: max-age=63072000; includeSubDomains
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  X-Frame-Options: DENY
```

**The decisions embedded in that policy:**

- **`connect-src 'none'`** is only achievable because there is no form and no analytics script. Adding Google Analytics later would require loosening both `connect-src` and `script-src` — a measurable weakening. **Use Cloudflare Web Analytics instead**: server-side, no client script, no cookie, no CSP change.
- **`style-src 'self'` forces a font decision.** Google Fonts would need `https://fonts.googleapis.com` in `style-src` and `https://fonts.gstatic.com` in `font-src`. Instead: **self-host Anton and Inter via `@fontsource/anton` + `@fontsource/inter`.** Keeps `'self'`, removes a third-party request, and eliminates a render-blocking round trip. This is a real trade, not boilerplate.
- **React inline styles are fine under `style-src 'self'`.** CSP governs *parsed* inline styles (`<style>` elements and `style="…"` attributes in markup); it does not govern CSSOM writes, and React's `style` prop goes through CSSOM. So the parallax transform needs no `'unsafe-inline'`. **The one thing that would break it** is an inline `<style>` or `<script>` surviving in `dist/index.html` — hence `build.modulePreload.polyfill: false` in B1. Verify with a grep of the built HTML in Phase 7.
- **`X-Frame-Options: DENY`** is redundant with `frame-ancestors 'none'` but costs nothing and covers older browsers.
- **HSTS ships without `preload` initially.** Add `preload` and submit to hstspreload.org only after a month of confidence that every subdomain is HTTPS-only forever — preload is effectively irreversible.
- **`img-src` includes `data:`** because Vite inlines assets under `assetsInlineLimit` as data URIs.
- **No `frame-src`** — the Google Map is a **link out, not an embed**. An embedded map would require loosening `frame-src` and would set third-party cookies, which would then require a consent banner. Linking out avoids all of it.

### The `VITE_` exposure rule
Vite replaces `import.meta.env.VITE_*` with **string literals at build time**. `dist/assets/*.js` is a publicly served file. Therefore **a `VITE_`-prefixed variable is equivalent to publishing its value on a webpage.** Variables without the prefix are stripped and unavailable at runtime — that is the guardrail.

On this site there are genuinely **zero secrets**: the phone and WhatsApp numbers are already printed on a banner handed out in public. `.env.example` holds only public values, and CI needs no `.env` at all.

### Dependency policy
- `package-lock.json` **committed**; CI uses `npm ci`, never `npm install`
- `npm audit --omit=dev --audit-level=high` as a **failing** CI gate. `--omit=dev` is deliberate: frontend `npm audit` has a high false-positive rate from dev-only transitive advisories that never reach a user. The full report is reviewed separately, not gated on
- `.github/dependabot.yml` — weekly for `npm` and `github-actions`, minor/patch **grouped into one PR** to avoid noise
- `engines.node: ">=20.19"` pinned

### Forms, validation, honeypot, rate limiting
**There is no form.** No endpoint, no PII, no validation library, no honeypot, no rate limiter — **because there is nothing to submit to. State this as a security feature, not an omission.**

If a form is ever added, the decisions are pre-made so they are not reinvented under pressure:
- **`zod`** for schema validation, same schema shared client and server
- A hidden `_gotcha` **honeypot** field, plus a submit-time floor (reject submissions <3s from mount)
- **Per-IP token bucket at the edge** (Cloudflare KV), 5 submissions/hour
- `form-action` in the CSP updated to the specific endpoint, never `*`

### Other hardening
- **External links:** every `target="_blank"` carries `rel="noopener noreferrer"` — applies to the Maps link and `wa.me`. Enforced by `react/jsx-no-target-blank` set to **error**. Modern browsers imply `noopener`, but the rule costs nothing and also covers referrer leakage
- **`dangerouslySetInnerHTML`: banned.** All content is typed TS strings rendered as text. Enforced by `react/no-danger` at **error**. If a description ever needs paragraph breaks, it becomes `string[]`, not HTML
- **HTTPS/TLS:** Cloudflare Pages issues and renews certs automatically. Enable "Always Use HTTPS" and set Minimum TLS to 1.2 in the dashboard — these are dashboard settings, not `_headers`
- **SRI:** not applicable; there are no external scripts

### What data this site collects
**None.** No cookies. No `localStorage`. No analytics script. No form. No third-party embeds. No Google Fonts (self-hosted). No map iframe.

The only data that exists anywhere is Cloudflare's edge access logs (IP + user-agent, per their retention policy), which we neither control nor read. A one-paragraph privacy note in the footer states exactly this.

**Because nothing is collected, no consent banner is required** — which is a UX win, not just a compliance one.

## B6. Accessibility and performance budget

### Semantics and landmarks
- One `<header>` containing `<nav aria-label="Primary">`; one `<main>`; one `<footer>`
- Each section is `<section aria-labelledby="…">` pointing at its `Heading` id
- **Exactly one `<h1>`** — the hero. The 23vw display word must be the `h1`; the per-letter stagger spans get `aria-hidden="true"` with a visually-hidden plain-text copy alongside, so screen readers announce "Palamuru", not "P-A-L-A-M-U-R-U"
- Skip link to `#main`, visible on focus

### Keyboard
- Nav links in DOM order; mobile menu is a `<button aria-expanded>` toggling a panel — focus trapped only while open, `Escape` closes, focus returns to the trigger
- **The product card's blur-reveal button must appear on `:focus-within`, not only `:hover`.** As written, `template.md`'s hover-only reveal is keyboard-invisible. **This is the single most likely a11y bug in the template** and must be fixed at the `ProductCard` level

### Motion
`prefers-reduced-motion: reduce` disables the float keyframes, the parallax, and the 1.2s reveal (render at final state). Non-negotiable given how motion-dense this template is.

### Contrast — measured against the adjusted palette

| Foreground / Background | Ratio | Verdict |
|---|---|---|
| Forest `#184010` on Cream `#F8F0DB` | **10.38:1** | AAA |
| Cream on Forest | **10.38:1** | AAA |
| Forest on Olive `#e9edc9` | **9.79:1** | AAA |
| Forest on Sage `#ccd5ae` | **7.70:1** | AAA |
| Sage on Forest | **7.70:1** | AAA |
| **Gold `#E8B84C` on Forest** | **6.40:1** | AA normal ✅ |
| **Forest on Gold fill** | **6.40:1** | AA normal ✅ |
| Moss `#a3b18a` on Forest | **5.18:1** | AA normal ✅ |
| Gold on Cream | **1.62:1** | ❌ **FORBIDDEN** |
| Gold on Olive | **1.53:1** | ❌ **FORBIDDEN** |
| Gold on Sage | **1.20:1** | ❌ **FORBIDDEN** |
| Moss on Cream | **2.01:1** | ❌ **FORBIDDEN** |
| *(template's original)* Sage @30% on Forest | **≈1.9:1** | ❌ **fails — raised to Moss @100%** |

### Images
- **Rename the 3 mislabeled WebP files to `.webp`** — serving WebP bytes as `image/png` is a correctness bug
- Convert all 11 usable illustrations to **AVIF + WebP with PNG fallback** (`vite-plugin-image-optimizer`, or precompute with `sharp`)
- Every `<img>` gets explicit `width="663" height="450"` to reserve space
- Below the hero: `loading="lazy" decoding="async"`. The single hero illustration: `loading="eager" fetchpriority="high"`
- **Hard constraint: sources are only 663px wide.** Cap rendered display width at ~600 CSS px and build no `srcset` above 1×/2× of that. Upscaling these will look soft — this is not fixable in code (Risk 9)

### Fonts
Self-hosted, `font-display: swap`, `unicode-range` subset to latin. Preload **only** the two faces used above the fold: Anton 400 latin, Inter 400 latin.

### Budget
| Metric | Ceiling |
|---|---|
| JS (gzip, total) | **≤ 90 KB** |
| CSS (gzip) | **≤ 20 KB** |
| Images, first view | **≤ 400 KB** |
| LCP (4G, mid-range Android) | **< 2.0 s** |
| CLS | **< 0.05** |
| TBT | **< 150 ms** |
| Lighthouse mobile | **Perf ≥ 95 · A11y 100 · Best Practices 100 · SEO 100** |

> **Honest caveat:** the 23vw Anton hero word is the LCP element, and self-hosting makes LCP font-dependent. If LCP misses, the fix is preloading the Anton latin subset more aggressively — **not** shrinking the type. The type scale is not negotiable (A4).

### SEO
`LocalBusiness` / `Dairy` JSON-LD with name, address, telephone — and `openingHours` **only if hours are actually supplied**. Plus `<title>`, meta description, canonical, `og:*`, `twitter:card`, `lang="en-IN"`.

## B7. Testing approach

**Vitest + React Testing Library + jsdom**, with `@testing-library/jest-dom`, `@testing-library/user-event`, and `vitest-axe`. The `test` block lives inside `vite.config.ts` so aliases resolve without a duplicate config.

**Target: roughly 15–20 tests. No coverage threshold at all.**

### What gets tested

**1. Content integrity — the highest-value tests on a brochure site.**
Assert `business.phone` matches `/^\d{10}$/`; `whatsapp` is valid E.164; every product has a non-empty name and description; every honey variety has **exactly 3** bullets; every nav `href` resolves to a section id that is actually rendered. *These catch the real failure mode: someone edits a data file and silently breaks the page.*

**2. Link builders** — `tel:` and `wa.me` URL construction including message encoding. Pure functions, trivially cheap, and a malformed `wa.me` link is a lost customer.

**3. Primitives** (~6 tests) — `Button` renders `<a>` with `href` and `<button>` without; `Heading` honours `as` independently of `variant`; `Section` applies the correct tone. Locks the design-system contract.

**4. Accessibility smoke** — one `vitest-axe` pass over the fully-rendered page asserting zero violations; plus explicit assertions that exactly one `<h1>` exists and that the product card CTA is reachable via keyboard (the `:focus-within` fix from B6).

**5. Hooks** — `usePrefersReducedMotion` returns `true` when the media query matches (mocked `matchMedia`).

### What deliberately does NOT get tested
- **Visual appearance, animation timing, parallax offsets.** jsdom has no layout engine, so these tests would assert nothing real. Verify in a browser
- **IntersectionObserver reveal mechanics** beyond "the hook subscribes and cleans up"
- **Snapshot tests of section markup** — they break on every copy edit and catch nothing
- **Any coverage number.** I am not proposing 90%, or 70%, or any figure. Coverage over components that render static content measures nothing but keystrokes. The `test` script exists so CI fails loudly when content or the primitive contract breaks — that is its entire job
- **E2E (Playwright)** — not for launch. Add a single smoke spec only if the site later grows a form or a router

## B8. Build and deploy

**Output:** fully static `dist/` (`index.html` + hashed assets). **No SSR, no SSG framework** — there is no dynamic data and no route matrix, so prerendering is unearned cost.

**Preview:** `npm run preview` serves `dist/` on :4173.
> ⚠️ **`vite preview` does NOT apply `public/_headers`.** CSP must be verified on a real deploy preview URL, never locally. This is the classic way a broken CSP reaches production.

**Host recommendation: Cloudflare Pages.**
| Reason | Detail |
|---|---|
| Bandwidth | Unlimited on free tier — matters for a consumer site whose traffic arrives in unpredictable WhatsApp-forward spikes |
| Headers in git | `_headers` file support, so the CSP is version-controlled next to the code |
| Latency for the actual audience | Indian PoPs (Hyderabad, Mumbai, Chennai) |
| Analytics without CSP cost | Cloudflare Web Analytics is script-free and cookie-free |
| TLS + domain | Automatic HTTPS, free custom domain |

**Netlify is an equal-quality alternative using the identical `_headers` format** — the near-zero migration cost between them is itself the argument for picking either. Vercel is fine but uses `vercel.json` (different format) and has a tighter bandwidth free tier.

**CI — `.github/workflows/ci.yml`**, on push and PR:
`checkout` → `setup-node@v4` (`node-version-file: .nvmrc`, `cache: npm`) → `npm ci` → `typecheck` → `lint` → `lint:tokens` → `format:check` → `test` → `build` → `npm audit --omit=dev --audit-level=high` → upload `dist/` artifact.

Plus a **Lighthouse CI job on PRs** (`treosh/lighthouse-ci-action` + `budget.json` encoding the B6 ceilings). **Non-blocking for the first two weeks, then flipped to blocking** — so the budget is calibrated against reality before it can block a deploy.

**Deploy:** Cloudflare Pages Git integration. Production on `main`, automatic preview deploys per PR. No deploy keys in GitHub secrets. Build command `npm run build`, output directory `dist`, `NODE_VERSION=22`.

**Domain:** not yet purchased — a decision and a recurring cost the user has not yet made.

## B9. Implementation phases

| # | Phase | Exit criterion (verifiable) |
|---|---|---|
| **0** | **Unblock inputs** | Clean logo received as SVG or transparent PNG · WhatsApp number confirmed · hours + delivery area supplied **or explicitly deferred in writing** · 3 WebP files renamed to `.webp` · decision recorded on the 3 missing product illustrations |
| **1** | Scaffold + config | `npm run ci` passes on an untouched scaffold · `@/…` resolves in **both** `vite build` and `tsc -b` · a deliberately introduced `any` fails lint |
| **2** | Tokens + primitives | `npm run lint:tokens` returns nothing · all 5 primitives render · the 12-row contrast table in B6 is reproduced by a checked-in script |
| **3** | Content module | Every string from A1 exists in `src/content/*.ts` · **no string literal from A1 appears in any `.tsx`** · content-integrity tests pass · `hours`/`price`/`fssai` are `undefined` and their sections render nothing |
| **4** | Sections built | All 8 sections render at 360 / 768 / 1440px with no horizontal scroll · reveal, float and parallax match the template's exact curve and values · `prefers-reduced-motion` disables all three |
| **5** | Boundaries + lazy | A deliberate `shared → features` import **fails lint** · a deliberate deep cross-feature import **fails lint** · network panel shows below-fold chunks loading on scroll, not at boot · blocking a chunk request renders the error boundary showing the phone number |
| **6** | A11y + perf | axe reports zero violations · full keyboard traversal reaches every link **and the product card CTA** · Lighthouse mobile ≥ 95/100/100/100 **on a preview deploy** · all B6 budget numbers under ceiling |
| **7** | Security | CSP verified on a real preview URL with **zero console violations** · `dist/index.html` grepped for surviving inline `<script>`/`<style>` returns nothing · securityheaders.com grade **A+** · every `target="_blank"` carries `rel="noopener noreferrer"` |
| **8** | Ship | Custom domain live over HTTPS · HSTS present · CI green on `main` · Dependabot open and grouping · Lighthouse CI gate flipped to blocking |

---

## Risks and things you may disagree with

1. **The 6th token bends your rule.** You said no new colours; I asked, you approved `GoldLight`. Flagging anyway because it is the only constraint that got bent. Mitigation: it is an *addition*, not a restructure — Sage, Olive and Moss are byte-identical to the template.

2. **⚠️ Closest thing to a blocker — the wordmark cannot be reproduced in CSS.** The banner's gold-on-cream wordmark sits at **1.62:1**. It must ship as an image, and **we do not have a clean one** — the banner is a flat JPEG. Someone must supply the logo as SVG or transparent PNG, or the hero lockup will be a lossy crop.

3. **Anton is not the banner's typeface.** The banner's wordmark is a high-contrast serif; Anton is a condensed grotesque. You forbade typography swaps, so Anton stays for headings and the logo lives as an image. The result is coherent — but it is **not** the banner's type voice, and you should see it before Phase 4 ends.

4. **The cart is deleted from the nav.** `template.md` specifies a cart button with a numeric counter. There is no e-commerce. Replacing it with a Call/WhatsApp pill is a structural deletion from the template.

5. **The newsletter is deleted from the footer.** Same reason: no form, no list, no backend. The left 6 columns become the Visit block. The 12-column grid itself is untouched.

6. **Half the products have no illustration.** Honey, Sweets and Ice Creams (3 of 6). Launch recommendation is typographic cards; sourcing 3 matching illustrations is the better fix and costs money.

7. **No FSSAI number — I'd push back once.** You didn't select it. For an Indian food business, displaying the FSSAI licence number is a **legal requirement** and simultaneously the strongest trust signal available to a dairy competing on purity. Recommend getting it before launch. Your call; the content module has the slot ready either way.

8. **No prices.** This matches the banner, but price is the first question every visitor has. The entire load sits on the WhatsApp CTA. Expect a high volume of "how much?" messages — which may be exactly what your brother wants, or may be a support burden.

9. **Assets cap at 663×450.** Hero illustrations will be either small or soft. Not fixable in code, only by re-sourcing at higher resolution.

10. **The address has no PIN code, and "Bagirtha" is unverified.** Both hurt Google Maps geocoding and local SEO — which is the primary discovery channel for a neighbourhood dairy.

11. **`connect-src 'none'` is fragile to success.** The first time anyone wants Google Analytics or a Meta pixel, the strongest clause in the CSP goes. Cloudflare Web Analytics sidesteps this entirely — commit to it early rather than retrofitting.

12. **Lazy-loading 6 sections is borderline overkill.** I'm keeping it only because it defers the illustration chunks. Phase 6 measures it; if the saving is under 10 KB, delete it and simplify `App.tsx`.

13. **I dropped the banner's 5 chip colours and 3 honey-label colours.** Adopting them would restructure the palette, which you forbade. The cost is that products are visually less differentiated than on the banner. If you want them back, that is a separate, larger palette decision — not a token tweak.

---

## Verification

**Per phase:** the exit criteria in B9 are the test — each is a command that runs or a browser check with a binary outcome, not a judgment call.

**End-to-end, before shipping:**
1. `npm run ci` — typecheck, lint, token grep, tests, build all green
2. `npm run preview`, then walk the page **entirely by keyboard** — skip link → nav → every section → every product card CTA → footer links. Nothing unreachable, nothing invisible on focus
3. Toggle OS "reduce motion" and reload — float, parallax and reveal must all be inert
4. Chrome DevTools → Network throttled to Fast 3G, disable cache → confirm LCP < 2.0s and that below-fold chunks arrive on scroll, not at boot
5. Push to a branch → open PR → **verify CSP on the Cloudflare preview URL** (not locally) with the console open: zero violations
6. Run `securityheaders.com` against the preview URL → expect A+
7. Lighthouse mobile on the preview URL → 95/100/100/100
8. `grep -rE '#[0-9a-fA-F]{3,8}' src --include=*.tsx` → empty
9. Read `src/content/business.ts` side by side with the A1 transcription table — every field matches the banner, and every field the banner does not cover is `undefined`, not a placeholder
