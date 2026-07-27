# 📝 Day 16: Generic Constraints - Exercises

**Goal:** Master generic constraints through progressive practice

---

## 🎯 Overview

6 progressive exercises + 1 bonus challenge:

1. **Conceptual Understanding** (WHY constraints)
2. **Basic Constraints** (extends keyword)
3. **Interface Constraints** (shape requirements)
4. **keyof Constraints** (property access)
5. **SDK Application** (constrained services)
6. **Cumulative Revision** (Days 15-16)
7. **Bonus Challenge** (Advanced patterns)

---

## ✅ Exercise 1: Understanding WHY Constraints (20 min)

**Goal:** Fundamentally samajhna k constraints kyun zaroori hain

### Part A: The Problem

```typescript
// Without constraints
function findById<T>(items: T[], id: string): T | undefined {
  // ❌ This gives an error - why?
  return items.find(item => item.id === id);
}
```

**Questions:**

1. Why does TypeScript give an error on `item.id`?
2. What could T be that doesn't have an 'id' property?
3. How would this crash at runtime if we used `any`?
4. What information does TypeScript need to make this safe?

**Your Answers:**
```
1. 

2. 

3. 

4. 
```

### Part B: The Solution

```typescript
// With constraints
interface HasId {
  id: string;
}

function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id); // ✅ Safe!
}
```

**Questions:**

1. What does `T extends HasId` mean?
2. Can T have MORE properties than just 'id'?
3. What happens if you try: `findById([1, 2, 3], "1")`?
4. Why is this better than using `any`?

**Your Answers:**
```
1. 

2. 

3. 

4. 
```

### ✅ Success Criteria:
- [ ] Understand why unconstrained generics can't access properties
- [ ] Know what extends keyword does
- [ ] Can explain compile-time vs runtime safety

---

## ✅ Exercise 2: Basic Constraints (30 min)

**Goal:** Practice using extends keyword

### Task 1: Length Property

**Implement:**
```typescript
// T must have a length property
function getLength<T /* TODO: add constraint */>(value: T): number {
  // TODO: Return value.length
}

// Test cases:
// console.log(getLength("hello"));      // 5
// console.log(getLength([1, 2, 3]));    // 3
// console.log(getLength({ length: 10 })); // 10
// console.log(getLength(123));          // Should not compile!
```

**Hint:** What interface has a length property?

### Task 2: Numeric Operations

**Implement:**
```typescript
// T must be a number
function double<T /* TODO: add constraint */>(value: T): number {
  // TODO: Return value * 2
}

// Test cases:
// console.log(double(5));    // 10
// console.log(double(3.5));  // 7
// console.log(double("5"));  // Should not compile!
```

### Task 3: String Operations

**Implement:**
```typescript
// T must be a string
function shout<T /* TODO: add constraint */>(text: T): string {
  // TODO: Return text.toUpperCase() + "!!!"
}

// Test cases:
// console.log(shout("hello"));  // "HELLO!!!"
// console.log(shout(123));      // Should not compile!
```

### Task 4: Array Operations

**Implement:**
```typescript
// T must be an array
function firstAndLast<T /* TODO: add constraint */>(arr: T): [T[0], T[number]] | undefined {
  // TODO: Return tuple of first and last elements
  // Return undefined if array is empty
}

// Test cases:
// console.log(firstAndLast([1, 2, 3]));     // [1, 3]
// console.log(firstAndLast(["a", "b"]));   // ["a", "b"]
// console.log(firstAndLast([]));           // undefined
```

### Task 5: Union Constraints

**Implement:**
```typescript
// T must be string OR number
function stringify<T /* TODO: add constraint */>(value: T): string {
  // TODO: Return string representation
}

// Test cases:
// console.log(stringify(42));      // "42"
// console.log(stringify("hello")); // "hello"
// console.log(stringify(true));    // Should not compile!
```

### ✅ Success Criteria:
- [ ] All functions implemented with constraints
- [ ] Invalid types rejected at compile time
- [ ] All test cases pass

**Starter code:** `starter-code/exercise-2.ts`

---

## ✅ Exercise 3: Interface Constraints (40 min)

**Goal:** Constrain to specific object shapes

### Task 1: Entity Operations

