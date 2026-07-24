# 📝 Day 01: Exercises (Redesigned - Better Pedagogy)

**⚠️ Important:** Read **LESSON.md** completely before starting exercises!

---

## 🎯 Exercise Structure

**Progressive Difficulty:**
- **Part 3:** साथ करो (Guided) - Fill-in-blanks ⭐
- **Part 4:** खुद करो (Independent) - From scratch ⭐⭐⭐

---

## 📚 Part 3: साथ करो (Guided Practice)

Yeh exercises **bohot easy** hain. Code ka structure diya hai, aap **blanks fill** karo.

### **Exercise 1: Variable Declarations** ⭐

**Goal:** Practice variable declaration with types

**File:** `exercises/exercise-1.ts`

```typescript
// Exercise 1: Variable Declarations
// Fill in the BLANKS (replace _____ with correct answer)

console.log("=== Exercise 1: Variable Declarations ===\n");

// TODO: Declare variable 'myName' of type string with your name
let myName: _____ = "Your Name Here";

// TODO: Declare variable 'myAge' of type number with your age  
let myAge: _____ = 25;

// TODO: Declare variable 'isLearning' of type boolean, set to true
let isLearning: _____ = true;

// TODO: Declare variable 'myCity' of type string with your city
let myCity: _____ = "Your City";

// Print all values
console.log("Name:", myName);
console.log("Age:", myAge);
console.log("Learning TypeScript:", isLearning);
console.log("City:", myCity);

console.log("\n✅ Exercise 1 complete!");
```

**Hints:**
- Text values → `string`
- Number values → `number`
- True/False → `boolean`

**Expected Output:**
```
=== Exercise 1: Variable Declarations ===

Name: Your Name Here
Age: 25
Learning TypeScript: true
City: Your City

✅ Exercise 1 complete!
```

---

### **Exercise 2: Type Inference** ⭐

**Goal:** Let TypeScript infer types automatically

**File:** `exercises/exercise-2.ts`

```typescript
// Exercise 2: Type Inference
// Don't write types - let TypeScript guess!

console.log("=== Exercise 2: Type Inference ===\n");

// TODO: Create 'phoneNumber' with value "+923001234567" (NO type annotation!)
let phoneNumber = "_____";

// TODO: Create 'messageCount' with value 10 (NO type annotation!)
let messageCount = _____;

// TODO: Create 'hasAccess' with value true (NO type annotation!)
let hasAccess = _____;

// Print with types
console.log("Phone:", phoneNumber, "| Type:", typeof phoneNumber);
console.log("Count:", messageCount, "| Type:", typeof messageCount);
console.log("Access:", hasAccess, "| Type:", typeof hasAccess);

// Try changing (uncomment to see error):
// phoneNumber = 123;  // Should give error!

console.log("\n✅ Exercise 2 complete!");
```

**Hints:**
- Just write the value, TypeScript will figure out the type!
- No `:` needed

**Expected Output:**
```
=== Exercise 2: Type Inference ===

Phone: +923001234567 | Type: string
Count: 10 | Type: number
Access: true | Type: boolean

✅ Exercise 2 complete!
```

---

### **Exercise 3: let vs const** ⭐⭐

**Goal:** Choose correct keyword

**File:** `exercises/exercise-3.ts`

```typescript
// Exercise 3: let vs const
// Choose: let or const?

console.log("=== Exercise 3: let vs const ===\n");

// TODO: This will change - use let or const?
_____ score = 0;
console.log("Initial score:", score);

score = 10;  // Changing value
console.log("Updated score:", score);

// TODO: This should NEVER change - use let or const?
_____ MAX_USERS = 100;
console.log("Max users:", MAX_USERS);

// TODO: Which one for these?
_____ apiKey = "sk_test_123";     // Fixed, never changes
_____ currentPage = 1;             // Will change
_____ PI = 3.14159;                // Mathematical constant

console.log("API Key:", apiKey);
console.log("Page:", currentPage);
console.log("PI:", PI);

console.log("\n✅ Exercise 3 complete!");
```

**Hints:**
- Value changes? → `let`
- Value fixed? → `const`

---

### **Exercise 4: String Practice** ⭐⭐

**Goal:** Work with string operations

**File:** `exercises/exercise-4.ts`

