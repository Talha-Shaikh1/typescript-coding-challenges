# 📝 Day 14: Week 2 Practice Project - Exercises

**Goal:** Week 2 concepts ko integrate karke complete SDK foundation banana

---

## 🎯 Overview

Today's exercises are different from previous days!

Instead of small isolated exercises, you'll build **ONE complete project** that integrates ALL Week 2 concepts.

**Project:** WhatsApp SDK Foundation

Follow the **LESSON.md** file for step-by-step implementation guidance. These exercises will test your understanding at each phase.

---

## 📋 Exercise Structure

Each exercise corresponds to a phase from LESSON.md:

- **Exercise 1:** Architecture Design (Understanding)
- **Exercise 2:** Project Setup & Configuration
- **Exercise 3:** Type System Design
- **Exercise 4:** Implementation (Core Functionality)
- **Exercise 5:** Build & Verification
- **Exercise 6:** Extension Challenge (Bonus)

---

## ✅ Exercise 1: Architecture Design (30 min)

**Goal:** Week 2 concepts ko visualize karo before implementation

### Part A: Concept Mapping

Map each Week 2 concept to SDK components:

```
Week 2 Concept              →    SDK Application
─────────────────────────────────────────────────────
Day 08 (npm packages)       →    ?
Day 09 (tsconfig.json)      →    ?
Day 10 (modules/exports)    →    ?
Day 11 (build process)      →    ?
Day 12 (project structure)  →    ?
Day 13 (declaration files)  →    ?
```

**Your Task:** Fill in how each concept applies to the SDK.

### Part B: Dependency Graph

Draw the dependency flow:

```
Which module imports which?

WhatsAppClient → ?
MessageService → ?
Validators     → ?
Types          → ?
```

### Part C: Public API Surface

List what should be **exported** (public) vs **internal** (private):

**Public (users can import):**
- 

**Internal (hidden from users):**
- 

### ✅ Success Criteria:
- [ ] Understand how each Week 2 concept applies
- [ ] Know dependency direction
- [ ] Clear on public vs internal
- [ ] Ready to implement

---

## ✅ Exercise 2: Project Setup & Configuration (45 min)

**Goal:** Setup complete project with proper configuration

### Part A: Initialize Project

**Tasks:**
1. Create new folder: `whatsapp-sdk-foundation`
2. Initialize npm: `npm init -y`
3. Install dependencies
4. Create `.gitignore`

**Verification:**
```bash
ls -la
# Should see: package.json, node_modules/, .gitignore
```

### Part B: TypeScript Configuration

**Task:** Create `tsconfig.json` with:

**Requirements:**
- ✅ Output target: ES2022
- ✅ Module system: ESNext
- ✅ Declaration files: enabled
- ✅ Source maps: enabled
- ✅ Strict mode: enabled
- ✅ Output directory: dist/
- ✅ Source directory: src/

**Hint:** Review Day 09 LESSON.md

### Part C: Package Configuration

**Task:** Configure `package.json` with:

**Requirements:**
- ✅ Name: `@yourusername/whatsapp-sdk-core`
- ✅ Version: `0.1.0`
- ✅ Main entry: `./dist/index.js`
- ✅ Types entry: `./dist/index.d.ts`
- ✅ Scripts: dev, build, clean, typecheck
- ✅ Files array: only include dist/

**Hint:** Review Day 08 LESSON.md

### Part D: Folder Structure

**Task:** Create complete folder structure:

```bash
mkdir -p src/{client,services/messages,types,errors,utils}
```

Then create all barrel files (index.ts):
- src/client/index.ts
- src/services/messages/index.ts
- src/services/index.ts
- src/types/index.ts
- src/errors/index.ts
- src/utils/index.ts
- src/index.ts

**Hint:** Review Day 10 & Day 12 LESSON.md

### ✅ Success Criteria:
- [ ] `npm install` works
- [ ] `tsc --version` shows TypeScript installed
- [ ] Folder structure matches design
- [ ] All barrel files created

**Common Mistakes:**
- ❌ Wrong outDir/rootDir in tsconfig
- ❌ Missing "type": "module" in package.json
- ❌ Forgot to create barrel files
- ❌ Including src/ in files array (should be dist/)

---

## ✅ Exercise 3: Type System Design (60 min)

**Goal:** Define complete type system for SDK

