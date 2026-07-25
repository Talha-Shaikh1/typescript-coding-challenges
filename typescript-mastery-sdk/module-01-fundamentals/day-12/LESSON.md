# 📘 Day 12: Professional Library Project Structure

**Module:** Fundamentals - Week 2  
**Duration:** 1.5-2 hours  
**Goal:** Samajhna ke production library ko kaise organize karte hain - folder structure, separation of concerns, aur maintainability

---

## 🤔 The Problem: Chaotic Project Structure

### ❌ Bad Organization (Common Mistake):

```
my-sdk/
├── everything.ts       (500 lines - client, services, utils, everything!)
├── stuff.ts            (What's in here?)
├── helpers.ts          (Which helpers?)
├── misc.ts             (Miscellaneous... really?)
└── index.ts
```

**Problems:**
1. **Hard to find things** - Where's the message service?
2. **No clear responsibility** - What does `helpers.ts` do?
3. **Difficult to maintain** - 500-line files are overwhelming
4. **Impossible to test** - Everything is coupled
5. **Poor developer experience** - New contributors are lost

**Real-World Analogy:**

Imagine a library where all books are in one big pile:
- Fiction, non-fiction, textbooks - all mixed
- No categories, no shelves, no organization
- Want to find a cookbook? Good luck searching the pile!

**This is what bad code organization feels like.**

---

## 💡 The Solution: Structured Organization

**Good structure = Clear mental model**

Think of a well-organized library:
- **Clear sections** (Fiction, Science, History)
- **Subsections** (Science → Biology, Physics, Chemistry)
- **Consistent placement** (Always know where to look)
- **Easy to navigate** (Can find anything in seconds)

**Same applies to code!**

---

## 🏗️ Professional SDK Structure

### The Standard Pattern:

```
whatsapp-sdk/
├── src/                    # All source code
│   ├── client/             # Main client class
│   │   ├── WhatsAppClient.ts
│   │   └── index.ts
│   ├── services/           # Business logic
│   │   ├── messages/
│   │   │   ├── MessageService.ts
│   │   │   └── index.ts
│   │   ├── media/
│   │   │   ├── MediaService.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── api/                # HTTP layer
│   │   ├── http/
│   │   │   ├── HttpClient.ts
│   │   │   └── index.ts
│   │   └── endpoints/
│   │       └── messages.ts
│   ├── types/              # TypeScript types
│   │   ├── client.ts
│   │   ├── messages.ts
│   │   └── index.ts
│   ├── errors/             # Error classes
│   │   ├── APIError.ts
│   │   ├── ValidationError.ts
│   │   └── index.ts
│   ├── utils/              # Shared utilities
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── index.ts
│   └── index.ts            # Main entry point
├── tests/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── helpers/
├── examples/               # Usage examples
│   ├── basic-usage.ts
│   └── advanced.ts
├── dist/                   # Compiled output (gitignored)
├── docs/                   # Documentation
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

---

## 📂 Directory-by-Directory Explanation

### 1. `src/` - Source Code Root

**Why separate src/ folder?**
- ✅ Clear separation: Source vs compiled output
- ✅ Easier to configure TypeScript (rootDir: "./src")
- ✅ Cleaner project root
- ✅ Standard convention

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

---

### 2. `src/client/` - Main Entry Point

**Purpose:** The primary class users instantiate

```typescript
// src/client/WhatsAppClient.ts
export class WhatsAppClient {
  constructor(config: ClientConfig) {
    // Initialize services
  }
}

// src/client/index.ts
export { WhatsAppClient } from './WhatsAppClient';
export type { ClientConfig } from './types';
```

**Why separate folder?**
- Clear entry point for SDK
- Can grow with additional client-related files
- Keeps main class focused

---

### 3. `src/services/` - Business Logic

**Purpose:** Feature-specific logic grouped by domain

```
services/
├── messages/           # Everything message-related
│   ├── MessageService.ts
│   ├── MessageValidator.ts
│   └── types.ts
├── media/              # Everything media-related
│   ├── MediaService.ts
│   ├── MediaUploader.ts
│   └── types.ts
└── templates/
    ├── TemplateService.ts
    └── types.ts
