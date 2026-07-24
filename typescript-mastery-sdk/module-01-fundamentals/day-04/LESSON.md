# 📘 Day 04: Objects & Interfaces

**Module:** Fundamentals (Week 1)
**Duration:** 1-2 hours
**Goal:** Objects aur Interfaces ko completely master karna

---

## 🎯 Today's Objectives

By the end of today, you will:
- ✅ Object types deeply samajhoge
- ✅ Interfaces banana aur use karna
- ✅ Optional aur readonly properties
- ✅ Index signatures
- ✅ Interface vs Type Alias ka difference
- ✅ SDK ke liye clean object structures banayenge

---

## 📚 Theory

### **Objects in TypeScript**

Object ek collection hai key-value pairs ka. TypeScript mein har property ki type define kar sakte hain.

**Basic Object Typing:**
```typescript
// Inline object type
let user: { name: string; age: number } = {
  name: "Talha",
  age: 25
};

// Can't add extra properties
// user.email = "test@test.com"; // Error!

// Can't skip required properties
// let incomplete: { name: string; age: number } = { name: "Ali" }; // Error!
```

---

### **Interfaces - Better Object Types**

Interface ek blueprint hai objects ke liye. Cleaner aur reusable.

**Basic Interface:**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

let user1: User = {
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

let user2: User = {
  name: "Ahmed",
  age: 30,
  email: "ahmed@example.com"
};
```

**Benefits:**
- ✅ Reusable across codebase
- ✅ Better error messages
- ✅ Can extend other interfaces
- ✅ Self-documenting code

---

### **Optional Properties**

Optional properties may or may not exist.

```typescript
interface ClientConfig {
  accessToken: string;      // Required
  phoneNumberId: string;    // Required
  apiVersion?: string;      // Optional (notice ?)
  maxRetries?: number;      // Optional
  enableLogging?: boolean;  // Optional
}

// Valid - without optional properties
let config1: ClientConfig = {
  accessToken: "token123",
  phoneNumberId: "phone123"
};

// Valid - with optional properties
let config2: ClientConfig = {
  accessToken: "token123",
  phoneNumberId: "phone123",
  apiVersion: "v1.0",
  maxRetries: 3
};
```

**Syntax:** `propertyName?: type`

---

### **Readonly Properties**

Readonly properties can't be changed after object creation.

```typescript
interface Message {
  readonly id: string;        // Can't change after creation
  readonly createdAt: number; // Can't change after creation
  to: string;                 // Can change
  text: string;               // Can change
  status: string;             // Can change
}

let message: Message = {
  id: "msg_123",
  createdAt: Date.now(),
  to: "+923001234567",
  text: "Hello",
  status: "pending"
};

// Can update these
message.status = "sent";
message.text = "Hello World";

// Can't update readonly
// message.id = "msg_456";        // Error!
// message.createdAt = Date.now(); // Error!
```

**Syntax:** `readonly propertyName: type`

---

### **Methods in Interfaces**

Interfaces can define function properties (methods).

```typescript
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};

console.log(calc.add(5, 3));      // 8
console.log(calc.subtract(5, 3)); // 2
```

**SDK Example:**
```typescript
interface WhatsAppClient {
  sendText(to: string, text: string): Promise<string>;
  sendImage(to: string, imageUrl: string): Promise<string>;
  uploadMedia(file: Buffer): Promise<string>;
}
```

---

### **Index Signatures**

When you don't know property names in advance but know their types.

```typescript
// Any string key with string value
interface PhoneBook {
  [name: string]: string;
}

let contacts: PhoneBook = {
  "Ali": "+923001234567",
  "Ahmed": "+923001234568",
  "Hassan": "+923001234569"
};

// Add more dynamically
contacts["Bilal"] = "+923001234570";

console.log(contacts["Ali"]); // "+923001234567"
```

**SDK Example:**
```typescript
// Store metadata as key-value pairs
interface MessageMetadata {
  [key: string]: string | number | boolean;
}

