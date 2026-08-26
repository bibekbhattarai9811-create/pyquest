## Many values in one place

A **list** holds several values in order, inside square brackets:

```python
scores = [70, 85, 90]
names = ["Ada", "Sam", "Bo"]
empty = []
```

### Reading items by position

Positions (called **indexes**) start at `0`:

```python
scores = [70, 85, 90]
print(scores[0])    # 70   (the first)
print(scores[2])    # 90   (the third)
print(scores[-1])   # 90   (the last)
```

### Changing a list

```python
scores = [70, 85, 90]
scores.append(100)      # add to the end   -> [70, 85, 90, 100]
scores[0] = 75          # replace an item  -> [75, 85, 90, 100]
print(len(scores))      # 4  — how many items
```

`.append(x)` is a **method**: a function that belongs to the list and acts on it.

## Your task

The starter code has `scores = [70, 85, 90]`.

1. Append `100` to the list.
2. Print the whole list.
3. Print how many items it now has, using `len()`.

Expected output:

```
[70, 85, 90, 100]
4
```