```

**Principle: Domain-Driven Organization**

Each service = One business domain
- ✅ MessageService handles messages
- ✅ MediaService handles media
- ✅ No mixing of concerns

**Why this matters:**

```typescript
// ❌ BAD: All in one file
class SDKService {
  sendMessage() { }
  uploadMedia() { }
  createTemplate() { }
  // 1000 lines...
}

// ✅ GOOD: Separated by domain
class MessageService {
  send() { }
  delete() { }
  get() { }
}

class MediaService {
  upload() { }
  download() { }
}
```

---

### 4. `src/api/` - HTTP Layer

**Purpose:** Low-level HTTP communication (internal)

```
api/
├── http/
│   ├── HttpClient.ts      # Axios/fetch wrapper
│   ├── interceptors.ts    # Request/response middleware
│   └── retry.ts           # Retry logic
└── endpoints/
    ├── messages.ts         # Message endpoints
    └── media.ts            # Media endpoints
```

**Why separate from services?**

**Services = Business logic ("send a message")**  
**API = Technical details ("POST /v1/messages")**

```typescript
// Service layer (what users think about)
class MessageService {
  async send(to: string, text: string): Promise<Message> {
    // Validate
    // Call API layer
    // Transform response
  }
}

// API layer (HTTP implementation detail)
class MessageEndpoints {
  async post(data: MessagePayload): Promise<APIResponse> {
    return this.http.post('/v1/messages', data);
  }
}
```

**Benefits:**
- ✅ Easy to swap HTTP libraries (axios → fetch)
- ✅ Services don't know about HTTP details
- ✅ Can mock API layer in tests

---

### 5. `src/types/` - TypeScript Definitions

**Purpose:** Centralized type definitions

```typescript
// types/client.ts
export interface ClientConfig {
  apiKey: string;
  apiUrl?: string;
}

// types/messages.ts
export interface Message {
  id: string;
  to: string;
  text: string;
}

// types/index.ts (barrel)
export type { ClientConfig } from './client';
export type { Message } from './messages';
```

**Why centralized types?**

**Problem without:**
```typescript
// services/MessageService.ts
interface Message { ... }  // Defined here

// api/endpoints/messages.ts
interface Message { ... }  // Defined again (duplicate!)

// client/WhatsAppClient.ts
interface Message { ... }  // Defined again!
```

**Solution with types/ folder:**
```typescript
// All files import from one source
import type { Message } from '../types';
```

**Benefits:**
- ✅ Single source of truth
- ✅ No duplicate definitions
- ✅ Easy to update
- ✅ Consistent types across SDK

---

### 6. `src/errors/` - Error Classes

**Purpose:** Custom error types for SDK

```typescript
// errors/APIError.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// errors/ValidationError.ts
export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// errors/index.ts
export { APIError } from './APIError';
export { ValidationError } from './ValidationError';
```

**Why separate errors?**

```typescript
// Users can catch specific errors
try {
  await client.messages.send('+123', 'Hello');
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else if (error instanceof APIError) {
    // Handle API error
  }
}
```

---

### 7. `src/utils/` - Shared Utilities

**Purpose:** Helper functions used across SDK

```
utils/
├── validators.ts      # Validation functions
├── formatters.ts      # Formatting utilities
├── retry.ts           # Retry logic
└── index.ts
```

**What goes in utils?**

✅ **DO put in utils:**
- Pure functions (no side effects)
- Reusable across multiple files
- General-purpose helpers

```typescript
// validators.ts
export function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

// formatters.ts
export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '');
}
```

❌ **DON'T put in utils:**
- Business logic (goes in services/)
- Domain-specific code
- Anything with side effects

---

### 8. `src/index.ts` - Main Entry Point

**Purpose:** SDK public API (what users import)

```typescript
// src/index.ts

// Export main client
export { WhatsAppClient } from './client';

// Export services (if users need direct access)
export { MessageService } from './services/messages';

// Export types
export type { ClientConfig } from './types';
export type { Message } from './types';

// Export errors
export { APIError, ValidationError } from './errors';

