## Working with text

A **string** is text. You can join strings with `+`:

```python
first = "Py"
second = "Quest"
print(first + second)   # PyQuest
```

But gluing strings with `+` gets awkward fast, especially with numbers mixed in.
The clean way is an **f-string**: put the letter `f` right before the opening
quote, then drop values inside `{ }`:

```python
name = "Ada"
age = 36
print(f"{name} is {age} years old")   # Ada is 36 years old
```

Anything inside the braces is calculated first. That includes function calls:

```python
name = "Ada"
print(f"{name} has {len(name)} letters")   # Ada has 3 letters
```

`len(...)` gives the length of a string (its number of characters).

### Handy string tools

```python
word = "python"
print(word.upper())    # PYTHON
print(word.capitalize())  # Python
print(len(word))       # 6
```

## Your task

The starter code sets `name = "PyQuest"`. Print exactly:

```
Welcome to PyQuest! (7 letters)
```

Use an f-string, and get the `7` from `len(name)` rather than typing it — that way
it stays correct if the name changes.
