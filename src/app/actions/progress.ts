"use server";

import { db } from "@/lib/db";
import { getSessionUser, requireApproved } from "@/lib/auth";
import { allLessonKeys } from "@/lib/curriculum";

/** Lesson keys the current user has completed. Empty for signed-out users. */
export async function getMyCompletions(): Promise<string[]> {
  const user = await getSessionUser();
  if (!user) return [];
  const rows = await db.completion.findMany({
    where: { userId: user.id },
    select: { lessonKey: true },
  });
  return rows.map((r) => r.lessonKey);
}

/** Record a lesson as complete for the current (approved) user. */
export async function markLessonComplete(lessonKey: string): Promise<void> {
  const user = await requireApproved();

  if (!allLessonKeys().includes(lessonKey)) return;

  await db.completion.upsert({
    where: { userId_lessonKey: { userId: user.id, lessonKey } },
    create: { userId: user.id, lessonKey },
    update: {},
  });
}