### Part A: Client Types

**File:** `src/types/client.ts`

**Task:** Define interfaces for:

1. `ClientConfig`
   - apiKey (required string)
   - apiUrl (optional string)
   - timeout (optional number)

2. `ClientOptions`
   - retryAttempts (optional number)
   - logLevel (optional: 'debug' | 'info' | 'error')

### Part B: Message Types

**File:** `src/types/messages.ts`

**Task:** Define interfaces for:

1. `Message`
   - id (string)
   - to (phone number string)
   - from (phone number string)
   - text (message content)
   - timestamp (number)

2. `SendMessageRequest`
   - to (required)
   - text (required)

3. `MessageResponse`
   - messageId (string)
   - status ('sent' | 'delivered' | 'read' | 'failed')

### Part C: Types Barrel Export

**File:** `src/types/index.ts`

**Task:** Create barrel export with `export type`:

```typescript
export type { ClientConfig, ClientOptions } from './client';
export type { Message, SendMessageRequest, MessageResponse } from './messages';
```

**Why `export type`?** (Answer this question)

### ✅ Success Criteria:
- [ ] All interfaces defined
- [ ] Proper TypeScript syntax
- [ ] No compilation errors
- [ ] Type-only exports used
- [ ] Can explain why type-only exports matter

**Test Your Types:**
```bash
npm run typecheck
# Should pass with no errors
```

---

## ✅ Exercise 4: Implementation (90 min)

**Goal:** Implement core SDK functionality

### Part A: Error Classes

**Files to create:**
- `src/errors/APIError.ts`
- `src/errors/ValidationError.ts`
- `src/errors/index.ts`

**Requirements:**
- Both extend Error
- APIError has: statusCode, errorCode
- ValidationError has: field
- Proper barrel export

**Test your errors:**
```typescript
import { ValidationError } from './errors';
const error = new ValidationError('Invalid phone', 'to');
console.log(error.name);  // Should be "ValidationError"
console.log(error.field); // Should be "to"
```

### Part B: Utilities

**File:** `src/utils/validators.ts`

**Task:** Implement validation functions:

1. `validatePhone(phone: string): boolean`
   - Check E.164 format: `+` followed by 10-15 digits
   - Example valid: `+1234567890`
   - Example invalid: `1234567890` (no +)

2. `validateMessage(text: string): boolean`
   - Not empty
   - Max length: 4096 characters

**Barrel export:** `src/utils/index.ts`

**Test cases to verify:**
```typescript
validatePhone('+1234567890')      // true
validatePhone('1234567890')        // false
validatePhone('+12345')            // false (too short)

validateMessage('Hello')           // true
validateMessage('')                // false
validateMessage('x'.repeat(5000))  // false (too long)
```

### Part C: MessageService

**File:** `src/services/messages/MessageService.ts`

**Requirements:**

1. Import types, errors, and utils
2. Create `MessageService` class with:
   - `send()` method that:
     - Validates phone with `validatePhone()`
     - Validates message with `validateMessage()`
     - Throws `ValidationError` if invalid
     - Returns stub `MessageResponse`
   - `get()` method (stub - throw "Not implemented")

**Barrel exports:**
- `src/services/messages/index.ts`
- `src/services/index.ts`

### Part D: WhatsAppClient

**File:** `src/client/WhatsAppClient.ts`

**Requirements:**

1. Import `ClientConfig` and `MessageService`
2. Create `WhatsAppClient` class with:
   - Constructor accepts `ClientConfig`
   - Public property: `messages` (MessageService instance)
   - Method: `getConfig()` returns readonly config

**Barrel export:** `src/client/index.ts`

### Part E: Public API

**File:** `src/index.ts`

**Task:** Export public API:

**What to export:**
- WhatsAppClient
- MessageService
- All types (type-only)
- All errors
- Public utilities (validators)

**What NOT to export:**
- Internal utilities (future)
- API layer (future)

**Add comments** explaining public vs internal!

### ✅ Success Criteria:
- [ ] All files compile
- [ ] No TypeScript errors
- [ ] Imports work correctly
- [ ] No circular dependencies
- [ ] Public API clear

**Test compilation:**
```bash
npm run build
# Should compile successfully
```

---

## ✅ Exercise 5: Build & Verification (45 min)

