# Day 19: Mapped Types

## 📋 Overview

**Week 3, Day 5** - Advanced Type Transformations

Today we learn how to build our own utility types using Mapped Types - the most powerful type transformation feature in TypeScript. This is how `Partial<T>`, `Required<T>`, `Readonly<T>`, and other built-in utilities are actually implemented.

## 🎯 Learning Objectives

By the end of today, you will:

1. Understand what mapped types are and how they work
2. Master the mapped type syntax: `{ [P in K]: T }`
3. Use `keyof` operator with mapped types
4. Apply type modifiers: `+?`, `-?`, `+readonly`, `-readonly`
5. Build custom utility types for your SDK
6. Combine mapped types with conditional types
7. Create domain-specific type transformations

## 🤔 The Problem We're Solving

**Scenario:** You have an interface with 10 properties. You need:
1. A version where all fields are optional (Partial)
2. A version where all fields are nullable
3. A version where all fields are promises
4. A version where all string fields become string arrays

**Without Mapped Types:**
```typescript
// Manual duplication for each transformation
interface User {
  id: string;
  name: string;
  age: number;
}

interface NullableUser {
  id: string | null;
  name: string | null;
  age: number | null;
}

interface AsyncUser {
  id: Promise<string>;
  name: Promise<string>;
  age: Promise<number>;
}

// Repetitive, error-prone, hard to maintain!
```

**With Mapped Types:**
```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Asyncify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

type NullableUser = Nullable<User>;
type AsyncUser = Asyncify<User>;

// Reusable, maintainable, type-safe!
```

## 📚 What You'll Learn Today

### 1. **Basic Mapped Types**
Transform every property of a type systematically.

### 2. **keyof and Index Access**
Access and iterate over object keys.

### 3. **Type Modifiers**
Add or remove `?` and `readonly` modifiers.

### 4. **Custom Utility Types**
Build your own domain-specific transformations.

### 5. **Advanced Patterns**
Combine mapped types with conditional types and template literals.

## 🏗️ SDK Connection

In our WhatsApp SDK, mapped types help us:

1. **Nullable types** - All config fields can be null for reset
2. **Async wrappers** - Wrap SDK methods in promises
3. **Validation types** - Add validation metadata to each field
4. **Event types** - Transform message types to event types
5. **API request builders** - Convert types for different API versions

## 📂 Project Structure

```
day-19/
├── README.md (you are here)
├── LESSON.md (deep conceptual explanation)
├── EXERCISES.md (practice problems)
├── examples/
│   ├── 01-basic-mapped-types.ts
│   ├── 02-modifiers.ts
│   ├── 03-custom-utilities.ts
│   └── 04-advanced-patterns.ts
└── starter-code/
    ├── exercise-1.ts
    ├── exercise-2.ts
    ├── exercise-3.ts
    ├── exercise-4.ts
    └── exercise-5.ts
```

## 📖 How to Study Today

1. **Read LESSON.md** - Understand mapped types deeply (40 min)
2. **Explore examples/** - See patterns in action (30 min)
3. **Complete EXERCISES.md** - Build custom utilities (90 min)
4. **Bonus Challenge** - Advanced type transformations (45 min)

## 🔗 Prerequisites

- ✅ Day 15: Generics Introduction
- ✅ Day 16: Generic Constraints
- ✅ Day 17: Utility Types Part 1
- ✅ Day 18: Utility Types Part 2

## 🔄 Cumulative Review

Today's exercises will also review:
- Day 17-18: All utility types
- Day 16: Generic constraints, keyof
- Day 15: Generics fundamentals

## ⏭️ What's Next

- **Day 20:** Conditional Types (advanced type logic)
- **Day 21:** Type Inference & Type Guards
- **Day 22:** Week 3 Practice Project

## 💡 Key Takeaway

> **Mapped types are type-level loops.** They iterate over keys of a type and transform each property systematically. This is how you build reusable type transformations that scale across your entire codebase.

## 🎯 Why Mapped Types Matter

| Built-in Utility | How It's Built |
|-----------------|----------------|
| `Partial<T>` | `{ [P in keyof T]?: T[P] }` |
| `Required<T>` | `{ [P in keyof T]-?: T[P] }` |
| `Readonly<T>` | `{ readonly [P in keyof T]: T[P] }` |
| `Pick<T, K>` | `{ [P in K]: T[P] }` |

After today, you'll understand how these work internally and build your own!

## 🔥 Today's Challenge

By the end of today, you'll build:
- `Nullable<T>` - Make all fields nullable
- `Asyncify<T>` - Wrap all fields in Promise
- `Validators<T>` - Add validation functions for each field
- `DeepPartial<T>` - Recursive partial (nested objects too)
- `StringKeys<T>` - Get only string property names

---

**Time Investment:** ~3 hours  
**Difficulty:** ⭐⭐⭐⭐ Advanced  
**Importance:** ⭐⭐⭐⭐⭐ Critical - Foundation for advanced TypeScript

Start with LESSON.md! 🚀
