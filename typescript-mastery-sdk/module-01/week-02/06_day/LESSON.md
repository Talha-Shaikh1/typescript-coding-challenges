# 📘 Day 13: Declaration Files & Type Definitions

**Module:** Fundamentals - Week 2  
**Duration:** 1-2 hours  
**Goal:** Samajhna ke .d.ts files kya hain aur TypeScript consumers ko types kaise milti hain

---

## 🤔 The Problem: Lost Type Information

### ❌ What Happens During Compilation:

```typescript
// Your TypeScript code (src/index.ts):
export interface Message {
  id: string;
  to: string;
  text: string;
}

export class WhatsAppClient {
  constructor(private apiKey: string) {}
  
  async sendMessage(message: Message): Promise<void> {
    // Implementation
  }
}
```

**After compilation:**

```javascript
// Compiled JavaScript (dist/index.js):
export class WhatsAppClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  
  async sendMessage(message) {
    // Implementation
  }
}
```

**Problem:** All type information is GONE!
- ❌ No `Message` interface
- ❌ No type annotations (`: string`, `: Promise<void>`)
- ❌ Users importing your SDK get no TypeScript support

---

## 💡 The Solution: Declaration Files (.d.ts)

**Declaration files = Type information for compiled JavaScript**

```typescript
// Generated declaration file (dist/index.d.ts):
export interface Message {
  id: string;
  to: string;
  text: string;
}

export declare class WhatsAppClient {
  private apiKey;
  constructor(apiKey: string);
  sendMessage(message: Message): Promise<void>;
}
```

**Now users get:**
- ✅ Full type checking
- ✅ Autocomplete in IDE
- ✅ Type-safe imports
- ✅ Documentation hints

---

## 🎯 What Are .d.ts Files?

### Definition:

**Declaration files contain ONLY type information, no implementation.**

```typescript
// .d.ts file contains:
✅ Interfaces
✅ Type aliases
✅ Class signatures (no implementation)
✅ Function signatures (no body)
✅ Const declarations (no values)

❌ NOT runtime code
❌ NOT executed
❌ NOT imported at runtime
```

### Real-World Analogy:

Think of declaration files like a menu at a restaurant:
- **Menu (.d.ts):** Shows what's available, ingredients, descriptions
- **Kitchen (JavaScript):** Actually makes the food

You read the menu to know what you can order, but the menu itself isn't the food!

---

## 📝 How Declaration Files Work

### Step 1: TypeScript Compiler Generates Them

```bash
# tsconfig.json
{
  "compilerOptions": {
    "declaration": true
  }
}

# Compile
tsc
```

### Step 2: Output Structure

```
dist/
├── index.js       ← Executable JavaScript
└── index.d.ts     ← Type definitions
```

### Step 3: TypeScript Reads Them

When someone imports your SDK:

```typescript
// User's code
import { WhatsAppClient } from '@whatsapp-sdk/core';

// TypeScript reads dist/index.d.ts
// Gets type information
// Provides autocomplete and checking
```

---

## 🔍 Anatomy of a Declaration File

### Example 1: Interface

```typescript
// Source (src/types.ts):
export interface Message {
  id: string;
  to: string;
  text: string;
  timestamp: number;
}

// Declaration (dist/types.d.ts):
export interface Message {
  id: string;
  to: string;
  text: string;
  timestamp: number;
}

// Interfaces stay exactly the same!
```

---

### Example 2: Class

```typescript
// Source (src/client.ts):
export class WhatsAppClient {
  private apiKey: string;
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  async sendMessage(to: string, text: string): Promise<void> {
    console.log(`Sending ${text} to ${to}`);
  }
}

// Declaration (dist/client.d.ts):
export declare class WhatsAppClient {
  private apiKey;
  
  constructor(apiKey: string);
  
  sendMessage(to: string, text: string): Promise<void>;
}

// Note:
// - "declare" keyword added
// - Implementation removed
// - Signatures remain
```

---

### Example 3: Function

```typescript
// Source (src/utils.ts):
export function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

// Declaration (dist/utils.d.ts):
export declare function validatePhone(phone: string): boolean;

// Function body removed, signature stays
```

---

### Example 4: Type Alias

```typescript
// Source (src/types.ts):
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

// Declaration (dist/types.d.ts):
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

// Type aliases stay the same
```

---

## 🎯 Why Declaration Files Matter

### For SDK Authors (You):

**Without .d.ts:**
```javascript
// Users import your SDK
import { WhatsAppClient } from '@whatsapp-sdk/core';

// No autocomplete
// No type checking
// No documentation
// Bad developer experience
```

**With .d.ts:**
```typescript
// Users import your SDK
import { WhatsAppClient } from '@whatsapp-sdk/core';

// ✅ Autocomplete shows available methods
// ✅ Type checking validates arguments
// ✅ Documentation appears in hover
// ✅ Professional developer experience
```

---

### For npm Packages:

```json
// package.json
{
  "name": "@whatsapp-sdk/core",
  "main": "./dist/index.js",      // JavaScript for runtime
  "types": "./dist/index.d.ts"    // Types for TypeScript
}
```

