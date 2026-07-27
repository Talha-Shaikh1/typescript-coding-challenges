# Day 17: Exercises - Utility Types Part 1

Complete all exercises to master `Partial<T>`, `Pick<T, K>`, `Omit<T, K>`, and `Record<K, V>`.

---

## 📋 Exercise 1: Configuration Update System (Partial)

**Difficulty:** ⭐⭐ Easy

**Scenario:** You're building a settings manager for our WhatsApp SDK. Users should be able to update individual settings without providing all values.

**Task:**

Create a configuration system where:
1. Define a `AppSettings` interface with at least 6 properties (mix of string, number, boolean)
2. Create an update function that accepts partial settings
3. Implement a `SettingsManager` class with:
   - Constructor that accepts full settings
   - `updateSettings()` method that accepts partial updates
   - `getSettings()` method that returns current settings

**Starter Code:** `starter-code/exercise-1.ts`

**Requirements:**
- Use `Partial<T>` for the update method
- Settings should merge correctly (new values override old)
- TypeScript should prevent invalid property names

**Example Usage:**
```typescript
const manager = new SettingsManager({
  apiTimeout: 5000,
  maxRetries: 3,
  enableLogging: true,
  cacheDuration: 60000,
  apiVersion: 'v17.0',
  debugMode: false
});

manager.updateSettings({ apiTimeout: 10000 }); // Only update timeout
manager.updateSettings({ enableLogging: false, debugMode: true }); // Update multiple
```

---

## 📋 Exercise 2: API Response Summaries (Pick)

**Difficulty:** ⭐⭐ Easy-Medium

**Scenario:** Your API returns full user objects, but different parts of your app need different subsets of user data.

**Task:**

1. Define a complete `User` interface with 8-10 properties:
   - Basic info (id, name, email)
   - Profile (avatar, bio, location)
   - Metadata (createdAt, updatedAt, lastLogin)
   - Settings (preferences, notifications)

2. Create specialized types using `Pick`:
   - `UserCard` - For user cards in lists (id, name, avatar)
   - `UserProfile` - For profile page (exclude metadata)
   - `UserSummary` - For notifications (id, name, avatar, lastLogin)
   - `UserAuth` - For authentication (id, email, lastLogin)

3. Create functions that return each specialized type

**Starter Code:** `starter-code/exercise-2.ts`

**Requirements:**
- Use `Pick<T, K>` for all specialized types
- Each function should have correct return type
- Demonstrate that TypeScript prevents accessing non-picked properties

---

## 📋 Exercise 3: Secure Data Logging (Omit)

**Difficulty:** ⭐⭐⭐ Medium

**Scenario:** You need to log SDK configurations and user data for debugging, but must exclude sensitive information.

**Task:**

1. Create a `DatabaseConfig` interface with:
   - Connection details (host, port, database)
   - Credentials (username, password, apiKey)
   - Options (timeout, poolSize, ssl)

2. Create a `UserAccount` interface with:
   - Personal data (id, name, email)
   - Sensitive data (password, creditCard, ssn)
   - Preferences (theme, language)

3. Use `Omit` to create safe versions:
   - `SafeDatabaseConfig` - Remove password and apiKey
   - `SafeUserAccount` - Remove password, creditCard, ssn

4. Create a `Logger` class with:
   - `logConfig(config: DatabaseConfig)` - logs safe version
   - `logUser(user: UserAccount)` - logs safe version
   - Both methods should strip sensitive data before logging

**Starter Code:** `starter-code/exercise-3.ts`

**Requirements:**
- Use `Omit<T, K>` to exclude sensitive fields
- Actual logging should never include sensitive data
- Create a helper function `sanitize()` for each type

---

## 📋 Exercise 4: Message Cache System (Record)

**Difficulty:** ⭐⭐⭐ Medium

**Scenario:** Build a caching layer for WhatsApp messages using message IDs as keys.

**Task:**

1. Define a `WhatsAppMessage` interface with:
   - id, from, to, body, timestamp
   - status ('sent' | 'delivered' | 'read')
   - type ('text' | 'image' | 'video' | 'document')

2. Create a `MessageCache` class that:
   - Stores messages using `Record<string, WhatsAppMessage>`
   - Methods:
     - `add(message: WhatsAppMessage): void`
     - `get(id: string): WhatsAppMessage | undefined`
     - `getMultiple(ids: string[]): WhatsAppMessage[]`
     - `remove(id: string): boolean`
     - `clear(): void`
     - `getByStatus(status: string): WhatsAppMessage[]`
     - `count(): number`

3. Create a `StatusCounter` using `Record` to count messages by status

