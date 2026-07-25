# Day 13 Exercises: Declaration Files & Type Definitions

Master .d.ts files and type exports!

---

## 📝 Exercise 1: Understanding Declaration Files (Conceptual)

**Goal:** Samajhna ke .d.ts files ka purpose kya hai

### Scenario: SDK Without Types

A user installs your WhatsApp SDK:

```bash
npm install @whatsapp-sdk/core
```

Your package.json:
```json
{
  "name": "@whatsapp-sdk/core",
  "main": "./dist/index.js"
  // No "types" field!
}
```

### Questions:

1. **What happens when a TypeScript user imports your SDK?**
   ```typescript
   import { WhatsAppClient } from '@whatsapp-sdk/core';
   const client = new WhatsAppClient({ apiKey: 'xxx' });
   ```
   - Do they get autocomplete?
   - Do they get type checking?
   - What's their developer experience like?

2. **What's missing from your package?**

3. **How do you fix this?**

4. **What files need to be generated?**

### Expected Answer:

<details>
<summary>Click for answer</summary>

**1. What happens:**
- ❌ No autocomplete - IDE can't suggest methods
- ❌ No type checking - TypeScript treats it as `any`
- ❌ No parameter hints
- ❌ No error detection at compile time
- Poor developer experience - like using plain JavaScript

**2. What's missing:**
- .d.ts declaration files
- "types" field in package.json pointing to .d.ts

**3. How to fix:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "declaration": true
  }
}

// package.json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

**4. Files needed:**
```
dist/
├── index.js       ← Compiled JavaScript
└── index.d.ts     ← Type definitions
```

</details>

---

## 📝 Exercise 2: Generate Declaration Files

**Goal:** Configure TypeScript to generate .d.ts files

### Your Task:

Create proper tsconfig.json for WhatsApp SDK that generates declaration files.

**Requirements:**
1. ✅ Generate .d.ts files
2. ✅ Generate declaration source maps
3. ✅ Output to dist/ folder
4. ✅ Include source maps for debugging

### Starter Code:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "outDir": "./dist",
    "rootDir": "./src",
    
    // TODO: Enable declaration generation
    "declaration": false,
    
    // TODO: Enable declaration maps (Go to Definition)
    "declarationMap": false,
    
    // TODO: Should we generate source maps?
    "sourceMap": false,
    
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["src/**/*"]
}
```

### Questions to Answer:

1. **Why set `declaration: true`?**
   (Your answer)

2. **What does `declarationMap: true` enable?**
   (Your answer)

3. **What's the difference between .js.map and .d.ts.map?**
   (Your answer)

---

## 📝 Exercise 3: Analyze Generated Declaration Files

**Goal:** Understand what TypeScript generates

### Given TypeScript Source:

```typescript
// src/client.ts

export interface ClientConfig {
  apiKey: string;
  timeout?: number;
}

export class WhatsAppClient {
  private apiKey: string;
  
  constructor(config: ClientConfig) {
    this.apiKey = config.apiKey;
  }
  
  async sendMessage(to: string, text: string): Promise<void> {
    console.log(`Sending "${text}" to ${to}`);
  }
  
  getConfig(): ClientConfig {
    return { apiKey: this.apiKey };
  }
}

export function createClient(apiKey: string): WhatsAppClient {
  return new WhatsAppClient({ apiKey });
}
```

### Your Tasks:

**Task 1:** Predict what dist/client.d.ts will look like

Write your prediction:
```typescript
// Your prediction here
```

**Task 2:** Compile and compare

```bash
tsc
cat dist/client.d.ts
```

Were you correct? What surprised you?

**Task 3:** Identify differences

| Feature | TypeScript Source | Declaration File |
|---------|------------------|------------------|
| Interface | Present | ??? |
| Class | Present | ??? |
| `declare` keyword | Absent | ??? |
| Method implementations | Present | ??? |
| Private fields | Present | ??? |
| Function body | Present | ??? |

Fill in the table!

---

## 📝 Exercise 4: Type-Only Exports

**Goal:** Understand `export type` vs `export`

### Scenario:

You have a types file:

```typescript
// src/types/messages.ts

export interface Message {
  id: string;
  to: string;
  text: string;
}

export interface MessageResponse {
  messageId: string;
  status: 'sent' | 'delivered';
}

