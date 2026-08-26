# Deploying PyQuest

Stack: **GitHub** (code) → **Neon** (Postgres database) → **Vercel** (hosting).
All three have free tiers that are enough for this.

> **Note:** this network blocks the normal Postgres port (5432), so the app and
> the migration script talk to Neon over **HTTPS (port 443)** using Neon's
> serverless driver. `npx prisma migrate` won't work here — use
> `npm run db:deploy` instead (it does the same thing over 443).

---

## 1. Neon — the database  ✅ done

Project `pyquest` is created. The connection strings are in `.env`
(git-ignored). The schema is already applied (`npm run db:deploy`).

If you ever need the strings again: Neon dashboard → **Connect** →
pooled string = `DATABASE_URL`, direct string = `DIRECT_URL`.

## 2. GitHub — the code

1. Create a new **empty** repo at https://github.com/new — name `pyquest`,
   **do not** add a README / licence / .gitignore.
2. Copy the repo URL, then:

   ```bash
   git remote add origin https://github.com/<you>/pyquest.git
   git push -u origin master
   ```

`.env` is git-ignored, so the database password never leaves your machine.

## 3. Vercel — hosting

1. Sign up at https://vercel.com with **Continue with GitHub**.
2. **Add New → Project → Import** the `pyquest` repo.
3. Framework preset: **Next.js** (auto-detected). Leave build settings default.
4. Expand **Environment Variables** and add these (paste the values from `.env`):

   | Name | Value |
   | ---- | ----- |
   | `DATABASE_URL` | the pooled Neon string (`...-pooler...`) |
   | `DIRECT_URL` | the direct Neon string (no `-pooler`) |
   | `ADMIN_EMAILS` | `bibekbhattarai9811@gmail.com` |

5. **Deploy.**

The build runs `prisma generate && node scripts/db-deploy.mjs && next build`, so
the database schema is applied automatically on every deploy.

## 4. First run

- Open `https://<your-url>/signup` and create your account — **the first
  account becomes the admin** (and your email is in `ADMIN_EMAILS` too).
- Share the URL. New signups wait on `/pending` until you approve them at
  `/admin`.

## Shipping changes later

```bash
git push          # Vercel auto-deploys every push to master
```

**After editing `prisma/schema.prisma`:**

```bash
npm run db:new-migration        # prints the SQL for what changed
# create prisma/migrations/<timestamp>_<name>/migration.sql with that SQL
npm run db:deploy               # applies it to the database
git add prisma/migrations && git commit -m "db: ..." && git push
```

Vercel's build re-runs `db:deploy`, so production stays in sync.

## Rotating the database password

Neon dashboard → **Branches → production → Roles → Reset password**. Then update
`DATABASE_URL` + `DIRECT_URL` in both `.env` and Vercel's env vars, and redeploy.