**Goal:** Verify everything works correctly

### Part A: Build Verification

**Tasks:**

1. **Clean build:**
   ```bash
   npm run clean
   npm run build
   ```

2. **Check output:**
   ```bash
   ls dist/
   # Should see: client/, services/, types/, errors/, utils/, index.js, index.d.ts
   ```

3. **Verify declaration files:**
   ```bash
   find dist -name "*.d.ts" | head -10
   # Should see multiple .d.ts files
   ```

### Part B: Type Checking

**Task:**
```bash
npm run typecheck
```

**Should pass with NO errors!**

**If errors occur:**
- Read error message carefully
- Check import paths
- Verify all types defined
- Look for circular dependencies

### Part C: Usage Test

**Task:** Create `test-usage.ts` in project root:

```typescript
import {
  WhatsAppClient,
  type ClientConfig,
  type SendMessageRequest,
  ValidationError
} from './dist/index.js';

async function test() {
  // Test 1: Client creation
  const config: ClientConfig = {
    apiKey: 'test-key-12345'
  };
  
  const client = new WhatsAppClient(config);
  console.log('✓ Client created');

  // Test 2: Valid message
  try {
    const response = await client.messages.send({
      to: '+1234567890',
      text: 'Hello from SDK!'
    });
    console.log('✓ Message sent:', response.messageId);
  } catch (error) {
    console.error('✗ Failed:', error);
  }

  // Test 3: Invalid phone (should throw)
  try {
    await client.messages.send({
      to: '1234567890', // Missing +
      text: 'Hello'
    });
    console.error('✗ Should have thrown ValidationError');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log('✓ Validation error caught:', error.message);
    }
  }

  // Test 4: IDE autocomplete (manual check)
  // Type "client." and see if IDE shows "messages"
  // Type "client.messages." and see if IDE shows "send"
  console.log('✓ Check IDE autocomplete manually');
}

test();
```

**Run test:**
```bash
npx tsx test-usage.ts
```

**Expected output:**
```
✓ Client created
✓ Message sent: [some-id]
✓ Validation error caught: Invalid phone number
✓ Check IDE autocomplete manually
```

### Part D: Package Test

**Task:** Test what would be published:

```bash
npm pack --dry-run
```

**Verify:**
- [ ] Only `dist/` folder included
- [ ] No `src/` in package
- [ ] No `node_modules/` in package
- [ ] Package size reasonable

### ✅ Success Criteria:
- [ ] Build succeeds
- [ ] All .d.ts files generated
- [ ] Type checking passes
- [ ] Usage test passes
- [ ] npm pack looks correct
- [ ] IDE autocomplete works

**If something fails:**
- Check tsconfig.json configuration
- Verify package.json "files" array
- Review import/export statements
- Look for typos in file names

---

## ✅ Exercise 6: Extension Challenge (BONUS - 60+ min)

**Goal:** Extend SDK with additional features

Choose ONE challenge to implement:

### Challenge A: Media Service

**Task:** Add MediaService similar to MessageService

**Requirements:**
1. Create `src/types/media.ts`
   - `MediaType`: 'image' | 'video' | 'audio' | 'document'
   - `UploadMediaRequest`: url, type
   - `MediaResponse`: mediaId, url

2. Create `src/services/media/MediaService.ts`
   - `upload()` method
   - Validate media type
   - Return stub response

3. Add to WhatsAppClient
   - `client.media` property

4. Export in public API

### Challenge B: Configuration Validation

**Task:** Add robust config validation

**Requirements:**
1. Create `src/utils/configValidator.ts`
   - `validateConfig()` function
   - Check required fields
   - Validate URL format (if provided)
   - Validate timeout range

2. Use in WhatsAppClient constructor
   - Throw ValidationError if invalid

3. Write test cases for:
   - Missing apiKey
   - Invalid URL format
   - Negative timeout

### Challenge C: Logging System

**Task:** Add internal logging

**Requirements:**
1. Create `src/utils/logger.ts`
   - `Logger` class
   - Methods: debug(), info(), error()
   - Respect logLevel from ClientOptions

2. Use in MessageService
   - Log before send
   - Log validation errors
   - Log successful sends

3. Add to WhatsAppClient
   - Pass logger to services

### Challenge D: Complete README

**Task:** Write comprehensive documentation

