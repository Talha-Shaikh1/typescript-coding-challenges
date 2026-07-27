# Day 10 Exercises: Module Systems & Exports Mastery

Master ES Modules, exports, and API design!

---

## 📝 Exercise 1: Understanding the Problem (Conceptual)

**Goal:** Samajhna ke modules kyun zaroori hain - bina code ke!

### Scenario: Global Scope Chaos

Imagine you're building a WhatsApp SDK in 2010 (no modules existed):

```javascript
// file1.js
var API_URL = "https://api.whatsapp.com";
function sendMessage(text) { ... }

// file2.js
var API_URL = "https://graph.facebook.com";  // Oops! Overwrites file1
function sendMessage(phone, text) { ... }    // Overwrites file1

// file3.js
sendMessage("Hello");  // Which function runs?
console.log(API_URL);  // Which URL?
```

### Questions:

1. **What problems do you see?**
   - Name collisions
   - Load order dependency
   - What else?

2. **How would you fix this WITHOUT modules?**
   - Namespace objects?
   - IIFE patterns?
   - What are the downsides?

3. **Why are modules better than your fixes?**

### Expected Answer:

<details>
<summary>Click for answer</summary>

**Problems:**
1. Name collisions - functions overwrite each other
2. Global pollution - everything in global scope
3. No dependency management - manual tracking
4. Load order matters - scripts must be correct order
5. No privacy - can't hide internals

**Fixes without modules:**
```javascript
// Namespace pattern
var WhatsApp = {
  sendMessage: function() { }
};

var Facebook = {
  sendMessage: function() { }
};

// IIFE pattern
(function() {
  var API_URL = "...";  // Private
  window.WhatsApp = { ... };  // Public
})();
```

**Why modules are better:**
- ✅ Explicit dependencies (import statements)
- ✅ File scope by default (not global)
- ✅ Standard syntax
- ✅ Tool support (bundlers, tree-shaking)
- ✅ Clear public API

</details>

---

## 📝 Exercise 2: Named vs Default Exports

**Goal:** Understand when to use each export type

### Part A: Convert to Named Exports

Given this file with default export:

```typescript
// starter-code/exercise-2a.ts
export default function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}
```

**Task:**
1. Convert to named export
2. Add 2 more validation functions
3. Export all as named exports
4. Create a usage example

**Requirements:**
- `validatePhone()`
- `validateMessage()`
- `validateMessageId()`

---

### Part B: When Default Export Is Better

Create a `WhatsAppClient` class that SHOULD use default export.

**Why default here?**
- It's the MAIN export of the file
- Users expect: `import WhatsAppClient from './client'`
- File is named after the class

```typescript
// starter-code/exercise-2b.ts
// TODO: Create WhatsAppClient class with default export
// Add some named exports for helpers
```

---

### Part C: Analysis

Answer these:

1. **When to use named exports?**
   - Multiple utilities in one file?
   - Helper functions?
   - When else?

2. **When to use default exports?**
   - Main class of a file?
   - Primary function?
   - When else?

3. **Can you mix both?** Give an example.

---

## 📝 Exercise 3: Build a Barrel File System

**Goal:** Organize WhatsApp SDK with clean barrel exports

### Given Structure:

```
services/
├── messages/
│   ├── MessageService.ts
│   └── MessageValidator.ts
├── media/
│   ├── MediaService.ts
│   └── MediaUploader.ts
└── templates/
    ├── TemplateService.ts
    └── TemplateValidator.ts
```

### Tasks:

#### Task 1: Create Sub-Barrels

Create `index.ts` in each subfolder:

**services/messages/index.ts**
```typescript
// TODO: Export MessageService and MessageValidator
```

**services/media/index.ts**
```typescript
// TODO: Export MediaService and MediaUploader
```

**services/templates/index.ts**
```typescript
// TODO: Export TemplateService and TemplateValidator
```

---

#### Task 2: Create Main Barrel

**services/index.ts**
```typescript
// TODO: Re-export everything from subfolders
// Users should be able to:
// import { MessageService, MediaService } from './services';
```

---

#### Task 3: Test Imports

Create a file that uses the barrel:

```typescript
// test-barrel.ts
// TODO: Import multiple services from './services'
// Verify only ONE import statement needed
```

---

### Bonus Challenge:

What if you want to export everything EXCEPT `MessageValidator`?

```typescript
// Export all from messages except validator
// How would you do this?
```

---

## 📝 Exercise 4: Fix Circular Dependency

**Goal:** Understand and resolve circular dependencies

### Given Code (Broken):

```typescript
// starter-code/exercise-4-user.ts
import { Post } from './exercise-4-post';

export class User {
  id: string;
  posts: Post[] = [];
  
  addPost(post: Post) {
    this.posts.push(post);
  }
}
```

