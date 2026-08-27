import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { getLesson } from "@/lib/curriculum";
import {
  buildSystemPrompt,
  streamTutorReply,
  tutorConfigured,
  TUTOR_DAILY_LIMIT,
} from "@/lib/tutor";

export async function POST(req: Request) {
  if (!tutorConfigured()) {
    return NextResponse.json({ error: "The AI tutor isn't set up yet." }, { status: 503 });
  }

  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Please log in." }, { status: 401 });
  if (user.status !== "APPROVED") {
    return NextResponse.json({ error: "Your account isn't approved yet." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad request." }, { status: 400 });

  const [trackSlug, lessonSlug] = String(body.lessonKey ?? "").split("/");
  const found = getLesson(trackSlug ?? "", lessonSlug ?? "");
  if (!found) return NextResponse.json({ error: "Unknown lesson." }, { status: 400 });

  const code = String(body.code ?? "").slice(0, 4000);
  const lastError = body.lastError ? String(body.lastError).slice(0, 2000) : null;
  const history = (Array.isArray(body.history) ? body.history : [])
    .filter(
      (m: unknown): m is { role: "user" | "assistant"; content: string } =>
        !!m &&
        typeof m === "object" &&
        ((m as { role?: string }).role === "user" ||
          (m as { role?: string }).role === "assistant") &&
        typeof (m as { content?: unknown }).content === "string",
    )
    .slice(-8)
    .map((m: { role: "user" | "assistant"; content: string }) => ({
      role: m.role,
      content: m.content.slice(0, 2000),
    }));

  if (history.length === 0 || history[history.length - 1].role !== "user") {
    return NextResponse.json({ error: "Nothing to answer." }, { status: 400 });
  }

  // Per-user daily cap.
  const day = new Date().toISOString().slice(0, 10);
  const usage = await db.tutorUsage.upsert({
    where: { userId_day: { userId: user.id, day } },
    create: { userId: user.id, day, count: 1 },
    update: { count: { increment: 1 } },
  });
  if (usage.count > TUTOR_DAILY_LIMIT) {
    return NextResponse.json(
      {
        error: `You've used the tutor ${TUTOR_DAILY_LIMIT} times today. Try the hint, or use "Request the solution".`,
      },
      { status: 429 },
    );
  }

  const messages = [
    {
      role: "system" as const,
      content: buildSystemPrompt({
        title: found.lesson.title,
        body: found.lesson.body,
        code,
        lastError,
      }),
    },
    ...history,
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamTutorReply(messages)) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        console.error("tutor stream error", err);
        controller.enqueue(
          encoder.encode("\n\n(the tutor ran into a problem — try again in a moment)"),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
