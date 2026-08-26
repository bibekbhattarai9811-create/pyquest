## Doing more with lists

You've met `.append()`. Lists have more built-in actions (**methods**):

```python
things = ["a", "c", "b"]

things.insert(0, "z")   # put "z" at position 0
things.remove("c")      # delete the first "c"
last = things.pop()     # remove AND return the last item
things.sort()           # reorder in place  -> ['a', 'b', 'z']
things.reverse()        # flip the order
```

Check membership with `in`:

```python
print("b" in things)    # True
```

### Slicing

A **slice** copies part of a list. `list[start:stop]` goes from `start` up to
**but not including** `stop`:

```python
nums = [10, 20, 30, 40, 50]

print(nums[1:3])   # [20, 30]
print(nums[:2])    # [10, 20]      — from the start
print(nums[3:])    # [40, 50]      — to the end
print(nums[-2:])   # [40, 50]      — the last two
```

## Your task

The starter code has `nums = [5, 2, 9, 1]`.

1. Sort the list.
2. Print the smallest number (it's `nums[0]` once sorted).
3. Print the **last two** numbers, using a slice.

Expected output:

```
1
[5, 9]
```
