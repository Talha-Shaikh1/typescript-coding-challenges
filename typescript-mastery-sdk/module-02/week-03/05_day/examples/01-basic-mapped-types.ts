/**
 * Day 19 - Example 1: Basic Mapped Types
 *
 * Demonstrates the fundamentals of mapped types
 * How to iterate over keys and transform property types
 */

// ============================================
// Example 1: Understanding keyof
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// keyof produces a union of all keys
type UserKeys = keyof User;
// Result: 'id' | 'name' | 'email' | 'age'

// Index access gets property type
type IdType = User['id']; // string
type AgeType = User['age']; // number

// Can use union to access multiple properties
type StringFields = User['id' | 'name' | 'email']; // string

console.log('✅ Example 1: Understanding keyof completed\n');


// ============================================
// Example 2: Basic Mapped Type - Nullable
// ============================================

// Make all properties nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface Config {
  apiKey: string;
  timeout: number;
  debug: boolean;
}

type NullableConfig = Nullable<Config>;
// Result:
// {
//   apiKey: string | null;
//   timeout: number | null;
//   debug: boolean | null;
// }

function resetConfig(): NullableConfig {
  return {
    apiKey: null,
    timeout: null,
    debug: null
  };
}

const nullConfig = resetConfig();
console.log('Null config:', nullConfig);

console.log('✅ Example 2: Nullable completed\n');


// ============================================
// Example 3: Asyncify - Wrap in Promise
// ============================================

// Wrap all property types in Promise
type Asyncify<T> = {
  [P in keyof T]: Promise<T[P]>;
};

interface SyncData {
  username: string;
  userId: number;
  isActive: boolean;
}

type AsyncData = Asyncify<SyncData>;
// Result:
// {
//   username: Promise<string>;
//   userId: Promise<number>;
//   isActive: Promise<boolean>;
// }

async function loadAsyncData(): AsyncData {
  return {
    username: Promise.resolve('john_doe'),
    userId: Promise.resolve(123),
    isActive: Promise.resolve(true)
  };
}

async function useAsyncData() {
  const data = await loadAsyncData();
  const username = await data.username;
  const userId = await data.userId;
  console.log(`User: ${username} (${userId})`);
}

useAsyncData();

console.log('✅ Example 3: Asyncify completed\n');


// ============================================
// Example 4: Stringify - Convert All to String
// ============================================

// Convert all property types to string
type Stringify<T> = {
  [P in keyof T]: string;
};

interface Metrics {
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
}

type StringMetrics = Stringify<Metrics>;
// Result:
// {
//   views: string;
//   clicks: string;
//   conversions: string;
//   revenue: string;
// }

function serializeMetrics(metrics: Metrics): StringMetrics {
  return {
    views: String(metrics.views),
    clicks: String(metrics.clicks),
    conversions: String(metrics.conversions),
    revenue: String(metrics.revenue)
  };
}

const metrics: Metrics = {
  views: 1000,
  clicks: 150,
  conversions: 25,
  revenue: 500.50
};

const stringMetrics = serializeMetrics(metrics);
console.log('String metrics:', stringMetrics);

console.log('✅ Example 4: Stringify completed\n');


// ============================================
// Example 5: How Partial Works
// ============================================

// This is how Partial<T> is implemented
type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

type PartialProduct = MyPartial<Product>;
// Result:
// {
//   id?: string;
//   name?: string;
//   price?: number;
//   stock?: number;
// }

function updateProduct(id: string, updates: PartialProduct): void {
  console.log(`Updating product ${id}:`, updates);
}

updateProduct('prod-1', { price: 99.99 });
updateProduct('prod-2', { stock: 50, price: 149.99 });

console.log('✅ Example 5: Partial implementation completed\n');


// ============================================
// Example 6: How Required Works
// ============================================

// This is how Required<T> is implemented
type MyRequired<T> = {
  [P in keyof T]-?: T[P];
  //             ^ minus removes the optional modifier
};

