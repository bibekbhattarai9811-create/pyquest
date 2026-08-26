## Project: text analyzer

A small program that reports on a piece of text. It pulls together strings,
lists, sets, a dictionary, and loops.

You're given one sentence. Your program should print three numbers/words, one per
line:

1. how many words there are in total
2. how many **different** words there are
3. which word appears **most often**

### Tools you'll want

**Split text into words:**

```python
text = "one two two three"
words = text.split()      # ['one', 'two', 'two', 'three']
```

**Count how many are unique:** a set drops duplicates (`len(set(words))`).

**Count each word** with a dictionary — the `.get(key, 0)` pattern:

```python
counts = {}
for word in words:
    counts[word] = counts.get(word, 0) + 1
# {'one': 1, 'two': 2, 'three': 1}
```

**Find the biggest count:** loop `counts.items()`, remembering the highest so far.

```python
best_word = ""
best_count = 0
for word, count in counts.items():
    if count > best_count:
        best_count = count
        best_word = word
```

## Your task

The starter code has:

```python
text = "the quick brown fox the lazy dog the end"
```

Print, on three lines: the word count, the number of different words, and the
most common word.

Expected output:

```
9
7
the
```
