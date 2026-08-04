# 🔥 Complete TypeScript Mastery — Zero to Hero
## Har Cheez Jo Tumhe TypeScript Pro Banane Ke Liye Chahiye

> **For:** Absolute beginners se lekar advanced developers tak
> **Duration:** 8 weeks (Roz 1 ghanta)
> **Goal:** TypeScript itni achi seekho keh koi bhi project, koi bhi SDK, koi bhi library bana sako

---

# PART 1: FOUNDATIONS (Week 1-2)
## JavaScript se TypeScript tak

---

## Day 1: TypeScript Kya Hai? Kyun Chahiye?

### Problem
```js
// JavaScript mein yeh code chal jata hai — lekin galat result deta hai
function add(a, b) {
  return a + b;
}

add(5, "10");     // "510" (string concatenation!) 💥
add({}, []);      // "[object Object]" 💥
add();            // NaN 💥
```

### Solution: TypeScript
```ts
function add(a: number, b: number): number {
  return a + b;
}

add(5, "10");     // ❌ ERROR: Argument of type 'string' not assignable to 'number'
add(5, 10);       // ✅ 15
```

### TypeScript = JavaScript + Types
- **Compile time:** TypeScript check karta hai keh tum sahi types use kar rahe ho
- **Runtime:** TypeScript compile hokar plain JavaScript ban jata hai
- **Browser/Node ko sirf JS chahiye** — TS sirf development mein help karta hai

### Installation
```bash
# Node.js install karo (nodejs.org)

# TypeScript globally install
npm install -g typescript

# Verify
tsc --version   # Version dikhana chahiye

# Project setup
mkdir my-ts-project
cd my-ts-project
npm init -y
npm install typescript --save-dev
npx tsc --init    # tsconfig.json banayega
```

### Pehli File
```ts
// hello.ts
let message: string = "Hello TypeScript!";
console.log(message);
```

```bash
# Compile
npx tsc hello.ts

# Run compiled JS
node hello.js
```

---

## Day 2: Basic Types

### Primitive Types
```ts
// String
let name: string = "Talha";
let greeting: string = 'Assalam-o-Alaikum';
let template: string = `Hello, ${name}`;

// Number (sab numbers — integer, float, decimal)
let age: number = 25;
let price: number = 99.99;
let hex: number = 0xff;        // Hexadecimal
let binary: number = 0b1010;   // Binary

// Boolean
let isActive: boolean = true;
let isComplete: boolean = false;

// Undefined & Null
let notDefined: undefined = undefined;
let empty: null = null;
```

### Type Inference (TypeScript khud guess karta hai)
```ts
let name = "Talha";      // TypeScript samajh gaya: yeh string hai
let age = 25;            // TypeScript samajh gaya: yeh number hai
let isDone = true;       // TypeScript samajh gaya: yeh boolean hai

// Ab agar tum galat type assign karo gay:
name = 123;              // ❌ ERROR: Type 'number' not assignable to 'string'
```

**Rule:** Hamesha type likho jab zaroorat ho. Simple cases mein inference kaafi hai.

### Any (Avoid karo!)
```ts
let anything: any = 4;
anything = "string";     // ✅ Allowed (kuch bhi allowed hai)
anything = true;         // ✅ Allowed
anything.toFixed();      // ✅ Compiles — lekin runtime pe crash ho sakta hai!

// ❌ BAD PRACTICE
function process(data: any) {
  return data.something.that.doesnt.exist;  // Compile hoga, crash hoga
}
```

### Unknown (Safe alternative)
```ts
let notSure: unknown = 4;
notSure = "maybe";
notSure = false;

// Pehle check karna parega
if (typeof notSure === "boolean") {
  console.log(notSure);  // ✅ Safe — TypeScript knows it's boolean here
}
```

---

## Day 3: Arrays & Objects

