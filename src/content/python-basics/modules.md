## Using code other people wrote

You don't have to build everything yourself. Python ships with a large **standard
library** — ready-made modules you pull in with `import`.

```python
import math

print(math.sqrt(16))    # 4.0
print(math.pi)           # 3.141592653589793
print(math.floor(4.7))   # 4
```

After `import math`, everything in it is reached as `math.something`.

### random

```python
import random

print(random.randint(1, 6))        # a dice roll: some number 1–6
print(random.choice(["a", "b"]))   # picks one at random
```

### Importing just what you need

```python
from math import sqrt, pi

print(sqrt(9))   # 3.0  — no "math." needed now
```

There are hundreds of modules: `datetime` for dates, `json` for JSON, `statistics`
for averages, and many more. When you need something common, check if the
standard library already has it.

## Your task

`import` the `math` module, then print:

1. `math.sqrt(144)`
2. `math.pi` rounded to 2 decimal places — use `round(value, 2)`

Expected output:

```
12.0
3.14
```
