# 📘 Day 05: Functions Deep Dive

**Module:** Fundamentals (Week 1)
**Duration:** 1-2 hours
**Goal:** Functions ko master level pe samajhna

---

## 🎯 Today's Objectives

By the end of today, you will:
- ✅ Function types completely samajhoge
- ✅ Optional aur default parameters
- ✅ Rest parameters
- ✅ Function overloading
- ✅ Arrow functions vs regular functions
- ✅ SDK ke liye clean APIs banayenge

---

## 📚 Theory

### **Function Type Annotations**

TypeScript mein functions ke parameters aur return type dono typed hote hain.

**Basic Syntax:**
```typescript
function functionName(param1: type1, param2: type2): returnType {
  // function body
  return value;
}
```

**Example:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}

function logMessage(message: string): void {
  console.log(message);
  // No return value
}
```

---

### **Optional Parameters**

Optional parameters may or may not be provided.

**Syntax:** `paramName?: type`

```typescript
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greet("Ali"));              // "Hello, Ali!"
console.log(greet("Ali", "Good morning")); // "Good morning, Ali!"
```

**Rules:**
- Optional parameters must come AFTER required parameters
- Optional parameters can be `undefined`

```typescript
// ❌ Wrong: Optional before required
// function wrong(optional?: string, required: number) { }

// ✅ Correct: Required before optional
function correct(required: number, optional?: string) { }
```

---

### **Default Parameters**

Default parameters have a default value if not provided.

```typescript
function createMessage(
  text: string,
  priority: string = "normal",
  urgent: boolean = false
): object {
  return { text, priority, urgent };
}

console.log(createMessage("Hello"));
// { text: "Hello", priority: "normal", urgent: false }

console.log(createMessage("Alert!", "high", true));
// { text: "Alert!", priority: "high", urgent: true }
```

**Default vs Optional:**
- Default: Has a value if not provided
- Optional: Is `undefined` if not provided

---

### **Rest Parameters**

Rest parameters collect remaining arguments into an array.

**Syntax:** `...paramName: type[]`

```typescript
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3));           // 6
console.log(sum(1, 2, 3, 4, 5));     // 15
console.log(sum());                   // 0
```

**SDK Example:**
```typescript
function sendToMultiple(text: string, ...recipients: string[]): void {
  recipients.forEach(phone => {
    console.log(`Sending "${text}" to ${phone}`);
  });
}

sendToMultiple("Hello", "+923001234567", "+923001234568", "+923001234569");
```

**Rules:**
- Only one rest parameter allowed
- Must be last parameter
- Type is always an array

---

### **Function Types as Variables**

Functions can be stored in variables with their types.

```typescript
// Function type
let calculate: (a: number, b: number) => number;

// Assign a function
calculate = (a, b) => a + b;
console.log(calculate(5, 3)); // 8

// Reassign with different implementation
calculate = (a, b) => a * b;
console.log(calculate(5, 3)); // 15
```

**Type Alias for Functions:**
```typescript
type MathOperation = (a: number, b: number) => number;

let add: MathOperation = (a, b) => a + b;
let multiply: MathOperation = (a, b) => a * b;
```

---

### **Arrow Functions vs Regular Functions**

**Arrow Function:**
```typescript
const add = (a: number, b: number): number => a + b;

const greet = (name: string): string => {
  return `Hello, ${name}!`;
};
```

**Regular Function:**
```typescript
function add(a: number, b: number): number {
  return a + b;
}

function greet(name: string): string {
  return `Hello, ${name}!`;
}
```

**When to use:**
- Arrow: Short functions, callbacks, methods
- Regular: When you need `this` context

---

### **Function Overloading**

Function overloading allows different parameter combinations for the same function.

```typescript
// Overload signatures
function sendMessage(phone: string, text: string): string;
function sendMessage(phone: string, mediaId: string, caption: string): string;

// Implementation signature
function sendMessage(
  phone: string,
  textOrMediaId: string,
  caption?: string
): string {
  if (caption) {
    // Media message with caption
    return `Sending media ${textOrMediaId} with caption "${caption}" to ${phone}`;
  } else {
    // Text message
    return `Sending text "${textOrMediaId}" to ${phone}`;
  }
}

// Usage
console.log(sendMessage("+923001234567", "Hello"));
console.log(sendMessage("+923001234567", "media_123", "Check this"));
```

**Rules:**
- Overload signatures define the call signatures
- Implementation signature handles all cases
- Implementation signature must be compatible with all overloads

---

### **Callback Functions**

Functions passed as arguments to other functions.

```typescript
function processArray(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  return numbers.map(callback);
}

let doubled = processArray([1, 2, 3], n => n * 2);
console.log(doubled); // [2, 4, 6]

let squared = processArray([1, 2, 3], n => n * n);
console.log(squared); // [1, 4, 9]
```

**SDK Example:**
```typescript
type MessageCallback = (success: boolean, messageId?: string) => void;

function sendMessage(
  phone: string,
  text: string,
  callback: MessageCallback
): void {
  // Simulate async operation
  setTimeout(() => {
    if (phone.startsWith('+')) {
      callback(true, "wamid_123");
    } else {
      callback(false);
    }
  }, 1000);
}

sendMessage("+923001234567", "Hello", (success, id) => {
  if (success) {
    console.log("Sent! ID:", id);
  } else {
    console.log("Failed!");
  }
});
```

---

### **Async Functions**

Functions that return promises.

```typescript
async function fetchUser(id: string): Promise<{ name: string; age: number }> {
  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: "Ali", age: 25 });
    }, 1000);
  });
}

// Using async/await
async function main() {
  let user = await fetchUser("123");
  console.log(user);
}
```

**SDK Example:**
```typescript
async function sendText(
  to: string,
  text: string
): Promise<{ success: boolean; messageId?: string }> {
  try {
    // Make API call
    let response = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({ to, text })
    });
    
    let data = await response.json();
    return { success: true, messageId: data.id };
  } catch (error) {
    return { success: false };
  }
}
```

---

## 💡 Key Concepts Summary

### **Parameters**
- Required: Must be provided
- Optional (`?`): May be undefined
- Default (`=`): Has default value
- Rest (`...`): Collects remaining arguments

### **Function Types**
- Can store in variables
- Type aliases for reusability
- Arrow vs regular functions

### **Advanced**
- Function overloading
- Callbacks with types
- Async/Promise functions

---

## 🎯 SDK Applications

```typescript
// Optional parameters for config
function initClient(
  apiKey: string,
  phoneId: string,
  options?: { timeout?: number; retries?: number }
): void {
  // ...
}

// Rest parameters for bulk send
function sendBulk(text: string, ...phones: string[]): Promise<string[]> {
  return Promise.all(phones.map(phone => sendText(phone, text)));
}

// Callback for async operations
type SendCallback = (error: Error | null, messageId?: string) => void;

function send(phone: string, text: string, callback: SendCallback): void {
  // ...
}
```

---

## ✅ Checklist

Before moving to Day 06:

- [ ] Understand all parameter types
- [ ] Know when to use optional vs default
- [ ] Can use rest parameters
- [ ] Understand function overloading
- [ ] Know async/promise functions
- [ ] Complete all exercises

---

**Ready for exercises?** Check `EXERCISES.md`!

Functions master! 💪