**Requirements:**
1. Installation section
2. Quick start guide
3. Complete API reference
4. Example use cases
5. Error handling guide
6. Contributing section
7. License

**Sections to include:**
- Architecture overview
- Type definitions
- Error types
- Validation rules
- Future roadmap

### ✅ Bonus Success Criteria:
- [ ] Extension fully implemented
- [ ] All new code compiles
- [ ] Tests pass with new features
- [ ] Documentation updated
- [ ] Public API extended appropriately

---

## 🎯 Complete Project Checklist

Mark each as you complete:

### Setup & Configuration:
- [ ] Project initialized
- [ ] Dependencies installed
- [ ] tsconfig.json configured
- [ ] package.json configured
- [ ] Folder structure created
- [ ] All barrel files created

### Type System:
- [ ] Client types defined
- [ ] Message types defined
- [ ] Types barrel export created
- [ ] Type-only exports used

### Implementation:
- [ ] Error classes implemented
- [ ] Validators implemented
- [ ] MessageService implemented
- [ ] WhatsAppClient implemented
- [ ] Public API defined

### Build & Verify:
- [ ] Project builds successfully
- [ ] Declaration files generated
- [ ] Type checking passes
- [ ] No compilation errors
- [ ] Usage test passes
- [ ] npm pack looks correct

### Quality:
- [ ] No circular dependencies
- [ ] Clean import paths
- [ ] Proper separation of concerns
- [ ] Comments where needed
- [ ] README.md created

### Week 2 Concepts Applied:
- [ ] Day 08: npm package structure ✓
- [ ] Day 09: TypeScript configuration ✓
- [ ] Day 10: Module systems & exports ✓
- [ ] Day 11: Build process ✓
- [ ] Day 12: Project structure ✓
- [ ] Day 13: Declaration files ✓

---

## 🆘 Troubleshooting Guide

### "Cannot find module" Error
**Cause:** Import path incorrect or barrel export missing  
**Solution:** Check import path, verify barrel file exists

### "Type X is not assignable to type Y"
**Cause:** Type mismatch in implementation  
**Solution:** Review type definitions, check for typos

### "Circular dependency detected"
**Cause:** Two files import each other  
**Solution:** Use `import type` for type-only imports

### Build succeeds but no .d.ts files
**Cause:** `declaration: false` in tsconfig  
**Solution:** Set `"declaration": true`

### npm pack includes src/ folder
**Cause:** No `files` array in package.json  
**Solution:** Add `"files": ["dist"]`

### IDE autocomplete doesn't work
**Cause:** Types field missing in package.json  
**Solution:** Add `"types": "./dist/index.d.ts"`

---

## 💡 Key Learnings

After completing these exercises, you should understand:

1. **Package Structure:** How npm packages are organized
2. **TypeScript Config:** What each compiler option does
3. **Module Systems:** How imports/exports create APIs
4. **Build Process:** Source → Compilation → Distribution
5. **Project Organization:** Why structure matters
6. **Type Definitions:** How users get type safety

**Most Important:** How all Week 2 concepts work together!

---

## 🎉 Completion

You've completed Day 14 when:

✅ SDK compiles without errors  
✅ All type definitions generated  
✅ Can import and use WhatsAppClient  
✅ Autocomplete works in IDE  
✅ Professional folder structure  
✅ Ready for npm publish  

**Congratulations on completing Week 2!** 🎉

You now have a **production-ready SDK foundation**!

---

## ⏭️ What's Next?

**Week 3:** Advanced Types & Patterns

You'll learn:
- Generics for reusable code
- Utility types for transformations
- Conditional types for logic
- Type guards for safety

**With solid foundation, everything else is easier!**

---

## 📊 Self Assessment

Rate your understanding (1-5):

- [ ] npm package structure: ⭐⭐⭐⭐⭐
- [ ] TypeScript configuration: ⭐⭐⭐⭐⭐
- [ ] Module systems: ⭐⭐⭐⭐⭐
- [ ] Build process: ⭐⭐⭐⭐⭐
- [ ] Project structure: ⭐⭐⭐⭐⭐
- [ ] Declaration files: ⭐⭐⭐⭐⭐

**If any < 4 stars:** Review that day's LESSON.md again!

---

**Great work completing Week 2!** 💪

You're ready for advanced TypeScript! 🚀
