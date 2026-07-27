# 📝 Day 15: Generics Introduction - Exercises

**Goal:** Generics ko practice karke master karna

---

## 🎯 Overview

6 progressive exercises + 1 bonus challenge:

1. **Conceptual Understanding** (WHY)
2. **Generic Functions** (Practice)
3. **Generic Interfaces** (Practice)
4. **Generic Classes** (Practice)
5. **SDK Application** (Real-world)
6. **Cumulative Revision** (Week 1-2 concepts)
7. **Bonus Challenge** (Advanced)

---

## ✅ Exercise 1: Understanding WHY Generics Exist (20 min)

**Goal:** Fundamentally samajhna k generics kyun zaroori hain

### Part A: The Duplication Problem

Given these functions:

```typescript
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstBoolean(arr: boolean[]): boolean | undefined {
  return arr[0];
}
```

**Questions:**

1. What is being duplicated?
2. What would happen with 10 different types?
3. What problem occurs during maintenance?
4. Why can't we just use `any`?

**Your Answers:**
```
1. 

2. 

3. 

4. 
```

### Part B: The Generic Solution

**Task:** Rewrite the three functions above as ONE generic function.

```typescript
// Your generic function here:
function getFirst<T>(/* fill this in */) {
  // implementation
}

// Test cases (should all work):
const num = getFirst([1, 2, 3]);        // number | undefined
const str = getFirst(["a", "b", "c"]); // string | undefined
const bool = getFirst([true, false]);  // boolean | undefined
```

### Part C: any vs Generic

**Question:** What's the difference?

```typescript
// Version A: Using any
function processA(data: any): any {
  return data;
}

// Version B: Using generic
function processB<T>(data: T): T {
  return data;
}

// Usage:
const resultA = processA("hello");  // Type?
const resultB = processB("hello");  // Type?
```

**Your explanation:**
```
Version A type: 
Version B type: 
Which is better and WHY: 
```

### ✅ Success Criteria:
- [ ] Understand the duplication problem
- [ ] Can write basic generic function
- [ ] Know why generics > any

---

## ✅ Exercise 2: Generic Functions (30 min)

**Goal:** Generic functions master karna

### Task 1: Get Last Element

**Implement:**
```typescript
function getLast<T>(/* parameters */): /* return type */ {
  // Your implementation
}

// Test cases:
console.log(getLast([1, 2, 3]));           // 3
console.log(getLast(["a", "b", "c"]));     // "c"
console.log(getLast([]));                  // undefined
```

**Hints:**
- Parameter: array of T
- Return: T or undefined
- Use array length

### Task 2: Reverse Array

**Implement:**
```typescript
function reverse<T>(/* parameters */): /* return type */ {
  // Your implementation
  // Hint: Don't mutate original array
}

// Test cases:
console.log(reverse([1, 2, 3]));        // [3, 2, 1]
console.log(reverse(["a", "b"]));       // ["b", "a"]
console.log(reverse([]));               // []
```

**Challenge:** Do it without using `.reverse()`!

### Task 3: Find by Predicate

**Implement:**
```typescript
function findItem<T>(
  arr: T[],
  predicate: (item: T) => boolean
): T | undefined {
  // Your implementation
}

// Test cases:
const numbers = [1, 2, 3, 4, 5];
console.log(findItem(numbers, n => n > 3));        // 4

const users = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Sara" }
];
console.log(findItem(users, u => u.name === "Sara")); // { id: "2", name: "Sara" }
```

### Task 4: Pair Function

**Implement:**
```typescript
function makePair<T, U>(/* parameters */): /* return type */ {
  // Return a tuple [T, U]
}

// Test cases:
const pair1 = makePair("age", 25);           // [string, number]
const pair2 = makePair(true, "active");      // [boolean, string]
```

### Task 5: Swap Function

**Implement:**
```typescript
function swap<T, U>(/* parameters */): /* return type */ {
  // Swap elements in a tuple
}

// Test cases:
const original: [string, number] = ["age", 25];
const swapped = swap(original);  // [25, "age"]
console.log(swapped);            // [25, "age"]
```

### ✅ Success Criteria:
- [ ] All 5 functions implemented
- [ ] Type inference works
- [ ] No TypeScript errors
- [ ] All test cases pass

**Starter code:** `starter-code/exercise-2.ts`

---

## ✅ Exercise 3: Generic Interfaces (30 min)

**Goal:** Reusable interface designs

### Task 1: API Response Interface

**Scenario:** Your SDK has multiple endpoints

