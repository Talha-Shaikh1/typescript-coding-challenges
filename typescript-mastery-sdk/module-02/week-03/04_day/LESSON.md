# Day 18: Utility Types - Part 2 (Deep Dive)

## 🎯 The Big Picture

Welcome to Day 18! Aaj hum aur advanced utility types seekhenge jo type transformations ko complete karte hain.

**Core Question:** How do we control mutability, enforce requirements, and work with union types?

**Answer:** Use Required, Readonly, Exclude, and Extract to transform types precisely.

---

## 🤔 The Fundamental Problem

### Problem: Missing Type Transformations

Yesterday we learned Partial, Pick, Omit, and Record. But we still need:

1. **Opposite of Partial** - Make all fields required
2. **Immutability** - Prevent accidental modifications
3. **Union filtering** - Separate error types from success types
4. **Union selection** - Extract only specific types from unions

Let's solve each problem!

---

## 📖 Utility Type #1: Required\<T\>

### What is Required?

**Required\<T\>** transforms all optional properties of type `T` to required (removes `?` from all properties). It's the opposite of `Partial<T>`.

### The Real-World Analogy

Think of a **job application form**:

- **Draft Form (Partial):** All fields optional, can save incomplete
- **Final Submission (Required):** ALL fields must be filled before submit

You can work on a draft with missing info, but submission requires everything.

### How Required Works Internally

```typescript
// TypeScript's internal implementation:
type Required<T> = {
  [P in keyof T]-?: T[P];
};

// The -? is the key:
// - removes the ? (optional modifier)
// Making the property required
```

### Problem → Solution Flow

**Problem:**

```typescript
interface AppConfig {
  apiVersion?: string;
  timeout?: number;
  retryAttempts?: number;
  debug?: boolean;
}

// During development, config can be partial
const devConfig: AppConfig = {
  debug: true  // Only set debug
};

// But in production, we NEED all fields set
function deployToProduction(config: AppConfig) {
  // config.timeout might be undefined!
  const timeout = config.timeout; // number | undefined
  // Unsafe! Could cause runtime errors
}
```

**Solution with Required:**

```typescript
// Production requires ALL fields
function deployToProduction(config: Required<AppConfig>) {
  const timeout = config.timeout; // number (definitely defined)
  // Safe! All fields guaranteed to exist
}

// TypeScript error if any field missing
deployToProduction({
  debug: true  // ❌ Error: Missing apiVersion, timeout, retryAttempts
});

deployToProduction({
  apiVersion: 'v17.0',
  timeout: 5000,
  retryAttempts: 3,
  debug: false  // ✅ All fields present
});
```

### SDK Example: Production Configuration Validation

```typescript
interface SDKConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion?: string;
  timeout?: number;
  retryAttempts?: number;
  baseURL?: string;
  debug?: boolean;
}

class WhatsAppSDK {
  private config: Required<SDKConfig>;

  constructor(userConfig: SDKConfig) {
    // Validate and fill in all required fields
    this.config = this.validateConfig(userConfig);
  }

  private validateConfig(config: SDKConfig): Required<SDKConfig> {
    // Merge with defaults to ensure all fields exist
    const fullConfig: Required<SDKConfig> = {
      accessToken: config.accessToken,
      phoneNumberId: config.phoneNumberId,
      apiVersion: config.apiVersion ?? 'v17.0',
      timeout: config.timeout ?? 5000,
      retryAttempts: config.retryAttempts ?? 3,
      baseURL: config.baseURL ?? 'https://graph.facebook.com',
      debug: config.debug ?? false
    };

    return fullConfig;
  }

  // Now all config access is safe - no undefined checks needed
  private getTimeout(): number {
    return this.config.timeout; // Always defined
  }

  private getApiVersion(): string {
    return this.config.apiVersion; // Always defined
  }
}

// Usage
const sdk = new WhatsAppSDK({
  accessToken: 'xxx',
  phoneNumberId: '123',
  timeout: 10000  // Other fields get defaults
});
```

### When to Use Required

✅ **Use Required when:**
- Validating configuration before use
- Production deployments need complete data
- Converting partial inputs to complete objects
- Database entities that must have all fields
- API responses that guarantee all fields

❌ **Don't use Required when:**
- Data is genuinely optional
- Update operations (use Partial)
- User input forms (not all fields filled yet)

---

## 📖 Utility Type #2: Readonly\<T\>

### What is Readonly?

**Readonly\<T\>** makes all properties of type `T` read-only. Once set, they cannot be reassigned.

### The Real-World Analogy

Think of a **published book**:

