import Link from "next/link";
import { site } from "@/lib/site";
import {
  getTracks,
  isLive,
  trackLessons,
  outlineLessonCount,
} from "@/lib/curriculum";
import { accent } from "@/lib/accent";
import { getSessionUser } from "@/lib/auth";

const steps = [
  {
    title: "Read a short lesson",
    body: "Every lesson is a few minutes of plain-English explanation with tiny examples.",
  },
  {
    title: "Write real Python",
    body: "A full code editor sits next to the lesson. Run your code and see the output instantly.",
  },
  {
    title: "Get checked feedback",
    body: "Press Check answer and PyQuest tells you if it's right — and nudges you if it isn't.",
  },
];

export default async function Home() {
  const tracks = getTracks();
  const user = await getSessionUser();
  const startHref = !user
    ? "/signup"
    : user.status === "APPROVED"
      ? "/learn/python-basics"
      : "/pending";
  const startLabel = user?.status === "APPROVED" ? "Continue learning" : "Get started";

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-edge bg-panel px-3 py-1 text-xs text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-good" />
          Free · Runs in your browser · No install
        </p>
        <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
          {site.tagline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-dim">{site.description}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={startHref}
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
          >
            {startLabel}
          </Link>
          <Link
            href="/tracks"
            className="rounded-md border border-edge px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand"
          >
            See all tracks
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="rounded-xl border border-edge bg-panel p-5">
              <span className="font-mono text-sm text-brand">0{i + 1}</span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-dim">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tracks */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h2 className="text-lg font-semibold">The path — basics to career track</h2>
        <p className="mt-1 text-sm text-dim">
          Start with the fundamentals, then branch into the role you're aiming for.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {tracks.map((track) => {
            const a = accent[track.accent];
            const count = isLive(track)
              ? trackLessons(track).length
              : outlineLessonCount(track);
            const href = isLive(track) ? `/learn/${track.slug}` : "/tracks";
            return (
              <Link
                key={track.slug}
                href={href}
                className={`group rounded-xl border bg-panel p-5 transition-colors hover:bg-panel-2 ${a.border}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${a.badge}`}>
                    {track.role}
                  </span>
                  {isLive(track) ? (
                    <span className="text-xs text-good">Available now</span>
                  ) : (
                    <span className="text-xs text-dim">Coming soon</span>
                  )}
                </div>
                <h3 className="mt-3 font-semibold">{track.title}</h3>
                <p className="mt-1 line-clamp-3 text-sm text-dim">{track.blurb}</p>
                <p className="mt-3 text-xs text-dim">{count} lessons</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
