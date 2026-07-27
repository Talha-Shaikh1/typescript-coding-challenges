# Day 06 Exercises

Master union and intersection types!

---

## 📝 Exercise 1: Basic Union Types

**Goal:** Practice union types and type narrowing

**File:** `starter-code/exercise-1.ts`

**Tasks:**

1. Create type `MessageID = string | number`

2. Create type `Status = "pending" | "sent" | "delivered" | "failed"`

3. Create function `logMessage(id: MessageID, status: Status): void`
   - Log both values

4. Create function `formatID(id: MessageID): string`
   - If string, return as-is
   - If number, return as `"msg_${id}"`

**Expected Output:**
```
Message abc123: sent
Message msg_456: delivered
```

---

## 📝 Exercise 2: Type Guards

**Goal:** Create type guards for safe type checking

**File:** `starter-code/exercise-2.ts`

**Tasks:**

1. Create custom type guard `isString(value: unknown): value is string`

2. Create custom type guard `isValidPhone(value: unknown): value is string`
   - Check if string AND starts with '+' AND length >= 10

3. Create function `processInput(value: unknown): string`
   - Use type guards to safely process
   - If valid phone, return formatted
   - If string (but not valid phone), return uppercase
   - Otherwise return "Invalid input"

**Expected Output:**
```
Valid phone: +923001234567
String: HELLO
Invalid input
```

---

## 📝 Exercise 3: Discriminated Unions

**Goal:** Work with discriminated unions

**File:** `starter-code/exercise-3.ts`

**Tasks:**

1. Create interfaces:
```typescript
interface TextMessage {
  type: "text";
  to: string;
  text: string;
}

interface ImageMessage {
  type: "image";
  to: string;
  imageId: string;
  caption?: string;
}

interface VideoMessage {
  type: "video";
  to: string;
  videoId: string;
  caption?: string;
}
```

2. Create type `Message = TextMessage | ImageMessage | VideoMessage`

3. Create function `sendMessage(message: Message): string`
   - Use switch on message.type
   - Return appropriate string for each type

**Expected Output:**
```
Sending text "Hello" to +92300
Sending image img_123 to +92300
Sending video vid_456 to +92300 with caption "Watch"
```

---

## 📝 Exercise 4: Intersection Types

**Goal:** Combine types with intersections

**File:** `starter-code/exercise-4.ts`

**Tasks:**

1. Create interfaces:
```typescript
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Message {
  to: string;
  text: string;
}
```

2. Create type `TrackedMessage = Message & Identifiable & Timestamped`

3. Create function `createTrackedMessage(to: string, text: string): TrackedMessage`
   - Generate ID
   - Set timestamps to Date.now()

**Expected Output:**
```
Tracked message: { id: "msg_...", to: "+92300", text: "Hello", createdAt: ..., updatedAt: ... }
```

---

## 📝 Exercise 5: Complex Union Pattern

**Goal:** Build a complete API response pattern

**File:** `starter-code/exercise-5.ts`

**Tasks:**

1. Create interfaces:
```typescript
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: {
    messageId: string;
    timestamp: number;
  };
}

interface ErrorState {
  status: "error";
  error: {
    code: string;
    message: string;
  };
}
```

2. Create type `APIState = LoadingState | SuccessState | ErrorState`

3. Create function `handleState(state: APIState): string`
   - Return appropriate message for each status

4. Create type guard `isSuccessState(state: APIState): state is SuccessState`

**Expected Output:**
```
Loading...
Success! Message ID: wamid_123
Error: INVALID_PHONE - Phone number invalid
```

---

## ✅ Completion Checklist

- [ ] Exercise 1: Union types (2 types, 2 functions)
- [ ] Exercise 2: Type guards (2 guards, 1 function)
- [ ] Exercise 3: Discriminated unions (3 interfaces, 1 function)
- [ ] Exercise 4: Intersection types (3 interfaces, 1 function)
- [ ] Exercise 5: Complex pattern (3 interfaces, 2 functions)
- [ ] All files compile
- [ ] All outputs match expected
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

Create `starter-code/bonus.ts`:

**Result Type Pattern**

```typescript
type Result<T, E = Error> = 
  | { ok: true; value: T }
  | { ok: false; error: E };

// Create functions that return Result
function sendMessage(phone: string): Result<string, string> {
  // Return Result type
}

// Function to unwrap Result
function unwrap<T, E>(result: Result<T, E>): T | never {
  // If ok, return value
  // If not ok, throw error
}
```

This is a professional error handling pattern! 🚀

---

Union master ban jao! 💪