// DON'T export internal utilities
// DON'T export HTTP layer
```

**This file defines:** What's public vs private!

---

## 🎯 Separation of Concerns

### Layered Architecture:

```
┌─────────────────────────────────┐
│   src/index.ts (Public API)     │  ← What users see
├─────────────────────────────────┤
│   client/ (Main Client)         │  ← Entry point
├─────────────────────────────────┤
│   services/ (Business Logic)    │  ← What users do
├─────────────────────────────────┤
│   api/ (HTTP Layer)              │  ← How it works
├─────────────────────────────────┤
│   types/ errors/ utils/         │  ← Support code
└─────────────────────────────────┘
```

**Rules:**
1. **Top layers can use bottom layers**
2. **Bottom layers CANNOT use top layers**
3. **Each layer has clear responsibility**

**Example:**
```typescript
// ✅ GOOD: Client uses Services
class WhatsAppClient {
  messages: MessageService;  // Top → Bottom
}

// ✅ GOOD: Service uses API
class MessageService {
  constructor(private api: MessageEndpoints) { }
}

// ❌ BAD: API uses Service (wrong direction!)
class HttpClient {
  constructor(private messageService: MessageService) { }  // Bottom → Top
}
```

---

## 📏 File Naming Conventions

### Consistent naming helps navigation:

**PascalCase for classes:**
```
WhatsAppClient.ts
MessageService.ts
APIError.ts
```

**camelCase for utilities:**
```
validators.ts
formatters.ts
retry.ts
```

**index.ts for barrels:**
```
services/index.ts
errors/index.ts
types/index.ts
```

**Descriptive names:**
```
✅ MessageService.ts      (clear)
❌ messages.ts            (unclear - is it types? service? both?)

✅ validators.ts          (clear function)
❌ helpers.ts             (vague)
```

---

## 🧪 Test Organization (Mirrors src/)

```
tests/
├── unit/                  # Unit tests
│   ├── services/
│   │   └── MessageService.test.ts
│   └── utils/
│       └── validators.test.ts
├── integration/           # Integration tests
│   └── api/
│       └── messages.test.ts
└── helpers/               # Test utilities
    └── mocks.ts
```

**Principle:** Test structure mirrors src/ structure

**Finding tests is easy:**
```
src/services/MessageService.ts
tests/unit/services/MessageService.test.ts
```

---

## 💡 Key Principles

### 1. **Feature Folders (Domain-Driven)**

Group by what it does, not what it is:

```
✅ GOOD: Group by feature
services/
├── messages/           # All message-related code together
│   ├── MessageService.ts
│   ├── MessageValidator.ts
│   └── types.ts

❌ BAD: Group by type
services/
validators/
types/
```

### 2. **Public vs Internal**

```
src/
├── client/             # PUBLIC
├── services/           # PUBLIC
├── types/              # PUBLIC (select types)
├── errors/             # PUBLIC
├── api/                # INTERNAL (hidden)
└── utils/              # MIXED (some public, some internal)
```

### 3. **Flat When Possible, Nested When Necessary**

```
✅ Start flat:
utils/
├── validators.ts
└── formatters.ts

✅ Nest when it grows:
utils/
├── validators/
│   ├── phone.ts
│   ├── message.ts
│   └── index.ts
└── formatters/
    ├── phone.ts
    └── index.ts
```

Don't create deep nests prematurely!

---

## 🚀 Real WhatsApp SDK Structure

### Complete production structure:

```
whatsapp-sdk/
├── src/
│   ├── client/
│   │   ├── WhatsAppClient.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── messages/
│   │   ├── media/
│   │   ├── templates/
│   │   └── index.ts
│   ├── api/
│   │   ├── http/
│   │   └── endpoints/
│   ├── types/
│   │   ├── client.ts
│   │   ├── messages.ts
│   │   └── index.ts
│   ├── errors/
│   │   ├── APIError.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── validators.ts
│   │   └── index.ts
│   └── index.ts
├── tests/
├── examples/
├── docs/
├── dist/ (gitignored)
├── .gitignore
├── tsconfig.json
├── package.json
└── README.md
```

**Why this works:**
- ✅ Clear responsibility per folder
- ✅ Easy to find any code
- ✅ Scales to 100+ files
- ✅ New contributors understand quickly
- ✅ Professional appearance

---

## 📝 Practice Questions

Before exercises:

1. **Why** separate src/ from dist/?
2. **What** goes in services/ vs api/?
3. **How** do you decide between flat vs nested?
4. **When** should code go in utils/?
5. **Where** do types/ fit in the architecture?

**Next:** Complete exercises to practice organizing code! 🚀
