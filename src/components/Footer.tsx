import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-edge">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-dim">
        <p className="font-medium text-ink">{site.name}</p>
        <p>Learn Python in your browser. Python runs locally via Pyodide — nothing is sent to a server.</p>
        <p className="text-xs">Built with Next.js. Progress is saved in this browser only.</p>
      </div>
    </footer>
  );
}
