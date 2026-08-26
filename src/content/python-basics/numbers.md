## Doing arithmetic

Python is a capable calculator. The operators:

| Operator | Meaning            | Example      | Result |
| -------- | ------------------ | ------------ | ------ |
| `+`      | add                | `2 + 3`      | `5`    |
| `-`      | subtract           | `10 - 4`     | `6`    |
| `*`      | multiply           | `6 * 7`      | `42`   |
| `/`      | divide             | `7 / 2`      | `3.5`  |
| `//`     | divide, drop the remainder | `7 // 2` | `3` |
| `%`      | remainder only     | `7 % 2`      | `1`    |
| `**`     | power              | `2 ** 3`     | `8`    |

```python
print(3 + 4 * 2)     # 11  — multiplication happens first
print((3 + 4) * 2)   # 14  — parentheses force the order
```

`/` always gives a decimal (a `float`), even when it divides evenly: `4 / 2` is
`2.0`. Use `//` when you want a whole number.

You can print a calculation directly:

```python
print(25 * 4)   # 100
```

## Your task

A notebook costs **25 rupees**. Print the total cost of **7 notebooks**.

The output should be exactly:

```
175
```
