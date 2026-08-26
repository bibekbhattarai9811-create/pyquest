"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthState } from "@/app/actions/auth";

const field =
  "w-full rounded-md border border-edge bg-canvas px-3 py-2 text-sm outline-none focus:border-brand";

export default function SignupForm() {
  const [state, action, pending] = useActionState<AuthState, FormData>(signup, {});

  return (
    <form action={action} className="flex flex-col gap-3">
      <label className="text-sm">
        <span className="mb-1 block text-dim">Name</span>
        <input name="name" type="text" required autoComplete="name" className={field} />
      </label>
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
          minLength={8}
          autoComplete="new-password"
          className={field}
        />
        <span className="mt-1 block text-xs text-dim">At least 8 characters.</span>
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
        {pending ? "Creating account…" : "Create account"}
      </button>

      <p className="text-sm text-dim">
        Already have an account?{" "}
        <Link href="/login" className="text-brand hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
