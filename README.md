# Spine Studio

Digital studio site for websites, SEO systems, and strategy with a backbone.

Hosted on **Cloudflare Workers** (Worker name: `spine`, domain: `spinestudio.uk`) via OpenNext.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Preview the Workers runtime locally:

```bash
npm run preview
```

## Brand idea

Pretty sites without structure still collapse.  
Spine Studio builds the digital backbone: message, site architecture, and search as one system.

## Deploy on Cloudflare

Git is connected to Cloudflare Workers Builds. Required settings:

| Setting | Value |
|---|---|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy -- --keep-vars` |
| Root directory | `/` (repo root) |

Do **not** use plain `npx wrangler deploy` as the only deploy step unless `wrangler.jsonc` is already in the repo (it is now). Prefer `opennextjs-cloudflare deploy`.

### Domain

1. Cloudflare → Workers → `spine` → **Settings → Domains & Routes**
2. Add custom domains: `spinestudio.uk` and `www.spinestudio.uk`
3. DNS for the zone should already be on Cloudflare (you bought it there)

### Environment variables

Workers → Settings → Variables and Secrets (also set the same in Workers Builds if prompted):

| Key | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | Yes (for form) | From [resend.com](https://resend.com/api-keys) |
| `CONTACT_TO_EMAIL` | Recommended | Your real inbox. With `onboarding@resend.dev`, Resend only delivers to the Resend account email. |
| `CONTACT_FROM_EMAIL` | Recommended | Start with `Spine Studio <onboarding@resend.dev>`. Custom `@spinestudio.uk` only after Resend domain verify. |
| `NEXT_PUBLIC_SITE_URL` | Recommended | `https://spinestudio.uk` |

Set these on the **Worker runtime** (`spine` → Settings → Variables and Secrets), not only in Workers Builds. Deploy uses `--keep-vars` so dashboard secrets are not wiped.
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | GA4 |
| `NEXT_PUBLIC_META_PIXEL_ID` | Optional | Meta / Instagram ads |

### Share line

> Spine Studio — Web, SEO, and strategy with a backbone.  
> https://spinestudio.uk

### Ads landing page

> https://spinestudio.uk/start

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run deploy
npm run lint
```
