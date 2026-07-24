# Day 01: Variables & Basic Types (Redesigned)

**Module:** TypeScript Fundamentals - Week 1  
**Difficulty:** ⭐ Beginner Friendly  
**Duration:** 2-3 hours  
**Goal:** Solid foundation in variables and types

---

## 📋 What You'll Learn Today

✅ Variables aur storage ka concept  
✅ Types kyun important hain (with examples)  
✅ string, number, boolean master karna  
✅ Type inference samajhna  
✅ let vs const clearly samajhna  
✅ Real SDK code ke liye ready hona

---

## 📁 Folder Structure

```
day-01/
├── LESSON.md          ← START HERE! Complete theory
├── EXERCISES.md       ← Practice exercises
├── README.md          ← This file
├── examples/          ← 6 working code examples
│   ├── 01-basic-variables.ts
│   ├── 02-type-inference.ts
│   ├── 03-let-vs-const.ts
│   ├── 04-strings.ts
│   ├── 05-numbers.ts
│   └── 06-booleans.ts
├── exercises/         ← Your practice files
│   ├── exercise-1.ts (Guided)
│   ├── exercise-2.ts (Guided)
│   ├── exercise-3.ts (Guided)
│   ├── exercise-4.ts (Guided)
│   ├── exercise-5.ts (Guided)
│   ├── exercise-6.ts (Independent)
│   ├── exercise-7.ts (Independent - SDK!)
│   ├── exercise-8.ts (Independent)
│   ├── exercise-9.ts (Independent)
│   └── exercise-10.ts (Independent)
└── solutions/         ← Check AFTER trying!
    └── day-01/
```

---

## 🚀 Learning Path (Follow This Order!)

### **Step 1: Read Theory** (30-40 minutes)
```bash
# Open and read completely
LESSON.md
```

**Contains:**
- 📚 Part 1: समझाओ - Concepts explained
- 📝 Part 2: दिखाओ - Working examples

**Don't skip this!** Theory samajhna zaroori hai.

---

### **Step 2: Run Examples** (20-30 minutes)

Examples **TYPE karo** (copy-paste nahi!):

```bash
cd examples

# Example 1: Basic variables
npx tsc 01-basic-variables.ts
node 01-basic-variables.js

# Example 2: Type inference
npx tsc 02-type-inference.ts
node 02-type-inference.js

# ... run all 6 examples
```

**Why type?** Muscle memory aur understanding dono improve hoti hai!

---

### **Step 3: Guided Practice** (30 minutes)

**Easy exercises** - blanks fill karo:

```bash
cd exercises

# Part 3: साथ करो (Guided)
exercise-1.ts  # Variables
exercise-2.ts  # Inference
exercise-3.ts  # let vs const
exercise-4.ts  # Strings
exercise-5.ts  # Numbers
```

**These are EASY** - confidence building ke liye!

---

### **Step 4: Independent Practice** (45-60 minutes)

**From scratch** - khud likho:

```bash
cd exercises

# Part 4: खुद करो (Independent)
exercise-6.ts   # Profile (Easy)
exercise-7.ts   # Phone Validator (SDK Task!)
exercise-8.ts   # Calculator
exercise-9.ts   # Formatter
exercise-10.ts  # Access Control (Challenging!)
```

**Don't rush!** Har exercise samajh ke karo.

---

### **Step 5: Check Solutions** (15 minutes)

**ONLY after trying:**

```bash
cd ../solutions/day-01

# Compare your solutions
# Learn from differences
```

---

## ✅ Completion Checklist

Before moving to Day 02:

**Theory:**
- [ ] Read complete LESSON.md Part 1
- [ ] Read complete LESSON.md Part 2
- [ ] Understood all concepts

**Examples:**
- [ ] Typed all 6 examples (not copy-pasted!)
- [ ] Ran all examples
- [ ] Saw expected outputs

**Practice:**
- [ ] Completed exercises 1-5 (Guided)
- [ ] Completed exercises 6-10 (Independent)
- [ ] All exercises compile without errors
- [ ] Outputs match expected results

**Understanding:**
- [ ] Can explain what a variable is
- [ ] Know why types are important
- [ ] Understand string, number, boolean
- [ ] Know when to use let vs const
- [ ] Comfortable with type inference

---

## 🎯 Key Concepts Summary

| Concept | Kya Hai | Example |
|---------|---------|---------|
| **Variable** | Storage container | `let name = "Ali"` |
| **Type** | Data ka kind | `string`, `number`, `boolean` |
| **let** | Changeable variable | `let count = 0` |
| **const** | Fixed variable | `const MAX = 100` |
| **Inference** | TS guesses type | `let x = 5` (number) |

---

## 🆘 Getting Help

### **Common Issues:**

**❌ "Cannot find name 'X'"**
```typescript
// Problem:
console.log(name);  // Error!

// Solution:
let name = "Ali";  // Declare first!
console.log(name);
```

**❌ "Type 'X' is not assignable to type 'Y'"**
```typescript
// Problem:
let age: number = "25";  // Error!

// Solution:
let age: number = 25;  // Use number, not string
```

**❌ "Cannot assign to 'X' because it is a constant"**
```typescript
// Problem:
const score = 0;
score = 10;  // Error!

// Solution:
let score = 0;  // Use let if changing
score = 10;
```

---

## 💡 Tips for Success

1. **धीरे चलो, दूर तक जाओ** - Rush mat karo, samajh ke chalo
2. **Type करो** - Copy-paste se learning slow hoti hai
3. **Experiment करो** - Values change karke dekho
4. **Errors पढ़ो** - TypeScript helpful errors deta hai
5. **Practice करो** - Repetition se mastery aati hai

---

## 📊 Time Estimate

- **Theory (LESSON.md):** 30-40 min
- **Examples:** 20-30 min
- **Guided Exercises:** 30 min
- **Independent Exercises:** 45-60 min
- **Review Solutions:** 15 min

**Total:** 2.5 - 3 hours

Take breaks! Brain ko rest chahiye! 🧠

---

## 🎓 After Day 01

**You'll be able to:**
- ✅ Declare variables confidently
- ✅ Use correct types
- ✅ Work with strings, numbers, booleans
- ✅ Write type-safe code
- ✅ Ready for arrays and functions (Day 02)!

---

## ⏭️ What's Next?

**Day 02:** Arrays aur Functions

But pehle Day 01 **completely** finish karo! 💪

---

## 📚 Resources

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- VS Code TypeScript: https://code.visualstudio.com/docs/languages/typescript

---

**Ready to start?** Open `LESSON.md` and begin! 🚀

Good luck! You've got this! 💪
