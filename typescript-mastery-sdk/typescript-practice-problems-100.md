# 🔥 TypeScript Practice Problems — 100+ Exercises
## Easy → Medium → Hard → SDK-Level

> **Rule:** Har problem ko pehle khud solve karo, phir solution dekho.
> **Time:** Roz 5-10 problems. 2 hafte mein complete.

---

# LEVEL 1: BASICS (Problems 1-25)

## Problem 1: Variable Types
Declare variables with correct types:
- `userName` = "Talha"
- `userAge` = 25
- `isActive` = true
- `balance` = 99.99
- `emptyValue` = null

```ts
// Your code here





```

<details>
<summary>Solution</summary>

```ts
let userName: string = "Talha";
let userAge: number = 25;
let isActive: boolean = true;
let balance: number = 99.99;
let emptyValue: null = null;
```
</details>

---

## Problem 2: Array Types
Create typed arrays:
- Array of numbers: scores = [90, 85, 95]
- Array of strings: names = ["Ali", "Sara"]
- Mixed array (numbers and strings only): mixed = [1, "two", 3, "four"]

```ts
// Your code here



```

<details>
<summary>Solution</summary>

```ts
let scores: number[] = [90, 85, 95];
let names: string[] = ["Ali", "Sara"];
let mixed: (number | string)[] = [1, "two", 3, "four"];
```
</details>

---

## Problem 3: Object Type
Create a `Product` type and object:
- id: number
- name: string
- price: number
- inStock: boolean

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

let laptop: Product = {
  id: 1,
  name: "MacBook Pro",
  price: 1999,
  inStock: true,
};
```
</details>

---

## Problem 4: Optional Properties
Create a `User` interface where:
- `id` and `name` are required
- `email` and `phone` are optional

Create two users — one with all fields, one with only required fields.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
interface User {
  id: number;
  name: string;
  email?: string;
  phone?: string;
}

let user1: User = { id: 1, name: "Ali", email: "ali@test.com", phone: "123" };
let user2: User = { id: 2, name: "Sara" };
```
</details>

---

## Problem 5: Function Types
Write a function `calculateTotal` that:
- Takes `price` (number) and `quantity` (number)
- Returns total price (number)
- Has a default tax rate of 0.1 (10%)

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
function calculateTotal(price: number, quantity: number, taxRate: number = 0.1): number {
  return price * quantity * (1 + taxRate);
}

console.log(calculateTotal(100, 2));      // 220
console.log(calculateTotal(100, 2, 0.2)); // 240
```
</details>

---

## Problem 6: Void vs Return
Write two functions:
1. `logMessage(msg: string)` — logs to console, returns nothing
2. `formatMessage(msg: string)` — returns formatted string

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
function logMessage(msg: string): void {
  console.log(msg);
}

function formatMessage(msg: string): string {
  return `[${new Date().toISOString()}] ${msg}`;
}
```
</details>

---

## Problem 7: Union Types
Create a type `ID` that can be either `string` or `number`.
Write a function `processId(id: ID)` that:
- If string, returns uppercase version
- If number, returns doubled value

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
type ID = string | number;

function processId(id: ID): string | number {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id * 2;
}
```
</details>

---

## Problem 8: Type Alias vs Interface
Create a `Point` type with x and y coordinates using:
1. Interface
2. Type alias

Then create a function `getDistance(p1: Point, p2: Point)` that returns distance.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
// Using interface
interface Point {
  x: number;
  y: number;
}

// Using type (same thing)
// type Point = { x: number; y: number; };

function getDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
```
</details>

---

## Problem 9: Readonly
Create a `Config` interface with:
- `apiKey` (readonly string)
- `baseUrl` (readonly string)
- `timeout` (number — can change)

Try to change `apiKey` after creation and see the error.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number;
}

let config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com",
  timeout: 5000,
};

config.timeout = 10000;     // ✅ OK
// config.apiKey = "new";   // ❌ ERROR: Cannot assign to readonly
```
</details>

---

## Problem 10: Enum vs Union
Create a `Status` enum with: Pending, Approved, Rejected.
Then create the same using a union type.

Which is better and why?

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
// Enum approach
enum StatusEnum {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

// Union approach (preferred!)
type StatusUnion = "pending" | "approved" | "rejected";

// Union is better because:
// 1. No extra JS code generated
// 2. Better type inference
// 3. Works with `as const`
```
</details>

---

## Problem 11: Tuple Types
Create types for:
- `Coordinate` = [number, number] (x, y)
- `UserEntry` = [number, string, boolean] (id, name, isActive)

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
type Coordinate = [number, number];
type UserEntry = [number, string, boolean];

