export default function Console({
  stdout,
  error,
  busy,
}: {
  stdout: string;
  error: string | null;
  busy: boolean;
}) {
  const isEmpty = !stdout && !error && !busy;

  return (
    <div className="rounded-lg border border-edge bg-[#0d1220]">
      <div className="flex items-center gap-2 border-b border-edge px-3 py-1.5 text-xs font-medium text-dim">
        <span className="inline-block h-2 w-2 rounded-full bg-edge" />
        Output
      </div>
      <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-words px-3 py-2.5 font-mono text-[13px] leading-relaxed">
        {busy && <span className="text-dim">Running…</span>}
        {isEmpty && (
          <span className="text-dim">Click Run to execute your code. Output shows up here.</span>
        )}
        {stdout && <span className="text-ink">{stdout}</span>}
        {error && <span className="text-bad">{error}</span>}
      </pre>
    </div>
  );
}
