# Day 08 Exercises

Master npm package fundamentals!

---

## 📝 Exercise 1: Create package.json from Scratch

**Goal:** Manually create a proper package.json for a WhatsApp utility library

**File:** `starter-code/exercise-1/`

**Tasks:**

1. Create a folder `whatsapp-utils`
2. Inside it, manually create `package.json` with:
   - Name: `@yourname/whatsapp-utils`
   - Version: `0.1.0`
   - Description: "Utility functions for WhatsApp SDK"
   - Main entry: `dist/index.js`
   - Types: `dist/index.d.ts`
   - Scripts: build, test, dev
   - Keywords: whatsapp, utils, typescript
   - License: MIT

3. Add these devDependencies:
   - typescript (^5.0.0)
   - @types/node (^20.0.0)

**Expected Output:**
```json
{
  "name": "@yourname/whatsapp-utils",
  "version": "0.1.0",
  ...
}
```

**Validation:**
```bash
cd whatsapp-utils
npm install
```

Should install without errors.

---

## 📝 Exercise 2: Dependencies vs devDependencies

**Goal:** Correctly categorize package dependencies

**File:** `starter-code/exercise-2.ts`

**Tasks:**

Given these packages, categorize them:

```
1. axios - HTTP client for API requests
2. typescript - TypeScript compiler
3. vitest - Testing framework
4. zod - Runtime validation library
5. eslint - Code linting tool
6. dotenv - Environment variable loader
7. tsup - Build tool
8. @types/node - Node.js type definitions
```

Create a `package.json` snippet with correct categories.

**Expected Output:**
```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "zod": "^3.22.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vitest": "^1.0.0",
    "eslint": "^8.0.0",
    "tsup": "^8.0.0",
    "@types/node": "^20.0.0"
  }
}
```

**Why?**
- axios, zod, dotenv: Used in runtime/production
- typescript, vitest, eslint, tsup, @types: Used only during development

---

## 📝 Exercise 3: npm Scripts Configuration

**Goal:** Create useful npm scripts for development workflow

**File:** `starter-code/exercise-3/package.json`

**Tasks:**

Create scripts for:

1. `dev` - Run TypeScript file with watch mode (use `tsx watch`)
2. `build` - Compile TypeScript (use `tsc`)
3. `test` - Run tests (use `vitest`)
4. `test:watch` - Run tests in watch mode
5. `lint` - Lint code (use `eslint src`)
6. `format` - Format code (use `prettier --write src`)
7. `type-check` - Check types without building (use `tsc --noEmit`)
8. `clean` - Remove dist folder (use `rm -rf dist`)

**Bonus:**
Add a `prepublishOnly` script that runs build and tests before publishing.

**Expected Output:**
```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "test": "vitest",
    ...
  }
}
```

**Test:**
```bash
npm run dev
npm run build
npm test
```

---

## 📝 Exercise 4: Semantic Versioning Understanding

**Goal:** Understand and apply semantic versioning rules

**File:** `starter-code/exercise-4.md`

**Tasks:**

Your package is at version `1.2.3`.

For each scenario, determine the next version number:

1. Fixed a bug in phone number validation
   - Current: `1.2.3`
   - Next: `?`

2. Added a new `sendImage()` method (backward compatible)
   - Current: `1.2.3`
   - Next: `?`

3. Changed the `sendMessage()` function signature (breaking change)
   - Current: `1.2.3`
   - Next: `?`

4. Fixed typo in documentation (no code change)
   - Current: `1.2.3`
   - Next: `?`

5. Added webhook support (new feature) + fixed a bug
   - Current: `1.2.3`
   - Next: `?`

**Also answer:**

Given these version ranges in package.json, which versions would be installed?

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "axios": "~1.6.0",
    "lodash": "4.17.21"
  }
}
```

Available versions:
- express: 4.18.0, 4.18.5, 4.19.0, 5.0.0
- axios: 1.6.0, 1.6.5, 1.7.0, 2.0.0
- lodash: 4.17.20, 4.17.21, 4.18.0

---

## 📝 Exercise 5: Complete SDK Package Structure

**Goal:** Create a production-ready package.json for WhatsApp SDK

**File:** `starter-code/exercise-5/`

**Tasks:**

Create a complete package.json for `@whatsapp-sdk/core` with:

**Basic Info:**
- Name: `@whatsapp-sdk/core`
- Version: `0.1.0`
- Description: "TypeScript SDK for WhatsApp Cloud API"
- Type: "module" (ES Modules)

**Entry Points:**
- main: `./dist/index.js`
- types: `./dist/index.d.ts`
- exports field with proper mapping

**Scripts:**
- dev (tsx watch)
- build (tsup)
- test (vitest)
- lint (eslint)
- format (prettier)
- type-check
- prepublishOnly (build + test)

**Dependencies:**
- None for now (pure TypeScript, using native fetch)

**DevDependencies:**
- typescript
- tsup
- vitest
- eslint
- prettier
- @types/node
- tsx

**Metadata:**
- Repository URL
- Keywords: whatsapp, sdk, typescript, api, cloud-api
- License: MIT
- Files: ["dist", "README.md"]
- Engines: node >= 18.0.0

**Expected Output:**
A complete, production-ready package.json

**Validation:**
```bash
npm install
npm run build
npm test
```

All should work without errors.

---

## ✅ Completion Checklist

- [ ] Exercise 1: Created package.json manually ✅
- [ ] Exercise 2: Categorized dependencies correctly ✅
- [ ] Exercise 3: Configured npm scripts ✅
- [ ] Exercise 4: Understood semantic versioning ✅
- [ ] Exercise 5: Created complete SDK package.json ✅
- [ ] All exercises compile without errors
- [ ] Understood why each field is important
- [ ] Compared with solutions

---

## 🎯 Bonus Challenge

**Real-World Scenario:**

You're creating a WhatsApp SDK plugin system. Create package.json for:

1. **Core Package:** `@whatsapp-sdk/core`
   - Base SDK functionality
   - Should be a dependency of plugin packages

2. **Express Plugin:** `@whatsapp-sdk/express`
   - Express.js middleware
   - Dependencies: @whatsapp-sdk/core, express
   - DevDependencies: @types/express

3. **CLI Tool:** `@whatsapp-sdk/cli`
   - Command-line interface
   - Should have a `bin` field
   - Dependencies: @whatsapp-sdk/core, commander

Create package.json for all three showing proper dependency relationships.

**Hint:**
```json
{
  "bin": {
    "whatsapp": "./dist/cli.js"
  }
}
```

This allows: `npx @whatsapp-sdk/cli init`

---

## 📚 Further Reading

After completing exercises:

1. **npm documentation:** https://docs.npmjs.com/
2. **package.json spec:** https://docs.npmjs.com/cli/v10/configuring-npm/package-json
3. **Semantic Versioning:** https://semver.org/
4. **Publishing packages:** https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages

---

## 💡 Common Mistakes to Avoid

1. ❌ Putting TypeScript in `dependencies`
   - ✅ Put it in `devDependencies`

2. ❌ Using development tools in production
   - ✅ Separate dev and runtime dependencies

3. ❌ Not locking versions
   - ✅ Use package-lock.json

4. ❌ Publishing unnecessary files
   - ✅ Use `files` field to control what gets published

5. ❌ Breaking changes in minor versions
   - ✅ Follow semantic versioning strictly

---

npm package basics master ho gaye! 💪

**Next:** Check solutions aur move to Day 09!
