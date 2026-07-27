# 🎯 Day 16: Generic Constraints

**Module:** Advanced Types & Patterns - Week 3  
**Focus:** Controlling what types can be used with generics using `extends`

---

## 🎯 What You'll Learn Today

Master generic constraints to write safer, more powerful generic code:

✅ **WHY** constraints are needed (accessing properties safely)  
✅ **HOW** to constrain generics with `extends`  
✅ **WHAT** types can be constraints (interfaces, unions, primitives)  
✅ **WHEN** to use constraints vs unconstrained generics  
✅ **WHERE** constraints shine in SDK development  

**Today's Focus:** T extends Something = Type safety + Flexibility! 🎯

---

## 📚 Learning Materials

### 1. Core Lesson
📘 **[LESSON.md](./LESSON.md)** - Deep dive into generic constraints

**Topics Covered:**
- The Problem: Can't access properties on unconstrained T
- extends keyword explained
- Constraining to interfaces
- Constraining to primitive types
- Multiple constraints
- keyof constraint
- Default type parameters
- Real-world SDK patterns

---

### 2. Hands-on Exercises
📝 **[EXERCISES.md](./EXERCISES.md)** - 6 exercises + bonus

**Exercise 1:** Understanding WHY constraints  
**Exercise 2:** Basic constraints with extends  
**Exercise 3:** Interface constraints  
**Exercise 4:** keyof and property access  
**Exercise 5:** SDK application (constrained services)  
**Exercise 6:** Cumulative revision  
**Bonus:** Advanced constraint patterns  

---

### 3. Working Examples

📁 **examples/**
- `01-problem-without-constraints.ts` - Why we need constraints
- `02-basic-constraints.ts` - extends keyword usage
- `03-interface-constraints.ts` - Constraining to shapes
- `04-keyof-constraints.ts` - Property key constraints
- `05-sdk-with-constraints.ts` - Real SDK patterns

---

### 4. Exercise Templates

📁 **starter-code/**
- Templates for each exercise
- Type hints and TODOs
- Progressive difficulty

---

## 🎓 Learning Path

### Step 1: Read LESSON.md (60 min)
Understand:
- WHY unconstrained generics have limitations
- HOW extends keyword adds constraints
- WHAT different constraint patterns exist
- WHEN to constrain vs keep generic

### Step 2: Study Examples (30 min)
```bash
cd examples
# See the problem first (01)
# Then learn solutions (02-05)
```

### Step 3: Complete Exercises (90 min)
Progressive practice from basic to SDK application

### Step 4: Bonus Challenge (30 min)
Advanced patterns with multiple constraints!

---

## 🎯 Learning Objectives

After today, you should be able to:

1. ✅ Explain WHY constraints are necessary
2. ✅ Use `extends` to constrain generic types
3. ✅ Constrain to interfaces and specific shapes
4. ✅ Use `keyof` for property key constraints
5. ✅ Set default type parameters
6. ✅ Apply constraints in SDK development

**Critical Skill:** Balance between flexibility and type safety!

---

## 🚀 SDK Connection

**Today's Impact on WhatsApp SDK:**

```typescript
// Yesterday (Day 15): Any type works
function findById<T>(items: T[], id: string): T | undefined {
  return items.find((item: any) => item.id === id); // ❌ Unsafe cast
}

// Today: Constrain to objects with 'id'
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id); // ✅ Type-safe!
}
```

**Real Impact:**
- ✅ Access properties safely
- ✅ Catch errors at compile time
- ✅ Better IDE autocomplete
- ✅ More maintainable code

---

## 💡 Key Concepts

### 1. Constraint Syntax
```typescript
function func<T extends Constraint>(param: T): T {
  // Can access properties defined in Constraint
}
```

### 2. Interface Constraint
```typescript
interface HasId {
  id: string;
}

function getById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id); // Safe!
}
```

### 3. keyof Constraint
```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key]; // Type-safe property access
}
```

### 4. Default Type Parameter
```typescript
function wrap<T = string>(value: T): { value: T } {
  return { value };
}
```

---

## ⚠️ Common Mistakes

### Mistake 1: Over-constraining
❌ `function process<T extends User>(item: T)` when T doesn't need User properties  
✅ Only constrain what you actually use

### Mistake 2: Forgetting constraints
❌ `function sort<T>(items: T[])` then accessing `item.priority`  
✅ `function sort<T extends HasPriority>(items: T[])`

### Mistake 3: Wrong constraint
❌ `T extends Array<unknown>` when T itself should be array element type  
✅ Think about what T represents

---

## 🔗 Prerequisites

**From Previous Days:**
- Day 15: Generics basics ✅
- Week 2: Interfaces ✅

**New Today:**
- `extends` keyword with generics
- `keyof` operator
- Default type parameters

---

## 📝 Quick Reference

### Basic Constraint
```typescript
<T extends Type>
```

### Interface Constraint
```typescript
interface HasId { id: string }
<T extends HasId>
```

### Multiple Constraints
```typescript
<T extends HasId & HasName>
```

### keyof Constraint
```typescript
<K extends keyof T>
```

### Default Type
```typescript
<T = string>
```

---

## 🎯 Success Criteria

You've mastered Day 16 when:

- [ ] Understand WHY constraints matter
- [ ] Can constrain to interfaces
- [ ] Can use keyof for property access
- [ ] Can set default types
- [ ] Know when to constrain vs not constrain

**Test:** Write a generic function that only accepts objects with `id` and `name` properties!

---

## 📚 Additional Resources

### Official Docs
- [TypeScript Handbook - Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
- [keyof type operator](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)

---

## ⏭️ Next Steps

**Tomorrow (Day 17):** Utility Types - Part 1
- Partial<T>
- Pick<T, K>
- Omit<T, K>
- Built-in type transformations

**Connection:** Today you learned to constrain types. Tomorrow you'll learn to TRANSFORM them!

---

## 💬 Questions to Ask Yourself

1. **Why** can't we access properties on unconstrained T?
2. **What** does `extends` mean in generics?
3. **How** does keyof help with property access?
4. **When** should we add constraints?
5. **Where** do constraints improve our SDK?

If you can answer these, you're ready! 🎉

---

**Let's master constraints!** 💪

Generic constraints = The perfect balance between flexibility and safety!

Happy learning! 🚀
