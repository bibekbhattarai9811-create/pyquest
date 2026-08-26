## Building a list in one line

A very common job: take a list, do something to each item, collect the results.
The long way:

```python
nums = [1, 2, 3, 4]
doubled = []
for n in nums:
    doubled.append(n * 2)
print(doubled)   # [2, 4, 6, 8]
```

A **list comprehension** does the same thing in one line:

```python
nums = [1, 2, 3, 4]
doubled = [n * 2 for n in nums]
print(doubled)   # [2, 4, 6, 8]
```

Read it left to right: *"n times 2, for each n in nums"*.

### Filtering with `if`

Add an `if` at the end to keep only some items:

```python
nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]
print(evens)   # [2, 4, 6]
```

You can do both at once — transform **and** filter:

```python
[n * n for n in nums if n % 2 == 0]   # squares of the evens
```

Comprehensions are everywhere in real Python code. If one gets hard to read,
that's a sign to go back to a normal `for` loop.

## Your task

The starter code has `nums = [1, 2, 3, 4, 5, 6]`.

Build a list of the **squares of the even numbers**, and print it.

Expected output:

```
[4, 16, 36]
```
