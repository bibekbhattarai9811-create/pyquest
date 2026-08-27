"use client";

import { useEffect, useRef, useState } from "react";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

export default function Tutor({
  lessonKey,
  code,
  lastError,
}: {
  lessonKey: string;
  code: string;
  lastError: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setError(null);

    const history: Msg[] = [...messages, { role: "user", content: text }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonKey, code, lastError, history }),
      });

      if (!res.ok || !res.body) {
        const j = await res.json().catch(() => ({}) as { error?: string });
        setError(j.error || "The tutor is unavailable right now.");
        setMessages(history);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }
    } catch {
      setError("Lost connection to the tutor.");
      setMessages(history);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mt-3 overflow-hidden rounded-lg border border-edge bg-panel">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-left"
      >
        <span className="text-sm font-medium">
          <span className="mr-2">🎓</span>Ask the tutor
        </span>
        <span className="text-xs text-dim">{open ? "Hide" : "Open"}</span>
      </button>

      {open && (
        <div className="border-t border-edge p-3">
          {messages.length === 0 && (
            <p className="text-xs text-dim">
              Stuck? Say what you tried, or paste the error. The tutor gives hints — it won&apos;t
              write the answer for you.
            </p>
          )}

          {messages.length > 0 && (
            <div ref={scrollRef} className="mt-1 flex max-h-72 flex-col gap-2 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
                    m.role === "user"
                      ? "self-end bg-panel-2 text-ink"
                      : "self-start border border-edge bg-canvas text-ink"
                  }`}
                >
                  {m.content || (busy && i === messages.length - 1 ? "…" : "")}
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-2 text-xs text-bad">{error}</p>}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
            className="mt-2 flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={busy}
              placeholder="Ask a question…"
              className="min-w-0 flex-1 rounded-md border border-edge bg-canvas px-3 py-1.5 text-sm outline-none focus:border-brand disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="rounded-md bg-brand px-3 py-1.5 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong disabled:opacity-50"
            >
              {busy ? "…" : "Send"}
            </button>
          </form>

          <p className="mt-2 text-[11px] text-dim">Hints only · powered by Nemotron 3 Ultra</p>
        </div>
      )}
    </div>
  );
}
