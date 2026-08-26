import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrack, getLiveTracks, isLive } from "@/lib/curriculum";
import { accent } from "@/lib/accent";
import TrackSyllabus from "@/components/TrackSyllabus";

export function generateStaticParams() {
  return getLiveTracks().map((t) => ({ track: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ track: string }>;
}): Promise<Metadata> {
  const { track } = await params;
  const found = getTrack(track);
  if (!found) return { title: "Track not found" };
  return { title: found.title, description: found.blurb };
}

export default async function TrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track } = await params;
  const found = getTrack(track);
  if (!found) notFound();

  if (isLive(found)) {
    return <TrackSyllabus track={found} />;
  }

  const a = accent[found.accent];
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${a.badge}`}>{found.role}</span>
      <h1 className="mt-4 text-3xl font-semibold">{found.title}</h1>
      <p className="mt-3 text-dim">{found.blurb}</p>
      <p className="mt-6 rounded-xl border border-edge bg-panel px-4 py-3 text-sm text-dim">
        This track is being written. In the meantime, finish{" "}
        <Link href="/learn/python-basics" className="text-brand underline">
          Python Basics
        </Link>{" "}
        — it&apos;s the foundation for everything here.
      </p>
      <Link
        href="/tracks"
        className="mt-6 inline-block rounded-md border border-edge px-4 py-2 text-sm transition-colors hover:border-brand"
      >
        See the full outline
      </Link>
    </div>
  );
}
