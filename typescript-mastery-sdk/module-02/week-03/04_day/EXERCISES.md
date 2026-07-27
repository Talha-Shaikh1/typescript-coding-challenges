# Day 18: Exercises - Utility Types Part 2

Complete all exercises to master `Required<T>`, `Readonly<T>`, `Exclude<T, U>`, and `Extract<T, U>`.

---

## 📋 Exercise 1: Production Config Validator (Required)

**Difficulty:** ⭐⭐ Easy-Medium

**Scenario:** Your SDK allows optional config during development, but production deployments require ALL fields to be explicitly set.

**Task:**

Create a configuration validation system where:
1. Define `AppConfig` interface with required and optional fields
2. Create `ProductionConfig` type using `Required<T>`
3. Implement `ConfigValidator` class that:
   - Accepts partial config for development
   - Validates and converts to production config
   - Throws errors if required fields missing in production mode
4. Create `validateForProduction()` function

**Starter Code:** `starter-code/exercise-1.ts`

**Requirements:**
- Use `Required<T>` for production config type
- All optional fields must have explicit values in production
- Development mode allows partial config
- Clear error messages for missing fields

**Example Usage:**
```typescript
const devConfig: AppConfig = {
  apiKey: 'xxx',
  debug: true
  // timeout and retries optional in dev
};

const prodConfig: Required<AppConfig> = validateForProduction({
  apiKey: 'xxx',
  timeout: 5000,
  retries: 3,
  debug: false
  // Must provide ALL fields
});
```

---

## 📋 Exercise 2: Immutable State Manager (Readonly)

**Difficulty:** ⭐⭐⭐ Medium

**Scenario:** Build a state management system where state is immutable once set. Updates create new state objects instead of mutating existing ones.

**Task:**

1. Define `AppState` interface with multiple properties
2. Create `StateManager` class using `Readonly<T>`
3. Implement methods:
   - `getState(): Readonly<AppState>` - returns current state
   - `setState(newState: AppState): void` - replaces entire state
   - `updateState(partial: Partial<AppState>): void` - merges partial updates
   - `subscribe(listener: (state: Readonly<AppState>) => void): () => void`
4. Ensure state cannot be mutated from outside

**Starter Code:** `starter-code/exercise-2.ts`

**Requirements:**
- State should be readonly from external access
- Updates create new state objects (immutable pattern)
- Subscribers notified on state changes
- Type-safe state access

**Example Usage:**
```typescript
const manager = new StateManager({
  user: null,
  isAuthenticated: false,
  theme: 'light'
});

const state = manager.getState();
// state.user = {...}; // TypeScript error - readonly!

manager.updateState({ isAuthenticated: true });
```

---

## 📋 Exercise 3: Status Code Handler (Exclude/Extract)

**Difficulty:** ⭐⭐⭐ Medium

**Scenario:** Your API returns different HTTP status codes. You need to separate success codes from error codes and handle them differently.

**Task:**

1. Define `HTTPStatusCode` union with 10+ status codes
2. Use `Extract` to create `SuccessCode` type (2xx codes)
3. Use `Exclude` to create `ErrorCode` type (non-2xx codes)
4. Further use `Extract` to separate:
   - `ClientErrorCode` (4xx codes)
   - `ServerErrorCode` (5xx codes)
5. Create `ResponseHandler` class with type-safe handlers for each category

**Starter Code:** `starter-code/exercise-3.ts`

**Requirements:**
- Use `Extract` and `Exclude` for type separation
- Type guards to narrow status codes
- Different handling logic for each category
- TypeScript ensures exhaustive handling

**Example Usage:**
```typescript
const handler = new ResponseHandler();

handler.handle(200, { data: 'success' });  // Success handler
handler.handle(404, { error: 'not found' }); // Client error handler
handler.handle(500, { error: 'server error' }); // Server error handler
```

---

## 📋 Exercise 4: Message Type Router (Extract/Exclude)

**Difficulty:** ⭐⭐⭐ Medium-Hard

**Scenario:** WhatsApp SDK receives different message types. You need to route messages to appropriate handlers based on type.

**Task:**

1. Define `MessageType` union with 8+ message types
2. Use `Extract` to create type categories:
   - `MediaType` - image, video, audio, document
   - `InteractiveType` - buttons, list, template
   - `BasicType` - text, location, contact
3. Use `Exclude` to create complementary types
4. Create `MessageRouter` class that:
   - Routes messages to correct handlers based on type
   - Type-safe handler registration
   - Validates handler coverage

**Starter Code:** `starter-code/exercise-4.ts`

**Requirements:**
- Use `Extract` and `Exclude` for categorization
- Type-safe message routing
- Each category has specific handler
- TypeScript ensures all types handled

**Example Usage:**
```typescript
const router = new MessageRouter();

router.onMedia((msg) => {
  console.log('Media:', msg.type); // Type is MediaType
});

router.onInteractive((msg) => {
  console.log('Interactive:', msg.type); // Type is InteractiveType
});

router.route({ type: 'image', ... }); // Routes to media handler
```