### Arrays
```ts
// Array of numbers
let numbers: number[] = [1, 2, 3, 4, 5];
let scores: Array<number> = [90, 85, 95];  // Same thing, different syntax

// Array of strings
let names: string[] = ["Ali", "Sara", "Ahmed"];

// Mixed array (avoid karo — use tuples instead)
let mixed: (string | number)[] = ["hello", 42, "world"];

// Array methods work with type safety
numbers.push("6");       // ❌ ERROR: Can't push string to number[]
numbers.push(6);         // ✅ OK
let first: number = numbers[0];  // TypeScript knows it's number
```

### Objects
```ts
// Basic object typing
let user: { name: string; age: number; isAdmin: boolean } = {
  name: "Talha",
  age: 25,
  isAdmin: true,
};

user.name = "Ali";       // ✅ OK
user.age = "25";         // ❌ ERROR: Must be number
user.email = "a@b.com";  // ❌ ERROR: Property doesn't exist

// Better way: Interface (next day detail mein)
interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

let user2: User = {
  name: "Sara",
  age: 30,
  isAdmin: false,
};
```

### Optional Properties
```ts
interface User {
  name: string;
  age: number;
  email?: string;        // Optional — ho bhi sakta hai, nahi bhi
}

let user1: User = { name: "Ali", age: 25 };           // ✅ OK
let user2: User = { name: "Sara", age: 30, email: "s@example.com" };  // ✅ OK
```

### Readonly Properties
```ts
interface Config {
  readonly apiKey: string;    // Once set, can't change
  readonly baseUrl: string;
  timeout: number;            // Can change
}

let config: Config = {
  apiKey: "abc123",
  baseUrl: "https://api.example.com",
  timeout: 5000,
};

config.apiKey = "new";      // ❌ ERROR: Cannot assign to readonly property
config.timeout = 10000;    // ✅ OK
```

---

## Day 4: Functions

### Basic Function Typing
```ts
// Parameter types + return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

let message: string = greet("Talha");  // ✅
let bad: number = greet("Talha");       // ❌ ERROR: Returns string, not number
```

### Void (Kuch return nahi karta)
```ts
function logMessage(msg: string): void {
  console.log(msg);
  // return 5;   // ❌ ERROR: Can't return value from void function
}
```

### Never (Kabhi return nahi hota — error throw karta hai ya infinite loop)
```ts
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {
    console.log("Running forever...");
  }
}
```

### Optional Parameters
```ts
function greet(name: string, greeting?: string): string {
  if (greeting) {
    return `${greeting}, ${name}!`;
  }
  return `Hello, ${name}!`;
}

greet("Talha");                    // ✅ "Hello, Talha!"
greet("Talha", "Assalam-o-Alaikum");  // ✅ "Assalam-o-Alaikum, Talha!"
```

### Default Parameters
```ts
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

greet("Talha");           // ✅ "Hello, Talha!"
greet("Talha", "Hi");     // ✅ "Hi, Talha!"
```

### Rest Parameters
```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}

sum(1, 2, 3, 4, 5);      // ✅ 15
sum(10, 20);              // ✅ 30
```

### Function as Parameter (Callback)
```ts
function processItems(
  items: string[],
  processor: (item: string) => string   // Function parameter with types
): string[] {
  return items.map(processor);
}

let result = processItems(["a", "b", "c"], (item) => item.toUpperCase());
// ["A", "B", "C"]
```

---

## Day 5: Interfaces vs Types

### Interface
```ts
interface User {
  name: string;
  age: number;
}

// Extend karna easy hai
interface Admin extends User {
  role: "superadmin" | "moderator";
  permissions: string[];
}

let admin: Admin = {
  name: "Talha",
  age: 25,
  role: "superadmin",
  permissions: ["read", "write", "delete"],
};

// Declaration merging (interface ki special power)
interface User {
  email?: string;    // User interface mein email add ho gaya!
}

// Ab User = { name, age, email? }
```

