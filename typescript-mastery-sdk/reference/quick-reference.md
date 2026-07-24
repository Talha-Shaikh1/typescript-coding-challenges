# 📖 TypeScript Quick Reference

Quick lookup for common TypeScript patterns. Bookmark this!

---

## 🎯 Basic Types

```typescript
// Primitives
let name: string = "Talha";
let age: number = 25;
let isActive: boolean = true;

// Special types
let notSure: any = 4;           // Avoid this!
let nothing: null = null;
let notDefined: undefined = undefined;
let nothingHere: void;          // For functions that return nothing
```

---

## 📝 Arrays

```typescript
// Array of strings
let names: string[] = ["Ali", "Ahmed"];

// Alternative syntax
let numbers: Array<number> = [1, 2, 3];

// Readonly array
let readOnlyNames: readonly string[] = ["Fixed"];
```

---

## 🔧 Functions

```typescript
// Named function
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Function with no return (void)
function log(message: string): void {
  console.log(message);
}

// Optional parameters
function greet(name: string, greeting?: string): string {
  return greeting ? `${greeting}, ${name}` : `Hello, ${name}`;
}

// Default parameters
function greet2(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}
```

---

## 📦 Objects

```typescript
// Object type
let person: { name: string; age: number } = {
  name: "Talha",
  age: 25
};

// Optional properties
let user: { name: string; email?: string } = {
  name: "Ahmed"
  // email is optional
};
```

---

## 🎨 Type Aliases

```typescript
// Create reusable type
type Point = {
  x: number;
  y: number;
};

let point: Point = { x: 10, y: 20 };

// Type alias for union
type ID = string | number;
let userId: ID = "abc123";
let userCode: ID = 12345;
```

---

## 🔌 Interfaces

```typescript
// Define object shape
interface User {
  name: string;
  age: number;
  email?: string;  // Optional
}

let user: User = {
  name: "Talha",
  age: 25
};

// Interface for functions
interface Calculate {
  (a: number, b: number): number;
}

const add: Calculate = (a, b) => a + b;
```

---

## 🎭 Union Types

```typescript
// Can be one of multiple types
type Status = "pending" | "success" | "error";
let currentStatus: Status = "pending";

// Union with different types
type StringOrNumber = string | number;
let value: StringOrNumber = "hello";
value = 123; // Also valid
```

---

## ✅ Type Guards

```typescript
// typeof guard
function process(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  } else {
    console.log(value.toFixed(2)); // TypeScript knows it's number
  }
}

// Custom type guard
function isString(value: any): value is string {
  return typeof value === "string";
}
```

---

## 🎁 Generics (Preview)

```typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("hello");
let num = identity<number>(42);
```

---

## 🏫 Classes (Preview)

```typescript
class Person {
  name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

let person = new Person("Talha");
```

---

## 🔍 Useful Utility Types

```typescript
// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Pick specific properties
type UserName = Pick<User, "name">;

// Omit specific properties
type UserWithoutEmail = Omit<User, "email">;

// Make all properties readonly
type ReadonlyUser = Readonly<User>;
```

---

## 🎯 Type Assertions

```typescript
// Tell TypeScript you know better
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;

// Alternative syntax
let strLength2: number = (<string>someValue).length;
```

---

## 📚 Useful Type Operators

```typescript
// typeof - get type of variable
let s = "hello";
let n: typeof s; // n is type string

// keyof - get keys of type
type User = { name: string; age: number };
type UserKeys = keyof User; // "name" | "age"
```

---

## 🚨 Common Patterns

```typescript
// Return type from function
function getUser() {
  return { name: "Talha", age: 25 };
}
type User = ReturnType<typeof getUser>;

// Parameters type from function
function send(phone: string, message: string) {}
type SendParams = Parameters<typeof send>; // [string, string]
```

---

## 💡 Tips

- Use `const` for values that won't change
- Always enable `strict` mode in tsconfig.json
- Avoid `any` - use `unknown` if you really don't know the type
- Let TypeScript infer when obvious, be explicit when not
- Read compiler errors - they're usually helpful!

---

Keep this handy while coding! 📌
