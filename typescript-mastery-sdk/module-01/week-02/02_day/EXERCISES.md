# Day 09 Exercises: TypeScript Configuration Mastery

Master tsconfig.json through deep understanding!

---

## 📝 Exercise 1: Understanding the Problem (No Code Yet!)

**Goal:** Pehle problem samajhni zaroori hai - kyun configuration chahiye?

### Scenario:

Aapki team mein 3 developers hain:
- Developer A: `tsc --target ES5 app.ts` use karta hai
- Developer B: `tsc --target ES2020 app.ts` use karta hai  
- Developer C: Koi target specify nahi karta

### Questions:

1. **Kya output same hoga?** Kyun ya kyun nahi?

2. **Production mein kya problems aa sakti hain?**

3. **Agar kisi ne strictNullChecks on rakha aur kisi ne nahi, to kya hoga?**

4. **Team consistency ke liye kya solution hai?**

### Expected Answer:

```markdown
1. Output same nahi hoga kyunki...
   - ES5: Arrow functions convert honge traditional functions mein
   - ES2020: Modern syntax rahega
   - Default: TypeScript ka default target use hoga

2. Production problems:
   - Code kisi browser mein chale, kisi mein na chale
   - Type checking inconsistent hogi
   - Bugs catch nahi honge consistently

3. strictNullChecks differences:
   - ON: null/undefined explicitly check hoga - safer
   - OFF: null bugs production tak ja sakte hain

4. Solution: tsconfig.json banao with team-agreed settings
```

**Why This Exercise?**  
Configuration use karne se pehle ye samajhna zaroori hai ke *kyun* zaroori hai.

---

## 📝 Exercise 2: Build Your First tsconfig.json

**Goal:** Manually understand each configuration option

### Task:

WhatsApp SDK ke liye ek `tsconfig.json` banao (starter-code folder mein).

### Requirements:

```json
{
  "compilerOptions": {
    // TODO: Add these with understanding of WHY
    // 1. target - Kis JS version mein compile ho?
    // 2. module - Kis module system use karein?
    // 3. outDir - Output files kahan jayengi?
    // 4. rootDir - Source files kahan hain?
    // 5. strict - Strict type checking chahiye?
    // 6. esModuleInterop - Import compatibility?
    // 7. skipLibCheck - Library files check karein?
    // 8. declaration - .d.ts files generate karein?
  },
  "include": [],
  "exclude": []
}
```

### For Each Option, Answer:

1. **Ye option kya karta hai?**
2. **Iska SDK pe kya impact hoga?**
3. **Agar ye galat set ho, kya problem aayegi?**

### Solution Hints:

<details>
<summary>Click for hints</summary>

```json
{
  "compilerOptions": {
    "target": "ES2022",  // Node.js 18+ support
    "module": "ESNext",  // Modern imports
    "outDir": "./dist",  // Compiled output folder
    "rootDir": "./src",  // Source code folder
    "strict": true,      // Maximum type safety
    "esModuleInterop": true,  // Better CommonJS imports
    "skipLibCheck": true,     // Faster compilation
    "declaration": true       // Generate .d.ts for npm package
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**Why these values?**
- `target: ES2022` - WhatsApp SDK Node.js 18+ pe chalega (2022 features support karta hai)
- `module: ESNext` - Modern import/export chahiye
- `strict: true` - Production library mein maximum safety chahiye
- `declaration: true` - npm package ko types export karni hain

</details>

---

## 📝 Exercise 3: Strict Mode Deep Dive

**Goal:** Samajhna ke strict mode kya karta hai aur kyun zaroori hai

### Part A: Without Strict Mode

```typescript
// strictNullChecks: false (default)
function getUserName(user) {
  return user.name.toUpperCase();
}

// Runtime:
getUserName(null);  // ❌ Runtime error!
```

**Problem:** Type safety nahi hai, bugs production tak ja sakte hain.

---

### Part B: With Strict Mode

```typescript
// strictNullChecks: true
function getUserName(user: { name: string } | null) {
  return user.name.toUpperCase();  // ❌ Compile error!
  // Object is possibly 'null'
}

// Correct approach:
function getUserName(user: { name: string } | null) {
  if (!user) return "Unknown";
  return user.name.toUpperCase();  // ✅ Safe!
}
```

**Solution:** TypeScript forces you to handle null cases.

---

### Your Task:

Fix these functions with strict mode enabled:

```typescript
// starter-code/exercise-3.ts

// 1. Fix this function
function sendMessage(phoneNumber, message) {
  return `Sending ${message} to ${phoneNumber}`;
}

// 2. Fix this function
function getMessageStatus(messageId) {
  const statuses = {
    '123': 'sent',
    '456': 'delivered'
  };
  return statuses[messageId].toUpperCase();
}

// 3. Fix this function
function formatPhoneNumber(phone) {
  if (phone) {
    return phone.replace(/\s/g, '');
  }
}
```

### Expected Solution:

<details>
<summary>Click for solution</summary>

```typescript
// 1. Fixed with proper types
function sendMessage(phoneNumber: string, message: string): string {
  return `Sending ${message} to ${phoneNumber}`;
}

// 2. Fixed with null handling
function getMessageStatus(messageId: string): string {
  const statuses: Record<string, string> = {
    '123': 'sent',
    '456': 'delivered'
  };
  const status = statuses[messageId];
  if (!status) {
    return 'unknown';
  }
  return status.toUpperCase();
}

