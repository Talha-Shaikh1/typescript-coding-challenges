# Day 04: Objects & Interfaces

**Goal:** Master objects aur interfaces

---

## 📋 What You'll Learn Today

- Object types in TypeScript
- Creating and using interfaces
- Optional properties (?)
- Readonly properties
- Extending interfaces
- Methods in interfaces
- Index signatures

---

## 📁 Folder Contents

```
day-04/
├── LESSON.md          ← Complete theory
├── examples/          ← 4 working examples
│   ├── 01-basic-interfaces.ts
│   ├── 02-optional-readonly.ts
│   ├── 03-extending-interfaces.ts
│   └── 04-methods-index-signatures.ts
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
# Complete theory on objects & interfaces
cat LESSON.md
```

### Step 2: Study Examples
```bash
cd examples
# Type and run each
```

### Step 3: Complete Exercises
```bash
cd starter-code
# Solve each exercise
```

---

## ✅ Completion Checklist

- [ ] Read complete LESSON.md
- [ ] Studied all 4 examples
- [ ] Exercise 1: Basic interfaces ✓
- [ ] Exercise 2: Readonly properties ✓
- [ ] Exercise 3: Extending interfaces ✓
- [ ] Exercise 4: Methods ✓
- [ ] Exercise 5: SDK config ✓
- [ ] Updated progress/progress.md

---

## 💡 Key Concepts

**Interfaces:**
- Blueprints for objects
- Reusable type definitions
- Can extend other interfaces

**Modifiers:**
- `?` - Optional property
- `readonly` - Immutable property

**Advanced:**
- Methods in interfaces
- Index signatures for dynamic keys

---

## 🎯 SDK Connection

```typescript
interface SDKConfig {
  readonly apiKey: string;
  phoneNumberId: string;
  timeout?: number;
}

interface Message {
  readonly id: string;
  to: string;
  text: string;
  status: "sent" | "delivered";
}
```

---

## ⏭️ Next Day

Day 05: Functions Deep Dive

Interfaces master! 💪