**Implement:**
```typescript
interface Entity {
  id: string;
  createdAt: number;
}

// Find entity by ID
function findEntityById<T extends Entity>(
  entities: T[],
  id: string
): T | undefined {
  // TODO: Implement
}

// Get all IDs
function getAllIds<T extends Entity>(entities: T[]): string[] {
  // TODO: Return array of all entity IDs
}

// Sort by creation date
function sortByDate<T extends Entity>(entities: T[]): T[] {
  // TODO: Sort by createdAt (oldest first)
}

// Test with different entity types:
interface User extends Entity {
  name: string;
  email: string;
}

interface Product extends Entity {
  title: string;
  price: number;
}

const users: User[] = [
  { id: "1", name: "Ali", email: "ali@example.com", createdAt: 1000 },
  { id: "2", name: "Sara", email: "sara@example.com", createdAt: 2000 }
];

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500, createdAt: 1500 }
];

// Should work with both:
// findEntityById(users, "1")
// getAllIds(products)
// sortByDate(users)
```

### Task 2: Comparable Objects

**Implement:**
```typescript
interface Comparable {
  compareTo(other: this): number;
}

// Generic sort for comparable objects
function sort<T extends Comparable>(items: T[]): T[] {
  // TODO: Use item.compareTo() to sort
}

// Test class:
class Version implements Comparable {
  constructor(
    public major: number,
    public minor: number,
    public patch: number
  ) {}

  compareTo(other: Version): number {
    if (this.major !== other.major) return this.major - other.major;
    if (this.minor !== other.minor) return this.minor - other.minor;
    return this.patch - other.patch;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

// Test:
// const versions = [
//   new Version(2, 0, 0),
//   new Version(1, 5, 3),
//   new Version(1, 6, 0)
// ];
// const sorted = sort(versions);
// console.log(sorted.map(v => v.toString())); // ["1.5.3", "1.6.0", "2.0.0"]
```

### Task 3: Multiple Property Constraints

**Implement:**
```typescript
interface HasId {
  id: string;
}

interface HasName {
  name: string;
}

interface HasTimestamp {
  createdAt: number;
  updatedAt: number;
}

// T must have id, name, AND timestamps
function logFullEntity<T extends HasId & HasName & HasTimestamp>(
  entity: T
): void {
  // TODO: Log formatted string with all required properties
  // Format: "[id] name (created: ..., updated: ...)"
}

// Update timestamp
function touch<T extends HasTimestamp>(entity: T): T {
  // TODO: Update updatedAt to current time
  // Return the updated entity
}

// Test:
interface Article extends HasId, HasName, HasTimestamp {
  content: string;
}

const article: Article = {
  id: "a1",
  name: "TypeScript Guide",
  content: "...",
  createdAt: Date.now() - 10000,
  updatedAt: Date.now() - 5000
};

// logFullEntity(article);
// touch(article);
```

### ✅ Success Criteria:
- [ ] All interface constraints work
- [ ] Functions accept correct types
- [ ] Invalid types rejected
- [ ] Test cases pass

**Starter code:** `starter-code/exercise-3.ts`

---

## ✅ Exercise 4: keyof Constraints (40 min)

**Goal:** Master property key constraints

### Task 1: Safe Property Access

**Implement:**
```typescript
// Get property value safely
function getProperty<T, K extends keyof T>(
  obj: T,
  key: K
): T[K] {
  // TODO: Return obj[key]
}

// Test:
const user = {
  id: "1",
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

// const name = getProperty(user, "name");    // string
// const age = getProperty(user, "age");      // number
// const x = getProperty(user, "invalid");    // Should not compile!
```

### Task 2: Safe Property Update

**Implement:**
```typescript
// Update property with type safety
function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  // TODO: Set obj[key] = value
}

// Test:
const product = {
  id: "p1",
  title: "Phone",
  price: 500
};

// setProperty(product, "title", "New Phone"); // ✅ OK
// setProperty(product, "price", 600);         // ✅ OK
// setProperty(product, "price", "600");       // ❌ Should not compile!
```

### Task 3: Pick Multiple Properties

**Implement:**
```typescript
// Extract subset of properties
function pick<T, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Pick<T, K> {
  // TODO: Create object with only specified keys
}

// Test:
const user = {
  id: "1",
  name: "Ali",
  age: 25,
  email: "ali@example.com",
  password: "hashed"
};

// const publicUser = pick(user, "id", "name", "email");
// Type should be: { id: string; name: string; email: string }
```

### Task 4: Sort by Property

**Implement:**
```typescript
// Sort array by any property
function sortBy<T, K extends keyof T>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  // TODO: Sort by specified property
  // Handle both ascending and descending
}

// Test:
interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500, rating: 4.5 },
  { id: "p2", title: "Laptop", price: 1000, rating: 4.8 },
  { id: "p3", title: "Mouse", price: 20, rating: 4.2 }
];

// const byPrice = sortBy(products, "price");           // Ascending
// const byRating = sortBy(products, "rating", "desc"); // Descending
// const byInvalid = sortBy(products, "invalid");       // Should not compile!
```