**Implement:**
```typescript
// Generic API response
interface APIResponse<T> {
  // Add properties:
  // - data (type T)
  // - status (number)
  // - message (string)
  // - timestamp (number)
}

// Test types:
interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
}

type UserResponse = APIResponse<User>;
type MessageResponse = APIResponse<Message>;
type UsersListResponse = APIResponse<User[]>;

// Usage test:
const userResp: UserResponse = {
  data: { id: "1", name: "Ali" },
  status: 200,
  message: "Success",
  timestamp: Date.now()
};
```

### Task 2: Result/Either Pattern

**Implement:**
```typescript
// Success case
interface Success<T> {
  success: true;
  data: T;
}

// Failure case
interface Failure {
  success: false;
  error: string;
  code?: string;
}

// Combined type
type Result<T> = Success<T> | Failure;

// Test function:
function divide(a: number, b: number): Result<number> {
  // Return Failure if b is 0
  // Return Success with result otherwise
}

// Usage:
const result1 = divide(10, 2);
if (result1.success) {
  console.log(result1.data);  // 5
} else {
  console.log(result1.error); // Error message
}

const result2 = divide(10, 0);
// Should be Failure
```

### Task 3: Box/Container Interface

**Implement:**
```typescript
interface Box<T> {
  value: T;
  isEmpty: boolean;
  
  getValue(): T;
  setValue(newValue: T): void;
  map<U>(fn: (value: T) => U): Box<U>;
}

// Create implementation:
function createBox<T>(initialValue: T): Box<T> {
  // Your implementation
  // Hint: Return an object with all Box methods
}

// Test:
const numBox = createBox(42);
console.log(numBox.getValue());      // 42

const strBox = numBox.map(n => `Number: ${n}`);
console.log(strBox.getValue());      // "Number: 42"
```

### Task 4: Key-Value Storage

**Implement:**
```typescript
interface KeyValueStore<K, V> {
  set(key: K, value: V): void;
  get(key: K): V | undefined;
  has(key: K): boolean;
  delete(key: K): boolean;
  size(): number;
}

// Create implementation using Map:
class Store<K, V> implements KeyValueStore<K, V> {
  // Your implementation
}

// Test:
const userStore = new Store<string, User>();
userStore.set("1", { id: "1", name: "Ali" });
console.log(userStore.get("1"));     // { id: "1", name: "Ali" }
console.log(userStore.has("2"));     // false
console.log(userStore.size());       // 1
```

### ✅ Success Criteria:
- [ ] All interfaces defined correctly
- [ ] Type safety maintained
- [ ] Implementations work
- [ ] Tests pass

**Starter code:** `starter-code/exercise-3.ts`

---

## ✅ Exercise 4: Generic Classes (40 min)

**Goal:** Build reusable data structures

### Task 1: Stack

**Implement:**
```typescript
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    // Add to end
  }
  
  pop(): T | undefined {
    // Remove from end
  }
  
  peek(): T | undefined {
    // View last without removing
  }
  
  isEmpty(): boolean {
    // Check if empty
  }
  
  size(): number {
    // Get count
  }
  
  clear(): void {
    // Remove all
  }
}

// Test:
const numStack = new Stack<number>();
numStack.push(1);
numStack.push(2);
numStack.push(3);
console.log(numStack.pop());    // 3
console.log(numStack.peek());   // 2
console.log(numStack.size());   // 2
```

### Task 2: Queue

**Implement:**
```typescript
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    // Add to end
  }
  
  dequeue(): T | undefined {
    // Remove from front
  }
  
  peek(): T | undefined {
    // View front without removing
  }
  
  isEmpty(): boolean {
    // Check if empty
  }
  
  size(): number {
    // Get count
  }
}

// Test:
const taskQueue = new Queue<string>();
taskQueue.enqueue("Task 1");
taskQueue.enqueue("Task 2");
taskQueue.enqueue("Task 3");
console.log(taskQueue.dequeue());  // "Task 1"
console.log(taskQueue.dequeue());  // "Task 2"
console.log(taskQueue.size());     // 1
```

### Task 3: Generic Repository

**Implement:**
```typescript
class Repository<T extends { id: string }> {
  private items: Map<string, T> = new Map();
  
  add(item: T): void {
    // Add using item.id as key
  }
  
  getById(id: string): T | undefined {
    // Retrieve by id
  }
  
  getAll(): T[] {
    // Return all items
  }
  
  update(id: string, updates: Partial<T>): boolean {
    // Update existing item
    // Return true if found, false otherwise
  }
  
  delete(id: string): boolean {
    // Remove item
    // Return true if found, false otherwise
  }
  
  exists(id: string): boolean {
    // Check if exists
  }
  
  count(): number {
    // Get total count
  }
}

// Test:
interface User {
  id: string;
  name: string;
  email: string;
}

const userRepo = new Repository<User>();
userRepo.add({ id: "1", name: "Ali", email: "ali@example.com" });
userRepo.add({ id: "2", name: "Sara", email: "sara@example.com" });

console.log(userRepo.getById("1"));  // User with id "1"
console.log(userRepo.count());       // 2

userRepo.update("1", { name: "Ali Updated" });
console.log(userRepo.getById("1")?.name);  // "Ali Updated"
```

