"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthState } from "@/app/actions/auth";

const field =
  "w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm outline-none focus:border-brand";

export default function LoginForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="text-sm">
        <span className="mb-1 block text-dim">Email</span>
        <input name="email" type="email" required autoComplete="email" className={field} />
      </label>
      <label className="text-sm">
        <span className="mb-1 block text-dim">Password</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={field}
        />
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
        {pending ? "Signing in…" : "Log in"}
      </button>

      <p className="text-sm text-dim">
        New here?{" "}
        <Link href="/signup" className="text-brand hover:underline">
          Create an account
        </Link>
      </p>
    </form>
  );
}
