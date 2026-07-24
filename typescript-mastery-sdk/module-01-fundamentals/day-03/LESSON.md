# 📘 Day 03: Arrays, Tuples & Type Aliases

**Module:** Fundamentals (Week 1)
**Duration:** 1-2 hours
**Goal:** Arrays aur Tuples ko mastery level pe samajhna

---

## 🎯 Today's Objectives

By the end of today, you will:
- ✅ Arrays ko deeply samajhoge (typed arrays, methods)
- ✅ Tuples kya hain aur kab use karte hain
- ✅ Type Aliases banana aur use karna
- ✅ readonly arrays aur tuples
- ✅ SDK ke liye reusable types banayenge

---

## 📚 Theory

### **Arrays in TypeScript**

Array ek list hai jisme same type ke multiple values hote hain.

**Basic Syntax:**
```typescript
// Method 1: Type annotation
let numbers: number[] = [1, 2, 3, 4, 5];

// Method 2: Generic syntax (same thing)
let names: Array<string> = ["Ali", "Ahmed", "Hassan"];

// Type inference
let cities = ["Karachi", "Lahore"];  // TypeScript infers: string[]
```

---

### **Array Methods (Important for SDK)**

```typescript
let numbers: number[] = [1, 2, 3, 4, 5];

// Adding elements
numbers.push(6);              // [1, 2, 3, 4, 5, 6]
numbers.unshift(0);           // [0, 1, 2, 3, 4, 5, 6]

// Removing elements
numbers.pop();                // [0, 1, 2, 3, 4, 5]
numbers.shift();              // [1, 2, 3, 4, 5]

// Finding elements
let index = numbers.indexOf(3);     // 2
let exists = numbers.includes(3);   // true

// Transforming arrays
let doubled = numbers.map(n => n * 2);           // [2, 4, 6, 8, 10]
let evens = numbers.filter(n => n % 2 === 0);    // [2, 4]
let sum = numbers.reduce((acc, n) => acc + n, 0); // 15

// Sorting
numbers.sort((a, b) => a - b);  // ascending
numbers.sort((a, b) => b - a);  // descending
```

**SDK Example:**
```typescript
// Store phone numbers
let recipients: string[] = ["+923001234567", "+923001234568"];

// Add recipient
recipients.push("+923001234569");

// Filter valid phone numbers
let validRecipients = recipients.filter(phone => 
  phone.startsWith('+') && phone.length >= 10
);

// Get count
let totalRecipients: number = recipients.length;
```

---

### **Multi-type Arrays (Union Types)**

```typescript
// Array can contain strings OR numbers
let mixed: (string | number)[] = [1, "two", 3, "four"];

// Array of objects
let users: { name: string; age: number }[] = [
  { name: "Ali", age: 25 },
  { name: "Ahmed", age: 30 }
];
```

---

### **Readonly Arrays**

```typescript
// Can't modify readonly arrays
let numbers: readonly number[] = [1, 2, 3];

// These will error:
// numbers.push(4);     // Error!
// numbers[0] = 10;     // Error!

// But you can read:
console.log(numbers[0]);  // OK
console.log(numbers.length);  // OK

// Use case in SDK:
const SUPPORTED_MEDIA_TYPES: readonly string[] = [
  "image/jpeg",
  "image/png",
  "video/mp4"
];
```

---

### **Tuples - Fixed Length Arrays**

**Tuple** ek array hai jisme:
- Fixed number of elements hote hain
- Har element ka specific type hota hai
- Order matter karta hai

```typescript
// Tuple: [string, number]
let person: [string, number] = ["Talha", 25];

// Access by index
let name: string = person[0];   // "Talha"
let age: number = person[1];    // 25

// Error: Wrong type
// person = [25, "Talha"];  // Error! Order matters
```

**SDK Example:**
```typescript
// Function returns [success, data]
function sendMessage(phone: string): [boolean, string] {
  if (phone.startsWith('+')) {
    return [true, "Message sent"];
  }
  return [false, "Invalid phone"];
}

let [success, message] = sendMessage("+923001234567");
console.log(success);  // true
console.log(message);  // "Message sent"
```

---

### **Optional Elements in Tuples**

```typescript
// Last element is optional
let response: [number, string, boolean?] = [200, "OK"];

// Or with all three
let fullResponse: [number, string, boolean?] = [200, "OK", true];
```

---

### **Readonly Tuples**

