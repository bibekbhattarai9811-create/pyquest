"use client";

import { useTransition } from "react";
import { logout } from "@/app/actions/auth";

export default function LogoutButton({ className = "" }: { className?: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() => start(() => logout())}
      disabled={pending}
      className={className || "text-sm text-dim transition-colors hover:text-ink disabled:opacity-50"}
    >
      {pending ? "Logging out…" : "Log out"}
    </button>
  );
}
