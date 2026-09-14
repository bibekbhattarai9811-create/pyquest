import type { Metadata } from "next";
import Link from "next/link";
import { db } from "@/lib/db";
import ResetPasswordForm from "@/components/ResetPasswordForm";

export const metadata: Metadata = { title: "Reset password" };

export default async function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const record = await db.passwordResetToken.findUnique({ where: { token } });
  const valid = !!record && !record.usedAt && record.expiresAt > new Date();

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      {valid ? (
        <>
          <h1 className="text-2xl font-semibold">Choose a new password</h1>
          <p className="mt-1 text-sm text-dim">
            This will sign you out everywhere else, for safety.
          </p>
          <div className="mt-6">
            <ResetPasswordForm token={token} />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">Link expired</h1>
          <p className="mt-1 text-sm text-dim">
            This reset link is invalid or has already been used. Reset links expire after an hour.
          </p>
          <Link
            href="/forgot-password"
            className="mt-6 inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
          >
            Request a new link
          </Link>
        </>
      )}
    </div>
  );
}