### Task 5: Group by Property

**Implement:**
```typescript
// Group array items by property value
function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Map<T[K], T[]> {
  // TODO: Group items by property value
  // Return Map where key is property value, value is array of items
}

// Test:
interface Order {
  id: string;
  status: 'pending' | 'shipped' | 'delivered';
  amount: number;
}

const orders: Order[] = [
  { id: "o1", status: "pending", amount: 100 },
  { id: "o2", status: "shipped", amount: 200 },
  { id: "o3", status: "pending", amount: 150 }
];

// const byStatus = groupBy(orders, "status");
// byStatus.get("pending") // Array of 2 orders
// byStatus.get("shipped") // Array of 1 order
```

### ✅ Success Criteria:
- [ ] All keyof constraints work correctly
- [ ] Property access is type-safe
- [ ] Return types are inferred correctly
- [ ] Invalid keys rejected at compile time

**Starter code:** `starter-code/exercise-4.ts`

---

## ✅ Exercise 5: SDK Application (45 min)

**Goal:** Apply constraints in real WhatsApp SDK

### Scenario:

Build constrained service layer for WhatsApp SDK

### Task 1: Base Entity Interface

**Implement:**
```typescript
// All SDK entities must extend this
interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

// Helper to create new entity
function createEntity<T extends BaseEntity>(
  data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>
): T {
  // TODO: Generate ID and timestamps
  // Return complete entity
}

// Helper to update entity
function updateEntity<T extends BaseEntity>(
  existing: T,
  updates: Partial<Omit<T, 'id' | 'createdAt'>>
): T {
  // TODO: Merge updates and update timestamp
  // Don't allow id or createdAt to change
}
```

### Task 2: Constrained Repository

**Implement:**
```typescript
class Repository<T extends BaseEntity> {
  private items: Map<string, T> = new Map();

  add(entity: T): void {
    // TODO: Add to map
  }

  getById(id: string): T | undefined {
    // TODO: Get by ID
  }

  update(id: string, updates: Partial<T>): T | null {
    // TODO: Get existing entity
    // TODO: Update with updateEntity helper
    // TODO: Save and return
  }

  delete(id: string): boolean {
    // TODO: Delete and return success
  }

  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    // TODO: Find all entities where entity[key] === value
  }

  getAll(): T[] {
    // TODO: Return all entities
  }
}
```

### Task 3: Domain Entities

**Define:**
```typescript
interface Message extends BaseEntity {
  to: string;
  from: string;
  text: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

interface User extends BaseEntity {
  phone: string;
  name: string;
  lastSeen: number;
}

interface Media extends BaseEntity {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  size: number;
}
```

### Task 4: Service Layer

**Implement:**
```typescript
class MessageService {
  private repo = new Repository<Message>();

  async send(to: string, text: string): Promise<Message> {
    // TODO: Create message entity
    // TODO: Add to repository
    // TODO: Return message
  }

  async getByPhone(phone: string): Promise<Message[]> {
    // TODO: Find all messages to phone
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    // TODO: Update status to 'read'
  }
}

class UserService {
  private repo = new Repository<User>();

  async create(phone: string, name: string): Promise<User> {
    // TODO: Create user entity
    // TODO: Add to repository
  }

  async updateLastSeen(userId: string): Promise<User | null> {
    // TODO: Update lastSeen to now
  }

  async searchByName(name: string): Promise<User[]> {
    // TODO: Find users by name (partial match)
  }
}
```

### Task 5: Integration Test

**Test:**
```typescript
async function testSDK() {
  const messageService = new MessageService();
  const userService = new UserService();

  // Create user
  const user = await userService.create("+1234567890", "Ali");
  console.log("User created:", user);

  // Send message
  const message = await messageService.send("+9876543210", "Hello!");
  console.log("Message sent:", message);

  // Mark as read
  const updated = await messageService.markAsRead(message.id);
  console.log("Message marked as read:", updated);

  // Find messages
  const messages = await messageService.getByPhone("+9876543210");
  console.log("Messages found:", messages.length);
}

// testSDK();
```

### ✅ Success Criteria:
- [ ] BaseEntity constraint works
- [ ] Repository is type-safe
- [ ] Services use constrained repository
- [ ] All CRUD operations work
- [ ] keyof constraints for findBy
- [ ] Integration test passes

**Starter code:** `starter-code/exercise-5.ts`

---

## ✅ Exercise 6: Cumulative Revision (30 min)

**Goal:** Combine Days 15-16 concepts

