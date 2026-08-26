## Storing values for later

A **variable** is a name that points at a value. You create one with a single
equals sign `=`:

```python
age = 30
city = "Kathmandu"
```

Read that as *"age is set to 30"*, not *"age equals 30"*. The name goes on the
left, the value on the right.

Once a variable exists, you can use its name anywhere you'd use the value:

```python
age = 30
print(age)          # 30
print(age + 1)      # 31
```

### Two common value types

| Value            | Type    | Example              |
| ---------------- | ------- | -------------------- |
| Text             | `str`   | `"Python"`, `"x"`    |
| Whole number     | `int`   | `1991`, `0`, `-4`    |

Text always needs quotes. Numbers never do. `"30"` (with quotes) is text, not the
number 30.

You can change what a variable points at just by assigning again:

```python
score = 0
score = 10   # score is now 10
```

## Your task

1. Create a variable `favorite_language` set to the string `Python`.
2. Create a variable `year` set to the number `1991`.
3. Print them however you like (for example: `print(favorite_language, year)`).

**Check answer** will confirm both variables hold the right values.
