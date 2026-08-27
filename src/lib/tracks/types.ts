export type Check =
  | {
      /** Compare the program's printed output against `expected` (trimmed). */
      kind: "output";
      expected: string;
      hint?: string;
    }
  | {
      /**
       * Run `code` (Python asserts) in the same namespace right after the
       * learner's code. No exception raised = pass.
       */
      kind: "test";
      code: string;
      hint?: string;
    };

export interface Lesson {
  slug: string;
  title: string;
  summary: string;
  /** The lesson text, as Markdown. */
  body: string;
  starterCode: string;
  solution: string;
  check: Check;
}

export interface Module {
  title: string;
  lessons: Lesson[];
}

export type Accent = "brand" | "gold" | "good" | "sky";

export interface LiveTrack {
  slug: string;
  title: string;
  role: string;
  blurb: string;
  accent: Accent;
  status: "live";
  modules: Module[];
}

export interface ComingSoonTrack {
  slug: string;
  title: string;
  role: string;
  blurb: string;
  accent: Accent;
  status: "coming-soon";
  outline: { title: string; lessons: string[] }[];
}

export type Track = LiveTrack | ComingSoonTrack;
