# Day 19: Exercises - Mapped Types

Complete all exercises to master mapped types and build custom utility types.

---

## 📋 Exercise 1: Basic Custom Utilities (Mapped Types)

**Difficulty:** ⭐⭐ Easy-Medium

**Scenario:** Build fundamental custom utility types using mapped types.

**Task:**

Create the following custom utility types:

1. **Nullable\<T\>** - Make all properties nullable (T | null)
2. **Optional\<T\>** - Make all properties optional (same as Partial)
3. **Immutable\<T\>** - Make all properties readonly
4. **Stringify\<T\>** - Convert all property types to string
5. **Booleanify\<T\>** - Convert all property types to boolean

Then create a testing interface and apply all utilities to it.

**Starter Code:** `starter-code/exercise-1.ts`

**Requirements:**
- Use mapped type syntax: `{ [P in keyof T]: ... }`
- Each utility should be a generic type
- Test with an interface that has 5+ properties
- Demonstrate that utilities work correctly

**Example Usage:**
```typescript
interface User {
  id: string;
  name: string;
  age: number;
  active: boolean;
}

type NullableUser = Nullable<User>;
// { id: string | null; name: string | null; age: number | null; active: boolean | null }

type StringUser = Stringify<User>;
// { id: string; name: string; age: string; active: string }
```

---

## 📋 Exercise 2: Type Modifiers (Adding and Removing)

**Difficulty:** ⭐⭐⭐ Medium

**Scenario:** Build utilities that add or remove type modifiers.

**Task:**

Create the following modifier utilities:

1. **Mutable\<T\>** - Remove readonly from all properties (`-readonly`)
2. **Concrete\<T\>** - Remove optional from all properties (`-?`)
3. **DeepReadonly\<T\>** - Make all properties readonly recursively
4. **DeepPartial\<T\>** - Make all properties optional recursively

**Starter Code:** `starter-code/exercise-2.ts`

**Requirements:**
- Use `+` and `-` modifiers correctly
- Handle nested objects for Deep utilities
- Test with nested interface structures
- Show before/after type transformations

**Example Usage:**
```typescript
interface Config {
  readonly apiKey: string;
  timeout?: number;
  nested: {
    readonly value: string;
    count?: number;
  };
}

type MutableConfig = Mutable<Config>;
// Removes all readonly modifiers

type DeepReadonlyConfig = DeepReadonly<Config>;
// Makes everything readonly, including nested
```

---

## 📋 Exercise 3: Property Filtering and Transformation

**Difficulty:** ⭐⭐⭐ Medium-Hard

**Scenario:** Build utilities that filter and transform properties based on their types.

**Task:**

Create the following filtering utilities:

1. **PickByType\<T, U\>** - Keep only properties of type U
2. **OmitByType\<T, U\>** - Remove properties of type U
3. **FunctionProperties\<T\>** - Keep only function properties
4. **NonFunctionProperties\<T\>** - Keep only non-function properties
5. **NullableProperties\<T\>** - Keep only nullable properties

**Starter Code:** `starter-code/exercise-3.ts`

**Requirements:**
- Use `as` clause for key remapping: `[P in keyof T as ...]`
- Use conditional types with mapped types
- Return `never` to exclude properties
- Test with mixed interface containing various types

**Example Usage:**
```typescript
interface Mixed {
  id: string;
  name: string;
  age: number;
  save: () => void;
  load: () => boolean;
  data: string | null;
}

type StringProps = PickByType<Mixed, string>;
// { id: string; name: string; }

type Functions = FunctionProperties<Mixed>;
// { save: () => void; load: () => boolean; }
```

---

## 📋 Exercise 4: Key Transformation Utilities

**Difficulty:** ⭐⭐⭐⭐ Hard

**Scenario:** Build utilities that transform property keys (rename, prefix, suffix).

**Task:**

Create the following key transformation utilities:

1. **Prefixed\<T, P extends string\>** - Add prefix to all keys
2. **Suffixed\<T, S extends string\>** - Add suffix to all keys
3. **Getters\<T\>** - Convert properties to getter functions (`getName()`)
4. **Setters\<T\>** - Convert properties to setter functions (`setName(value)`)
5. **GettersAndSetters\<T\>** - Create both getters and setters

**Starter Code:** `starter-code/exercise-4.ts`

**Requirements:**
- Use template literal types for key transformation
- Use `Capitalize` utility for proper naming
- Getters should return property type
- Setters should accept property type and return void
- Combine multiple transformations

**Example Usage:**
```typescript
interface State {
  count: number;
  name: string;
  active: boolean;
}

type StateGetters = Getters<State>;
// {
//   getCount: () => number;
//   getName: () => string;
//   getActive: () => boolean;
// }

type StateSetters = Setters<State>;
// {
//   setCount: (value: number) => void;
//   setName: (value: string) => void;
//   setActive: (value: boolean) => void;
// }
```

