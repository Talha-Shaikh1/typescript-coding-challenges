# Day 17: Utility Types - Part 1 (Deep Dive)

## 🎯 The Big Picture

Welcome to Day 17! Aaj hum TypeScript ki built-in **Utility Types** seekhenge. Ye powerful generic types hain jo existing types ko transform karte hain.

**Core Question:** Why do utility types exist?

**Answer:** To avoid repetitive type definitions and keep your types DRY (Don't Repeat Yourself).

---

## 🤔 The Fundamental Problem

### Problem: Type Duplication Hell

Imagine you're building our WhatsApp SDK. You have a configuration interface:

```typescript
interface SDKConfig {
  accessToken: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  baseURL: string;
  debug: boolean;
  maxConcurrentRequests: number;
}
```

Now you need:

1. **Update function** - accepts partial config (user only updates timeout)
2. **Required fields validator** - checks only accessToken and apiVersion
3. **Safe logging** - logs everything except accessToken
4. **Default config** - provides defaults for optional fields

**Without Utility Types:**

```typescript
// You'd manually create each variation:
interface PartialSDKConfig {
  accessToken?: string;
  apiVersion?: string;
  timeout?: number;
  retryAttempts?: number;
  baseURL?: string;
  debug?: boolean;
  maxConcurrentRequests?: number;
}

interface RequiredFields {
  accessToken: string;
  apiVersion: string;
}

interface SafeConfig {
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  baseURL: string;
  debug: boolean;
  maxConcurrentRequests: number;
}

// Problems:
// 1. If SDKConfig changes, you must update ALL these interfaces
// 2. Easy to make mistakes (miss a field, wrong type)
// 3. Code duplication everywhere
// 4. Hard to maintain
```

**With Utility Types:**

```typescript
type PartialSDKConfig = Partial<SDKConfig>;
type RequiredFields = Pick<SDKConfig, 'accessToken' | 'apiVersion'>;
type SafeConfig = Omit<SDKConfig, 'accessToken'>;

// Benefits:
// ✅ One source of truth (SDKConfig)
// ✅ Auto-updates when SDKConfig changes
// ✅ Type-safe
// ✅ No duplication
```

---

## 📖 Utility Type #1: Partial\<T\>

### What is Partial?

**Partial\<T\>** transforms all properties of type `T` to optional (adds `?` to each property).

### The Real-World Analogy

Think of a **restaurant order update**:

- **Original Order (Interface):** Pizza, Coke, Fries
- **Update Order (Partial):** "Change just the drink to Sprite"

You don't need to re-specify the entire order, only what changed. That's `Partial`.

### How Partial Works Internally

```typescript
// TypeScript's internal implementation (simplified):
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Reads as:
// "For each property P in the keys of T,
//  make it optional (?) and keep its type T[P]"
```

### Problem → Solution Flow

**Problem:**

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

// Update function should accept partial data
function updateUser(id: string, data: User) {  // ❌ Forces all fields
  // update logic
}

// User must pass all fields even to change just name:
updateUser('123', {
  id: '123',
  name: 'New Name',
  email: 'old@email.com',  // Forced to include
  age: 25                   // Forced to include
});
```

**Solution with Partial:**

```typescript
function updateUser(id: string, data: Partial<User>) {  // ✅ All fields optional
  // update logic
}

// Now user can update just what changed:
updateUser('123', {
  name: 'New Name'  // Only changed field
});
```

### SDK Example: Configuration Updates

```typescript
interface WhatsAppSDKConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  baseURL: string;
}

class WhatsAppClient {
  private config: WhatsAppSDKConfig;

  constructor(config: WhatsAppSDKConfig) {
    this.config = config;
  }

  // User can update only specific config values
  updateConfig(updates: Partial<WhatsAppSDKConfig>) {
    this.config = { ...this.config, ...updates };
  }
}

// Usage:
const client = new WhatsAppClient({
  accessToken: 'token123',
  phoneNumberId: '123456',
  apiVersion: 'v17.0',
  timeout: 5000,
  retryAttempts: 3,
  baseURL: 'https://graph.facebook.com'
});