let point: Coordinate = [10, 20];
let user: UserEntry = [1, "Ali", true];
```
</details>

---

## Problem 12: Function as Parameter
Write a function `processItems` that:
- Takes an array of strings
- Takes a callback function `(item: string) => string`
- Returns new array with callback applied

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
function processItems(items: string[], processor: (item: string) => string): string[] {
  return items.map(processor);
}

let result = processItems(["a", "b", "c"], (item) => item.toUpperCase());
// ["A", "B", "C"]
```
</details>

---

## Problem 13: Class Basics
Create a `BankAccount` class with:
- Private `balance` property
- Public `deposit(amount: number)` method
- Public `withdraw(amount: number)` method
- Public `getBalance()` method

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
class BankAccount {
  private balance: number = 0;

  deposit(amount: number): void {
    this.balance += amount;
  }

  withdraw(amount: number): boolean {
    if (amount > this.balance) return false;
    this.balance -= amount;
    return true;
  }

  getBalance(): number {
    return this.balance;
  }
}

let account = new BankAccount();
account.deposit(100);
console.log(account.getBalance()); // 100
```
</details>

---

## Problem 14: Class with Constructor Shorthand
Rewrite Problem 13 using constructor parameter properties.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
class BankAccount {
  constructor(private balance: number = 0) {}

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }
}
```
</details>

---

## Problem 15: Inheritance
Create:
- `Animal` class with `name` and `makeSound()`
- `Dog` class extends `Animal` with `breed` and overrides `makeSound()` to return "Woof!"

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
class Animal {
  constructor(public name: string) {}

  makeSound(): string {
    return "Some sound";
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }

  makeSound(): string {
    return "Woof!";
  }
}

let dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.makeSound()); // "Woof!"
```
</details>

---

## Problem 16: Interface Implementation
Create a `Logger` interface with `log(msg: string): void`.
Implement it in:
1. `ConsoleLogger` — logs to console
2. `FileLogger` — stores in array

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
interface Logger {
  log(msg: string): void;
}

class ConsoleLogger implements Logger {
  log(msg: string): void {
    console.log(msg);
  }
}

class FileLogger implements Logger {
  private logs: string[] = [];

  log(msg: string): void {
    this.logs.push(msg);
  }

  getLogs(): string[] {
    return this.logs;
  }
}
```
</details>

---

## Problem 17: Type Inference
What are the types of these variables? (Don't write types, let TS infer)

```ts
let a = "hello";
let b = 42;
let c = [1, 2, 3];
let d = [1, "two"];
let e = { name: "Ali", age: 25 };
```

<details>
<summary>Solution</summary>

```ts
let a = "hello";           // string
let b = 42;                // number
let c = [1, 2, 3];         // number[]
let d = [1, "two"];        // (number | string)[]
let e = { name: "Ali", age: 25 };  // { name: string; age: number; }
```
</details>

---

## Problem 18: Null Checks
Write a function `getLength` that takes `string | null | undefined` and returns length or 0.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
function getLength(value: string | null | undefined): number {
  return value?.length ?? 0;
}

// Or:
function getLength2(value: string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  return value.length;
}
```
</details>

---

## Problem 19: Rest Parameters
Write a function `sumAll` that takes any number of arguments and returns their sum.

```ts
// Your code here


```

<details>
<summary>Solution</summary>

```ts
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sumAll(1, 2, 3, 4, 5); // 15
sumAll(10, 20);        // 30
```
</details>

---

## Problem 20: Destructuring with Types
Write a function that takes a user object and destructures with types:

```ts
function displayUser(user: { name: string; age: number; email: string }) {
  // Destructure here with types
}
```

<details>
<summary>Solution</summary>

```ts
function displayUser({ name, age, email }: { name: string; age: number; email: string }) {
  console.log(`${name} (${age}) - ${email}`);
}
```
</details>

---

## Problem 21-25: Quick Fire

**21.** Create a type for API response: `{ data: any, status: number, message: string }`

**22.** Create a function that accepts either a single string or array of strings.

**23.** Create an interface `HasId` with `id: string`, then create `Product extends HasId`.

**24.** Write a function that returns `never` (always throws error).

**25.** Create a readonly tuple for RGB color: `[number, number, number]`.

<details>
<summary>Solutions 21-25</summary>

```ts
// 21
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// 22
function processInput(input: string | string[]): void {
  if (Array.isArray(input)) {
    input.forEach(console.log);
  } else {
    console.log(input);
  }
}

// 23
interface HasId {
  id: string;
}

interface Product extends HasId {
  name: string;
  price: number;
}

// 24
function fail(message: string): never {
  throw new Error(message);
}

// 25
type RGB = readonly [number, number, number];
let red: RGB = [255, 0, 0];
// red[0] = 200; // ❌ ERROR: Readonly
```
</details>

---

# LEVEL 2: INTERMEDIATE (Problems 26-60)

## Problem 26: Generic Function
Write a generic function `identity<T>(value: T): T`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function identity<T>(value: T): T {
  return value;
}

identity<string>("hello");  // string
identity<number>(42);       // number
```
</details>

---

## Problem 27: Generic with Constraint
Write a generic function `getLength<T>` that works with anything having a `length` property.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength("hello");     // ✅ 5
getLength([1, 2, 3]);   // ✅ 3
// getLength(42);       // ❌ ERROR: number has no length
```
</details>

---

## Problem 28: Generic Interface
Create a generic `Response<T>` interface with `data`, `status`, and `error?`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface Response<T> {
  data: T | null;
  status: number;
  error?: string;
}

let userResponse: Response<{ name: string }> = {
  data: { name: "Ali" },
  status: 200,
};
```
</details>

---

## Problem 29: Generic Class
Create a generic `Queue<T>` class with `enqueue`, `dequeue`, and `peek`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
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

  get size(): number {
    return this.items.length;
  }
}

