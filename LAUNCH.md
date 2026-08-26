# Launch checklist

Everything below is blocked on information or accounts I do not have. The
code is complete and CI-green; these are the human steps.

## Blocked on you — Telugu review (NEW, and the top blocker)

| # | Item | Where |
|---|---|---|
| 0 | **Native review of the Telugu translation** | `src/content/te/*.ts` |

Every Telugu string was drafted by Claude and carries the English original in
a comment beside it, so the whole set reads in one pass. Product nouns and the
place name are low risk. The strings genuinely worth a second opinion:

- `business.wordmarkTagline` — ప్రకృతి సిద్ధమైన స్వచ్ఛత, తరతరాల నమ్మకం
- `business.scriptHeadline` — ప్రకృతి మంచితనాన్ని మీ ఇంటికి
- the four `claims`, the four `benefits`, and the nine honey bullets
- `ui.footer.privacyNote` — this is a factual claim to the visitor, so it must
  stay true as well as read well

`src/content/te/index.ts` exports `TRANSLATION_REVIEWED = false`. Flip it when
a fluent speaker has signed off. It is deliberately not a CI gate — no build
can judge a translation, and a check that fails from day one gets ignored.

## Blocked on you — content

| # | Item | Where it goes | Why it matters |
|---|---|---|---|
| 1 | **Logo file** (SVG or transparent PNG) | replaces the Anton wordmark lockup | The banner's gold-on-cream wordmark is 1.62:1 and cannot be CSS text. The banner JPEG is flat, so there is no clean source. This is the biggest visual gap. |
| 2 | **Confirm the WhatsApp number** | `src/content/business.ts` → `whatsapp` | Currently assumed identical to the banner mobile, `9381466419`. **Unverified.** A wrong number is a silently lost customer. |
| 3 | **FSSAI licence number** | `business.fssai` | Legally required display for an Indian food business, and the strongest trust signal a dairy competing on purity has. The footer renders it the moment it is filled in. |
| 4 | **Opening hours** | `business.hours` | Not on the banner. The Visit section renders no hours block while absent. Also unlocks `openingHours` in the JSON-LD. |
| 5 | **Delivery areas** | `business.deliveryAreas` | Not on the banner. Section hidden while absent. |
| 6 | **PIN code** | `business.address.pincode` | Not on the banner. Hurts Google Maps geocoding, which is the main discovery channel for a neighbourhood dairy. |
| 7 | **Confirm "Bagirtha Colony" spelling** | `business.address.line1` | Transcribed from the banner; could be Bhagirtha / Bhagiratha. Wrong spelling breaks Maps search. |
| 8 | **Prices**, if you want them | `products[].price` | Deliberately absent, matching the banner. Every visitor's first question is price, and right now the WhatsApp CTA carries all of it. |
| 9 | **3 missing illustrations** | Honey, Sweets, Ice Creams | No matching asset exists, so those three render as typographic cards. Sourcing three in the same flat-vector style is the fix. |

## Blocked on you — accounts

| # | Item | Note |
|---|---|---|
| 10 | **Buy a domain** | Then set `VITE_SITE_URL`, the `<link rel="canonical">` in `index.html`, `public/robots.txt` and `public/sitemap.xml`. All four currently say `palamurudairy.example`. |
| 11 | **Cloudflare Pages project** | Build `npm run build`, output `dist`, `NODE_VERSION=22`. Connect the repo; production on `main`, preview per PR. |
| 12 | **Enable Always Use HTTPS + min TLS 1.2** | Dashboard settings, not `_headers`. |
| 13 | **Cloudflare Web Analytics** | Script-free and cookie-free, so it needs no CSP change. Do NOT add Google Analytics — it would force loosening both `connect-src` and `script-src`. |
| 14 | **Push to GitHub** | Repo is committed locally but has no remote. Dependabot and CI only start once it is pushed. |

## After first deploy — verify on the real URL

- [ ] Open the deploy preview with DevTools console open: **zero CSP violations**
- [ ] `securityheaders.com` against the URL: expect **A+**
- [ ] Lighthouse mobile on **both** `/` and `/te/` (local: 97 and 96, all other categories 100)
- [ ] Switch language both ways and confirm the URL changes to `/te/` and back
- [ ] Tab through the whole page: skip link → nav → each product card CTA → footer
- [ ] Test `tel:` and the WhatsApp link **on a real phone**, not a desktop browser
- [ ] Submit the domain to Google Search Console

## Deferred deliberately

- **HSTS `preload`** is intentionally NOT in `_headers`. Add it and submit to
  hstspreload.org only after a month of confidence that every subdomain is
  HTTPS-only forever — preload is effectively irreversible.
- **Lighthouse CI is non-blocking** for two weeks (`continue-on-error: true`
  in `.github/workflows/ci.yml`). Remove that line once the budget is
  calibrated against real runs.
- **Auto-redirect by `Accept-Language`** was not added: it needs an edge
  function and can strand a visitor in a language they did not choose. The
  switcher is always visible instead.
- **`security.txt`** was not added: there is no security contact address yet,
  and a fake one is worse than none.