- **Draft (mutable):** You can edit, delete, rewrite
- **Published Book (readonly):** Text is fixed, can't be changed

Once published, the content is immutable. Same with readonly types.

### How Readonly Works Internally

```typescript
// TypeScript's internal implementation:
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Adds 'readonly' modifier to every property
```

### Problem → Solution Flow

**Problem:**

```typescript
interface Config {
  apiToken: string;
  endpoint: string;
  timeout: number;
}

const config: Config = {
  apiToken: 'secret_token',
  endpoint: 'https://api.example.com',
  timeout: 5000
};

// Somewhere in code, accidental mutation
function someFunction(cfg: Config) {
  cfg.timeout = 999; // Oops! Accidentally changed
  cfg.apiToken = 'wrong_token'; // Security risk!
}

someFunction(config);
console.log(config.timeout); // 999 - config was mutated!
```

**Solution with Readonly:**

```typescript
const config: Readonly<Config> = {
  apiToken: 'secret_token',
  endpoint: 'https://api.example.com',
  timeout: 5000
};

function someFunction(cfg: Readonly<Config>) {
  cfg.timeout = 999; // ✅ TypeScript Error! Cannot assign to readonly
  cfg.apiToken = 'wrong_token'; // ✅ TypeScript Error!
}

// Config is protected from mutations
```

### SDK Example: Immutable SDK Configuration

```typescript
interface SDKConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
  timeout: number;
}

class WhatsAppClient {
  // Config is readonly after initialization
  private readonly config: Readonly<SDKConfig>;

  constructor(config: SDKConfig) {
    // Set once during construction
    this.config = Object.freeze(config); // Runtime immutability
    console.log('Config locked:', this.config);
  }

  // Cannot accidentally modify config
  private someMethod() {
    // this.config.timeout = 999; // ✅ TypeScript Error!
    console.log('Timeout:', this.config.timeout);
  }

  // Return readonly config to external code
  getConfig(): Readonly<SDKConfig> {
    return this.config;
  }

  // If updates needed, create new instance
  withTimeout(newTimeout: number): WhatsAppClient {
    return new WhatsAppClient({
      ...this.config,
      timeout: newTimeout
    });
  }
}

const client = new WhatsAppClient({
  accessToken: 'xxx',
  phoneNumberId: '123',
  apiVersion: 'v17.0',
  timeout: 5000
});

const config = client.getConfig();
// config.timeout = 999; // ✅ Error: Cannot modify readonly

// To change, create new instance
const newClient = client.withTimeout(10000);
```

### When to Use Readonly

✅ **Use Readonly when:**
- Configuration shouldn't change after initialization
- Immutable data structures
- Preventing accidental mutations
- Functional programming patterns
- Sharing objects without risk of modification
- Constants and fixed values

❌ **Don't use Readonly when:**
- Data needs to be mutable
- State that changes over time
- Objects meant to be updated

### Important Note: Shallow Readonly

```typescript
interface User {
  name: string;
  address: {
    city: string;
    country: string;
  };
}

const user: Readonly<User> = {
  name: 'John',
  address: { city: 'NYC', country: 'USA' }
};

// user.name = 'Jane'; // ❌ Error: readonly
user.address.city = 'LA'; // ✅ No error! Nested object is mutable

// For deep readonly, use DeepReadonly utility (custom):
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};
```

---

## 📖 Utility Type #3: Exclude\<T, U\>

### What is Exclude?

**Exclude\<T, U\>** removes types from union type `T` that are assignable to `U`.

### The Real-World Analogy

Think of **filtering a playlist**:

- **Full Playlist (Union):** Rock, Pop, Jazz, Classical
- **Exclude Classical:** Rock | Pop | Jazz

You remove specific genres from the full list.

### How Exclude Works Internally

```typescript
// TypeScript's internal implementation:
type Exclude<T, U> = T extends U ? never : T;

// For each type in T:
// - If it extends U (matches), return never (exclude it)
// - Otherwise, keep it
```

### Problem → Solution Flow

**Problem:**

```typescript
type HTTPStatus = 200 | 201 | 400 | 401 | 404 | 500;

// Need to separate success from error codes
// Manual approach:
type SuccessStatus = 200 | 201;
type ErrorStatus = 400 | 401 | 404 | 500;

// Problem: If HTTPStatus changes, must update both manually
```

**Solution with Exclude:**

```typescript
type HTTPStatus = 200 | 201 | 400 | 401 | 404 | 500;

type SuccessStatus = 200 | 201;
type ErrorStatus = Exclude<HTTPStatus, SuccessStatus>;
// Result: 400 | 401 | 404 | 500

// If HTTPStatus changes, ErrorStatus auto-updates!
```