---

## 📋 Exercise 5: Advanced SDK Type System (Combining Everything)

**Difficulty:** ⭐⭐⭐⭐⭐ Very Hard

**Scenario:** Build a complete type system for the WhatsApp SDK using mapped types.

**Task:**

Create a comprehensive type system that includes:

1. **Validators\<T\>** - Add validation function for each property
2. **AsyncMethods\<T\>** - Wrap all methods in Promise
3. **EventHandlers\<T\>** - Convert types to event handler types
4. **APIResponse\<T\>** - Wrap all method returns in API response object
5. **TrackedState\<T\>** - Add change tracking metadata to each property

**Implementation Requirements:**

Build these for an SDK interface:
```typescript
interface SDKMethods {
  sendMessage(to: string, body: string): boolean;
  getMessages(limit: number): Message[];
  deleteMessage(id: string): boolean;
  updateStatus(id: string, status: string): void;
}
```

Create:
- Validation functions for each parameter
- Async wrappers for all methods
- Event types from method names
- Response wrappers with success/error handling
- State tracking with previous/current values

**Starter Code:** `starter-code/exercise-5.ts`

**Requirements:**
- Use `infer` for extracting function parameters and return types
- Combine multiple mapped type patterns
- Create type-safe implementation
- Handle edge cases (void returns, optional parameters)
- Build complete working example

---

## 🎯 Bonus Challenge: Generic Type Transformer

**Difficulty:** ⭐⭐⭐⭐⭐ Expert

**Scenario:** Build a generic type transformation system that can apply multiple transformations in sequence.

**Task:**

Create a `Transform<T, Operations[]>` utility that applies multiple transformations:

```typescript
type Operations = 
  | { type: 'nullable' }
  | { type: 'optional' }
  | { type: 'readonly' }
  | { type: 'stringify' }
  | { type: 'async' };

type Transform<T, Ops extends Operations[]> = // Your implementation
```

**Requirements:**
- Support chaining multiple operations
- Type-safe operation definitions
- Correct order of operations
- Works with any interface

**Example Usage:**
```typescript
interface User {
  id: string;
  name: string;
}

type Result = Transform<User, [
  { type: 'nullable' },
  { type: 'optional' },
  { type: 'readonly' }
]>;
// Result:
// {
//   readonly id?: string | null;
//   readonly name?: string | null;
// }
```

---

## 🔄 Cumulative Revision

These exercises also review:

**From Day 17-18 (Utility Types):**
- Partial, Required, Readonly, Pick, Omit, Record, Exclude, Extract

**From Day 16 (Generic Constraints):**
- extends keyword
- keyof operator
- Generic constraints

**From Day 15 (Generics):**
- Generic type parameters
- Type inference

---

## ✅ Checklist

Before moving to Day 20, ensure you can:

- [ ] Write basic mapped type syntax
- [ ] Use keyof to iterate over object keys
- [ ] Apply type modifiers (+?, -?, +readonly, -readonly)
- [ ] Build custom utility types
- [ ] Filter properties using conditional types
- [ ] Transform property keys with template literals
- [ ] Combine mapped types with other type features
- [ ] Understand how built-in utilities are implemented

---

## 🎓 Solutions

Solutions will be provided after you attempt all exercises. Try to solve them yourself first!

**Tips:**
1. Start with Exercise 1 (basics)
2. Review LESSON.md for syntax and patterns
3. Check examples/ folder for reference
4. Use TypeScript compiler errors as guides
5. Test each utility with console.log or type assertions

---

## 💡 Key Concepts to Master

### 1. Basic Mapped Type
```typescript
type MyUtility<T> = {
  [P in keyof T]: TransformedType;
};
```

### 2. With Modifiers
```typescript
type WithModifiers<T> = {
  readonly [P in keyof T]?: T[P];
};
```

### 3. Key Remapping
```typescript
type Remapped<T> = {
  [P in keyof T as NewKeyType]: T[P];
};
```

### 4. Filtering
```typescript
type Filtered<T> = {
  [P in keyof T as T[P] extends Condition ? P : never]: T[P];
};
```

### 5. Recursive
```typescript
type Deep<T> = {
  [P in keyof T]: T[P] extends object ? Deep<T[P]> : T[P];
};
```

---

**Time Estimate:** 2-3 hours for exercises 1-5, +1 hour for bonus

Good luck building your custom utility types! 🚀

---

## 🧪 Testing Your Utilities

For each utility, create test cases:

```typescript
// Test type equivalence
type Test1 = Nullable<{ id: string }>;
type Expected1 = { id: string | null };

// TypeScript will error if types don't match
const test: Test1 = {} as Expected1;
const expected: Expected1 = {} as Test1;
```

Use this pattern to verify your implementations!
