export default function Console({
  stdout,
  error,
  busy,
  image,
}: {
  stdout: string;
  error: string | null;
  busy: boolean;
  image?: string | null;
}) {
  const isEmpty = !stdout && !error && !image && !busy;

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
      {image && (
        <div className="border-t border-edge p-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- a data: URI, not an optimizable asset */}
          <img
            src={`data:image/png;base64,${image}`}
            alt="Plot output"
            className="max-w-full rounded-md border border-edge bg-white"
          />
        </div>
      )}
    </div>
  );
}