### SDK Example: Message Type Filtering

```typescript
type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact';

// Text-only messages (exclude media)
type MediaType = 'image' | 'video' | 'audio' | 'document';
type NonMediaType = Exclude<MessageType, MediaType>;
// Result: 'text' | 'location' | 'contact'

// Interactive messages (exclude basic types)
type BasicType = 'text' | 'image' | 'video' | 'audio';
type AdvancedType = Exclude<MessageType, BasicType>;
// Result: 'document' | 'location' | 'contact'

interface Message {
  id: string;
  type: MessageType;
  body: string;
}

// Function that only handles non-media messages
function processTextMessage(message: Message & { type: NonMediaType }) {
  console.log('Processing text-based message:', message.body);
  // TypeScript ensures type is NOT image/video/audio/document
}

// Function that only handles media messages
function processMediaMessage(message: Message & { type: MediaType }) {
  console.log('Processing media message');
  // TypeScript ensures type IS image/video/audio/document
}
```

### SDK Example: Status Code Handling

```typescript
type HTTPStatusCode = 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500 | 502 | 503;

type SuccessCode = 200 | 201 | 204;
type ErrorCode = Exclude<HTTPStatusCode, SuccessCode>;
// Result: 400 | 401 | 403 | 404 | 500 | 502 | 503

type ClientErrorCode = 400 | 401 | 403 | 404;
type ServerErrorCode = Exclude<ErrorCode, ClientErrorCode>;
// Result: 500 | 502 | 503

class APIClient {
  handleResponse(status: HTTPStatusCode, data: any) {
    if (this.isSuccess(status)) {
      this.handleSuccess(status, data);
    } else {
      this.handleError(status, data);
    }
  }

  private isSuccess(status: HTTPStatusCode): status is SuccessCode {
    return status === 200 || status === 201 || status === 204;
  }

  private handleSuccess(status: SuccessCode, data: any) {
    console.log(`Success ${status}:`, data);
  }

  private handleError(status: ErrorCode, data: any) {
    if (this.isClientError(status)) {
      console.error(`Client error ${status}:`, data);
    } else {
      console.error(`Server error ${status}:`, data);
    }
  }

  private isClientError(status: ErrorCode): status is ClientErrorCode {
    return status >= 400 && status < 500;
  }
}
```

### When to Use Exclude

✅ **Use Exclude when:**
- Filtering union types
- Removing specific types from a union
- Creating complementary type sets
- Status code categorization
- Event type filtering

❌ **Don't use Exclude when:**
- Working with object properties (use Omit)
- Need to select types (use Extract instead)

---

## 📖 Utility Type #4: Extract\<T, U\>

### What is Extract?

**Extract\<T, U\>** keeps only types from union type `T` that are assignable to `U`. Opposite of Exclude.

### The Real-World Analogy

Think of **selecting playlist genres**:

- **Full Playlist:** Rock, Pop, Jazz, Classical, Metal
- **Extract Rock genres:** Rock | Metal

You keep only the rock-related genres.

### How Extract Works Internally

```typescript
// TypeScript's internal implementation:
type Extract<T, U> = T extends U ? T : never;

// For each type in T:
// - If it extends U (matches), keep it
// - Otherwise, return never (exclude it)
```

### Problem → Solution Flow

**Problem:**

```typescript
type AllEvents = 
  | 'click' 
  | 'hover' 
  | 'scroll' 
  | 'keydown' 
  | 'keyup' 
  | 'submit' 
  | 'focus';

// Need only keyboard events
// Manual approach:
type KeyboardEvent = 'keydown' | 'keyup';

// Problem: Easy to miss events, no sync with AllEvents
```

**Solution with Extract:**

```typescript
type AllEvents = 
  | 'click' 
  | 'hover' 
  | 'scroll' 
  | 'keydown' 
  | 'keyup' 
  | 'submit' 
  | 'focus';

// Extract events that include 'key'
type KeyboardEvent = Extract<AllEvents, `key${string}`>;
// Result: 'keydown' | 'keyup'

// If AllEvents adds 'keypress', KeyboardEvent auto-includes it!
```

### SDK Example: Message Type Selection

