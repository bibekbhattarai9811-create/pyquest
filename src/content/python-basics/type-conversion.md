## Changing a value's type

Every value has a **type**: `"45"` is a string (`str`), `45` is an integer
(`int`), `45.0` is a `float`. You can convert between them:

```python
int("45")     # 45      text  -> whole number
float("3.14") # 3.14    text  -> decimal
str(45)       # "45"    number -> text
```

### Why you need this

Python won't mix text and numbers for you:

```python
"5" + 5        # TypeError — can't add text and a number
int("5") + 5   # 10  — convert first
```

This comes up constantly, because values that arrive from **outside** your
program — a web form, a file, the `input()` function — arrive as **text**, even
when they look like numbers.

```python
answer = input("How old are you? ")   # answer is a string, e.g. "20"
age = int(answer)                     # now it's a number you can do math with
```

> `input()` needs a keyboard, so it doesn't run here in PyQuest — but the
> conversion idea is exactly the same.

## Your task

The starter code has `price = "45"` and `quantity = "3"` — both **text**, as if
they came from a form.

Convert them to numbers and print the total cost.

Expected output:

```
135
```
