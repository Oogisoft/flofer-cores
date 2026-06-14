# CLAUDE.md — Flofer Cores Inc. website

AI agent handoff document. Read this before touching anything.

## What this project is

A **plain HTML/CSS static marketing site** for **Flofer Cores Inc.**, a family-run used auto parts, salvage, and recycling business in Chicago/Chicagoland, operating since 2006. Owner: Eddie's father-in-law. GitHub account: Oogisoft.

Phase one goal: be findable locally, drive phone/text leads. No e-commerce, no inventory system, no contact form, no backend — ever, in this phase.

**Live URL:** https://oogisoft.com/flofer-cores/  
**Repo:** https://github.com/Oogisoft/flofer-cores  
**Deploys:** push to `main` → GitHub Pages auto-redeploys in ~1 minute.

## Stack

No build step. No framework. No dependencies. No `node_modules`. No transpilation.

- Pure HTML files (hand-duplicated header/footer — accepted tradeoff for zero tooling)
- Single stylesheet: `css/styles.css` (CSS custom properties at top for all colors/spacing)
- One JS file: `js/menu.js` (mobile nav only; site works without JS)
- All links are **relative** (not root-relative) so the site works at a subpath OR a domain root

## File map

```
index.html              Home
used-parts.html         Used Parts  ← most important page for SEO
salvage-recycling.html  Salvage Pickup & Recycling
cleanouts.html          Shop & Business Cleanouts
about.html              About
contact.html            Contact (call/text only — no form)
404.html                Custom not-found
css/styles.css          Single shared stylesheet
js/menu.js              Mobile nav toggle (progressive enhancement)
favicon.svg             "FC" monogram, inline SVG
img/og-cover.svg        Social share image (1200×630)
robots.txt              Allow all; sitemap pointer
sitemap.xml             6 content URLs
README.md               Human-facing setup/deploy notes
CLAUDE.md               This file
```

## ⚠ Phone number is a placeholder — swap before sharing the URL

Every call/text link and the JSON-LD structured data use a placeholder number. Three formats appear across all HTML files:

| Format | Placeholder value | Where used |
|--------|------------------|------------|
| `tel:`/`sms:` href | `+17735550100` | All call/text links |
| Display text | `(773) 555-0100` | Visible phone numbers |
| JSON-LD | `+1-773-555-0100` | Structured data blocks |

**To swap the real number in one shot (macOS):**
```sh
cd ~/Dev/flofer-cores
grep -rl '7735550100\|(773) 555-0100' . --include='*.html' | xargs sed -i '' \
  -e 's|+17735550100|+1XXXXXXXXXX|g' \
  -e 's|(773) 555-0100|(XXX) XXX-XXXX|g' \
  -e 's|+1-773-555-0100|+1-XXX-XXX-XXXX|g'
git add -A && git commit -m "Set real phone number" && git push
```

Replace `X`s with the real digits. If texts go to a different number than calls, update `sms:` hrefs separately (`grep -r 'href="sms:'`).

## Positioning rules — enforce these in all copy

Order is intentional and must not change:

1. **Used parts first** — the primary business identity
2. **Salvage & recycling second**
3. **Select cleanouts third** — "select" is load-bearing; they don't do general junk removal

**Tone:** old-school, local, practical, honest. Never corporate, startup-y, or franchise-sounding.

**Never use:** "junk removal," "we buy anything," "no questions asked," "cheapest," "catalytic converters," "cash only" — these attract the wrong customers or wrong legal attention.

## SEO structure — maintain these invariants

Every content page (not 404) must have:
- Unique `<title>` and `<meta name="description">`
- `<link rel="canonical">` pointing to the correct absolute URL
- One `<h1>` (exactly one)
- `aria-current="page"` + `class="is-active"` on the correct nav `<a>`
- JSON-LD block (`AutoPartsStore` type) — copy from any existing page and keep consistent

The JSON-LD `@id` is always `https://oogisoft.com/flofer-cores/#business` (the same entity across all pages).

## How to add or edit content

**Edit copy on an existing page:** edit the HTML file directly. The stylesheet covers all the classes already in use — you shouldn't need to touch `css/styles.css` for copy changes.

**Add a new page:** copy the closest existing page as a template, update `<title>`, `<meta>`, `<link rel="canonical">`, `<h1>`, the `aria-current`/`is-active` nav item, and page body. Add it to `sitemap.xml` and the footer nav on all pages.

**CSS design tokens** (at top of `css/styles.css`):
```css
--ink: #1a1a1a       /* body text */
--paper: #f5f4f1     /* background */
--blue: #1f4e79      /* primary / brand */
--rust: #c2410c      /* accent / CTAs */
--gold: #e0a106      /* highlight accent */
```

## Deploy

```sh
git add <files>
git commit -m "Description"
git push
# Live in ~60 seconds at https://oogisoft.com/flofer-cores/
```

GitHub Pages deploys from the `main` branch root. No build step, no Actions workflow needed.

## Moving to the real domain (when ready)

When the business gets its own domain (e.g. `flofercores.com`):

1. Update all absolute URLs:
   ```sh
   grep -rl 'oogisoft.com/flofer-cores' . | xargs sed -i '' 's#oogisoft.com/flofer-cores#www.flofercores.com#g'
   ```
2. Add a `CNAME` file in the repo root containing `www.flofercores.com`
3. Add the matching DNS record at the registrar (CNAME → `oogisoft.github.io`)
4. Push — relative links need no changes

The `robots.txt` and `sitemap.xml` will become authoritative at the new domain root (right now they're at a subpath so search engines don't use them for crawling oogisoft.com).

## What's intentionally out of scope (don't add without instruction)

- Inventory catalog or live parts search
- Contact form or any backend
- E-commerce / payments
- Photo gallery (placeholder SVG OG image only)
- Spanish-language copy (noted as phase two)
- Street address (service-area business, privacy intentional)
- Hours listing (call/text for availability is the preferred answer)
- Owner/family names (none provided — don't invent)

## Business context (for writing copy)

- **Since 2006**, family-run, Chicagoland
- Service area: **Chicago and the greater Chicagoland area** (use this exact phrasing)
- No fixed public address
- Lead capture is **100% phone/text** — every page should end with a call/text CTA
- Tagline: *"Used parts, honest work and local connections."*
- Structured data category: `AutoPartsStore` (Google Business Profile primary: "Used auto parts store")
