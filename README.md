# Flofer Cores Inc. — website

A lean, fast, **plain HTML/CSS** marketing + lead-capture site for Flofer Cores Inc., a
family-run used-parts, salvage and recycling business serving Chicago and the greater
Chicagoland area since 2006.

No build step, no framework, no dependencies. Links are **relative**, so the site works the
same whether it's served from a domain root or a subpath.

## Live site

Published via **GitHub Pages** from the `main` branch (root):

- **https://oogisoft.com/flofer-cores/**  ← where it actually serves
- `https://oogisoft.github.io/flofer-cores/` redirects to the URL above (because `oogisoft.com`
  is the custom domain on the `oogisoft.github.io` user site).

This is a **separate** Pages site from oogisoft.com — it does not touch the `oogisoft.github.io`
repo or oogisoft.com's DNS. **Pushing to `main` auto-redeploys** (takes ~1 minute).

> Note: at a subpath, `robots.txt` and `sitemap.xml` are not authoritative (search engines read
> those from the domain root, oogisoft.com). They become active again once the site moves to its
> own domain — see below.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `used-parts.html` | Used Parts (priority page) |
| `salvage-recycling.html` | Salvage Pickup & Recycling |
| `cleanouts.html` | Shop & Business Cleanouts |
| `about.html` | About |
| `contact.html` | Contact (call/text only — no form) |
| `404.html` | Not-found page |

Shared assets: `css/styles.css` (single stylesheet; colors/spacing via CSS variables at top),
`js/menu.js` (mobile-nav toggle), `favicon.svg`, `img/og-cover.svg` (social share image),
`robots.txt`, `sitemap.xml`.

## Run it locally

```sh
python3 -m http.server 8000 --directory ~/Dev/flofer-cores
# open http://localhost:8000
```

## ⚠ Before you hand this out — replace the placeholder phone number

The site ships with a **placeholder phone number**. Three formats are used:

- Links: `+17735550100`  (in `tel:` / `sms:` hrefs)
- Display: `(773) 555-0100`
- Structured data: `+1-773-555-0100`  (in the JSON-LD blocks)

```sh
# from the project root (macOS):
grep -rl '7735550100\|(773) 555-0100' . --include='*.html' | xargs sed -i '' \
  -e 's/+17735550100/+1XXXXXXXXXX/g' \
  -e 's/(773) 555-0100/(XXX) XXX-XXXX/g' \
  -e 's/+1-773-555-0100/+1-XXX-XXX-XXXX/g'
git add -A && git commit -m "Set real phone number" && git push   # auto-redeploys
```
Replace the `X`s with the real number. If texts go to a **different** line than calls, change
the `sms:` hrefs separately (search for `href="sms:`).

## Moving to the real domain later

When the real domain (e.g. `flofercores.com`) is ready, it's a quick switch:

1. Point the absolute URLs at the new domain:
   ```sh
   grep -rl 'oogisoft.com/flofer-cores' . | xargs sed -i '' 's#oogisoft.com/flofer-cores#www.flofercores.com#g'
   ```
2. Add a `CNAME` file containing the domain (e.g. `www.flofercores.com`) so GitHub Pages serves
   it there, and add the matching DNS record at the registrar.
3. Push. The relative links need no changes.

(Relative links already work at a domain root, so only the absolute canonical/OG/sitemap URLs
and the `CNAME`/DNS need updating.)

## Notes / not in this version (phase one)

Intentionally omitted: inventory catalog, e-commerce/payments, booking flow, contact
form/backend, large photo gallery, searchable parts database. The Contact page drives
everything to **call or text**.

**Google Business Profile:** once the real name, phone and service area are confirmed, create a
Google Business Profile. The site's structured data uses `AutoPartsStore` — a sensible primary
category ("Used auto parts store"); add secondary categories (salvage yard, recycling center,
scrap metal dealer) that genuinely fit.
