# 📘 Day 02: Type Inference & Basic Types Deep Dive

**Module:** Fundamentals (Week 1)
**Duration:** 1-2 hours
**Goal:** TypeScript ki type inference aur basic types ko mastery level pe samajhna

---

## 🎯 Today's Objectives

By the end of today, you will:
- ✅ Type inference samajh jaoge (TypeScript khud types kaise guess karta hai)
- ✅ string, number, boolean types ko deeply samajhoge
- ✅ Type annotations vs inference ka difference samjhoge
- ✅ any, unknown, never types ke bare mein seekhoge
- ✅ SDK ke liye type-safe utilities banayenge

---

## 📚 Theory

### **What is Type Inference?**

**Type Inference** ka matlab hai: TypeScript khud decide karta hai variable ka type kya hai, aap ko explicitly batane ki zaroorat nahi.

```typescript
// Explicit type annotation (aap bata rahe ho)
let name: string = "Talha";

// Type inference (TypeScript khud samajh gaya)
let city = "Karachi"; // TypeScript knows: city is string
```

**Rule:** Agar TypeScript type samajh sakta hai, to annotation optional hai.

---

### **When Does TypeScript Infer Types?**

**1. Variable Initialization**
```typescript
let age = 25;           // Inferred as number
let isActive = true;    // Inferred as boolean
let message = "Hello";  // Inferred as string
```

**2. Function Return Types**
```typescript
function add(a: number, b: number) {
  return a + b;  // TypeScript infers return type is number
}
```

**3. Array Initialization**
```typescript
let numbers = [1, 2, 3];        // Inferred as number[]
let names = ["Ali", "Ahmed"];   // Inferred as string[]
```

---

### **Best Practice: When to Use Annotations?**

**✅ Use Explicit Annotations:**
```typescript
// Function parameters (TypeScript can't guess these)
function greet(name: string) { }

// When declaring without initializing
let phone: string;
phone = "+923001234567";

// When you want stricter types
let status: "pending" | "success" | "error" = "pending";
```

**✅ Let TypeScript Infer:**
```typescript
// Simple initializations
let count = 0;
let message = "Hello";

// When it's obvious
const result = add(5, 3); // Obviously number if add returns number
```

---

### **String Type - Deep Dive**

```typescript
// Regular string
let name: string = "Talha";

// Template literals
let greeting: string = `Hello, ${name}!`;

// Multi-line strings
let address: string = `
  House 123
  Street 4
  Karachi
`;

// String methods (all return string)
let upper: string = name.toUpperCase();    // "TALHA"
let lower: string = name.toLowerCase();    // "talha"
let trimmed: string = "  text  ".trim();   // "text"
```

**SDK Example:**
```typescript
// Phone number formatting
function formatPhoneNumber(phone: string): string {
  return phone.startsWith('+') ? phone : `+92${phone}`;
}

// Message template
function createWelcomeMessage(name: string): string {
  return `Welcome to our service, ${name}! Reply HELP for assistance.`;
}
```

---

### **Number Type - Deep Dive**

```typescript
// All numbers are same type (no int/float distinction)
let integer: number = 42;
let decimal: number = 3.14;
let negative: number = -10;
let hex: number = 0xff;      // Hexadecimal
let binary: number = 0b1010; // Binary
let octal: number = 0o744;   // Octal

// Special number values
let infinity: number = Infinity;
let negInfinity: number = -Infinity;
let notANumber: number = NaN;

// Number methods
let rounded: number = 3.7.toFixed(0);      // "4" (returns string!)
let parsed: number = parseInt("42");       // 42
let float: number = parseFloat("3.14");    // 3.14
```

**SDK Example:**
```typescript
// Retry count
let retryCount: number = 0;
const MAX_RETRIES: number = 3;

// Rate limiting
const MESSAGES_PER_SECOND: number = 80;
const RATE_LIMIT_WINDOW: number = 1000; // milliseconds

// Calculate wait time
function calculateBackoff(attempt: number): number {
  return Math.pow(2, attempt) * 1000; // Exponential backoff
}
```

---

### **Boolean Type - Deep Dive**

```typescript
// Only two values
let isAuthenticated: boolean = true;
let hasError: boolean = false;

// Boolean expressions
let isValid: boolean = phone.startsWith('+');
let isAdult: boolean = age >= 18;
let canSend: boolean = isAuthenticated && !hasError;

// Logical operators
let and: boolean = true && false;  // false
let or: boolean = true || false;   // true
let not: boolean = !true;          // false
```

