/**
 * The course registry + lookup helpers.
 *
 * Pure data (no `fs`, no server APIs) so it is safe to import from both server
 * and client components. Lesson text lives inline in each track's file as
 * Markdown (see src/lib/tracks/python-basics.ts).
 */

import type {
  Accent,
  Check,
  ComingSoonTrack,
  Lesson,
  LiveTrack,
  Module,
  Track,
} from "@/lib/tracks/types";
import { pythonBasics } from "@/lib/tracks/python-basics";

export type { Accent, Check, ComingSoonTrack, Lesson, LiveTrack, Module, Track };

/* ------------------------------------------------------------------ *
 * Tracks 2-4 — outlines only (Coming soon)
 * ------------------------------------------------------------------ */

const dataScientist: ComingSoonTrack = {
  slug: "data-scientist",
  title: "Data Scientist",
  role: "Data Scientist",
  blurb:
    "Turn raw data into insight: NumPy arrays, pandas DataFrames, cleaning messy data, exploratory analysis, and clear charts with Matplotlib.",
  accent: "sky",
  status: "coming-soon",
  outline: [
    {
      title: "Python for data",
      lessons: [
        "Virtual environments & Jupyter",
        "NumPy arrays and vectorised math",
        "Working with CSV and JSON files",
      ],
    },
    {
      title: "pandas",
      lessons: [
        "Series and DataFrames",
        "Selecting, filtering and sorting",
        "Grouping and aggregation",
        "Joining datasets",
        "Handling missing and dirty data",
      ],
    },
    {
      title: "Analysis & visualisation",
      lessons: [
        "Exploratory data analysis",
        "Matplotlib and Seaborn",
        "Descriptive statistics",
        "Correlation and simple hypothesis tests",
        "Capstone: analyse a real dataset",
      ],
    },
  ],
};

const mlEngineer: ComingSoonTrack = {
  slug: "ml-engineer",
  title: "Machine Learning Engineer",
  role: "ML Engineer",
  blurb:
    "Build models that learn from data: the scikit-learn workflow, regression and classification, evaluation, feature engineering, and shipping a model behind an API.",
  accent: "good",
  status: "coming-soon",
  outline: [
    {
      title: "ML foundations",
      lessons: [
        "What machine learning actually is",
        "Train/validation/test splits",
        "The scikit-learn estimator API",
      ],
    },
    {
      title: "Core models",
      lessons: [
        "Linear and logistic regression",
        "Decision trees and random forests",
        "Gradient boosting",
        "Clustering with k-means",
      ],
    },
    {
      title: "Doing it well",
      lessons: [
        "Metrics: accuracy, precision, recall, ROC",
        "Cross-validation and hyperparameter tuning",
        "Feature engineering & pipelines",
        "Avoiding leakage and overfitting",
      ],
    },
    {
      title: "Shipping",
      lessons: [
        "Saving and loading models",
        "Serving a model with FastAPI",
        "Capstone: end-to-end ML service",
      ],
    },
  ],
};

const aiEngineer: ComingSoonTrack = {
  slug: "ai-engineer",
  title: "AI Engineer",
  role: "AI Engineer",
  blurb:
    "Build applications on top of large language models: calling model APIs, prompt design, embeddings and vector search, retrieval-augmented generation, agents and tools, and evaluation.",
  accent: "gold",
  status: "coming-soon",
  outline: [
    {
      title: "Working with LLMs",
      lessons: [
        "How LLMs work (enough to be useful)",
        "Calling a model API from Python",
        "Prompt design and structured output",
        "Streaming, tokens and cost",
      ],
    },
    {
      title: "Retrieval",
      lessons: [
        "Embeddings and similarity",
        "Vector databases",
        "Chunking and indexing documents",
        "Retrieval-augmented generation (RAG)",
      ],
    },
    {
      title: "Agents & production",
      lessons: [
        "Tool use and function calling",
        "Building a simple agent loop",
        "Guardrails and safety",
        "Evaluating AI systems",
        "Capstone: a document Q&A assistant",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Registry + helpers
 * ------------------------------------------------------------------ */

export const tracks: Track[] = [pythonBasics, dataScientist, mlEngineer, aiEngineer];

export function getTracks(): Track[] {
  return tracks;
}

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function isLive(track: Track): track is LiveTrack {
  return track.status === "live";
}

export function getLiveTracks(): LiveTrack[] {
  return tracks.filter(isLive);
}

export function trackLessons(track: LiveTrack): Lesson[] {
  return track.modules.flatMap((m) => m.lessons);
}

export function lessonKey(trackSlug: string, lessonSlug: string): string {
  return `${trackSlug}/${lessonSlug}`;
}

export function allLessonKeys(): string[] {
  return getLiveTracks().flatMap((t) => trackLessons(t).map((l) => lessonKey(t.slug, l.slug)));
}

export function outlineLessonCount(track: ComingSoonTrack): number {
  return track.outline.reduce((n, m) => n + m.lessons.length, 0);
}

export function getAllLessonParams(): { track: string; lesson: string }[] {
  return getLiveTracks().flatMap((t) =>
    trackLessons(t).map((l) => ({ track: t.slug, lesson: l.slug })),
  );
}

export interface LocatedLesson {
  track: LiveTrack;
  module: Module;
  lesson: Lesson;
  index: number;
  total: number;
  prev: Lesson | null;
  next: Lesson | null;
}

export function getLesson(trackSlug: string, lessonSlug: string): LocatedLesson | undefined {
  const track = getTrack(trackSlug);
  if (!track || !isLive(track)) return undefined;
  const lessons = trackLessons(track);
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  const module = track.modules.find((m) => m.lessons.some((l) => l.slug === lessonSlug))!;
  return {
    track,
    module,
    lesson: lessons[index],
    index,
    total: lessons.length,
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export function percent(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}