// Update only timeout - don't need to pass everything
client.updateConfig({
  timeout: 10000
});
```

### When to Use Partial

✅ **Use Partial when:**
- Update functions (partial data updates)
- Optional configuration overrides
- Default values with user customization
- PATCH API endpoints (partial updates)

❌ **Don't use Partial when:**
- Creating new records (all fields should be required)
- Critical fields must be present
- POST endpoints (full data required)

---

## 📖 Utility Type #2: Pick\<T, K\>

### What is Pick?

**Pick\<T, K\>** selects specific properties from type `T` by their keys `K`.

### The Real-World Analogy

Think of a **photo crop tool**:

- **Original Photo (Interface):** Full image with background, people, sky, ground
- **Cropped Photo (Pick):** Just the person's face

You "pick" only the part you need from the whole.

### How Pick Works Internally

```typescript
// TypeScript's internal implementation (simplified):
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Reads as:
// "For each property P in the selected keys K,
//  include it with its original type T[P]"
```

### Problem → Solution Flow

**Problem:**

```typescript
interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  mediaUrl?: string;
  metadata: Record<string, any>;
}

// API returns lightweight summary, not full message
// You'd manually create:
interface MessageSummary {
  id: string;
  body: string;
  timestamp: number;
}

// Problem: If WhatsAppMessage changes, MessageSummary might break
```

**Solution with Pick:**

```typescript
// Automatically picks only specified fields
type MessageSummary = Pick<WhatsAppMessage, 'id' | 'body' | 'timestamp'>;

// Auto-updates if WhatsAppMessage changes
// Type-safe - can't pick non-existent properties
```

### SDK Example: API Response Types

```typescript
interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
  mediaUrl?: string;
  metadata: Record<string, any>;
}

// List view needs only basic info (lighter payload)
type MessageListItem = Pick<WhatsAppMessage, 'id' | 'body' | 'timestamp' | 'status'>;

// Notification needs minimal data
type MessageNotification = Pick<WhatsAppMessage, 'id' | 'from' | 'body'>;

// Analytics needs specific fields
type MessageAnalytics = Pick<WhatsAppMessage, 'id' | 'timestamp' | 'status'>;

class MessageService {
  // Full message for details page
  async getMessage(id: string): Promise<WhatsAppMessage> {
    // return full message
    return {} as WhatsAppMessage;
  }

  // Lightweight list for inbox
  async listMessages(): Promise<MessageListItem[]> {
    // return only picked fields
    return [] as MessageListItem[];
  }

  // Minimal data for push notification
  async getNotification(id: string): Promise<MessageNotification> {
    return {} as MessageNotification;
  }
}
```

### When to Use Pick

✅ **Use Pick when:**
- Creating lighter versions of heavy types
- API responses with different detail levels
- Form data (pick fields user can edit)
- Summary views vs detail views
- Extracting specific properties for a function

❌ **Don't use Pick when:**
- Removing just one or two fields (use Omit instead)
- Need all fields (use original type)

---

## 📖 Utility Type #3: Omit\<T, K\>

### What is Omit?

**Omit\<T, K\>** excludes specific properties from type `T` by their keys `K`. It's the inverse of Pick.

### The Real-World Analogy

Think of **photo censoring**:

- **Original Photo (Interface):** Full image with faces
- **Censored Photo (Omit):** Same image but faces blurred out

You "remove" specific parts while keeping everything else.

### How Omit Works Internally

```typescript
// TypeScript's internal implementation:
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// Reads as:
// "Pick from T all keys except those in K"
// 
// Step by step:
// 1. keyof T → gets all keys of T
// 2. Exclude<keyof T, K> → removes K from all keys
// 3. Pick<T, remaining keys> → picks remaining keys
```

### Problem → Solution Flow

**Problem:**

```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  password: string;
  apiKey: string;
  createdAt: Date;
  updatedAt: Date;
}

