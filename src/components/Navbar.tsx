"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, nav } from "@/lib/site";
import { allLessonKeys } from "@/lib/curriculum";
import { useProgress } from "@/components/ProgressProvider";
import { useAuth } from "@/components/AuthProvider";
import LogoutButton from "@/components/LogoutButton";

const TOTAL_LESSONS = allLessonKeys().length;
const LESSON_KEYS = new Set(allLessonKeys());

export default function Navbar() {
  const pathname = usePathname();
  const { completed } = useProgress();
  const { user } = useAuth();
  const done = [...completed].filter((k) => LESSON_KEYS.has(k)).length;

  return (
    <header className="sticky top-0 z-40 border-b border-edge bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-brand font-mono text-sm text-[#0b0f1a]">
            Py
          </span>
          <span>{site.name}</span>
        </Link>

        <nav className="ml-2 hidden items-center gap-1 sm:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active ? "bg-panel-2 text-ink" : "text-dim hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          {user?.status === "APPROVED" && (
            <Link
              href="/learn/python-basics"
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname.startsWith("/learn") ? "bg-panel-2 text-ink" : "text-dim hover:text-ink"
              }`}
            >
              Learn
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link
              href="/admin"
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                pathname.startsWith("/admin") ? "bg-panel-2 text-ink" : "text-dim hover:text-ink"
              }`}
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {user && done > 0 && (
            <span className="hidden rounded-full border border-edge bg-panel px-3 py-1 text-xs text-dim sm:inline">
              <span className="font-semibold text-ink">{done}</span> / {TOTAL_LESSONS} lessons
            </span>
          )}
          {user ? (
            <>
              <span className="hidden text-sm text-dim sm:inline">{user.name}</span>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-dim transition-colors hover:text-ink">
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
