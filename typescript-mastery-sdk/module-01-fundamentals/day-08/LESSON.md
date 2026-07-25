# 📘 Day 08: npm Package Fundamentals

**Module:** Fundamentals - Week 2  
**Duration:** 1-2 hours  
**Goal:** Understand npm packages aur production library ka foundation banana seekho

---

## 🎯 Day Overview

Aaj aap npm packages ke bare mein seekhoge - kaise packages kaam karte hain, kaise install hote hain, aur apna khud ka package kaise banate hain.

**Why This Matters:**  
WhatsApp SDK ek npm package hoga jo developers install kar ke use karenge. Isliye package basics samajhna zaroori hai.

---

## 📚 Topics Covered

1. What is npm?
2. package.json anatomy
3. Dependencies vs devDependencies
4. npm scripts
5. Semantic versioning
6. Package installation
7. Creating your first package

---

## 🔍 Section 1: What is npm?

### Urdu:
**npm** ka matlab hai **Node Package Manager**. Ye JavaScript/TypeScript packages ko manage karta hai.

**Real World Example:**  
Jaise aap mobile pe Play Store se apps install karte ho, waise hi developers npm se packages install karte hain.

### English:
npm is the world's largest software registry. It allows developers to:
- Install packages created by others
- Share their own packages
- Manage project dependencies

**Example:**
```bash
# Install a package
npm install express

# Install our future WhatsApp SDK
npm install @whatsapp-sdk/core
```

---

## 🔍 Section 2: Understanding package.json

### What is package.json?

Package.json is your project ka **identity card**. Ye batata hai:
- Project ka naam kya hai?
- Version kya hai?
- Konse dependencies chahiye?
- Kaunse scripts run kar sakte hain?

