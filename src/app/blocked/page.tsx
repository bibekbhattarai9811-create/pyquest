import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = { title: "Account blocked" };

export default async function BlockedPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  if (user.status === "APPROVED") redirect("/learn/python-basics");
  if (user.status === "PENDING") redirect("/pending");

  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="text-2xl font-semibold">Account blocked</h1>
      <p className="mt-2 text-dim">
        This account has been blocked. If you think that&apos;s a mistake, contact the site owner.
      </p>
      <div className="mt-6">
        <LogoutButton />
      </div>
    </div>
  );
}
