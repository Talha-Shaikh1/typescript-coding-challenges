# Day 03: Arrays, Tuples & Type Aliases

**Goal:** Master arrays, tuples aur type aliases

---

## 📋 What You'll Learn Today

- Arrays and array methods
- Tuples for fixed-length data
- Type aliases for reusable types
- Readonly arrays and tuples
- Real SDK type definitions

---

## 📁 Folder Contents

```
day-03/
├── LESSON.md          ← Complete theory
├── examples/          ← 4 working examples
│   ├── 01-arrays-basics.ts
│   ├── 02-tuples.ts
│   ├── 03-type-aliases.ts
│   └── 04-readonly-advanced.ts
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
# Open LESSON.md - comprehensive arrays, tuples, type aliases
```

### Step 2: Study Examples
```bash
cd examples

# Type and run each example:
npx tsc 01-arrays-basics.ts && node 01-arrays-basics.js
npx tsc 02-tuples.ts && node 02-tuples.js
npx tsc 03-type-aliases.ts && node 03-type-aliases.js
npx tsc 04-readonly-advanced.ts && node 04-readonly-advanced.js
```

### Step 3: Complete Exercises
```bash
cd starter-code
# Complete each exercise
```

---

## ✅ Completion Checklist

- [ ] Read complete LESSON.md
- [ ] Studied all 4 examples
- [ ] Exercise 1: Array operations ✓
- [ ] Exercise 2: Tuples ✓
- [ ] Exercise 3: Type aliases ✓
- [ ] Exercise 4: Readonly config ✓
- [ ] Exercise 5: Message queue ✓
- [ ] All files compile
- [ ] Updated progress/progress.md

---

## 💡 Key Concepts

**Arrays:**
- Collections of same type
- Methods: map, filter, reduce
- Readonly for immutability

**Tuples:**
- Fixed length arrays
- Specific type at each position
- Great for function returns

**Type Aliases:**
- Custom named types
- Reusable across codebase
- Better than repeating types

---

## 🎯 SDK Connection

```typescript
// Real SDK types
type PhoneNumber = string;
type MessageStatus = "sent" | "delivered" | "failed";
type Message = {
  id: string;
  to: PhoneNumber;
  status: MessageStatus;
};

// Arrays for bulk operations
let recipients: PhoneNumber[] = [];

// Tuples for multi-value returns
function send(): [boolean, string] {
  return [true, "msg_id"];
}
```

---

## ⏭️ Next Day

Day 04: Objects & Interfaces

Arrays master ban gaye! 💪
