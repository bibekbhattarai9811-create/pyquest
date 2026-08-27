import type { Check, Lesson, LiveTrack } from "./types";

/* Small helpers to keep the lesson list readable. */
function L(
  slug: string,
  title: string,
  summary: string,
  body: string,
  starterCode: string,
  solution: string,
  check: Check,
): Lesson {
  return { slug, title, summary, body: body.trim() + "\n", starterCode, solution, check };
}
const out = (expected: string, hint: string): Check => ({ kind: "output", expected, hint });
const test = (code: string, hint: string): Check => ({ kind: "test", code, hint });

/* ================================================================== *
 * Python Basics — 83 small lessons, one idea each.
 * Every starter is runnable code you fix with a small edit.
 * ================================================================== */

export const pythonBasics: LiveTrack = {
  slug: "python-basics",
  title: "Python Basics",
  role: "Foundations",
  blurb:
    "Start from zero. Each lesson teaches one small thing, shows you examples, then asks for a one-line change. By the end you can read and write real Python.",
  accent: "brand",
  status: "live",
  modules: [
    /* -------------------------------------------------------------- */
    {
      title: "Your first words",
      // A short intro video shown when a learner starts this module (DataCamp
      // style). Paste a YouTube URL or video id. Add `video:` to any module.
      // This one is a placeholder — swap it for your own.
      video: "https://www.youtube.com/watch?v=x7X9w_GIm1s",
      lessons: [
        L(
          "say-hello",
          "Printing text",
          "Show a message on the screen with print().",
          `
## Printing text

\`print(...)\` shows whatever you put between its brackets. Text goes in quotes.

\`\`\`python
print("Hello there")
\`\`\`
Output:
\`\`\`
Hello there
\`\`\`

The text is printed **exactly** as you type it — capital letters, spaces, punctuation and all.

## Your turn

Change the text so it prints exactly:

\`\`\`
Hello!
\`\`\`
`,
          `# Change the text so this prints exactly:  Hello!\nprint("Hi")\n`,
          `print("Hello!")\n`,
          out("Hello!", 'Put the exact text in the quotes: print("Hello!") — capital H, and the "!".'),
        ),
        L(
          "print-a-sentence",
          "A whole sentence",
          "Any text works, including spaces and full stops.",
          `
## A whole sentence

You can print as much text as you like inside one pair of quotes.

\`\`\`python
print("Python is a programming language.")
\`\`\`
Output:
\`\`\`
Python is a programming language.
\`\`\`

## Your turn

Finish the sentence so it prints exactly:

\`\`\`
I am learning Python.
\`\`\`
`,
          `# Make this print exactly:  I am learning Python.\nprint("I am learning")\n`,
          `print("I am learning Python.")\n`,
          out("I am learning Python.", "Add  Python.  (with the full stop) before the closing quote."),
        ),
        L(
          "print-two-things",
          "Printing two things",
          "print() can take several items separated by commas.",
          `
## Printing two things

Put a comma between items and \`print\` shows them with a space in between.

\`\`\`python
print("Good", "morning")
\`\`\`
Output:
\`\`\`
Good morning
\`\`\`

\`\`\`python
print("2", "+", "2")
\`\`\`
Output:
\`\`\`
2 + 2
\`\`\`

## Your turn

Add a second word so this prints:

\`\`\`
Good morning
\`\`\`
`,
          `# Add a second word so this prints:  Good morning\nprint("Good")\n`,
          `print("Good", "morning")\n`,
          out("Good morning", 'Add a comma and the second word in quotes:  print("Good", "morning")'),
        ),
        L(
          "print-a-number",
          "Printing numbers",
          "Numbers don't need quotes.",
          `
## Printing numbers

Numbers go straight inside the brackets — **no quotes**.

\`\`\`python
print(7)
print(2 + 2)
\`\`\`
Output:
\`\`\`
7
4
\`\`\`

Quotes would make it *text* instead: \`print("2 + 2")\` prints \`2 + 2\`, not \`4\`.

## Your turn

Change this so it prints the number **100**.
`,
          `# Change this so it prints the number 100 (no quotes around numbers).\nprint(1)\n`,
          `print(100)\n`,
          out("100", "Just put 100 inside the brackets:  print(100)"),
        ),
        L(
          "blank-line",
          "An empty line",
          "print() with nothing prints a blank line.",
          `
## An empty line

\`print()\` with nothing between the brackets prints one empty line. Handy for spacing.

\`\`\`python
print("Top")
print()
print("Bottom")
\`\`\`
Output:
\`\`\`
Top

Bottom
\`\`\`

## Your turn

Add an empty line **between** the two prints.
`,
          `# Add an empty line between the two prints, using  print()\nprint("Top")\nprint("Bottom")\n`,
          `print("Top")\nprint()\nprint("Bottom")\n`,
          out("Top\n\nBottom", "Between the two lines, add a line that is just:  print()"),
        ),
        L(
          "comments",
          "Comments",
          "Anything after # is a note that Python ignores.",
          `
## Comments

A \`#\` starts a **comment**. Python ignores the rest of that line. Comments are notes for humans.

\`\`\`python
# This line is just a note.
print("Hi")   # you can also add a note after code
\`\`\`
Output:
\`\`\`
Hi
\`\`\`

## Your turn

The middle line isn't valid Python. Put a \`#\` at the **start** of it to turn it into a comment.
`,
          `# Put a  #  at the start of the middle line to make it a comment.\nthis line is just a note for me\nprint("Done")\n`,
          `# this line is just a note for me\nprint("Done")\n`,
          out("Done", "Add  #  and a space at the very start of the  this line is just a note for me  line."),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Boxes that hold things",
      lessons: [
        L(
          "make-a-variable",
          "Making a variable",
          "Store a value under a name with =.",
          `
## Making a variable

A **variable** is a name that holds a value. Create one with a single \`=\`:

\`\`\`python
x = 5
print(x)
\`\`\`
Output:
\`\`\`
5
\`\`\`

Read \`x = 5\` as *"x is set to 5"*. The name is on the left, the value on the right.

## Your turn

Change the value so it prints **5**.
`,
          `# Change the value so this prints  5\nx = 0\nprint(x)\n`,
          `x = 5\nprint(x)\n`,
          out("5", "Put 5 after the = sign:  x = 5"),
        ),
        L(
          "text-in-a-variable",
          "Text in a variable",
          "Variables can hold text too — in quotes.",
          `
## Text in a variable

A variable can hold text. The text still needs quotes.

\`\`\`python
language = "Python"
print(language)
\`\`\`
Output:
\`\`\`
Python
\`\`\`

## Your turn

Store the word **Python** in \`language\`.
`,
          `# Store the word  Python  in a box called  language\nlanguage = "Java"\nprint(language)\n`,
          `language = "Python"\nprint(language)\n`,
          out("Python", 'Text needs quotes:  language = "Python"'),
        ),
        L(
          "use-it-twice",
          "Using it again",
          "Once stored, use a variable as many times as you like.",
          `
## Using it again

After you make a variable you can use its name anywhere, as often as you want.

\`\`\`python
pet = "cat"
print(pet)
print(pet)
\`\`\`
Output:
\`\`\`
cat
cat
\`\`\`

## Your turn

Print \`name\` a **second** time (add one line).
`,
          `name = "Sam"\n# Add a line that prints  name  again.\nprint(name)\n`,
          `name = "Sam"\nprint(name)\nprint(name)\n`,
          out("Sam\nSam", "Add another  print(name)  line below the first one."),
        ),
        L(
          "change-a-variable",
          "Changing a variable",
          "Assign again to change the value. The last value wins.",
          `
## Changing a variable

You can give a variable a new value at any time. The most recent one is what counts.

\`\`\`python
score = 0
score = 10
print(score)
\`\`\`
Output:
\`\`\`
10
\`\`\`

## Your turn

Add a line that changes \`score\` to **50**, before it is printed.
`,
          `score = 0\n# Add a line here that sets  score  to 50.\nprint(score)\n`,
          `score = 0\nscore = 50\nprint(score)\n`,
          out("50", "Add a line:  score = 50"),
        ),
        L(
          "variable-in-math",
          "A variable in a sum",
          "Use a variable's value in a calculation.",
          `
## A variable in a sum

A variable can be used in maths just like the number it holds.

\`\`\`python
age = 20
print(age + 1)
\`\`\`
Output:
\`\`\`
21
\`\`\`

The variable itself doesn't change — \`age\` is still 20.

## Your turn

Print \`price\` plus **20** (should be 120).
`,
          `price = 100\n# Change this to print  price + 20\nprint(price)\n`,
          `price = 100\nprint(price + 20)\n`,
          out("120", "Add  + 20  inside the print:  print(price + 20)"),
        ),
        L(
          "two-variables",
          "More than one variable",
          "You can have as many variables as you need.",
          `
## More than one variable

Programs usually have lots of variables. Each holds its own value.

\`\`\`python
first = "Ada"
last = "Lovelace"
print(first)
print(last)
\`\`\`
Output:
\`\`\`
Ada
Lovelace
\`\`\`

## Your turn

Set \`last\` to **Lovelace**.
`,
          `first = "Ada"\nlast = ""\nprint(first)\nprint(last)\n`,
          `first = "Ada"\nlast = "Lovelace"\nprint(first)\nprint(last)\n`,
          out("Ada\nLovelace", 'Set  last = "Lovelace"  (with quotes).'),
        ),
        L(
          "naming-rules",
          "Naming variables",
          "Letters, numbers and underscores. No spaces.",
          `
## Naming variables

Variable names can use letters, numbers and \`_\`. They can't have spaces or start with a number.

\`\`\`python
first_name = "Ada"    # good
# first name = "Ada"   # error: no spaces allowed
\`\`\`

The usual style is \`lowercase_with_underscores\`.

## Your turn

The name below has a space. Change \`full name\` to \`full_name\` in **both** places.
`,
          `full name = "Ada Lovelace"\nprint(full name)\n`,
          `full_name = "Ada Lovelace"\nprint(full_name)\n`,
          out("Ada Lovelace", "Use an underscore instead of the space, in both places:  full_name"),
        ),
        L(
          "variables-practice",
          "Practice: three variables",
          "Put it together — make three variables and print them.",
          `
## Practice

You've learned: making variables, text vs numbers, and printing them.

## Your turn

Fill in the three values so the output is exactly:

\`\`\`
Kathmandu
1400000
Nepal
\`\`\`

Text values need quotes. The number does not.
`,
          `city = ""\npopulation = 0\ncountry = ""\nprint(city)\nprint(population)\nprint(country)\n`,
          `city = "Kathmandu"\npopulation = 1400000\ncountry = "Nepal"\nprint(city)\nprint(population)\nprint(country)\n`,
          out(
            "Kathmandu\n1400000\nNepal",
            'city = "Kathmandu"  ·  population = 1400000  (no quotes)  ·  country = "Nepal"',
          ),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Working with text",
      lessons: [
        L(
          "quotes",
          "Quotes",
          "Text needs matching quotes — single or double.",
          `
## Quotes

Text (called a **string**) sits between quotes. You can use single \`'\` or double \`"\`, but they must match.

\`\`\`python
print('hello')
print("hello")
\`\`\`
Both print:
\`\`\`
hello
\`\`\`

## Your turn

This line is missing its closing quote. Add a \`"\` at the end.
`,
          `print("almost there)\n`,
          `print("almost there")\n`,
          out("almost there", 'Add a closing quote before the  )  :  print("almost there")'),
        ),
        L(
          "join-text",
          "Joining text",
          "The + sign glues two strings together.",
          `
## Joining text

\`+\` joins strings end to end.

\`\`\`python
print("foot" + "ball")
\`\`\`
Output:
\`\`\`
football
\`\`\`

## Your turn

Join \`a\` and \`b\` with \`+\` so it prints \`sunflower\`.
`,
          `a = "sun"\nb = "flower"\n# Join a and b so this prints  sunflower\nprint(a)\n`,
          `a = "sun"\nb = "flower"\nprint(a + b)\n`,
          out("sunflower", "Use +:  print(a + b)"),
        ),
        L(
          "the-space-problem",
          "The missing space",
          "+ doesn't add spaces — you do that yourself.",
          `
## The missing space

Joining with \`+\` puts nothing between the pieces. Add a space string \`" "\` yourself.

\`\`\`python
print("Ada" + "Lovelace")
print("Ada" + " " + "Lovelace")
\`\`\`
Output:
\`\`\`
AdaLovelace
Ada Lovelace
\`\`\`

## Your turn

This prints \`GraceHopper\`. Add a space so it prints \`Grace Hopper\`.
`,
          `first = "Grace"\nlast = "Hopper"\nprint(first + last)\n`,
          `first = "Grace"\nlast = "Hopper"\nprint(first + " " + last)\n`,
          out("Grace Hopper", 'Add  + " "  in the middle:  print(first + " " + last)'),
        ),
        L(
          "f-string-hello",
          "f-strings",
          "Drop a variable straight into text with f\"...{name}...\".",
          `
## f-strings

An **f-string** lets you put a variable right inside the text. Two things:

- an \`f\` before the opening quote
- \`{ }\` around the variable

\`\`\`python
name = "Ada"
print(f"Hi {name}")
\`\`\`
Output:
\`\`\`
Hi Ada
\`\`\`

## Your turn

Turn this into an f-string so it prints \`Hi Ada\`.
`,
          `name = "Ada"\n# Add  f  before the quote and put  name  in braces.\nprint("Hi name")\n`,
          `name = "Ada"\nprint(f"Hi {name}")\n`,
          out("Hi Ada", 'f"Hi {name}"  — the f before the quote, and {name} instead of the word.'),
        ),
        L(
          "f-string-two-blanks",
          "Two blanks",
          "An f-string can hold more than one variable.",
          `
## Two blanks

You can drop in as many variables as you like.

\`\`\`python
day = "Monday"
weather = "sunny"
print(f"{day} is {weather}")
\`\`\`
Output:
\`\`\`
Monday is sunny
\`\`\`

## Your turn

The second blank uses \`first\` by mistake. Change it to \`last\`.
`,
          `first = "Ada"\nlast = "Lovelace"\nprint(f"{first} {first}")\n`,
          `first = "Ada"\nlast = "Lovelace"\nprint(f"{first} {last}")\n`,
          out("Ada Lovelace", "Change the second {first} to {last}."),
        ),
        L(
          "f-string-number",
          "Numbers in f-strings",
          "f-strings work with numbers too.",
          `
## Numbers in f-strings

It doesn't matter if the variable holds text or a number.

\`\`\`python
age = 9
print(f"I am {age}")
\`\`\`
Output:
\`\`\`
I am 9
\`\`\`

## Your turn

Make this print \`Your score is 42\` using an f-string.
`,
          `score = 42\nprint("Your score is score")\n`,
          `score = 42\nprint(f"Your score is {score}")\n`,
          out("Your score is 42", 'f"Your score is {score}"  — f before the quote, score in braces.'),
        ),
        L(
          "math-in-f-string",
          "Maths inside braces",
          "You can calculate right inside the { }.",
          `
## Maths inside braces

Whatever is inside \`{ }\` is worked out first.

\`\`\`python
a = 2
b = 3
print(f"{a} + {b} = {a + b}")
\`\`\`
Output:
\`\`\`
2 + 3 = 5
\`\`\`

## Your turn

Put \`apples + more\` in the last braces so it prints \`Total: 7\`.
`,
          `apples = 4\nmore = 3\nprint(f"Total: {apples}")\n`,
          `apples = 4\nmore = 3\nprint(f"Total: {apples + more}")\n`,
          out("Total: 7", "Inside braces you can add:  {apples + more}"),
        ),
        L(
          "how-long",
          "How long is it?",
          "len() counts the characters in a string.",
          `
## How long is it?

\`len(...)\` tells you how many characters a string has.

\`\`\`python
print(len("cat"))
\`\`\`
Output:
\`\`\`
3
\`\`\`

## Your turn

Print how many letters \`word\` has (it's 6).
`,
          `word = "python"\n# Change this to print the length of  word\nprint(word)\n`,
          `word = "python"\nprint(len(word))\n`,
          out("6", "Wrap it in len():  print(len(word))"),
        ),
        L(
          "upper-lower",
          "UPPER and lower",
          ".upper() and .lower() change the case of text.",
          `
## UPPER and lower

Add \`.upper()\` or \`.lower()\` after a string to change its case.

\`\`\`python
print("hi".upper())
print("LOUD".lower())
\`\`\`
Output:
\`\`\`
HI
loud
\`\`\`

## Your turn

Print \`name\` in capitals.
`,
          `name = "ada"\n# Print the name in CAPITALS using .upper()\nprint(name)\n`,
          `name = "ada"\nprint(name.upper())\n`,
          out("ADA", "Add .upper() after the variable:  print(name.upper())"),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Numbers and math",
      lessons: [
        L(
          "add-and-subtract",
          "Add and subtract",
          "+ and - work how you'd expect.",
          `
## Add and subtract

\`\`\`python
print(10 + 5)
print(10 - 5)
\`\`\`
Output:
\`\`\`
15
5
\`\`\`

## Your turn

This should print **10**. Fix the operator.
`,
          `# This should print 10.\nprint(7 - 3)\n`,
          `print(7 + 3)\n`,
          out("10", "Change the − to a + :  print(7 + 3)"),
        ),
        L(
          "multiply-and-divide",
          "Multiply and divide",
          "* multiplies, / divides.",
          `
## Multiply and divide

\`\`\`python
print(4 * 5)
print(20 / 4)
\`\`\`
Output:
\`\`\`
20
5.0
\`\`\`

Notice \`/\` gives \`5.0\` — a decimal — even when it divides evenly.

## Your turn

This should print **24**. Fix the operator.
`,
          `# This should print 24  ( * means multiply).\nprint(6 + 4)\n`,
          `print(6 * 4)\n`,
          out("24", "Use * for multiply:  print(6 * 4)"),
        ),
        L(
          "whole-division",
          "Whole-number division",
          "// divides and throws away the remainder.",
          `
## Whole-number division

\`/\` gives a decimal. \`//\` gives a whole number (it drops anything after the point).

\`\`\`python
print(7 / 2)
print(7 // 2)
\`\`\`
Output:
\`\`\`
3.5
3
\`\`\`

## Your turn

Change \`/\` to \`//\` so this prints **3**.
`,
          `print(7 / 2)\n`,
          `print(7 // 2)\n`,
          out("3", "Use two slashes:  print(7 // 2)"),
        ),
        L(
          "the-remainder",
          "The remainder (%)",
          "% gives what's left over after dividing.",
          `
## The remainder (%)

\`%\` gives the leftover after dividing.

\`\`\`python
print(10 % 3)
print(10 % 2)
\`\`\`
Output:
\`\`\`
1
0
\`\`\`

\`10 % 3\` is \`1\` because 3 goes into 10 three times (9) with **1** left over. A result of \`0\` means it divides evenly.

## Your turn

Print the remainder when **17** is divided by **5** (it's 2).
`,
          `# Print the remainder of 17 divided by 5. Use %\nprint(17 // 5)\n`,
          `print(17 % 5)\n`,
          out("2", "Use the % sign:  print(17 % 5)"),
        ),
        L(
          "powers",
          "Powers (**)",
          "** means 'to the power of'.",
          `
## Powers (**)

\`\`\`python
print(2 ** 3)
print(10 ** 2)
\`\`\`
Output:
\`\`\`
8
100
\`\`\`

\`2 ** 3\` is 2 × 2 × 2.

## Your turn

Print **5 squared** (5 to the power of 2 = 25).
`,
          `# Print 5 to the power of 2. Use **\nprint(5 * 2)\n`,
          `print(5 ** 2)\n`,
          out("25", "Two stars:  print(5 ** 2)"),
        ),
        L(
          "brackets-first",
          "Brackets first",
          "* and / happen before + and -. Brackets force the order.",
          `
## Brackets first

Multiplication and division happen before addition and subtraction. Brackets change that.

\`\`\`python
print(2 + 3 * 4)
print((2 + 3) * 4)
\`\`\`
Output:
\`\`\`
14
20
\`\`\`

## Your turn

This prints 14. Add brackets around \`2 + 3\` so it prints **20**.
`,
          `print(2 + 3 * 4)\n`,
          `print((2 + 3) * 4)\n`,
          out("20", "Wrap 2 + 3 in brackets:  print((2 + 3) * 4)"),
        ),
        L(
          "rounding",
          "Rounding",
          "round(number, places) rounds a decimal.",
          `
## Rounding

\`round\` takes the number and how many decimal places to keep.

\`\`\`python
print(round(3.14159, 2))
print(round(2.5))
\`\`\`
Output:
\`\`\`
3.14
2
\`\`\`

## Your turn

Round \`price\` to **2** decimal places (prints \`5.0\`).
`,
          `price = 4.999\n# Round price to 2 decimal places. Use round(price, 2)\nprint(price)\n`,
          `price = 4.999\nprint(round(price, 2))\n`,
          out("5.0", "round takes two things:  round(price, 2)"),
        ),
        L(
          "a-real-calculation",
          "A real calculation",
          "Use variables in a formula.",
          `
## A real calculation

Variables make formulas readable.

\`\`\`python
length = 10
breadth = 4
print(length * breadth)
\`\`\`
Output:
\`\`\`
40
\`\`\`

## Your turn

Print the area of the rectangle: \`width\` times \`height\` (it's 24).
`,
          `width = 8\nheight = 3\n# Print width times height\nprint(width)\n`,
          `width = 8\nheight = 3\nprint(width * height)\n`,
          out("24", "Multiply them:  print(width * height)"),
        ),
        L(
          "numbers-practice",
          "Practice: shopping total",
          "Combine variables and multiplication.",
          `
## Practice

## Your turn

A shop sells apples at 30 rupees each. Fill in the calculation to print the cost of **7** apples (210).
`,
          `price_each = 30\nhow_many = 7\n# Replace the 0 with the calculation.\nprint(0)\n`,
          `price_each = 30\nhow_many = 7\nprint(price_each * how_many)\n`,
          out("210", "Multiply the two variables:  print(price_each * how_many)"),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Yes or no",
      lessons: [
        L(
          "true-and-false",
          "True and False",
          "Two special values, capitalised, no quotes.",
          `
## True and False

\`True\` and \`False\` are Python's yes/no values. Capital first letter, no quotes.

\`\`\`python
raining = True
sunny = False
print(raining)
\`\`\`
Output:
\`\`\`
True
\`\`\`

## Your turn

Change the value to \`True\`.
`,
          `is_fun = False\nprint(is_fun)\n`,
          `is_fun = True\nprint(is_fun)\n`,
          out("True", "Just:  is_fun = True  — capital T, no quotes."),
        ),
        L(
          "is-it-equal",
          "Is it equal? (==)",
          "== asks whether two things are the same.",
          `
## Is it equal? (==)

One \`=\` **stores** a value. Two \`==\` **compares** — it gives back \`True\` or \`False\`.

\`\`\`python
print(5 == 5)
print(5 == 6)
\`\`\`
Output:
\`\`\`
True
False
\`\`\`

## Your turn

Change this to check if **10** equals **10** (prints True).
`,
          `print(10 == 99)\n`,
          `print(10 == 10)\n`,
          out("True", "Same number on both sides:  print(10 == 10)"),
        ),
        L(
          "more-comparisons",
          "Other comparisons",
          "!= greater-than, less-than, and 'or equal' versions.",
          `
## Other comparisons

| Symbol | Meaning |
| ------ | ------- |
| \`!=\` | not equal |
| \`>\` \`<\` | greater / less than |
| \`>=\` \`<=\` | greater / less than **or equal** |

\`\`\`python
print(3 != 4)
print(10 > 2)
print(2 >= 5)
\`\`\`
Output:
\`\`\`
True
True
False
\`\`\`

## Your turn

Flip the arrow so this prints \`True\`.
`,
          `print(10 < 3)\n`,
          `print(10 > 3)\n`,
          out("True", "10 is greater than 3:  print(10 > 3)"),
        ),
        L(
          "and",
          "and",
          "and is True only when both sides are True.",
          `
## and

\`and\` is \`True\` only if **both** sides are \`True\`.

\`\`\`python
print(True and True)
print(True and False)
\`\`\`
Output:
\`\`\`
True
False
\`\`\`

## Your turn

Print \`True\` if \`age\` is more than 18 **and** less than 65. Fix the second part.
`,
          `age = 20\nprint(age > 18 and age > 100)\n`,
          `age = 20\nprint(age > 18 and age < 65)\n`,
          out("True", "Change the second check to  age < 65"),
        ),
        L(
          "or",
          "or",
          "or is True when either side is True.",
          `
## or

\`or\` is \`True\` if **at least one** side is \`True\`.

\`\`\`python
print(False or True)
print(False or False)
\`\`\`
Output:
\`\`\`
True
False
\`\`\`

## Your turn

Print \`True\` if \`day\` is \`"Saturday"\` **or** \`"Sunday"\`. Change \`and\` to \`or\`.
`,
          `day = "Sunday"\nprint(day == "Saturday" and day == "Sunday")\n`,
          `day = "Sunday"\nprint(day == "Saturday" or day == "Sunday")\n`,
          out("True", 'A day can\'t be both — use  or  :  day == "Saturday" or day == "Sunday"'),
        ),
        L(
          "not",
          "not",
          "not flips True to False and back.",
          `
## not

\`not\` gives the opposite.

\`\`\`python
print(not True)
print(not False)
\`\`\`
Output:
\`\`\`
False
True
\`\`\`

## Your turn

Print \`not logged_in\` (it should be \`True\`).
`,
          `logged_in = False\nprint(logged_in)\n`,
          `logged_in = False\nprint(not logged_in)\n`,
          out("True", "Put  not  in front:  print(not logged_in)"),
        ),
        L(
          "booleans-practice",
          "Practice: in range",
          "Combine two comparisons with and.",
          `
## Practice

## Your turn

Print \`True\` if \`temperature\` is **between 20 and 30** — higher than 20 **and** lower than 30.
`,
          `temperature = 25\nprint(temperature > 20)\n`,
          `temperature = 25\nprint(temperature > 20 and temperature < 30)\n`,
          out("True", "Join two checks with and:  temperature > 20 and temperature < 30"),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Choosing what to do",
      lessons: [
        L(
          "if-basics",
          "if",
          "Run some code only when a condition is True.",
          `
## if

An \`if\` runs its indented block **only when** the condition is \`True\`.

\`\`\`python
age = 20
if age >= 18:
    print("You can vote")
\`\`\`
Output:
\`\`\`
You can vote
\`\`\`

Two things to notice: the \`:\` at the end of the \`if\` line, and the **4-space indent** on the line below.

## Your turn

Fix the condition: if \`score\` is greater than **90**, print \`Great!\`.
`,
          `score = 95\nif score > 999:\n    print("Great!")\n`,
          `score = 95\nif score > 90:\n    print("Great!")\n`,
          out("Great!", "Change 999 to 90:  if score > 90:"),
        ),
        L(
          "or-else",
          "else",
          "else runs when the if was False.",
          `
## else

\`else\` gives an alternative for when the \`if\` condition is \`False\`.

\`\`\`python
age = 12
if age >= 18:
    print("adult")
else:
    print("child")
\`\`\`
Output:
\`\`\`
child
\`\`\`

## Your turn

Add an \`else:\` block that prints \`Access denied\`. (\`else:\` lines up under \`if\`; its \`print\` is indented.)
`,
          `password = "wrong"\nif password == "secret":\n    print("Welcome")\n`,
          `password = "wrong"\nif password == "secret":\n    print("Welcome")\nelse:\n    print("Access denied")\n`,
          out("Access denied", 'Add two lines:\nelse:\n    print("Access denied")'),
        ),
        L(
          "elif",
          "elif",
          "Check another condition if the ones above were False.",
          `
## elif

\`elif\` ("else if") checks a further condition. Python tries each in order and runs the **first** that's \`True\`.

\`\`\`python
score = 75
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")
\`\`\`
Output:
\`\`\`
B
\`\`\`

## Your turn

Add an \`elif\` for \`"yellow"\` that prints \`Slow down\`.
`,
          `light = "yellow"\nif light == "green":\n    print("Go")\nelif light == "red":\n    print("Stop")\nelse:\n    print("Unknown")\n`,
          `light = "yellow"\nif light == "green":\n    print("Go")\nelif light == "red":\n    print("Stop")\nelif light == "yellow":\n    print("Slow down")\nelse:\n    print("Unknown")\n`,
          out(
            "Slow down",
            'Before the else, add:\nelif light == "yellow":\n    print("Slow down")',
          ),
        ),
        L(
          "comparing-text",
          "Deciding on text",
          "Conditions can compare strings too.",
          `
## Deciding on text

\`if\` conditions work with text using \`==\`.

\`\`\`python
name = "admin"
if name == "admin":
    print("Full access")
\`\`\`
Output:
\`\`\`
Full access
\`\`\`

## Your turn

Fill the condition: if \`answer\` equals \`"yes"\`, print \`Confirmed\`.
`,
          `answer = "yes"\nif answer == "no":\n    print("Confirmed")\n`,
          `answer = "yes"\nif answer == "yes":\n    print("Confirmed")\n`,
          out("Confirmed", 'Compare with ==:  if answer == "yes":'),
        ),
        L(
          "if-with-and",
          "Conditions with and",
          "Combine checks inside an if.",
          `
## Conditions with and

The condition can be any yes/no expression, including \`and\` / \`or\`.

\`\`\`python
age = 30
ticket = True
if age >= 18 and ticket:
    print("Enjoy the film")
\`\`\`
Output:
\`\`\`
Enjoy the film
\`\`\`

## Your turn

Print \`Allowed\` only if \`age\` is 18+ **and** \`member\` is \`True\`.
`,
          `age = 25\nmember = True\nif age >= 18:\n    print("Allowed")\n`,
          `age = 25\nmember = True\nif age >= 18 and member:\n    print("Allowed")\n`,
          out("Allowed", "Add  and member  to the condition."),
        ),
        L(
          "if-practice",
          "Practice: on time?",
          "Put if / else together.",
          `
## Practice

## Your turn

If \`minutes_late\` is more than **5**, print \`Late\`. Otherwise print \`On time\`.

With \`minutes_late = 3\`, the answer is \`On time\`.
`,
          `minutes_late = 3\nif minutes_late > 100:\n    print("Late")\nelse:\n    print("On time")\n`,
          `minutes_late = 3\nif minutes_late > 5:\n    print("Late")\nelse:\n    print("On time")\n`,
          out("On time", "Change 100 to 5. 3 is not more than 5, so the else runs."),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Lists of things",
      lessons: [
        L(
          "make-a-list",
          "Making a list",
          "Several values together, in square brackets.",
          `
## Making a list

A **list** holds several values in order, inside \`[ ]\`, separated by commas.

\`\`\`python
colors = ["red", "green", "blue"]
print(colors)
\`\`\`
Output:
\`\`\`
['red', 'green', 'blue']
\`\`\`

## Your turn

Add \`"banana"\` and \`"cherry"\` so it prints all three.
`,
          `fruits = ["apple"]\nprint(fruits)\n`,
          `fruits = ["apple", "banana", "cherry"]\nprint(fruits)\n`,
          out(
            "['apple', 'banana', 'cherry']",
            'Add them inside the brackets, separated by commas:  ["apple", "banana", "cherry"]',
          ),
        ),
        L(
          "pick-an-item",
          "Picking an item",
          "Get one item by its position. Counting starts at 0.",
          `
## Picking an item

Each item has a **position number**, starting at \`0\`.

\`\`\`python
colors = ["red", "green", "blue"]
print(colors[0])
print(colors[1])
\`\`\`
Output:
\`\`\`
red
green
\`\`\`

## Your turn

Print the **first** day. The first position is \`0\`.
`,
          `days = ["Mon", "Tue", "Wed"]\nprint(days)\n`,
          `days = ["Mon", "Tue", "Wed"]\nprint(days[0])\n`,
          out("Mon", "Add [0] after the name:  print(days[0])"),
        ),
        L(
          "the-last-item",
          "The last item",
          "Position -1 is always the last one.",
          `
## The last item

\`-1\` means "the last item", \`-2\` the one before it, and so on.

\`\`\`python
colors = ["red", "green", "blue"]
print(colors[-1])
\`\`\`
Output:
\`\`\`
blue
\`\`\`

## Your turn

Print the **last** score using \`-1\`.
`,
          `scores = [10, 20, 30, 40]\nprint(scores[0])\n`,
          `scores = [10, 20, 30, 40]\nprint(scores[-1])\n`,
          out("40", "Use -1:  print(scores[-1])"),
        ),
        L(
          "how-many-items",
          "How many items",
          "len(list) counts them.",
          `
## How many items

\`len\` works on lists too.

\`\`\`python
print(len(["a", "b", "c"]))
\`\`\`
Output:
\`\`\`
3
\`\`\`

## Your turn

Print how many guests there are.
`,
          `guests = ["Ana", "Ben", "Cara", "Dan"]\nprint(guests)\n`,
          `guests = ["Ana", "Ben", "Cara", "Dan"]\nprint(len(guests))\n`,
          out("4", "Wrap it in len():  print(len(guests))"),
        ),
        L(
          "add-to-a-list",
          "Adding to a list",
          ".append(x) adds an item to the end.",
          `
## Adding to a list

\`.append(x)\` puts \`x\` on the end of the list.

\`\`\`python
colors = ["red"]
colors.append("green")
print(colors)
\`\`\`
Output:
\`\`\`
['red', 'green']
\`\`\`

## Your turn

Add \`"eggs"\` to the basket (before the print).
`,
          `basket = ["bread", "milk"]\n# Add a line that appends "eggs".\nprint(basket)\n`,
          `basket = ["bread", "milk"]\nbasket.append("eggs")\nprint(basket)\n`,
          out("['bread', 'milk', 'eggs']", 'Add a line before the print:  basket.append("eggs")'),
        ),
        L(
          "change-an-item",
          "Changing an item",
          "Assign to a position to replace what's there.",
          `
## Changing an item

\`\`\`python
colors = ["red", "green"]
colors[0] = "orange"
print(colors)
\`\`\`
Output:
\`\`\`
['orange', 'green']
\`\`\`

## Your turn

Item at position \`1\` is wrong. Change it to \`"eat"\`.
`,
          `plan = ["wake up", "sleep", "work"]\n# Add a line that fixes position 1.\nprint(plan)\n`,
          `plan = ["wake up", "sleep", "work"]\nplan[1] = "eat"\nprint(plan)\n`,
          out("['wake up', 'eat', 'work']", 'Add a line:  plan[1] = "eat"'),
        ),
        L(
          "is-it-in-the-list",
          "Is it in the list?",
          "x in list gives True or False.",
          `
## Is it in the list?

\`in\` checks whether a value is somewhere in the list.

\`\`\`python
colors = ["red", "green"]
print("red" in colors)
print("purple" in colors)
\`\`\`
Output:
\`\`\`
True
False
\`\`\`

## Your turn

Print whether \`role\` is in the \`allowed\` list.
`,
          `allowed = ["admin", "editor"]\nrole = "guest"\nprint(role)\n`,
          `allowed = ["admin", "editor"]\nrole = "guest"\nprint(role in allowed)\n`,
          out("False", 'Use  in :  print(role in allowed)  — "guest" isn\'t in the list.'),
        ),
        L(
          "lists-practice",
          "Practice: a to-do list",
          "Build a list, append, and count.",
          `
## Practice

## Your turn

Start from the empty list. Append \`"task 1"\` then \`"task 2"\`. Then print the list, then print how many items it has.

Expected output:

\`\`\`
['task 1', 'task 2']
2
\`\`\`
`,
          `todo = []\n# Append two tasks, then print the list, then print its length.\nprint(todo)\n`,
          `todo = []\ntodo.append("task 1")\ntodo.append("task 2")\nprint(todo)\nprint(len(todo))\n`,
          out("['task 1', 'task 2']\n2", "Two append lines, then print(todo), then print(len(todo))."),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Doing things many times",
      lessons: [
        L(
          "for-each",
          "for each item",
          "Run the same code once for every item in a list.",
          `
## for each item

A \`for\` loop repeats its indented block once for each item. The loop gives each item a name you choose.

\`\`\`python
for color in ["red", "green", "blue"]:
    print(color)
\`\`\`
Output:
\`\`\`
red
green
blue
\`\`\`

## Your turn

The loop calls each item \`name\`. Print the variable \`name\` (remove the quotes).
`,
          `for name in ["Ana", "Ben", "Cara"]:\n    print("name")\n`,
          `for name in ["Ana", "Ben", "Cara"]:\n    print(name)\n`,
          out("Ana\nBen\nCara", "Remove the quotes so it prints the variable:  print(name)"),
        ),
        L(
          "loop-and-say",
          "A message each time",
          "Use the loop variable in an f-string.",
          `
## A message each time

Inside the loop you can do anything with the item — including build a sentence.

\`\`\`python
for animal in ["cat", "dog"]:
    print(f"The {animal} is asleep")
\`\`\`
Output:
\`\`\`
The cat is asleep
The dog is asleep
\`\`\`

## Your turn

Print \`I like <fruit>\` for each fruit, using an f-string.
`,
          `for fruit in ["apples", "mangoes"]:\n    print("I like fruit")\n`,
          `for fruit in ["apples", "mangoes"]:\n    print(f"I like {fruit}")\n`,
          out("I like apples\nI like mangoes", 'Use an f-string:  print(f"I like {fruit}")'),
        ),
        L(
          "count-with-range",
          "Counting with range",
          "range(n) gives the numbers 0 up to n-1.",
          `
## Counting with range

\`range(n)\` produces the numbers \`0, 1, 2, ... n-1\`.

\`\`\`python
for i in range(3):
    print(i)
\`\`\`
Output:
\`\`\`
0
1
2
\`\`\`

## Your turn

Change \`range(2)\` to \`range(5)\` so it prints 0 to 4.
`,
          `for i in range(2):\n    print(i)\n`,
          `for i in range(5):\n    print(i)\n`,
          out("0\n1\n2\n3\n4", "range(5) gives 0,1,2,3,4."),
        ),
        L(
          "range-from-to",
          "range with a start",
          "range(start, stop) begins at start and stops before stop.",
          `
## range with a start

\`range(start, stop)\` starts at \`start\` and stops **before** \`stop\`.

\`\`\`python
for n in range(1, 4):
    print(n)
\`\`\`
Output:
\`\`\`
1
2
3
\`\`\`

## Your turn

Make this print 1 2 3 4 5. Use \`range(1, 6)\`.
`,
          `for n in range(0, 3):\n    print(n)\n`,
          `for n in range(1, 6):\n    print(n)\n`,
          out("1\n2\n3\n4\n5", "range(1, 6) — starts at 1, stops before 6."),
        ),
        L(
          "adding-up",
          "Adding up as you go",
          "Keep a running total that grows each time round the loop.",
          `
## Adding up as you go

A very common pattern: start a total at \`0\`, then add to it inside the loop.

\`\`\`python
total = 0
for n in [10, 20, 30]:
    total = total + n
print(total)
\`\`\`
Output:
\`\`\`
60
\`\`\`

\`total = total + n\` means *"take total's current value, add n, and store it back in total"*.

## Your turn

On the marked line, add \`n\` to \`total\`.
`,
          `total = 0\nfor n in [5, 10, 15]:\n    # add n to total on the next line\n    total = total\nprint(total)\n`,
          `total = 0\nfor n in [5, 10, 15]:\n    total = total + n\nprint(total)\n`,
          out("30", "Change  total = total  to  total = total + n"),
        ),
        L(
          "loop-practice",
          "Practice: greet everyone",
          "Loop over a list and print a message.",
          `
## Practice

## Your turn

Print \`Hello, <name>!\` for each name in the list.

Expected output:

\`\`\`
Hello, Sam!
Hello, Alex!
Hello, Jo!
\`\`\`
`,
          `names = ["Sam", "Alex", "Jo"]\nfor name in names:\n    print("Hello!")\n`,
          `names = ["Sam", "Alex", "Jo"]\nfor name in names:\n    print(f"Hello, {name}!")\n`,
          out("Hello, Sam!\nHello, Alex!\nHello, Jo!", 'Use an f-string:  print(f"Hello, {name}!")'),
        ),
        L(
          "while-loop",
          "while",
          "Repeat as long as a condition stays True.",
          `
## while

A \`while\` loop keeps going while its condition is \`True\`. Something inside must move it toward \`False\`, or it runs forever.

\`\`\`python
count = 3
while count > 0:
    print(count)
    count = count - 1
\`\`\`
Output:
\`\`\`
3
2
1
\`\`\`

> If your code runs longer than 12 seconds, PyQuest stops it.

## Your turn

This should count down 5, 4, 3, 2, 1. Fix the condition.
`,
          `count = 5\nwhile count > 100:\n    print(count)\n    count = count - 1\n`,
          `count = 5\nwhile count > 0:\n    print(count)\n    count = count - 1\n`,
          out("5\n4\n3\n2\n1", "Change  count > 100  to  count > 0"),
        ),
        L(
          "stop-early",
          "break",
          "break leaves the loop immediately.",
          `
## break

\`break\` stops the loop right away.

\`\`\`python
for n in [1, 2, 3, 4, 5]:
    if n == 3:
        break
    print(n)
\`\`\`
Output:
\`\`\`
1
2
\`\`\`

## Your turn

Replace \`pass\` with \`break\` so the loop stops at 4 and prints only 1 2 3.
`,
          `for n in [1, 2, 3, 4, 5, 6]:\n    if n == 4:\n        pass\n    print(n)\n`,
          `for n in [1, 2, 3, 4, 5, 6]:\n    if n == 4:\n        break\n    print(n)\n`,
          out("1\n2\n3", "Replace  pass  with  break"),
        ),
        L(
          "skip-one",
          "continue",
          "continue skips to the next turn of the loop.",
          `
## continue

\`continue\` skips the rest of this turn and jumps to the next item.

\`\`\`python
for n in [1, 2, 3, 4]:
    if n == 2:
        continue
    print(n)
\`\`\`
Output:
\`\`\`
1
3
4
\`\`\`

## Your turn

Skip the number 3: change \`pass\` to \`continue\`.
`,
          `for n in [1, 2, 3, 4, 5]:\n    if n == 3:\n        pass\n    print(n)\n`,
          `for n in [1, 2, 3, 4, 5]:\n    if n == 3:\n        continue\n    print(n)\n`,
          out("1\n2\n4\n5", "Replace  pass  with  continue"),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Your own commands",
      lessons: [
        L(
          "make-a-function",
          "Making a function",
          "def defines it; you 'call' it to run it.",
          `
## Making a function

\`def\` creates a function — a named block of code. It doesn't run until you **call** it with \`name()\`.

\`\`\`python
def say_hi():
    print("hi")

say_hi()
say_hi()
\`\`\`
Output:
\`\`\`
hi
hi
\`\`\`

## Your turn

Call the \`greet\` function (add a line with just \`greet()\`).
`,
          `def greet():\n    print("Good morning!")\n\n# call greet here\n`,
          `def greet():\n    print("Good morning!")\n\ngreet()\n`,
          out("Good morning!", "Add a line with just:  greet()"),
        ),
        L(
          "give-it-input",
          "Giving it input",
          "A parameter lets you pass a value in.",
          `
## Giving it input

The name in the brackets of \`def\` is a **parameter** — a stand-in for whatever you pass when you call it.

\`\`\`python
def greet(name):
    print(f"Hi {name}")

greet("Ada")
greet("Sam")
\`\`\`
Output:
\`\`\`
Hi Ada
Hi Sam
\`\`\`

## Your turn

Use \`name\` in the f-string (replace the word \`name\`).
`,
          `def greet(name):\n    print("Hello, name!")\n\ngreet("Sam")\n`,
          `def greet(name):\n    print(f"Hello, {name}!")\n\ngreet("Sam")\n`,
          out("Hello, Sam!", 'Inside the function:  print(f"Hello, {name}!")'),
        ),
        L(
          "give-back-a-value",
          "Giving back a value",
          "return sends a value out of the function.",
          `
## Giving back a value

\`return\` hands a value back to wherever the function was called.

\`\`\`python
def double(n):
    return n * 2

print(double(5))
\`\`\`
Output:
\`\`\`
10
\`\`\`

## Your turn

Change the return line to \`return price + 10\`.
`,
          `def add_tax(price):\n    return price\n\nprint(add_tax(100))\n`,
          `def add_tax(price):\n    return price + 10\n\nprint(add_tax(100))\n`,
          out("110", "Change the return line to:  return price + 10"),
        ),
        L(
          "return-vs-print",
          "return vs print",
          "print shows; return hands back a value you can use.",
          `
## return vs print

\`print\` just shows something. \`return\` gives a value back so the rest of your program can use it.

\`\`\`python
def add(a, b):
    return a + b

result = add(2, 3)
print(result + 1)
\`\`\`
Output:
\`\`\`
6
\`\`\`

A function that only \`print\`s and never \`return\`s hands back \`None\` — nothing useful.

## Your turn

Swap \`print(n * n)\` for \`return n * n\` so \`square(4)\` hands back 16.
`,
          `def square(n):\n    print(n * n)\n\nanswer = square(4)\nprint(answer)\n`,
          `def square(n):\n    return n * n\n\nanswer = square(4)\nprint(answer)\n`,
          out("16", "Change  print(n * n)  to  return n * n"),
        ),
        L(
          "use-the-result",
          "Using the result",
          "Store what a function returns in a variable.",
          `
## Using the result

The value a function returns can go straight into a variable.

\`\`\`python
def double(n):
    return n * 2

x = double(21)
print(x)
\`\`\`
Output:
\`\`\`
42
\`\`\`

## Your turn

Store the result of \`price_with_tax(200)\` in \`final\`, then print \`final\` (prints \`220.0\`).
`,
          `def price_with_tax(price):\n    return price + price * 0.1\n\n# store the result in  final , then print it\nprint("?")\n`,
          `def price_with_tax(price):\n    return price + price * 0.1\n\nfinal = price_with_tax(200)\nprint(final)\n`,
          out("220.0", "final = price_with_tax(200)  then  print(final)"),
        ),
        L(
          "two-inputs",
          "Two inputs",
          "A function can take several parameters.",
          `
## Two inputs

List parameters with commas. They're matched by position when you call it.

\`\`\`python
def add(a, b):
    return a + b

print(add(10, 5))
\`\`\`
Output:
\`\`\`
15
\`\`\`

## Your turn

Return \`width\` times \`height\`.
`,
          `def rectangle_area(width, height):\n    return width\n\nprint(rectangle_area(4, 5))\n`,
          `def rectangle_area(width, height):\n    return width * height\n\nprint(rectangle_area(4, 5))\n`,
          out("20", "return width * height"),
        ),
        L(
          "a-default-value",
          "A default value",
          "Give a parameter a fallback so callers can skip it.",
          `
## A default value

Put \`=\` after a parameter to give it a default. Callers can leave that one out.

\`\`\`python
def greet(name, greeting="Hi"):
    return f"{greeting}, {name}!"

print(greet("Ada"))
print(greet("Ada", "Welcome"))
\`\`\`
Output:
\`\`\`
Hi, Ada!
Welcome, Ada!
\`\`\`

## Your turn

Give \`greeting\` a default of \`"Hi"\`.
`,
          `def welcome(name, greeting):\n    return f"{greeting}, {name}!"\n\nprint(welcome("Sam"))\n`,
          `def welcome(name, greeting="Hi"):\n    return f"{greeting}, {name}!"\n\nprint(welcome("Sam"))\n`,
          out("Hi, Sam!", 'Add  ="Hi"  after greeting:  def welcome(name, greeting="Hi"):'),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Labelled data",
      lessons: [
        L(
          "make-a-dictionary",
          "Making a dictionary",
          "Store key: value pairs in curly braces.",
          `
## Making a dictionary

A **dictionary** stores \`key: value\` pairs. You look things up by name, not by position.

\`\`\`python
person = {"name": "Ada", "age": 36}
print(person)
\`\`\`
Output:
\`\`\`
{'name': 'Ada', 'age': 36}
\`\`\`

## Your turn

Add \`"age": 5\` to the dictionary.
`,
          `pet = {"name": "Rex"}\nprint(pet)\n`,
          `pet = {"name": "Rex", "age": 5}\nprint(pet)\n`,
          out("{'name': 'Rex', 'age': 5}", 'Add a comma and the new pair:  {"name": "Rex", "age": 5}'),
        ),
        L(
          "look-up-by-key",
          "Looking up a value",
          'dict["key"] gives you the value for that key.',
          `
## Looking up a value

Put the key in square brackets.

\`\`\`python
person = {"name": "Ada", "age": 36}
print(person["name"])
\`\`\`
Output:
\`\`\`
Ada
\`\`\`

## Your turn

Print the \`pages\` value.
`,
          `book = {"title": "Python 101", "pages": 200}\nprint(book["title"])\n`,
          `book = {"title": "Python 101", "pages": 200}\nprint(book["pages"])\n`,
          out("200", 'Use the key:  book["pages"]'),
        ),
        L(
          "add-or-change-a-key",
          "Adding or changing a key",
          'dict["key"] = value adds it, or changes it if it exists.',
          `
## Adding or changing a key

\`\`\`python
person = {"name": "Ada"}
person["age"] = 36        # adds a new key
person["name"] = "Grace"  # changes an existing one
print(person)
\`\`\`
Output:
\`\`\`
{'name': 'Grace', 'age': 36}
\`\`\`

## Your turn

Add a \`"points"\` key set to \`50\`.
`,
          `score = {"level": 1}\n# add a "points" key set to 50\nprint(score)\n`,
          `score = {"level": 1}\nscore["points"] = 50\nprint(score)\n`,
          out("{'level': 1, 'points': 50}", 'Add a line:  score["points"] = 50'),
        ),
        L(
          "missing-keys",
          "Missing keys",
          ".get() reads a key safely, with a fallback.",
          `
## Missing keys

Asking for a key that isn't there is an error. \`.get("key", fallback)\` gives your fallback instead.

\`\`\`python
person = {"name": "Ada"}
print(person.get("age"))        # None
print(person.get("age", 0))     # 0
\`\`\`

## Your turn

Use \`.get\` to read \`"font_size"\` with a fallback of \`12\`.
`,
          `settings = {"theme": "dark"}\nprint(settings["font_size"])\n`,
          `settings = {"theme": "dark"}\nprint(settings.get("font_size", 12))\n`,
          out("12", 'That key isn\'t there — use  settings.get("font_size", 12)'),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "A little more",
      lessons: [
        L(
          "tuples",
          "Tuples",
          "Like a list, but fixed — it can't be changed.",
          `
## Tuples

A **tuple** is an ordered group of values that **can't be changed** after you make it. Round brackets.

\`\`\`python
point = (3, 5)
print(point[0])
\`\`\`
Output:
\`\`\`
3
\`\`\`

Good for things that belong together and shouldn't change — a coordinate, a colour.

## Your turn

Make \`colour\` a tuple with three numbers: \`255, 100, 0\`.
`,
          `colour = (255,)\nprint(colour)\n`,
          `colour = (255, 100, 0)\nprint(colour)\n`,
          out("(255, 100, 0)", "Put all three inside the brackets:  (255, 100, 0)"),
        ),
        L(
          "sets",
          "Sets",
          "A collection with no duplicates.",
          `
## Sets

A **set** keeps only **unique** values. Turn a list into a set to drop the repeats.

\`\`\`python
nums = [1, 2, 2, 3, 3, 3]
print(set(nums))
print(len(set(nums)))
\`\`\`
Output:
\`\`\`
{1, 2, 3}
3
\`\`\`

## Your turn

Print how many **different** answers there are (it's 2).
`,
          `votes = ["yes", "no", "yes", "yes", "no"]\nprint(len(votes))\n`,
          `votes = ["yes", "no", "yes", "yes", "no"]\nprint(len(set(votes)))\n`,
          out("2", "Wrap votes in set() first:  len(set(votes))"),
        ),
        L(
          "loop-with-position",
          "Looping with a position",
          "enumerate gives you the index and the item together.",
          `
## Looping with a position

\`enumerate\` hands you a position number **and** the item each time round.

\`\`\`python
for i, name in enumerate(["Ana", "Ben"]):
    print(i, name)
\`\`\`
Output:
\`\`\`
0 Ana
1 Ben
\`\`\`

## Your turn

Print each item as \`<number>. <name>\` using an f-string.
`,
          `for i, name in enumerate(["Ana", "Ben", "Cara"], start=1):\n    print("i. name")\n`,
          `for i, name in enumerate(["Ana", "Ben", "Cara"], start=1):\n    print(f"{i}. {name}")\n`,
          out("1. Ana\n2. Ben\n3. Cara", 'Use an f-string:  print(f"{i}. {name}")'),
        ),
        L(
          "build-a-list-fast",
          "Building a list fast",
          "A list comprehension builds a new list in one line.",
          `
## Building a list fast

\`[expression for item in list]\` builds a new list by transforming each item.

\`\`\`python
nums = [1, 2, 3, 4]
doubles = [n * 2 for n in nums]
print(doubles)
\`\`\`
Output:
\`\`\`
[2, 4, 6, 8]
\`\`\`

## Your turn

Make a list of each number **times 10**.
`,
          `nums = [1, 2, 3, 4, 5]\ntens = [n for n in nums]\nprint(tens)\n`,
          `nums = [1, 2, 3, 4, 5]\ntens = [n * 10 for n in nums]\nprint(tens)\n`,
          out("[10, 20, 30, 40, 50]", "Change  n  to  n * 10  at the start:  [n * 10 for n in nums]"),
        ),
        L(
          "when-things-break",
          "When things break",
          "try / except catches an error so the program keeps going.",
          `
## When things break

Some code can fail — like turning \`"abc"\` into a number. \`try\` / \`except\` catches the failure.

\`\`\`python
try:
    number = int("abc")
except ValueError:
    print("not a number")
\`\`\`
Output:
\`\`\`
not a number
\`\`\`

## Your turn

Wrap the two lines in \`try:\`, and add an \`except ValueError:\` that prints \`Could not convert\`.
`,
          `value = int("oops")\nprint(value)\n`,
          `try:\n    value = int("oops")\n    print(value)\nexcept ValueError:\n    print("Could not convert")\n`,
          out(
            "Could not convert",
            'Indent the two lines under  try:  then add\nexcept ValueError:\n    print("Could not convert")',
          ),
        ),
        L(
          "borrow-some-code",
          "Borrowing code (import)",
          "import brings in ready-made tools.",
          `
## Borrowing code (import)

\`import\` pulls in a **module** — a bundle of ready-made code. \`math\` has number tools.

\`\`\`python
import math
print(math.sqrt(16))
print(math.floor(4.7))
\`\`\`
Output:
\`\`\`
4.0
4
\`\`\`

## Your turn

Print the square root of \`81\` (it's \`9.0\`).
`,
          `import math\nprint(81)\n`,
          `import math\nprint(math.sqrt(81))\n`,
          out("9.0", "math.sqrt(81):  print(math.sqrt(81))"),
        ),
        L(
          "random-numbers",
          "Random numbers",
          "random.randint(a, b) gives a whole number between a and b.",
          `
## Random numbers

The \`random\` module makes random values. \`random.randint(a, b)\` gives a whole number from \`a\` to \`b\` (both included).

\`\`\`python
import random
dice = random.randint(1, 6)
print(dice)
\`\`\`
Output: some number between 1 and 6.

## Your turn

Make \`pick\` a random number between **1 and 10**.
`,
          `import random\npick = 0\nprint(pick)\n`,
          `import random\npick = random.randint(1, 10)\nprint(pick)\n`,
          test(
            "assert 1 <= pick <= 10, 'pick should be between 1 and 10'\nassert isinstance(pick, int)",
            "Use  random.randint(1, 10)  — it takes the lowest and highest numbers.",
          ),
        ),
      ],
    },

    /* -------------------------------------------------------------- */
    {
      title: "Small projects",
      lessons: [
        L(
          "project-greeting-card",
          "Project: greeting card",
          "Variables and f-strings together.",
          `
## Project: greeting card

Put together variables and f-strings.

## Your turn

Print exactly these two lines using f-strings:

\`\`\`
Happy birthday, Sam!
You are 30 years old today.
\`\`\`
`,
          `name = "Sam"\nage = 30\nprint("line 1")\nprint("line 2")\n`,
          `name = "Sam"\nage = 30\nprint(f"Happy birthday, {name}!")\nprint(f"You are {age} years old today.")\n`,
          out(
            "Happy birthday, Sam!\nYou are 30 years old today.",
            'f"Happy birthday, {name}!"  and  f"You are {age} years old today."',
          ),
        ),
        L(
          "project-tip-calculator",
          "Project: tip calculator",
          "A function that does a calculation.",
          `
## Project: tip calculator

## Your turn

Finish \`total_with_tip\` so it returns the bill **plus** the tip.

The tip is \`bill * tip_percent / 100\`.

- \`total_with_tip(200, 15)\` → \`230.0\`
- \`total_with_tip(100, 10)\` → \`110.0\`
`,
          `def total_with_tip(bill, tip_percent):\n    return bill\n\nprint(total_with_tip(200, 15))\n`,
          `def total_with_tip(bill, tip_percent):\n    return bill + bill * tip_percent / 100\n\nprint(total_with_tip(200, 15))\n`,
          test(
            "assert total_with_tip(200, 15) == 230.0\nassert total_with_tip(100, 10) == 110.0\nassert total_with_tip(50, 0) == 50",
            "return bill + bill * tip_percent / 100",
          ),
        ),
        L(
          "project-word-counter",
          "Project: word counter",
          "Strings, lists, len and set together.",
          `
## Project: word counter

## Your turn

The sentence is given. Fill in the first line so \`words\` is a list of the words (use \`.split()\`).

Then the two prints show:

\`\`\`
8
6
\`\`\`

(8 words in total, 6 different ones — "the" appears three times.)
`,
          `sentence = "the cat sat on the mat the dog"\nwords = []\nprint(len(words))\nprint(len(set(words)))\n`,
          `sentence = "the cat sat on the mat the dog"\nwords = sentence.split()\nprint(len(words))\nprint(len(set(words)))\n`,
          out("8\n6", "words = sentence.split()  turns the sentence into a list of words."),
        ),
      ],
    },
  ],
};
