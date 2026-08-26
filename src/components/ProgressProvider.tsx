"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "pyquest:progress:v1";

interface ProgressValue {
  /** lesson keys, e.g. "python-basics/loops" */
  completed: ReadonlySet<string>;
  hydrated: boolean;
  isComplete: (key: string) => boolean;
  markComplete: (key: string) => void;
  reset: () => void;
}

const ProgressContext = createContext<ProgressValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setCompleted(new Set(parsed));
      }
    } catch {
      /* corrupt or unavailable storage — start fresh */
    }
    setHydrated(true);
  }, []);

  const persist = useCallback((next: Set<string>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    } catch {
      /* ignore quota / privacy-mode errors */
    }
  }, []);

  const markComplete = useCallback(
    (key: string) => {
      setCompleted((prev) => {
        if (prev.has(key)) return prev;
        const next = new Set(prev);
        next.add(key);
        persist(next);
        return next;
      });
    },
    [persist],
  );

  const reset = useCallback(() => {
    setCompleted(new Set());
    persist(new Set());
  }, [persist]);

  const value = useMemo<ProgressValue>(
    () => ({
      completed,
      hydrated,
      isComplete: (key: string) => completed.has(key),
      markComplete,
      reset,
    }),
    [completed, hydrated, markComplete, reset],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside <ProgressProvider>");
  return ctx;
}
