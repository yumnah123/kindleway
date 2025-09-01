# Zakat Management Web App (Pro UI)

- Next.js 14 + TailwindCSS + Framer Motion
- Vercel Postgres (Neon) via `@vercel/postgres`
- Professional UI with images (in `/public/images`)

## Deploy
1. Push to GitHub
2. Import to Vercel
3. Add Postgres Integration (or set `POSTGRES_URL`)
4. Set `ADMIN_PASSWORD` (optional, default `123`)
5. Deploy

## Pages
- `/submit` — User submission form (calculates & saves)
- `/admin` — Admin dashboard with filters and CSV export