let numberQueue = new Queue<number>();
numberQueue.enqueue(10);
numberQueue.enqueue(20);
console.log(numberQueue.dequeue()); // 10
```
</details>

---

## Problem 30: keyof Operator
Given `interface User { id: number; name: string; email: string; }`,
create a function `getProperty(user, key)` that returns the property value.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface User {
  id: number;
  name: string;
  email: string;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

let user: User = { id: 1, name: "Ali", email: "ali@test.com" };
getProperty(user, "name");   // ✅ "Ali"
// getProperty(user, "age"); // ❌ ERROR: "age" not in User
```
</details>

---

## Problem 31: typeof Operator
Use `typeof` to create a type from a runtime object.

```ts
const config = {
  apiVersion: "v18.0",
  timeout: 5000,
  retries: 3,
};

// Create a type from config
```

<details>
<summary>Solution</summary>

```ts
type Config = typeof config;
// { apiVersion: string; timeout: number; retries: number; }

// Even better with as const:
const config2 = {
  apiVersion: "v18.0",
  timeout: 5000,
  retries: 3,
} as const;

type Config2 = typeof config2;
// { readonly apiVersion: "v18.0"; readonly timeout: 5000; readonly retries: 3; }
```
</details>

---

## Problem 32: Type Guard Function
Write a type guard `isStringArray` that checks if a value is `string[]`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

let data: unknown = ["a", "b", "c"];

if (isStringArray(data)) {
  console.log(data[0].toUpperCase()); // ✅ TypeScript knows it's string[]
}
```
</details>

---

## Problem 33: Discriminated Union — Shapes
Create a discriminated union for shapes:
- Circle: `{ kind: "circle", radius: number }`
- Rectangle: `{ kind: "rectangle", width: number, height: number }`
- Square: `{ kind: "square", side: number }`

Write an `area(shape)` function with exhaustive check.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "square"; side: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "square":
      return shape.side ** 2;
    default:
      const _exhaustive: never = shape;
      return _exhaustive;
  }
}
```
</details>

---

## Problem 34: Utility Types — Partial
Create a `UpdateUser` type where all fields of `User` are optional.

```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Your code here
```

<details>
<summary>Solution</summary>

```ts
type UpdateUser = Partial<User>;

function updateUser(id: number, updates: UpdateUser): void {
  // updates can have any subset of User fields
}

updateUser(1, { name: "New Name" });        // ✅
updateUser(1, { email: "new@test.com" });   // ✅
```
</details>

---

## Problem 35: Utility Types — Pick & Omit
Create:
1. `UserCredentials` = only `email` and `password` from `User`
2. `PublicUser` = `User` without `password`

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

type UserCredentials = Pick<User, "email" | "password">;
// { email: string; password: string }

type PublicUser = Omit<User, "password">;
// { id: number; name: string; email: string }
```
</details>

---

## Problem 36: Utility Types — Record
Create a type for a dictionary where keys are user IDs (string) and values are `User` objects.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type UserDictionary = Record<string, User>;

let users: UserDictionary = {
  "1": { id: 1, name: "Ali", email: "ali@test.com", password: "secret" },
  "2": { id: 2, name: "Sara", email: "sara@test.com", password: "secret" },
};
```
</details>

---

## Problem 37: Utility Types — Exclude & Extract
Given `type Status = "pending" | "approved" | "rejected" | "draft"`, create:
1. `NonDraftStatus` = exclude "draft"
2. `OnlyPending` = extract only "pending"

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type Status = "pending" | "approved" | "rejected" | "draft";