### Type Alias
```ts
type User = {
  name: string;
  age: number;
};

// Union types (sirf type se ban sakte hain)
type Status = "pending" | "approved" | "rejected";
type ID = string | number;

// Intersection
type Admin = User & {
  role: string;
  permissions: string[];
};
```

### Kab Interface, Kab Type?
```ts
// ✅ Interface use karo jab:
// - Object shape define karni ho
// - Extend karna ho
// - Declaration merging chahiye ho
interface Person { name: string; }

// ✅ Type use karo jab:
// - Union chahiye ho
// - Primitive ko alias dena ho
// - Tuple banana ho
type Response = string | { error: string };
type Point = [number, number];  // Tuple
```

---

## Day 6: Enums & Literals

### Enums
```ts
enum Status {
  Pending,      // 0
  Approved,     // 1
  Rejected,     // 2
}

let currentStatus: Status = Status.Pending;

// Custom values
enum HttpCode {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}

let code: HttpCode = HttpCode.OK;  // 200
```

### String Enums (Better!)
```ts
enum Status {
  Pending = "PENDING",
  Approved = "APPROVED",
  Rejected = "REJECTED",
}

// Compare karna easy
if (currentStatus === Status.Approved) { ... }
```

### Literal Types (Enum se behtar!)
```ts
// Instead of enum, use literal union
type Status = "pending" | "approved" | "rejected";

let current: Status = "pending";   // ✅
let wrong: Status = "done";        // ❌ ERROR

// Benefits:
// - No extra JS code generated
// - Better type inference
// - Can use with `as const`
```

### `as const` — Lock Values
```ts
const config = {
  apiVersion: "v18.0",
  baseUrl: "https://api.example.com",
} as const;

// config.apiVersion type = "v18.0" (literal!)
// NOT string — exact value locked!
```

---

## Day 7: Week 1 Review + Mini Project

### Build: Simple User Management System
```ts
// user-system.ts

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
}

let users: User[] = [];

function addUser(user: Omit<User, "id">): User {
  const newUser: User = {
    ...user,
    id: users.length + 1,
  };
  users.push(newUser);
  return newUser;
}

function getUserById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

function updateUser(id: number, updates: Partial<User>): User | null {
  const user = getUserById(id);
  if (!user) return null;
  Object.assign(user, updates);
  return user;
}

// Test
addUser({ name: "Talha", email: "talha@example.com", role: "admin", isActive: true });
addUser({ name: "Sara", email: "sara@example.com", role: "user", isActive: true });

console.log(getUserById(1));
updateUser(1, { isActive: false });
```

---

# PART 2: INTERMEDIATE (Week 3-4)
## Classes, Generics, Advanced Types

---

## Day 8: Classes in TypeScript

### Basic Class
```ts
class User {
  // Properties
  name: string;
  age: number;

  // Constructor
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Method
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

let user = new User("Talha", 25);
console.log(user.greet());  // "Hello, I'm Talha"
```

### Shorthand Syntax
```ts
class User {
  // Constructor parameters with access modifiers = auto properties
  constructor(
    public name: string,
    public age: number,
    private password: string    // Private — bahar se access nahi
  ) {}

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }

  checkPassword(input: string): boolean {
    return this.password === input;
  }
}

let user = new User("Talha", 25, "secret123");
console.log(user.name);        // ✅ Public
console.log(user.password);    // ❌ ERROR: Private
```

### Access Modifiers
```ts
class Animal {
  public name: string;       // Koi bhi access kar sakta hai
  private age: number;      // Sirf class ke andar
  protected species: string; // Class + child classes

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }
}

class Dog extends Animal {
  bark(): string {
    console.log(this.name);      // ✅ Public
    console.log(this.species);     // ✅ Protected — child can access
    // console.log(this.age);      // ❌ Private — child bhi nahi dekh sakta
    return "Woof!";
  }
}
```

