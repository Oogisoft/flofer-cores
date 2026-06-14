# Flofer Cores Inc. — website

A lean, fast, **plain HTML/CSS** marketing + lead-capture site for Flofer Cores Inc., a
family-run used-parts, salvage and recycling business serving Chicago and the greater
Chicagoland area since 2006.

No build step, no framework, no dependencies. Edit the files and upload them anywhere that
serves static files.

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

Shared assets: `css/styles.css` (single stylesheet, colors/spacing via CSS variables at the
top), `js/menu.js` (mobile-nav toggle), `favicon.svg`, `img/og-cover.svg` (social share
image), `robots.txt`, `sitemap.xml`.

## Run it locally

```sh
cd ~/Dev/flofer-cores
python3 -m http.server 8000
# then open http://localhost:8000
```

## ⚠ Before launch — replace the placeholders

The site ships with a **placeholder phone number and domain**. Swap them site-wide:

**1. Phone number** — three formats are used:
- Links: `+17735550100`  (in `tel:` / `sms:` hrefs)
- Display: `(773) 555-0100`
- Structured data: `+1-773-555-0100`  (in the JSON-LD blocks)

```sh
# from the project root (macOS):
grep -rl '7735550100\|(773) 555-0100' . --include='*.html' | xargs sed -i '' \
  -e 's/+17735550100/+1XXXXXXXXXX/g' \
  -e 's/(773) 555-0100/(XXX) XXX-XXXX/g' \
  -e 's/+1-773-555-0100/+1-XXX-XXX-XXXX/g'
```
Replace the `X`s with the real number. If texts go to a **different** line than calls, change
the `sms:` hrefs separately (search for `href="sms:`).

**2. Domain** — used in canonical tags, Open Graph URLs, `robots.txt` and `sitemap.xml`:

```sh
grep -rl 'flofercores.com' . | xargs sed -i '' 's/www\.flofercores\.com/YOURDOMAIN.com/g'
```

**3. Confirm the details** — "Since 2006", service-area wording, and hours
("call/text for availability") appear in the copy and footer. Update if needed.

**4. (Optional) Real social image** — replace `img/og-cover.svg` with a 1200×630 JPG/PNG for
the widest link-preview support, then update the `og:image` references.

## Deploy

It's static — upload the whole folder to any web host / static host (your own server,
Netlify, Cloudflare Pages, etc.) so the files sit at the site root. No server-side code,
database, or build required.

## Notes / not in this version (phase one)

Intentionally omitted for now: inventory catalog, e-commerce/payments, booking flow, contact
form/backend, large photo gallery, searchable parts database. The Contact page drives
everything to **call or text**.

**Google Business Profile:** once the real name, phone and service area are confirmed, create
a Google Business Profile. The site's structured data uses `AutoPartsStore` — a sensible
primary category ("Used auto parts store"); add secondary categories (salvage yard, recycling
center, scrap metal dealer) that genuinely fit.
