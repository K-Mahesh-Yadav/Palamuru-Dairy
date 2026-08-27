# Palamuru Dairy

Static marketing site for Palamuru Dairy, Mahabubnagar, Telangana.

Vite + React + TypeScript + Tailwind v4. No backend, no form, no analytics,
no cookies. The conversion path is a phone call or a WhatsApp message.

Two languages, two static documents, no router:

| URL | Language | `<html lang>` |
|---|---|---|
| `/` | English | `en-IN` |
| `/te/` | తెలుగు | `te-IN` |

## Commands

```bash
npm install          # once, Node >= 20.19 (see .nvmrc)

npm run dev          # dev server        -> http://localhost:5173
npm run build        # typecheck + build -> dist/
npm run preview      # serve dist/       -> http://localhost:4173
npm run ci           # everything CI runs, in order
```

| Script | What it does |
|---|---|
| `dev` / `build` / `preview` | the usual |
| `typecheck` | `tsc -b --noEmit` |
| `lint` / `lint:fix` | ESLint, including the architecture boundary rules |
| `lint:tokens` | fails if a hex literal appears outside `src/styles/tokens.css` |
| `test` / `test:watch` | Vitest |
| `format` / `format:check` | Prettier |
| `contrast` | prints the WCAG table computed from the real token file |
| `verify:dist` | 25 post-build security assertions against `dist/` |
| `serve:headers` | serves `dist/` with `public/_headers` applied, for CSP checks |
| `optimize:images` | regenerates AVIF + WebP from the source illustrations |

**`npm run preview` does not apply `public/_headers`.** To check the CSP
locally, run `npm run build` then `npm run serve:headers` (port 8788).

## Where things live

- **All copy** is in `src/content/<locale>/*.ts` as typed data. No user-facing
  string appears in any `.tsx` — business copy *or* UI chrome. Change content
  there, never in a component. `src/content/parity.test.ts` fails if the two
  locales drift apart structurally.
- **Locale plumbing** is `src/shared/i18n`. Components read
  `const { products, ui } = useContent()`; the locale is fixed per build entry.
- **All colour** is in `src/styles/tokens.css`. It is the only file allowed a
  hex literal, and `npm run lint:tokens` enforces that.
- **Primitives** (`src/shared/ui`) are the only components that name a token.

### Dependency direction

```
app  ->  features  ->  shared  ->  { content, styles }
```

`shared` must never import `features`; features must never import each other;
`content` imports nothing. All three are enforced by ESLint, not convention —
try it and the build fails.

## Design source

`template.md` is the design system and is **read-only**. Three colour tokens
were changed against it (Forest, Cream, and Gold added); everything else —
typography, radii, motion curve, layout — is preserved verbatim. `PLAN.md`
records every decision and its reason.

## Live

| URL | Language |
|---|---|
| https://palamuru-dairy.vercel.app/ | English |
| https://palamuru-dairy.vercel.app/te/ | తెలుగు |

Production Lighthouse (mobile): performance 97, accessibility 100, best
practices 100, SEO 92. The SEO number is capped by our own CSP — see
`.lighthouseci-notes.md`; real crawlers are unaffected and the fix would be to
weaken a security header, so it stays.

## Deploying

Static `dist/` with two documents (`index.html`, `te/index.html`).

**Vercel** is the host: `vercel.json` carries the build config and every
security header. `public/_headers` is kept so the build stays portable to
Cloudflare Pages or Netlify, and `npm run verify:dist` asserts the two files
express the *same* policy — they cannot drift silently.

See `PLAN.md` section B8 and the launch checklist at the end of this file.