// Send profile to frontend - exclude sensitive data
// Manual approach:
interface PublicProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// Problem: Must manually maintain this when UserProfile changes
```

**Solution with Omit:**

```typescript
// Automatically excludes sensitive fields
type PublicProfile = Omit<UserProfile, 'password' | 'apiKey'>;

// Safe, maintainable, auto-updates
```

### SDK Example: Logging Without Secrets

```typescript
interface SDKConfig {
  accessToken: string;      // 🔒 Sensitive
  phoneNumberId: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  baseURL: string;
  webhookSecret?: string;   // 🔒 Sensitive
}

// Safe config for logging (remove secrets)
type SafeConfig = Omit<SDKConfig, 'accessToken' | 'webhookSecret'>;

class Logger {
  logConfig(config: SDKConfig) {
    // Strip sensitive data before logging
    const safeConfig: SafeConfig = {
      phoneNumberId: config.phoneNumberId,
      apiVersion: config.apiVersion,
      timeout: config.timeout,
      retryAttempts: config.retryAttempts,
      baseURL: config.baseURL
    };
    
    console.log('SDK Config:', safeConfig);
    // ✅ No secrets in logs
  }
}
```

### SDK Example: Create vs Update Types

```typescript
interface WhatsAppTemplate {
  id: string;              // Generated by server
  name: string;
  language: string;
  category: string;
  body: string;
  createdAt: Date;         // Generated by server
  updatedAt: Date;         // Generated by server
}

// Creating template - omit server-generated fields
type CreateTemplateInput = Omit<WhatsAppTemplate, 'id' | 'createdAt' | 'updatedAt'>;

// User provides only these fields:
const newTemplate: CreateTemplateInput = {
  name: 'welcome_message',
  language: 'en',
  category: 'MARKETING',
  body: 'Welcome {{1}}!'
};
```

### Pick vs Omit: When to Use Which?

**Use Pick when:**
- Selecting FEW fields from MANY
- `Pick<User, 'id' | 'name'>` from 10 fields

**Use Omit when:**
- Excluding FEW fields from MANY
- `Omit<User, 'password'>` from 10 fields

**Rule of thumb:** Whichever requires less typing!

---

## 📖 Utility Type #4: Record\<K, V\>

### What is Record?

**Record\<K, V\>** creates an object type with keys of type `K` and values of type `V`.

### The Real-World Analogy

Think of a **dictionary/phone book**:

- **Keys (K):** Names (strings)
- **Values (V):** Phone numbers (strings)
- **Record:** Name → Phone Number mapping

### How Record Works Internally

```typescript
// TypeScript's internal implementation:
type Record<K extends keyof any, T> = {
  [P in K]: T;
};

// Reads as:
// "Create an object where each key P from K maps to type T"
```

### Problem → Solution Flow

**Problem:**

```typescript
// Store messages by their ID
const messages = {
  'msg-1': { id: 'msg-1', body: 'Hello', timestamp: 123 },
  'msg-2': { id: 'msg-2', body: 'Hi', timestamp: 456 }
};

// No type safety:
messages['msg-3'];  // undefined, but TypeScript doesn't help
messages[123];      // Can pass number, no error
```

**Solution with Record:**

```typescript
interface Message {
  id: string;
  body: string;
  timestamp: number;
}

// Type-safe message mapping
const messages: Record<string, Message> = {
  'msg-1': { id: 'msg-1', body: 'Hello', timestamp: 123 },
  'msg-2': { id: 'msg-2', body: 'Hi', timestamp: 456 }
};

// TypeScript ensures:
// ✅ Keys must be strings
// ✅ Values must be Message objects
```

### SDK Example: Caching Messages

```typescript
interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
}

class MessageCache {
  // Message ID → Message object
  private cache: Record<string, WhatsAppMessage> = {};

  set(id: string, message: WhatsAppMessage): void {
    this.cache[id] = message;
  }

  get(id: string): WhatsAppMessage | undefined {
    return this.cache[id];
  }

  has(id: string): boolean {
    return id in this.cache;
  }

  clear(): void {
    this.cache = {};
  }
}
```

### SDK Example: Status Code Handlers

```typescript
type HTTPStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

type StatusHandler = (response: any) => void;

