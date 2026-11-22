# TraverseBD Spring Boot Backend

## Run

```bash
cd backend
set -a
. ./.env
set +a
./mvnw spring-boot:run
```

Java 21 is required. Copy `.env.example` to `.env`, export the variables, and never commit `.env`.

## Supabase

Set `SUPABASE_DATABASE_URL` to the Supabase PostgreSQL connection URL. The backend can create/update tables while `DDL_AUTO=update` is enabled. For production, change `DDL_AUTO` to `validate`, enable Flyway, and apply versioned migrations.

Set `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_STORAGE_BUCKET` for image uploads. The service-role key is server-only and must never be sent to a browser or placed in a Vite/Next.js public environment variable.

Create the public storage bucket in Supabase Storage before using `/api/admin/media/upload`.

## Google Sign-In

Set `GOOGLE_CLIENT_ID` to the OAuth Web Client ID. The frontend sends the Google ID token to `POST /api/auth/google`. The email must already exist in `admin_users`. The first Google login stores the Google subject in that database row.

The local seed Super Admin is:

- Email: `admin@traversebd.local`
- Password: `Admin@123456`

Override these values with `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD`. Change or remove the development password before deployment.

## Security

- Passwords use BCrypt.
- Sessions use signed JWTs and HTTP-only cookies.
- `Authorization: Bearer <token>` is also accepted.
- `/api/admin/**` requires `ADMIN` or `SUPER_ADMIN`.
- Admin-user management requires `SUPER_ADMIN`.
- Public content only exposes `PUBLISHED` rows.
