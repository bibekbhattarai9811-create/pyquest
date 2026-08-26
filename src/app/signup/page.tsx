import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import SignupForm from "@/components/SignupForm";

export const metadata: Metadata = { title: "Sign up" };

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) redirect(user.status === "APPROVED" ? "/learn/python-basics" : "/pending");

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-dim">
        New accounts are reviewed by an admin before lessons unlock.
      </p>
      <div className="mt-6">
        <SignupForm />
      </div>
    </div>
  );
}
