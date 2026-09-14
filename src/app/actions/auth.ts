"use server";

import { randomBytes } from "node:crypto";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";
import { emailConfigured, sendPasswordResetEmail } from "@/lib/email";

export interface AuthState {
  error?: string;
}

export interface RequestResetState {
  info?: string;
  error?: string;
}

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour
const GENERIC_RESET_MESSAGE =
  "If that email has an account, we've sent a link to reset the password. Check spam too.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function landingFor(status: string): string {
  return status === "APPROVED" ? "/learn/python-basics" : "/pending";
}

async function siteOrigin(): Promise<string> {
  const h = await headers();
  const host = h.get("host") ?? "localhost:3100";
  const proto = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  return `${proto}://${host}`;
}

export async function signup(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (name.length < 1) return { error: "Please enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  let landing: string;
  try {
    const isFirstUser = (await db.user.count()) === 0;
    const isAdmin = isFirstUser || adminEmails().includes(email);
    const status = isAdmin ? "APPROVED" : "PENDING";

    const user = await db.user.create({
      data: {
        name,
        email,
        passwordHash: await hashPassword(password),
        role: isAdmin ? "ADMIN" : "USER",
        status,
      },
    });

    await createSession(user.id);
    landing = landingFor(status);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      return { error: "An account with that email already exists." };
    }
    console.error("signup failed", err);
    return { error: "Something went wrong creating your account. Please try again." };
  }

  redirect(landing);
}

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password." };

  let landing: string;
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return { error: "Wrong email or password." };
    }
    if (user.status === "BLOCKED") {
      return { error: "This account has been blocked. Contact the site owner." };
    }

    await createSession(user.id);
    landing = landingFor(user.status);
  } catch (err) {
    console.error("login failed", err);
    return { error: "Something went wrong signing in. Please try again." };
  }

  redirect(landing);
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}

/**
 * Starts a password reset. Always returns the same message whether or not the
 * email exists, so this can't be used to discover registered accounts.
 */
export async function requestPasswordReset(
  _prev: RequestResetState,
  formData: FormData,
): Promise<RequestResetState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Please enter a valid email address." };

  try {
    const user = await db.user.findUnique({ where: { email } });

    if (user) {
      // One live link per user at a time.
      await db.passwordResetToken.deleteMany({ where: { userId: user.id, usedAt: null } });

      const token = randomBytes(32).toString("hex");
      await db.passwordResetToken.create({
        data: { token, userId: user.id, expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS) },
      });

      const resetUrl = `${await siteOrigin()}/reset-password/${token}`;

      if (emailConfigured()) {
        await sendPasswordResetEmail(user.email, resetUrl);
      } else {
        // No email service configured yet — surface the link in the server
        // log so the admin isn't locked out while setting one up.
        console.log(`[password reset] no EMAIL configured — link for ${email}: ${resetUrl}`);
      }
    }
  } catch (err) {
    console.error("requestPasswordReset failed", err);
    // Still show the generic message — don't leak whether it worked.
  }

  return { info: GENERIC_RESET_MESSAGE };
}

/** Completes a password reset given a valid, unexpired, unused token. */
export async function resetPassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (password !== confirm) return { error: "Passwords don't match." };

  const record = await db.passwordResetToken.findUnique({ where: { token } });
  if (!record || record.usedAt || record.expiresAt < new Date()) {
    return { error: "This reset link is invalid or has expired. Request a new one." };
  }

  await db.$transaction([
    db.user.update({
      where: { id: record.userId },
      data: { passwordHash: await hashPassword(password) },
    }),
    db.passwordResetToken.update({ where: { token }, data: { usedAt: new Date() } }),
    db.session.deleteMany({ where: { userId: record.userId } }),
  ]);

  redirect("/login?reset=success");
}
