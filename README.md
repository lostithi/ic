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

## Contact form (Formspree)

1. Sign up at [formspree.io](https://formspree.io)
2. **New Form** → name it `Spine Studio`
3. Set the notification email to wherever you want briefs (Gmail is fine)
4. Copy the form id from your endpoint: `https://formspree.io/f/XXXXXX` → use `XXXXXX`
5. Add this **Build variable** in Cloudflare Workers Builds (and in `.env.local` for local):

```
NEXT_PUBLIC_FORMSPREE_FORM_ID=XXXXXX
```

6. Redeploy (public env vars are baked in at build time)

Also set:

```
NEXT_PUBLIC_SITE_URL=https://spinestudio.uk
```

Confirm the first Formspree submission email if they ask you to verify the inbox.

## Deploy on Cloudflare

| Setting | Value |
|---|---|
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy -- --keep-vars` |
| Root directory | `/` (repo root) |

### Domain

1. Cloudflare → Workers → `spine` → **Settings → Domains & Routes**
2. Add custom domains: `spinestudio.uk` and `www.spinestudio.uk`

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