interface OptionalConfig {
  apiVersion?: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

type RequiredConfig = MyRequired<OptionalConfig>;
// Result:
// {
//   apiVersion: string;
//   timeout: number;
//   retries: number;
//   debug: boolean;
// }

function validateProductionConfig(config: RequiredConfig): void {
  console.log('Production config validated:', config);
  // All fields guaranteed to exist
}

validateProductionConfig({
  apiVersion: 'v17.0',
  timeout: 5000,
  retries: 3,
  debug: false
});

console.log('✅ Example 6: Required implementation completed\n');


// ============================================
// Example 7: How Readonly Works
// ============================================

// This is how Readonly<T> is implemented
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface MutableState {
  count: number;
  name: string;
  active: boolean;
}

type ImmutableState = MyReadonly<MutableState>;
// Result:
// {
//   readonly count: number;
//   readonly name: string;
//   readonly active: boolean;
// }

const state: ImmutableState = {
  count: 0,
  name: 'App',
  active: true
};

// state.count = 1; // ❌ TypeScript Error: Cannot assign to readonly
console.log('Immutable state:', state);

console.log('✅ Example 7: Readonly implementation completed\n');


// ============================================
// Example 8: Combining Transformations
// ============================================

// Make all properties optional AND readonly
type PartialReadonly<T> = {
  readonly [P in keyof T]?: T[P];
};

interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  autoSave: boolean;
}

type SafeSettings = PartialReadonly<AppSettings>;
// Result:
// {
//   readonly theme?: 'light' | 'dark';
//   readonly language?: string;
//   readonly notifications?: boolean;
//   readonly autoSave?: boolean;
// }

const settings: SafeSettings = {
  theme: 'dark',
  language: 'en'
};

// settings.theme = 'light'; // ❌ Error: readonly
console.log('Safe settings:', settings);

console.log('✅ Example 8: Combined transformations completed\n');


// ============================================
// Example 9: Mutable - Remove Readonly
// ============================================

// Remove readonly modifier from all properties
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
  //^ minus removes readonly
};

interface ReadonlyUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

type MutableUser = Mutable<ReadonlyUser>;
// Result:
// {
//   id: string;
//   name: string;
//   email: string;
// }

const user: MutableUser = {
  id: '1',
  name: 'John',
  email: 'john@example.com'
};

user.name = 'Jane'; // ✅ OK - no longer readonly
console.log('Mutable user:', user);

console.log('✅ Example 9: Mutable completed\n');


// ============================================
// Example 10: SDK Validators
// ============================================

interface MessagePayload {
  to: string;
  body: string;
  mediaUrl?: string;
}

// Create validator function for each property
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

const validators: MessageValidators = {
  to: (value) => /^\+\d{10,}$/.test(value),
  body: (value) => value.length > 0 && value.length <= 1000,
  mediaUrl: (value) => !value || /^https?:\/\//.test(value)
};

function validateMessage(payload: MessagePayload): boolean {
  for (const key in validators) {
    const validator = validators[key as keyof MessageValidators];
    const value = payload[key as keyof MessagePayload];
    if (!validator(value as any)) {
      console.error(`Validation failed for ${key}`);
      return false;
    }
  }
  return true;
}

const message: MessagePayload = {
  to: '+1234567890',
  body: 'Hello!',
  mediaUrl: 'https://example.com/image.jpg'
};

const isValid = validateMessage(message);
console.log('Message valid?', isValid);

console.log('✅ Example 10: SDK Validators completed\n');


// ============================================
// Example 11: Array to Object Mapping
// ============================================

// Convert array of strings to object with those keys
type ArrayToObject<T extends readonly string[], V = string> = {
  [P in T[number]]: V;
};

const statusCodes = ['success', 'pending', 'error', 'loading'] as const;

type StatusMap = ArrayToObject<typeof statusCodes, boolean>;
// Result:
// {
//   success: boolean;
//   pending: boolean;
//   error: boolean;
//   loading: boolean;
// }

const statusFlags: StatusMap = {
  success: false,
  pending: true,
  error: false,
  loading: false
};

console.log('Status flags:', statusFlags);

console.log('✅ Example 11: Array to Object completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Basic Mapped Types Summary:
----------------------------
✓ Mapped types iterate over object keys
✓ Syntax: { [P in keyof T]: TransformedType }
✓ keyof gets union of all keys
✓ T[P] accesses property type
✓ Modifiers: ?, -?, readonly, -readonly
✓ Can combine multiple transformations

Common patterns:
- Nullable<T>: Make all fields nullable
- Asyncify<T>: Wrap all in Promise
- Stringify<T>: Convert all to string
- Partial<T>: Make all optional
- Required<T>: Remove all optional
- Readonly<T>: Make all readonly
- Mutable<T>: Remove all readonly

Mapped types are the foundation of:
- Built-in utility types
- Custom type transformations
- Type-safe APIs
- Code generation patterns
`);
