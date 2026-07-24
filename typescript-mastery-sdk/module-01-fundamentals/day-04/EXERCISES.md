# Day 04 Exercises

Master objects and interfaces!

---

## 📝 Exercise 1: Basic Interfaces

**Goal:** Create interfaces for SDK data structures

**File:** `starter-code/exercise-1.ts`

**Tasks:**

1. Create interface `User` with:
   - name: string
   - email: string
   - phone: string
   - isVerified: boolean

2. Create interface `ClientConfig` with:
   - accessToken: string (required)
   - phoneNumberId: string (required)
   - apiVersion: string (optional)
   - timeout: number (optional)

3. Create two user objects and one config object using these interfaces

**Expected Output:**
```
User 1: { name: "Ali", email: "ali@test.com", ... }
Config: { accessToken: "token123", phoneNumberId: "phone123" }
```

---

## 📝 Exercise 2: Readonly Properties

**Goal:** Practice immutable properties

**File:** `starter-code/exercise-2.ts`

**Tasks:**

1. Create interface `Message` with:
   - id: string (readonly)
   - createdAt: number (readonly)
   - to: string (mutable)
   - text: string (mutable)
   - status: "pending" | "sent" | "delivered" (mutable)

2. Create function `createMessage(to: string, text: string): Message`
   - Generate random ID
   - Set createdAt to Date.now()
   - Set status to "pending"

3. Create function `updateMessageStatus(message: Message, status: Message["status"]): void`
   - Update the status property

4. Try to modify readonly properties (should error)

**Expected Output:**
```
Created: { id: "msg_...", createdAt: 1234567890, ... }
Updated status: sent
```

---

## 📝 Exercise 3: Extending Interfaces

**Goal:** Use interface inheritance

**File:** `starter-code/exercise-3.ts`

**Tasks:**

1. Create base interface `BaseMessage` with:
   - to: string
   - type: string

2. Create `TextMessage` extending `BaseMessage` with:
   - text: string
   - preview_url: boolean (optional)

3. Create `ImageMessage` extending `BaseMessage` with:
   - imageId: string
   - caption: string (optional)

4. Create one text message and one image message

**Expected Output:**
```
Text message: { to: "+923001234567", type: "text", text: "Hello" }
Image message: { to: "+923001234567", type: "image", imageId: "img_123" }
```

---

## 📝 Exercise 4: Methods in Interfaces

**Goal:** Define methods in interfaces

**File:** `starter-code/exercise-4.ts`

**Tasks:**

1. Create interface `PhoneValidator` with methods:
   - `isValid(phone: string): boolean`
   - `format(phone: string): string`
   - `getCountryCode(phone: string): string`

2. Create an object implementing `PhoneValidator`
   - `isValid`: check if starts with + and length >= 10
   - `format`: add +92 if missing
   - `getCountryCode`: extract first 2-3 digits after +

3. Test all methods

**Expected Output:**
```
Is valid: true
Formatted: +923001234567
Country code: 92
```

---

## 📝 Exercise 5: Complete SDK Config

**Goal:** Build production-ready config interface

**File:** `starter-code/exercise-5.ts`

**Tasks:**

1. Create interface `LoggerConfig` with:
   - level: "debug" | "info" | "warn" | "error"
   - enabled: boolean

2. Create interface `RetryConfig` with:
   - maxAttempts: number
   - backoffMs: number

3. Create interface `SDKConfig` with:
   - readonly apiKey: string
   - readonly phoneNumberId: string
   - apiVersion: string (optional, default "v1.0")
   - timeout: number (optional, default 30000)
   - logger: LoggerConfig (optional)
   - retry: RetryConfig (optional)

4. Create function `getDefaultConfig(apiKey: string, phoneNumberId: string): SDKConfig`
   - Return config with defaults

5. Create function `validateConfig(config: SDKConfig): boolean`
   - Check required fields exist
   - Check apiKey is not empty
   - Return true/false

**Expected Output:**
```
Default config: { apiKey: "key123", phoneNumberId: "phone123", apiVersion: "v1.0", ... }
Valid: true
```

---

## ✅ Completion Checklist

- [ ] Exercise 1: Basic interfaces (2 interfaces)
- [ ] Exercise 2: Readonly properties (1 interface, 2 functions)
- [ ] Exercise 3: Extending interfaces (3 interfaces)
- [ ] Exercise 4: Methods in interfaces (1 interface, 1 implementation)
- [ ] Exercise 5: Complete SDK config (3 interfaces, 2 functions)
- [ ] All files compile
- [ ] All outputs match expected
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

Create `starter-code/bonus.ts`:

**Webhook Payload Parser**

Real WhatsApp webhook payloads are deeply nested. Create interfaces for:

```typescript
interface WebhookMessage {
  from: string;
  id: string;
  timestamp: string;
  text?: { body: string };
  image?: { id: string; mime_type: string };
}

interface WebhookEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: string;
      metadata: { phone_number_id: string };
      messages?: WebhookMessage[];
    };
  }>;
}

interface WebhookPayload {
  object: string;
  entry: WebhookEntry[];
}

// Function to extract messages from payload
function extractMessages(payload: WebhookPayload): WebhookMessage[]
```

This is exactly how Meta sends webhook data! 🚀

---

Interfaces master ban jao! 💪
