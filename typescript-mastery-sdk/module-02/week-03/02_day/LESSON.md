# 📘 Day 16: Generic Constraints - Complete Lesson

**Duration:** 60-90 minutes  
**Goal:** Generic constraints ko fundamentally samajhna - WHY, HOW, WHEN

---

## 📋 Table of Contents

1. [The Problem Without Constraints](#the-problem)
2. [What Are Generic Constraints?](#what-are-constraints)
3. [Basic Constraints with extends](#basic-constraints)
4. [Interface Constraints](#interface-constraints)
5. [keyof Constraints](#keyof-constraints)
6. [Multiple Constraints](#multiple-constraints)
7. [Default Type Parameters](#default-types)
8. [SDK Applications](#sdk-application)

---

## 🔴 Part 1: The Problem Without Constraints {#the-problem}

### Yesterday's Generic Problem

Kal (Day 15) tumne generics seekhe - T works with ANY type:

```typescript
function identity<T>(value: T): T {
  return value;
}
```

**Ye achha hai!** But ek problem hai...

### The Limitation

```typescript
// Generic function to find by ID
function findById<T>(items: T[], id: string): T | undefined {
  // ❌ ERROR: Property 'id' does not exist on type 'T'
  return items.find(item => item.id === id);
}
```

**Problem:** TypeScript doesn't know if T has an `id` property!

### Why This Error?

```typescript
// T can be ANYTHING:
findById<number>([1, 2, 3], "1");        // number doesn't have .id
findById<string>(["a", "b"], "a");       // string doesn't have .id
findById<boolean>([true, false], "x");   // boolean doesn't have .id
```

TypeScript is protecting you! T could be `number`, and `number.id` doesn't exist.

### The Unsafe "Solution" (DON'T DO THIS)

```typescript
// ❌ BAD: Using 'any' cast
function findById<T>(items: T[], id: string): T | undefined {
  return items.find((item: any) => item.id === id);
}

// This compiles but crashes at runtime:
const numbers = [1, 2, 3];
findById(numbers, "1"); // Runtime error: Cannot read property 'id' of undefined
```

**Problem:** We lost type safety!

### Real-World Analogy 🌍

**Imagine a function:**

```
"Give me items and I'll find one by ID"
```

**Without constraints:**
- You can pass ANYTHING (numbers, strings, booleans)
- Function tries to access `.id` on number → crashes!

**With constraints:**
- "I only accept items that HAVE an id property"
- TypeScript checks at compile time
- No runtime crashes!

---

## 💡 Part 2: What Are Generic Constraints? {#what-are-constraints}

### Simple Definition

> **Generic Constraint = Telling TypeScript what properties/methods T must have**

### Syntax

```typescript
function func<T extends Constraint>(param: T): ReturnType {
  // Now T is guaranteed to have properties from Constraint
}
```

**`extends`** keyword means: "T can be anything, BUT it must at least have what Constraint defines"

### The extends Keyword

```typescript
<T extends Type>
```

This means:
- T can be Type itself
- T can be any subtype of Type
- T must have all properties that Type has

**Think of it as:** "T must be compatible with Type"

### Example: Solving Our Problem

```typescript
// Define what we need
interface HasId {
  id: string;
}

// Constrain T to have 'id' property
function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id); // ✅ Safe!
}

// Usage:
interface User {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

const users: User[] = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Sara" }
];

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500 }
];

const user = findById(users, "1");       // ✅ Works!
const product = findById(products, "p1"); // ✅ Works!

// This won't compile:
// findById([1, 2, 3], "1"); // ❌ Error: number doesn't extend HasId
```

---

## 🔧 Part 3: Basic Constraints {#basic-constraints}

### Constraining to Primitive Types

```typescript
// Only accept numbers
function double<T extends number>(value: T): T {
  return (value * 2) as T;
}

double(5);    // ✅ OK
// double("5"); // ❌ Error: string doesn't extend number

// Only accept strings
function toUpperCase<T extends string>(value: T): Uppercase<T> {
  return value.toUpperCase() as Uppercase<T>;
}

toUpperCase("hello"); // ✅ OK
// toUpperCase(123);   // ❌ Error
```

### Constraining to Arrays

```typescript
// T must be an array
function getFirst<T extends any[]>(arr: T): T[0] | undefined {
  return arr[0];
}

getFirst([1, 2, 3]);        // ✅ OK
getFirst(["a", "b"]);       // ✅ OK
// getFirst(123);           // ❌ Error: not an array
```

### Constraining to Objects

```typescript
// T must be an object
function getKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

getKeys({ name: "Ali", age: 25 }); // ✅ OK
// getKeys(123);                   // ❌ Error: not an object
```

### Constraining to Union Types

```typescript
// T must be one of these types
function process<T extends string | number>(value: T): string {
  return `Value: ${value}`;
}

process("hello");  // ✅ OK
process(42);       // ✅ OK
// process(true);  // ❌ Error: boolean not in union
```

---

## 📦 Part 4: Interface Constraints {#interface-constraints}

### Pattern: Constrain to Shape

```typescript
// Define required shape
interface HasName {
  name: string;
}

// Function works with anything that has 'name'
function greet<T extends HasName>(person: T): string {
  return `Hello, ${person.name}!`;
}

// Works with any object that has 'name'
const user = { name: "Ali", age: 25 };
const product = { name: "Phone", price: 500 };

greet(user);    // ✅ "Hello, Ali!"
greet(product); // ✅ "Hello, Phone!"
```

### Pattern: Combining Properties

```typescript
interface HasId {
  id: string;
}

interface HasTimestamp {
  createdAt: number;
  updatedAt: number;
}

// T must have both id and timestamps
function logEntity<T extends HasId & HasTimestamp>(entity: T): void {
  console.log(`Entity ${entity.id} created at ${entity.createdAt}`);
}

const user = {
  id: "1",
  name: "Ali",
  createdAt: Date.now(),
  updatedAt: Date.now()
};

logEntity(user); // ✅ OK - has all required properties
```

### Pattern: Array Element Constraint

```typescript
interface Entity {
  id: string;
  name: string;
}

// Array of entities
function getAllIds<T extends Entity>(items: T[]): string[] {
  return items.map(item => item.id);
}

const users = [
  { id: "1", name: "Ali", email: "ali@example.com" },
  { id: "2", name: "Sara", email: "sara@example.com" }
];

const ids = getAllIds(users); // ["1", "2"]
```

### Real Example: Repository Pattern

```typescript
// Base entity interface
interface Entity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

// Repository only works with Entity types
class Repository<T extends Entity> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    item.createdAt = Date.now(); // ✅ Safe - T has createdAt
    item.updatedAt = Date.now(); // ✅ Safe - T has updatedAt
    this.items.set(item.id, item); // ✅ Safe - T has id
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(item: T): void {
    item.updatedAt = Date.now(); // ✅ Safe
    this.items.set(item.id, item);
  }
}

// User extends Entity
interface User extends Entity {
  name: string;
  email: string;
}

const userRepo = new Repository<User>();
userRepo.add({
  id: "1",
  name: "Ali",
  email: "ali@example.com",
  createdAt: 0,  // Will be set by add()
  updatedAt: 0
});
```

---

## 🔑 Part 5: keyof Constraints {#keyof-constraints}

### What is keyof?

`keyof T` = Union of all property keys of T

```typescript
interface User {
  id: string;
  name: string;
  age: number;
}

type UserKeys = keyof User; // "id" | "name" | "age"
```

### Pattern: Safe Property Access

```typescript
// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: "1",
  name: "Ali",
  age: 25
};

const name = getProperty(user, "name");  // string
const age = getProperty(user, "age");    // number
// const x = getProperty(user, "invalid"); // ❌ Error!
```

**Why this is powerful:**
- TypeScript knows return type based on key
- Impossible to access non-existent properties
- Full autocomplete support

### Pattern: Safe Property Update

```typescript
function updateProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

const user = {
  id: "1",
  name: "Ali",
  age: 25
};

updateProperty(user, "name", "Ali Updated"); // ✅ OK
updateProperty(user, "age", 30);             // ✅ OK
// updateProperty(user, "age", "30");        // ❌ Error: wrong type
// updateProperty(user, "invalid", "x");     // ❌ Error: invalid key
```

### Pattern: Pluck Multiple Properties

```typescript
function pluck<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

const user = {
  id: "1",
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

const basic = pluck(user, "id", "name"); // { id: string; name: string }
```

### Pattern: Sort by Property

```typescript
function sortBy<T, K extends keyof T>(
  items: T[],
  key: K
): T[] {
  return [...items].sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
}

const users = [
  { id: "2", name: "Sara", age: 30 },
  { id: "1", name: "Ali", age: 25 }
];

const byName = sortBy(users, "name"); // Sorted by name
const byAge = sortBy(users, "age");   // Sorted by age
// const byX = sortBy(users, "invalid"); // ❌ Error!
```

---

## 🔗 Part 6: Multiple Constraints {#multiple-constraints}

### Intersection Constraints

```typescript
interface HasId {
  id: string;
}

interface HasName {
  name: string;
}

// T must have BOTH id and name
function display<T extends HasId & HasName>(item: T): string {
  return `${item.id}: ${item.name}`;
}

const user = { id: "1", name: "Ali", age: 25 };
display(user); // ✅ OK - has both id and name
```

### Chained Constraints

```typescript
// T must be an object with 'id'
// K must be a key of T
function updateField<
  T extends { id: string },
  K extends keyof T
>(item: T, key: K, value: T[K]): void {
  console.log(`Updating ${item.id}.${String(key)} to ${value}`);
  item[key] = value;
}
```

### Union + Constraint

```typescript
// T can be User OR Admin, and must have 'id'
type UserOrAdmin = User | Admin;

function process<T extends UserOrAdmin & { id: string }>(item: T): void {
  console.log(item.id);
}
```

---

## 🎯 Part 7: Default Type Parameters {#default-types}

### Basic Default

```typescript
// T defaults to string if not specified
function wrap<T = string>(value: T): { value: T } {
  return { value };
}

const a = wrap("hello");  // T = string (explicit)
const b = wrap(42);       // T = number (inferred)
const c = wrap();         // Error: value required

// With optional parameter:
function create<T = string>(value?: T): { value: T | undefined } {
  return { value };
}

const d = create();       // T = string (default)
const e = create("hi");   // T = string
const f = create(100);    // T = number
```

### Default with Constraint

```typescript
interface Entity {
  id: string;
}

// T defaults to Entity, but can be any subtype
class Repository<T extends Entity = Entity> {
  private items: Map<string, T> = new Map();
  
  add(item: T): void {
    this.items.set(item.id, item);
  }
}

// Use default
const repo1 = new Repository(); // Repository<Entity>

// Override default
interface User extends Entity {
  name: string;
}
const repo2 = new Repository<User>(); // Repository<User>
```

---

## 🚀 Part 8: SDK Applications {#sdk-application}

### Pattern 1: Constrained Base Service

```typescript
// All entities must have id and timestamps
interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

abstract class BaseService<T extends BaseEntity> {
  protected items: Map<string, T> = new Map();

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T> {
    const entity = {
      ...data,
      id: this.generateId(),
      createdAt: Date.now(),
      updatedAt: Date.now()
    } as T;

    this.items.set(entity.id, entity);
    return entity;
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...data,
      updatedAt: Date.now() // ✅ Safe - T extends BaseEntity
    };

    this.items.set(id, updated);
    return updated;
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random()}`;
  }
}

// Specific service
interface Message extends BaseEntity {
  text: string;
  to: string;
}

class MessageService extends BaseService<Message> {
  // Inherits all base methods with type safety
}
```

### Pattern 2: Type-Safe Event System

```typescript
// Events must have 'type' property
interface BaseEvent {
  type: string;
  timestamp: number;
}

class EventEmitter<T extends BaseEvent> {
  private listeners: Array<(event: T) => void> = [];

  on(listener: (event: T) => void): void {
    this.listeners.push(listener);
  }

  emit(event: Omit<T, 'timestamp'>): void {
    const fullEvent = {
      ...event,
      timestamp: Date.now()
    } as T;

    this.listeners.forEach(listener => listener(fullEvent));
  }
}

// Usage
interface MessageEvent extends BaseEvent {
  type: 'message';
  text: string;
  from: string;
}

const emitter = new EventEmitter<MessageEvent>();
emitter.on(event => {
  console.log(event.text, event.timestamp); // ✅ Type-safe
});

emitter.emit({
  type: 'message',
  text: 'Hello',
  from: '+123'
});
```

---

## 🎯 Summary

### What You Learned:

✅ **WHY Constraints:** Access properties safely on generic types  
✅ **HOW to Constrain:** `T extends Type` syntax  
✅ **Interface Constraints:** `T extends { property: type }`  
✅ **keyof Constraints:** `K extends keyof T` for safe property access  
✅ **Multiple Constraints:** `T extends A & B`  
✅ **Default Types:** `T = DefaultType`  

### Key Takeaway:

> **Constraints = Balance between flexibility and safety**

---

**Next:** Complete exercises to master constraints! 🚀
