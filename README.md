# TK MOTORS — Dealership Website & Management System

A dynamic dealership platform for TK MOTORS. Vehicles live in a real
PostgreSQL database and are added, edited, published, and deleted from an
admin dashboard — no code changes needed to list a new car.

**Stack:** Next.js (App Router, TypeScript) · PostgreSQL via Prisma ·
NextAuth (role-based admin logins) · Vercel Blob (photo uploads)

---

## 1. What you get

- **Public site** — homepage, filterable inventory, a "vehicle dossier" detail
  page per car, an import-process page, and a WhatsApp/contact form.
- **Admin dashboard** (`/admin/dashboard`) — add, edit, publish/unpublish,
  mark reserved/sold, and delete vehicles. Upload photos straight from the
  form (no FTP, no image hosting to manage yourself).
- **Roles** — `ADMIN` accounts can also create or remove other admin logins
  (e.g. for a business partner or staff); `EDITOR` accounts can manage
  vehicles only, not other admin accounts.
- **Real database** — every vehicle, photo, admin user, and customer
  inquiry is stored in Postgres, not in code.

## 2. Architecture

- **Database:** standard PostgreSQL via Prisma — Vercel Postgres, Neon, or
  any other Postgres provider all work unchanged, since it's just a
  connection string.
- **Photo storage:** Vercel Blob (`@vercel/blob`). Required regardless of
  which Postgres provider you use — it's what the admin dashboard's photo
  upload talks to.
- **Auth:** NextAuth v5, credentials login, JWT sessions, roles enforced
  server-side in every route (see section 8).

## 3. Environment variables

Copy `.env.example` to `.env` and fill these in. Every variable the app
uses is listed here — nothing else is required.

| Variable | Where it comes from | Notes |
|---|---|---|
| `POSTGRES_PRISMA_URL` | Your Postgres provider — pooled connection string | Used for normal app queries |
| `POSTGRES_URL_NON_POOLING` | Your Postgres provider — direct connection string | Used for migrations |
| `AUTH_SECRET` | Generate yourself: `openssl rand -base64 32` | Never commit this |
| `NEXTAUTH_URL` | Your site's URL | `http://localhost:3000` locally, your real domain in production |
| `BLOB_READ_WRITE_TOKEN` | Vercel dashboard → Storage → your Blob store | Server-only, never exposed to the browser |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Your business WhatsApp number | Public — shown in the UI |
| `NEXT_PUBLIC_PHONE_DISPLAY` | Your business phone | Public — shown in the UI |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Your business email | Public — shown in the UI |
| `SEED_ADMIN_NAME` | Your choice | Used once, by `npm run db:seed` |
| `SEED_ADMIN_EMAIL` | Your choice | Required — the seed script exits with an error if missing |
| `SEED_ADMIN_PASSWORD` | Your choice, 8+ characters | Required, no default — set a real password, not a placeholder |

Only the three `NEXT_PUBLIC_*` variables are ever sent to the browser —
that's what the prefix means in Next.js. Everything else (database URLs,
`AUTH_SECRET`, `BLOB_READ_WRITE_TOKEN`, the `SEED_ADMIN_*` values) stays
server-side and is never bundled into client-side code.

## 4. Database schema workflow

This project uses Prisma, which supports two different ways of applying
`prisma/schema.prisma` to a real database — use the right one for the
situation:

**Local development** — fast iteration, no migration history needed:
```bash
npm run db:push
```
Pushes your current schema straight to the database. Fine for a dev
database you can safely reset if something conflicts.

**Initial production setup** — the first time you point this project at a
real production database, generate a tracked migration and apply it:
```bash
npx prisma migrate dev --name init
```
This creates a `prisma/migrations/` folder with real, reviewable SQL.
**Commit that folder to git** — it becomes the source of truth for every
environment from now on.

**Future production schema changes** — once `prisma/migrations/` exists,
never use `db:push` against production again. Instead:
1. Edit `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name describe_your_change` locally
   against a dev/staging database to generate the new migration file.
3. Commit the new migration.
4. Deploy, then run `npm run db:migrate:deploy` (wraps
   `prisma migrate deploy`) against production. This only ever applies
   forward — it does not reset or drop existing data.

`db:push` stays available for local development because it's convenient,
but it has no migration history and is not the right tool for a database
that holds real vehicles and customer inquiries.

## 5. Deploy to Vercel

1. **Create a PostgreSQL database.** Vercel dashboard → Storage → Create
   Database → Postgres (or connect an external provider like Neon the
   same way). Note the pooled and direct connection strings.
2. **Create a Vercel Blob store.** Storage → Create Database → Blob. This
   is what the admin dashboard uses for photo uploads.
3. **Add environment variables.** Project → Settings → Environment
   Variables — add every variable from section 3. The database and Blob
   variables are added automatically when you create them in steps 1–2;
   add the rest (`AUTH_SECRET`, `NEXTAUTH_URL`, the `NEXT_PUBLIC_*`
   contact details) yourself.
