# TraverseBD Next.js Backend

TraverseBD uses Next.js Route Handlers, TypeScript, Supabase PostgreSQL/Auth/Storage and Vercel.
The API paths and frontend JSON contracts remain unchanged.

## Structure

```text
backend/
├── app/api/[...path]/route.ts
├── lib/
├── middleware.ts
├── supabase/
│   ├── schema.sql
│   └── seed.sql
├── tests/
├── package.json
└── .env.example
```

## Setup

```bash
cd backend
npm install
cp .env.example .env.local
npm run dev
```

Run `supabase/schema.sql` in the Supabase SQL Editor.
Create the Supabase Storage bucket `tourism-media`.
Create the seed admin in Supabase Auth and insert the matching row into `admin_users`
with role `SUPER_ADMIN` and status `Active`.

## Environment

| Variable | Purpose |
|---|---|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Browser/public Supabase key |
| SUPABASE_SERVICE_ROLE_KEY | Server-only key |
| SUPABASE_STORAGE_BUCKET | Media bucket, default tourism-media |
| GOOGLE_CLIENT_ID | Google OAuth Web Client ID |
| COOKIE_SECURE | HTTPS cookie flag |
| COOKIE_SAME_SITE | Cookie SameSite policy |

Never expose `SUPABASE_SERVICE_ROLE_KEY` in a browser or public environment variable.

## Authentication

```http
POST /api/auth/login
Content-Type: application/json

{"email":"admin@traversebd.local","password":"Admin@123456"}
```

Protected endpoints accept:

```http
Authorization: Bearer <SUPABASE_ACCESS_TOKEN>
```

The backend also sets the `ADMIN_SESSION` HTTP-only cookie.

## API Groups

| Area | Public | Admin |
|---|---|---|
| Users | - | `/api/admin/users[/id]` |
| Destinations | `/api/public/destinations[/slug]` | `/api/admin/destinations[/id]` |
| Categories | `/api/public/categories` | `/api/admin/categories[/id]` |
| Packages | `/api/public/packages[/slug]` | `/api/admin/packages[/id]` |
| Departures | `/api/public/packages/{packageId}/departures` | `/api/admin/departures[/id]` |
| Gallery | `/api/public/gallery` | `/api/admin/gallery[/id]` |
| Blog | `/api/public/blog[/slug]` | `/api/admin/blog[/id]` |
| Testimonials | `/api/public/testimonials` | `/api/admin/testimonials[/id]` |
| Services | `/api/public/services` | `/api/admin/services[/id]` |
| FAQ | `/api/public/faqs` | `/api/admin/faqs[/id]` |
| Settings | `/api/public/settings` | `/api/admin/settings` |
| Dashboard | - | `/api/admin/dashboard` |
| Search | `/api/public/search?q=` | - |
| Media | - | `/api/admin/media/upload` |

## Publish Status

Every public CMS record uses `DRAFT` or `PUBLISHED`.
Public endpoints show only `PUBLISHED` rows.

## Tests

```bash
npm test
npm run build
```

## Vercel

Deploy the `backend` folder as a Next.js project and configure all environment variables.
