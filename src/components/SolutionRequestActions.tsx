"use client";

import { useState, useTransition } from "react";
import { resolveSolutionRequest } from "@/app/actions/solutions";

export default function SolutionRequestActions({ id }: { id: string }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function decide(decision: "GRANTED" | "DENIED") {
    setError(null);
    start(async () => {
      const res = await resolveSolutionRequest(id, decision);
      if (!res.ok) setError(res.error ?? "Something went wrong.");
    });
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex gap-1.5">
        <button
          type="button"
          disabled={pending}
          onClick={() => decide("GRANTED")}
          className="rounded border border-good/50 px-2 py-1 text-xs text-good transition-colors hover:bg-good/10 disabled:opacity-50"
        >
          Grant
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => decide("DENIED")}
          className="rounded border border-edge px-2 py-1 text-xs transition-colors hover:bg-panel-2 disabled:opacity-50"
        >
          Deny
        </button>
      </div>
      {error && <span className="text-xs text-bad">{error}</span>}
    </div>
  );
}
