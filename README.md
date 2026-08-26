# PyQuest

An interactive "learn Python in the browser" site, in the spirit of Codédex /
Codecademy. Read a short lesson, write real Python in an editor, run it, and get
checked feedback. Python runs **in the browser** via
[Pyodide](https://pyodide.org). Accounts, an approval gate, and progress tracking
run on a small server + database.

## Run it locally

```bash
npm install
cp .env.example .env      # then fill in the Neon connection strings
npm run db:deploy         # create the tables
npm run dev
```

Open http://localhost:3100.

> The database is **Neon Postgres**, reached over HTTPS (port 443) via Neon's
> serverless driver — so it works even on networks that block Postgres' port
> 5432, and on Vercel. Because of that, use `npm run db:deploy` (not
> `npx prisma migrate`) to apply schema changes.

- The **first account you sign up** becomes an **admin** and is auto-approved.
- Every account after that lands on a "waiting for approval" screen until an
  admin approves it from `/admin`.
- The first time you press **Run** in a lesson, the browser downloads Pyodide
  (~6 MB, then cached).

## How it's built

| Piece | Where |
| ----- | ----- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (dark theme, tokens in `src/app/globals.css`) |
| Code editor | CodeMirror 6 (`src/components/CodeEditor.tsx`) |
| Python engine | `public/pyodide-worker.js` (Web Worker) + `src/lib/usePyodide.ts` |
| Course content | `src/lib/curriculum.ts` (structure) + `src/content/**/*.md` (lesson text) |
| Database | Neon Postgres via Prisma + `@prisma/adapter-neon` (`prisma/schema.prisma`, `src/lib/db.ts`) |
| Auth | custom email+password, DB-backed sessions (`src/lib/auth.ts`) |
| Progress | per-user rows in the DB (`src/app/actions/progress.ts`) |

## Accounts & the database

- **Models** (`prisma/schema.prisma`): `User` (with `role` USER/ADMIN and
  `status` PENDING/APPROVED/BLOCKED), `Session`, `Completion`.
- **Auth flow:** `src/lib/auth.ts` is the data-access layer — `getSessionUser()`,
  `requireUser()`, `requireApproved()`, `requireAdmin()`. Server actions live in
  `src/app/actions/{auth,progress,admin}.ts`.
- **The gate:** `src/app/learn/layout.tsx` calls `requireApproved()`, so no
  `/learn/*` route renders for a signed-out, pending, or blocked user.
- **Admin dashboard:** `/admin` (guarded by `src/app/admin/layout.tsx`) lists
  every user with their status and lesson progress, and can approve / block /
  delete them. An admin can't delete themselves or the last admin.
- **Make someone an admin without the "first user" trick:** set
  `ADMIN_EMAILS="a@x.com,b@y.com"` in `.env` before they sign up.

### Handy commands

```bash
npm run db:deploy          # apply any pending migrations (over port 443)
npm run db:new-migration    # print the SQL diff after editing schema.prisma
npm run db:studio           # browse/edit the database in a GUI (needs port 5432)
```

## Editing the course

- **Change site name / copy:** `src/lib/site.ts`
- **Add or edit a lesson:**
  1. Add an entry to a module's `lessons` array in `src/lib/curriculum.ts`
     (slug, title, `starterCode`, `solution`, and a `check`).
  2. Create the matching Markdown file in `src/content/<track>/`.
- **`check` types:**
  - `{ kind: "output", expected: "..." }` — compares printed output (trimmed).
  - `{ kind: "test", code: "assert ..." }` — Python asserts run in the learner's
    namespace right after their code; no error = pass.
- **Turn a "coming soon" track on:** change its `status` to `"live"` and give it
  real `modules` instead of an `outline`.

## Deploying

See **[DEPLOY.md](DEPLOY.md)** — GitHub → Neon → Vercel, step by step. The Neon
database is already set up; what's left is pushing to GitHub and importing the
repo into Vercel with three environment variables.

## Known gaps / next steps

- Lessons for the Data Scientist / ML / AI tracks (outlines are in place).
- Email verification, password reset, "remember me", social login.
- Rate limiting on login attempts.
- Heavy libraries (full scikit-learn, GPU) would need server-side code
  execution; Pyodide covers pure Python + NumPy/pandas.
