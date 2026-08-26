/**
 * Applies pending Prisma migrations to the database over Neon's HTTPS/WebSocket
 * driver (port 443), so it works on networks that block Postgres port 5432 and
 * on Vercel's serverless build.
 *
 * Equivalent to `prisma migrate deploy`, but not dependent on a raw 5432 socket.
 *
 *   node scripts/db-deploy.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";

if (typeof globalThis.WebSocket === "undefined") neonConfig.webSocketConstructor = ws;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const migrationsDir = join(root, "prisma", "migrations");

// Load .env locally; on hosts like Vercel the vars are already in the environment.
if (!process.env.DATABASE_URL) {
  try {
    for (const line of readFileSync(join(root, ".env"), "utf8").split("\n")) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*"?([^"\n]*)"?\s*$/);
      if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2];
    }
  } catch {
    /* no .env file */
  }
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error("DATABASE_URL is not set.");
  process.exit(1);
}

const PRISMA_MIGRATIONS_DDL = `
CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
  "id"                  VARCHAR(36)  NOT NULL,
  "checksum"            VARCHAR(64)  NOT NULL,
  "finished_at"         TIMESTAMPTZ,
  "migration_name"      VARCHAR(255) NOT NULL,
  "logs"                TEXT,
  "rolled_back_at"      TIMESTAMPTZ,
  "started_at"          TIMESTAMPTZ  NOT NULL DEFAULT now(),
  "applied_steps_count" INTEGER      NOT NULL DEFAULT 0,
  CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id")
);`;

const pool = new Pool({ connectionString });

try {
  await pool.query(PRISMA_MIGRATIONS_DDL);

  const applied = new Set(
    (
      await pool.query(
        `SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL`,
      )
    ).rows.map((r) => r.migration_name),
  );

  const folders = readdirSync(migrationsDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  let ran = 0;
  for (const name of folders) {
    if (applied.has(name)) {
      console.log(`= ${name} (already applied)`);
      continue;
    }
    const sql = readFileSync(join(migrationsDir, name, "migration.sql"));
    const checksum = createHash("sha256").update(sql).digest("hex");

    console.log(`+ ${name} — applying…`);
    await pool.query(sql.toString());
    await pool.query(
      `INSERT INTO "_prisma_migrations"
        (id, checksum, migration_name, started_at, finished_at, applied_steps_count)
       VALUES ($1, $2, $3, now(), now(), 1)`,
      [crypto.randomUUID(), checksum, name],
    );
    ran++;
  }

  console.log(ran === 0 ? "\nDatabase already up to date." : `\nApplied ${ran} migration(s).`);
} catch (err) {
  console.error("\nMigration failed:", err.message ?? err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
