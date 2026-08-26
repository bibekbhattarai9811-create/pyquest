## When things go wrong

Some operations can fail: dividing by zero, converting `"abc"` to a number,
opening a file that isn't there. By default, a failure **crashes** the program
with a traceback.

Sometimes that's fine. But often you'd rather **handle** it and keep going. That's
what `try` / `except` is for:

```python
try:
    number = int("abc")     # this line fails
    print(number)           # so this line never runs
except ValueError:
    print("That wasn't a number")
```

- Code in the `try` block runs normally.
- If it raises an error, Python jumps to the matching `except` block.
- If nothing goes wrong, the `except` block is skipped.

### Catch the specific error

Name the error type you expect. Common ones:

| Error               | Happens when                          |
| ------------------- | ------------------------------------- |
| `ValueError`        | right type, wrong value (`int("x")`)  |
| `ZeroDivisionError` | dividing by zero                      |
| `KeyError`          | a dict key that doesn't exist         |
| `TypeError`         | wrong type for the operation          |

## Your task

Write `safe_divide(a, b)` that:

- returns `a / b` normally,
- but returns the text `"cannot divide by zero"` when `b` is `0`.

`safe_divide(10, 2)` → `5.0`, `safe_divide(10, 0)` → `"cannot divide by zero"`.
