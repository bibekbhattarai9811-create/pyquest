"use client";

import { useActionState } from "react";
import Link from "next/link";
import { requestPasswordReset, type RequestResetState } from "@/app/actions/auth";

const field =
  "w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm outline-none focus:border-brand";

export default function ForgotPasswordForm() {
  const [state, action, pending] = useActionState<RequestResetState, FormData>(
    requestPasswordReset,
    {},
  );

  if (state.info) {
    return (
      <div className="rounded-md border border-good/40 bg-good/10 px-3 py-3 text-sm text-good">
        {state.info}
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="text-sm">
        <span className="mb-1 block text-dim">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>

      {state.error && (
        <p className="rounded-md border border-bad/40 bg-bad/10 px-3 py-2 text-sm text-bad">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong disabled:opacity-50"
      >
        {pending ? "Sending…" : "Send reset link"}
      </button>

      <p className="text-sm text-dim">
        <Link href="/login" className="text-brand hover:underline">
          Back to log in
        </Link>
      </p>
    </form>
  );
}
