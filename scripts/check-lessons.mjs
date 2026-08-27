/**
 * Runs every lesson's `solution` through real Python and checks it against the
 * lesson's `check`. Dev-only sanity tool.
 *
 *   node scripts/check-lessons.mjs
 */
import { execFileSync } from "node:child_process";
import { writeFileSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const { pythonBasics } = await import("../src/lib/tracks/python-basics.ts");

const PY = process.env.PYTHON || "python";
const dir = mkdtempSync(join(tmpdir(), "pyquest-check-"));

function norm(s) {
  return String(s).replace(/\r\n/g, "\n").replace(/[ \t]+\n/g, "\n").replace(/^\s+|\s+$/g, "");
}
function run(code) {
  const f = join(dir, "run.py");
  writeFileSync(f, code);
  try {
    return { ok: true, out: execFileSync(PY, [f], { encoding: "utf8" }) };
  } catch (e) {
    return { ok: false, out: (e.stdout || "") + (e.stderr || "") };
  }
}

let pass = 0;
const fails = [];
const starterErrors = [];
const lessons = pythonBasics.modules.flatMap((m) => m.lessons.map((l) => ({ m: m.title, ...l })));

for (const l of lessons) {
  const check = l.check;
  let ok = false;
  let detail = "";

  if (check.kind === "output") {
    const r = run(l.solution);
    ok = r.ok && norm(r.out) === norm(check.expected);
    if (!ok) detail = `got ${JSON.stringify(norm(r.out))} want ${JSON.stringify(norm(check.expected))}`;
  } else {
    const r = run(l.solution + "\n" + check.code + "\n");
    ok = r.ok;
    if (!ok) detail = r.out.trim().split("\n").slice(-3).join(" | ");
  }

  if (ok) pass++;
  else fails.push(`✗ [${l.m}] ${l.slug} — ${detail}`);

  const s = run(l.starterCode);
  if (!s.ok) {
    const last = s.out.trim().split("\n").pop();
    starterErrors.push(`  ${l.slug}: ${last}`);
  }
}

console.log(`\n${pass}/${lessons.length} lessons pass their own solution.\n`);
if (fails.length) {
  console.log(fails.join("\n"));
  process.exitCode = 1;
}
console.log(`\n${starterErrors.length} starters error when run (check each is intentional):`);
console.log(starterErrors.join("\n"));
