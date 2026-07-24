# 📘 Day 01: Variables & Basic Types (Complete Redesign)

**Module:** TypeScript Fundamentals - Week 1  
**Duration:** 2-3 hours  
**Prerequisites:** None - complete beginner friendly  
**Goal:** Variables aur types ki **solid** understanding

---

## 🎯 Learning Objectives

By the end of today, you will:
- ✅ Variables kya hote hain **clearly** samajh jaoge
- ✅ Types kyun zaruri hain **examples ke saath** samajhoge  
- ✅ string, number, boolean confidently use kar paoge
- ✅ Type inference ka concept samajh jaoge
- ✅ Real SDK code ke liye ready ho jaoge

---

## 📚 Part 1: समझाओ (Understanding Concepts)

### **🤔 What is a Variable?**

**Real Life Analogy:**

Imagine aap ke paas boxes (dabbe) hain:
```
📦 Box 1: naam = "phoneNumber", andar = "+923001234567"
📦 Box 2: naam = "userName", andar = "Talha"
📦 Box 3: naam = "age", andar = 25
```

**Programming Mein:**
- **Box** = Variable (storage container)
- **Box ka naam** = Variable name
- **Box mein jo rakha** = Value
- **Box kis type ka** = Data Type (numbers ke liye? text ke liye?)

**Visualization:**
```
┌─────────────────────┐
│  phoneNumber        │  ← Variable name
│  ─────────────────  │
│  "+923001234567"    │  ← Value stored
│  (type: string)     │  ← Data type
└─────────────────────┘
```

---

### **❓ Why Do We Need Variables?**

**Without Variables:**
```typescript
console.log("Sending message to +923001234567");
console.log("Message sent to +923001234567");
console.log("Delivery status for +923001234567");
// Problem: Repeat kar rahe hain! Agar change karna ho?
```

**With Variables:**
```typescript
let phoneNumber = "+923001234567";
console.log("Sending message to", phoneNumber);
console.log("Message sent to", phoneNumber);
console.log("Delivery status for", phoneNumber);
// Solution: Ek jagah change karo, sab jagah update!
```

**Benefits:**
1. ✅ Reusability - Ek baar store, multiple baar use
2. ✅ Maintainability - Ek jagah change, everywhere updated
3. ✅ Readability - Code samajhna easy ho jata hai

---

### **🎨 What are Types?**

**Problem Without Types (JavaScript):**
```javascript
// JavaScript - No type checking
let value = "100";           // Text
value = value + 50;          // What will this be?
console.log(value);          // "10050" 😱 (String + Number = String!)

// Function mein bhi problem
function sendMessage(phone, text) {
  console.log("Sending to", phone);
}
sendMessage("Hello", 123);   // 😱 Arguments ulta! No error!
```

**Solution With Types (TypeScript):**
```typescript
// TypeScript - Type checking
let value: number = 100;     // Clearly a number
// value = "text";           // ❌ Error! Can't assign string to number

function sendMessage(phone: string, text: string) {
  console.log("Sending to", phone);
}
// sendMessage("Hello", 123);  // ❌ Error! Wrong types!
sendMessage("+92300", "Hello"); // ✅ Correct!
```

**Types = Labels on Boxes**
```
📦 phoneNumber: string  ← Only text allowed
📦 age: number         ← Only numbers allowed  
📦 isActive: boolean   ← Only true/false allowed
```

---

### **📊 Three Basic Types**

#### **1️⃣ string - Text Data**

```typescript
let name: string = "Ali";
let city: string = "Karachi";
let message: string = "Hello World";
```

**Used For:**
- Names, addresses, messages
- Phone numbers (as text: "+923001234567")
- Any text data

**Common String Operations:**
```typescript
let text: string = "TypeScript";
text.toUpperCase()  // "TYPESCRIPT"
text.toLowerCase()  // "typescript"
text.length         // 10
text.includes("Type") // true
```

---

#### **2️⃣ number - All Numbers**

```typescript
let age: number = 25;
let price: number = 99.99;
let temperature: number = -5;
```

**Used For:**
- Age, count, quantity
- Prices, measurements
- Any numeric value

**Important:** TypeScript mein ek hi `number` type hai:
- No separate int/float
- No separate double/decimal
- Sab `number`!