let metadata: MessageMetadata = {
  source: "web",
  priority: "high",
  retryCount: 3,
  isUrgent: true
};
```

---

### **Extending Interfaces**

Interfaces can extend other interfaces (inheritance).

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

let employee: Employee = {
  name: "Talha",
  age: 25,
  employeeId: "EMP001",
  department: "Engineering"
};
// Has both Person and Employee properties
```

**SDK Example:**
```typescript
interface BaseMessage {
  to: string;
  type: string;
}

interface TextMessage extends BaseMessage {
  text: string;
  preview_url?: boolean;
}

interface MediaMessage extends BaseMessage {
  mediaId: string;
  caption?: string;
}
```

---

### **Multiple Interface Extension**

Interface can extend multiple interfaces.

```typescript
interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Identifiable {
  id: string;
}

interface Message extends Timestamped, Identifiable {
  to: string;
  text: string;
}

let message: Message = {
  id: "msg_123",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  to: "+923001234567",
  text: "Hello"
};
```

---

### **Interface vs Type Alias**

Both can define object shapes, but with differences:

**Type Alias:**
```typescript
type User = {
  name: string;
  age: number;
};
```

**Interface:**
```typescript
interface User {
  name: string;
  age: number;
}
```

**Key Differences:**

| Feature | Type Alias | Interface |
|---------|-----------|-----------|
| Object shapes | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Primitives | ✅ | ❌ |
| Tuples | ✅ | ❌ |
| Extending | `&` operator | `extends` keyword |
| Declaration merging | ❌ | ✅ |

**When to use what:**
- **Interface:** For object shapes, especially public APIs
- **Type Alias:** For unions, tuples, primitives, complex types

**Best Practice for SDK:**
- Use interfaces for config objects, message types
- Use type aliases for unions, IDs, primitives

---

### **Nested Objects**

Objects can contain other objects.

```typescript
interface Address {
  street: string;
  city: string;
  country: string;
}

interface User {
  name: string;
  age: number;
  address: Address; // Nested object
}

let user: User = {
  name: "Talha",
  age: 25,
  address: {
    street: "Main Street",
    city: "Karachi",
    country: "Pakistan"
  }
};

console.log(user.address.city); // "Karachi"
```

**SDK Example:**
```typescript
interface WebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{
      value: {
        messaging_product: string;
        messages?: Array<{
          from: string;
          text: { body: string };
        }>;
      };
    }>;
  }>;
}
```

---

## 💡 Key Concepts Summary

### **Objects**
- Key-value pairs
- Typed properties
- Required by default

### **Interfaces**
- Blueprints for objects
- Reusable and extendable
- Better for object shapes

### **Modifiers**
- `?` - Optional property
- `readonly` - Immutable property

### **Advanced**
- Index signatures for dynamic keys
- Extending interfaces for reusability
- Nested objects for complex structures

---

## 🎯 SDK Applications

```typescript
// Client configuration
interface SDKConfig {
  readonly accessToken: string;
  readonly phoneNumberId: string;
  apiVersion?: string;
  maxRetries?: number;
}

// Message types
interface BaseMessage {
  to: string;
}

interface TextMessage extends BaseMessage {
  text: string;
}

interface ImageMessage extends BaseMessage {
  imageId: string;
  caption?: string;
}

// API response
interface APIResponse {
  success: boolean;
  messageId?: string;
  error?: {
    code: string;
    message: string;
  };
}
```

---

## ✅ Checklist

Before moving to Day 05:

- [ ] Understand object types
- [ ] Know how to create interfaces
- [ ] Understand optional properties (?)
- [ ] Understand readonly properties
- [ ] Know difference between interface and type
- [ ] Complete all exercises

---

## 🤔 Common Questions

**Q: Interface vs Type - which one?**
A: Use interfaces for objects. Use type aliases for unions/primitives.

**Q: When to use optional properties?**
A: When a property may or may not exist (like config options).

**Q: When to use readonly?**
A: For properties that shouldn't change after creation (like IDs, timestamps).

---

**Ready for exercises?** Check `EXERCISES.md`!

Object master banne ka time! 💪
