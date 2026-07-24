# Day 03 Exercises

Master arrays, tuples, and type aliases!

---

## 📝 Exercise 1: Array Operations

**Goal:** Practice array methods for SDK use cases

**File:** `starter-code/exercise-1.ts`

**Tasks:**

Create these functions:

1. `filterValidPhoneNumbers(phones: string[]): string[]`
   - Filter array to keep only valid phone numbers
   - Valid = starts with '+' and length >= 10

2. `getPhoneNumbersFromUsers(users: Array<{name: string, phone: string}>): string[]`
   - Extract just phone numbers from user objects
   - Use map()

3. `countSuccessfulMessages(messages: Array<{status: string}>): number`
   - Count how many messages have status "sent"
   - Use filter() and length, or reduce()

**Expected Output:**
```
Valid phones: ["+923001234567", "+14155552671"]
User phones: ["+923001234567", "+923001234568"]
Successful count: 3
```

---

## 📝 Exercise 2: Tuples for Function Returns

**Goal:** Use tuples to return multiple values

**File:** `starter-code/exercise-2.ts`

**Tasks:**

Create these functions that return tuples:

1. `validateAndFormatPhone(phone: string): [boolean, string]`
   - Return [isValid, formattedPhone]
   - If valid, format by adding +92 if missing
   - If invalid, return [false, original phone]

2. `sendBulkMessages(recipients: string[]): [number, number, number]`
   - Simulate sending to multiple recipients
   - Return [sent, failed, total]
   - For now, assume 80% success rate

3. `getRateLimitStatus(): [number, number, boolean]`
   - Return [currentCount, maxLimit, canSend]
   - Example: [75, 80, true]

**Expected Output:**
```
Valid: true, Formatted: +923001234567
Invalid: false, Original: abc123
Bulk send: sent=8, failed=2, total=10
Rate limit: 75/80, can send: true
```

---

## 📝 Exercise 3: Type Aliases for SDK

**Goal:** Create reusable types for SDK

**File:** `starter-code/exercise-3.ts`

**Tasks:**

Create these type aliases:

1. `PhoneNumber` - alias for string
2. `MessageID` - alias for string
3. `Timestamp` - alias for number
4. `MessageStatus` - union: "queued" | "sent" | "delivered" | "failed"
5. `WhatsAppMessage` - object type with:
   - id: MessageID
   - to: PhoneNumber
   - text: string
   - status: MessageStatus
   - sentAt: Timestamp

Then create:
- A function `createMessage(to: PhoneNumber, text: string): WhatsAppMessage`
- A function `isDelivered(message: WhatsAppMessage): boolean`

**Expected Output:**
```
Message created: { id: "msg_...", to: "+923001234567", ... }
Is delivered: false
```

---

## 📝 Exercise 4: Readonly Configuration

**Goal:** Create immutable config arrays

**File:** `starter-code/exercise-4.ts`

**Tasks:**

1. Create readonly array `SUPPORTED_MESSAGE_TYPES`
   - Values: ["text", "image", "video", "audio", "document"]

2. Create function `isSupportedMessageType(type: string): boolean`
   - Check if type is in SUPPORTED_MESSAGE_TYPES

3. Create readonly array `API_VERSIONS`
   - Type: readonly [number, number][]
   - Values: [[1, 0], [1, 1], [2, 0]]

4. Create function `getLatestVersion(): [number, number]`
   - Return last element from API_VERSIONS

**Expected Output:**
```
Supported type 'text': true
Supported type 'sticker': false
Latest version: [2, 0]
```

---

## 📝 Exercise 5: Message Queue System

**Goal:** Build a message queue with arrays and types

**File:** `starter-code/exercise-5.ts`

**Tasks:**

1. Create type alias `QueuedMessage` with:
   - id: string
   - to: string
   - text: string
   - status: "pending" | "sending" | "sent" | "failed"
   - attempts: number

2. Create class `MessageQueue`:
   ```typescript
   class MessageQueue {
     private messages: QueuedMessage[] = [];
     
     add(to: string, text: string): void {
       // Add new message with status "pending"
     }
     
     getPending(): QueuedMessage[] {
       // Return all pending messages
     }
     
     markAsSent(id: string): void {
       // Update message status to "sent"
     }
     
     getStats(): [number, number, number] {
       // Return [pending, sent, failed] counts
     }
   }
   ```

**Expected Output:**
```
Added 3 messages
Pending: 3
After sending: Pending: 2, Sent: 1
Stats: [2, 1, 0]
```

---

## ✅ Completion Checklist

- [ ] Exercise 1: Array operations (3 functions)
- [ ] Exercise 2: Tuple returns (3 functions)
- [ ] Exercise 3: Type aliases (5 types, 2 functions)
- [ ] Exercise 4: Readonly config (2 arrays, 2 functions)
- [ ] Exercise 5: Message queue (1 type, 1 class)
- [ ] All files compile
- [ ] All outputs match expected
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

Create `starter-code/bonus.ts`:

**Priority Queue System**

Implement a priority queue for messages:

```typescript
type Priority = "low" | "normal" | "high";

type PriorityMessage = {
  id: string;
  to: string;
  text: string;
  priority: Priority;
};

class PriorityQueue {
  // Store messages by priority
  // Implement: add(), getNext(), isEmpty()
  // getNext() should return highest priority message first
}
```

This is useful for urgent messages (OTPs, alerts) vs normal messages!

---

Keep practicing! Arrays are everywhere in SDK! 💪