type NonDraftStatus = Exclude<Status, "draft">;
// "pending" | "approved" | "rejected"

type OnlyPending = Extract<Status, "pending">;
// "pending"
```
</details>

---

## Problem 38: Mapped Type
Create a `Nullable<T>` mapped type that makes all properties nullable.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

interface User {
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; }
```
</details>

---

## Problem 39: Mapped Type with Modifiers
Create a `ReadonlyDeep<T>` type that makes all properties readonly recursively.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type ReadonlyDeep<T> = {
  readonly [K in keyof T]: T[K] extends object ? ReadonlyDeep<T[K]> : T[K];
};

interface Config {
  api: { key: string; url: string };
  timeout: number;
}

type ReadonlyConfig = ReadonlyDeep<Config>;
// All properties readonly, including nested ones
```
</details>

---

## Problem 40: Function Overloads
Write overloaded function `process`:
- `process(id: number)` — returns user by ID
- `process(name: string)` — returns user by name

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function process(id: number): User;
function process(name: string): User;
function process(input: number | string): User {
  if (typeof input === "number") {
    return getUserById(input);
  }
  return getUserByName(input);
}
```
</details>

---

## Problem 41-45: Quick Fire

**41.** Create a generic `Pair<T, U>` type: `{ first: T; second: U }`.

**42.** Write a function that accepts `string | string[]` and always returns `string[]`.

**43.** Create an interface `Node` that references itself (for linked list).

**44.** Use `ReturnType` to extract return type of `JSON.parse`.

**45.** Create a type that extracts parameter types from a function.

<details>
<summary>Solutions 41-45</summary>

```ts
// 41
type Pair<T, U> = { first: T; second: U };

// 42
function toArray(input: string | string[]): string[] {
  return Array.isArray(input) ? input : [input];
}

// 43
interface Node {
  value: number;
  next: Node | null;
}

// 44
type ParseResult = ReturnType<typeof JSON.parse>; // any

// 45
type Params<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;
```
</details>

---

## Problem 46: Generic with Default
Create a generic `ApiResponse<T = unknown>` with default type.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface ApiResponse<T = unknown> {
  data: T;
  status: number;
}

let generic: ApiResponse = { data: "anything", status: 200 }; // data: unknown
let specific: ApiResponse<string> = { data: "hello", status: 200 }; // data: string
```
</details>

---

## Problem 47: Conditional Type
Create `IsArray<T>` that returns `true` if T is an array, else `false`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type IsArray<T> = T extends Array<any> ? true : false;

type A = IsArray<number[]>;  // true
type B = IsArray<string>;     // false
```
</details>

---

## Problem 48: Extract Array Element
Create `ElementOf<T>` that extracts the element type from an array.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type ElementOf<T> = T extends Array<infer U> ? U : never;

type Num = ElementOf<number[]>;  // number
type Str = ElementOf<string[]>;  // string
```
</details>

---

## Problem 49: Template Literal Type
Create `HttpEndpoint<V>` that generates `"/api/v${V}/users"`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type HttpEndpoint<V extends number> = `/api/v${V}/users`;

let endpoint: HttpEndpoint<1> = "/api/v1/users";   // ✅
// let bad: HttpEndpoint<1> = "/api/v2/users";     // ❌
```
</details>

---

## Problem 50: Event Type Generator
Create `EventName<T>` that converts `"click"` to `"onClick"`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type OnClick = EventName<"click">;     // "onClick"
type OnHover = EventName<"hover">;     // "onHover"
```
</details>

---

## Problem 51-55: Quick Fire

**51.** Create `NonNullable<T>` manually (without using built-in).

**52.** Create `Flatten<T>` that flattens `T[][]` to `T[]`.

**53.** Write a type guard for `Tenant` interface.

**54.** Create `DeepPartial<T>` recursively.

**55.** Create `Required<T>` manually.

<details>
<summary>Solutions 51-55</summary>

```ts
// 51
type MyNonNullable<T> = T extends null | undefined ? never : T;

// 52
type Flatten<T> = T extends Array<infer U> ? U : never;

// 53
function isTenant(obj: unknown): obj is Tenant {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "id" in obj &&
    "phoneNumberId" in obj &&
    "accessToken" in obj
  );
}

// 54
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

// 55
type MyRequired<T> = { [K in keyof T]-?: T[K] };
// `-?` removes optionality
```
</details>

---

## Problem 56: Advanced Generic Constraint
Create a `findById<T extends { id: string }>` function.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function findById<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

interface Product { id: string; name: string; }
let products: Product[] = [{ id: "1", name: "Laptop" }];
findById(products, "1"); // Returns Product | undefined
```
</details>

