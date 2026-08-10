# Spine

Digital studio site for websites, SEO systems, and strategy with a backbone.

Hosted on **Vercel**.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Brand idea

Pretty sites without structure still collapse.  
Spine builds the digital backbone: message, site architecture, and search as one system.

## Deploy on Vercel

1. Import the GitHub repo at [vercel.com/new](https://vercel.com/new)
2. Framework preset: **Next.js**
3. Add environment variables (below)
4. Deploy
5. Attach your domain when ready (defaults in code: `spine.studio`)

### Environment variables

| Key | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes (for form) | From [resend.com](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Recommended | Default `hello@spine.studio` |
| `CONTACT_FROM_EMAIL` | Recommended | Verified sender in Resend |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your live domain |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta / Instagram ads |

### Share line

> Spine — Web, SEO, and strategy with a backbone.  
> https://spine.studio

### Ads landing page

> https://spine.studio/start

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
