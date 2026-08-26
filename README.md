# PyQuest

An interactive "learn Python in the browser" site, in the spirit of Codédex /
Codecademy. Read a short lesson, write real Python in an editor, run it, and get
checked feedback. Python runs **entirely in the browser** via
[Pyodide](https://pyodide.org) — there is no backend and nothing is uploaded.

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The first time you press **Run**, the browser
downloads Pyodide (~6 MB, then cached).

## How it's built

| Piece | Where |
| ----- | ----- |
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS v4 (dark theme, tokens in `src/app/globals.css`) |
| Code editor | CodeMirror 6 (`src/components/CodeEditor.tsx`) |
| Python engine | `public/pyodide-worker.js` (Web Worker) + `src/lib/usePyodide.ts` |
| Course content | `src/lib/curriculum.ts` (structure) + `src/content/**/*.md` (lesson text) |
| Progress | `localStorage`, via `src/components/ProgressProvider.tsx` |

## Editing the course

- **Change site name / copy:** `src/lib/site.ts`
- **Add or edit a lesson:**
  1. Add an entry to a module's `lessons` array in `src/lib/curriculum.ts`
     (slug, title, `starterCode`, `solution`, and a `check`).
  2. Create the matching Markdown file in `src/content/<track>/`.
- **`check` types:**
  - `{ kind: "output", expected: "..." }` — compares printed output (trimmed).
  - `{ kind: "test", code: "assert ..." }` — Python asserts run in the learner's
    namespace right after their code; no error = pass.
- **Turn a "coming soon" track on:** change its `status` to `"live"` and give it
  real `modules` instead of an `outline`.

## What's an MVP-shaped gap (next steps)

- Lessons for the Data Scientist / ML / AI tracks (outlines are in place).
- User accounts + progress synced across devices (currently per-browser).
- Deploy (Vercel: `npx vercel`). The app is static apart from on-demand rendering
  of "coming soon" track pages.
- Heavy libraries (full scikit-learn, GPU) would need server-side execution;
  Pyodide covers pure-Python + NumPy/pandas.
