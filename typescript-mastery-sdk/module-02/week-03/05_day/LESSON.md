# Day 19: Mapped Types (Deep Dive)

## 🎯 The Big Picture

Welcome to Day 19! Aaj hum **Mapped Types** seekhenge - TypeScript ki sabse powerful type transformation feature.

**Core Question:** How do we systematically transform every property of a type?

**Answer:** Use mapped types - they're like loops for types!

---

## 🤔 The Fundamental Problem

### Problem: Repetitive Type Transformations

You've been using `Partial<T>`, `Required<T>`, `Readonly<T>` - but how are they built? And how do you build your own?

**Scenario:** You have a User type and need multiple variations:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Need: All fields nullable
interface NullableUser {
  id: string | null;
  name: string | null;
  email: string | null;
  age: number | null;
}

// Need: All fields as promises
interface AsyncUser {
  id: Promise<string>;
  name: Promise<string>;
  email: Promise<string>;
  age: Promise<number>;
}

// Need: All fields optional and readonly
interface ImmutablePartialUser {
  readonly id?: string;
  readonly name?: string;
  readonly email?: string;
  readonly age?: number;
}

// Problem: Manual duplication! What if User changes?
```

**Solution: Mapped Types**

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type Asyncify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

type ImmutablePartial<T> = {
  readonly [P in keyof T]?: T[P];
};

// Now these auto-update when User changes!
type NullableUser = Nullable<User>;
type AsyncUser = Asyncify<User>;
type ImmutablePartialUser = ImmutablePartial<User>;
```

---

## 📖 Understanding Mapped Types

### What Are Mapped Types?

**Mapped types are type-level loops.** They iterate over the keys of a type and transform each property.

### The Real-World Analogy

Think of **a factory assembly line**:

- **Input:** Raw materials (original type)
- **Machine (Mapped Type):** Processes each item the same way
- **Output:** Transformed products (new type)

Just like an assembly line processes each item systematically, mapped types process each property systematically.

### Basic Syntax

```typescript
type MappedType<T> = {
  [P in keyof T]: TransformationType;
};
```

**Breaking it down:**
- `[P in keyof T]` - Loop over each key P in type T
- `: TransformationType` - Transform the property type
- The whole thing creates a new type

### How It Works Step by Step

```typescript
interface User {
  id: string;
  name: string;
  age: number;
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

type NullableUser = Nullable<User>;
```

**Step 1:** `keyof User` produces `'id' | 'name' | 'age'`

**Step 2:** `P in keyof User` iterates over each key:
- First iteration: P = 'id'
- Second iteration: P = 'name'
- Third iteration: P = 'age'

**Step 3:** For each P, create property with type `T[P] | null`:
- `id: User['id'] | null` → `id: string | null`
- `name: User['name'] | null` → `name: string | null`
- `age: User['age'] | null` → `age: number | null`

**Result:**
```typescript
type NullableUser = {
  id: string | null;
  name: string | null;
  age: number | null;
};
```

---

## 📖 The keyof Operator

### What is keyof?

`keyof T` produces a union of all property names (keys) of type T.

```typescript
interface User {
  id: string;
  name: string;
  age: number;
}

type UserKeys = keyof User;
// Result: 'id' | 'name' | 'age'
```

### Why keyof Matters

Without `keyof`, you'd have to manually list all keys:

```typescript
// ❌ Manual - breaks when User changes
type ManualNullable = {
  id: string | null;
  name: string | null;
  age: number | null;
};

// ✅ Automatic - updates when User changes
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

### Index Access Types

Use `T[P]` to get the type of property P in type T:

```typescript
interface User {
  id: string;
  name: string;
  age: number;
}

type IdType = User['id']; // string
type NameType = User['name']; // string
type AgeType = User['age']; // number

// Generic version
type PropertyType<T, K extends keyof T> = T[K];
type UserIdType = PropertyType<User, 'id'>; // string
```

---

## 📖 Building Utility Types

### Example 1: Nullable - Make All Fields Nullable

```typescript
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  id: string;
  name: string;
  age: number;
}

type NullableUser = Nullable<User>;
// Result:
// {
//   id: string | null;
//   name: string | null;
//   age: number | null;
// }

// Usage
function resetUser(): NullableUser {
  return {
    id: null,
    name: null,
    age: null
  };
}
```

### Example 2: Asyncify - Wrap All Fields in Promise

```typescript
type Asyncify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

