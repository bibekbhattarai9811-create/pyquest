## Naming a piece of code

A **function** bundles some steps under a name so you can run them again and again
without repeating yourself.

```python
def greet(name):
    return f"Hi, {name}!"
```

- `def` starts the definition.
- `greet` is the name you're giving it.
- `name` is a **parameter** — a placeholder for a value you'll pass in.
- The indented body is what runs when the function is *called*.

### Calling it

```python
def greet(name):
    return f"Hi, {name}!"

message = greet("Ada")
print(message)          # Hi, Ada!
print(greet("Sam"))     # Hi, Sam!
```

### return vs print

`return` hands a value **back to whoever called the function**, so you can store
it or use it later. `print` only shows something on screen.

```python
def double(n):
    return n * 2

x = double(5)     # x is 10
print(x + 1)      # 11
```

If a function only `print`s and never `return`s, calling it gives you back
`None` — nothing useful to work with.

## Your task

Write a function `greet(name)` that **returns** the text `Hi, <name>!`
(so `greet("Ada")` returns `"Hi, Ada!"`).

Then print `greet("PyQuest")`.

**Check answer** calls your function with a few different names.
