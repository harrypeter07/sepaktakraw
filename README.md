# MSKT App — Database & Auth Guide

This document explains how to configure Supabase with Prisma, run migrations, seed data, and how the app reads/writes data in both admin and public pages.

## 1) Required environment variables

Create `.env.local` with:

```
DATABASE_URL=postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@aws-1-<region>.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1&sslmode=require
DIRECT_URL=postgresql://postgres.<PROJECT_REF>:<DB_PASSWORD>@db.<PROJECT_REF>.supabase.co:5432/postgres?sslmode=require
NEXT_PUBLIC_SUPABASE_URL=https://<PROJECT_REF>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_ANON_KEY>
SUPABASE_SERVICE_ROLE_KEY=<YOUR_SERVICE_ROLE_KEY>

# Optional for local dev quick access
ADMIN_PIN=1234
```

Notes:
- Use the database password from Supabase Settings → Database → Connection info. URL‑encode special characters.
- `DATABASE_URL` (6543) is for pooled runtime connections; `DIRECT_URL` (5432) is for migrations.

## 2) Install and generate

```
npm i
npx prisma generate
```

## 3) Run migrations

```
npx prisma migrate dev --name init
```

This creates the Prisma tables in your Supabase Postgres.

## 4) Seed baseline data

```
npx prisma db seed
```

Seeds districts, officials, and sample form definitions.

## 5) Start the app

```
npm run dev
```

Visit the printed URL (e.g., `http://localhost:3000` or `http://localhost:3002`).

## 6) Data access pattern (repo with fallback)

The app uses a small repository in `lib/data.ts` that tries Prisma first and falls back to static `data.json` if `DATABASE_URL` is missing or the DB is unreachable.

- Repo provides: users, districts, results, notices, officials, forms, and submissions (counts + lists)
- Public pages (`/notices`, `/results`, `/districts`) and admin pages use this repo so the app never breaks during setup.

## 7) Authentication

- Email/password: `/api/auth` uses Supabase Auth. On successful login, we upsert a `User` row in Prisma using the Supabase `user.id` and `email`.
- Dev PIN (optional): If `ADMIN_PIN` is set, you can choose PIN mode on `/sign-in`. It sets a session cookie and ensures a local user exists for testing.
- Middleware protects `/admin/*` by checking a simple `user-session` cookie; integrate full Supabase session checks later if needed.

## 8) Common commands

```
# Prisma
npx prisma format
npx prisma studio
npx prisma migrate dev --name <name>
npx prisma migrate deploy
npx prisma db seed

# Run app
npm run dev
```

## 9) Next steps (optional)

- Replace PIN with full Supabase session middleware and RLS policies.
- Add CRUD APIs for notices/results/users/officials backed by Prisma.
- Add caching (ISR or route handlers) for public lists.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Deployment Notes

This project has been configured for Vercel deployment with the following fixes:

1. **Prisma Client Generation**: The build script now includes `prisma generate` to ensure the Prisma client is properly generated during deployment.

2. **Mock Data Usage**: The application currently uses mock data instead of a live database, which eliminates database connection issues during deployment.

3. **Supabase Edge Runtime**: The middleware has been simplified to avoid Supabase Edge Runtime compatibility issues.

4. **API Routes**: All API routes have been updated to use mock data instead of Prisma to prevent database connection errors.

### Environment Variables

For local development, you can create a `.env.local` file with the following variables (optional since we're using mock data):

```bash
# Database (optional - for future use)
DATABASE_URL="postgresql://username:password@localhost:5432/sepaktakraw"

# NextAuth (optional - for future use)
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Supabase (optional - for future use)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key-here"
```
