import type { Metadata } from "next";
import Link from "next/link";
import {
  getTracks,
  isLive,
  trackLessons,
  outlineLessonCount,
} from "@/lib/curriculum";
import { accent } from "@/lib/accent";

export const metadata: Metadata = {
  title: "Tracks",
  description: "Every PyQuest track, from Python Basics to AI Engineer.",
};

export default function TracksPage() {
  const tracks = getTracks();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Tracks</h1>
      <p className="mt-2 text-dim">
        Work through them in order. <strong className="text-ink">Python Basics</strong> is fully
        interactive today; the career tracks below show the full plan and open next.
      </p>

      <div className="mt-8 space-y-5">
        {tracks.map((track) => {
          const a = accent[track.accent];
          const live = isLive(track);
          const count = live ? trackLessons(track).length : outlineLessonCount(track);

          return (
            <article
              key={track.slug}
              className={`rounded-xl border bg-panel p-6 ${a.border}`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${a.badge}`}>
                  {track.role}
                </span>
                {live ? (
                  <span className="text-xs font-medium text-good">Available now</span>
                ) : (
                  <span className="text-xs text-dim">Coming soon</span>
                )}
                <span className="text-xs text-dim">· {count} lessons</span>
              </div>

              <h2 className="mt-3 text-xl font-semibold">{track.title}</h2>
              <p className="mt-1.5 text-sm text-dim">{track.blurb}</p>

              {live ? (
                <>
                  <ul className="mt-4 grid gap-1.5 sm:grid-cols-2">
                    {track.modules.map((m) => (
                      <li key={m.title} className="text-sm">
                        <span className={`mr-2 inline-block h-1.5 w-1.5 rounded-full ${a.dot}`} />
                        {m.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/learn/${track.slug}`}
                    className="mt-5 inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
                  >
                    Open track
                  </Link>
                </>
              ) : (
                <div className="mt-4 space-y-3">
                  {track.outline.map((m) => (
                    <div key={m.title}>
                      <p className="text-xs font-semibold uppercase tracking-wide text-dim">
                        {m.title}
                      </p>
                      <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-dim">
                        {m.lessons.map((l) => (
                          <li key={l}>
                            <span className={`mr-1.5 inline-block h-1 w-1 rounded-full ${a.dot}`} />
                            {l}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
