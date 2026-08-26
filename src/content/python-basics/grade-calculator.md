## Project: a grade calculator

Time to combine everything: a **function**, `if / elif / else`, a **list**, and a
**loop**.

You're given a list of test scores. You'll write one function that turns a number
into a letter grade, then use a loop to grade the whole list.

### The rule

| Score        | Grade |
| ------------ | ----- |
| 90 or more   | `A`   |
| 80–89        | `B`   |
| 70–79        | `C`   |
| below 70     | `F`   |

### The shape of the solution

```python
def grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    # ...and so on

for score in scores:
    print(grade(score))
```

Check the **highest** boundary first. If you test `score >= 70` before
`score >= 90`, then `95` would match the `70` case and you'd never reach `A`.

## Your task

The starter code has `scores = [95, 82, 70, 50]`.

1. Write `grade(score)` following the table above.
2. Loop over `scores` and print the grade for each one.

Expected output:

```
A
B
C
F
```

**Check answer** tests your `grade` function on several numbers, including the
boundaries (90, 80, 70) and values just below them.
