## Yes or no

A **boolean** is a value that is either `True` or `False`. You get one whenever
you compare things:

```python
print(5 > 3)      # True
print(5 == 3)     # False
print("a" == "a") # True
```

### Comparison operators

| Operator | Meaning               |
| -------- | --------------------- |
| `==`     | equal to              |
| `!=`     | not equal to          |
| `>` `<`  | greater / less than   |
| `>=` `<=`| greater/less or equal |

Use `==` to compare. A single `=` assigns — mixing them up is a classic bug.

### Combining questions

- `and` — True only if **both** sides are True
- `or` — True if **either** side is True
- `not` — flips True and False

```python
age = 20
has_ticket = True

print(age >= 18 and has_ticket)   # True
print(age < 13 or age > 65)       # False
print(not has_ticket)             # False
```

A comparison already gives you `True` / `False`, so you don't write
`if (age >= 18) == True` — just `if age >= 18`.

## Your task

The starter code sets `age = 20` and `has_ticket = True`.

Print whether the person **can enter**: they must be **at least 18** *and* have a
ticket.

Expected output:

```
True
```
