import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";
import { allLessonKeys, lessonTitleForKey, percent } from "@/lib/curriculum";
import UserActions from "@/components/UserActions";
import SolutionRequestActions from "@/components/SolutionRequestActions";

export const metadata: Metadata = { title: "Admin" };

const TOTAL_LESSONS = allLessonKeys().length;

type Status = "PENDING" | "APPROVED" | "BLOCKED";

function StatusBadge({ status }: { status: Status }) {
  const styles: Record<Status, string> = {
    PENDING: "bg-gold/15 text-gold",
    APPROVED: "bg-good/15 text-good",
    BLOCKED: "bg-bad/15 text-bad",
  };
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${styles[status]}`}>
      {status.toLowerCase()}
    </span>
  );
}

export default async function AdminPage() {
  const admin = await requireAdmin();
  const users = await db.user.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { completions: true } } },
  });
  const solutionRequests = await db.solutionRequest.findMany({
    where: { status: "PENDING" },
    orderBy: { createdAt: "asc" },
    include: { user: { select: { name: true, email: true } } },
  });
  const tutorToday = await db.tutorUsage.aggregate({
    where: { day: new Date().toISOString().slice(0, 10) },
    _sum: { count: true },
  });

  const pending = users.filter((u) => u.status === "PENDING").length;
  const tutorMessages = tutorToday._sum.count ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Admin</h1>
      <p className="mt-1 text-dim">
        {users.length} {users.length === 1 ? "user" : "users"}
        {pending > 0 && (
          <>
            {" · "}
            <span className="text-gold">{pending} waiting for approval</span>
          </>
        )}
        {solutionRequests.length > 0 && (
          <>
            {" · "}
            <span className="text-gold">{solutionRequests.length} solution request(s)</span>
          </>
        )}
        {" · "}
        <span>AI tutor: {tutorMessages} message{tutorMessages === 1 ? "" : "s"} today</span>
      </p>

      {solutionRequests.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-dim">
            Solution requests
          </h2>
          <ul className="mt-3 divide-y divide-edge overflow-hidden rounded-xl border border-edge">
            {solutionRequests.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-3 px-4 py-3 text-sm">
                <span className="min-w-0">
                  <span className="font-medium">{r.user.name}</span>{" "}
                  <span className="text-dim">wants</span>{" "}
                  <span className="font-medium">{lessonTitleForKey(r.lessonKey)}</span>
                  <span className="ml-2 text-xs text-dim">
                    {r.createdAt.toISOString().slice(0, 10)}
                  </span>
                </span>
                <span className="ml-auto">
                  <SolutionRequestActions id={r.id} />
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-edge">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-panel text-left text-xs uppercase tracking-wide text-dim">
            <tr>
              <th className="px-3 py-2 font-medium">User</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Progress</th>
              <th className="px-3 py-2 font-medium">Joined</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-edge">
            {users.map((u) => {
              const done = u._count.completions;
              return (
                <tr key={u.id} className="align-top">
                  <td className="px-3 py-3">
                    <div className="font-medium">
                      {u.name}
                      {u.role === "ADMIN" && (
                        <span className="ml-1.5 rounded bg-brand/15 px-1.5 py-0.5 text-xs text-brand">
                          admin
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-dim">{u.email}</div>
                  </td>
                  <td className="px-3 py-3">
                    <StatusBadge status={u.status as Status} />
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {done}/{TOTAL_LESSONS}{" "}
                    <span className="text-dim">({percent(done, TOTAL_LESSONS)}%)</span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-dim">
                    {u.createdAt.toISOString().slice(0, 10)}
                  </td>
                  <td className="px-3 py-3">
                    <UserActions
                      userId={u.id}
                      status={u.status as Status}
                      isSelf={u.id === admin.id}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
