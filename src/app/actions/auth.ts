"use server";

import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { createSession, destroySession, hashPassword, verifyPassword } from "@/lib/auth";

export interface AuthState {
  error?: string;
}

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