**SDK Example:**
```typescript
// Feature flags
let enableRetry: boolean = true;
let enableLogging: boolean = true;

// Validation
function isValidPhoneNumber(phone: string): boolean {
  return phone.startsWith('+') && phone.length >= 10;
}

// Permission check
function canSendMessage(isAuth: boolean, hasQuota: boolean): boolean {
  return isAuth && hasQuota;
}
```

---

### **any Type - The Escape Hatch** ⚠️

```typescript
// any disables type checking
let anything: any = "string";
anything = 42;        // OK
anything = true;      // OK
anything.whatever();  // OK (even if method doesn't exist!)

// Problems with any
let value: any = "hello";
let length: number = value.length;  // OK, but risky!
value.toUpperCase();                // OK at compile time
value.doSomething();                // OK at compile time, ERROR at runtime!
```

**⚠️ Warning:** Avoid `any`! It defeats the purpose of TypeScript.

**When to use (rarely):**
- Legacy code migration
- Third-party libraries without types
- Truly dynamic data

---

### **unknown Type - The Safe any** ✅

```typescript
// unknown requires type checking
let value: unknown = "hello";

// Can't use directly
// value.toUpperCase(); // ERROR!

// Must check type first
if (typeof value === "string") {
  value.toUpperCase(); // OK! TypeScript knows it's string
}
```

**SDK Example:**
```typescript
// Parsing webhook payload
function parseWebhookPayload(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data);
  }
  throw new Error("Invalid payload");
}
```

---

### **never Type - The Impossible Type**

```typescript
// Function that never returns
function throwError(message: string): never {
  throw new Error(message);
}

// Infinite loop (never returns)
function infiniteLoop(): never {
  while (true) {
    // ...
  }
}

// Exhaustive type checking
type Status = "pending" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "pending":
      return "Processing...";
    case "success":
      return "Done!";
    case "error":
      return "Failed!";
    default:
      // If we reach here, we forgot to handle a status
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${status}`);
  }
}
```

---

## 🎯 Type Safety in SDK

**Without Types:**
```javascript
// JavaScript - No safety
function sendMessage(phone, text) {
  // What if phone is number? text is boolean?
  console.log(`Sending "${text}" to ${phone}`);
}

sendMessage(123, true); // Runs but wrong!
```

**With Types:**
```typescript
// TypeScript - Type safe
function sendMessage(phone: string, text: string): void {
  console.log(`Sending "${text}" to ${phone}`);
}

sendMessage(123, true); 
// ERROR: Argument of type 'number' not assignable to 'string'
// ERROR: Argument of type 'boolean' not assignable to 'string'
```

---

## 💡 Key Concepts Summary

### **Type Inference Rules**
1. TypeScript infers from right side of `=`
2. Function return types can be inferred
3. But function parameters must be annotated

### **Basic Types**
- `string` - Text data
- `number` - All numbers (int, float, hex, binary)
- `boolean` - true/false only

### **Special Types**
- `any` - Avoid! Disables type checking
- `unknown` - Safe any, requires type checking
- `never` - For functions that never return

### **Best Practices**
- ✅ Let TypeScript infer when obvious
- ✅ Annotate function parameters
- ✅ Use `unknown` instead of `any`
- ❌ Avoid `any` in public APIs

---

## 📝 Practice Examples

Check `examples/` folder for working code examples.

---

## 🎯 Connection to SDK

Today's concepts directly apply to SDK:

```typescript
// Config types
let accessToken: string = process.env.ACCESS_TOKEN!;
let phoneNumberId: string = process.env.PHONE_NUMBER_ID!;
let retryEnabled: boolean = true;
let maxRetries: number = 3;

// Validation function
function validateConfig(token: unknown, phoneId: unknown): boolean {
  return typeof token === "string" && 
         typeof phoneId === "string" &&
         token.length > 0 &&
         phoneId.length > 0;
}
```

---

## ✅ Checklist

Before moving to Day 03:

- [ ] Understand type inference
- [ ] Know when to annotate vs infer
- [ ] Understand string, number, boolean deeply
- [ ] Know difference between any and unknown
- [ ] Complete all exercises
- [ ] No compilation errors

---

## 🤔 Common Questions

**Q: Should I always add type annotations?**
A: No! Let TypeScript infer when obvious. Add annotations for function parameters and when you want stricter types.

**Q: When should I use `any`?**
A: Almost never! Use `unknown` instead. Only use `any` for legacy code.

**Q: What's the difference between `any` and `unknown`?**
A: `any` disables type checking. `unknown` is safe - you must check the type before using.

---

**Ready for exercises?** Check `EXERCISES.md`!

Keep learning! 💪