### Readonly in Classes
```ts
class Config {
  constructor(
    public readonly apiKey: string,
    public readonly baseUrl: string,
    public timeout: number
  ) {}
}

let config = new Config("abc123", "https://api.com", 5000);
config.timeout = 10000;     // ✅ Can change
config.apiKey = "new";        // ❌ ERROR: Readonly
```

---

## Day 9: Generics — Type-Level Functions

### The Problem
```ts
// Without generics — har type ke liye alag function
function getStringArray(value: string): string[] {
  return [value];
}

function getNumberArray(value: number): number[] {
  return [value];
}

// Duplicate code! 💥
```

### The Solution: Generic
```ts
// T = Type parameter (koi bhi type)
function getArray<T>(value: T): T[] {
  return [value];
}

// Usage:
let strings = getArray<string>("hello");    // string[]
let numbers = getArray<number>(42);         // number[]
let users = getArray<User>({ name: "Talha", age: 25 });  // User[]

// TypeScript inference (T auto detect)
let inferred = getArray("hello");  // TypeScript samajh gaya: string[]
```

### Generic with Multiple Parameters
```ts
function pair<K, V>(key: K, value: V): [K, V] {
  return [key, value];
}

let result = pair("name", "Talha");     // [string, string]
let result2 = pair(1, true);            // [number, boolean]
```

### Generic Constraints
```ts
// T must have a 'length' property
function logLength<T extends { length: number }>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello");       // ✅ String has length
logLength([1, 2, 3]);     // ✅ Array has length
logLength(42);            // ❌ ERROR: Number doesn't have length
```

### Generic Interface
```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Usage with different types
let userResponse: ApiResponse<User> = {
  data: { name: "Talha", age: 25 },
  status: 200,
  message: "OK",
};

let stringResponse: ApiResponse<string> = {
  data: "Hello",
  status: 200,
  message: "OK",
};
```

### Generic Class
```ts
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
}

// Number stack
let numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
let num = numberStack.pop();  // TypeScript knows: number | undefined

// String stack
let stringStack = new Stack<string>();
stringStack.push("hello");
let str = stringStack.pop();  // TypeScript knows: string | undefined
```

---

## Day 10: Type Narrowing

### typeof Narrowing
```ts
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());  // ✅ TS knows it's string
  } else {
    console.log(value.toFixed(2));     // ✅ TS knows it's number
  }
}
```

### instanceof Narrowing
```ts
class Dog {
  bark() { return "Woof!"; }
}

class Cat {
  meow() { return "Meow!"; }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    console.log(animal.bark());   // ✅ TS knows it's Dog
  } else {
    console.log(animal.meow());   // ✅ TS knows it's Cat
  }
}
```

### in Operator Narrowing
```ts
interface Bird {
  fly(): void;
}

interface Fish {
  swim(): void;
}

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly();   // ✅ TS knows it's Bird
  } else {
    animal.swim();  // ✅ TS knows it's Fish
  }
}
```

### Custom Type Guards
```ts
// Type guard function
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function process(value: unknown) {
  if (isString(value)) {
    console.log(value.toUpperCase());  // ✅ TS knows it's string
  }
}
```

---

## Day 11: Discriminated Unions

### The Problem
```ts
// ❌ BAD: Optional fields
type Shape = {
  kind: "circle" | "square";
  radius?: number;    // Optional
  side?: number;      // Optional
};

function area(shape: Shape): number {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;  // ❌ TS: radius might be undefined!
  }
  return shape.side ** 2;  // ❌ TS: side might be undefined!
}
```

### The Solution
```ts
// ✅ GOOD: Each type is complete
type Circle = {
  kind: "circle";     // Discriminant
  radius: number;     // Required!
};

type Square = {
  kind: "square";     // Discriminant
  side: number;       // Required!
};

type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;  // ✅ TS knows radius exists
    case "square":
      return shape.side ** 2;              // ✅ TS knows side exists
    default:
      const _exhaustive: never = shape;   // Safety check
      return _exhaustive;
  }
}
```