---

## Problem 57: Type-Safe Event Emitter
Create a simple event emitter where `on(event, handler)` types are checked.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface EventMap {
  message: { text: string; from: string };
  status: { type: "online" | "offline" };
}

class TypedEmitter {
  private listeners: { [K in keyof EventMap]?: Array<(data: EventMap[K]) => void> } = {};

  on<K extends keyof EventMap>(event: K, handler: (data: EventMap[K]) => void): void {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event]!.push(handler);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
    this.listeners[event]?.forEach(h => h(data));
  }
}

let emitter = new TypedEmitter();
emitter.on("message", (data) => console.log(data.text)); // ✅
// emitter.on("message", (data) => console.log(data.type)); // ❌ ERROR
```
</details>

---

## Problem 58: Branded Types
Create a branded type `UserId` so that plain strings can't be used as IDs.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type UserId = string & { __brand: "UserId" };
type ProductId = string & { __brand: "ProductId" };

function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

let uid = createUserId("123");
let pid = createProductId("456");

function getUser(id: UserId) { /* ... */ }

getUser(uid); // ✅
// getUser(pid); // ❌ ERROR: ProductId not assignable to UserId
```
</details>

---

## Problem 59: Type-Safe Path
Create a type that validates object paths: `get(obj, "a.b.c")`.

```ts
// Your code here (advanced!)

```

<details>
<summary>Solution</summary>

```ts
type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends object
    ? `${K}` | `${K}.${Path<T[K]>}`
    : `${K}`
  : never;

// Usage requires more advanced setup, but concept:
function get<T>(obj: T, path: Path<T>): any {
  // Implementation...
}
```
</details>

---

## Problem 60: Complete Type Puzzle
Create a type `AllKeys<T>` that gets ALL keys from a nested object.

```ts
// Your code here (very hard!)

```

<details>
<summary>Solution</summary>

```ts
type AllKeys<T> = T extends object
  ? keyof T | { [K in keyof T]: AllKeys<T[K]> }[keyof T]
  : never;

// Example:
// AllKeys<{ a: 1; b: { c: 2; d: { e: 3 } } }>
// = "a" | "b" | "c" | "d" | "e"
```
</details>

---

# LEVEL 3: SDK-SPECIFIC (Problems 61-100)

## Problem 61: Tenant Base Type
Create a `BaseTenant` interface with `id`, `phoneNumberId`, `accessToken`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface BaseTenant {
  id: string;
  phoneNumberId: string;
  accessToken: string;
}
```
</details>

---

## Problem 62: Tenant Hierarchy
Create:
1. `WebhookTenant` extends `BaseTenant` with `webhookSecret`
2. `Tenant` extends `WebhookTenant` with optional `businessAccountId` and `displayName`

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface WebhookTenant extends BaseTenant {
  webhookSecret: string;
}

interface Tenant extends WebhookTenant {
  businessAccountId?: string;
  displayName?: string;
}
```
</details>

---

## Problem 63: CreateTenantConfig
Create a type where `id` is required but everything else is optional.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type CreateTenantConfig = Pick<Tenant, "id"> & Partial<Omit<Tenant, "id">>;

// Usage:
let config: CreateTenantConfig = { id: "1" }; // ✅
let config2: CreateTenantConfig = { id: "1", displayName: "My Business" }; // ✅
```
</details>

---

## Problem 64: PublicTenant
Create a type that removes sensitive fields (`accessToken`, `webhookSecret`).

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type PublicTenant = Omit<Tenant, "accessToken" | "webhookSecret">;

// { id, phoneNumberId, businessAccountId?, displayName? }
```
</details>

---

## Problem 65: Webhook Event Base
Create `BaseWebhookEvent` with `id`, `from`, `timestamp`, `phoneNumberId`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface BaseWebhookEvent {
  id: string;
  from: string;
  timestamp: string;
  phoneNumberId: string;
}
```
</details>

---

## Problem 66: TextMessageEvent
Create `TextMessageEvent` that extends base and adds `type: "text"` and `text: { body: string }`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface TextMessageEvent extends BaseWebhookEvent {
  type: "text";
  text: { body: string };
}
```
</details>

---

## Problem 67: ImageMessageEvent
Create `ImageMessageEvent` with `type: "image"` and `image: { id: string; mimeType: string }`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface ImageMessageEvent extends BaseWebhookEvent {
  type: "image";
  image: { id: string; mimeType: string };
}
```
</details>

---

## Problem 68: StatusUpdateEvent
Create `StatusUpdateEvent` with `type: "status"`, `status: "sent" | "delivered" | "read" | "failed"`, `messageId`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface StatusUpdateEvent {
  type: "status";
  status: "sent" | "delivered" | "read" | "failed";
  messageId: string;
  timestamp: string;
  phoneNumberId: string;
}
```
</details>

