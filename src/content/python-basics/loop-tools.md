## Looping with a bit more power

### enumerate — item *and* position

Often you want the position too. `enumerate` gives you both:

```python
colors = ["red", "green", "blue"]

for i, color in enumerate(colors):
    print(i, color)
# 0 red
# 1 green
# 2 blue
```

Start counting from 1 instead of 0 with `start=1`:

```python
for i, color in enumerate(colors, start=1):
    print(f"{i}. {color}")
```

### Looping over a dictionary

```python
prices = {"apple": 50, "banana": 30}

for name, price in prices.items():
    print(f"{name} costs {price}")
```

`.items()` hands you a `(key, value)` pair each time round.

### zip — walk two lists together

```python
names = ["Ada", "Sam"]
scores = [90, 75]

for name, score in zip(names, scores):
    print(name, score)
```

## Your task

The starter code has `fruits = ["apple", "banana", "cherry"]`.

Print each fruit with its position, numbered from 1:

```
1: apple
2: banana
3: cherry
```

Use `enumerate`.