interface Config {
  apiKey: string;
  timeout: number;
  debug: boolean;
}

type AsyncConfig = Asyncify<Config>;
// Result:
// {
//   apiKey: Promise<string>;
//   timeout: Promise<number>;
//   debug: Promise<boolean>;
// }

// Usage
async function loadConfig(): AsyncConfig {
  return {
    apiKey: Promise.resolve('key_xxx'),
    timeout: Promise.resolve(5000),
    debug: Promise.resolve(false)
  };
}
```

### Example 3: Stringify - Convert All Values to String

```typescript
type Stringify<T> = {
  [P in keyof T]: string;
};

interface Metrics {
  views: number;
  clicks: number;
  conversions: number;
}

type StringMetrics = Stringify<Metrics>;
// Result:
// {
//   views: string;
//   clicks: string;
//   conversions: string;
// }

// Usage
function serializeMetrics(metrics: Metrics): StringMetrics {
  return {
    views: String(metrics.views),
    clicks: String(metrics.clicks),
    conversions: String(metrics.conversions)
  };
}
```

---

## 📖 Type Modifiers

### Optional Modifier: `?`

Add or remove the optional modifier:

```typescript
// Add optional (make everything optional)
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Remove optional (make everything required)
type Required<T> = {
  [P in keyof T]-?: T[P];
  //                ^ minus removes the modifier
};
```

**Syntax:**
- `?` or `+?` - Add optional
- `-?` - Remove optional

### Readonly Modifier: `readonly`

Add or remove the readonly modifier:

```typescript
// Add readonly (make everything immutable)
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Remove readonly (make everything mutable)
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
  //^ minus removes readonly
};
```

**Syntax:**
- `readonly` or `+readonly` - Add readonly
- `-readonly` - Remove readonly

### Combining Modifiers

```typescript
// Make everything optional and readonly
type PartialReadonly<T> = {
  readonly [P in keyof T]?: T[P];
};

// Make everything required and mutable
type RequiredMutable<T> = {
  -readonly [P in keyof T]-?: T[P];
};
```

---

## 📖 How Built-in Utilities Work

Now you understand how TypeScript's built-in utilities are implemented!

### Partial<T>

```typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Makes all properties optional
```

### Required<T>

```typescript
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// Makes all properties required (removes ?)
```

### Readonly<T>

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Makes all properties readonly
```

### Pick<T, K>

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Picks specific properties from T
// Note: Iterates over K, not keyof T
```

### Record<K, V>

```typescript
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Creates object with keys K and values T
```

---

## 🎯 SDK Integration: Real Examples

### Example 1: Validation Types

```typescript
interface MessagePayload {
  to: string;
  body: string;
  mediaUrl?: string;
}

// Add validation function for each field
type Validators<T> = {
  [P in keyof T]: (value: T[P]) => boolean;
};

type MessageValidators = Validators<MessagePayload>;
// Result:
// {
//   to: (value: string) => boolean;
//   body: (value: string) => boolean;
//   mediaUrl: (value: string | undefined) => boolean;
// }

const messageValidators: MessageValidators = {
  to: (value) => /^\+\d{10,}$/.test(value),
  body: (value) => value.length > 0 && value.length <= 1000,
  mediaUrl: (value) => !value || /^https?:\/\//.test(value)
};
```

### Example 2: Event Types from Message Types

```typescript
type MessageType = 'text' | 'image' | 'video' | 'audio';

interface Message {
  id: string;
  type: MessageType;
  timestamp: number;
}

// Create event name from message type
type MessageEvents<T extends string> = {
  [P in T as `message.${P}.sent`]: Message & { type: P };
};

type Events = MessageEvents<MessageType>;
// Result:
// {
//   'message.text.sent': Message & { type: 'text' };
//   'message.image.sent': Message & { type: 'image' };
//   'message.video.sent': Message & { type: 'video' };
//   'message.audio.sent': Message & { type: 'audio' };
// }
```

### Example 3: API Response Wrappers

```typescript
interface SDKMethods {
  sendMessage(to: string, body: string): boolean;
  getMessages(): Message[];
  deleteMessage(id: string): boolean;
}

// Wrap all methods in API response
type APIResponse<T> = {
  success: boolean;
  data: T;
  error?: string;
};

type APIWrapped<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<APIResponse<R>>
    : never;
};

