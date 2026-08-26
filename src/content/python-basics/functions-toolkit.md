## Functions with options

### Several parameters

A function can take more than one input. They're matched by position:

```python
def rectangle_area(width, height):
    return width * height

print(rectangle_area(3, 4))   # 12
```

### Default values

Give a parameter a default and callers can leave it out:

```python
def greet(name, greeting="Hi"):
    return f"{greeting}, {name}!"

print(greet("Ada"))              # Hi, Ada!
print(greet("Ada", "Welcome"))   # Welcome, Ada!
```

Parameters **with** defaults must come after parameters **without** them.

### Naming arguments

You can pass by name, which is clearer for options:

```python
greet("Ada", greeting="Hello")
```

### Returning more than one value

Return a tuple, and unpack it on the other side:

```python
def min_max(numbers):
    return min(numbers), max(numbers)

low, high = min_max([4, 9, 1, 7])
print(low, high)   # 1 9
```

## Your task

Write `price_with_tax(price, tax_rate=0.13)` that returns the price plus that
fraction of tax (so `price + price * tax_rate`).

Then:

```python
print(price_with_tax(100))        # 113.0   — uses the default 0.13
print(price_with_tax(100, 0.2))   # 120.0   — overrides it
```