```typescript
// Exercise 4: String Practice

console.log("=== Exercise 4: String Practice ===\n");

let firstName: string = "Muhammad";
let lastName: string = "Ahmed";

// TODO: Combine firstName + space + lastName
let fullName: string = firstName + _____ + lastName;
console.log("Full name:", fullName);

// TODO: Create greeting with template literal
let greeting: string = `Hello, ${_____} ${_____}!`;
console.log("Greeting:", greeting);

// TODO: Convert to UPPERCASE
let upperName: string = fullName.___________();
console.log("Uppercase:", upperName);

// TODO: Check if fullName includes "Ahmed"
let hasAhmed: boolean = fullName.___________("Ahmed");
console.log("Contains Ahmed?", hasAhmed);

console.log("\n✅ Exercise 4 complete!");
```

**Hints:**
- Space: `" "`
- Template: `${variable}`
- Methods: `.toUpperCase()`, `.includes()`

---

### **Exercise 5: Number Practice** ⭐⭐

**Goal:** Work with number operations

**File:** `exercises/exercise-5.ts`

```typescript
// Exercise 5: Number Practice

console.log("=== Exercise 5: Number Practice ===\n");

let itemPrice: number = 200;
let discountAmount: number = 50;
let quantity: number = 3;

// TODO: Calculate final price (itemPrice - discountAmount)
let finalPrice: number = itemPrice _____ discountAmount;
console.log("Price after discount:", finalPrice);

// TODO: Calculate total (finalPrice * quantity)
let total: number = finalPrice _____ quantity;
console.log("Total for", quantity, "items:", total);

// TODO: Round 99.7 to nearest integer
let value: number = 99.7;
let rounded: number = Math._____(value);
console.log("Rounded:", rounded);

// TODO: Check if finalPrice is less than 200
let isDiscounted: boolean = finalPrice _____ 200;
console.log("Is discounted?", isDiscounted);

console.log("\n✅ Exercise 5 complete!");
```

**Hints:**
- Math: `-`, `*`
- Rounding: `Math.round()`
- Comparison: `<`

---

## 🎯 Part 4: खुद करो (Independent Practice)

Ab **from scratch** likho! Poora code khud banao.

### **Exercise 6: Your Developer Profile** ⭐⭐

**Goal:** Create your information card

**Instructions:**
1. Create 5 variables for YOUR info:
   - `developerName` (string) - Your name
   - `age` (number) - Your age
   - `city` (string) - Your city
   - `isLearningTS` (boolean) - true
   - `yearsOfExperience` (number) - Your experience

2. Print all nicely formatted

3. Create greeting: "Hi! I'm [name] from [city]"

**Starter Template:**
```typescript
// Exercise 6: Developer Profile
console.log("=== My Developer Profile ===\n");

// TODO: Your code here

```

**Example Output:**
```
=== My Developer Profile ===

Name: Talha Shaikh
Age: 25
City: Karachi
Learning TypeScript: true
Experience: 2 years

Greeting: Hi! I'm Talha Shaikh from Karachi
```

---

### **Exercise 7: Phone Validator** ⭐⭐⭐

**Goal:** Validate E.164 phone format (Real SDK task!)

**Background:** WhatsApp needs phone in format: `+CountryCodeNumber`

**Instructions:**
1. Create `phone` = "+923001234567"
2. Check if starts with "+" → `startsWithPlus` (boolean)
3. Get phone length → `phoneLength` (number)
4. Check if length >= 10 → `hasValidLength` (boolean)
5. Both must be true → `isValid` (boolean)
6. Print all results

**Starter Template:**
```typescript
// Exercise 7: Phone Validator (SDK Task!)
console.log("=== Phone Number Validator ===\n");

let phone: string = "+923001234567";

// TODO: Your validation logic here

```

**Expected Output:**
```
=== Phone Number Validator ===

Phone: +923001234567
Starts with +? true
Length: 13
Valid length (>=10)? true
✅ Phone is valid!
```

**Hints:**
- `.startsWith("+")`
- `.length`
- `&&` for "both must be true"

---

### **Exercise 8: Price Calculator** ⭐⭐⭐

**Goal:** Calculate shopping bill

**Instructions:**
1. Create variables:
   - `itemPrice` = 500
   - `quantity` = 4
   - `taxRate` = 0.17 (17%)

2. Calculate:
   - `subtotal` = price × quantity
   - `tax` = subtotal × taxRate
   - `total` = subtotal + tax