**Common Number Operations:**
```typescript
let a: number = 10;
let b: number = 3;
a + b   // 13
a - b   // 7
a * b   // 30
a / b   // 3.333...
a % b   // 1 (remainder)
```

---

#### **3️⃣ boolean - True or False**

```typescript
let isActive: boolean = true;
let hasPermission: boolean = false;
```

**Used For:**
- Yes/No decisions
- On/Off switches
- Conditions (age >= 18, isLoggedIn, etc.)

**Only Two Values:**
- `true`
- `false`

**Common Boolean Operations:**
```typescript
let isAdult: boolean = age >= 18;       // Comparison
let canSend: boolean = isLoggedIn && isVerified;  // AND
let canAccess: boolean = isAdmin || isOwner;      // OR
let isBanned: boolean = !isActive;                // NOT
```

---

### **🧠 Type Inference - TypeScript is Smart!**

TypeScript ko type guess karna aata hai:

```typescript
// Explicit type (aap bata rahe ho)
let name: string = "Ali";

// Type inference (TypeScript samajh gaya!)
let city = "Karachi";  // TypeScript knows: city is string

// Hover over 'city' in VS Code - you'll see: let city: string
```

**When TypeScript Infers:**
```typescript
let count = 0;           // Inferred as number
let active = true;       // Inferred as boolean
let greeting = "Hello";  // Inferred as string
```

**TypeScript Remembers:**
```typescript
let value = 5;           // Inferred as number
// value = "text";       // ❌ Error! TypeScript remembers it's number
value = 10;              // ✅ OK - number to number
```

**When to Use Which:**
- ✅ **Let TypeScript infer** when it's obvious
- ✅ **Be explicit** in function parameters (required!)
- ✅ **Be explicit** when type isn't obvious

---

### **🔑 Variable Declaration Keywords**

TypeScript mein 3 keywords hain:

#### **let - Can Change**
```typescript
let score = 0;
score = 10;    // ✅ OK
score = 20;    // ✅ OK
```
**Use when:** Value change hogi

#### **const - Cannot Change**
```typescript
const apiKey = "secret_123";
// apiKey = "new_key";  // ❌ Error!
```
**Use when:** Value fixed hai, never change

#### **var - Don't Use!** 🚫
```typescript
var oldWay = "Outdated";  // ❌ Avoid!
```
**Rule:** Hamesha `let` ya `const` use karo

**Best Practice:**
```typescript
// ✅ Default to const
const API_URL = "https://api.example.com";
const MAX_RETRIES = 3;

// ✅ Use let only when needed
let currentPage = 1;
currentPage = 2;  // Changing, so let is correct
```

---

## 📝 Part 2: दिखाओ (Working Examples)

Ab working code dekhte hain. **Har example ko TYPE karo** (copy-paste nahi!).

### **Example 1: Basic Variable Declarations**

**File:** `examples/01-basic-variables.ts`

```typescript
// Example 1: Basic Variable Declarations
console.log("=== Variable Declarations ===\n");

// String variables
let firstName: string = "Muhammad";
let lastName: string = "Ali";
let city: string = "Karachi";

console.log("Name:", firstName, lastName);
console.log("City:", city);

// Number variables
let age: number = 25;
let salary: number = 75000;
let temperature: number = 32.5;

console.log("Age:", age);
console.log("Salary:", salary);
console.log("Temperature:", temperature, "°C");

// Boolean variables
let isStudent: boolean = true;
let hasLicense: boolean = false;
let isVerified: boolean = true;

console.log("Student?", isStudent);
console.log("License?", hasLicense);
console.log("Verified?", isVerified);

console.log("\n✅ Example 1 complete!");
```

**How to Run:**
```bash
npx tsc examples/01-basic-variables.ts
node examples/01-basic-variables.js
```

**Expected Output:**
```
=== Variable Declarations ===

Name: Muhammad Ali
City: Karachi
Age: 25
Salary: 75000
Temperature: 32.5 °C
Student? true
License? false
Verified? true

✅ Example 1 complete!
```

---

### **Example 2: Type Inference Magic**

**File:** `examples/02-type-inference.ts`

