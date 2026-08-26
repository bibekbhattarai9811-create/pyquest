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
    "The core of the language, one idea at a time: printing, variables, text, numbers, truth, collections, decisions, loops, functions, error handling and modules. Everything else builds on this.",
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
          file: "hello-world.md",
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
          file: "variables.md",
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
          file: "strings.md",
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
      title: "Numbers, text & truth",
      lessons: [
        {
          slug: "numbers",
          title: "Numbers and math",
          summary: "Add, multiply, divide, and find remainders.",
          file: "numbers.md",
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
          slug: "booleans",
          title: "Booleans and comparisons",
          summary: "Ask yes/no questions and combine the answers.",
          file: "booleans.md",
          starterCode:
            "age = 20\nhas_ticket = True\n\n# Print whether the person can enter:\n# they must be at least 18 AND have a ticket.\n\n",
          solution: "age = 20\nhas_ticket = True\nprint(age >= 18 and has_ticket)\n",
          check: {
            kind: "output",
            expected: "True",
            hint: "Combine two conditions with 'and'. One is age >= 18 ; the other is has_ticket (already True or False).",
          },
        },
        {
          slug: "type-conversion",
          title: "Converting between types",
          summary: "Turn text into numbers and back again.",
          file: "type-conversion.md",
          starterCode:
            'price = "45"       # text, as if it came from a web form\nquantity = "3"\n\n# Convert both to numbers and print the total cost.\n\n',
          solution: 'price = "45"\nquantity = "3"\nprint(int(price) * int(quantity))\n',
          check: {
            kind: "output",
            expected: "135",
            hint: 'int("45") turns the text "45" into the number 45. Convert both, then multiply.',
          },
        },
      ],
    },
    {
      title: "Collections",
      lessons: [
        {
          slug: "lists",
          title: "Lists",
          summary: "Hold many values in order and change them.",
          file: "lists.md",
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
          slug: "list-methods",
          title: "List methods and slicing",
          summary: "Sort, search, and take slices out of a list.",
          file: "list-methods.md",
          starterCode:
            "nums = [5, 2, 9, 1]\n\n# 1) Sort the list\n# 2) Print the smallest number  (nums[0] after sorting)\n# 3) Print the last two numbers  (a slice)\n\n",
          solution:
            "nums = [5, 2, 9, 1]\nnums.sort()\nprint(nums[0])\nprint(nums[-2:])\n",
          check: {
            kind: "output",
            expected: "1\n[5, 9]",
            hint: "nums.sort() reorders the list in place, giving [1, 2, 5, 9]. nums[-2:] is a slice of the last two items.",
          },
        },
        {
          slug: "dictionaries",
          title: "Dictionaries",
          summary: "Look values up by name instead of by position.",
          file: "dictionaries.md",
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
        {
          slug: "tuples-and-sets",
          title: "Tuples and sets",
          summary: "Fixed groups of values, and collections with no duplicates.",
          file: "tuples-and-sets.md",
          starterCode:
            'votes = ["yes", "no", "yes", "maybe", "no", "yes"]\n\n# Print how many DIFFERENT answers there were.\n# A set throws away duplicates.\n\n',
          solution:
            'votes = ["yes", "no", "yes", "maybe", "no", "yes"]\nprint(len(set(votes)))\n',
          check: {
            kind: "output",
            expected: "3",
            hint: "set(votes) keeps only the unique values. Then len(...) counts how many are left.",
          },
        },
      ],
    },
    {
      title: "Logic and flow",
      lessons: [
        {
          slug: "conditionals",
          title: "if / elif / else",
          summary: "Make the program choose between paths.",
          file: "conditionals.md",
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
          file: "loops.md",
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
          slug: "break-continue",
          title: "break and continue",
          summary: "Leave a loop early, or skip an item.",
          file: "break-continue.md",
          starterCode:
            "# Loop over the numbers 1 to 19.\n# Print each one, but STOP as soon as you reach a multiple of 7.\n\n",
          solution:
            'for n in range(1, 20):\n    if n % 7 == 0:\n        break\n    print(n)\n',
          check: {
            kind: "output",
            expected: "1\n2\n3\n4\n5\n6",
            hint: "Check `if n % 7 == 0:` first and `break` — that leaves the loop before the print runs. `%` gives the remainder.",
          },
        },
        {
          slug: "loop-tools",
          title: "Looping with a bit more power",
          summary: "enumerate, dict items, and counting as you go.",
          file: "loop-tools.md",
          starterCode:
            'fruits = ["apple", "banana", "cherry"]\n\n# Print each fruit with its position, like:\n#   1: apple\n#   2: banana\n#   3: cherry\n# Use enumerate().\n\n',
          solution:
            'fruits = ["apple", "banana", "cherry"]\nfor i, fruit in enumerate(fruits, start=1):\n    print(f"{i}: {fruit}")\n',
          check: {
            kind: "output",
            expected: "1: apple\n2: banana\n3: cherry",
            hint: "enumerate(fruits, start=1) hands you pairs like (1, 'apple'). Loop with `for i, fruit in ...` and print an f-string.",
          },
        },
      ],
    },
    {
      title: "Writing cleaner code",
      lessons: [
        {
          slug: "comprehensions",
          title: "List comprehensions",
          summary: "Build a new list from an old one in one line.",
          file: "comprehensions.md",
          starterCode:
            "nums = [1, 2, 3, 4, 5, 6]\n\n# Build a list of the squares of the EVEN numbers, and print it.\n# Expected: [4, 16, 36]\n\n",
          solution:
            "nums = [1, 2, 3, 4, 5, 6]\nsquares_of_evens = [n * n for n in nums if n % 2 == 0]\nprint(squares_of_evens)\n",
          check: {
            kind: "output",
            expected: "[4, 16, 36]",
            hint: "[n * n for n in nums if n % 2 == 0] — the `if` keeps only even numbers, and `n * n` squares each one.",
          },
        },
        {
          slug: "functions",
          title: "Functions",
          summary: "Give a name to a block of code and reuse it.",
          file: "functions.md",
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
        {
          slug: "functions-toolkit",
          title: "More about functions",
          summary: "Default values and several parameters.",
          file: "functions-toolkit.md",
          starterCode:
            "# Write price_with_tax(price, tax_rate=0.13):\n#   returns price plus that fraction of tax.\n# Then print price_with_tax(100)         -> 113.0\n#      and print price_with_tax(100, 0.2) -> 120.0\n\n",
          solution:
            "def price_with_tax(price, tax_rate=0.13):\n    return price + price * tax_rate\n\nprint(price_with_tax(100))\nprint(price_with_tax(100, 0.2))\n",
          check: {
            kind: "test",
            code:
              "assert abs(price_with_tax(100) - 113.0) < 1e-9, 'default tax_rate should be 0.13'\n" +
              "assert abs(price_with_tax(100, 0.2) - 120.0) < 1e-9\n" +
              "assert abs(price_with_tax(50, 0) - 50) < 1e-9\n",
            hint: "Give the parameter a default in the def line: def price_with_tax(price, tax_rate=0.13). Then return price + price * tax_rate.",
          },
        },
        {
          slug: "errors",
          title: "Handling errors",
          summary: "Catch a crash with try / except.",
          file: "errors.md",
          starterCode:
            '# Write safe_divide(a, b):\n#   returns a / b\n#   but returns the text "cannot divide by zero" when b is 0.\n\n',
          solution:
            'def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return "cannot divide by zero"\n\nprint(safe_divide(10, 2))\nprint(safe_divide(10, 0))\n',
          check: {
            kind: "test",
            code:
              "assert safe_divide(10, 2) == 5\n" +
              'assert safe_divide(7, 0) == "cannot divide by zero"\n' +
              "assert safe_divide(9, 3) == 3\n",
            hint: "Put `return a / b` inside `try:` and handle the crash with `except ZeroDivisionError:` returning the message.",
          },
        },
      ],
    },
    {
      title: "Bringing it together",
      lessons: [
        {
          slug: "modules",
          title: "Modules",
          summary: "Borrow code from Python's standard library.",
          file: "modules.md",
          starterCode:
            "# import the math module, then print:\n#   math.sqrt(144)        -> 12.0\n#   pi rounded to 2 places -> 3.14\n\n",
          solution: "import math\n\nprint(math.sqrt(144))\nprint(round(math.pi, 2))\n",
          check: {
            kind: "output",
            expected: "12.0\n3.14",
            hint: "After `import math`, use math.sqrt(144) and math.pi. round(x, 2) keeps two decimal places.",
          },
        },
        {
          slug: "grade-calculator",
          title: "Project: grade calculator",
          summary: "Put functions, conditions and loops together.",
          file: "grade-calculator.md",
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
        {
          slug: "text-analyzer",
          title: "Project: text analyzer",
          summary: "Strings, lists, a dict and a loop — all at once.",
          file: "text-analyzer.md",
          starterCode:
            'text = "the quick brown fox the lazy dog the end"\n\n# Print, on three lines:\n# 1) the total number of words\n# 2) the number of different words\n# 3) the word that appears most often\n\n',
          solution:
            'text = "the quick brown fox the lazy dog the end"\n\nwords = text.split()\nprint(len(words))\nprint(len(set(words)))\n\ncounts = {}\nfor word in words:\n    counts[word] = counts.get(word, 0) + 1\n\nmost_common = ""\nhighest = 0\nfor word, count in counts.items():\n    if count > highest:\n        highest = count\n        most_common = word\nprint(most_common)\n',
          check: {
            kind: "output",
            expected: "9\n7\nthe",
            hint: "text.split() gives the word list. Count with a dict: counts[word] = counts.get(word, 0) + 1 . Then loop counts.items() and keep whichever count is biggest.",
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
