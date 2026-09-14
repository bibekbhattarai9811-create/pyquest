import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = { title: "Log in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string }>;
}) {
  const user = await getSessionUser();
  if (user) redirect(user.status === "APPROVED" ? "/learn/python-basics" : "/pending");

  const { reset } = await searchParams;

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-semibold">Log in</h1>
      <p className="mt-1 text-sm text-dim">Welcome back to PyQuest.</p>

      {reset === "success" && (
        <p className="mt-4 rounded-md border border-good/40 bg-good/10 px-3 py-2 text-sm text-good">
          Password updated. Log in with your new password.
        </p>
      )}

      <div className="mt-6">
        <LoginForm />
      </div>
    </div>
  );
}