---

## Problem 69: The Union
Create `WebhookEvent` union of all event types.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type WebhookEvent = TextMessageEvent | ImageMessageEvent | StatusUpdateEvent;
```
</details>

---

## Problem 70: Type Guards
Write type guards for each event type.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function isTextEvent(event: WebhookEvent): event is TextMessageEvent {
  return event.type === "text";
}

function isImageEvent(event: WebhookEvent): event is ImageMessageEvent {
  return event.type === "image";
}

function isStatusEvent(event: WebhookEvent): event is StatusUpdateEvent {
  return event.type === "status";
}
```
</details>

---

## Problem 71: Exhaustive Handler
Write `handleEvent(event: WebhookEvent)` with switch + `never` check.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function handleEvent(event: WebhookEvent): string {
  switch (event.type) {
    case "text":
      return `Text: ${event.text.body}`;
    case "image":
      return `Image: ${event.image.id}`;
    case "status":
      return `Status: ${event.status}`;
    default:
      const _exhaustive: never = event;
      return _exhaustive;
  }
}
```
</details>

---

## Problem 72: Generic Store Interface
Create `Store<T extends { id: string }>` with CRUD operations.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface Store<T extends { id: string }> {
  getById(id: string): T | undefined;
  getAll(): T[];
  register(item: T): void;
  update(id: string, changes: Partial<Omit<T, "id">>): T | null;
  remove(id: string): boolean;
}
```
</details>

---

## Problem 73: InMemoryStore Implementation
Implement `InMemoryStore<T>` class.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
class InMemoryStore<T extends { id: string }> implements Store<T> {
  private items = new Map<string, T>();

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  register(item: T): void {
    this.items.set(item.id, item);
  }

  update(id: string, changes: Partial<Omit<T, "id">>): T | null {
    const item = this.items.get(id);
    if (!item) return null;
    const updated = { ...item, ...changes } as T;
    this.items.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }
}
```
</details>

---

## Problem 74: TenantStore Type
Create `TenantStore` type from `Store<Tenant>`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type TenantStore = Store<Tenant>;

// Usage:
let tenantStore: TenantStore = new InMemoryStore<Tenant>();
tenantStore.register({
  id: "1",
  phoneNumberId: "123",
  accessToken: "token",
  webhookSecret: "secret",
});
```
</details>

---

## Problem 75: HttpMethod Type
Create `HttpMethod` union of HTTP verbs.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type HttpMethod = "GET" | "POST" | "DELETE" | "PATCH";
```
</details>

---

## Problem 76: RequestConfig
Create generic `RequestConfig<TBody>` with `method`, `endpoint`, optional `body` and `headers`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface RequestConfig<TBody = unknown> {
  method: HttpMethod;
  endpoint: string;
  body?: TBody;
  headers?: Record<string, string>;
}
```
</details>

---

## Problem 77: ApiResponse
Create generic `ApiResponse<TData>` with `data`, `status`, `headers`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface ApiResponse<TData> {
  data: TData;
  status: number;
  headers: Record<string, string>;
}
```
</details>

---

## Problem 78: Error Code Union
Create `ErrorCode` union for all SDK errors.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type ErrorCode =
  | "AUTH_ERROR"
  | "RATE_LIMIT"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "WEBHOOK_VERIFY_ERROR"
  | "TENANT_NOT_FOUND";
```
</details>

---

## Problem 79: Base Error Class
Create abstract `WasyncError` class with `code`, `retryable`, `timestamp`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
abstract class WasyncError extends Error {
  abstract readonly code: ErrorCode;
  abstract readonly retryable: boolean;
  readonly timestamp = Date.now();

