# Example 4: Multiple tsconfig Files Pattern

## 🤔 WHY Multiple Configs?

### Problem:
Your WhatsApp SDK has different requirements for different contexts:

1. **Library Code** - Strict, generate types, exclude tests
2. **Test Files** - Less strict, include test utilities, no type generation
3. **Examples** - Relaxed rules, quick demos
4. **Development** - Fast compilation, watch mode

**One config can't satisfy all!**

---

## 💡 Solution: Config Inheritance

```
tsconfig.json           # Base shared settings
tsconfig.build.json     # Production build
tsconfig.test.json      # Test compilation
tsconfig.examples.json  # Example files
```

---

## 📁 File 1: tsconfig.json (Base Config)

```json
{
  "compilerOptions": {
    /* Shared by ALL configs */
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,

    /* Path mappings (shared) */
    "baseUrl": ".",
    "paths": {
      "@client/*": ["src/client/*"],
      "@services/*": ["src/services/*"],
      "@utils/*": ["src/utils/*"],
      "@types/*": ["src/types/*"]
    }
  }
}
```

**Purpose:** Common settings all other configs inherit

---

## 📁 File 2: tsconfig.build.json (Library Build)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    /* Production-specific */
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    
    /* Remove comments in production */
    "removeComments": true
  },
  "include": ["src/**/*"],
  "exclude": [
    "src/**/*.test.ts",
    "src/**/*.spec.ts",
    "tests"
  ]
}
```

**Usage:**
```bash
npm run build  # Uses this config
# Script: "build": "tsc -p tsconfig.build.json"
```

**Why These Settings?**
- ✅ `declaration: true` - npm package needs types
- ✅ `strict: true` - Production code must be safe
- ✅ `removeComments: true` - Smaller bundle size
- ✅ Excludes tests - Don't ship test code

---

## 📁 File 3: tsconfig.test.json (Test Files)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    /* Test-specific */
    "outDir": "./dist-test",
    "declaration": false,
    "sourceMap": true,
    
    /* Allow some flexibility in tests */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    
    /* Test frameworks need these */
    "types": ["vitest/globals", "node"]
  },
  "include": [
    "src/**/*",
    "tests/**/*"
  ]
}
```

**Usage:**
```bash
npm test  # Vitest uses this
# Script: "test": "vitest --config vitest.config.ts"
```

**Why These Settings?**
- ✅ `declaration: false` - Tests don't need .d.ts files
- ✅ `noUnusedLocals: false` - Test helpers might be unused
- ✅ `types: ["vitest/globals"]` - Test framework globals
- ✅ Includes both src and tests

---

## 📁 File 4: tsconfig.examples.json (Demo Code)

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    /* Example-specific */
    "outDir": "./dist-examples",
    "declaration": false,
    
    /* More relaxed for demos */
    "strict": false,
    "noUnusedLocals": false
  },
  "include": ["examples/**/*"]
}
```

**Usage:**
```bash
npm run examples  # Compile examples
# Script: "examples": "tsc -p tsconfig.examples.json"
```

**Why These Settings?**
- ✅ `strict: false` - Examples focus on clarity, not strictness
- ✅ Separate output directory
- ✅ Only compiles examples/

---

## 🎯 Real WhatsApp SDK Structure

```
whatsapp-sdk/
├── src/                      # Library source
├── tests/                    # Test files
├── examples/                 # Demo code
├── tsconfig.json            # Base config
├── tsconfig.build.json      # Production build
├── tsconfig.test.json       # Tests
├── tsconfig.examples.json   # Examples
└── package.json
```

---

## 📦 package.json Scripts

```json
{
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "test": "vitest",
    "dev": "tsc -p tsconfig.build.json --watch",
    "examples": "tsx examples/basic-usage.ts",
    "clean": "rm -rf dist dist-test dist-examples"
  }
}
```

---

## 🔑 Key Concept: `extends`

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist"  // Overrides base config
  }
}
```

**How It Works:**
1. Loads all settings from `tsconfig.json`
2. Merges/overrides with local settings
3. If conflict, local settings win

---

## 💡 Advanced Pattern: Shared Configs

For monorepos or multiple packages:

```
configs/
├── tsconfig.base.json       # Shared across all
├── tsconfig.library.json    # For libraries
└── tsconfig.app.json        # For applications

packages/
├── whatsapp-sdk/
│   └── tsconfig.json        # extends ../../configs/tsconfig.library.json
└── admin-dashboard/
    └── tsconfig.json        # extends ../../configs/tsconfig.app.json
```

---

## ✅ When To Use Multiple Configs

Use multiple configs when:
- ✅ Library + Tests have different needs
- ✅ You have examples/demos
- ✅ Different strictness levels needed
- ✅ Different output directories
- ✅ Monorepo structure

Use single config when:
- ❌ Small project (<10 files)
- ❌ No tests yet
- ❌ Simple structure

---

## 🎓 Summary

**Base Config (`tsconfig.json`):**
- Shared settings for entire project
- Path mappings, basic compiler options

**Build Config (`tsconfig.build.json`):**
- Production library compilation
- Strict mode, type generation, source maps
- Excludes tests and examples

**Test Config (`tsconfig.test.json`):**
- Test file compilation
- Includes test framework types
- More relaxed rules for test utilities

**Examples Config (`tsconfig.examples.json`):**
- Demo code compilation
- Relaxed strictness for clarity
- Separate output directory

**Key Benefit:** Same codebase, different compilation rules for different contexts! 🚀
