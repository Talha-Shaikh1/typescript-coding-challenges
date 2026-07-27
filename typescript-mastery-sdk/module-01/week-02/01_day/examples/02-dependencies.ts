// Example 2: Understanding Dependencies
// This file demonstrates the difference between dependencies and devDependencies

/**
 * DEPENDENCIES (Production):
 * These packages are required when your code runs in production
 */

// Example 1: Runtime HTTP client
// If your SDK makes HTTP requests, axios is needed in production
// import axios from 'axios'  // ✅ dependency

// Example 2: Runtime validation
// If you validate data at runtime, zod is needed in production
// import { z } from 'zod'  // ✅ dependency

// Example 3: Environment variables
// If you load .env files at runtime
// import dotenv from 'dotenv'  // ✅ dependency


/**
 * DEV DEPENDENCIES (Development Only):
 * These packages are only needed during development
 */

// Example 1: TypeScript compiler
// TypeScript compiles to JavaScript - not needed in production
// The output JavaScript runs without TypeScript
// ✅ devDependency: typescript

// Example 2: Testing framework
// Tests run during development, not in production
// ✅ devDependency: vitest

// Example 3: Build tools
// Build tools process code during development
// ✅ devDependency: tsup, esbuild

// Example 4: Type definitions
// Type definitions are compile-time only
// ✅ devDependency: @types/node


/**
 * EXAMPLE package.json
 */
const examplePackageJson = {
  "name": "whatsapp-sdk",
  "version": "1.0.0",

  // These are NEEDED in production
  "dependencies": {
    "axios": "^1.6.0",      // Makes HTTP requests at runtime
    "zod": "^3.22.0",       // Validates data at runtime
    "dotenv": "^16.0.0"     // Loads environment variables
  },

  // These are ONLY needed during development
  "devDependencies": {
    "typescript": "^5.0.0",      // Compiles TypeScript
    "vitest": "^1.0.0",          // Runs tests
    "tsup": "^8.0.0",            // Builds the package
    "@types/node": "^20.0.0",    // Type definitions
    "eslint": "^8.0.0",          // Lints code
    "prettier": "^3.0.0"         // Formats code
  }
}

/**
 * INSTALLATION COMMANDS
 */

// Install as production dependency
// npm install axios

// Install as dev dependency
// npm install -D typescript
// npm install --save-dev typescript

/**
 * WHY THIS MATTERS:
 *
 * When someone installs your SDK:
 * npm install @whatsapp-sdk/core
 *
 * Only 'dependencies' are installed, NOT 'devDependencies'
 *
 * This keeps their node_modules smaller and installation faster!
 */

export const dependencyExample = {
  production: "axios, zod, dotenv",
  development: "typescript, vitest, tsup, eslint"
}

console.log("📦 Dependencies categorized correctly!")
console.log("✅ Production:", dependencyExample.production)
console.log("🛠️  Development:", dependencyExample.development)
