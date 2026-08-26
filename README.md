# Palamuru Dairy

Static marketing site for Palamuru Dairy, Mahabubnagar, Telangana.

Vite + React + TypeScript + Tailwind v4. No backend, no form, no analytics,
no cookies. The conversion path is a phone call or a WhatsApp message.

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

- **All copy** is in `src/content/*.ts` as typed data. No string from the
  banner appears in any `.tsx`. Change content there, never in a component.
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

## Deploying

Static `dist/`. Recommended host: Cloudflare Pages (build `npm run build`,
output `dist`, `NODE_VERSION=22`). `public/_headers` is read by both
Cloudflare Pages and Netlify unchanged.

See `PLAN.md` section B8 and the launch checklist at the end of this file.
