"use client";

import Link from "next/link";
import type { LiveTrack } from "@/lib/curriculum";
import { lessonKey, trackLessons, percent } from "@/lib/curriculum";
import { useProgress } from "@/components/ProgressProvider";
import ProgressBar from "@/components/ProgressBar";

export default function TrackSyllabus({ track }: { track: LiveTrack }) {
  const { isComplete, hydrated } = useProgress();
  const lessons = trackLessons(track);
  const doneCount = hydrated
    ? lessons.filter((l) => isComplete(lessonKey(track.slug, l.slug))).length
    : 0;
  const pct = percent(doneCount, lessons.length);

  // First not-yet-complete lesson, or the last one if all done.
  const nextLesson =
    lessons.find((l) => !isComplete(lessonKey(track.slug, l.slug))) ?? lessons[lessons.length - 1];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-medium text-brand">{track.role} track</p>
      <h1 className="mt-1 text-3xl font-semibold">{track.title}</h1>
      <p className="mt-3 text-dim">{track.blurb}</p>

      <div className="mt-6 rounded-xl border border-edge bg-panel p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-dim">
            {hydrated ? (
              <>
                <span className="font-semibold text-ink">{doneCount}</span> of {lessons.length}{" "}
                lessons complete
              </>
            ) : (
              <>{lessons.length} lessons</>
            )}
          </span>
          <span className="font-semibold">{pct}%</span>
        </div>
        <ProgressBar value={pct} className="mt-2" />
        <Link
          href={`/learn/${track.slug}/${nextLesson.slug}`}
          className="mt-4 inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
        >
          {doneCount === 0 ? "Start track" : doneCount === lessons.length ? "Review lessons" : "Continue"}
        </Link>
      </div>

      <div className="mt-8 space-y-8">
        {track.modules.map((module, mi) => (
          <section key={module.title}>
            <h2 className="text-xs font-semibold uppercase tracking-wide text-dim">
              Module {mi + 1} · {module.title}
            </h2>
            <ol className="mt-3 divide-y divide-edge overflow-hidden rounded-xl border border-edge bg-panel">
              {module.lessons.map((lesson, li) => {
                const key = lessonKey(track.slug, lesson.slug);
                const complete = hydrated && isComplete(key);
                const number = track.modules
                  .slice(0, mi)
                  .reduce((n, m) => n + m.lessons.length, 0) + li + 1;
                return (
                  <li key={lesson.slug}>
                    <Link
                      href={`/learn/${track.slug}/${lesson.slug}`}
                      className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-panel-2"
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs ${
                          complete
                            ? "border-good bg-good/15 text-good"
                            : "border-edge text-dim"
                        }`}
                      >
                        {complete ? "✓" : number}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{lesson.title}</span>
                        <span className="block truncate text-xs text-dim">{lesson.summary}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}
      </div>
    </div>
  );
}