3. Print all values nicely

**Starter Template:**
```typescript
// Exercise 8: Price Calculator
console.log("=== Price Calculator ===\n");

// TODO: Your code here

```

**Expected Output:**
```
=== Price Calculator ===

Item price: 500
Quantity: 4
Subtotal: 2000
Tax (17%): 340
Total: 2340
```

---

### **Exercise 9: Message Formatter** ⭐⭐⭐

**Goal:** Format WhatsApp-style message

**Instructions:**
1. Create:
   - `sender` = "Ali"
   - `recipient` = "Ahmed"  
   - `messageText` = "Hello, how are you?"
   - `timestamp` = 1234567890

2. Format: `[timestamp] sender → recipient: "message"`

3. Also show:
   - Uppercase version
   - Message length

**Starter Template:**
```typescript
// Exercise 9: Message Formatter
console.log("=== Message Formatter ===\n");

// TODO: Your code here

```

**Expected Output:**
```
=== Message Formatter ===

Original: [1234567890] Ali → Ahmed: "Hello, how are you?"
Uppercase: [1234567890] ALI → AHMED: "HELLO, HOW ARE YOU?"
Message length: 20 characters
```

---

### **Exercise 10: Access Control** ⭐⭐⭐⭐

**Goal:** Complex boolean logic (Challenging!)

**Instructions:**
1. Create user data:
   - `userAge` = 25
   - `isLoggedIn` = true
   - `hasSubscription` = true
   - `emailVerified` = false

2. Create checks:
   - `isAdult` = age >= 18
   - `canPost` = isLoggedIn AND emailVerified
   - `canAccessPremium` = isLoggedIn AND hasSubscription
   - `hasFullAccess` = isAdult AND isLoggedIn AND hasSubscription AND emailVerified

3. Print all with explanations

**Starter Template:**
```typescript
// Exercise 10: Access Control (Challenging!)
console.log("=== Access Control System ===\n");

// TODO: Your code here

```

**Expected Output:**
```
=== Access Control System ===

User age: 25
Is adult: true ✅
Can post messages: false ❌ (email not verified)
Can access premium: true ✅
Has full access: false ❌ (email verification required)
```

---

## ✅ Completion Checklist

**Part 3 - Guided (5 exercises):**
- [ ] Exercise 1: Variables ✓
- [ ] Exercise 2: Inference ✓
- [ ] Exercise 3: let vs const ✓
- [ ] Exercise 4: Strings ✓
- [ ] Exercise 5: Numbers ✓

**Part 4 - Independent (5 exercises):**
- [ ] Exercise 6: Profile ✓
- [ ] Exercise 7: Phone validator ✓
- [ ] Exercise 8: Calculator ✓
- [ ] Exercise 9: Formatter ✓
- [ ] Exercise 10: Access control ✓

**Final Check:**
- [ ] All exercises compile (`npx tsc`)
- [ ] All outputs match expected
- [ ] Concepts understood
- [ ] Ready for Day 02!

---

## 🆘 Common Errors & Solutions

### **Error:** `Type 'X' is not assignable to type 'Y'`
**Cause:** Wrong type used  
**Fix:** Check if string/number/boolean correct hai

### **Error:** `Cannot find name 'X'`
**Cause:** Variable declare nahi kiya  
**Fix:** `let` ya `const` use karo

### **Error:** `Cannot assign to 'X' because it is a constant`
**Cause:** `const` variable change kar rahe ho  
**Fix:** `const` ko `let` bana do agar change karna hai

### **Error:** `Property 'X' does not exist`
**Cause:** Method ka naam galat  
**Fix:** Check spelling - `.toUpperCase()`, `.includes()`, etc.

---

## 💡 Tips for Success

1. **Type Code Yourself** - Copy-paste na karo
2. **Run Each Exercise** - Compile aur output dekho
3. **Experiment** - Values change karke dekho kya hota hai
4. **Read Errors** - TypeScript ka error message helpful hai
5. **Compare Solutions** - Sirf try karne ke BAAD dekho

---

## 🎯 What's Next?

Complete all exercises, then:

**Day 02:** Arrays aur Functions (Coming next!)

But pehle **yeh saare complete karo**! Practice is key! 💪

**Solutions:** `solutions/day-01/` (Check after trying!)

---

Keep coding! 🚀
