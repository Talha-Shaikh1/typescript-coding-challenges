# 📚 Day 01 Solutions

**⚠️ Important:** Only check these after attempting exercises yourself!

---

## Exercise 1: Variables with Types

**File:** `exercise-1-solution.ts`

**Key Points:**
- Type annotation syntax: `const variableName: type = value`
- Use `const` for values that won't change
- TypeScript enforces the types you declare

**Common Mistakes:**
```typescript
// ❌ Wrong: Wrong type
const age: string = 25; // Error!

// ✅ Correct: Matching type
const age: number = 25;
```

---

## Exercise 2: Basic Functions

**File:** `exercise-2-solution.ts`

**Key Points:**
- Parameter types: `(param: type)`
- Return type: `): returnType {`
- Can use regular functions or arrow functions

**Common Mistakes:**
```typescript
// ❌ Wrong: Missing return type
function multiply(a: number, b: number) {
  return a * b;
}

// ✅ Better: Explicit return type
function multiply(a: number, b: number): number {
  return a * b;
}
```

---

## Exercise 3: Phone Validator

**File:** `exercise-3-solution.ts`

**Key Points:**
- Return type can be an object: `{ key: type; key2: type }`
- Use `startsWith()` method for string checking
- This is a real utility for WhatsApp SDK!

**Why E.164 Format:**
- WhatsApp Cloud API requires `+[country][number]`
- Example: `+923001234567` (Pakistan)
- Example: `+14155552671` (USA)

**Common Mistakes:**
```typescript
// ❌ Wrong: Checking if string includes '+'
function validate(phone: string): boolean {
  return phone.includes('+'); // Wrong! '+' could be anywhere
}

// ✅ Correct: Check if starts with '+'
function validate(phone: string): boolean {
  return phone.startsWith('+');
}
```

---

## Bonus Challenge

**File:** `bonus-solution.ts`

**Concepts:**
- Default parameters
- String manipulation
- Early return pattern
- Making functions flexible

**SDK Application:**
Users can write:
```typescript
sendMessage("3001234567", "Hello"); // Auto-formats to +923001234567
```

---

## 🎯 Next Steps

If you completed all exercises:
- ✅ Mark Day 01 complete in `progress/progress.md`
- ✅ Review what you learned
- ✅ Move to Day 02

If you struggled:
- 📖 Re-read LESSON.md
- 💻 Type the examples again
- 🤔 Compare your code with solutions
- ✍️ Write notes about what was confusing

---

## 💡 Key Takeaways

1. **Type Safety:** TypeScript catches errors at compile time
2. **Type Annotations:** Be explicit about types
3. **Functions:** Always type parameters and return values
4. **Real World:** Phone validation is actually needed in SDK!

---

## 📝 Self Assessment

Rate yourself (1-5):
- I understand type annotations: ⭐⭐⭐⭐⭐
- I can write typed functions: ⭐⭐⭐⭐⭐
- I understand when to use each type: ⭐⭐⭐⭐⭐

Be honest! It's okay to not be 5/5 on Day 01! 😊

---

Ready for Day 02? Let's go! 🚀
