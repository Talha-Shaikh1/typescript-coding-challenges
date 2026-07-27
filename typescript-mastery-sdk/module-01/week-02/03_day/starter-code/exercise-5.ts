/**
 * Exercise 5: Design SDK Public API
 * Create a professional entry point for WhatsApp SDK
 */

// ============================================
// YOUR TASK: Create src/index.ts
// ============================================

/**
 * Given this SDK structure, design the public API:
 *
 * src/
 * ├── client/
 * │   ├── WhatsAppClient.ts       ← PUBLIC
 * │   └── ClientConfig.ts         ← INTERNAL
 * ├── services/
 * │   ├── MessageService.ts       ← PUBLIC
 * │   ├── MediaService.ts         ← PUBLIC
 * │   └── internal/
 * │       └── HttpClient.ts       ← INTERNAL (keep private!)
 * ├── types/
 * │   ├── client.ts               ← PUBLIC
 * │   ├── messages.ts             ← PUBLIC
 * │   └── internal.ts             ← INTERNAL (keep private!)
 * ├── errors/
 * │   ├── APIError.ts             ← PUBLIC
 * │   └── InternalError.ts        ← INTERNAL
 * ├── utils/
 * │   ├── validators.ts           ← PUBLIC
 * │   └── internal/
 * │       └── retry.ts            ← INTERNAL
 * └── index.ts                    ← YOU CREATE THIS!
 */

// ============================================
// TODO: Create the Public API (index.ts)
// ============================================

// Step 1: Export client
// TODO: Export WhatsAppClient
// DON'T export ClientConfig (it's internal)

// Step 2: Export services
// TODO: Export MessageService and MediaService
// DON'T export HttpClient (it's internal)

// Step 3: Export types (type-only)
// TODO: Export Message, ClientConfig types
// DON'T export internal types

// Step 4: Export errors
// TODO: Export APIError
// DON'T export InternalError

// Step 5: Export public utilities
// TODO: Export validators
// DON'T export retry utilities

// ============================================
// EXPECTED USER EXPERIENCE
// ============================================

/**
 * Users should be able to:
 *
 * import {
 *   WhatsAppClient,
 *   MessageService,
 *   MediaService,
 *   type Message,
 *   type ClientConfig,
 *   APIError,
 *   validatePhone
 * } from '@whatsapp-sdk/core';
 *
 *
 * Users should NOT be able to:
 *
 * import { HttpClient } from '@whatsapp-sdk/core';  // ❌ Internal
 * import { InternalError } from '@whatsapp-sdk/core';  // ❌ Internal
 * import { retry } from '@whatsapp-sdk/core';  // ❌ Internal
 */

// ============================================
// YOUR IMPLEMENTATION HERE
// ============================================

// TODO: Write the complete src/index.ts exports

// ============================================
// BONUS: package.json Configuration
// ============================================

/**
 * TODO: What should package.json look like?
 *
 * Write the exports field to prevent users from importing internal modules:
 *
 * {
 *   "name": "@whatsapp-sdk/core",
 *   "main": "???",
 *   "types": "???",
 *   "exports": {
 *     ".": {
 *       "import": "???",
 *       "types": "???"
 *     }
 *   }
 * }
 */

export {};