```typescript
type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'location' | 'contact';

// Extract only media types
type MediaType = Extract<MessageType, 'image' | 'video' | 'audio' | 'document'>;
// Result: 'image' | 'video' | 'audio' | 'document'

// Extract only visual media
type VisualMedia = Extract<MessageType, 'image' | 'video'>;
// Result: 'image' | 'video'

interface Message<T extends MessageType = MessageType> {
  id: string;
  type: T;
  timestamp: number;
}

interface MediaMessage extends Message<MediaType> {
  mediaUrl: string;
  mediaSize: number;
  mimeType: string;
}

interface TextMessage extends Message<'text'> {
  body: string;
}

// Function that only accepts media messages
function downloadMedia(message: MediaMessage) {
  console.log(`Downloading ${message.type} from ${message.mediaUrl}`);
  // TypeScript ensures type is image/video/audio/document
}

// Function that only accepts visual media
function generateThumbnail(message: Message<VisualMedia>) {
  console.log(`Generating thumbnail for ${message.type}`);
  // TypeScript ensures type is image OR video only
}
```

### SDK Example: Event Type Selection

```typescript
type SDKEvent =
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'message.failed'
  | 'webhook.received'
  | 'webhook.failed'
  | 'auth.success'
  | 'auth.failed';

// Extract only message events
type MessageEvent = Extract<SDKEvent, `message.${string}`>;
// Result: 'message.sent' | 'message.delivered' | 'message.read' | 'message.failed'

// Extract only webhook events
type WebhookEvent = Extract<SDKEvent, `webhook.${string}`>;
// Result: 'webhook.received' | 'webhook.failed'

// Extract only failure events
type FailureEvent = Extract<SDKEvent, `${string}.failed`>;
// Result: 'message.failed' | 'webhook.failed' | 'auth.failed'

type EventHandler<T extends SDKEvent = SDKEvent> = (event: T, data: any) => void;

class EventBus {
  private handlers: Map<SDKEvent, EventHandler[]> = new Map();

  // Register handler for specific event type category
  onMessage(handler: EventHandler<MessageEvent>) {
    // Only message events allowed
  }

  onWebhook(handler: EventHandler<WebhookEvent>) {
    // Only webhook events allowed
  }

  onFailure(handler: EventHandler<FailureEvent>) {
    // Only failure events allowed
  }
}
```

### When to Use Extract

✅ **Use Extract when:**
- Selecting specific types from unions
- Creating type categories
- Event type filtering
- Pattern matching on string literals
- Type narrowing

❌ **Don't use Extract when:**
- Working with object properties (use Pick)
- Need to remove types (use Exclude instead)

---

## 🔄 Combining Utility Types

The real power comes from combining Day 17 and Day 18 utilities:

### Example 1: Required + Readonly

```typescript
interface Config {
  apiKey?: string;
  timeout?: number;
  debug?: boolean;
}

// All fields required AND immutable
type FinalConfig = Readonly<Required<Config>>;

const config: FinalConfig = {
  apiKey: 'xxx',
  timeout: 5000,
  debug: false
};

// config.timeout = 999; // ❌ Error: readonly
```

### Example 2: Pick + Required

```typescript
interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
}

// Pick specific fields and make them required
type RequiredContactInfo = Required<Pick<User, 'email' | 'phone'>>;
// Result: { email: string; phone: string; }
```

### Example 3: Omit + Readonly

```typescript
interface Sensitive {
  id: string;
  password: string;
  apiKey: string;
  data: any;
}

// Remove sensitive fields and make readonly
type SafeReadonly = Readonly<Omit<Sensitive, 'password' | 'apiKey'>>;
```

### Example 4: Exclude + Extract

```typescript
type Status = 'draft' | 'pending' | 'approved' | 'rejected' | 'archived';

type ActiveStatus = Exclude<Status, 'archived'>;
// 'draft' | 'pending' | 'approved' | 'rejected'

type FinalStatus = Extract<ActiveStatus, 'approved' | 'rejected'>;
// 'approved' | 'rejected'
```

---

## 🎯 SDK Integration: Complete Example