---

## Day 12: Utility Types

### Built-in Utilities
```ts
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
}

// Partial — All properties optional
type PartialUser = Partial<User>;
// { id?: number; name?: string; ... }

// Required — All properties required (opposite of Partial)
type RequiredUser = Required<PartialUser>;

// Readonly — All properties readonly
type ReadonlyUser = Readonly<User>;

// Pick — Select specific properties
type UserCredentials = Pick<User, "email" | "password">;
// { email: string; password: string }

// Omit — Remove specific properties
type PublicUser = Omit<User, "password">;
// { id, name, email, age } — no password!

// Record — Object with specific key/value types
type UserMap = Record<string, User>;
// { [key: string]: User }

// Exclude — Remove types from union
type Status = "pending" | "approved" | "rejected";
type NonPending = Exclude<Status, "pending">;
// "approved" | "rejected"

// Extract — Keep only matching types
type OnlyPending = Extract<Status, "pending">;
// "pending"

// NonNullable — Remove null/undefined
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// string

// ReturnType — Extract function return type
function getUser(): User { return { ... }; }
type UserReturn = ReturnType<typeof getUser>;
// User

// Parameters — Extract function parameters
type UserParams = Parameters<typeof getUser>;
// [] (no parameters)
```

### Combining Utilities
```ts
// Create update type: omit id, make everything optional
type UpdateUser = Partial<Omit<User, "id">>;

function updateUser(id: number, updates: UpdateUser): void {
  // updates can have any subset of User fields (except id)
}

updateUser(1, { name: "New Name" });           // ✅
updateUser(1, { email: "new@example.com" });   // ✅
updateUser(1, { id: 2 });                      // ❌ Can't update id
```

---

## Day 13: Mapped Types

### Basic Mapped Type
```ts
// Make all properties optional manually
type OptionalUser = {
  id?: number;
  name?: string;
  email?: string;
};

// Same thing, but generic (works with ANY type!)
type MyPartial<T> = {
  [K in keyof T]?: T[K];   // For each key K in T, make it optional
};

type OptionalUser2 = MyPartial<User>;
```

### More Mapped Types
```ts
// Make all properties readonly
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Make all properties nullable
type Nullable<T> = {
  [K in keyof T]: T[K] | null;
};

// Change all property types to string
type AllString<T> = {
  [K in keyof T]: string;
};

// Add prefix to all keys
type AddPrefix<T, P extends string> = {
  [K in keyof T as `${P}${string & K}`]: T[K];
};

type PrefixedUser = AddPrefix<User, "user_">;
// { user_id: number; user_name: string; ... }
```

---

## Day 14: Week 2 Review + Mini Project

### Build: Generic Data Store
```ts
// store.ts

interface Identifiable {
  id: string;
}

class Store<T extends Identifiable> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  get(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  update(id: string, updates: Partial<Omit<T, "id">>): T | null {
    const item = this.items.get(id);
    if (!item) return null;
    const updated = { ...item, ...updates };
    this.items.set(id, updated);
    return updated;
  }

  remove(id: string): boolean {
    return this.items.delete(id);
  }
}

// Usage
interface Product extends Identifiable {
  name: string;
  price: number;
}

let productStore = new Store<Product>();
productStore.add({ id: "1", name: "Laptop", price: 999 });
console.log(productStore.get("1"));
```

---

# PART 3: ADVANCED (Week 5-6)
## Type-Level Programming

---

## Day 15: Conditional Types

### Basic Conditional
```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<"hello">;  // true
type B = IsString<42>;       // false
```

### Extract from Union
```ts
type ExtractString<T> = T extends string ? T : never;

type Result = ExtractString<string | number | boolean>;
// string
```

### Distributive Behavior
```ts
// Conditional types distribute over unions
type ToArray<T> = T extends any ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]  (NOT (string | number)[])
```

