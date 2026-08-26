## Labelled values

A **list** finds things by position. A **dictionary** finds them by a name you
choose, called a **key**:

```python
user = {"name": "Sam", "level": 1}
```

Each entry is a `key: value` pair, separated by commas, inside curly braces `{ }`.

### Reading and writing

```python
user = {"name": "Sam", "level": 1}

print(user["name"])     # Sam        — look up by key
user["level"] = 2       # change an existing value
user["xp"] = 50         # add a brand-new key
print(user)             # {'name': 'Sam', 'level': 2, 'xp': 50}
```

Asking for a key that doesn't exist is an error. If you're not sure it's there,
use `.get`:

```python
print(user.get("streak"))       # None  (no error)
print(user.get("streak", 0))    # 0     (your fallback)
```

Dictionaries are everywhere in Python — API responses, config, records — because
`data["price"]` is much clearer than `data[3]`.

## Your task

The starter code has `user = {"name": "Sam", "level": 1}`.

1. Add a new key `"xp"` with the value `50`.
2. Print `user["name"]`.
3. Print `user["xp"]`.

Expected output:

```
Sam
50
```
