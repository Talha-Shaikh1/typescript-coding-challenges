# Day 05 Exercises

Master functions in TypeScript!

---

## 📝 Exercise 1: Parameter Types

**Goal:** Practice required, optional, and default parameters

**File:** `starter-code/exercise-1.ts`

**Tasks:**

1. Create function `sendMessage` with:
   - `to: string` (required)
   - `text: string` (required)
   - `preview_url: boolean = false` (default)
   - `notification: boolean = true` (default)
   - Returns object with all parameters

2. Create function `initClient` with:
   - `apiKey: string` (required)
   - `phoneId: string` (required)
   - `timeout?: number` (optional)
   - `retries?: number` (optional)
   - Log all values (use ?? for defaults: timeout=30000, retries=3)

3. Test both functions with different parameter combinations

**Expected Output:**
```
Message: { to: "+92300", text: "Hello", preview_url: false, notification: true }
Client: apiKey: "key123", timeout: 30000, retries: 3
```

---

## 📝 Exercise 2: Rest Parameters

**Goal:** Handle variable arguments

**File:** `starter-code/exercise-2.ts`

**Tasks:**

1. Create function `sendBulk(text: string, ...phones: string[]): number`
   - Send same text to multiple recipients
   - Return count of recipients

2. Create function `calculateStats(...numbers: number[]): object`
   - Return `{ sum, average, min, max }`

3. Create function `logWithTimestamp(level: string, ...messages: string[]): void`
   - Format: "[TIMESTAMP] [LEVEL] message1 message2..."

**Expected Output:**
```
Sent to 3 recipients
Stats: { sum: 15, average: 5, min: 1, max: 9 }
[2024-01-01T10:00:00] [INFO] Server started successfully
```

---

## 📝 Exercise 3: Function Types and Callbacks

**Goal:** Work with function types

**File:** `starter-code/exercise-3.ts`

**Tasks:**

1. Create type alias `MessageCallback = (success: boolean, messageId?: string) => void`

2. Create function `sendWithCallback`:
   - Parameters: `phone: string`, `text: string`, `callback: MessageCallback`
   - Simulate async: `setTimeout` 1 second
   - If phone starts with '+', call callback with success=true, id="wamid_123"
   - Otherwise callback with success=false

3. Create type `TransformFunction = (text: string) => string`

4. Create function `sendTransformed`:
   - Parameters: `phone: string`, `text: string`, `transform: TransformFunction`
   - Apply transform to text before "sending"

**Expected Output:**
```
Callback: Success! ID: wamid_123
Transformed: Sending "HELLO WORLD" to +92300
```

---

## 📝 Exercise 4: Async Functions

**Goal:** Practice async/await patterns

**File:** `starter-code/exercise-4.ts`

**Tasks:**

1. Create `async function fetchUser(id: string): Promise<{name: string, phone: string}>`
   - Simulate delay with `setTimeout` wrapped in Promise
   - Return user object

2. Create `async function sendMessage(to: string, text: string): Promise<{success: boolean, id?: string}>`
   - Simulate API call
   - Return success object

3. Create `async function sendToUser(userId: string, text: string): Promise<void>`
   - Fetch user first
   - Then send message to user's phone
   - Log results

**Expected Output:**
```
User fetched: { name: "Ali", phone: "+92300" }
Message sent: { success: true, id: "wamid_123" }
```

---

## 📝 Exercise 5: Function Overloading

**Goal:** Create overloaded functions

**File:** `starter-code/exercise-5.ts`

**Tasks:**

Create overloaded `sendMessage` function:

1. Overload 1: `(phone: string, text: string): string`
   - Send text message

2. Overload 2: `(phone: string, mediaId: string, caption: string): string`
   - Send media message

3. Implementation handles both cases

4. Test both overloads

**Expected Output:**
```
Text message sent to +92300: Hello
Media message sent to +92300: media_123 with caption "Check this"
```

---

## ✅ Completion Checklist

- [ ] Exercise 1: Parameter types (2 functions)
- [ ] Exercise 2: Rest parameters (3 functions)
- [ ] Exercise 3: Callbacks (2 types, 2 functions)
- [ ] Exercise 4: Async functions (3 async functions)
- [ ] Exercise 5: Function overloading (1 overloaded function)
- [ ] All files compile
- [ ] All outputs match expected
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

Create `starter-code/bonus.ts`:

**Retry Mechanism with Callbacks**

```typescript
type RetryCallback = (attempt: number, success: boolean) => void;

async function sendWithRetry(
  phone: string,
  text: string,
  maxRetries: number = 3,
  onRetry?: RetryCallback
): Promise<boolean> {
  // Implement retry logic
  // Call onRetry callback on each attempt
  // Return true if eventually successful
}
```

This is a real pattern used in production SDKs! 🚀

---

Functions complete karo! 💪