**Starter Code:** `starter-code/exercise-4.ts`

**Requirements:**
- Use `Record<K, V>` for cache storage
- Handle non-existent keys gracefully
- Implement efficient lookup operations

---

## 📋 Exercise 5: SDK Client Builder (Combining Utilities)

**Difficulty:** ⭐⭐⭐⭐ Medium-Hard

**Scenario:** Build a flexible SDK client that uses all utility types together.

**Task:**

Create a complete SDK configuration and initialization system:

1. Define `SDKConfig` interface with:
   - Required: accessToken, phoneNumberId
   - Optional: apiVersion, baseURL, timeout, retryAttempts, debug
   - Sensitive: webhookSecret

2. Create specialized types:
   - `RequiredConfig` - Only required fields using `Pick`
   - `OptionalConfig` - Only optional fields using `Partial` + `Omit`
   - `UserProvidedConfig` - Required + Partial optional (what users pass)
   - `SafeConfig` - Config without sensitive fields using `Omit`
   - `ConfigDefaults` - Record mapping environment to default configs

3. Implement `SDKClient` class:
   - Constructor accepts `UserProvidedConfig`
   - Merges with defaults for current environment
   - `updateConfig(updates: Partial<SDKConfig>)` method
   - `getConfig(): SafeConfig` - returns non-sensitive config
   - `validateConfig(): boolean` - checks required fields exist

4. Create environment-specific defaults:
   - Development, Staging, Production environments
   - Each with different default values

**Starter Code:** `starter-code/exercise-5.ts`

**Requirements:**
- Combine `Partial`, `Pick`, `Omit`, and `Record`
- Type-safe config merging
- Sensitive data never exposed via getConfig()
- Environment detection and default application

**Example Usage:**
```typescript
const client = new SDKClient({
  accessToken: 'xxx',
  phoneNumberId: '123',
  debug: true  // Override default
});

client.updateConfig({ timeout: 10000 });
const safeConfig = client.getConfig(); // No sensitive data
```

---

## 🎯 Bonus Challenge: Generic Cache System

**Difficulty:** ⭐⭐⭐⭐⭐ Hard

**Scenario:** Build a reusable, generic cache that works with any data type.

**Task:**

Create a `GenericCache<T>` class that:
1. Uses generics from Day 15-16
2. Uses `Record` for storage
3. Supports TTL (time-to-live) for entries
4. Methods:
   - `set(key: string, value: T, ttl?: number): void`
   - `get(key: string): T | undefined`
   - `has(key: string): boolean`
   - `delete(key: string): boolean`
   - `clear(): void`
   - `keys(): string[]`
   - `values(): T[]`
   - `size(): number`
   - `cleanup(): number` - Remove expired entries

**Advanced Requirements:**
- Generic constraint: `T extends object` (only cache objects)
- Automatic cleanup of expired entries
- Type-safe throughout
- Support for partial updates using `Partial<T>`

**Example Usage:**
```typescript
interface Message {
  id: string;
  body: string;
  timestamp: number;
}

const cache = new GenericCache<Message>();
cache.set('msg-1', { id: 'msg-1', body: 'Hello', timestamp: Date.now() }, 60000);

const msg = cache.get('msg-1'); // Type is Message | undefined
```

**Hint:** Create a wrapper type for cache entries that includes expiry timestamp.

---

## 🔄 Cumulative Revision

These exercises also review concepts from previous days:

**From Day 15 (Generics):**
- Generic functions and classes
- Type parameters
- Reusable type-safe code

**From Day 16 (Generic Constraints):**
- `extends` keyword
- `keyof` operator
- Constrained generic types

**From Week 1-2:**
- Interfaces
- Classes
- Methods and properties
- Type annotations

---

## ✅ Checklist

Before moving to Day 18, ensure you can:

- [ ] Explain when to use `Partial<T>` vs full type
- [ ] Use `Pick<T, K>` to extract specific properties
- [ ] Use `Omit<T, K>` to exclude specific properties
- [ ] Use `Record<K, V>` for type-safe key-value maps
- [ ] Combine multiple utility types
- [ ] Apply utility types in SDK configuration
- [ ] Identify when NOT to use utility types

---

## 🎓 Solutions

Solutions will be provided after you attempt all exercises. Try to solve them yourself first!

**Tips:**
1. Start with Exercise 1 (easiest)
2. Read the LESSON.md for concepts
3. Check examples/ folder for patterns
4. Use TypeScript compiler to guide you
5. Test your code with different inputs

---

**Time Estimate:** 60-90 minutes for exercises 1-5, +30 minutes for bonus

Good luck! 🚀
