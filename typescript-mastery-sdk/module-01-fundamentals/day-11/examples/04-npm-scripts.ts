/**
 * Example 4: npm Build Scripts Workflow
 * Professional build pipeline for WhatsApp SDK
 */

// ============================================
// THE GOAL: Complete Build Workflow
// ============================================

/**
 * A professional SDK needs multiple build workflows:
 *
 * 1. Development - Fast feedback while coding
 * 2. Type checking - Validate types without output
 * 3. Production build - Optimized for publishing
 * 4. Clean - Remove old artifacts
 * 5. Pre-publish - Verify before npm publish
 */

// ============================================
// PACKAGE.JSON SCRIPTS
// ============================================

/**
 * Complete npm scripts for WhatsApp SDK
 */
const packageJson = {
  "name": "@whatsapp-sdk/core",
  "version": "1.0.0",
  "scripts": {
    // ============================================
    // DEVELOPMENT SCRIPTS
    // ============================================

    "dev": "tsc --watch",
    // WHY: Watch for file changes and recompile
    // WHEN: Active development
    // OUTPUT: Incremental builds to dist/

    "dev:clean": "npm run clean && npm run dev",
    // WHY: Fresh start for development
    // WHEN: After pulling new code or switching branches

    // ============================================
    // TYPE CHECKING (No output files)
    // ============================================

    "typecheck": "tsc --noEmit",
    // WHY: Validate types without generating files
    // WHEN: CI/CD pipelines, pre-commit hooks
    // FAST: No file generation = faster than full build

    "typecheck:watch": "tsc --noEmit --watch",
    // WHY: Continuous type checking while coding
    // WHEN: Development in another terminal

    // ============================================
    // CLEANING
    // ============================================

    "clean": "rm -rf dist",
    // WHY: Remove old build artifacts
    // WHEN: Before fresh builds
    // PREVENTS: Stale files from previous builds

    "clean:all": "rm -rf dist node_modules package-lock.json",
    // WHY: Nuclear option - reset everything
    // WHEN: Dependency issues, fresh install needed

    // ============================================
    // BUILDING
    // ============================================

    "build": "npm run clean && tsc",
    // WHY: Full production build
    // WHEN: Preparing for npm publish
    // OUTPUT: dist/ with .js, .d.ts, .map files

    "build:fast": "tsc",
    // WHY: Skip clean for faster builds
    // WHEN: Quick local testing

    "prebuild": "npm run typecheck",
    // WHY: Type check before building (npm lifecycle hook)
    // WHEN: Automatically runs before "npm run build"
    // PREVENTS: Building code with type errors

    // ============================================
    // TESTING
    // ============================================

    "test": "vitest",
    // WHY: Run tests
    // WHEN: Before committing, in CI/CD

    "test:coverage": "vitest --coverage",
    // WHY: Check test coverage
    // WHEN: Ensuring code quality

    "pretest": "npm run typecheck",
    // WHY: Don't run tests if types are broken

    // ============================================
    // PRE-PUBLISH VALIDATION
    // ============================================

    "prepublishOnly": "npm run build && npm run test",
    // WHY: Final checks before publishing to npm
    // WHEN: Automatically runs on "npm publish"
    // PREVENTS: Publishing broken packages

    "pack:check": "npm pack --dry-run",
    // WHY: See what would be published without actually publishing
    // WHEN: Before npm publish

    // ============================================
    // UTILITIES
    // ============================================

    "format": "prettier --write \"src/**/*.ts\"",
    // WHY: Auto-format code
    // WHEN: Before committing

    "lint": "eslint src/**/*.ts",
    // WHY: Check code quality
    // WHEN: CI/CD, pre-commit

    "lint:fix": "eslint src/**/*.ts --fix",
    // WHY: Auto-fix linting issues

    // ============================================
    // COMPOSITE WORKFLOWS
    // ============================================

    "verify": "npm run typecheck && npm run lint && npm run test",
    // WHY: One command to verify everything
    // WHEN: Before pushing code

    "ci": "npm run verify && npm run build",
    // WHY: Full CI pipeline
    // WHEN: GitHub Actions, GitLab CI

    "prepare": "npm run build",
    // WHY: Build after npm install (for git dependencies)
    // WHEN: Someone installs your SDK from git
  }
};

// ============================================
// SCRIPT EXECUTION ORDER
// ============================================

/**
 * npm lifecycle hooks run automatically:
 */

// npm run build → executes:
// 1. prebuild  (if exists)
// 2. build
// 3. postbuild (if exists)

// npm publish → executes:
// 1. prepublishOnly
// 2. prepare
// 3. publish
// 4. postpublish

// npm install → executes:
// 1. preinstall
// 2. install
// 3. postinstall
// 4. prepare  (only if installing from git)

// ============================================
// REAL WORKFLOWS
// ============================================

/**
 * WORKFLOW 1: Daily Development
 */

// Terminal 1: Watch mode
// $ npm run dev
// Watching for file changes...

// Terminal 2: Type checking
// $ npm run typecheck:watch
// Starting compilation in watch mode...