**Note:** `T extends { id: string }` is a constraint (you'll learn more tomorrow!)

### ✅ Success Criteria:
- [ ] All three classes implemented
- [ ] Type safety works
- [ ] All methods functional
- [ ] Tests pass

**Starter code:** `starter-code/exercise-4.ts`

---

## ✅ Exercise 5: SDK Application (45 min)

**Goal:** Apply generics in real WhatsApp SDK

### Scenario:

Your WhatsApp SDK needs:
1. Generic HTTP client for all requests
2. Generic API response handling
3. Type-safe service base class

### Task 1: Generic HTTP Client

**Implement:**
```typescript
interface HTTPConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

class HTTPClient {
  constructor(private config: HTTPConfig) {}
  
  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    // Stub implementation for now
    // Return mock APIResponse<T>
  }
  
  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    // Stub implementation
  }
  
  async put<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    // Stub implementation
  }
  
  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    // Stub implementation
  }
}
```

### Task 2: Generic Base Service

**Implement:**
```typescript
abstract class BaseService<T> {
  constructor(
    protected client: HTTPClient,
    protected basePath: string
  ) {}
  
  async getById(id: string): Promise<APIResponse<T>> {
    return this.client.get<T>(`${this.basePath}/${id}`);
  }
  
  async getAll(): Promise<APIResponse<T[]>> {
    return this.client.get<T[]>(this.basePath);
  }
  
  async create(data: Partial<T>): Promise<APIResponse<T>> {
    return this.client.post<Partial<T>, T>(this.basePath, data);
  }
  
  async update(id: string, data: Partial<T>): Promise<APIResponse<T>> {
    return this.client.put<Partial<T>, T>(`${this.basePath}/${id}`, data);
  }
  
  async delete(id: string): Promise<APIResponse<void>> {
    return this.client.delete<void>(`${this.basePath}/${id}`);
  }
}
```

### Task 3: Specific Services

**Implement:**
```typescript
interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  phone: string;
}

// MessageService extending BaseService
class MessageService extends BaseService<Message> {
  constructor(client: HTTPClient) {
    super(client, '/messages');
  }
  
  // Message-specific method
  async sendText(to: string, text: string): Promise<APIResponse<Message>> {
    return this.create({ to, text });
  }
}

// UserService extending BaseService
class UserService extends BaseService<User> {
  constructor(client: HTTPClient) {
    super(client, '/users');
  }
  
  // User-specific method
  async getByPhone(phone: string): Promise<APIResponse<User | null>> {
    // Implementation
  }
}
```

### Task 4: Integration Test

**Create main SDK client:**
```typescript
class WhatsAppSDK {
  private httpClient: HTTPClient;
  public messages: MessageService;
  public users: UserService;
  
  constructor(config: { apiKey: string }) {
    this.httpClient = new HTTPClient({
      baseURL: 'https://api.whatsapp.com',
      timeout: 5000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`
      }
    });
    
    this.messages = new MessageService(this.httpClient);
    this.users = new UserService(this.httpClient);
  }
}

// Usage test:
const sdk = new WhatsAppSDK({ apiKey: 'test-key' });

// Get message - type is APIResponse<Message>
const message = await sdk.messages.getById('msg-123');

// Get all users - type is APIResponse<User[]>
const users = await sdk.users.getAll();

// Send message - type is APIResponse<Message>
const sent = await sdk.messages.sendText('+1234567890', 'Hello!');
```

### ✅ Success Criteria:
- [ ] HTTPClient generic methods work
- [ ] BaseService reusable for any type
- [ ] Specific services extend properly
- [ ] Full type safety maintained
- [ ] SDK integration works

**Starter code:** `starter-code/exercise-5.ts`

---

## ✅ Exercise 6: Cumulative Revision (30 min)

**Goal:** Week 1-2 concepts + Today's generics

### Task: Phone Validator with Generics

Combine concepts from Week 1-2 with generics:

```typescript
// Validation result (generic)
interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  error?: string;
}

// Generic validator interface
interface Validator<T> {
  validate(input: string): ValidationResult<T>;
}

