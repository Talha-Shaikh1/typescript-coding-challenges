# 📘 Day 07: Week 1 Practice Project

**Module:** Fundamentals (Week 1)
**Duration:** 2-3 hours
**Goal:** Week 1 ke saare concepts ko apply karke ek complete utility banao

---

## 🎯 Project Overview

**Build:** Phone Number Validator & Formatter Utility

Real WhatsApp SDK utility jo production mein use hogi!

---

## 📋 Project Requirements

### **What You'll Build**

Ek TypeScript module jo phone numbers ko validate aur format kare.

**Features:**
1. ✅ Validate E.164 format
2. ✅ Format phone numbers (add country code)
3. ✅ Extract country code
4. ✅ Validate length
5. ✅ Batch validation for arrays
6. ✅ Type-safe error handling

---

## 🏗️ Project Structure

```
phone-validator/
├── src/
│   ├── types.ts           # Type definitions
│   ├── validator.ts       # Validation logic
│   ├── formatter.ts       # Formatting logic
│   ├── errors.ts          # Custom errors
│   └── index.ts           # Public API
├── tests/
│   ├── validator.test.ts
│   └── formatter.test.ts
├── examples/
│   └── usage.ts           # Example usage
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📚 Concepts Applied

### **From Day 01-02:** Types & Basics
- string, number, boolean types
- Type inference
- Functions with types

### **From Day 03:** Arrays & Type Aliases
- Type aliases for PhoneNumber
- Array methods (map, filter)
- Readonly arrays

### **From Day 04:** Objects & Interfaces
- Interface for ValidationResult
- Interface for PhoneInfo
- Optional properties

### **From Day 05:** Functions
- Optional parameters
- Default parameters
- Return type annotations

### **From Day 06:** Union & Intersection
- Union types for results
- Type guards
- Discriminated unions

---

## 🎯 Implementation Tasks

### **Task 1: Define Types** (`types.ts`)

```typescript
// Phone number in E.164 format
export type PhoneNumber = string;

// Country codes
export type CountryCode = "92" | "1" | "44" | "91" | "86";

// Validation result
export interface ValidationResult {
  isValid: boolean;
  formatted?: string;
  error?: string;
}

// Phone information
export interface PhoneInfo {
  original: string;
  formatted: string;
  countryCode: string;
  nationalNumber: string;
  isValid: boolean;
}

// Options for validator
export interface ValidatorOptions {
  defaultCountryCode?: CountryCode;
  strictMode?: boolean;
}
```

---

### **Task 2: Custom Errors** (`errors.ts`)

```typescript
export class PhoneValidationError extends Error {
  constructor(
    message: string,
    public code: string,
    public phone: string
  ) {
    super(message);
    this.name = "PhoneValidationError";
  }
}

export class InvalidFormatError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number must start with +",
      "INVALID_FORMAT",
      phone
    );
  }
}

export class InvalidLengthError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number must be at least 10 characters",
      "INVALID_LENGTH",
      phone
    );
  }
}
```

---

### **Task 3: Validation Functions** (`validator.ts`)

```typescript
import type { PhoneNumber, ValidationResult } from "./types";

export function isValidFormat(phone: string): boolean {
  // Check if starts with + and contains only digits after
  return /^\+\d+$/.test(phone);
}

export function isValidLength(phone: string): boolean {
  // Minimum 10 characters (+XX XXXXXXXX)
  return phone.length >= 10 && phone.length <= 15;
}

export function validate(phone: string): ValidationResult {
  if (!phone.startsWith("+")) {
    return {
      isValid: false,
      error: "Phone must start with +"
    };
  }

  if (!isValidFormat(phone)) {
    return {
      isValid: false,
      error: "Phone contains invalid characters"
    };
  }

  if (!isValidLength(phone)) {
    return {
      isValid: false,
      error: "Phone length is invalid"
    };
  }

  return {
    isValid: true,
    formatted: phone
  };
}

export function validateBatch(phones: string[]): ValidationResult[] {
  return phones.map(phone => validate(phone));
}
```

---

### **Task 4: Formatting Functions** (`formatter.ts`)

```typescript
import type { PhoneNumber, CountryCode, PhoneInfo } from "./types";