  constructor(message: string, public readonly tenantId?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}
```
</details>

---

## Problem 80: Specific Errors
Create `RateLimitError`, `AuthError`, `ValidationError` extending `WasyncError`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
class RateLimitError extends WasyncError {
  readonly code = "RATE_LIMIT" as const;
  readonly retryable = true;
}

class AuthError extends WasyncError {
  readonly code = "AUTH_ERROR" as const;
  readonly retryable = false;
}

class ValidationError extends WasyncError {
  readonly code = "VALIDATION_ERROR" as const;
  readonly retryable = false;
}
```
</details>

---

## Problem 81: Retryable Type Guard
Write `isRetryable(error: unknown)` type guard.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
function isRetryable(error: unknown): error is WasyncError & { retryable: true } {
  return error instanceof WasyncError && error.retryable;
}
```
</details>

---

## Problem 82: SendTextOptions
Create `SendTextOptions` with `to` and `body`, both required strings.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface SendTextOptions {
  to: string;
  body: string;
}
```
</details>

---

## Problem 83: SendTextResponse
Create `SendTextResponse` with `messagingProduct`, `contacts`, `messages`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface SendTextResponse {
  messagingProduct: string;
  contacts: Array<{ waId: string }>;
  messages: Array<{ id: string }>;
}
```
</details>

---

## Problem 84: WhatsAppClient Interface
Create `WhatsAppClient` interface with `sendText(options: SendTextOptions): Promise<SendTextResponse>`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface WhatsAppClient {
  sendText(options: SendTextOptions): Promise<SendTextResponse>;
}
```
</details>

---

## Problem 85: createClient Factory Type
Write the type signature for `createClient(tenant: Tenant): WhatsAppClient`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type CreateClient = (tenant: Tenant) => WhatsAppClient;

// Or as function declaration:
declare function createClient(tenant: Tenant): WhatsAppClient;
```
</details>

---

## Problem 86: Webhook Payload Schema Type
Create the TypeScript type for Meta's webhook payload structure.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface WebhookPayload {
  object: "whatsapp_business_account";
  entry: Array<{
    changes: Array<{
      value: {
        metadata: { phone_number_id: string };
        messages?: Array<{
          id: string;
          from: string;
          timestamp: string;
          type: "text" | "image" | "document" | "unknown";
          text?: { body: string };
        }>;
      };
    }>;
  }>;
}
```
</details>

---

## Problem 87: VerifySignature Function Type
Write the type signature for `verifySignature(rawBody, signatureHeader, appSecret)`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type VerifySignature = (
  rawBody: string,
  signatureHeader: string,
  appSecret: string
) => boolean;
```
</details>

---

## Problem 88: RouteWebhook Function Type
Write the type signature for `routeWebhook(rawBody, signatureHeader, store)`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type RouteWebhook = (
  rawBody: string,
  signatureHeader: string,
  store: TenantStore
) => Promise<{ events: WebhookEvent[] }>;
```
</details>

---

## Problem 89: RateLimiter Interface
Create `RateLimiter` interface with `consume(): Promise<boolean>`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
interface RateLimiter {
  consume(): Promise<boolean>;
}
```
</details>

---

## Problem 90: TokenBucket Class Type
Write the class signature for `TokenBucket` implementing `RateLimiter`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
class TokenBucket implements RateLimiter {
  constructor(capacity: number, refillPerMinute: number);
  consume(): Promise<boolean>;
}
```
</details>

---

## Problem 91: HttpClient Class
Write the class signature for `HttpClient` with generic `request` method.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
class HttpClient {
  constructor(tenant: Tenant, baseUrl?: string);

  request<TResponse, TBody = unknown>(
    config: RequestConfig<TBody>
  ): Promise<ApiResponse<TResponse>>;

  get<T>(endpoint: string): Promise<ApiResponse<T>>;
  post<TResponse, TBody>(endpoint: string, body: TBody): Promise<ApiResponse<TResponse>>;
}
```
</details>

---

## Problem 92: MessageService Class
Write the class signature for `MessageService` with `sendText`.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
class MessageService {
  constructor(http: HttpClient);
  sendText(options: SendTextOptions): Promise<SendTextResponse>;
}
```
</details>

---

## Problem 93: Complete SDK Export Types
Write the `index.ts` export types for the SDK.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
// Types
export type {
  Tenant,
  BaseTenant,
  WebhookTenant,
  CreateTenantConfig,
  PublicTenant,
} from "./types.js";

export type {
  WebhookEvent,
  TextMessageEvent,
  ImageMessageEvent,
  StatusUpdateEvent,
} from "./events.js";

export type {
  SendTextOptions,
  SendTextResponse,
} from "./messages.js";

export type { Store, TenantStore } from "./store.js";
export type { WhatsAppClient } from "./client.js";
export type { ApiResponse, RequestConfig } from "./http.js";

// Classes
export { InMemoryStore } from "./store.js";
export { HttpClient } from "./http.js";
export { createClient } from "./client.js";
export { verifySignature, routeWebhook } from "./webhook.js";

// Errors
export {
  WasyncError,
  RateLimitError,
  AuthError,
  ValidationError,
} from "./errors.js";
```
</details>

---

## Problem 94: Package.json Exports
Write the `exports` field for `package.json`.

```ts
// Your code here (JSON format)

```

<details>
<summary>Solution</summary>

```json
{
  "name": "wasync",
  "version": "0.1.0",
  "main": "./dist/index.cjs",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    }
  }
}
```
</details>

---

## Problem 95: tsconfig.json for SDK
Write the complete `tsconfig.json` for the SDK.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```
</details>