---

## 📋 Exercise 5: Complete SDK Config System (Combining All)

**Difficulty:** ⭐⭐⭐⭐ Hard

**Scenario:** Build a production-grade SDK configuration system that combines all utility types from Day 17 and Day 18.

**Task:**

Create a complete configuration system that uses:
1. **Partial** - User-provided optional overrides
2. **Pick** - Extract environment-specific fields
3. **Omit** - Remove sensitive data for logging
4. **Record** - Map environments to configs
5. **Required** - Ensure production config is complete
6. **Readonly** - Make config immutable after init
7. **Exclude** - Filter invalid config keys
8. **Extract** - Select valid config keys

**Implementation Requirements:**

1. Define comprehensive `SDKConfig` interface
2. Create environment system (dev, staging, prod)
3. Different validation rules per environment
4. Type-safe config access and updates
5. Immutable after initialization
6. Safe logging without secrets
7. Config merging and validation

**Starter Code:** `starter-code/exercise-5.ts`

**Advanced Requirements:**
- Use at least 6 different utility types
- Type-safe environment detection
- Runtime and compile-time validation
- Immutable patterns
- Secret management

**Example Usage:**
```typescript
const sdk = new SDK({
  accessToken: 'xxx',
  phoneNumberId: '123',
  timeout: 10000
}, 'production');

const config = sdk.getConfig(); // Readonly, no secrets
// config.timeout = 999; // Error: readonly

sdk.validateConfig(); // Required<T> validation in prod
```

---

## 🎯 Bonus Challenge: Deep Utility Types

**Difficulty:** ⭐⭐⭐⭐⭐ Very Hard

**Scenario:** Create custom deep versions of utility types that work recursively on nested objects.

**Task:**

Implement the following custom utility types:

1. **DeepReadonly\<T\>** - Makes all properties (including nested) readonly
2. **DeepRequired\<T\>** - Makes all properties (including nested) required
3. **DeepPartial\<T\>** - Makes all properties (including nested) optional
4. **DeepPick\<T, K\>** - Pick with dot notation support (e.g., 'user.address.city')
5. **DeepOmit\<T, K\>** - Omit with dot notation support

**Requirements:**
- Work recursively on nested objects
- Preserve array types
- Handle union types correctly
- Type-safe dot notation (bonus)

**Example Usage:**
```typescript
interface Config {
  user: {
    profile: {
      name: string;
      age?: number;
    };
    settings: {
      theme: string;
    };
  };
}

type DeepReadonlyConfig = DeepReadonly<Config>;
// All nested properties are readonly

type DeepRequiredConfig = DeepRequired<Config>;
// user.profile.age becomes required
```

**Hint:** Use recursive mapped types and conditional types.

---

## 🔄 Cumulative Revision

These exercises also review concepts from previous days:

**From Day 17 (Utility Types Part 1):**
- Partial, Pick, Omit, Record

**From Day 16 (Generic Constraints):**
- extends keyword
- keyof operator

**From Day 15 (Generics):**
- Generic functions and classes

**From Week 1-2:**
- Interfaces, classes, type annotations

---

## ✅ Checklist

Before moving to Day 19, ensure you can:

- [ ] Explain when to use `Required<T>` vs `Partial<T>`
- [ ] Use `Readonly<T>` for immutable data structures
- [ ] Use `Exclude<T, U>` to filter union types
- [ ] Use `Extract<T, U>` to select from union types
- [ ] Combine multiple utility types effectively
- [ ] Understand shallow vs deep utility types
- [ ] Apply utility types in SDK configuration
- [ ] Create type-safe state management systems

---

## 🎓 Solutions

Solutions will be provided after you attempt all exercises. Try to solve them yourself first!

**Tips:**
1. Start with Exercise 1 (easiest)
2. Review LESSON.md for concepts
3. Check examples/ folder for patterns
4. Use TypeScript compiler errors as guides
5. Test edge cases (null, undefined, nested objects)

---

## 🧪 Testing Your Solutions

For each exercise, test:
1. **Type safety** - Try to violate types (should error)
2. **Functionality** - Code works as expected
3. **Edge cases** - null, undefined, empty values
4. **Immutability** - readonly properties can't change

---

**Time Estimate:** 60-90 minutes for exercises 1-5, +45 minutes for bonus

Good luck! 🚀

---

## 💡 Key Concepts Review

| Concept | When to Use | Day 17 Equivalent |
|---------|-------------|-------------------|
| Required | Make fields required | Opposite of Partial |
| Readonly | Prevent mutations | No direct opposite |
| Exclude | Remove from union | Like Omit but for unions |
| Extract | Select from union | Like Pick but for unions |

**Remember:**
- Required ↔ Partial (object properties)
- Extract ↔ Exclude (union types)
- Readonly → Immutability
- Pick/Omit → Object properties
- Extract/Exclude → Union types
