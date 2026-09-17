"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Check } from "@/lib/curriculum";

export type PyStatus = "idle" | "booting" | "loading-packages" | "ready" | "running";

export interface RunResult {
  stdout: string;
  error: string | null;
  /** true / false when a check was requested, null otherwise */
  checkPassed: boolean | null;
  timedOut: boolean;
  /** base64 PNG when the lesson used matplotlib and a figure was drawn */
  image: string | null;
}

const TIMEOUT_MS = 12_000;
/** Extra-heavy libraries (scikit-learn) can take ~15s to cold-load once. */
const TIMEOUT_WITH_PACKAGES_MS = 32_000;

interface Pending {
  resolve: (result: RunResult) => void;
  timer: ReturnType<typeof setTimeout>;
}

/**
 * Hook around the Pyodide web worker.
 * `run(code)` executes code; `run(code, check, packages)` also grades it and
 * loads any extra libraries the lesson needs (numpy, pandas, ...).
 */
export function usePyodide() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<Map<number, Pending>>(new Map());
  const seqRef = useRef(0);
  const [status, setStatus] = useState<PyStatus>("idle");
  const [loadingPackages, setLoadingPackages] = useState<string[]>([]);

  const spawn = useCallback((): Worker => {
    const worker = new Worker("/pyodide-worker.js");
    worker.onmessage = (event: MessageEvent) => {
      const data = event.data;
      if (data.type === "booting") {
        setStatus("booting");
      } else if (data.type === "loading-packages") {
        setLoadingPackages(data.packages ?? []);
        setStatus("loading-packages");
      } else if (data.type === "ready") {
        setStatus((s) => (s === "booting" ? "running" : s));
      } else if (data.type === "result") {
        setLoadingPackages([]);
        const pending = pendingRef.current.get(data.id);
        if (pending) {
          clearTimeout(pending.timer);
          pendingRef.current.delete(data.id);
          pending.resolve({
            stdout: data.stdout ?? "",
            error: data.error ?? null,
            checkPassed: data.checkPassed ?? null,
            timedOut: false,
            image: data.image ?? null,
          });
        }
        setStatus(pendingRef.current.size > 0 ? "running" : "ready");
      }
    };
    workerRef.current = worker;
    return worker;
  }, []);

  useEffect(() => {
    const worker = spawn();
    return () => {
      worker.terminate();
      pendingRef.current.forEach((p) => clearTimeout(p.timer));
      pendingRef.current.clear();
      workerRef.current = null;
    };
  }, [spawn]);

  const run = useCallback(
    (code: string, check?: Check, packages?: string[]): Promise<RunResult> => {
      let worker = workerRef.current ?? spawn();
      const id = ++seqRef.current;
      const timeoutMs = packages && packages.length > 0 ? TIMEOUT_WITH_PACKAGES_MS : TIMEOUT_MS;
      setStatus((s) => (s === "ready" || s === "idle" ? "running" : s));

      return new Promise<RunResult>((resolve) => {
        const timer = setTimeout(() => {
          pendingRef.current.delete(id);
          // A runaway loop can't be interrupted — kill the worker and start fresh.
          worker.terminate();
          workerRef.current = null;
          spawn();
          setStatus("ready");
          setLoadingPackages([]);
          resolve({
            stdout: "",
            error: `Your code ran for over ${Math.round(timeoutMs / 1000)} seconds and was stopped. If you wrote a loop, make sure it can finish.`,
            checkPassed: check ? false : null,
            timedOut: true,
            image: null,
          });
        }, timeoutMs);

        pendingRef.current.set(id, { resolve, timer });
        worker.postMessage({ type: "run", id, code, check: check ?? null, packages: packages ?? [] });
      });
    },
    [spawn],
  );

  return { status, loadingPackages, run };
}
