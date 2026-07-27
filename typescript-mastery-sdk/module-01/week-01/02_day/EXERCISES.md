# Day 02 Exercises

Practice type inference and basic types!

---

## 📝 Exercise 1: Type Inference Practice

**Goal:** Understand when TypeScript infers types

**File:** `starter-code/exercise-1.ts`

**Tasks:**

1. Create these variables WITHOUT type annotations (let TypeScript infer):
   - `userName` with value "Ahmed"
   - `userAge` with value 30
   - `isVerified` with value true

2. Hover over each variable in VS Code to see the inferred type

3. Try to assign wrong types and see the errors:
   ```typescript
   userName = 123; // Should error
   ```

4. Create a function `double` that takes a number and returns its double. Don't annotate the return type - let TypeScript infer it.

**Expected Output:**
```
Ahmed
30
true
Double of 5: 10
```

---

## 📝 Exercise 2: String Manipulation for SDK

**Goal:** Practice string operations needed for SDK

**File:** `starter-code/exercise-2.ts`

**Tasks:**

Create these functions:

1. `normalizePhoneNumber(phone: string): string`
   - Remove spaces and dashes from phone number
   - Example: "+92 300-1234567" → "+923001234567"

2. `truncateMessage(message: string, maxLength: number): string`
   - If message is longer than maxLength, truncate and add "..."
   - Example: "Hello World", 8 → "Hello..."

3. `createMessageId(): string`
   - Generate a random message ID
   - Use current timestamp + random number
   - Example: "msg_1234567890_4567"

**Expected Output:**
```
Normalized: +923001234567
Truncated: Hello...
Message ID: msg_1234567890_4567
```

**Hints:**
- `string.replace(/[- ]/g, '')` removes spaces and dashes
- `string.slice(0, maxLength)` gets first N characters
- `Date.now()` gets current timestamp
- `Math.random()` generates random number

---

## 📝 Exercise 3: Number Operations for SDK

**Goal:** Practice number operations for rate limiting and retries

**File:** `starter-code/exercise-3.ts`

**Tasks:**

Create these functions:

1. `calculateRetryDelay(attempt: number): number`
   - Exponential backoff: 2^attempt * 1000 milliseconds
   - Example: attempt 0 → 1000ms, attempt 1 → 2000ms, attempt 2 → 4000ms

2. `isWithinRateLimit(messageCount: number, timeWindow: number, maxMessages: number): boolean`
   - Check if we can send more messages
   - Return true if messageCount < maxMessages

3. `calculatePercentage(sent: number, total: number): number`
   - Calculate success percentage
   - Round to 2 decimal places
   - Example: 75 sent, 100 total → 75.00

**Expected Output:**
```
Retry delay for attempt 0: 1000ms
Retry delay for attempt 1: 2000ms
Retry delay for attempt 2: 4000ms
Within rate limit: true
Success rate: 75.00%
```

**Hints:**
- `Math.pow(2, attempt)` for exponential
- `number.toFixed(2)` for rounding (but returns string!)
- `parseFloat()` to convert back to number

---

## 📝 Exercise 4: Type Safety with unknown

**Goal:** Practice safe type handling with unknown

**File:** `starter-code/exercise-4.ts`

**Tasks:**

Create a function `parseWebhookData(data: unknown): string` that:

1. If data is a string, return it as-is
2. If data is a number, convert to string
3. If data is an object (and not null), return JSON.stringify(data)
4. Otherwise, throw an Error with message "Invalid data type"

**Test cases:**
```typescript
console.log(parseWebhookData("hello"));           // "hello"
console.log(parseWebhookData(123));               // "123"
console.log(parseWebhookData({ msg: "hi" }));     // {"msg":"hi"}
console.log(parseWebhookData(null));              // Error!
```

**Hints:**
- Use `typeof` to check types
- Check `data !== null` before checking object
- `JSON.stringify()` converts object to string

---

## 📝 Exercise 5: Boolean Logic for Validation

**Goal:** Practice boolean operations for SDK validation

**File:** `starter-code/exercise-5.ts`

**Tasks:**

Create these validation functions:

1. `isValidPhoneNumber(phone: string): boolean`
   - Must start with '+'
   - Must be at least 10 characters
   - Must contain only digits (after +)

2. `isValidMessage(text: string): boolean`
   - Must not be empty
   - Must be <= 4096 characters (WhatsApp limit)

3. `canSendMessage(isAuthenticated: boolean, hasQuota: boolean, isValidPhone: boolean): boolean`
   - Return true only if ALL conditions are true

**Expected Output:**
```
Valid phone: true
Valid phone: false (too short)
Valid message: true
Valid message: false (too long)
Can send: true
Can send: false (not authenticated)
```

**Hints:**
- Use `&&` for "AND" logic
- Use `phone.length` for length check
- Use regex `/^\+\d+$/.test(phone)` to check if only digits after +

---

## ✅ Completion Checklist

- [ ] Exercise 1: Type inference (4 parts)
- [ ] Exercise 2: String manipulation (3 functions)
- [ ] Exercise 3: Number operations (3 functions)
- [ ] Exercise 4: unknown type handling
- [ ] Exercise 5: Boolean validation (3 functions)
- [ ] All files compile: `npx tsc`
- [ ] All outputs correct
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

Create `starter-code/bonus.ts`:

**SDK Config Validator**

Create a function that validates SDK configuration:

```typescript
type SDKConfig = {
  accessToken: string;
  phoneNumberId: string;
  maxRetries: number;
  enableLogging: boolean;
};

function validateSDKConfig(config: unknown): config is SDKConfig {
  // Check if config is valid SDKConfig
  // Return true if valid, false otherwise
}
```

**Test cases:**
- Valid config → true
- Missing fields → false
- Wrong types → false

This is a real function you'll need in your SDK! 🚀

---

Remember: Try everything yourself first! 💪
