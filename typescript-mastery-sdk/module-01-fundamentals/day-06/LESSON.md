# 📘 Day 06: Union & Intersection Types

**Module:** Fundamentals (Week 1)
**Duration:** 1-2 hours
**Goal:** Union aur Intersection types ko master karna

---

## 🎯 Today's Objectives

By the end of today, you will:
- ✅ Union types completely samajhoge
- ✅ Intersection types use kar sakte ho
- ✅ Type guards bana sakte ho
- ✅ Discriminated unions use karenge
- ✅ SDK ke liye flexible types banayenge

---

## 📚 Theory

### **Union Types - Multiple Possibilities**

Union type ka matlab hai: variable ek type YA doosri type ho sakta hai.

**Syntax:** `type1 | type2`

```typescript
// Can be string OR number
let id: string | number;

id = "abc123";  // OK
id = 456;       // OK
// id = true;   // Error! Not in union
```

**Common Use Cases:**
```typescript
// Status can be one of these strings
type Status = "pending" | "success" | "error";
let currentStatus: Status = "pending";

// ID can be string or number
type ID = string | number;
let userId: ID = "user_123";
let productId: ID = 456;

// Value can be string or null
type NullableString = string | null;
let name: NullableString = "Ali";
name = null;  // OK
```

---

### **Working with Union Types**

TypeScript agar union type pe method call karo, to sirf wo methods available hain jo DONO types mein hain.

```typescript
function printId(id: string | number) {
  console.log(id.toString());  // OK - both have toString()
  
  // console.log(id.toUpperCase());  // Error! Only string has this
  // console.log(id.toFixed());      // Error! Only number has this
}
```

**Narrowing** karni padti hai specific methods use karne ke liye.

---

### **Type Guards - Type Ko Narrow Karna**

Type guard ek condition hai jo TypeScript ko batati hai ke ek specific type hai.

**typeof Guard:**
```typescript
function processValue(value: string | number) {
  if (typeof value === "string") {
    // TypeScript knows: value is string here
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows: value is number here
    console.log(value.toFixed(2));
  }
}
```

**instanceof Guard:**
```typescript
function processDate(value: Date | string) {
  if (value instanceof Date) {
    // value is Date
    console.log(value.getFullYear());
  } else {
    // value is string
    console.log(value.toUpperCase());
  }
}
```

**in Guard:**
```typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  name: string;
  role: string;
}

function greet(person: User | Admin) {
  if ("email" in person) {
    // person is User
    console.log("Email:", person.email);
  } else {
    // person is Admin
    console.log("Role:", person.role);
  }
}
```

---

### **Custom Type Guards**

Apne khud ke type guards bana sakte ho.

**Syntax:** `paramName is Type`

```typescript
function isString(value: any): value is string {
  return typeof value === "string";
}

function processValue(value: string | number) {
  if (isString(value)) {
    // TypeScript knows: value is string
    console.log(value.toUpperCase());
  } else {
    // TypeScript knows: value is number
    console.log(value.toFixed(2));
  }
}
```

**SDK Example:**
```typescript
interface TextMessage {
  type: "text";
  text: string;
}

interface ImageMessage {
  type: "image";
  imageId: string;
}

type Message = TextMessage | ImageMessage;

function isTextMessage(msg: Message): msg is TextMessage {
  return msg.type === "text";
}

function processMessage(msg: Message) {
  if (isTextMessage(msg)) {
    console.log("Text:", msg.text);
  } else {
    console.log("Image:", msg.imageId);
  }
}
```

---

### **Discriminated Unions**

Ek common pattern jisme union ke har member mein ek common property hoti hai.

```typescript
interface Circle {
  kind: "circle";  // Discriminant
  radius: number;
}

interface Square {
  kind: "square";  // Discriminant
  side: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      // TypeScript knows: shape is Circle
      return Math.PI * shape.radius ** 2;
    case "square":
      // TypeScript knows: shape is Square
      return shape.side ** 2;
  }
}
```

**SDK Example:**
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

type Message = TextMessage | ImageMessage | VideoMessage;

function sendMessage(message: Message): void {
  switch (message.type) {
    case "text":
      console.log(`Sending text to ${message.to}: ${message.text}`);
      break;
    case "image":
      console.log(`Sending image ${message.imageId} to ${message.to}`);
      break;
    case "video":
      console.log(`Sending video ${message.videoId} to ${message.to}`);
      break;
  }
}
```

---

### **Intersection Types - Combining Types**

Intersection type ka matlab hai: variable DONO types ki properties rakhta hai.

**Syntax:** `Type1 & Type2`

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

// Has ALL properties from both
type Staff = Person & Employee;

let staff: Staff = {
  name: "Ali",
  age: 25,
  employeeId: "EMP001",
  department: "Engineering"
};
```

---

### **Union vs Intersection**

**Union (|):** Can be Type1 OR Type2
```typescript
type A = { name: string } | { age: number };
let a: A = { name: "Ali" };  // OK
let b: A = { age: 25 };      // OK
```

**Intersection (&):** Must have BOTH Type1 AND Type2
```typescript
type B = { name: string } & { age: number };
let c: B = { name: "Ali", age: 25 };  // OK - has both
// let d: B = { name: "Ali" };        // Error - missing age
```

---

### **Practical Intersection Uses**

**Mixins:**
```typescript
interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Identifiable {
  id: string;
}

type Entity = Timestamped & Identifiable;

interface User extends Entity {
  name: string;
  email: string;
}
```

**SDK Example:**
```typescript
interface BaseMessage {
  to: string;
}

interface WithTimestamp {
  timestamp: number;
}

interface WithRetry {
  retryCount: number;
  maxRetries: number;
}

type Message = BaseMessage & WithTimestamp & WithRetry;

let message: Message = {
  to: "+923001234567",
  timestamp: Date.now(),
  retryCount: 0,
  maxRetries: 3
};
```

---

## 💡 Key Concepts Summary

### **Union Types (|)**
- One of several types
- Use type guards to narrow
- Common for status strings, IDs

### **Intersection Types (&)**
- All types combined
- Has properties from all types
- Good for mixins

### **Type Guards**
- `typeof` for primitives
- `instanceof` for classes
- `in` for properties
- Custom `is` guards

### **Discriminated Unions**
- Common property (discriminant)
- Type-safe switch/if statements
- Best practice for variants

---

## 🎯 SDK Applications

```typescript
// Union for flexible IDs
type MessageID = string | number;

// Union for status
type Status = "queued" | "sent" | "delivered" | "failed";

// Discriminated union for messages
type Message = 
  | { type: "text"; text: string }
  | { type: "image"; imageId: string }
  | { type: "video"; videoId: string };

// Intersection for composed types
type TrackedMessage = BaseMessage & Timestamped & Identifiable;
```

---

## ✅ Checklist

- [ ] Understand union types
- [ ] Can use type guards
- [ ] Know discriminated unions
- [ ] Understand intersection types
- [ ] Complete all exercises

---

**Ready for exercises?** Check `EXERCISES.md`!

Union & Intersection master! 💪