```typescript
// starter-code/exercise-4-post.ts
import { User } from './exercise-4-user';

export class Post {
  id: string;
  content: string;
  author: User;
  
  constructor(content: string, author: User) {
    this.content = content;
    this.author = author;
  }
}
```

**Problem:** User imports Post, Post imports User = Circular!

### Tasks:

1. **Identify the Problem**
   - Why is this circular?
   - What error might occur?
   - When does it break?

2. **Solution 1: Extract Types**
   - Create `types.ts` with interfaces
   - Use type-only imports

3. **Solution 2: Type-Only Import**
   - Use `import type { User }`
   - When does this work?

4. **Which solution is better and why?**

---

## 📝 Exercise 5: Design SDK Public API

**Goal:** Create a professional public API for WhatsApp SDK

### Given Structure:

```
src/
├── client/
│   ├── WhatsAppClient.ts
│   └── ClientConfig.ts (internal helper)
├── services/
│   ├── MessageService.ts
│   ├── MediaService.ts
│   └── internal/
│       └── HttpClient.ts (should NOT be public)
├── types/
│   ├── client.ts
│   ├── messages.ts
│   └── internal.ts (should NOT be public)
├── errors/
│   ├── APIError.ts
│   └── ValidationError.ts
└── utils/
    ├── validators.ts (public)
    └── internal/
        └── retry.ts (should NOT be public)
```

### Task: Create src/index.ts

**Requirements:**

1. ✅ Export `WhatsAppClient`
2. ✅ Export all services
3. ✅ Export public types (type-only)
4. ✅ Export error classes
5. ✅ Export public validators
6. ❌ Do NOT export internal helpers
7. ❌ Do NOT export ClientConfig
8. ❌ Do NOT export internal types

**Users should import like:**
```typescript
import { 
  WhatsAppClient, 
  MessageService,
  type Message,
  APIError 
} from '@whatsapp-sdk/core';
```

**NOT like:**
```typescript
import { WhatsAppClient } from '@whatsapp-sdk/core/dist/client/WhatsAppClient';
import { HttpClient } from '@whatsapp-sdk/core/dist/services/internal/HttpClient';
```

### Starter Code:

```typescript
// starter-code/exercise-5-index.ts

// TODO: Export client

// TODO: Export services

// TODO: Export types (type-only)

// TODO: Export errors

// TODO: Export public utilities

// Remember: DON'T export internal files!
```

---

## 🎯 Bonus Challenge: Module System Detective

**Scenario:** You joined a team and found this code:

```typescript
// mystery-file.ts
const utils = require('./utils');

export function processMessage(text) {
  return utils.format(text);
}

module.exports.processMessage = processMessage;
```

### Questions:

1. **What's wrong with this code?**
   - Mixing CommonJS and ES Modules?
   - What will happen?

2. **How would you fix it?**
   - Convert to pure ES Modules
   - Or pure CommonJS?

3. **Which would you choose and why?**

### Expected Answer:

<details>
<summary>Click for answer</summary>

**Problems:**
```typescript
const utils = require('./utils');  // ❌ CommonJS
export function processMessage() { }  // ❌ ES Module
module.exports.processMessage = ...;  // ❌ CommonJS again!
```

This mixing is INVALID - can't use both systems in one file!

**Fix - Convert to ES Modules:**
```typescript
import { format } from './utils';

export function processMessage(text: string): string {
  return format(text);
}
```

**Why ES Modules?**
- ✅ Modern standard
- ✅ Better tooling
- ✅ Tree-shakeable
- ✅ TypeScript's default

</details>

---

## 🏁 Exercise Completion Checklist

- [ ] Exercise 1: Understood WHY modules exist
- [ ] Exercise 2: Named vs default exports clear
- [ ] Exercise 3: Built barrel file system
- [ ] Exercise 4: Resolved circular dependency
- [ ] Exercise 5: Designed clean public API
- [ ] Bonus: Fixed mixed module syntax

---

## 💡 Key Takeaways

After completing these exercises:

✅ **WHY** modules exist (organization, scope, dependencies)  
✅ **WHEN** to use named vs default exports  
✅ **HOW** barrel files clean up APIs  
✅ **WHAT** circular dependencies are and how to fix  
✅ **WHERE** to draw the line between public and internal  

**Most Important:** You're not just learning syntax - you're learning **API design**! 🚀

---

## 📚 Next Steps

1. Complete all exercises
2. Review your barrel file design
3. Think: "Would I want to use my API?"
4. Move to Day 11: Build Process

**Remember:** Good module design = Good developer experience! 💪