**How it works:**

1. User installs: `npm install @whatsapp-sdk/core`
2. User imports: `import { WhatsAppClient } from '@whatsapp-sdk/core'`
3. Runtime uses: `dist/index.js` (JavaScript)
4. TypeScript uses: `dist/index.d.ts` (types)

---

## 📦 Generated vs Manual Declaration Files

### Option 1: Generated (Recommended)

```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}
```

**Pros:**
- ✅ Automatic
- ✅ Always in sync with code
- ✅ Less maintenance

**When to use:** Almost always!

---

### Option 2: Manual (Rare Cases)

Sometimes you write .d.ts files by hand:

```typescript
// manual.d.ts
declare module 'legacy-library' {
  export function doSomething(): void;
}
```

**When to use:**
- Adding types to JavaScript libraries (without source)
- Third-party libraries without types
- Complex global type augmentation

---

## 🔧 Declaration Maps (.d.ts.map)

### The Problem:

```typescript
// User clicks "Go to Definition" on WhatsAppClient
// Without declaration maps: Goes to dist/index.d.ts (generated file)
// With declaration maps: Goes to src/index.ts (your actual code!)
```

### The Solution:

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true  // Enable "Go to Definition" to source
  }
}
```

**Output:**
```
dist/
├── index.js
├── index.d.ts
└── index.d.ts.map  ← Maps .d.ts back to source .ts
```

**Benefits:**
- ✅ Users can read your actual source code
- ✅ Better debugging experience
- ✅ "Go to Definition" shows implementation

---

## 🎨 Type-Only Exports

### The Pattern:

```typescript
// Export value AND type
export { MessageService } from './services';

// Export ONLY type (no runtime code)
export type { Message, ClientConfig } from './types';
```

**Why use `export type`?**

```typescript
// Without type-only export:
export { Message } from './types';
// TypeScript might bundle Message interface at runtime (unnecessary)

// With type-only export:
export type { Message } from './types';
// Explicitly: "This is compile-time only, don't include at runtime"
```

**Benefits:**
- ✅ Smaller bundles (types not included in JavaScript)
- ✅ Prevents circular dependency issues
- ✅ Explicit intent

---

## 📚 Declaration Merging

### Concept: Multiple declarations combine into one

```typescript
// File 1:
interface User {
  id: string;
}

// File 2:
interface User {
  name: string;
}

// Result: TypeScript merges them!
interface User {
  id: string;
  name: string;
}
```

**Common use case:** Extending third-party types

```typescript
// Your SDK allows plugins
declare module '@whatsapp-sdk/core' {
  interface WhatsAppClient {
    customPlugin?: any;  // Added by plugin
  }
}
```

---

## 🚨 Common Declaration File Issues

### Issue 1: Missing Types in package.json

```json
// ❌ BAD: No types field
{
  "name": "@whatsapp-sdk/core",
  "main": "./dist/index.js"
}

// ✅ GOOD: Types field present
{
  "name": "@whatsapp-sdk/core",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

---

### Issue 2: .d.ts Not Generated

```json
// ❌ BAD: declaration is false
{
  "compilerOptions": {
    "declaration": false
  }
}

// ✅ GOOD: declaration is true
{
  "compilerOptions": {
    "declaration": true
  }
}
```

---

### Issue 3: Internal Types Leaked

```typescript
// ❌ BAD: Exposes internal types
// dist/index.d.ts
export { HttpClient } from './internal/http';  // Internal!

// ✅ GOOD: Only public types
// dist/index.d.ts
export { WhatsAppClient } from './client';
export type { Message } from './types';
// HttpClient stays internal
```

---

## 💡 Best Practices

### 1. Always Generate Declaration Files

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  }
}
```

### 2. Use Type-Only Exports

```typescript
export type { Message, ClientConfig } from './types';
```

### 3. Point to Types in package.json

```json
{
  "types": "./dist/index.d.ts"
}
```

### 4. Don't Commit Generated .d.ts Files

```
# .gitignore
dist/
*.d.ts
*.d.ts.map
```

Generate them during build, don't version control them.

### 5. Test Your Types

```typescript
// Create a test file that imports your SDK
import { WhatsAppClient, type Message } from '@whatsapp-sdk/core';

// Verify autocomplete works
const client = new WhatsAppClient({ apiKey: 'test' });
// Should show sendMessage, etc.
```

---

## 📝 Key Takeaways

✅ **Declaration files = Type information for JavaScript**  
✅ **Generated automatically with `declaration: true`**  
✅ **Essential for npm packages**  
✅ **Enable autocomplete and type checking for users**  
✅ **Use `export type` for type-only exports**  
✅ **Include `types` field in package.json**  

**Most Important:** Declaration files are what make your SDK TypeScript-friendly! 🚀

---

## 🎓 Practice Questions

Before exercises:

1. **Why** do we need .d.ts files?
2. **What** happens to types during JavaScript compilation?
3. **How** do users get type information from your SDK?
4. **When** should you write .d.ts files manually?
5. **Where** does TypeScript look for declaration files?

**Next:** Complete exercises to master declaration files! 💪
