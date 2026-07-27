# Day 02: Type Inference & Basic Types Deep Dive

**Goal:** Master type inference aur basic types ko deeply samajhna

---

## 📋 What You'll Learn Today

- Type inference (TypeScript khud types kaise guess karta hai)
- string, number, boolean - deep understanding
- any vs unknown vs never
- When to annotate vs when to infer
- Real SDK utilities

---

## 📁 Folder Contents

```
day-02/
├── LESSON.md          ← Complete theory (must read!)
├── examples/          ← 4 working examples
│   ├── 01-type-inference.ts
│   ├── 02-string-type.ts
│   ├── 03-number-type.ts
│   └── 04-any-unknown-never.ts
├── EXERCISES.md       ← 5 exercises
├── starter-code/      ← Your workspace
│   ├── exercise-1.ts
│   ├── exercise-2.ts
│   ├── exercise-3.ts
│   ├── exercise-4.ts
│   └── exercise-5.ts
└── README.md          ← This file
```

---

## 🚀 How to Start

### Step 1: Read the Lesson
```bash
# Open LESSON.md - comprehensive theory
```

### Step 2: Study Examples
```bash
cd examples

# Run each example:
npx tsc 01-type-inference.ts && node 01-type-inference.js
npx tsc 02-string-type.ts && node 02-string-type.js
npx tsc 03-number-type.ts && node 03-number-type.js
npx tsc 04-any-unknown-never.ts && node 04-any-unknown-never.js

# Type each example yourself!
```

### Step 3: Complete Exercises
```bash
cd starter-code

# Complete each exercise file
# Compile: npx tsc exercise-1.ts
# Run: node exercise-1.js
```

### Step 4: Check Solutions
```bash
# Only after trying!
cd ../../solutions/day-02
```

---

## ✅ Completion Checklist

- [✅] Read complete LESSON.md
- [✅] Ran all 4 examples
- [ ] Exercise 1: Type inference ✓
- [ ] Exercise 2: String manipulation ✓
- [ ] Exercise 3: Number operations ✓
- [ ] Exercise 4: unknown type handling ✓
- [ ] Exercise 5: Boolean validation ✓
- [ ] All exercises compile
- [ ] Compared with solutions
- [ ] Updated progress/progress.md

---

## 💡 Key Concepts

**Type Inference:**
- TypeScript guesses types from values
- Reduces boilerplate
- Still type-safe!

**When to Annotate:**
- Function parameters (required)
- When type isn't obvious
- For stricter types

**Basic Types:**
- `string` - text data
- `number` - all numbers
- `boolean` - true/false

**Special Types:**
- Avoid `any` ❌
- Use `unknown` ✅
- `never` for functions that never return

---

## 🎯 SDK Connection

Today's concepts = SDK foundations:

```typescript
// Config validation
let token: string = process.env.TOKEN!;
let retries: number = 3;
let enabled: boolean = true;

// Safe parsing
function parseConfig(data: unknown): Config {
  // Type checking required!
}
```

---

## 🆘 Common Issues

**Issue: "Type is inferred as 'any'"**
Solution: Add type annotation or initialize with value

**Issue: "Can't use 'unknown' directly"**
Solution: Check type first with `typeof`

**Issue: "toFixed returns string not number"**
Solution: Use `parseFloat(num.toFixed(2))`

---

## ⏭️ Next Day

Day 03: Arrays, Tuples & Objects

Keep going! 💪
