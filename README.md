# Illegalithi Creations

Digital studio site for sharper websites, SEO systems, and marketing strategy.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Netlify

This repo is set up for Netlify hosting (`netlify.toml`).

### 1. Create the site

1. Push the repo to GitHub (already done if you’re on `main`)
2. In Netlify: **Add new site → Import an existing project**
3. Select the repo
4. Confirm build settings (should auto-detect Next.js):
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** `20` (set in `netlify.toml`)

### 2. Attach your domain

1. Netlify → **Domain management** → **Add domain**
2. Add `illegalithi.com` and follow DNS instructions
3. `www.illegalithi.com` redirects to apex via `netlify.toml`

### 3. Contact form (works without Resend)

Netlify Forms is the default path:

1. Deploy once so Netlify detects the `contact` form
2. Netlify → **Forms** → confirm `contact` appears
3. **Form notifications** → send submissions to `hello@illegalithi.com`
4. Submit a test inquiry from the live site

Optional upgrade: add Resend env vars if you want branded transactional email instead of / as well as Netlify Forms.

### 4. Environment variables (optional Resend)

Netlify → **Site configuration → Environment variables**:

| Key | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | No | If set, form tries Resend first |
| `CONTACT_TO_EMAIL` | Only with Resend | Default `hello@illegalithi.com` |
| `CONTACT_FROM_EMAIL` | Only with Resend | Must be verified in Resend |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://illegalithi.com` |

### 5. Post-deploy SEO checklist

After the custom domain is live:

1. Open `https://illegalithi.com/robots.txt`
2. Open `https://illegalithi.com/sitemap.xml`
3. Submit the sitemap in [Google Search Console](https://search.google.com/search-console)
4. Check the share card at [opengraph.xyz](https://www.opengraph.xyz/) with your live URL
5. Test `/work`, a case study URL, and the contact form

### Share line (posts / organic)

> Illegalithi Creations — Web / SEO / Strategy for brands that refuse template mode.  
> https://illegalithi.com

### Ads landing page

Use this URL in paid campaigns:

> https://illegalithi.com/start

`/start` is conversion-focused (brief form on-page) and set to `noindex` so it doesn’t compete with the homepage in search.

### Analytics (optional)

Add in Netlify env vars when ready:

| Key | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta / Instagram ads pixel |

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