export const MAX_MESSAGE_LENGTH = 4096;  // Constant
```

### Questions:

1. **Which should be exported with `export type`?**
   - Message
   - MessageResponse
   - MAX_MESSAGE_LENGTH

2. **Why use `export type` for interfaces?**

3. **What happens if you use regular `export` for types?**

### Your Task:

Create src/index.ts with proper exports:

```typescript
// src/index.ts

// TODO: Export client (value export)

// TODO: Export services (value exports)

// TODO: Export types (type-only exports!)

// TODO: Export constants (value exports)
```

---

## 📝 Exercise 5: Configure package.json for Types

**Goal:** Make your SDK TypeScript-friendly

### Given Structure:

```
whatsapp-sdk/
├── src/
│   └── index.ts
├── dist/
│   ├── index.js
   └── index.d.ts
└── package.json
```

### Your Task:

Complete package.json to expose types correctly:

```json
{
  "name": "@whatsapp-sdk/core",
  "version": "1.0.0",
  
  // TODO: Point to compiled JavaScript
  "main": "",
  
  // TODO: Point to type definitions
  "types": "",
  
  // TODO: Modern exports field
  "exports": {
    ".": {
      "import": "",
      "types": ""
    }
  },
  
  // TODO: What files to include in npm package?
  "files": []
}
```

### Questions:

1. **What's the difference between "main" and "types"?**
   (Your answer)

2. **Why use the "exports" field?**
   (Your answer)

3. **Should you include .d.ts files in "files" array?**
   (Your answer)

---

## 📝 Exercise 6: Debug Missing Types

**Goal:** Fix common declaration file issues

### Problem 1: No Autocomplete

User reports:
```typescript
import { WhatsAppClient } from '@your-sdk';
const client = new WhatsAppClient();
// No autocomplete! 😢
```

**Debug checklist:**

- [ ] Is `declaration: true` in tsconfig.json?
- [ ] Do .d.ts files exist in dist/?
- [ ] Is `types` field in package.json?
- [ ] Does it point to correct .d.ts file?

**Fix the issue!**

---

### Problem 2: Types Not Found

TypeScript error:
```
Could not find a declaration file for module '@your-sdk'.
Try `npm i --save-dev @types/your-sdk` if it exists.
```

**What's wrong?**

**How to fix:**

1. Check: Does dist/index.d.ts exist?
2. Check: package.json has "types" field?
3. Verify path is correct

---

### Problem 3: Go to Definition Shows .d.ts Instead of Source

User clicks "Go to Definition" but sees generated .d.ts file instead of your actual source code.

**What's missing?**

**How to fix:**

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": ???  // What should this be?
  }
}
```

---

## 🎯 Bonus Challenge: Manual Declaration File

**Goal:** Write a .d.ts file by hand for a JavaScript library

### Scenario:

You have a JavaScript library without types:

```javascript
// legacy-lib.js (no TypeScript)
export function sendSMS(phoneNumber, message) {
  // Implementation
}

export class SMSClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }
  
  send(to, text) {
    // Send SMS
  }
}
```

### Your Task:

Write a declaration file manually:

```typescript
// legacy-lib.d.ts

// TODO: Declare sendSMS function

// TODO: Declare SMSClient class

// TODO: Export both
```

---

## 🏁 Exercise Completion Checklist

- [ ] Exercise 1: Understood why .d.ts files are needed
- [ ] Exercise 2: Configured declaration generation
- [ ] Exercise 3: Analyzed generated declarations
- [ ] Exercise 4: Used type-only exports correctly
- [ ] Exercise 5: Configured package.json for types
- [ ] Exercise 6: Debugged missing types issues
- [ ] Bonus: Wrote manual declaration file

---

## 💡 Key Takeaways

After completing these exercises:

✅ **WHY** .d.ts files exist (type information for JavaScript)  
✅ **HOW** to generate them (`declaration: true`)  
✅ **WHAT** they contain (signatures, not implementations)  
✅ **WHEN** to use `export type` (type-only exports)  
✅ **WHERE** to point in package.json (`types` field)  

**Most Important:** Declaration files = Professional TypeScript SDK! 🚀

---

## 📚 Next Steps

1. Complete all exercises
2. Test your SDK's types in a consumer project
3. Verify autocomplete works
4. Move to Day 14: Week 2 Practice Project

**Remember:** Types are what make your SDK a joy to use! 💪