### Non-Distributive (Wrap in tuple)
```ts
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;

type Result = ToArrayNonDist<string | number>;
// (string | number)[]
```

---

## Day 16: `infer` — The Magic Keyword

### Extract Return Type
```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser(): { name: string; age: number } {
  return { name: "Talha", age: 25 };
}

type UserReturn = MyReturnType<typeof getUser>;
// { name: string; age: number }
```

### Extract Promise Type
```ts
type Awaited<T> = T extends Promise<infer U> ? U : T;

async function fetchUser(): Promise<User> {
  return { name: "Talha", age: 25 };
}

type FetchResult = Awaited<ReturnType<typeof fetchUser>>;
// User
```

### Extract Array Element
```ts
type ElementOf<T> = T extends Array<infer U> ? U : never;

type Num = ElementOf<number[]>;  // number
type Str = ElementOf<string[]>;  // string
```

### Extract Function Parameter
```ts
type FirstParam<T> = T extends (first: infer P, ...rest: any[]) => any ? P : never;

function greet(name: string, age: number): string {
  return `Hello ${name}`;
}

type NameType = FirstParam<typeof greet>;
// string
```

---

## Day 17: Template Literal Types

```ts
// Dynamic string types
type EventName<T extends string> = `on${Capitalize<T>}`;

type OnClick = EventName<"click">;     // "onClick"
type OnHover = EventName<"hover">;     // "onHover"

// WhatsApp API endpoints
type ApiVersion = "v18.0" | "v19.0";
type Endpoint = `/${ApiVersion}/${string}/messages`;

const valid: Endpoint = "/v18.0/123456/messages";   // ✅
const invalid: Endpoint = "/v20.0/123/messages";   // ❌
```

---

## Day 18: Recursive Types

```ts
// JSON type
type JSONValue =
  | string
  | number
  | boolean
  | null
  | JSONValue[]
  | { [key: string]: JSONValue };

const data: JSONValue = {
  user: {
    name: "Talha",
    scores: [90, 85, 95],
  },
};

// DeepPartial
type DeepPartial<T> = T extends object ? {
  [K in keyof T]?: DeepPartial<T[K]>;
} : T;
```

---

## Day 19-20: Week 3 Review + Practice

### Type Challenges Practice
GitHub pe jao: `type-challenges/type-challenges`
Easy se shuru karo:
- Pick
- Readonly
- Tuple to Object
- First of Array

---

# PART 4: PRACTICAL SDK BUILDING (Week 7-8)
## WhatsApp SDK Type System

---

## Day 21: Designing Tenant Types

```ts
// tenant.ts

// Base tenant — minimal required
interface BaseTenant {
  id: string;
  phoneNumberId: string;
  accessToken: string;
}

// With webhook support
interface WebhookTenant extends BaseTenant {
  webhookSecret: string;
}

// Full tenant with optional metadata
interface Tenant extends WebhookTenant {
  businessAccountId?: string;
  displayName?: string;
  createdAt?: Date;
}

// Type helpers
type CreateTenant = Pick<Tenant, "id"> & Partial<Omit<Tenant, "id">>;
type UpdateTenant = Partial<Omit<Tenant, "id" | "phoneNumberId">>;
type PublicTenant = Omit<Tenant, "accessToken" | "webhookSecret">;
```

---

## Day 22: Webhook Event Types

```ts
// webhook-events.ts

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

// The union
type WebhookEvent = TextEvent | ImageEvent | StatusEvent;

// Type guards
function isTextEvent(e: WebhookEvent): e is TextEvent {
  return e.type === "text";
}

// Exhaustive handler
function handleEvent(e: WebhookEvent): string {
  switch (e.type) {
    case "text": return e.text.body;
    case "image": return e.image.id;
    case "status": return e.status;
    default: const _n: never = e; return _n;
  }
}
```

---

## Day 23: Generic Store

