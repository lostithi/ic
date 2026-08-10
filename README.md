# Illegalithi Creations

Digital studio site for sharper websites, SEO systems, and marketing strategy.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contact form (Resend)

1. Create an API key at [resend.com](https://resend.com/api-keys)
2. Copy `.env.example` to `.env.local`
3. Fill in:

```bash
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=hello@illegalithi.com
CONTACT_FROM_EMAIL=Illegalithi Creations <onboarding@resend.dev>
```

For production, verify your domain in Resend and switch `CONTACT_FROM_EMAIL` to a sender on `illegalithi.com`.

## Deploy on Vercel

1. Push this repo to GitHub
2. Import the project in [Vercel](https://vercel.com/new)
3. Add the same env vars from `.env.example`
4. Deploy
5. Attach custom domain `illegalithi.com` in Vercel → Project → Settings → Domains

After DNS is live, confirm:

- `/` homepage
- `/work` and case study routes
- `/robots.txt` and `/sitemap.xml`
- Contact form delivery to your inbox
- Social preview via [opengraph.xyz](https://www.opengraph.xyz/)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