type WrappedSDK = APIWrapped<SDKMethods>;
// Result:
// {
//   sendMessage: (to: string, body: string) => Promise<APIResponse<boolean>>;
//   getMessages: () => Promise<APIResponse<Message[]>>;
//   deleteMessage: (id: string) => Promise<APIResponse<boolean>>;
// }
```

---

## 🔄 Advanced Mapped Type Patterns

### Pattern 1: Filtering Properties

Keep only properties of specific type:

```typescript
type FilterByType<T, U> = {
  [P in keyof T as T[P] extends U ? P : never]: T[P];
};

interface Mixed {
  id: string;
  name: string;
  age: number;
  active: boolean;
  count: number;
}

type StringProps = FilterByType<Mixed, string>;
// Result: { id: string; name: string; }

type NumberProps = FilterByType<Mixed, number>;
// Result: { age: number; count: number; }
```

### Pattern 2: Renaming Keys

Add prefix/suffix to keys:

```typescript
type Prefixed<T, Prefix extends string> = {
  [P in keyof T as `${Prefix}${string & P}`]: T[P];
};

interface User {
  id: string;
  name: string;
}

type PrefixedUser = Prefixed<User, 'user'>;
// Result: { userid: string; username: string; }
```

### Pattern 3: Getters

Convert properties to getter functions:

```typescript
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P];
};

interface State {
  count: number;
  name: string;
}

type StateGetters = Getters<State>;
// Result:
// {
//   getCount: () => number;
//   getName: () => string;
// }
```

### Pattern 4: Deep Partial

Make nested objects optional too:

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

interface Config {
  api: {
    endpoint: string;
    timeout: number;
  };
  debug: boolean;
}

type DeepPartialConfig = DeepPartial<Config>;
// Result:
// {
//   api?: {
//     endpoint?: string;
//     timeout?: number;
//   };
//   debug?: boolean;
// }
```

---

## ⚠️ Common Mistakes

### Mistake 1: Forgetting keyof

```typescript
// ❌ Wrong: P is not defined
type Bad<T> = {
  [P]: T[P];
};

// ✅ Correct: P iterates over keys of T
type Good<T> = {
  [P in keyof T]: T[P];
};
```

### Mistake 2: Wrong Index Type

```typescript
interface User {
  id: string;
  name: string;
}

// ❌ Wrong: Can't index with arbitrary string
type Bad = User[string]; // Error

// ✅ Correct: Index with actual key
type Good = User['id']; // string
```

### Mistake 3: Circular Reference

```typescript
// ❌ Wrong: Circular reference
type Bad<T> = {
  [P in keyof T]: Bad<T[P]>;
};

// ✅ Correct: Conditional to stop recursion
type Good<T> = {
  [P in keyof T]: T[P] extends object ? Good<T[P]> : T[P];
};
```

---

## 🧠 Mental Models

### Mapped Type = Type-Level Loop

```typescript
// Regular JavaScript loop
const result = {};
for (const key in object) {
  result[key] = transform(object[key]);
}

// Mapped type (type-level equivalent)
type Result<T> = {
  [P in keyof T]: Transform<T[P]>;
};
```

### Modifiers = Instructions

- `?` = "Make optional"
- `-?` = "Make required"
- `readonly` = "Make immutable"
- `-readonly` = "Make mutable"

---

## 📝 Summary

| Concept | Syntax | Purpose |
|---------|--------|---------|
| Basic Mapped Type | `{ [P in keyof T]: ... }` | Loop over keys |
| Optional | `{ [P in keyof T]?: ... }` | Add optional |
| Remove Optional | `{ [P in keyof T]-?: ... }` | Remove optional |
| Readonly | `{ readonly [P in keyof T]: ... }` | Add readonly |
| Remove Readonly | `{ -readonly [P in keyof T]: ... }` | Remove readonly |
| Key Remapping | `{ [P in keyof T as NewKey]: ... }` | Rename keys |
| Filtering | `{ [P in keyof T as Condition ? P : never]: ... }` | Filter properties |

---

## 🚀 Next Steps

1. Complete the exercises in EXERCISES.md
2. Study the examples in `examples/` folder
3. Tomorrow: Conditional Types (even more power!)

---

**Remember:** Mapped types are your tool for building reusable type transformations. Master them, and you can build any utility type you need!

Happy coding! 🎉