```typescript
// Example 2: Type Inference
console.log("=== Type Inference ===\n");

// No type annotations - TypeScript guesses!
let userName = "Ahmed";      // TypeScript: string
let userAge = 30;            // TypeScript: number
let isActive = true;         // TypeScript: boolean

console.log("Name:", userName, "- Type:", typeof userName);
console.log("Age:", userAge, "- Type:", typeof userAge);
console.log("Active:", isActive, "- Type:", typeof isActive);

// TypeScript REMEMBERS the inferred type
console.log("\n--- Type Safety ---");

// These work:
userName = "Hassan";         // ✅ string to string
userAge = 35;               // ✅ number to number
isActive = false;           // ✅ boolean to boolean

console.log("Updated Name:", userName);
console.log("Updated Age:", userAge);

// Uncomment to see errors:
// userName = 123;           // ❌ Error!
// userAge = "thirty";       // ❌ Error!
// isActive = "yes";         // ❌ Error!

console.log("\n✅ Example 2 complete!");
```

**Expected Output:**
```
=== Type Inference ===

Name: Ahmed - Type: string
Age: 30 - Type: number
Active: true - Type: boolean

--- Type Safety ---
Updated Name: Hassan
Updated Age: 35

✅ Example 2 complete!
```

---

### **Example 3: const vs let**

**File:** `examples/03-let-vs-const.ts`

```typescript
// Example 3: let vs const
console.log("=== let vs const ===\n");

// let - Can change (mutable)
console.log("--- Using let (changeable) ---");
let counter = 0;
console.log("Initial counter:", counter);

counter = 1;
console.log("After update:", counter);

counter = counter + 1;
console.log("After increment:", counter);

// const - Cannot change (immutable)
console.log("\n--- Using const (fixed) ---");
const API_KEY = "sk_abc123xyz";
const MAX_RETRIES = 3;
const API_VERSION = "v18.0";

console.log("API Key:", API_KEY);
console.log("Max Retries:", MAX_RETRIES);
console.log("API Version:", API_VERSION);

// Uncomment to see error:
// API_KEY = "new_key";     // ❌ Error! Cannot reassign const
// MAX_RETRIES = 5;         // ❌ Error! Cannot reassign const

console.log("\n💡 Rule: Use const by default, let when you need to change");
console.log("\n✅ Example 3 complete!");
```

**Expected Output:**
```
=== let vs const ===

--- Using let (changeable) ---
Initial counter: 0
After update: 1
After increment: 2

--- Using const (fixed) ---
API Key: sk_abc123xyz
Max Retries: 3
API Version: v18.0

💡 Rule: Use const by default, let when you need to change

✅ Example 3 complete!
```

---

### **Example 4: String Operations**

**File:** `examples/04-strings.ts`

```typescript
// Example 4: String Operations
console.log("=== String Operations ===\n");

let firstName: string = "Muhammad";
let lastName: string = "Ali";

// Concatenation
let fullName: string = firstName + " " + lastName;
console.log("Full Name:", fullName);

// Template literals (better!)
let greeting: string = `Hello, ${firstName} ${lastName}!`;
console.log("Greeting:", greeting);

// String methods
let message: string = "  TypeScript is Amazing!  ";
console.log("\nOriginal:", `"${message}"`);
console.log("Uppercase:", message.toUpperCase());
console.log("Lowercase:", message.toLowerCase());
console.log("Trimmed:", `"${message.trim()}"`);
console.log("Length:", message.length, "characters");

// String checking (SDK use case!)
console.log("\n--- Phone Number Validation ---");
let phone: string = "+923001234567";
console.log("Phone:", phone);
console.log("Starts with +?", phone.startsWith("+"));
console.log("Contains 300?", phone.includes("300"));
console.log("Length:", phone.length);

console.log("\n✅ Example 4 complete!");
```

**Expected Output:**
```
=== String Operations ===

Full Name: Muhammad Ali
Greeting: Hello, Muhammad Ali!

Original: "  TypeScript is Amazing!  "
Uppercase:   TYPESCRIPT IS AMAZING!  
Lowercase:   typescript is amazing!  
Trimmed: "TypeScript is Amazing!"
Length: 27 characters

--- Phone Number Validation ---
Phone: +923001234567
Starts with +? true
Contains 300? true
Length: 13

✅ Example 4 complete!
```

