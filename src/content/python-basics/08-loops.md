## Repeating work

A `for` loop runs a block once for each item in a sequence:

```python
for name in ["Ada", "Sam", "Bo"]:
    print(name)
```

The variable `name` takes each value in turn: first `"Ada"`, then `"Sam"`, then
`"Bo"`. Like `if`, the loop body is indented under a line ending in `:`.

### Counting with range

`range(start, stop)` produces numbers from `start` up to **but not including**
`stop`:

```python
for n in range(1, 6):
    print(n)          # 1 2 3 4 5  (each on its own line)
```

### Building up a result

A common pattern: start with a value, then update it every time round the loop.

```python
total = 0
for n in range(1, 6):
    total = total + n     # add n to the running total
print(total)              # 15
```

`total = total + n` means *"make total its old value plus n"*. You'll also see it
written `total += n`.

### while loops

`while` repeats as long as a condition stays true:

```python
count = 3
while count > 0:
    print(count)
    count = count - 1     # make sure it moves toward stopping!
```

If the condition never becomes false, the loop runs forever. PyQuest will stop
code that runs longer than 12 seconds.

## Your task

1. Print the numbers `1, 2, 3, 4, 5`, each on its own line.
2. Then print their total, `15`.

Get the total with a loop (a running `total` variable), not by typing `15`.

Expected output:

```
1
2
3
4
5
15
```