// Phone validator
class PhoneValidator implements Validator<string> {
  validate(input: string): ValidationResult<string> {
    // Use regex from Week 1
    // Return ValidationResult<string>
  }
}

// Email validator
class EmailValidator implements Validator<string> {
  validate(input: string): ValidationResult<string> {
    // Email validation
  }
}

// Number validator
class NumberValidator implements Validator<number> {
  validate(input: string): ValidationResult<number> {
    // Convert to number and validate
  }
}

// Generic validation function
function validateInput<T>(
  input: string,
  validator: Validator<T>
): ValidationResult<T> {
  return validator.validate(input);
}

// Test:
const phoneValidator = new PhoneValidator();
const result1 = validateInput('+1234567890', phoneValidator);
console.log(result1);  // { isValid: true, value: '+1234567890' }

const numberValidator = new NumberValidator();
const result2 = validateInput('42', numberValidator);
console.log(result2);  // { isValid: true, value: 42 }
```

**Concepts Applied:**
- ✅ Week 1: Interfaces, types, validation logic
- ✅ Week 2: Classes, OOP patterns
- ✅ Today: Generics for reusable validators

### ✅ Success Criteria:
- [ ] All validators implemented
- [ ] Generic interface works
- [ ] Type safety maintained
- [ ] Tests pass

**Starter code:** `starter-code/exercise-6.ts`

---

## ✅ Exercise 7: BONUS Challenge (60+ min)

**Goal:** Advanced generic patterns

### Challenge: Generic Event Emitter

**Implement:**
```typescript
type EventMap = Record<string, any>;

class EventEmitter<Events extends EventMap> {
  private listeners: Map<keyof Events, Function[]> = new Map();
  
  on<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): void {
    // Register listener for event
  }
  
  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    // Trigger all listeners for event
  }
  
  off<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): void {
    // Remove specific listener
  }
  
  once<K extends keyof Events>(
    event: K,
    listener: (data: Events[K]) => void
  ): void {
    // Listen once, then auto-remove
  }
}

// Usage:
interface MyEvents {
  'message:sent': { id: string; to: string };
  'message:received': { id: string; from: string };
  'error': { code: string; message: string };
}

const emitter = new EventEmitter<MyEvents>();

emitter.on('message:sent', (data) => {
  // data is correctly typed as { id: string; to: string }
  console.log(`Message ${data.id} sent to ${data.to}`);
});

emitter.emit('message:sent', { id: '123', to: '+1234567890' });

// This should error (wrong event data type):
// emitter.emit('message:sent', { wrong: 'data' });
```

### ✅ Success Criteria:
- [ ] Full type safety for event names
- [ ] Correct data types per event
- [ ] All methods work
- [ ] TypeScript catches mismatches

---

## 🎯 Complete Exercise Checklist

Mark as complete:

- [ ] Exercise 1: Conceptual Understanding ✓
- [ ] Exercise 2: Generic Functions (5 tasks) ✓
- [ ] Exercise 3: Generic Interfaces (4 tasks) ✓
- [ ] Exercise 4: Generic Classes (3 tasks) ✓
- [ ] Exercise 5: SDK Application (4 tasks) ✓
- [ ] Exercise 6: Cumulative Revision ✓
- [ ] Exercise 7: Bonus Challenge (optional) ✓

**Total Tasks:** 21 main tasks + 1 bonus

---

## 🆘 Troubleshooting

### "Type 'T' is not assignable to..."
**Cause:** Trying to use T in type-specific way  
**Solution:** T can be anything - avoid assuming properties

### "Generic type requires type argument"
**Cause:** Forgot to specify <T> when using generic  
**Solution:** Add type parameter: `new Stack<number>()`

### "Cannot find name 'T'"
**Cause:** T not declared in function/class signature  
**Solution:** Add `<T>` before parameters

---

## 💡 Tips

1. **Start simple:** Get basic version working, then add generics
2. **Test inference:** Try without explicit types first
3. **Use examples:** Refer back to LESSON.md examples
4. **Incremental:** Complete tasks in order
5. **Type errors:** Read them carefully - they're helpful!

---

## 🎉 Completion

You've mastered Day 15 when:

✅ Can write generic functions  
✅ Can create generic interfaces  
✅ Can build generic classes  
✅ Applied generics in SDK  
✅ Understand WHY generics matter  

**Congratulations!** You've unlocked TypeScript's reusability superpower! 🚀

---

**Time Estimate:** 3-4 hours  
**Difficulty:** ⭐⭐⭐ (Intermediate)

Good luck! 💪
