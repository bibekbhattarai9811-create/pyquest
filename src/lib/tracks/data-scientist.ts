import type { Check, Lesson, LiveTrack } from "./types";

/* Small helpers to keep the lesson list readable (same pattern as python-basics.ts). */
function L(
  slug: string,
  title: string,
  summary: string,
  body: string,
  starterCode: string,
  solution: string,
  check: Check,
  packages?: string[],
): Lesson {
  return {
    slug,
    title,
    summary,
    body: body.trim() + "\n",
    starterCode,
    solution,
    check,
    packages,
  };
}
const out = (expected: string, hint: string): Check => ({ kind: "output", expected, hint });
const test = (code: string, hint: string): Check => ({ kind: "test", code, hint });

/* ================================================================== *
 * Data Scientist — 18 lessons, one idea each.
 * NumPy → pandas → selecting/sorting → grouping → cleaning → plotting.
 * ================================================================== */

export const dataScientist: LiveTrack = {
  slug: "data-scientist",
  title: "Data Scientist",
  role: "Data Scientist",
  blurb:
    "Turn raw data into insight: NumPy arrays, pandas DataFrames, filtering, grouping, cleaning messy data, and your first chart with Matplotlib.",
  accent: "sky",
  status: "live",
  modules: [
    /* -------------------------------------------------------------- */
    {
      title: "NumPy arrays",
      lessons: [
        L(
          "numpy-array",
          "Making an array",
          "NumPy arrays hold numbers and print without commas.",
          `
## Making an array

A **NumPy array** holds a list of numbers, but is faster and supports math
that plain lists don't. Make one with \`np.array([...])\`:

\`\`\`python
import numpy as np

nums = np.array([1, 2, 3])
print(nums)
\`\`\`
Output:
\`\`\`
[1 2 3]
\`\`\`

Notice it prints with spaces, not commas — that's how you spot an array.

## Your turn

Change the array so it holds \`5, 10, 15, 20\` instead.
`,
          `import numpy as np\n\nnums = np.array([1, 2, 3])\nprint(nums)\n`,
          `import numpy as np\n\nnums = np.array([5, 10, 15, 20])\nprint(nums)\n`,
          test(
            "assert nums.tolist() == [5, 10, 15, 20], 'nums should hold 5, 10, 15, 20'",
            "np.array([5, 10, 15, 20])",
          ),
          ["numpy"],
        ),
        L(
          "array-math",
          "Array math",
          "Arithmetic on an array applies to every number at once — no loop needed.",
          `
## Array math

With a plain list, \`prices * 1.1\` doesn't do what you'd hope. With a NumPy
array, it does — every number is multiplied at once:

\`\`\`python
import numpy as np

prices = np.array([10, 20, 30])
result = prices * 1.1
print(result)
\`\`\`
Output:
\`\`\`
[11. 22. 33.]
\`\`\`

That's a 10% price increase applied to every item in one line.

## Your turn

A store is having a **10% off** sale instead. Change the multiplier so
\`result\` is each price times \`0.9\`.
`,
          `import numpy as np\n\nprices = np.array([10, 20, 30])\nresult = prices * 1.1\nprint(result)\n`,
          `import numpy as np\n\nprices = np.array([10, 20, 30])\nresult = prices * 0.9\nprint(result)\n`,
          test(
            "assert np.allclose(result, [9.0, 18.0, 27.0]), 'result should be prices times 0.9'",
            "result = prices * 0.9",
          ),
          ["numpy"],
        ),
        L(
          "numpy-indexing",
          "Picking from an array",
          "A condition inside [ ] keeps only the values where it's true.",
          `
## Picking from an array

Putting a condition inside \`[ ]\` keeps only the values where it's true —
this is called a **boolean mask**:

\`\`\`python
import numpy as np

scores = np.array([55, 82, 91, 40, 76])
top = scores[scores > 60]
print(top)
\`\`\`
Output:
\`\`\`
[82 91 76]
\`\`\`

Every score greater than 60 was kept; the rest were dropped.

## Your turn

Change the mask so \`top\` only keeps scores that are **75 or higher**
(\`>=\`, not \`>\`).
`,
          `import numpy as np\n\nscores = np.array([55, 82, 91, 40, 76])\ntop = scores[scores > 60]\nprint(top)\n`,
          `import numpy as np\n\nscores = np.array([55, 82, 91, 40, 76])\ntop = scores[scores >= 75]\nprint(top)\n`,
          test(
            "assert top.tolist() == [82, 91, 76], 'top should keep scores >= 75'",
            "scores[scores >= 75]",
          ),
          ["numpy"],
        ),
        L(
          "numpy-stats",
          "Summary stats",
          "Arrays come with built-in methods like .mean(), .max(), and .min().",
          `
## Summary stats

Arrays have built-in methods for common questions about the data:

\`\`\`python
import numpy as np

temps = np.array([61, 64, 59, 70, 68])
print(temps.mean())
\`\`\`
Output:
\`\`\`
64.4
\`\`\`

\`.sum()\`, \`.max()\`, and \`.min()\` work the same way.

## Your turn

Print the **highest** temperature instead of the average — use \`.max()\`.
`,
          `import numpy as np\n\ntemps = np.array([61, 64, 59, 70, 68])\nprint(temps.mean())\n`,
          `import numpy as np\n\ntemps = np.array([61, 64, 59, 70, 68])\nprint(temps.max())\n`,
          out("70", "temps.max()"),
          ["numpy"],
        ),
      ],
    },
    /* -------------------------------------------------------------- */
    {
      title: "pandas basics",
      lessons: [
        L(
          "pandas-series",
          "Making a Series",
          "A Series is a labeled list of values — pandas' basic building block.",
          `
## Making a Series

A pandas **Series** is like a NumPy array, with the tools of a spreadsheet
column layered on top:

\`\`\`python
import pandas as pd

pop = pd.Series([8, 3, 2])
print(pop.sum())
\`\`\`
Output:
\`\`\`
13
\`\`\`

## Your turn

A fourth city with population \`1\` was left out. Add it to the list, then
print the new total with \`.sum()\`.
`,
          `import pandas as pd\n\npop = pd.Series([8, 3, 2])\nprint(pop.sum())\n`,
          `import pandas as pd\n\npop = pd.Series([8, 3, 2, 1])\nprint(pop.sum())\n`,
          out("14", "pop = pd.Series([8, 3, 2, 1])"),
          ["pandas"],
        ),
        L(
          "pandas-dataframe",
          "Making a DataFrame",
          "A DataFrame is a table — build one from a dict of equal-length lists.",
          `
## Making a DataFrame

A **DataFrame** is a full table: build one from a dict where each key is a
column name and each value is a list of that column's entries.

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Bo", "Chi"],
    "score": [88, 92, 79],
})
print(df["score"].tolist())
\`\`\`
Output:
\`\`\`
[88, 92, 79]
\`\`\`

## Your turn

Chi's score was recorded wrong — it should be \`95\`, not \`79\`. Fix the list.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 92, 79],\n})\nprint(df["score"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 92, 95],\n})\nprint(df["score"].tolist())\n`,
          out("[88, 92, 95]", 'Change 79 to 95 in the "score" list.'),
          ["pandas"],
        ),
        L(
          "pandas-column",
          "Picking a column",
          'df["col"] selects one column of a DataFrame.',
          `
## Picking a column

\`df["name"]\` pulls out a single column as a Series:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Bo", "Chi"],
    "score": [88, 92, 79],
})
print(df["name"].tolist())
\`\`\`
Output:
\`\`\`
['Ana', 'Bo', 'Chi']
\`\`\`

## Your turn

Print the \`"score"\` column instead of \`"name"\`.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 92, 79],\n})\nprint(df["name"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 92, 79],\n})\nprint(df["score"].tolist())\n`,
          out("[88, 92, 79]", 'print(df["score"].tolist())'),
          ["pandas"],
        ),
        L(
          "pandas-new-column",
          "Adding a column",
          "Assigning to df[\"new\"] creates a column, often computed from others.",
          `
## Adding a column

Assign to a new column name to create it — often as a calculation using
other columns:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "price": [10, 20, 30],
    "qty": [2, 1, 3],
})
df["total"] = df["price"]
print(df["total"].tolist())
\`\`\`

\`total\` should really be price **times** quantity, not just a copy of price.

## Your turn

Fix the line so \`total\` is \`price * qty\`.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "price": [10, 20, 30],\n    "qty": [2, 1, 3],\n})\ndf["total"] = df["price"]\nprint(df["total"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "price": [10, 20, 30],\n    "qty": [2, 1, 3],\n})\ndf["total"] = df["price"] * df["qty"]\nprint(df["total"].tolist())\n`,
          out("[20, 20, 90]", 'df["total"] = df["price"] * df["qty"]'),
          ["pandas"],
        ),
      ],
    },
    /* -------------------------------------------------------------- */
    {
      title: "Selecting & sorting",
      lessons: [
        L(
          "pandas-filter",
          "Filtering rows",
          "A condition inside df[ ] keeps only the matching rows.",
          `
## Filtering rows

Just like a NumPy array, a condition inside \`df[ ]\` keeps only the rows
where it's true:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Bo", "Chi", "Dee"],
    "score": [88, 55, 79, 91],
})
passing = df[df["score"] > 90]
print(passing["name"].tolist())
\`\`\`
Output:
\`\`\`
['Dee']
\`\`\`

## Your turn

Change \`90\` to \`60\` so \`passing\` keeps everyone who scored **above 60**.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee"],\n    "score": [88, 55, 79, 91],\n})\npassing = df[df["score"] > 90]\nprint(passing["name"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee"],\n    "score": [88, 55, 79, 91],\n})\npassing = df[df["score"] > 60]\nprint(passing["name"].tolist())\n`,
          out("['Ana', 'Chi', 'Dee']", 'df[df["score"] > 60]'),
          ["pandas"],
        ),
        L(
          "pandas-sort",
          "Sorting",
          "df.sort_values(\"col\") sorts a table by one column.",
          `
## Sorting

\`df.sort_values("score")\` sorts the whole table by that column, lowest
first:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ana", "Bo", "Chi"],
    "score": [88, 55, 79],
})
ranked = df.sort_values("score")
print(ranked["name"].tolist())
\`\`\`
Output:
\`\`\`
['Bo', 'Chi', 'Ana']
\`\`\`

## Your turn

Rank from **highest to lowest** instead — add \`ascending=False\`.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 55, 79],\n})\nranked = df.sort_values("score")\nprint(ranked["name"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi"],\n    "score": [88, 55, 79],\n})\nranked = df.sort_values("score", ascending=False)\nprint(ranked["name"].tolist())\n`,
          out("['Ana', 'Chi', 'Bo']", 'df.sort_values("score", ascending=False)'),
          ["pandas"],
        ),
        L(
          "pandas-filter-sort-practice",
          "Practice: filter then sort",
          "Combine a filter and a sort in two lines.",
          `
## Practice: filter then sort

Filtering and sorting are just two lines used together.

## Your turn

1. Keep everyone who scored **60 or above** (\`>=\`, not \`>\`).
2. Sort what's left from **highest to lowest** score.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee", "Eli"],\n    "score": [88, 55, 79, 91, 60],\n})\nresult = df[df["score"] > 90]\nresult = result.sort_values("score")\nprint(result["name"].tolist())\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee", "Eli"],\n    "score": [88, 55, 79, 91, 60],\n})\nresult = df[df["score"] >= 60]\nresult = result.sort_values("score", ascending=False)\nprint(result["name"].tolist())\n`,
          out(
            "['Dee', 'Ana', 'Chi', 'Eli']",
            'df[df["score"] >= 60], then .sort_values("score", ascending=False)',
          ),
          ["pandas"],
        ),
      ],
    },
    /* -------------------------------------------------------------- */
    {
      title: "Grouping",
      lessons: [
        L(
          "pandas-groupby",
          "groupby + mean",
          "groupby(\"col\") splits a table into groups you can summarize.",
          `
## groupby + mean

\`groupby("team")\` splits the rows into groups by that column, so you can
compute a stat **per group**:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "team": ["Red", "Blue", "Red", "Blue"],
    "points": [10, 20, 30, 10],
})
avg = df.groupby("team")["points"].mean()
print(avg["Red"])
\`\`\`
Output:
\`\`\`
20.0
\`\`\`

Red's two scores, 10 and 30, average to 20.

## Your turn

Blue's scores are 20 and 10. Change the line so it checks Blue's average
is \`15.0\`.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Blue"],\n    "points": [10, 20, 30, 10],\n})\navg = df.groupby("team")["points"].mean()\nprint(avg["Red"])\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Blue"],\n    "points": [10, 20, 30, 10],\n})\navg = df.groupby("team")["points"].mean()\nprint(avg["Blue"])\n`,
          test(
            "assert abs(avg['Blue'] - 15.0) < 0.01, \"avg['Blue'] should be 15.0\"",
            "Blue's points are 20 and 10 — print avg[\"Blue\"]",
          ),
          ["pandas"],
        ),
        L(
          "pandas-value-counts",
          "Counting",
          "value_counts() counts how often each value appears.",
          `
## Counting

\`.value_counts()\` counts how many times each unique value shows up in a
column:

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "team": ["Red", "Blue", "Red", "Green", "Blue", "Red"],
})
counts = df["team"].value_counts()
print(counts["Red"])
\`\`\`
Output:
\`\`\`
3
\`\`\`

## Your turn

Print how many times \`"Blue"\` appears instead.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Green", "Blue", "Red"],\n})\ncounts = df["team"].value_counts()\nprint(counts["Red"])\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Green", "Blue", "Red"],\n})\ncounts = df["team"].value_counts()\nprint(counts["Blue"])\n`,
          out("2", 'print(counts["Blue"])'),
          ["pandas"],
        ),
        L(
          "pandas-group-count-practice",
          "Practice: group + count",
          "groupby also works with .sum() to total values per group.",
          `
## Practice: group + count

\`groupby\` isn't just for averages — \`.sum()\` totals each group's values.

## Your turn

Print Blue's total points instead of Red's. Blue's rows are \`20\`, \`5\`,
and \`25\`.
`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Blue", "Blue"],\n    "points": [10, 20, 30, 5, 25],\n})\ntotals = df.groupby("team")["points"].sum()\nprint(totals["Red"])\n`,
          `import pandas as pd\n\ndf = pd.DataFrame({\n    "team": ["Red", "Blue", "Red", "Blue", "Blue"],\n    "points": [10, 20, 30, 5, 25],\n})\ntotals = df.groupby("team")["points"].sum()\nprint(totals["Blue"])\n`,
          out("50", 'print(totals["Blue"])  — 20 + 5 + 25'),
          ["pandas"],
        ),
      ],
    },
    /* -------------------------------------------------------------- */
    {
      title: "Cleaning data",
      lessons: [
        L(
          "pandas-missing",
          "Finding missing values",
          "np.nan marks a missing value; .isna().sum() counts them.",
          `
## Finding missing values

Real data has gaps. Missing entries show up as \`np.nan\`, and
\`.isna()\` gives \`True\`/\`False\` for each one — \`.sum()\` adds up the
\`True\`s:

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["Ana", "Bo", "Chi", "Dee"],
    "score": [88, np.nan, 79, np.nan],
})
missing = df["name"].isna().sum()
print(missing)
\`\`\`
Output:
\`\`\`
0
\`\`\`

Nobody's name is missing — but two scores are.

## Your turn

Count missing values in the \`"score"\` column instead of \`"name"\`.
`,
          `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee"],\n    "score": [88, np.nan, 79, np.nan],\n})\nmissing = df["name"].isna().sum()\nprint(missing)\n`,
          `import pandas as pd\nimport numpy as np\n\ndf = pd.DataFrame({\n    "name": ["Ana", "Bo", "Chi", "Dee"],\n    "score": [88, np.nan, 79, np.nan],\n})\nmissing = df["score"].isna().sum()\nprint(missing)\n`,
          out("2", 'df["score"].isna().sum()'),
          ["numpy", "pandas"],
        ),
        L(
          "pandas-fillna",
          "Filling in gaps",
          "fillna(value) replaces every missing value with something you choose.",
          `
## Filling in gaps

\`.fillna(value)\` replaces every missing value with whatever you give it:

\`\`\`python
import pandas as pd
import numpy as np

scores = pd.Series([88, np.nan, 79, np.nan, 95])
filled = scores.fillna(0)
print(filled.tolist())
\`\`\`
Output:
\`\`\`
[88.0, 0.0, 79.0, 0.0, 95.0]
\`\`\`

Filling with \`0\` would drag down an average, though — usually you'd fill
with something more reasonable, like the class average.

## Your turn

Fill missing scores with \`70\` (the class average) instead of \`0\`.
`,
          `import pandas as pd\nimport numpy as np\n\nscores = pd.Series([88, np.nan, 79, np.nan, 95])\nfilled = scores.fillna(0)\nprint(filled.tolist())\n`,
          `import pandas as pd\nimport numpy as np\n\nscores = pd.Series([88, np.nan, 79, np.nan, 95])\nfilled = scores.fillna(70)\nprint(filled.tolist())\n`,
          out("[88.0, 70.0, 79.0, 70.0, 95.0]", "scores.fillna(70)"),
          ["numpy", "pandas"],
        ),
      ],
    },
    /* -------------------------------------------------------------- */
    {
      title: "Visualising & capstone",
      lessons: [
        L(
          "matplotlib-first-plot",
          "Your first plot",
          "plt.plot draws a line chart; plt.bar draws bars — from the same data.",
          `
## Your first plot

Matplotlib turns numbers into a picture. \`plt.plot(x, y)\` draws a line
chart:

\`\`\`python
import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5]
sales = [10, 15, 13, 18, 20]
plt.plot(days, sales)
plt.title("Sales")
print(sum(sales))
\`\`\`

Your plot appears in the console below. \`plt.bar(x, y)\` draws the same
data as bars instead of a line.

## Your turn

1. Switch to a bar chart — use \`plt.bar\` instead of \`plt.plot\`.
2. Print the **average** sale instead of the total: \`sum(sales) / len(sales)\`.
`,
          `import matplotlib.pyplot as plt\n\ndays = [1, 2, 3, 4, 5]\nsales = [10, 15, 13, 18, 20]\nplt.plot(days, sales)\nplt.title("Sales")\nprint(sum(sales))\n`,
          `import matplotlib.pyplot as plt\n\ndays = [1, 2, 3, 4, 5]\nsales = [10, 15, 13, 18, 20]\nplt.bar(days, sales)\nplt.title("Sales")\nprint(sum(sales) / len(sales))\n`,
          out("15.2", "plt.bar(days, sales)  and  print(sum(sales) / len(sales))"),
          ["matplotlib"],
        ),
        L(
          "capstone-mini-analysis",
          "Capstone: mini analysis",
          "Group, compute, and plot together — a taste of a real analysis.",
          `
## Capstone: mini analysis

A real analysis usually combines everything you've learned: group the data,
compute a stat per group, then chart it.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "city": ["NYC", "NYC", "LA", "LA", "LA", "Chi"],
    "temp": [61, 58, 75, 80, 78, 65],
})

avg_by_city = df.groupby("city")["temp"].mean()
hottest = avg_by_city.idxmax()
print(hottest)

avg_by_city.plot(kind="bar")
\`\`\`

\`.idxmax()\` returns the **label** of the largest value — here, the hottest
city. \`.idxmin()\` does the same for the smallest.

## Your turn

Print the **coldest** city instead of the hottest — use \`.idxmin()\`.
`,
          `import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    "city": ["NYC", "NYC", "LA", "LA", "LA", "Chi"],\n    "temp": [61, 58, 75, 80, 78, 65],\n})\n\navg_by_city = df.groupby("city")["temp"].mean()\nhottest = avg_by_city.idxmax()\nprint(hottest)\n\navg_by_city.plot(kind="bar")\n`,
          `import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.DataFrame({\n    "city": ["NYC", "NYC", "LA", "LA", "LA", "Chi"],\n    "temp": [61, 58, 75, 80, 78, 65],\n})\n\navg_by_city = df.groupby("city")["temp"].mean()\ncoldest = avg_by_city.idxmin()\nprint(coldest)\n\navg_by_city.plot(kind="bar")\n`,
          out("NYC", "coldest = avg_by_city.idxmin()"),
          ["pandas", "matplotlib"],
        ),
      ],
    },
  ],
};
