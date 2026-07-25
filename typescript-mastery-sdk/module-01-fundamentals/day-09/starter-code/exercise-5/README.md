# Exercise 5: Multiple tsconfig Files

## Goal
Set up a professional multi-config structure for the WhatsApp SDK

---

## Task
Create 3 tsconfig files in this directory:

### 1. tsconfig.json (Base Config)
Shared settings that all other configs will inherit.

**Include:**
- target: ES2022
- module: ESNext
- Basic compiler options
- Path mappings

**This file should NOT have:**
- include/exclude (specific configs handle that)
- outDir (each config has different output)

---

### 2. tsconfig.build.json (Production Build)
For building the library that gets published to npm.

**Requirements:**
- Extend tsconfig.json
- outDir: ./dist
- rootDir: ./src
- declaration: true (users need types!)
- strict: true (production quality)
- include: src/**/*
- exclude: tests, examples, *.spec.ts

**Usage:** `tsc -p tsconfig.build.json`

---

### 3. tsconfig.test.json (Test Compilation)
For compiling test files.

**Requirements:**
- Extend tsconfig.json
- outDir: ./dist-test
- declaration: false (tests don't need .d.ts)
- types: ["vitest/globals", "node"]
- include: src/**/* AND tests/**/*
- More relaxed: noUnusedLocals: false

**Usage:** Used by Vitest automatically

---

## Verification

After creating all 3 files:

```bash
# Should compile library code only
tsc -p tsconfig.build.json

# Should compile tests
tsc -p tsconfig.test.json

# Should show base config
tsc --showConfig
```

---

## Success Criteria

✅ All 3 files created
✅ Proper inheritance with "extends"
✅ Different output directories
✅ Correct include/exclude patterns
✅ Build config excludes tests
✅ Test config includes both src and tests

---

## Hints

### Using "extends":
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"
  }
}
```

### Multiple includes:
```json
{
  "include": ["src/**/*", "tests/**/*"]
}
```

### Excluding test files from build:
```json
{
  "exclude": ["**/*.spec.ts", "**/*.test.ts", "tests"]
}
```