```typescript
// Base configuration with optional fields
interface SDKConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion?: string;
  timeout?: number;
  retryAttempts?: number;
  baseURL?: string;
  webhookSecret?: string;
  debug?: boolean;
}

// Status codes
type HTTPStatus = 200 | 201 | 400 | 401 | 403 | 404 | 500 | 502;
type SuccessStatus = Extract<HTTPStatus, 200 | 201>;
type ErrorStatus = Exclude<HTTPStatus, SuccessStatus>;

// Message types
type MessageType = 'text' | 'image' | 'video' | 'audio' | 'document';
type MediaType = Exclude<MessageType, 'text'>;

class WhatsAppSDK {
  // Config is required and readonly after initialization
  private readonly config: Readonly<Required<SDKConfig>>;

  constructor(userConfig: SDKConfig) {
    // Ensure all fields are filled
    this.config = this.buildCompleteConfig(userConfig);
    
    // Freeze to prevent runtime mutations
    Object.freeze(this.config);
  }

  private buildCompleteConfig(config: SDKConfig): Required<SDKConfig> {
    return {
      accessToken: config.accessToken,
      phoneNumberId: config.phoneNumberId,
      apiVersion: config.apiVersion ?? 'v17.0',
      timeout: config.timeout ?? 5000,
      retryAttempts: config.retryAttempts ?? 3,
      baseURL: config.baseURL ?? 'https://graph.facebook.com',
      webhookSecret: config.webhookSecret ?? undefined!,
      debug: config.debug ?? false
    };
  }

  // Return readonly config (safe to expose)
  getConfig(): Readonly<Omit<Required<SDKConfig>, 'accessToken' | 'webhookSecret'>> {
    const { accessToken, webhookSecret, ...safe } = this.config;
    return safe;
  }

  async sendMessage(type: MessageType, data: any): Promise<void> {
    if (this.isMediaType(type)) {
      await this.sendMediaMessage(type, data);
    } else {
      await this.sendTextMessage(data);
    }
  }

  private isMediaType(type: MessageType): type is MediaType {
    return type !== 'text';
  }

  private async sendMediaMessage(type: MediaType, data: any): Promise<void> {
    console.log(`Sending ${type} message`);
  }

  private async sendTextMessage(data: any): Promise<void> {
    console.log('Sending text message');
  }

  handleResponse(status: HTTPStatus, data: any): void {
    if (this.isSuccess(status)) {
      this.handleSuccess(status, data);
    } else {
      this.handleError(status, data);
    }
  }

  private isSuccess(status: HTTPStatus): status is SuccessStatus {
    return status === 200 || status === 201;
  }

  private handleSuccess(status: SuccessStatus, data: any): void {
    console.log(`Success ${status}`);
  }

  private handleError(status: ErrorStatus, data: any): void {
    console.error(`Error ${status}`);
  }
}
```

---

## ⚠️ Common Mistakes

### Mistake 1: Confusing Required with Non-Nullable

```typescript
interface Config {
  timeout?: number | null;
}

type RequiredConfig = Required<Config>;
// Result: { timeout: number | null }
// Still allows null! Required only removes ?, not null

// To remove null, use NonNullable:
type RequiredNonNull = Required<{ timeout: NonNullable<Config['timeout']> }>;
// Result: { timeout: number }
```

### Mistake 2: Assuming Readonly is Deep

```typescript
interface Config {
  settings: {
    timeout: number;
  };
}

const config: Readonly<Config> = {
  settings: { timeout: 5000 }
};

// config.settings = {}; // ❌ Error
config.settings.timeout = 999; // ✅ No error! Nested is mutable
```

### Mistake 3: Using Exclude on Object Properties

```typescript
interface User {
  id: string;
  password: string;
}

// ❌ Wrong: Exclude works on unions, not object properties
type Bad = Exclude<User, 'password'>; // Doesn't work

// ✅ Correct: Use Omit for object properties
type Good = Omit<User, 'password'>;
```

---

## 🧠 Mental Models

### Required = "Fill All Blanks"
Every optional field becomes required - like a mandatory form submission.

### Readonly = "Lock After Set"
Once set, can't change - like a published document.

### Exclude = "Remove from List"
Filter out unwanted types from a union - like removing genres from playlist.

### Extract = "Select from List"
Keep only wanted types from a union - like filtering playlist by genre.

---

## 📝 Summary

| Utility Type | Purpose | Works On | Use Case |
|-------------|---------|----------|----------|
| `Required<T>` | Make all properties required | Object types | Production validation, complete configs |
| `Readonly<T>` | Make all properties immutable | Object types | Prevent mutations, immutable data |
| `Exclude<T, U>` | Remove types from union | Union types | Filter out unwanted types |
| `Extract<T, U>` | Select types from union | Union types | Keep only wanted types |

### Combined with Day 17:

| Day 17 | Day 18 | Combination |
|--------|--------|-------------|
| Partial | Required | Toggle optionality |
| Pick/Omit | Extract/Exclude | Object props vs Union types |
| Record | Readonly | Maps vs Immutability |

---

## 🚀 Next Steps

1. Complete the exercises in EXERCISES.md
2. Study the examples in `examples/` folder
3. Tomorrow: Mapped Types (build your own utility types!)

---

**Remember:** These utilities give you complete control over type transformations. Use them to make your code safer, more maintainable, and more expressive!

Happy coding! 🎉
