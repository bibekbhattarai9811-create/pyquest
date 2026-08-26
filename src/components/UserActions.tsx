"use client";

import { useState, useTransition } from "react";
import { approveUser, deleteUser, setUserStatus } from "@/app/actions/admin";

const btn =
  "rounded border border-edge px-2 py-1 text-xs transition-colors disabled:opacity-50";

export default function UserActions({
  userId,
  status,
  isSelf,
}: {
  userId: string;
  status: "PENDING" | "APPROVED" | "BLOCKED";
  isSelf: boolean;
}) {
  const [pending, start] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (isSelf) return <span className="text-xs text-dim">you</span>;

  function run(fn: () => Promise<{ ok: boolean; error?: string }>) {
    setError(null);
    start(async () => {
      const res = await fn();
      if (!res.ok) setError(res.error ?? "Something went wrong.");
    });
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex flex-wrap gap-1.5">
        {status !== "APPROVED" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => approveUser(userId))}
            className={`${btn} border-good/50 text-good hover:bg-good/10`}
          >
            Approve
          </button>
        )}
        {status === "APPROVED" && (
          <button
            type="button"
            disabled={pending}
            onClick={() => run(() => setUserStatus(userId, "BLOCKED"))}
            className={`${btn} hover:bg-panel-2`}
          >
            Block
          </button>
        )}
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            if (confirm("Delete this user and all their progress? This can't be undone.")) {
              run(() => deleteUser(userId));
            }
          }}
          className={`${btn} border-bad/50 text-bad hover:bg-bad/10`}
        >
          Delete
        </button>
      </div>
      {error && <span className="text-xs text-bad">{error}</span>}
    </div>
  );
}
