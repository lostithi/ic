# Illegalithi Creations

Digital studio site for sharper websites, SEO systems, and marketing strategy.

Hosted on **Vercel**.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy on Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables (below)
4. Deploy
5. Project → **Settings → Domains** → add `illegalithi.com` (and `www` if you want; `www` redirects to apex via `vercel.json`)

### Environment variables

Vercel → **Project Settings → Environment Variables** (Production + Preview):

| Key | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes (for form) | From [resend.com](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Recommended | Default `hello@illegalithi.com` |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender in Resend |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://illegalithi.com` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta / Instagram ads |

For production email, verify `illegalithi.com` in Resend and set `CONTACT_FROM_EMAIL` to a sender on that domain.

### Post-deploy checklist

1. Open `https://illegalithi.com`
2. Test contact form + `/start`
3. Confirm `/robots.txt` and `/sitemap.xml`
4. Submit sitemap in [Google Search Console](https://search.google.com/search-console)
5. Check share card at [opengraph.xyz](https://www.opengraph.xyz/)

### Share line

> Illegalithi Creations — Web / SEO / Strategy for brands that refuse template mode.  
> https://illegalithi.com

### Ads landing page

> https://illegalithi.com/start

`/start` is conversion-focused and `noindex`, so it won’t compete with the homepage in search.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
