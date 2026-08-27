import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllLessonParams, getLesson, lessonKey } from "@/lib/curriculum";
import { getSolutionAccess } from "@/app/actions/solutions";
import { tutorConfigured } from "@/lib/tutor";
import Markdown from "@/components/Markdown";
import CodePlayground from "@/components/CodePlayground";
import LessonTopBar from "@/components/LessonTopBar";
import ModuleVideo from "@/components/ModuleVideo";

export function generateStaticParams() {
  return getAllLessonParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>;
}): Promise<Metadata> {
  const { track, lesson } = await params;
  const found = getLesson(track, lesson);
  if (!found) return { title: "Lesson not found" };
  return { title: found.lesson.title, description: found.lesson.summary };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ track: string; lesson: string }>;
}) {
  const { track, lesson } = await params;
  const found = getLesson(track, lesson);
  if (!found) notFound();

  const { lesson: current, track: liveTrack, index, total, prev, next } = found;
  const nextHref = next ? `/learn/${track}/${next.slug}` : null;

  const key = lessonKey(track, current.slug);
  const access = await getSolutionAccess(key);

  const isFirstOfModule = found.module.lessons[0]?.slug === current.slug;
  const moduleVideo = isFirstOfModule ? found.module.video : undefined;

  return (
    <div>
      <LessonTopBar track={liveTrack} index={index} total={total} prev={prev} next={next} />

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-8 lg:grid-cols-2">
        {/* Lesson text */}
        <article className="min-w-0">
          {moduleVideo && (
            <ModuleVideo moduleTitle={found.module.title} video={moduleVideo} />
          )}
          <p className="text-xs font-medium uppercase tracking-wide text-brand">
            {found.module.title}
          </p>
          <h1 className="mt-1 text-2xl font-semibold">{current.title}</h1>
          <div className="mt-5">
            <Markdown source={current.body} />
          </div>
        </article>

        {/* Editor */}
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <CodePlayground
            lessonKey={key}
            starterCode={current.starterCode}
            check={current.check}
            solution={access.canSee ? current.solution : null}
            solutionRequestStatus={access.requestStatus}
            nextHref={nextHref}
            tutorAvailable={tutorConfigured()}
          />
        </div>
      </div>

      {/* Bottom nav */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pb-14">
        {prev ? (
          <Link
            href={`/learn/${track}/${prev.slug}`}
            className="rounded-md border border-edge px-4 py-2 text-sm text-dim transition-colors hover:text-ink"
          >
            ← {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/learn/${track}/${next.slug}`}
            className="rounded-md border border-edge px-4 py-2 text-sm text-dim transition-colors hover:text-ink"
          >
            {next.title} →
          </Link>
        ) : (
          <Link
            href={`/learn/${track}`}
            className="rounded-md border border-edge px-4 py-2 text-sm text-dim transition-colors hover:text-ink"
          >
            Back to track overview
          </Link>
        )}
      </div>
    </div>
  );
}