---

### **Example 5: Number Operations**

**File:** `examples/05-numbers.ts`

```typescript
// Example 5: Number Operations
console.log("=== Number Operations ===\n");

let price: number = 150;
let discount: number = 20;
let quantity: number = 3;

console.log("Price per item:", price);
console.log("Discount:", discount);
console.log("Quantity:", quantity);

// Calculations
let discountedPrice: number = price - discount;
let total: number = discountedPrice * quantity;

console.log("\nDiscounted Price:", discountedPrice);
console.log("Total for", quantity, "items:", total);

// Math operations
console.log("\n--- Math Operations ---");
let a: number = 10;
let b: number = 3;

console.log(a, "+", b, "=", a + b);
console.log(a, "-", b, "=", a - b);
console.log(a, "*", b, "=", a * b);
console.log(a, "/", b, "=", a / b);
console.log(a, "%", b, "=", a % b, "(remainder)");

// Rounding
console.log("\n--- Rounding ---");
let decimal: number = 99.7;
console.log("Original:", decimal);
console.log("Rounded:", Math.round(decimal));
console.log("Floor:", Math.floor(decimal));
console.log("Ceil:", Math.ceil(decimal));

console.log("\n✅ Example 5 complete!");
```

**Expected Output:**
```
=== Number Operations ===

Price per item: 150
Discount: 20
Quantity: 3

Discounted Price: 130
Total for 3 items: 390

--- Math Operations ---
10 + 3 = 13
10 - 3 = 7
10 * 3 = 30
10 / 3 = 3.3333333333333335
10 % 3 = 1 (remainder)

--- Rounding ---
Original: 99.7
Rounded: 100
Floor: 99
Ceil: 100

✅ Example 5 complete!
```

---

### **Example 6: Boolean Logic**

**File:** `examples/06-booleans.ts`

```typescript
// Example 6: Boolean Logic
console.log("=== Boolean Logic ===\n");

let isLoggedIn: boolean = true;
let isVerified: boolean = false;

console.log("Logged in?", isLoggedIn);
console.log("Verified?", isVerified);

// Comparisons
console.log("\n--- Comparisons ---");
let age: number = 25;

console.log("age =", age);
console.log("age >= 18?", age >= 18);
console.log("age < 18?", age < 18);
console.log("age === 25?", age === 25);
console.log("age !== 30?", age !== 30);

// Logical operators
console.log("\n--- Logical Operators ---");
let isAdult: boolean = age >= 18;
let hasID: boolean = true;

console.log("Is adult?", isAdult);
console.log("Has ID?", hasID);
console.log("Can enter (both)?", isAdult && hasID);    // AND
console.log("Can proceed (either)?", isAdult || hasID); // OR
console.log("Is minor?", !isAdult);                     // NOT

// SDK access control example
console.log("\n--- SDK Access Control ---");
let isAuthenticated: boolean = true;
let hasPermission: boolean = true;
let canSendMessage: boolean = isAuthenticated && hasPermission;

console.log("Authenticated:", isAuthenticated);
console.log("Has Permission:", hasPermission);
console.log("Can Send Message:", canSendMessage);

console.log("\n✅ Example 6 complete!");
```

**Expected Output:**
```
=== Boolean Logic ===

Logged in? true
Verified? false

--- Comparisons ---
age = 25
age >= 18? true
age < 18? false
age === 25? true
age !== 30? true

--- Logical Operators ---
Is adult? true
Has ID? true
Can enter (both)? true
Can proceed (either)? true
Is minor? false

--- SDK Access Control ---
Authenticated: true
Has Permission: true
Can Send Message: true

✅ Example 6 complete!
```

---

## ✅ Self-Check: Ready for Exercises?

Before starting exercises, verify:

- [ ] Samajh gaya: Variable kya hota hai?
- [ ] Samajh gaya: Types kyun important hain?
- [ ] string, number, boolean yaad hain?
- [ ] let vs const ka difference clear hai?
- [ ] Sabhi 6 examples run kar ke dekhe?

**If any ❌:** Re-read that section!  
**If all ✅:** Continue to EXERCISES.md!

---

**Next:** Complete EXERCISES.md for hands-on practice! 🚀