### Task: Generic Validator with Constraints

Build on Day 15's validator, add constraints:

```typescript
// Base validator result
interface ValidationResult<T> {
  isValid: boolean;
  value?: T;
  error?: string;
}

// Validator must return ValidationResult
interface Validator<TInput, TOutput> {
  validate(input: TInput): ValidationResult<TOutput>;
}

// Constraint: TOutput must extend TInput or be compatible
class TypeValidator<T> implements Validator<unknown, T> {
  constructor(
    private typeName: string,
    private checker: (value: unknown) => value is T
  ) {}

  validate(input: unknown): ValidationResult<T> {
    // TODO: Use type guard to check
    // TODO: Return ValidationResult
  }
}

// Constraint: T must have specific properties
class ObjectValidator<T extends Record<string, any>> 
  implements Validator<unknown, T> {
  
  constructor(
    private schema: { [K in keyof T]: Validator<any, T[K]> }
  ) {}

  validate(input: unknown): ValidationResult<T> {
    // TODO: Validate each property
    // TODO: Return ValidationResult<T>
  }
}

// Test:
interface UserData {
  name: string;
  age: number;
  email: string;
}

const userValidator = new ObjectValidator<UserData>({
  name: new TypeValidator("string", (v): v is string => typeof v === "string"),
  age: new TypeValidator("number", (v): v is number => typeof v === "number"),
  email: new TypeValidator("string", (v): v is string => typeof v === "string")
});

// const result = userValidator.validate({
//   name: "Ali",
//   age: 25,
//   email: "ali@example.com"
// });
```

### ✅ Success Criteria:
- [ ] Validators use constraints
- [ ] Type guards work
- [ ] Nested validation works
- [ ] Full type safety

**Starter code:** `starter-code/exercise-6.ts`

---

## ✅ Exercise 7: BONUS Challenge (60+ min)

**Goal:** Advanced constraint patterns

### Challenge: Type-Safe Query Builder

**Implement:**
```typescript
interface Entity {
  id: string;
  [key: string]: any;
}

// Query builder with constraints
class QueryBuilder<T extends Entity> {
  private filters: Array<(item: T) => boolean> = [];
  private sortKey?: keyof T;
  private sortDir: 'asc' | 'desc' = 'asc';

  where<K extends keyof T>(
    key: K,
    operator: '=' | '!=' | '>' | '<' | '>=' | '<=',
    value: T[K]
  ): this {
    // TODO: Add filter based on operator
    return this;
  }

  orderBy<K extends keyof T>(key: K, direction: 'asc' | 'desc' = 'asc'): this {
    // TODO: Set sort key and direction
    return this;
  }

  execute(items: T[]): T[] {
    // TODO: Apply all filters
    // TODO: Apply sorting
    // TODO: Return results
  }
}

// Test:
interface Product extends Entity {
  title: string;
  price: number;
  rating: number;
  inStock: boolean;
}

const products: Product[] = [
  { id: "1", title: "Phone", price: 500, rating: 4.5, inStock: true },
  { id: "2", title: "Laptop", price: 1000, rating: 4.8, inStock: false },
  { id: "3", title: "Mouse", price: 20, rating: 4.2, inStock: true }
];

const query = new QueryBuilder<Product>();
const results = query
  .where("inStock", "=", true)
  .where("price", ">", 50)
  .orderBy("rating", "desc")
  .execute(products);
```

### ✅ Success Criteria:
- [ ] Full type safety on where clause
- [ ] Only valid keys accepted
- [ ] Operators work correctly
- [ ] Sorting works
- [ ] Chaining works

---

## 🎯 Complete Checklist

- [ ] Exercise 1: Conceptual Understanding ✓
- [ ] Exercise 2: Basic Constraints (5 tasks) ✓
- [ ] Exercise 3: Interface Constraints (3 tasks) ✓
- [ ] Exercise 4: keyof Constraints (5 tasks) ✓
- [ ] Exercise 5: SDK Application (5 tasks) ✓
- [ ] Exercise 6: Cumulative Revision ✓
- [ ] Exercise 7: Bonus Challenge (optional) ✓

**Total:** 19 main tasks + 1 bonus

---

## 🎉 Completion

You've mastered Day 16 when:

✅ Understand WHY constraints are necessary  
✅ Can constrain with extends  
✅ Can use interface constraints  
✅ Master keyof for property access  
✅ Applied constraints in SDK  

**You've unlocked type-safe generic programming!** 🚀

---

**Time Estimate:** 3-4 hours  
**Difficulty:** ⭐⭐⭐⭐ (Intermediate-Advanced)

Good luck! 💪