export function addCountryCode(
  phone: string,
  countryCode: CountryCode = "92"
): string {
  if (phone.startsWith("+")) {
    return phone;
  }
  return `+${countryCode}${phone}`;
}

export function extractCountryCode(phone: PhoneNumber): string {
  // Extract first 1-3 digits after +
  const match = phone.match(/^\+(\d{1,3})/);
  return match ? match[1] : "";
}

export function getPhoneInfo(phone: string): PhoneInfo {
  const formatted = addCountryCode(phone);
  const countryCode = extractCountryCode(formatted);
  const nationalNumber = formatted.substring(countryCode.length + 1);

  return {
    original: phone,
    formatted,
    countryCode,
    nationalNumber,
    isValid: validate(formatted).isValid
  };
}

export function formatBatch(
  phones: string[],
  countryCode?: CountryCode
): string[] {
  return phones.map(phone => addCountryCode(phone, countryCode));
}
```

---

### **Task 5: Public API** (`index.ts`)

```typescript
// Export types
export type { PhoneNumber, ValidationResult, PhoneInfo, ValidatorOptions } from "./types";

// Export errors
export { PhoneValidationError, InvalidFormatError, InvalidLengthError } from "./errors";

// Export validators
export { validate, validateBatch, isValidFormat, isValidLength } from "./validator";

// Export formatters
export { addCountryCode, extractCountryCode, getPhoneInfo, formatBatch } from "./formatter";

// Main class for convenience
export class PhoneValidator {
  constructor(private defaultCountryCode: CountryCode = "92") {}

  validate(phone: string): ValidationResult {
    return validate(phone);
  }

  format(phone: string): string {
    return addCountryCode(phone, this.defaultCountryCode);
  }

  getInfo(phone: string): PhoneInfo {
    return getPhoneInfo(phone);
  }
}
```

---

## ✅ Testing Checklist

Test these cases:

```typescript
// Valid phones
validate("+923001234567")  // ✅ Valid
validate("+14155552671")   // ✅ Valid
validate("+442071234567")  // ✅ Valid

// Invalid phones
validate("923001234567")   // ❌ No +
validate("+92300")         // ❌ Too short
validate("+92300abc")      // ❌ Invalid chars

// Formatting
addCountryCode("3001234567", "92")  // "+923001234567"
addCountryCode("+923001234567")     // "+923001234567"

// Info extraction
getPhoneInfo("+923001234567")
// { countryCode: "92", nationalNumber: "3001234567", ... }

// Batch operations
validateBatch(["+92300...", "invalid", "+1415..."])
formatBatch(["3001234567", "3121234567"], "92")
```

---

## 🎯 Bonus Challenges

1. **Add More Country Codes**
   - Support 10+ countries
   - Validate country-specific formats

2. **Add Formatting Styles**
   - International: +92 300 1234567
   - National: 0300 1234567
   - Local: 300 1234567

3. **Add Caching**
   - Cache validation results
   - Improve performance

4. **Add Tests**
   - Write unit tests with Vitest
   - Test edge cases

---

## 📖 Example Usage

```typescript
import { PhoneValidator, validate, formatBatch } from "./phone-validator";

// Using functions
const result = validate("+923001234567");
console.log(result);  // { isValid: true, formatted: "+923001234567" }

// Using class
const validator = new PhoneValidator("92");
console.log(validator.format("3001234567"));  // "+923001234567"
console.log(validator.getInfo("+923001234567"));

// Batch operations
const phones = ["3001234567", "3121234567", "3331234567"];
const formatted = formatBatch(phones, "92");
console.log(formatted);
```

---

## 🎓 Learning Outcomes

After completing this project:
- ✅ Can structure a TypeScript project
- ✅ Can define clean type hierarchies
- ✅ Can create custom error classes
- ✅ Can write reusable utilities
- ✅ Can export a clean public API
- ✅ Ready for Module 2!

---

## 📝 Submission

When complete:
1. ✅ All functions implemented
2. ✅ All test cases passing
3. ✅ Code compiles without errors
4. ✅ Example usage working
5. ✅ Update progress/progress.md

---

**Congratulations! Week 1 Complete!** 🎉

Next week: Intermediate TypeScript! 🚀