### Basic Structure:

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "description": "What this package does",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "test": "vitest"
  },
  "keywords": ["whatsapp", "sdk"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Key Fields Explained:

#### 1. name
```json
"name": "@whatsapp-sdk/core"
```
- Package ka unique naam
- Scoped packages: `@scope/package-name`
- Lowercase, no spaces

#### 2. version
```json
"version": "1.0.0"
```
- Semantic versioning: `MAJOR.MINOR.PATCH`
- `1.0.0` → `1.0.1` (bug fix)
- `1.0.0` → `1.1.0` (new feature)
- `1.0.0` → `2.0.0` (breaking change)

#### 3. main
```json
"main": "dist/index.js"
```
- Entry point jab koi package import kare
- Usually built/compiled code ka path

#### 4. types
```json
"types": "dist/index.d.ts"
```
- TypeScript type definitions ka path
- IDE autocomplete ke liye zaroori

#### 5. scripts
```json
"scripts": {
  "dev": "tsx watch src/index.ts",
  "build": "tsup",
  "test": "vitest"
}
```
- Custom commands jo `npm run` se chalti hain

---

## 🔍 Section 3: Dependencies vs devDependencies

### dependencies

Packages jo **production** mein chahiye:

```json
"dependencies": {
  "axios": "^1.6.0"
}
```

**Use Case:** Agar aapka SDK axios use karta hai requests bhejne ke liye, toh ye dependency hai.

**Install:**
```bash
npm install axios
```

### devDependencies

Packages jo sirf **development** mein chahiye:

```json
"devDependencies": {
  "typescript": "^5.0.0",
  "vitest": "^1.0.0",
  "@types/node": "^20.0.0"
}
```

**Use Case:** TypeScript compiler, testing tools, type definitions - ye development mein chahiye, production mein nahi.

**Install:**
```bash
npm install --save-dev typescript
# OR
npm install -D typescript
```

### Rule of Thumb:

**Question:** "Kya ye package published SDK mein bhi chahiye?"
- **Yes** → `dependencies`
- **No** → `devDependencies`

**Examples:**

| Package | Type | Why? |
|---------|------|------|
| axios | dependency | SDK runtime mein use hoga |
| typescript | devDependency | Sirf build time pe chahiye |
| vitest | devDependency | Sirf testing ke liye |
| zod | dependency | Runtime validation |

---

## 🔍 Section 4: npm Scripts

Scripts automate common tasks.

### Common Scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src",
    "format": "prettier --write src"
  }
}
```

### Running Scripts:

```bash
npm run dev     # Start development
npm run build   # Build project
npm test        # Run tests (can skip 'run')
```

### Special Scripts:

Some scripts run automatically:

```json
{
  "scripts": {
    "preinstall": "echo Before install",
    "postinstall": "echo After install",
    "prepublish": "npm run build"
  }
}
```

---

## 🔍 Section 5: Package Installation

### Install from npm:
```bash
npm install <package-name>
```

### Install specific version:
```bash
npm install express@4.18.0
```

### Install from GitHub:
```bash
npm install user/repo#branch
```

### Global installation:
```bash
npm install -g typescript
```

**Note:** SDKs are usually installed locally, not globally.

---

## 🔍 Section 6: Semantic Versioning (SemVer)

### Format: MAJOR.MINOR.PATCH

```
1.2.3
│ │ │
│ │ └─ PATCH: Bug fixes (backward compatible)
│ └─── MINOR: New features (backward compatible)
└───── MAJOR: Breaking changes
```

### Version Ranges in package.json:

```json
{
  "dependencies": {
    "express": "^4.18.0",  // ^4.18.0 to <5.0.0
    "axios": "~1.6.0",     // ~1.6.0 to <1.7.0
    "lodash": "4.17.21"    // Exact version
  }
}
```

### Symbols:

- `^` (caret): Minor updates allowed
  - `^1.2.3` → installs `1.x.x` (< 2.0.0)
- `~` (tilde): Patch updates only
  - `~1.2.3` → installs `1.2.x` (< 1.3.0)
- No symbol: Exact version

---

## 🔍 Section 7: Creating Your First Package

### Step 1: Initialize

```bash
mkdir my-package
cd my-package
npm init -y
```

This creates a basic `package.json`.

### Step 2: Customize package.json

```json
{
  "name": "my-whatsapp-utils",
  "version": "0.1.0",
  "description": "Utility functions for WhatsApp",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "keywords": ["whatsapp", "utils"],
  "author": "Your Name",
  "license": "MIT"
}
```

### Step 3: Add TypeScript

```bash
npm install -D typescript @types/node
npx tsc --init
```

### Step 4: Create Source Code

```typescript
// src/index.ts
export function formatPhoneNumber(phone: string): string {
  if (phone.startsWith('+')) return phone;
  return `+92${phone}`;
}
```

### Step 5: Build

```bash
npm run build
```

---

## 🔍 Section 8: Package.json for SDK Development

### WhatsApp SDK Example:

```json
{
  "name": "@whatsapp-sdk/core",
  "version": "0.1.0",
  "description": "TypeScript SDK for WhatsApp Cloud API",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": [
    "dist",
    "README.md"
  ],
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsup",
    "test": "vitest",
    "lint": "eslint src",
    "prepublishOnly": "npm run build && npm test"
  },
  "keywords": [
    "whatsapp",
    "sdk",
    "typescript",
    "api"
  ],
  "author": "Your Name",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/username/whatsapp-sdk"
  },
  "bugs": {
    "url": "https://github.com/username/whatsapp-sdk/issues"
  },
  "homepage": "https://github.com/username/whatsapp-sdk#readme",
  "devDependencies": {
    "@types/node": "^20.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

### Key Fields for Libraries:

#### `type: "module"`
Uses ES Modules instead of CommonJS

#### `exports`
Modern way to define package entry points

#### `files`
Which files to include when publishing

#### `engines`
Minimum Node.js version required

---

## 🎓 Key Concepts Summary

### npm Package Basics:
- ✅ npm is the package manager for JavaScript
- ✅ package.json is the package configuration
- ✅ Dependencies are production requirements
- ✅ devDependencies are development requirements

### Package Configuration:
- ✅ Semantic versioning: MAJOR.MINOR.PATCH
- ✅ Scripts automate tasks
- ✅ Proper entry points (main, types, exports)

### SDK Development:
- ✅ Scoped packages: `@scope/name`
- ✅ Type definitions for TypeScript support
- ✅ Files field controls what gets published

---

## 🔗 Real-World Connection

**How This Applies to WhatsApp SDK:**

1. **Installation:**
   ```bash
   npm install @whatsapp-sdk/core
   ```

2. **Usage:**
   ```typescript
   import { WhatsAppClient } from "@whatsapp-sdk/core"
   ```

3. **Version Management:**
   ```
   v0.1.0 → Initial release
   v0.2.0 → Add media support
   v1.0.0 → Stable API
   ```

---

## 📝 Practice Exercise Preview

In the EXERCISES.md file, you'll:
1. Create a package.json from scratch
2. Configure dependencies correctly
3. Write npm scripts
4. Understand version ranges
5. Build a mini SDK package structure

---

## ✅ Day 08 Checklist

- [ ] Understand what npm is and why we use it
- [ ] Know the key fields in package.json
- [ ] Differentiate between dependencies and devDependencies
- [ ] Understand semantic versioning
- [ ] Create npm scripts
- [ ] Initialize a TypeScript package

---

## 🎯 Next Day Preview

**Day 09: TypeScript Configuration**
- Deep dive into tsconfig.json
- Compiler options explained
- Configuring TypeScript for library development

---

## 💡 Pro Tips

1. **Always use -D for dev tools:**
   ```bash
   npm install -D typescript
   ```

2. **Lock dependencies:**
   Use `package-lock.json` to ensure consistent installs

3. **Check package size:**
   ```bash
   npm pack --dry-run
   ```

4. **Use scoped packages for organizations:**
   ```
   @company/package-name
   ```

---

**Great job!** You now understand npm package fundamentals! 🚀

**Next:** Complete the exercises to practice these concepts.
