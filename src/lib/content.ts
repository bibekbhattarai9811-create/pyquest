import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

/**
 * Reads a lesson's Markdown body. Server-only (uses the file system).
 * Files live in src/content/<trackSlug>/<file>.
 */
export async function getLessonMarkdown(trackSlug: string, file: string): Promise<string> {
  const full = path.join(process.cwd(), "src", "content", trackSlug, file);
  return fs.readFile(full, "utf8");
}