---

## Problem 96: Type Challenge — Extract Event Types
Create a type that extracts all event type strings from `WebhookEvent` union.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type EventTypes = WebhookEvent["type"];
// "text" | "image" | "status"
```
</details>

---

## Problem 97: Type Challenge — Event By Type
Create `EventByType<T>` that extracts the event matching a type string.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type EventByType<T extends WebhookEvent["type"]> = Extract<WebhookEvent, { type: T }>;

type Text = EventByType<"text">;     // TextMessageEvent
type Image = EventByType<"image">;     // ImageMessageEvent
```
</details>

---

## Problem 98: Type Challenge — Make All Events Partial
Create `PartialEvents<T>` that makes all event properties optional recursively.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type PartialEvents<T> = T extends object ? {
  [K in keyof T]?: PartialEvents<T[K]>;
} : T;

type PartialWebhookEvent = PartialEvents<WebhookEvent>;
```
</details>

---

## Problem 99: Type Challenge — Event Handler Map
Create a type that maps each event type to its handler function type.

```ts
// Your code here

```

<details>
<summary>Solution</summary>

```ts
type EventHandlerMap = {
  [K in WebhookEvent["type"]]: (event: EventByType<K>) => void;
};

// {
//   text: (event: TextMessageEvent) => void;
//   image: (event: ImageMessageEvent) => void;
//   status: (event: StatusUpdateEvent) => void;
// }
```
</details>

---

## Problem 100: Final Integration Challenge
Create a single file that defines:
1. Complete tenant hierarchy
2. Complete webhook event union with discriminated types
3. Generic Store interface + InMemory implementation
4. Error hierarchy with type guards
5. Zero `any`, zero errors, all types exported

```ts
// Your code here (complete solution)

```

<details>
<summary>Solution</summary>

```ts
// === TYPES ===

interface BaseTenant {
  id: string;
  phoneNumberId: string;
  accessToken: string;
}

interface WebhookTenant extends BaseTenant {
  webhookSecret: string;
}

interface Tenant extends WebhookTenant {
  businessAccountId?: string;
  displayName?: string;
}

interface BaseEvent {
  id: string;
  from: string;
  timestamp: string;
  phoneNumberId: string;
}

interface TextEvent extends BaseEvent {
  type: "text";
  text: { body: string };
}

interface ImageEvent extends BaseEvent {
  type: "image";
  image: { id: string; mimeType: string };
}

interface StatusEvent {
  type: "status";
  status: "sent" | "delivered" | "read" | "failed";
  messageId: string;
  timestamp: string;
  phoneNumberId: string;
}

type WebhookEvent = TextEvent | ImageEvent | StatusEvent;

// === TYPE GUARDS ===

function isTextEvent(e: WebhookEvent): e is TextEvent {
  return e.type === "text";
}

function isImageEvent(e: WebhookEvent): e is ImageEvent {
  return e.type === "image";
}

// === STORE ===

interface Store<T extends { id: string }> {
  getById(id: string): T | undefined;
  register(item: T): void;
}

class InMemoryStore<T extends { id: string }> implements Store<T> {
  private items = new Map<string, T>();
  getById(id: string): T | undefined { return this.items.get(id); }
  register(item: T): void { this.items.set(item.id, item); }
}

type TenantStore = Store<Tenant>;

// === ERRORS ===

type ErrorCode = "AUTH_ERROR" | "RATE_LIMIT" | "VALIDATION_ERROR";

abstract class WasyncError extends Error {
  abstract readonly code: ErrorCode;
  abstract readonly retryable: boolean;
  constructor(message: string) { super(message); this.name = this.constructor.name; }
}

class RateLimitError extends WasyncError {
  readonly code = "RATE_LIMIT" as const;
  readonly retryable = true;
}

// === EXPORTS ===

export type {
  Tenant, WebhookTenant, BaseTenant,
  WebhookEvent, TextEvent, ImageEvent, StatusEvent,
  TenantStore, Store,
};

export { InMemoryStore, isTextEvent, isImageEvent, WasyncError, RateLimitError };
```
</details>

---

# 🏆 Graduation Checklist

- [ ] Problems 1-25: Basics mastered
- [ ] Problems 26-60: Intermediate mastered
- [ ] Problems 61-100: SDK types designed
- [ ] Zero `any` used in any solution
- [ ] All solutions compile with `strict` mode
- [ ] Can write discriminated unions without looking
- [ ] Can write generic constraints without thinking
- [ ] Can design type hierarchy for any system

**100 problems complete = TypeScript Pro ✅**