// Terminal 3: Tests
// $ npm test -- --watch
// Watching for test changes...

// Edit code → Auto-recompile + Auto-test → Fast feedback!

/**
 * WORKFLOW 2: Before Committing
 */

// $ npm run verify
// → Runs typecheck ✓
// → Runs lint ✓
// → Runs tests ✓
// All checks passed!

// $ git commit -m "feat: add message service"

/**
 * WORKFLOW 3: Preparing for Release
 */

// $ npm run clean     // Remove old build
// $ npm run build     // Full production build
// $ npm run pack:check // Verify what will be published
// $ npm publish       // Publish to npm (runs prepublishOnly automatically)

/**
 * WORKFLOW 4: CI/CD Pipeline
 */

// .github/workflows/ci.yml
const githubAction = `
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run ci  # typecheck + lint + test + build
`;

// ============================================
// ADVANCED: PARALLEL SCRIPTS
// ============================================

/**
 * Run multiple scripts concurrently
 */

// Install: npm install --save-dev npm-run-all

const parallelScripts = {
  "scripts": {
    // Run sequentially (one after another)
    "build": "run-s clean compile",  // run-s = run-sequential

    // Run in parallel (simultaneously)
    "watch": "run-p watch:*",  // run-p = run-parallel
    "watch:ts": "tsc --watch",
    "watch:test": "vitest --watch",
    "watch:lint": "eslint --watch src",

    // All watch tasks run simultaneously!
  }
};

// ============================================
// ADVANCED: CROSS-PLATFORM SCRIPTS
// ============================================

/**
 * Problem: rm -rf works on Mac/Linux, not Windows
 */

// ❌ Platform-specific:
const badScripts = {
  "clean": "rm -rf dist"  // Fails on Windows!
};

// ✅ Cross-platform solution:
// Install: npm install --save-dev rimraf

const goodScripts = {
  "clean": "rimraf dist"  // Works everywhere!
};

// Other cross-platform tools:
// - mkdirp (cross-platform mkdir -p)
// - cross-env (cross-platform environment variables)
// - shx (cross-platform shell commands)

// ============================================
// BUILD SCRIPT BEST PRACTICES
// ============================================

/**
 * ✅ DO:
 */

// 1. Use npm lifecycle hooks
const lifecycleHooks = {
  "prebuild": "npm run typecheck",  // Always typecheck before building
  "prepublishOnly": "npm run build && npm run test"  // Safety net
};

// 2. Provide fast and thorough options
const fastAndThorough = {
  "build": "npm run clean && tsc",      // Thorough
  "build:fast": "tsc",                   // Fast
  "verify": "npm run typecheck && npm run lint && npm run test",  // Thorough
  "typecheck": "tsc --noEmit"            // Fast
};

// 3. Use meaningful names
const meaningfulNames = {
  "build": "...",          // ✅ Clear
  "compile": "...",        // ✅ Clear
  "b": "...",              // ❌ Unclear
  "do-stuff": "..."        // ❌ Vague
};

// 4. Document complex scripts
const documentedScripts = {
  // Build for production (clean + compile + test)
  "build": "npm run clean && tsc && npm test",

  // Fast build for local testing (skip clean)
  "build:fast": "tsc"
};

/**
 * ❌ DON'T:
 */

// 1. Don't make scripts too long
const tooLongScript = {
  // ❌ Hard to understand, hard to maintain
  "build": "rm -rf dist && tsc && cp package.json dist && cp README.md dist && npm test && npm run lint"
};

// Better: Break into smaller scripts
const betterScripts = {
  "clean": "rimraf dist",
  "compile": "tsc",
  "copy": "cp package.json dist && cp README.md dist",
  "validate": "npm test && npm run lint",
  "build": "npm run clean && npm run compile && npm run copy && npm run validate"
};

// 2. Don't assume platform
const platformAssumption = {
  "clean": "rm -rf dist",  // ❌ Won't work on Windows
  "clean": "rimraf dist"   // ✅ Works everywhere
};

// 3. Don't skip error handling
const noErrorHandling = {
  "build": "tsc; npm test",  // ❌ Uses ; - continues even if tsc fails
  "build": "tsc && npm test" // ✅ Uses && - stops if tsc fails
};

// ============================================
// DEBUGGING BUILD SCRIPTS
// ============================================

/**
 * Script fails? Debug it:
 */

// 1. Run with verbose output
// npm run build --verbose

// 2. Check what script actually does
// npm run build --dry-run

// 3. Run commands individually
// npm run clean
// npm run compile

// 4. Check npm logs
// cat ~/.npm/_logs/*-debug.log

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Use npm scripts for build workflows
 * ✅ Provide both fast (dev) and thorough (prod) options
 * ✅ Use lifecycle hooks (prebuild, prepublishOnly)
 * ✅ Make scripts cross-platform (rimraf, not rm)
 * ✅ Break complex scripts into smaller ones
 * ✅ Document non-obvious scripts
 * ✅ Use && to stop on errors
 * ✅ Provide composite scripts (verify = typecheck + lint + test)
 */

export {};