// Map each status code to its handler
const statusHandlers: Record<HTTPStatusCode, StatusHandler> = {
  200: (response) => console.log('Success:', response),
  201: (response) => console.log('Created:', response),
  400: (response) => console.error('Bad Request:', response),
  401: (response) => console.error('Unauthorized:', response),
  403: (response) => console.error('Forbidden:', response),
  404: (response) => console.error('Not Found:', response),
  500: (response) => console.error('Server Error:', response),
};

// TypeScript ensures ALL status codes have handlers
```

### SDK Example: Environment-Specific Configs

```typescript
type Environment = 'development' | 'staging' | 'production';

interface EnvConfig {
  baseURL: string;
  timeout: number;
  debug: boolean;
}

// Each environment must have config
const configs: Record<Environment, EnvConfig> = {
  development: {
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    debug: true
  },
  staging: {
    baseURL: 'https://staging-api.example.com',
    timeout: 5000,
    debug: true
  },
  production: {
    baseURL: 'https://api.example.com',
    timeout: 3000,
    debug: false
  }
};

function getConfig(env: Environment): EnvConfig {
  return configs[env];  // Type-safe access
}
```

### When to Use Record

✅ **Use Record when:**
- Creating key-value mappings
- Caching/indexing by ID
- Configuration objects with known keys
- Lookup tables
- Enum-to-value mappings

❌ **Don't use Record when:**
- Object shape is known (use interface instead)
- Need optional properties (Record makes all required)
- Complex nested structures (use interface)

---

## 🔄 Combining Utility Types

The real power comes from combining multiple utility types:

### Example 1: Partial Pick

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  age: number;
  address: string;
}

// Pick only editable fields, then make them optional for updates
type UserUpdateInput = Partial<Pick<User, 'name' | 'email' | 'age' | 'address'>>;

// Equivalent to:
// {
//   name?: string;
//   email?: string;
//   age?: number;
//   address?: string;
// }
```

### Example 2: Record of Partials

```typescript
interface FormField {
  value: string;
  error: string;
  touched: boolean;
  valid: boolean;
}

// Each form field can be partially updated
type FormState = Record<string, Partial<FormField>>;

const formState: FormState = {
  username: { value: 'john', touched: true },
  email: { error: 'Invalid email' },
  password: { value: '', valid: false }
};
```

### Example 3: Omit with Pick

```typescript
interface APIResponse {
  data: any;
  status: number;
  headers: Record<string, string>;
  timestamp: number;
  requestId: string;
}

// Pick user-relevant fields, omit internal fields
type UserFacingResponse = Pick<Omit<APIResponse, 'requestId'>, 'data' | 'status'>;
```

---

## 🎯 SDK Integration: Real Production Example

Let's build a complete SDK configuration system using all utility types:

```typescript
// Base configuration interface
interface WhatsAppSDKConfig {
  // Required fields
  accessToken: string;
  phoneNumberId: string;
  
  // Optional fields with defaults
  apiVersion: string;
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  debug: boolean;
  
  // Sensitive
  webhookSecret?: string;
}

// User provides required fields + optional overrides
type UserConfig = Pick<WhatsAppSDKConfig, 'accessToken' | 'phoneNumberId'> 
  & Partial<Omit<WhatsAppSDKConfig, 'accessToken' | 'phoneNumberId'>>;

// Safe config for logging (no secrets)
type SafeConfig = Omit<WhatsAppSDKConfig, 'accessToken' | 'webhookSecret'>;

// Config updates (any field optional)
type ConfigUpdate = Partial<WhatsAppSDKConfig>;

// Environment-specific defaults
type ConfigDefaults = Record<'development' | 'production', Partial<WhatsAppSDKConfig>>;

class WhatsAppClient {
  private config: WhatsAppSDKConfig;

  constructor(userConfig: UserConfig) {
    // Merge user config with defaults
    this.config = this.buildConfig(userConfig);
    this.logConfig();
  }

  private buildConfig(userConfig: UserConfig): WhatsAppSDKConfig {
    const defaults: Partial<WhatsAppSDKConfig> = {
      apiVersion: 'v17.0',
      baseURL: 'https://graph.facebook.com',
      timeout: 5000,
      retryAttempts: 3,
      debug: false
    };

    return { ...defaults, ...userConfig } as WhatsAppSDKConfig;
  }

  // Update config partially
  updateConfig(updates: ConfigUpdate): void {
    this.config = { ...this.config, ...updates };
    console.log('Config updated');
  }

  // Log config without secrets
  private logConfig(): void {
    const safe: SafeConfig = {
      phoneNumberId: this.config.phoneNumberId,
      apiVersion: this.config.apiVersion,
      baseURL: this.config.baseURL,
      timeout: this.config.timeout,
      retryAttempts: this.config.retryAttempts,
      debug: this.config.debug
    };
    
    console.log('SDK initialized:', safe);
  }
}

// Usage:
const client = new WhatsAppClient({
  accessToken: 'EAAxxxxxxxx',
  phoneNumberId: '123456789',
  timeout: 10000  // Override default
});

client.updateConfig({ debug: true });
```

