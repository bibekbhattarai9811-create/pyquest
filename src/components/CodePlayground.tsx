"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import type { Check } from "@/lib/curriculum";
import { usePyodide } from "@/lib/usePyodide";
import { useProgress } from "@/components/ProgressProvider";
import Console from "@/components/Console";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), {
  ssr: false,
  loading: () => (
    <div className="flex h-64 items-center justify-center text-sm text-dim">Loading editor…</div>
  ),
});

type Verdict = "none" | "pass" | "fail";

export default function CodePlayground({
  lessonKey,
  starterCode,
  check,
  solution,
  nextHref,
}: {
  lessonKey: string;
  starterCode: string;
  check: Check;
  solution: string;
  nextHref: string | null;
}) {
  const { status, run } = usePyodide();
  const { isComplete, markComplete, hydrated } = useProgress();

  const [code, setCode] = useState(starterCode);
  const [stdout, setStdout] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [verdict, setVerdict] = useState<Verdict>("none");
  const [busy, setBusy] = useState(false);
  const [showSolution, setShowSolution] = useState(false);

  const done = hydrated && isComplete(lessonKey);
  const booting = status === "booting";

  const execute = useCallback(
    async (withCheck: boolean) => {
      setBusy(true);
      setVerdict("none");
      setError(null);
      setStdout("");
      const result = await run(code, withCheck ? check : undefined);
      setStdout(result.stdout);
      setError(result.error);
      if (withCheck && !result.timedOut) {
        if (result.checkPassed) {
          setVerdict("pass");
          markComplete(lessonKey);
        } else {
          setVerdict("fail");
        }
      }
      setBusy(false);
    },
    [code, check, run, markComplete, lessonKey],
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden rounded-lg border border-edge bg-[#0d1220]">
        <div className="flex items-center justify-between border-b border-edge px-3 py-1.5">
          <span className="font-mono text-xs text-dim">main.py</span>
          <button
            type="button"
            onClick={() => {
              setCode(starterCode);
              setVerdict("none");
              setStdout("");
              setError(null);
            }}
            className="text-xs text-dim transition-colors hover:text-ink"
          >
            Reset code
          </button>
        </div>
        <CodeEditor value={code} onChange={setCode} />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => execute(false)}
          disabled={busy}
          className="rounded-md border border-edge bg-panel-2 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-brand disabled:cursor-not-allowed disabled:opacity-50"
        >
          Run
        </button>
        <button
          type="button"
          onClick={() => execute(true)}
          disabled={busy}
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong disabled:cursor-not-allowed disabled:opacity-50"
        >
          Check answer
        </button>
        {booting && (
          <span className="text-xs text-dim">Booting Python… (first run downloads it, ~5s)</span>
        )}
        {busy && !booting && <span className="text-xs text-dim">Working…</span>}
        {done && !busy && (
          <span className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-good">
            ✓ Completed
          </span>
        )}
      </div>

      {verdict === "pass" && (
        <div className="rounded-lg border border-good/40 bg-good/10 px-4 py-3 text-sm">
          <p className="font-semibold text-good">Correct — nice work!</p>
          {nextHref ? (
            <Link
              href={nextHref}
              className="mt-2 inline-block rounded-md bg-good px-3 py-1.5 text-xs font-semibold text-[#0b0f1a] hover:opacity-90"
            >
              Next lesson →
            </Link>
          ) : (
            <p className="mt-1 text-dim">That was the last lesson in this track. 🎉</p>
          )}
        </div>
      )}

      {verdict === "fail" && (
        <div className="rounded-lg border border-bad/40 bg-bad/10 px-4 py-3 text-sm">
          <p className="font-semibold text-bad">Not quite yet.</p>
          {check.hint && <p className="mt-1 text-dim">{check.hint}</p>}
        </div>
      )}

      <Console stdout={stdout} error={error} busy={busy} />

      <div className="text-xs">
        <button
          type="button"
          onClick={() => setShowSolution((v) => !v)}
          className="text-dim underline transition-colors hover:text-ink"
        >
          {showSolution ? "Hide solution" : "Stuck? Show a solution"}
        </button>
        {showSolution && (
          <pre className="mt-2 overflow-x-auto rounded-lg border border-edge bg-[#0d1220] p-3 font-mono text-[13px] leading-relaxed text-ink">
            {solution}
          </pre>
        )}
      </div>
    </div>
  );
}
