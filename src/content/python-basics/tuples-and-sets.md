## Two more collections

### Tuples — a fixed group

A **tuple** is like a list, but you **can't change it** after you make it. Use
round brackets:

```python
point = (3, 5)
print(point[0])   # 3
point[0] = 9      # TypeError — tuples can't be changed
```

Tuples are handy for values that belong together and shouldn't drift apart — a
coordinate, an RGB colour, a row from a table. You can **unpack** one into
separate variables:

```python
point = (3, 5)
x, y = point
print(x)   # 3
print(y)   # 5
```

### Sets — no duplicates

A **set** stores values with **no repeats** and no particular order. Use curly
brackets:

```python
letters = {"a", "b", "a", "c"}
print(letters)          # {'a', 'b', 'c'}  — the extra "a" is gone
print("b" in letters)   # True
```

The most common trick: turn a list into a set to remove duplicates.

```python
names = ["Ada", "Sam", "Ada", "Bo", "Sam"]
print(len(set(names)))   # 3
```

## Your task

The starter code has a list of `votes` with repeats.

Print how many **different** answers there were.

Expected output:

```
3
```
