"use client";

import Link from "next/link";
import type { LiveTrack, Lesson } from "@/lib/curriculum";
import { lessonKey, trackLessons, percent } from "@/lib/curriculum";
import { useProgress } from "@/components/ProgressProvider";
import ProgressBar from "@/components/ProgressBar";

export default function LessonTopBar({
  track,
  index,
  total,
  prev,
  next,
}: {
  track: LiveTrack;
  index: number;
  total: number;
  prev: Lesson | null;
  next: Lesson | null;
}) {
  const { isComplete, hydrated } = useProgress();
  const lessons = trackLessons(track);
  const doneCount = hydrated
    ? lessons.filter((l) => isComplete(lessonKey(track.slug, l.slug))).length
    : 0;

  return (
    <div className="sticky top-14 z-30 border-b border-edge bg-canvas/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 text-sm">
        <Link href={`/learn/${track.slug}`} className="text-dim transition-colors hover:text-ink">
          ← {track.title}
        </Link>
        <span className="text-dim">·</span>
        <span className="text-dim">
          Lesson {index + 1} of {total}
        </span>
        <div className="ml-auto flex items-center gap-3">
          <ProgressBar value={percent(doneCount, total)} className="hidden w-28 sm:block" />
          <div className="flex items-center gap-1">
            {prev ? (
              <Link
                href={`/learn/${track.slug}/${prev.slug}`}
                className="rounded-md border border-edge px-2 py-1 text-xs text-dim transition-colors hover:text-ink"
                aria-label="Previous lesson"
              >
                ←
              </Link>
            ) : (
              <span className="rounded-md border border-edge px-2 py-1 text-xs text-edge">←</span>
            )}
            {next ? (
              <Link
                href={`/learn/${track.slug}/${next.slug}`}
                className="rounded-md border border-edge px-2 py-1 text-xs text-dim transition-colors hover:text-ink"
                aria-label="Next lesson"
              >
                →
              </Link>
            ) : (
              <span className="rounded-md border border-edge px-2 py-1 text-xs text-edge">→</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