```typescript
// Can't modify
let point: readonly [number, number] = [10, 20];

// point[0] = 15;  // Error!

// SDK Example: API version
const API_VERSION: readonly [number, number] = [1, 0];  // v1.0
```

---

### **Type Aliases**

Type alias matlab apne custom types banake naam dena.

**Basic Syntax:**
```typescript
// Instead of repeating this:
let user1: { name: string; age: number } = { name: "Ali", age: 25 };
let user2: { name: string; age: number } = { name: "Ahmed", age: 30 };

// Create a type alias:
type User = {
  name: string;
  age: number;
};

let user1: User = { name: "Ali", age: 25 };
let user2: User = { name: "Ahmed", age: 30 };
```

**Benefits:**
- ✅ Reusability
- ✅ Readability
- ✅ Easy to maintain
- ✅ Single source of truth

---

### **Type Aliases for Arrays**

```typescript
// Array type alias
type PhoneNumbers = string[];
type MessageQueue = string[];

let recipients: PhoneNumbers = ["+923001234567"];
let pending: MessageQueue = ["msg1", "msg2"];
```

---

### **Type Aliases for Tuples**

```typescript
// Tuple type alias
type Coordinate = [number, number];
type Response = [boolean, string];

let point: Coordinate = [10, 20];
let result: Response = [true, "Success"];
```

---

### **Complex Type Aliases**

```typescript
// Union types
type Status = "pending" | "success" | "error";
type ID = string | number;

// Function type
type SendMessageFunction = (phone: string, text: string) => Promise<boolean>;

// Object type
type ClientConfig = {
  accessToken: string;
  phoneNumberId: string;
  retryCount?: number;  // Optional
};
```

---

### **SDK Type Aliases Example**

```typescript
// Message types
type MessageType = "text" | "image" | "video" | "audio" | "document";

// Phone number in E.164 format
type PhoneNumber = string;

// Message status
type MessageStatus = "queued" | "sent" | "delivered" | "read" | "failed";

// API Response
type APIResponse = {
  success: boolean;
  messageId?: string;
  error?: string;
};

// Usage
let type: MessageType = "text";
let phone: PhoneNumber = "+923001234567";
let status: MessageStatus = "sent";

let response: APIResponse = {
  success: true,
  messageId: "wamid.12345"
};
```

---

### **When to Use Type Alias vs Interface?**

**Use Type Alias when:**
- ✅ Union types: `type ID = string | number`
- ✅ Tuples: `type Point = [number, number]`
- ✅ Primitives: `type Name = string`
- ✅ Function types

**Use Interface when:**
- ✅ Object shapes (Day 04 mein seekhenge)
- ✅ Classes (Day 08 mein seekhenge)
- ✅ Need to extend/merge

**For now:** Use type aliases - they're more flexible!

---

## 💡 Key Concepts Summary

### **Arrays**
- Typed collections: `number[]`, `string[]`
- Methods: `push`, `filter`, `map`, `reduce`
- Readonly: `readonly number[]`

### **Tuples**
- Fixed length arrays
- Each position has specific type
- Order matters
- Good for function returns

### **Type Aliases**
- Custom types with names
- Syntax: `type Name = definition`
- Reusable and maintainable
- Use for unions, tuples, complex types

---

## 🎯 SDK Applications

```typescript
// Type aliases
type PhoneNumber = string;
type MessageID = string;
type Timestamp = number;

// Arrays
let recipients: PhoneNumber[] = [];
let messageIds: MessageID[] = [];

// Tuples for function returns
function sendBulk(): [number, number] {
  // returns [sent, failed]
  return [45, 5];
}

// Readonly config
const MEDIA_TYPES: readonly string[] = ["image", "video", "audio"];
```

---

## ✅ Checklist

Before moving to Day 04:

- [ ] Understand arrays and methods
- [ ] Know when to use tuples
- [ ] Can create type aliases
- [ ] Understand readonly
- [ ] Complete all exercises

---

## 🤔 Common Questions

**Q: Array<T> vs T[] - which one?**
A: Both are same! Use `T[]` - it's shorter and more common.

**Q: When to use tuples instead of arrays?**
A: When you know exact number of elements and their types. Example: function returns [success, message].

**Q: Type alias vs interface?**
A: Type aliases are more flexible. We'll cover interfaces in Day 04.

---

**Ready for exercises?** Check `EXERCISES.md`!

Arrays master banne ka waqt! 💪
