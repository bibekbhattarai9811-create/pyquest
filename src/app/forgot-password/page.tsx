import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import ForgotPasswordForm from "@/components/ForgotPasswordForm";

export const metadata: Metadata = { title: "Forgot password" };

export default async function ForgotPasswordPage() {
  const user = await getSessionUser();
  if (user) redirect(user.status === "APPROVED" ? "/learn/python-basics" : "/pending");

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-semibold">Reset your password</h1>
      <p className="mt-1 text-sm text-dim">
        Enter the email you signed up with — we&apos;ll send a link to set a new password.
      </p>
      <div className="mt-6">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
