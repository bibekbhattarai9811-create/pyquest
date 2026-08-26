"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
  type ReactNode,
} from "react";
import { markLessonComplete } from "@/app/actions/progress";

interface ProgressValue {
  /** lesson keys, e.g. "python-basics/loops" */
  completed: ReadonlySet<string>;
  /** kept for API stability; always true now that progress is server-seeded */
  hydrated: boolean;
  isComplete: (key: string) => boolean;
  markComplete: (key: string) => void;
}

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({
  initialCompleted,
  children,
}: {
  initialCompleted: string[];
  children: ReactNode;
}) {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set(initialCompleted));
  const [, startTransition] = useTransition();

  const markComplete = useCallback((key: string) => {
    setCompleted((prev) => {
      if (prev.has(key)) return prev;
      const next = new Set(prev);
      next.add(key);
      return next;
    });
    startTransition(async () => {
      try {
        await markLessonComplete(key);
      } catch {
        /* offline / transient — local state still reflects the pass */
      }
    });
  }, []);

  const value = useMemo<ProgressValue>(
    () => ({
      completed,
      hydrated: true,
      isComplete: (key: string) => completed.has(key),
      markComplete,
    }),
    [completed, markComplete],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