---

## ⚠️ Common Mistakes

### Mistake 1: Using Partial When Fields Are Required

```typescript
interface LoginCredentials {
  username: string;
  password: string;
}

// ❌ Wrong: Login needs both fields
function login(creds: Partial<LoginCredentials>) {
  // username might be undefined!
  console.log(creds.username.toLowerCase());  // Runtime error possible
}

// ✅ Correct: Keep required fields required
function login(creds: LoginCredentials) {
  console.log(creds.username.toLowerCase());  // Safe
}
```

### Mistake 2: Pick/Omit with Non-Existent Keys

```typescript
interface User {
  id: string;
  name: string;
}

// ❌ TypeScript error: 'email' doesn't exist in User
type Bad = Pick<User, 'email'>;

// ✅ Only pick existing keys
type Good = Pick<User, 'id' | 'name'>;
```

### Mistake 3: Record with Optional Values

```typescript
interface Message {
  id: string;
  body: string;
}

// Record makes all values required
const cache: Record<string, Message> = {};

// ❌ TypeScript error: Index signature is required
console.log(cache['missing-id'].body);  // Will crash

// ✅ Use optional access or check existence
console.log(cache['missing-id']?.body);
if ('missing-id' in cache) {
  console.log(cache['missing-id'].body);
}
```

### Mistake 4: Overusing Utility Types

```typescript
// ❌ Overcomplicated
type Strange = Partial<Pick<Omit<Record<string, User>, 'admin'>, 'id' | 'name'>>;

// ✅ Use interface if structure is clear
interface UserBasic {
  id?: string;
  name?: string;
}
```

---

## 🧠 Mental Models

### Partial = "All Optional Button"
Click it → all properties become optional

### Pick = "Photo Crop Tool"
Select the area you want → discard the rest

### Omit = "Eraser Tool"
Erase specific parts → keep everything else

### Record = "Dictionary/Phonebook"
Key → Value mapping with type safety

---

## 📝 Summary

| Utility Type | Purpose | Use Case |
|-------------|---------|----------|
| `Partial<T>` | Make all properties optional | Updates, overrides, partial data |
| `Pick<T, K>` | Select specific properties | Light versions, summaries |
| `Omit<T, K>` | Exclude specific properties | Remove sensitive data, create inputs |
| `Record<K, V>` | Create key-value map | Caching, lookups, config maps |

### Key Principles:

1. **DRY (Don't Repeat Yourself):** One source of truth
2. **Type Safety:** Compiler catches errors
3. **Maintainability:** Changes propagate automatically
4. **Readability:** Intent is clear from type names

---

## 🚀 Next Steps

1. Complete the exercises in EXERCISES.md
2. Study the examples in `examples/` folder
3. Tomorrow: More utility types (Required, Readonly, Exclude, Extract)
4. Build: SDK configuration and response handling system

---

**Remember:** Utility types are tools, not rules. Use them when they make code clearer and more maintainable. Don't force them everywhere!

Happy coding! 🎉
