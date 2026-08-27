"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { getSessionUser, requireAdmin, requireApproved } from "@/lib/auth";
import { allLessonKeys } from "@/lib/curriculum";

export type RequestStatus = "none" | "pending" | "granted" | "denied";

export interface SolutionAccess {
  /** May the current viewer see the full solution for this lesson? */
  canSee: boolean;
  requestStatus: RequestStatus;
}

/** Whether the current user can see this lesson's solution, and their request state. */
export async function getSolutionAccess(lessonKey: string): Promise<SolutionAccess> {
  const user = await getSessionUser();
  if (!user) return { canSee: false, requestStatus: "none" };
  if (user.role === "ADMIN") return { canSee: true, requestStatus: "granted" };

  const req = await db.solutionRequest.findUnique({
    where: { userId_lessonKey: { userId: user.id, lessonKey } },
    select: { status: true },
  });

  const status = (req?.status ?? "NONE") as "NONE" | "PENDING" | "GRANTED" | "DENIED";
  return {
    canSee: status === "GRANTED",
    requestStatus: status.toLowerCase() as RequestStatus,
  };
}

export interface ActionResult {
  ok: boolean;
  error?: string;
}

/** A stuck learner asks an admin to unlock the solution for one lesson. */
export async function requestSolution(lessonKey: string): Promise<ActionResult> {
  const user = await requireApproved();
  if (!allLessonKeys().includes(lessonKey)) return { ok: false, error: "Unknown lesson." };

  const existing = await db.solutionRequest.findUnique({
    where: { userId_lessonKey: { userId: user.id, lessonKey } },
  });

  if (!existing) {
    await db.solutionRequest.create({ data: { userId: user.id, lessonKey, status: "PENDING" } });
  } else if (existing.status === "DENIED") {
    await db.solutionRequest.update({
      where: { id: existing.id },
      data: { status: "PENDING", resolvedAt: null },
    });
  }
  // PENDING or GRANTED: nothing to do.

  revalidatePath("/admin");
  return { ok: true };
}

/** Admin grants or denies a request. */
export async function resolveSolutionRequest(
  id: string,
  decision: "GRANTED" | "DENIED",
): Promise<ActionResult> {
  await requireAdmin();
  if (decision !== "GRANTED" && decision !== "DENIED") {
    return { ok: false, error: "Bad decision." };
  }
  await db.solutionRequest.update({
    where: { id },
    data: { status: decision, resolvedAt: new Date() },
  });
  revalidatePath("/admin");
  return { ok: true };
}
