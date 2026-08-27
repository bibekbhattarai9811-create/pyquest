"use client";

import { useState } from "react";

/** Pull the YouTube video id out of a URL, or accept a bare 11-char id. */
function youTubeId(input: string): string | null {
  const s = input.trim();
  if (/^[\w-]{11}$/.test(s)) return s;
  try {
    const url = new URL(s);
    if (url.hostname === "youtu.be") return url.pathname.slice(1) || null;
    if (url.hostname.endsWith("youtube.com")) {
      return url.searchParams.get("v") || url.pathname.split("/").pop() || null;
    }
  } catch {
    /* not a URL */
  }
  return null;
}

export default function ModuleVideo({
  moduleTitle,
  video,
}: {
  moduleTitle: string;
  video: string;
}) {
  const [open, setOpen] = useState(true);
  const id = youTubeId(video);
  if (!id) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-edge bg-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <span className="text-sm font-medium">
          <span className="mr-2">📺</span>
          Module intro — {moduleTitle}
        </span>
        <span className="text-xs text-dim">{open ? "Hide" : "Watch"}</span>
      </button>
      {open && (
        <div className="relative aspect-video w-full border-t border-edge bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title={`${moduleTitle} — intro`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