```ts
// store.ts

interface Storable {
  id: string;
}

interface Store<T extends Storable> {
  get(id: string): T | undefined;
  getAll(): T[];
  add(item: T): void;
  update(id: string, changes: Partial<Omit<T, "id">>): T | null;
  remove(id: string): boolean;
}

class MemoryStore<T extends Storable> implements Store<T> {
  private items = new Map<string, T>();

  get(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return [...this.items.values()];
  }

  add(item: T): void {
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

---

## Day 24: Typed HTTP Client

```ts
// http-client.ts

type HttpMethod = "GET" | "POST" | "DELETE";

interface RequestConfig<B = unknown> {
  method: HttpMethod;
  endpoint: string;
  body?: B;
}

interface ApiResponse<D> {
  data: D;
  status: number;
}

class HttpClient {
  constructor(
    private tenant: Tenant,
    private baseUrl: string = "https://graph.facebook.com/v18.0"
  ) {}

  async request<D, B = unknown>(
    config: RequestConfig<B>
  ): Promise<ApiResponse<D>> {
    const url = `${this.baseUrl}/${this.tenant.phoneNumberId}${config.endpoint}`;

    const res = await fetch(url, {
      method: config.method,
      headers: {
        Authorization: `Bearer ${this.tenant.accessToken}`,
        "Content-Type": "application/json",
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const data = await res.json() as D;
    return { data, status: res.status };
  }
}
```

---

## Day 25: Error Hierarchy

```ts
// errors.ts

type ErrorCode =
  | "AUTH_ERROR"
  | "RATE_LIMIT"
  | "VALIDATION_ERROR"
  | "NETWORK_ERROR"
  | "WEBHOOK_VERIFY_ERROR";

abstract class WasyncError extends Error {
  abstract readonly code: ErrorCode;
  abstract readonly retryable: boolean;
  readonly timestamp = Date.now();

  constructor(message: string, public readonly tenantId?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

class RateLimitError extends WasyncError {
  readonly code = "RATE_LIMIT" as const;
  readonly retryable = true;
}

class AuthError extends WasyncError {
  readonly code = "AUTH_ERROR" as const;
  readonly retryable = false;
}

function isRetryable(error: unknown): error is WasyncError & { retryable: true } {
  return error instanceof WasyncError && error.retryable;
}
```

---

## Day 26: tsconfig.json Master

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## Day 27: Final Integration

```ts
// index.ts — Complete SDK types

export type {
  Tenant,
  BaseTenant,
  WebhookTenant,
  CreateTenant,
  UpdateTenant,
  PublicTenant,
} from "./tenant.js";

export type {
  WebhookEvent,
  TextEvent,
  ImageEvent,
  StatusEvent,
} from "./webhook-events.js";

export type { Store, Storable } from "./store.js";
export { MemoryStore } from "./store.js";

export { HttpClient } from "./http-client.js";
export { WasyncError, RateLimitError, AuthError } from "./errors.js";
```

---

## Day 28: Final Project

### Build Complete SDK Type Layer:
1. All tenant types with hierarchy
2. Webhook discriminated union with 4+ events
3. Generic Store with implementation
4. Typed HttpClient
5. Error hierarchy with type guards
6. Zero `any`, zero errors
7. `tsc --noEmit` passes

---

# 🎓 Graduation Checklist

- [ ] Variables, Arrays, Objects types likh sakta hun
- [ ] Functions with proper types bana sakta hun
- [ ] Interface vs Type ka farq samajhta hun
- [ ] Generics use kar sakta hun
- [ ] Type guards likh sakta hun
- [ ] Discriminated unions design kar sakta hun
- [ ] Utility types use kar sakta hun
- [ ] Conditional types samajhta hun
- [ ] `infer` se types extract kar sakta hun
- [ ] Complete SDK type system design kar sakta hun

**Jab yeh sab check ho jaye, tum TypeScript Pro ho!**
