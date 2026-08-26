## Making decisions

An `if` statement runs a block of code **only when** a condition is true:

```python
age = 20
if age >= 18:
    print("You can vote")
```

Two things to notice:

- The `if` line ends with a colon `:`.
- The line(s) below are **indented** (4 spaces). The indentation is how Python
  knows what's "inside" the `if`.

### if / elif / else

Check several cases in order. The first true one wins; the rest are skipped:

```python
score = 72

if score >= 90:
    print("A")
elif score >= 80:
    print("B")
elif score >= 70:
    print("C")
else:
    print("F")
```

### Comparison operators

| Operator | Meaning              |
| -------- | -------------------- |
| `==`     | equal to             |
| `!=`     | not equal to         |
| `>` `<`  | greater / less than  |
| `>=` `<=`| greater/less or equal|

Use `==` to compare, `=` to assign. Mixing them up is a classic bug.

## Your task

The starter code sets `temperature = 32`. Print:

- `Hot` if the temperature is above 30
- `Warm` if it is above 20
- `Cold` otherwise

With `32`, the output should be:

```
Hot
```

Try changing the number and running it to see the other branches.
