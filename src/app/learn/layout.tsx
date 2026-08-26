import { requireApproved } from "@/lib/auth";

/** Gate: only approved, signed-in users can reach any /learn route. */
export default async function LearnLayout({ children }: { children: React.ReactNode }) {
  await requireApproved();
  return <>{children}</>;
}
