import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = { title: "Waiting for approval" };

export default async function PendingPage() {
  const user = await requireUser();
  if (user.status === "APPROVED") redirect("/learn/python-basics");
  if (user.status === "BLOCKED") redirect("/blocked");

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full border border-edge text-xl">
        ⏳
      </div>
      <h1 className="text-2xl font-semibold">Thanks, {user.name}!</h1>
      <p className="mt-2 text-dim">
        Your account is waiting for an admin to approve it. Once approved, the lessons will unlock.
      </p>
      <div className="mt-6 flex items-center justify-center gap-4">
        {/* full navigation so the server re-checks status */}
        <a
          href="/learn/python-basics"
          className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
        >
          I&apos;ve been approved — continue
        </a>
        <LogoutButton />
      </div>
    </div>
  );
}
