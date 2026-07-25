# Exercise 4: Semantic Versioning Understanding

## Goal
Understand and apply semantic versioning rules correctly.

---

## Part 1: Version Bumps

Your package is currently at version `1.2.3`.

For each scenario below, determine the **next version number**:

### Scenario 1: Bug Fix
- **Change:** Fixed a bug in phone number validation
- **Current version:** `1.2.3`
- **Next version:** `?`
- **Your answer:** _____________
- **Reasoning:** _____________

### Scenario 2: New Feature (Backward Compatible)
- **Change:** Added a new `sendImage()` method (backward compatible)
- **Current version:** `1.2.3`
- **Next version:** `?`
- **Your answer:** _____________
- **Reasoning:** _____________

### Scenario 3: Breaking Change
- **Change:** Changed the `sendMessage()` function signature (breaking change)
- **Current version:** `1.2.3`
- **Next version:** `?`
- **Your answer:** _____________
- **Reasoning:** _____________

### Scenario 4: Documentation Update
- **Change:** Fixed typo in documentation (no code change)
- **Current version:** `1.2.3`
- **Next version:** `?`
- **Your answer:** _____________
- **Reasoning:** _____________

### Scenario 5: Multiple Changes
- **Change:** Added webhook support (new feature) + fixed a bug
- **Current version:** `1.2.3`
- **Next version:** `?`
- **Your answer:** _____________
- **Reasoning:** _____________

---

## Part 2: Version Ranges

Given these version ranges in `package.json`:

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": "~1.6.0",
    "lodash": "4.17.21"
  }
}
```

**Available versions in npm registry:**
- express: `4.18.0`, `4.18.5`, `4.19.0`, `5.0.0`
- axios: `1.6.0`, `1.6.5`, `1.7.0`, `2.0.0`
- lodash: `4.17.20`, `4.17.21`, `4.18.0`

**Question:** Which specific versions will npm install?

### express: `^4.18.0`
- **Will install:** _____________
- **Why:** _____________

### axios: `~1.6.0`
- **Will install:** _____________
- **Why:** _____________

### lodash: `4.17.21`
- **Will install:** _____________
- **Why:** _____________

---

## Part 3: Quick Quiz

Mark each statement as TRUE or FALSE:

1. [ ] PATCH version should be bumped for bug fixes
2. [ ] MINOR version should be bumped for breaking changes
3. [ ] MAJOR version should be bumped when API changes are not backward compatible
4. [ ] Documentation updates require a version bump
5. [ ] `^1.2.3` allows installation of version `2.0.0`
6. [ ] `~1.2.3` allows installation of version `1.3.0`
7. [ ] Exact version `1.2.3` allows any patch updates

---

## Answers

**Don't peek until you've tried!**

Check your answers in `../../solutions/day-08/exercise-4-answers.md`
