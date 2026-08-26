## Steering a loop

Two keywords give you control inside a loop:

- **`break`** — stop the loop completely, right now.
- **`continue`** — skip the rest of this turn and go to the next item.

### break

```python
for n in range(1, 100):
    if n * n > 50:
        break          # leave as soon as n squared passes 50
    print(n)
# prints 1 2 3 4 5 6 7  (8*8 is 64, so it stops before printing 8)
```

### continue

```python
for n in range(1, 8):
    if n % 2 == 0:
        continue       # skip even numbers
    print(n)
# prints 1 3 5 7
```

`break` is common when you're **searching** — once you've found what you want,
there's no reason to keep looping.

## Your task

Loop over the numbers **1 to 19**. Print each one, but **stop** as soon as you
reach a multiple of 7.

(7 is the first multiple of 7, so nothing from 7 onward should print.)

Expected output:

```
1
2
3
4
5
6
```
