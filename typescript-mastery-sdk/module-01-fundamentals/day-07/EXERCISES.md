# 📝 Day 07: Week 1 Practice Project - Exercises

**Duration:** 2-3 hours
**Goal:** Apply all Week 1 concepts in a real project

---

## 🎯 Project: Phone Number Validator & Formatter

Build a complete TypeScript utility for validating and formatting phone numbers!

---

## 📋 Exercise Breakdown

### ✅ Exercise 1: Setup Project Structure

**File:** Multiple files in `starter-code/`

**Tasks:**
1. Navigate to `starter-code/phone-validator/`
2. Review the project structure
3. Install dependencies (if any)
4. Understand the file organization

**Expected:** Project structure ready ✅

---

### ✅ Exercise 2: Define Types

**File:** `src/types.ts`

**Tasks:**
1. Complete the `PhoneNumber` type alias
2. Complete the `CountryCode` type with at least 5 countries
3. Complete the `ValidationResult` interface
4. Complete the `PhoneInfo` interface
5. Complete the `ValidatorOptions` interface

**Test:**
```typescript
// These should compile without errors:
const phone: PhoneNumber = "+923001234567";
const code: CountryCode = "92";
const result: ValidationResult = { isValid: true, formatted: "+92300..." };
```

**Expected:** All type definitions working ✅

---

### ✅ Exercise 3: Custom Error Classes

**File:** `src/errors.ts`

**Tasks:**
1. Complete `PhoneValidationError` base class
2. Complete `InvalidFormatError` class
3. Complete `InvalidLengthError` class
4. Add one more error type of your choice

**Test:**
```typescript
const error = new InvalidFormatError("923001234567");
console.log(error.name);     // "PhoneValidationError"
console.log(error.code);     // "INVALID_FORMAT"
console.log(error.message);  // "Phone number must start with +"
```

**Expected:** Custom errors working ✅

---

### ✅ Exercise 4: Validation Functions

**File:** `src/validator.ts`

**Tasks:**
1. Implement `isValidFormat(phone: string): boolean`
   - Check if starts with `+`
   - Check if contains only digits after `+`

2. Implement `isValidLength(phone: string): boolean`
   - Minimum 10 characters
   - Maximum 15 characters

3. Implement `validate(phone: string): ValidationResult`
   - Use the above helpers
   - Return appropriate error messages

4. Implement `validateBatch(phones: string[]): ValidationResult[]`
   - Validate multiple phones

**Test Cases:**
```typescript
console.log(validate("+923001234567"));  // { isValid: true, ... }
console.log(validate("923001234567"));   // { isValid: false, error: "..." }
console.log(validate("+92300"));         // { isValid: false, error: "..." }
console.log(validate("+92300abc"));      // { isValid: false, error: "..." }
```

**Expected:** All validation working ✅

---

### ✅ Exercise 5: Formatting Functions

**File:** `src/formatter.ts`

**Tasks:**
1. Implement `addCountryCode(phone: string, countryCode?: CountryCode): string`
   - If phone starts with `+`, return as-is
   - Otherwise add `+{countryCode}` prefix

2. Implement `extractCountryCode(phone: PhoneNumber): string`
   - Extract 1-3 digits after `+`

3. Implement `getPhoneInfo(phone: string): PhoneInfo`
   - Combine validation and formatting
   - Return complete phone information

4. Implement `formatBatch(phones: string[], countryCode?: CountryCode): string[]`
   - Format multiple phones

**Test Cases:**
```typescript
console.log(addCountryCode("3001234567", "92"));    // "+923001234567"
console.log(addCountryCode("+923001234567", "92")); // "+923001234567"
console.log(extractCountryCode("+923001234567"));   // "92"

const info = getPhoneInfo("+923001234567");
console.log(info.countryCode);     // "92"
console.log(info.nationalNumber);  // "3001234567"
```

**Expected:** All formatting working ✅

---

### ✅ Exercise 6: Public API

**File:** `src/index.ts`

**Tasks:**
1. Export all types from `types.ts`
2. Export all errors from `errors.ts`
3. Export all validators from `validator.ts`
4. Export all formatters from `formatter.ts`
5. Create and export the `PhoneValidator` class

**Test:**
```typescript
import { PhoneValidator, validate } from "./index";

const validator = new PhoneValidator("92");
console.log(validator.format("3001234567"));  // "+923001234567"
console.log(validate("+923001234567"));       // { isValid: true, ... }
```

**Expected:** Clean public API ✅

---

### ✅ Exercise 7: Usage Examples

**File:** `examples/usage.ts`

**Tasks:**
1. Import the validator
2. Create usage examples for all features:
   - Single validation
   - Batch validation
   - Formatting
   - Using the class
   - Error handling

**Test:**
```bash
npx tsx examples/usage.ts
```

**Expected:** All examples running ✅

---

## 🎯 Bonus Challenges

### 🌟 Bonus 1: Country-Specific Validation
Add country-specific rules:
- Pakistan: 12 digits total (+92XXXXXXXXXX)
- USA: 11 digits total (+1XXXXXXXXXX)
- UK: 12-13 digits total (+44XXXXXXXXXXX)

### 🌟 Bonus 2: Multiple Format Styles
Add formatting options:
- International: `+92 300 1234567`
- National: `0300 1234567`
- Local: `300 1234567`

### 🌟 Bonus 3: Add Tests
Create `tests/validator.test.ts` with:
- Valid phone tests
- Invalid phone tests
- Edge cases
- Error handling tests

### 🌟 Bonus 4: Add Documentation
Create comprehensive `README.md` with:
- Installation instructions
- API documentation
- Usage examples
- Contributing guidelines

---

## ✅ Completion Checklist

Mark each when complete:

**Setup:**
- [ ] Project structure understood
- [ ] All files created
- [ ] Dependencies installed (if any)

**Core Implementation:**
- [ ] Exercise 1: Project setup ✅
- [ ] Exercise 2: Types defined ✅
- [ ] Exercise 3: Custom errors ✅
- [ ] Exercise 4: Validation working ✅
- [ ] Exercise 5: Formatting working ✅
- [ ] Exercise 6: Public API clean ✅
- [ ] Exercise 7: Examples running ✅

**Quality:**
- [ ] TypeScript compiles without errors
- [ ] All test cases pass
- [ ] Code follows best practices
- [ ] Comments added where needed

**Bonus (Optional):**
- [ ] Country-specific validation
- [ ] Multiple format styles
- [ ] Unit tests added
- [ ] Documentation complete

---

## 🎓 Learning Outcomes

After completing this project, you will have:

✅ **Applied Week 1 Concepts:**
- Type aliases and interfaces
- Union and intersection types
- Custom type guards
- Function signatures
- Array operations
- Error handling

✅ **Built Real SDK Utility:**
- Production-ready code structure
- Clean public API
- Reusable functions
- Proper error handling

✅ **Gained Professional Skills:**
- Project organization
- Module exports
- Type safety patterns
- Documentation

---

## 📝 Submission

When you're done:
1. Ensure all TypeScript compiles: `npx tsc --noEmit`
2. Run your examples: `npx tsx examples/usage.ts`
3. Update `../../progress/progress.md`
4. Mark Week 1 as complete! 🎉

---

## 🚀 Next Steps

**After Week 1:**
- Review concepts you found difficult
- Build your own mini-project
- Start Module 2: Intermediate TypeScript

**Congratulations!** You've completed Week 1! 💪

Ready for more advanced TypeScript? Let's go! 🎯
