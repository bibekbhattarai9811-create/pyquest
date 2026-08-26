"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export interface AdminResult {
  ok: boolean;
  error?: string;
}

type Status = "PENDING" | "APPROVED" | "BLOCKED";
const STATUSES: Status[] = ["PENDING", "APPROVED", "BLOCKED"];

export async function setUserStatus(userId: string, status: Status): Promise<AdminResult> {
  const admin = await requireAdmin();
  if (!STATUSES.includes(status)) return { ok: false, error: "Unknown status." };
  if (userId === admin.id) return { ok: false, error: "You can't change your own status." };

  await db.user.update({ where: { id: userId }, data: { status } });

  // A blocked user should lose access immediately.
  if (status !== "APPROVED") {
    await db.session.deleteMany({ where: { userId } });
  }

  revalidatePath("/admin");
  return { ok: true };
}

export async function approveUser(userId: string): Promise<AdminResult> {
  return setUserStatus(userId, "APPROVED");
}

export async function deleteUser(userId: string): Promise<AdminResult> {
  const admin = await requireAdmin();
  if (userId === admin.id) return { ok: false, error: "You can't delete your own account." };

  const target = await db.user.findUnique({ where: { id: userId } });
  if (!target) return { ok: false, error: "That user no longer exists." };

  if (target.role === "ADMIN") {
    const adminCount = await db.user.count({ where: { role: "ADMIN" } });
    if (adminCount <= 1) return { ok: false, error: "Can't delete the only admin." };
  }

  // Sessions and completions cascade-delete with the user.
  await db.user.delete({ where: { id: userId } });

  revalidatePath("/admin");
  return { ok: true };
}