// 3. Fixed with explicit return type
function formatPhoneNumber(phone: string | undefined): string {
  if (phone) {
    return phone.replace(/\s/g, '');
  }
  return '';  // Explicit return for undefined case
}
```

**Why these fixes?**
- Explicit types prevent wrong arguments
- Null checks prevent runtime crashes
- Explicit return types make behavior clear

</details>

---

## 📝 Exercise 4: Path Mapping (Advanced Imports)

**Goal:** Clean imports using path aliases

### Problem:

```typescript
// Without path mapping - ugly imports
import { WhatsAppClient } from '../../../src/client/WhatsAppClient';
import { MessageService } from '../../../src/services/MessageService';
import { formatPhone } from '../../../src/utils/phone';
```

**Problem:** 
- Ugly relative paths
- Refactoring breaks imports
- Hard to read

---

### Solution: Path Mapping

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@client/*": ["src/client/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

**After:**
```typescript
// Beautiful imports!
import { WhatsAppClient } from '@client/WhatsAppClient';
import { MessageService } from '@services/MessageService';
import { formatPhone } from '@utils/phone';
```

---

### Your Task:

Create path mappings for WhatsApp SDK with this structure:

```
src/
├── client/
├── api/
├── services/
├── types/
├── utils/
└── errors/
```

**Requirements:**
1. `@whatsapp-sdk/*` should map to `src/*`
2. Each folder should have its own alias
3. Test imports should use `@test/*`

**Starter code:** `starter-code/exercise-4-tsconfig.json`

### Expected Solution:

<details>
<summary>Click for solution</summary>

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@whatsapp-sdk/*": ["src/*"],
      "@client/*": ["src/client/*"],
      "@api/*": ["src/api/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@errors/*": ["src/errors/*"],
      "@test/*": ["tests/*"]
    }
  }
}
```

**Usage example:**
```typescript
import { WhatsAppClient } from '@client/WhatsAppClient';
import type { Message } from '@types/messages';
import { APIError } from '@errors/APIError';
```

</details>

---

## 📝 Exercise 5: Multiple tsconfig Files (Real SDK Pattern)

**Goal:** Understand why SDKs use multiple configs

### Real-World Problem:

WhatsApp SDK needs:
1. **Main build** - Library code compilation
2. **Tests** - Different settings for test files
3. **Examples** - Demo code with relaxed rules

**One config ke saath:**
- Test files library mein include ho jayengi
- Example code publish ho jayegi
- Conflicting requirements

---

### Solution: Multiple Configs

```
tsconfig.json          # Base config
tsconfig.build.json    # Library build
tsconfig.test.json     # Test compilation  
tsconfig.examples.json # Examples
```

---

### Your Task:

Create 3 tsconfig files for WhatsApp SDK:

#### 1. `tsconfig.json` (Base - shared settings)

```json
{
  "compilerOptions": {
    // Shared settings that ALL configs inherit
  }
}
```

#### 2. `tsconfig.build.json` (Library Build)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // Library-specific settings
    // Should generate declaration files
    // Should exclude tests
  },
  "include": ["src/**/*"],
  "exclude": ["tests", "examples"]
}
```

#### 3. `tsconfig.test.json` (Tests)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    // Test-specific settings
    // No need for declaration files
    // Should include test utilities
  },
  "include": ["tests/**/*", "src/**/*"]
}
```

### Expected Behavior:

```bash
# Build library
tsc -p tsconfig.build.json

# Compile tests  
tsc -p tsconfig.test.json
```

**Starter code:** `starter-code/exercise-5/` folder

---

## 🎯 Bonus Challenge: Debug a Broken Config

**Scenario:** Junior developer ne ye tsconfig.json banaya:

```json
{
  "compilerOptions": {
    "target": "ES3",
    "module": "CommonJS",
    "strict": false,
    "outDir": "src",
    "declaration": false
  },
  "include": ["**/*"]
}
```

### Problems to Find:

1. **Kya galat hai is config mein?**
2. **Har mistake ka SDK pe kya impact hoga?**
3. **Corrected version kya hoga?**

### Your Analysis:

```markdown
Problem 1: target: "ES3"
- Why wrong: Too old, modern features won't work
- Impact: SDK won't use modern JavaScript features
- Fix: target: "ES2022"

Problem 2: strict: false
- Why wrong: No type safety
- Impact: Bugs won't be caught at compile time
- Fix: strict: true

Problem 3: outDir: "src"
- Why wrong: Overwrites source files!
- Impact: Compiled JS will mix with TypeScript source
- Fix: outDir: "dist"

Problem 4: declaration: false
- Why wrong: No type definitions
- Impact: npm package users won't get autocomplete
- Fix: declaration: true

Problem 5: include: ["**/*"]
- Why wrong: Includes node_modules, tests, everything!
- Impact: Compilation will be slow and include wrong files
- Fix: include: ["src/**/*"]
```

---

## 🏁 Exercise Completion Checklist

- [ ] Exercise 1: Understood WHY configuration is needed
- [ ] Exercise 2: Built first tsconfig.json with understanding
- [ ] Exercise 3: Fixed strict mode errors
- [ ] Exercise 4: Created path mappings
- [ ] Exercise 5: Set up multiple configs
- [ ] Bonus: Debugged broken config

---

## 💡 Key Takeaways

After completing these exercises, you should understand:

✅ **WHY** tsconfig.json exists (consistency, safety, team collaboration)  
✅ **HOW** each option affects compilation  
✅ **WHAT** happens when configs are wrong  
✅ **WHEN** to use multiple configs  
✅ **WHERE** to use path mappings  

**Most Important:** Ab aap sirf copy-paste nahi kar rahe - aap samajh rahe ho **kyun** har option zaroori hai!

---

## 📚 Next Steps

1. Complete all exercises
2. Review your tsconfig.json
3. Ask yourself: "Har option kyun set kiya?"
4. Move to Day 10: Module Systems

**Remember:** Configuration ko samajhna library development ka foundation hai! 🚀
