import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-mono text-sm text-brand">404</p>
      <h1 className="mt-2 text-2xl font-semibold">This page took an unexpected exit</h1>
      <p className="mt-2 text-dim">The lesson or track you asked for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-md bg-brand px-4 py-2 text-sm font-semibold text-[#0b0f1a] transition-colors hover:bg-brand-strong"
      >
        Go home
      </Link>
    </div>
  );
}