4. **Run migrations.** From your own machine, with the production
   `POSTGRES_PRISMA_URL` / `POSTGRES_URL_NON_POOLING` in your environment:
   ```bash
   npm install
   npx prisma migrate dev --name init
   ```
   (First time only — see section 4 for how this differs from later
   schema changes.)
5. **Create your first admin account.** With `SEED_ADMIN_EMAIL` and
   `SEED_ADMIN_PASSWORD` set in your environment:
   ```bash
   npm run db:seed
   ```
6. **Deploy to Vercel.** Push this repo to GitHub, import it at
   vercel.com/new (if you haven't already), and deploy. Vercel runs
   `npm install` (which runs `prisma generate`) and then `npm run build`
   automatically.
7. **Connect your custom domain.** Project → Settings → Domains → add
   your domain and follow Vercel's DNS instructions. Once it's verified,
   update `NEXTAUTH_URL` to match it exactly and redeploy.
8. **Log in to admin.** Go to `https://your-domain/admin/login` and sign
   in with the `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` you set. From
   Admin → Admin users, create your real day-to-day account(s) and remove
   the seed account if you no longer need it.
9. **Add your first vehicle.** Admin → Add vehicle → fill in the details,
   upload photos, set **Status** to `Published`, save. It's live on the
   public site immediately.

## 6. Local development

```bash
npm install
cp .env.example .env       # fill in a database URL and secrets
npm run db:push            # creates tables (local/dev — see section 4)
npm run db:seed            # creates your first admin login
npm run dev
```

For a local database, the easiest options are a free Neon Postgres
database (neon.tech) or Docker:

```bash
docker run --name tkmotors-db -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
# then set both POSTGRES_PRISMA_URL and POSTGRES_URL_NON_POOLING to:
# postgres://postgres:postgres@localhost:5432/postgres
```

## 7. Adding vehicles day to day

1. Go to `/admin/dashboard` and sign in.
2. **Add vehicle** → fill in make/model/year/price/mileage/specs.
3. Upload photos directly (select multiple files at once).
4. Write a description and one feature per line (e.g. "Heated seats").
5. Set **Status** to `Published` to make it live on the site immediately,
   or leave as `Draft` to prepare it before publishing.
6. From the vehicle list you can change status inline (Draft → Published →
   Reserved → Sold) without opening the full edit form.

No code edits, redeploys, or developer involvement are needed for any of
this — that's the point of the admin dashboard.

## 8. Server-side security

All of this is enforced in the API route handlers themselves — never just
hidden by the UI or by middleware:

- **Vehicle mutations** (`POST`/`PATCH`/`DELETE` on `/api/vehicles`)
  require an authenticated `ADMIN` or `EDITOR` session (`lib/authz.ts` →
  `requireStaff()`).
- **Photo upload** (`/api/upload`) requires the same, plus: only real
  JPEG/PNG/WEBP/GIF files by MIME type (SVG rejected — it can carry
  scripts), capped at 8MB, saved under a server-generated filename (the
  original filename is never used).
- **Admin-user management** (`/api/users`, `/admin/dashboard/users`) is
  `ADMIN`-only (`requireAdmin()`), checked independently in both the page
  and the API — an `EDITOR` session gets a 403 even calling the API
  directly.
- **Public visitors** (no staff session) can only ever retrieve
  `PUBLISHED` vehicles — through the site, through `/api/vehicles`
  directly, or by guessing a vehicle's direct URL. `DRAFT`, `RESERVED`,
  and `SOLD` are excluded at the database query level for any non-staff
  request.
- **Secrets never reach the browser.** Only variables explicitly prefixed
  `NEXT_PUBLIC_` are sent to client code in Next.js. Database URLs,
  `AUTH_SECRET`, and `BLOB_READ_WRITE_TOKEN` are read only in server-side
  code (API routes, server components, `lib/`) and are never imported
  into any client component.
- **No secrets are committed.** `.env.example` contains only placeholders.
  `.gitignore` excludes all `.env*` files, so a real `.env` with live
  credentials is never pushed to git.

## 9. Project structure

```
app/
  page.tsx                     -> public homepage
  vehicles/page.tsx            -> public inventory + filters
  vehicles/[slug]/page.tsx     -> public vehicle detail
  import-process/page.tsx      -> import process explainer
  admin/login/page.tsx         -> admin sign-in
  admin/dashboard/             -> protected admin dashboard
  api/vehicles/                -> vehicle CRUD API
  api/upload/                  -> photo upload (Vercel Blob)
  api/users/                   -> admin user management API
  api/inquiries/                -> customer contact form submissions
prisma/schema.prisma           -> database schema
prisma/seed.js                 -> creates the first admin login (requires env vars, no default password)
lib/authz.ts                   -> server-side role checks used by every API route
lib/                           -> Prisma client, auth config, validation, formatting
components/                    -> shared UI (forms, cards, nav, etc.)
```

---

Built for TK MOTORS — Korean vehicle imports to Algeria.
