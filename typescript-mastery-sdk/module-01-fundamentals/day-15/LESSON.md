# 📘 Day 15: Generics Introduction - Complete Lesson

**Duration:** 60-90 minutes  
**Goal:** Generics ko fundamentally samajhna - WHY, HOW, WHAT, WHEN

---

## 📋 Table of Contents

1. [The Problem Without Generics](#the-problem)
2. [What Are Generics?](#what-are-generics)
3. [Generic Functions](#generic-functions)
4. [Generic Interfaces](#generic-interfaces)
5. [Generic Classes](#generic-classes)
6. [SDK Application](#sdk-application)
7. [Common Mistakes](#common-mistakes)
8. [Best Practices](#best-practices)

---

## 🔴 Part 1: The Problem Without Generics {#the-problem}

### Scenario: API Response Handling

Tumhare SDK mein different endpoints hain:

```typescript
// User endpoint response
interface UserResponse {
  data: User;
  status: number;
  message: string;
}

// Message endpoint response
interface MessageResponse {
  data: Message;
  status: number;
  message: string;
}

// Media endpoint response
interface MediaResponse {
  data: Media;
  status: number;
  message: string;
}

// Product endpoint response
interface ProductResponse {
  data: Product;
  status: number;
  message: string;
}
```

### 🤔 Problem Dekho:

1. **Repetition:** `status` and `message` har jagah same hai
2. **Duplication:** Har naye endpoint ke liye nayi interface
3. **Maintenance:** Structure change = sabhi interfaces update
4. **Scalability:** 50 endpoints = 50 interfaces!

### Real-World Analogy 🌍

**Imagine a restaurant:**

❌ **Without Generics:**
```
- Small Coke glass (only for Coke)
- Small Pepsi glass (only for Pepsi)
- Small Water glass (only for Water)
- Medium Coke glass (only for Coke)
- Medium Pepsi glass (only for Pepsi)
...infinite glasses for each combination!
```

✅ **With Generics:**
```
- Small glass (works for ANY beverage)
- Medium glass (works for ANY beverage)
- Large glass (works for ANY beverage)
```

**Same concept with code!**

---

## 💡 Part 2: What Are Generics? {#what-are-generics}

### Simple Definition:

> **Generics = Type ke liye variables/parameters**

Jaise function mein value ke liye parameters hote hain:
```typescript
function add(a: number, b: number) {
  return a + b;
}
```

Waise hi generics mein **type ke liye** parameters hote hain:
```typescript
function identity<T>(value: T): T {
  return value;
}
```

### Understanding `<T>`:

- `T` = Type parameter (type ka placeholder)
- `<T>` = "Ye function ek type parameter accept karta hai"
- When you use it, `T` gets **substituted** with actual type

### Example:

```typescript
function identity<T>(value: T): T {
  return value;
}

// Usage:
const result1 = identity<string>("hello");  // T = string
const result2 = identity<number>(42);       // T = number
const result3 = identity<boolean>(true);    // T = boolean
```

**What happens internally:**

```typescript
// When you call identity<string>("hello")
// TypeScript creates this version:
function identity(value: string): string {
  return value;
}

// When you call identity<number>(42)
// TypeScript creates this version:
function identity(value: number): number {
  return value;
}
```

**Ye "type substitution" kehte hain!**

---

## 🔧 Part 3: Generic Functions {#generic-functions}

### Syntax:

```typescript
function functionName<T>(param: T): ReturnType {
  // implementation
}
```

### Example 1: Simple Generic Function

**Problem:** Get first element from array (any type)

```typescript
// ❌ WITHOUT Generics (need multiple functions):
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstUser(arr: User[]): User | undefined {
  return arr[0];
}

// ✅ WITH Generics (one function):
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Usage:
const firstNum = getFirst<number>([1, 2, 3]);        // number | undefined
const firstStr = getFirst<string>(["a", "b", "c"]); // string | undefined
const firstUser = getFirst<User>([user1, user2]);   // User | undefined
```

### Example 2: Type Inference

**TypeScript aksar khud type guess kar leta hai:**

```typescript
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Type explicitly batana (verbose):
const result1 = getFirst<number>([1, 2, 3]);

// Type inference (TypeScript guess karta hai):
const result2 = getFirst([1, 2, 3]);  // T automatically = number

// Both are same!
```

**When to be explicit:**
- Type ambiguous ho
- Compiler ko help chahiye
- Code clarity ke liye

### Example 3: Multiple Type Parameters

```typescript
// Two type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Usage:
const result1 = pair<string, number>("age", 25);
// result1: [string, number]

const result2 = pair("name", true);  // Type inference
// result2: [string, boolean]
```

### Example 4: Generic Array Operations

```typescript
// Get last element
function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// Reverse array
function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// Find by predicate
function find<T>(arr: T[], predicate: (item: T) => boolean): T | undefined {
  return arr.find(predicate);
}

// Usage:
const numbers = [1, 2, 3, 4, 5];
const lastNum = getLast(numbers);        // number | undefined
const reversed = reverse(numbers);       // number[]
const found = find(numbers, n => n > 3); // number | undefined
```

### 🎯 Why Generic Functions Matter:

1. **Reusability:** Write once, use for ANY type
2. **Type Safety:** Full type checking maintained
3. **No Duplication:** Avoid repetitive code
4. **Flexibility:** Works with existing and future types

---

## 📦 Part 4: Generic Interfaces {#generic-interfaces}

### Syntax:

```typescript
interface InterfaceName<T> {
  property: T;
}
```

### Example 1: API Response

**Problem:** Different endpoints return different data

```typescript
// ❌ WITHOUT Generics:
interface UserApiResponse {
  data: User;
  status: number;
  message: string;
  timestamp: number;
}

interface MessageApiResponse {
  data: Message;
  status: number;
  message: string;
  timestamp: number;
}

// ✅ WITH Generics:
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

// Usage:
type UserResponse = APIResponse<User>;
type MessageResponse = APIResponse<Message>;
type MediaResponse = APIResponse<Media>;
```

### Example 2: Box/Container Pattern

```typescript
interface Box<T> {
  value: T;
  isEmpty: boolean;
  
  getValue(): T;
  setValue(val: T): void;
}

// Usage:
const numberBox: Box<number> = {
  value: 42,
  isEmpty: false,
  getValue() { return this.value; },
  setValue(val) { this.value = val; }
};

const stringBox: Box<string> = {
  value: "hello",
  isEmpty: false,
  getValue() { return this.value; },
  setValue(val) { this.value = val; }
};
```

### Example 3: Result/Either Pattern

```typescript
interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
  error: string;
}

type Result<T> = Success<T> | Failure;

// Usage:
function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, data: a / b };
}

const result = divide(10, 2);
if (result.success) {
  console.log(result.data);  // TypeScript knows it's number
} else {
  console.log(result.error); // TypeScript knows it's string
}
```

### Example 4: Key-Value Pair

```typescript
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

// Usage:
const pair1: KeyValuePair<string, number> = {
  key: "age",
  value: 25
};

const pair2: KeyValuePair<number, User> = {
  key: 123,
  value: { id: "123", name: "Ali" }
};
```

---

## 🏗️ Part 5: Generic Classes {#generic-classes}

### Syntax:

```typescript
class ClassName<T> {
  private data: T;
  
  constructor(data: T) {
    this.data = data;
  }
  
  getData(): T {
    return this.data;
  }
}
```

### Example 1: Stack Data Structure

```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  size(): number {
    return this.items.length;
  }
}

// Usage:
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop());  // 3

const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop());  // "world"
```

**Type Safety in Action:**

```typescript
const numberStack = new Stack<number>();
numberStack.push(1);     // ✓ OK
numberStack.push(2);     // ✓ OK
// numberStack.push("hi"); // ✗ Error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### Example 2: Generic Repository Pattern

```typescript
class Repository<T> {
  private items: Map<string, T> = new Map();
  
  add(id: string, item: T): void {
    this.items.set(id, item);
  }
  
  get(id: string): T | undefined {
    return this.items.get(id);
  }
  
  getAll(): T[] {
    return Array.from(this.items.values());
  }
  
  remove(id: string): boolean {
    return this.items.delete(id);
  }
  
  exists(id: string): boolean {
    return this.items.has(id);
  }
}

// Usage:
const userRepo = new Repository<User>();
userRepo.add("1", { id: "1", name: "Ali" });
userRepo.add("2", { id: "2", name: "Sara" });

const user = userRepo.get("1");  // User | undefined
const allUsers = userRepo.getAll();  // User[]
```

### Example 3: Generic Queue

```typescript
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    this.items.push(item);
  }
  
  dequeue(): T | undefined {
    return this.items.shift();
  }
  
  peek(): T | undefined {
    return this.items[0];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  size(): number {
    return this.items.length;
  }
}

// Usage:
const taskQueue = new Queue<string>();
taskQueue.enqueue("Task 1");
taskQueue.enqueue("Task 2");
console.log(taskQueue.dequeue());  // "Task 1"
```

---

## 🚀 Part 6: SDK Application {#sdk-application}

### Real-World SDK Example: Generic API Client

```typescript
// Generic API Response
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

// Generic API Error
interface APIError {
  code: string;
  message: string;
  details?: any;
}

// Generic Result Type
type APIResult<T> = APIResponse<T> | APIError;

// Generic HTTP Client
class HTTPClient {
  async get<T>(url: string): Promise<APIResponse<T>> {
    const response = await fetch(url);
    return response.json();
  }
  
  async post<TRequest, TResponse>(
    url: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// Usage in WhatsApp SDK:
interface User {
  id: string;
  name: string;
  phone: string;
}

interface Message {
  id: string;
  text: string;
  to: string;
}

const client = new HTTPClient();

// Get user - T automatically inferred as User
const userResponse = await client.get<User>('/users/123');
console.log(userResponse.data.name);  // TypeScript knows it's string

// Send message
const messageResponse = await client.post<
  { text: string; to: string },  // Request type
  Message                        // Response type
>('/messages', {
  text: "Hello",
  to: "+1234567890"
});
console.log(messageResponse.data.id);  // TypeScript knows it's string
```

### SDK Service with Generics

```typescript
// Base Service (generic for all resources)
class BaseService<T> {
  constructor(private client: HTTPClient, private basePath: string) {}
  
  async getById(id: string): Promise<APIResponse<T>> {
    return this.client.get<T>(`${this.basePath}/${id}`);
  }
  
  async getAll(): Promise<APIResponse<T[]>> {
    return this.client.get<T[]>(this.basePath);
  }
  
  async create(data: Partial<T>): Promise<APIResponse<T>> {
    return this.client.post<Partial<T>, T>(this.basePath, data);
  }
}

// Specific services extending base
class UserService extends BaseService<User> {
  constructor(client: HTTPClient) {
    super(client, '/users');
  }
  
  // User-specific methods can be added here
}

class MessageService extends BaseService<Message> {
  constructor(client: HTTPClient) {
    super(client, '/messages');
  }
  
  // Message-specific methods can be added here
}

// Usage:
const httpClient = new HTTPClient();
const userService = new UserService(httpClient);
const messageService = new MessageService(httpClient);

const user = await userService.getById("123");      // APIResponse<User>
const messages = await messageService.getAll();     // APIResponse<Message[]>
```

---

## ⚠️ Part 7: Common Mistakes {#common-mistakes}

### Mistake 1: Using `any` Instead of Generics

```typescript
// ❌ WRONG: Loses type information
function process(data: any): any {
  return data;
}

const result = process("hello");
// result is 'any' - no type safety!

// ✅ CORRECT: Preserves type information
function process<T>(data: T): T {
  return data;
}

const result = process("hello");
// result is 'string' - full type safety!
```

**WHY it matters:** `any` defeats the purpose of TypeScript!

### Mistake 2: Over-Generification

```typescript
// ❌ WRONG: Unnecessary generic
function add<T>(a: T, b: T): T {
  return a + b;  // Error! Can't add T + T
}

// ✅ CORRECT: Use specific type when operations are type-specific
function add(a: number, b: number): number {
  return a + b;
}
```

**Rule:** Only use generics when the function truly works with ANY type!

### Mistake 3: Poor Type Parameter Names

```typescript
// ❌ WRONG: Cryptic names
function process<X, Y, Z>(a: X, b: Y): Z {
  // What are X, Y, Z?
}

// ✅ CORRECT: Descriptive names
function transform<TInput, TOutput, TContext>(
  input: TInput,
  context: TContext
): TOutput {
  // Clear what each represents
}
```

**Convention:**
- `T` for single generic
- `TData`, `TResult` for descriptive
- `K`, `V` for key-value pairs

### Mistake 4: Forgetting Type Can Be Anything

```typescript
// ❌ WRONG: Assuming T has properties
function getId<T>(obj: T): string {
  return obj.id;  // Error! T might not have 'id'
}

// ✅ CORRECT: Will learn constraints tomorrow (Day 16)
// For now, either make it specific or check at runtime
```

---

## ✅ Part 8: Best Practices {#best-practices}

### 1. Use Descriptive Names (When Needed)

```typescript
// Simple case: T is fine
function identity<T>(value: T): T {
  return value;
}

// Complex case: Be descriptive
interface APIResponse<TData, TError = Error> {
  data?: TData;
  error?: TError;
}
```

### 2. Leverage Type Inference

```typescript
// User doesn't need to specify type
const numbers = [1, 2, 3];
const first = getFirst(numbers);  // TypeScript infers T = number

// Only be explicit when necessary
const result = someFunction<ComplexType>(data);
```

### 3. Start Simple, Add Generics When Needed

```typescript
// Step 1: Specific implementation
function getUserById(id: string): User { }

// Step 2: Notice duplication with getMessageById, getProductById...

// Step 3: Refactor to generic
function getById<T>(id: string): T { }
```

**Don't prematurely generify!**

### 4. Document Generic Parameters

```typescript
/**
 * Fetches a resource by ID
 * @template T - The type of resource to fetch
 * @param id - The resource ID
 * @returns Promise resolving to the resource
 */
async function fetchById<T>(id: string): Promise<T> {
  // ...
}
```

---

## 🎯 Summary

### What You Learned:

✅ **WHY Generics:** Eliminate code duplication while maintaining type safety  
✅ **WHAT Generics Are:** Type parameters that get substituted with actual types  
✅ **HOW to Use:**
   - Generic functions: `function name<T>(param: T): T`
   - Generic interfaces: `interface Name<T> { prop: T }`
   - Generic classes: `class Name<T> { }`
✅ **WHEN to Use:** When code works identically for multiple types  
✅ **WHERE in SDK:** API responses, services, repositories

### Key Takeaway:

> **Generics = Type-safe code reuse**

Write once, use for ANY type, maintain full type checking!

---

## 📝 Practice Checkpoint

Before moving to exercises, can you answer:

1. **WHY** would you use `<T>` instead of `any`?
2. **WHAT** does TypeScript do with `<T>` during compilation?
3. **HOW** would you write a generic function that returns the last element of an array?
4. **WHEN** should you avoid generics?
5. **WHERE** in WhatsApp SDK can you use generics?

If yes, you're ready for exercises! 🚀

---

**Next:** Complete the exercises to solidify your understanding!
