/**
 * The whole course lives here.
 *
 * - This file is PURE DATA (no `fs`, no server APIs) so it is safe to import
 *   from both server and client components.
 * - The lesson *text* is stored as Markdown in `src/content/<track>/<file>`
 *   and read at build time by `src/lib/content.ts`.
 *
 * To add a lesson: add an entry to a module's `lessons` array and create the
 * matching Markdown file.
 */

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
  /** Markdown filename inside src/content/<track>/ */
  file: string;
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

/* ------------------------------------------------------------------ *
 * Track 1 — Python Basics (fully interactive)
 * ------------------------------------------------------------------ */

const pythonBasics: LiveTrack = {
  slug: "python-basics",
  title: "Python Basics",
  role: "Foundations",
  blurb:
    "The core of the language: printing, variables, text, numbers, lists, dictionaries, decisions, loops and functions. Everything else builds on this.",
  accent: "brand",
  status: "live",
  modules: [
    {
      title: "Getting started",
      lessons: [
        {
          slug: "hello-world",
          title: "Your first program",
          summary: "Use print() to make the computer say something.",
          file: "01-hello-world.md",
          starterCode:
            "# Use print() to show a message.\n# Write your code on the line below:\n\n",
          solution: 'print("Hello, PyQuest!")\n',
          check: {
            kind: "output",
            expected: "Hello, PyQuest!",
            hint: 'Call print with the text in quotes: print("Hello, PyQuest!"). Watch the comma, the "!", and the capital letters.',
          },
        },
        {
          slug: "variables",
          title: "Variables",
          summary: "Store values in named boxes so you can reuse them.",
          file: "02-variables.md",
          starterCode:
            "# Create the two variables described in the lesson,\n# then print them however you like.\n\n",
          solution:
            'favorite_language = "Python"\nyear = 1991\nprint(favorite_language, "was created in", year)\n',
          check: {
            kind: "test",
            code:
              'assert favorite_language == "Python", "favorite_language should be the string \'Python\'"\n' +
              'assert year == 1991, "year should be the number 1991"\n',
            hint: 'Assign with = , like  favorite_language = "Python" . Text needs quotes; numbers do not.',
          },
        },
        {
          slug: "strings",
          title: "Text and f-strings",
          summary: "Join words together and drop values into a sentence.",
          file: "03-strings.md",
          starterCode:
            'name = "PyQuest"\n\n# Print exactly:  Welcome to PyQuest! (7 letters)\n# Use an f-string and len(name).\n\n',
          solution: 'name = "PyQuest"\nprint(f"Welcome to {name}! ({len(name)} letters)")\n',
          check: {
            kind: "output",
            expected: "Welcome to PyQuest! (7 letters)",
            hint: 'An f-string starts with f before the quote: f"..." . Put {name} and {len(name)} inside the braces.',
          },
        },
      ],
    },
    {
      title: "Working with data",
      lessons: [
        {
          slug: "numbers",
          title: "Numbers and math",
          summary: "Add, multiply, divide, and find remainders.",
          file: "04-numbers.md",
          starterCode:
            "# A notebook costs 25 rupees.\n# Print the total cost of 7 notebooks.\n\n",
          solution: "print(25 * 7)\n",
          check: {
            kind: "output",
            expected: "175",
            hint: "Multiply with * . You can print the result directly: print(25 * 7).",
          },
        },
        {
          slug: "lists",
          title: "Lists",
          summary: "Hold many values in order and change them.",
          file: "05-lists.md",
          starterCode:
            "scores = [70, 85, 90]\n\n# 1) Add 100 to the end of the list with .append()\n# 2) Print the whole list\n# 3) Print how many items it has, using len()\n\n",
          solution:
            "scores = [70, 85, 90]\nscores.append(100)\nprint(scores)\nprint(len(scores))\n",
          check: {
            kind: "output",
            expected: "[70, 85, 90, 100]\n4",
            hint: "scores.append(100) adds to the end. print(scores) shows the list. print(len(scores)) shows the count.",
          },
        },
        {
          slug: "dictionaries",
          title: "Dictionaries",
          summary: "Look values up by name instead of by position.",
          file: "06-dictionaries.md",
          starterCode:
            'user = {"name": "Sam", "level": 1}\n\n# 1) Add a new key "xp" with the value 50\n# 2) Print user["name"]\n# 3) Print user["xp"]\n\n',
          solution:
            'user = {"name": "Sam", "level": 1}\nuser["xp"] = 50\nprint(user["name"])\nprint(user["xp"])\n',
          check: {
            kind: "output",
            expected: "Sam\n50",
            hint: 'Add a key with  user["xp"] = 50 . Read a value with  user["xp"] .',
          },
        },
      ],
    },
    {
      title: "Logic and reuse",
      lessons: [
        {
          slug: "conditionals",
          title: "if / elif / else",
          summary: "Make the program choose between paths.",
          file: "07-conditionals.md",
          starterCode:
            'temperature = 32\n\n# Print "Hot"  if temperature is above 30\n# Print "Warm" if it is above 20\n# Otherwise print "Cold"\n\n',
          solution:
            'temperature = 32\nif temperature > 30:\n    print("Hot")\nelif temperature > 20:\n    print("Warm")\nelse:\n    print("Cold")\n',
          check: {
            kind: "output",
            expected: "Hot",
            hint: "Use if / elif / else. Every condition line ends with a colon : and the line below it is indented.",
          },
        },
        {
          slug: "loops",
          title: "Loops",
          summary: "Repeat work without repeating yourself.",
          file: "08-loops.md",
          starterCode:
            "# 1) Print the numbers 1, 2, 3, 4, 5 — each on its own line\n# 2) Then print their total (which is 15)\n\n",
          solution:
            "total = 0\nfor n in range(1, 6):\n    print(n)\n    total = total + n\nprint(total)\n",
          check: {
            kind: "output",
            expected: "1\n2\n3\n4\n5\n15",
            hint: "range(1, 6) counts 1 to 5. Keep a total variable, add n inside the loop, then print total after the loop.",
          },
        },
        {
          slug: "functions",
          title: "Functions",
          summary: "Give a name to a block of code and reuse it.",
          file: "09-functions.md",
          starterCode:
            '# Write a function greet(name) that RETURNS the text:  Hi, <name>!\n# Example:  greet("Ada")  ->  "Hi, Ada!"\n# Then print greet("PyQuest").\n\n',
          solution:
            'def greet(name):\n    return f"Hi, {name}!"\n\nprint(greet("PyQuest"))\n',
          check: {
            kind: "test",
            code:
              'assert callable(greet), "greet should be a function (use def)"\n' +
              'assert greet("Ada") == "Hi, Ada!", "greet(\'Ada\') should return \'Hi, Ada!\'"\n' +
              'assert greet("Sam") == "Hi, Sam!"\n',
            hint: 'Use  def greet(name):  then  return f"Hi, {name}!" . "return" hands a value back — it is not the same as "print".',
          },
        },
      ],
    },
    {
      title: "Project",
      lessons: [
        {
          slug: "grade-calculator",
          title: "Project: grade calculator",
          summary: "Put functions, conditions and loops together.",
          file: "10-grade-calculator.md",
          starterCode:
            'scores = [95, 82, 70, 50]\n\n# 1) Write grade(score):\n#      90 or more -> "A"\n#      80 or more -> "B"\n#      70 or more -> "C"\n#      otherwise  -> "F"\n# 2) Loop over scores and print the grade for each one.\n\n',
          solution:
            'scores = [95, 82, 70, 50]\n\ndef grade(score):\n    if score >= 90:\n        return "A"\n    elif score >= 80:\n        return "B"\n    elif score >= 70:\n        return "C"\n    else:\n        return "F"\n\nfor score in scores:\n    print(grade(score))\n',
          check: {
            kind: "test",
            code:
              'assert grade(95) == "A"\n' +
              'assert grade(90) == "A"\n' +
              'assert grade(82) == "B"\n' +
              'assert grade(80) == "B"\n' +
              'assert grade(70) == "C"\n' +
              'assert grade(69) == "F"\n' +
              'assert grade(0) == "F"\n',
            hint: 'Check the biggest number first: if score >= 90 ... elif score >= 80 ... Then loop: for score in scores: print(grade(score)).',
          },
        },
      ],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Tracks 2-4 — outlines only (Coming soon)
 * ------------------------------------------------------------------ */

const dataScientist: ComingSoonTrack = {
  slug: "data-scientist",
  title: "Data Scientist",
  role: "Data Scientist",
  blurb:
    "Turn raw data into insight: NumPy arrays, pandas DataFrames, cleaning messy data, exploratory analysis, and clear charts with Matplotlib.",
  accent: "sky",
  status: "coming-soon",
  outline: [
    {
      title: "Python for data",
      lessons: ["Virtual environments & Jupyter", "NumPy arrays and vectorised math", "Working with CSV and JSON files"],
    },
    {
      title: "pandas",
      lessons: ["Series and DataFrames", "Selecting, filtering and sorting", "Grouping and aggregation", "Joining datasets", "Handling missing and dirty data"],
    },
    {
      title: "Analysis & visualisation",
      lessons: ["Exploratory data analysis", "Matplotlib and Seaborn", "Descriptive statistics", "Correlation and simple hypothesis tests", "Capstone: analyse a real dataset"],
    },
  ],
};

const mlEngineer: ComingSoonTrack = {
  slug: "ml-engineer",
  title: "Machine Learning Engineer",
  role: "ML Engineer",
  blurb:
    "Build models that learn from data: the scikit-learn workflow, regression and classification, evaluation, feature engineering, and shipping a model behind an API.",
  accent: "good",
  status: "coming-soon",
  outline: [
    {
      title: "ML foundations",
      lessons: ["What machine learning actually is", "Train/validation/test splits", "The scikit-learn estimator API"],
    },
    {
      title: "Core models",
      lessons: ["Linear and logistic regression", "Decision trees and random forests", "Gradient boosting", "Clustering with k-means"],
    },
    {
      title: "Doing it well",
      lessons: ["Metrics: accuracy, precision, recall, ROC", "Cross-validation and hyperparameter tuning", "Feature engineering & pipelines", "Avoiding leakage and overfitting"],
    },
    {
      title: "Shipping",
      lessons: ["Saving and loading models", "Serving a model with FastAPI", "Capstone: end-to-end ML service"],
    },
  ],
};

const aiEngineer: ComingSoonTrack = {
  slug: "ai-engineer",
  title: "AI Engineer",
  role: "AI Engineer",
  blurb:
    "Build applications on top of large language models: calling model APIs, prompt design, embeddings and vector search, retrieval-augmented generation, agents and tools, and evaluation.",
  accent: "gold",
  status: "coming-soon",
  outline: [
    {
      title: "Working with LLMs",
      lessons: ["How LLMs work (enough to be useful)", "Calling a model API from Python", "Prompt design and structured output", "Streaming, tokens and cost"],
    },
    {
      title: "Retrieval",
      lessons: ["Embeddings and similarity", "Vector databases", "Chunking and indexing documents", "Retrieval-augmented generation (RAG)"],
    },
    {
      title: "Agents & production",
      lessons: ["Tool use and function calling", "Building a simple agent loop", "Guardrails and safety", "Evaluating AI systems", "Capstone: a document Q&A assistant"],
    },
  ],
};

/* ------------------------------------------------------------------ *
 * Registry + helpers
 * ------------------------------------------------------------------ */

export const tracks: Track[] = [pythonBasics, dataScientist, mlEngineer, aiEngineer];

export function getTracks(): Track[] {
  return tracks;
}

export function getTrack(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug);
}

export function isLive(track: Track): track is LiveTrack {
  return track.status === "live";
}

export function getLiveTracks(): LiveTrack[] {
  return tracks.filter(isLive);
}

export function trackLessons(track: LiveTrack): Lesson[] {
  return track.modules.flatMap((m) => m.lessons);
}

export function lessonKey(trackSlug: string, lessonSlug: string): string {
  return `${trackSlug}/${lessonSlug}`;
}

export function allLessonKeys(): string[] {
  return getLiveTracks().flatMap((t) => trackLessons(t).map((l) => lessonKey(t.slug, l.slug)));
}

export function outlineLessonCount(track: ComingSoonTrack): number {
  return track.outline.reduce((n, m) => n + m.lessons.length, 0);
}

export function getAllLessonParams(): { track: string; lesson: string }[] {
  return getLiveTracks().flatMap((t) =>
    trackLessons(t).map((l) => ({ track: t.slug, lesson: l.slug })),
  );
}

export interface LocatedLesson {
  track: LiveTrack;
  module: Module;
  lesson: Lesson;
  index: number;
  total: number;
  prev: Lesson | null;
  next: Lesson | null;
}

export function getLesson(trackSlug: string, lessonSlug: string): LocatedLesson | undefined {
  const track = getTrack(trackSlug);
  if (!track || !isLive(track)) return undefined;
  const lessons = trackLessons(track);
  const index = lessons.findIndex((l) => l.slug === lessonSlug);
  if (index === -1) return undefined;
  const module = track.modules.find((m) => m.lessons.some((l) => l.slug === lessonSlug))!;
  return {
    track,
    module,
    lesson: lessons[index],
    index,
    total: lessons.length,
    prev: index > 0 ? lessons[index - 1] : null,
    next: index < lessons.length - 1 ? lessons[index + 1] : null,
  };
}

export function percent(done: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((done / total) * 100);
}
