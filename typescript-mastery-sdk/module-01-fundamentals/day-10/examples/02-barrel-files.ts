/**
 * Example 2: Barrel Files (Index Pattern)
 * Clean API design using index.ts files
 */

// ============================================
// THE PROBLEM: Deep Import Paths
// ============================================

/**
 * Without barrel files, users need to know internal structure:
 */

/*
// Ugly imports - internal structure exposed:
import { MessageService } from './services/messages/MessageService';
import { MediaService } from './services/media/MediaService';
import { TemplateService } from './services/templates/TemplateService';
import { validatePhone } from './utils/validators/phone';
import { formatMessage } from './utils/formatters/message';

// PROBLEMS:
// ❌ Long paths
// ❌ Internal structure exposed (if we refactor, imports break)
// ❌ Users need to know where everything is
// ❌ Lots of import statements
*/

// ============================================
// THE SOLUTION: Barrel Files
// ============================================

/**
 * Barrel = index.ts that re-exports from subfolder
 */

// services/messages/MessageService.ts
export class MessageService {
  async send(text: string): Promise<void> {
    console.log(`Sending: ${text}`);
  }
}

// services/messages/MessageValidator.ts
export function validateMessage(text: string): boolean {
  return text.length > 0 && text.length <= 4096;
}

// services/messages/index.ts ← BARREL FILE
export { MessageService } from './MessageService';
export { validateMessage } from './MessageValidator';

// Now users can import from the folder:
// import { MessageService, validateMessage } from './services/messages';

// ============================================
// FULL SDK BARREL STRUCTURE
// ============================================

/**
 * Real WhatsApp SDK structure with barrels
 */

// Structure:
/*
src/
├── services/
│   ├── messages/
│   │   ├── MessageService.ts
│   │   ├── MessageValidator.ts
│   │   └── index.ts  ← Barrel
│   ├── media/
│   │   ├── MediaService.ts
│   │   ├── MediaUploader.ts
│   │   └── index.ts  ← Barrel
│   └── index.ts  ← Main services barrel
├── types/
│   ├── client.ts
│   ├── messages.ts
│   └── index.ts  ← Types barrel
└── index.ts  ← SDK entry point (root barrel)
*/

// ============================================
// STEP 1: Sub-folder Barrels
// ============================================

// services/messages/index.ts
export { MessageService } from './MessageService';
export { validateMessage } from './MessageValidator';
export type { Message, MessageResponse } from './types';

// services/media/index.ts
export { MediaService } from './MediaService';
export { MediaUploader } from './MediaUploader';
export type { Media, UploadResponse } from './types';

// ============================================
// STEP 2: Domain-level Barrel
// ============================================

// services/index.ts - Re-exports from all service subfolders
export * from './messages';
export * from './media';

// Or explicit (better for documentation):
export {
  MessageService,
  validateMessage,
  type Message,
  type MessageResponse
} from './messages';

export {
  MediaService,
  MediaUploader,
  type Media,
  type UploadResponse
} from './media';

// ============================================
// STEP 3: Root Barrel (SDK Entry Point)
// ============================================

// src/index.ts - Main SDK export
// This is what users import from!

export { WhatsAppClient } from './client/WhatsAppClient';

// Re-export all services
export {
  MessageService,
  MediaService,
  validateMessage,
  type Message,
  type Media
} from './services';

// Export types (type-only)
export type { ClientConfig } from './types';

// Export errors
export { APIError, ValidationError } from './errors';

// DON'T export internal utilities
// Keep HttpClient, retry logic, etc. private

// ============================================
// USER EXPERIENCE: Before vs After
// ============================================

/**
 * BEFORE (without barrels):
 */
/*
import { WhatsAppClient } from '@whatsapp-sdk/core/dist/client/WhatsAppClient';
import { MessageService } from '@whatsapp-sdk/core/dist/services/messages/MessageService';
import { MediaService } from '@whatsapp-sdk/core/dist/services/media/MediaService';
import { APIError } from '@whatsapp-sdk/core/dist/errors/APIError';
import type { Message } from '@whatsapp-sdk/core/dist/types/messages';
*/

/**
 * AFTER (with barrels):
 */
/*
import {
  WhatsAppClient,
  MessageService,
  MediaService,
  APIError,
  type Message
} from '@whatsapp-sdk/core';
*/

// ============================================
// BARREL PATTERNS
// ============================================

/**
 * Pattern 1: Export * (convenience)
 */

// services/index.ts
export * from './messages';
export * from './media';

// ✅ Quick and easy
// ❌ No control over what's exported
// ❌ Name collisions possible
// ❌ Harder to track what's public

/**
 * Pattern 2: Explicit exports (recommended)
 */

// services/index.ts
export { MessageService } from './messages';
export { MediaService } from './media';
export type { Message, Media } from './messages';

// ✅ Clear what's public
// ✅ No accidental exports
// ✅ Better for documentation
// ✅ Easier refactoring

/**
 * Pattern 3: Grouped re-exports
 */

// index.ts
export {
  // Client
  WhatsAppClient,
  type ClientConfig,

  // Services
  MessageService,
  MediaService,

  // Errors
  APIError,
  ValidationError,

  // Types
  type Message,
  type Media
} from './internal';

// ✅ Organized by category
// ✅ Easy to see entire API
// ✅ Good documentation

// ============================================
// COMMON MISTAKES
// ============================================

/**
 * ❌ MISTAKE 1: Barrel Everything
 */

// DON'T do this:
// src/index.ts
// export * from './utils';  // 50 internal utilities!
// export * from './internal';  // Private implementation!

// Users get confused with too many exports
// Internal utilities leak out

/**
 * ❌ MISTAKE 2: Circular Barrel Dependencies
 */

// services/index.ts
// export * from './messages';  // imports from ./media
// export * from './media';     // imports from ./messages
// Result: Circular dependency!

/**
 * ❌ MISTAKE 3: Deep Barrel Chains
 */

// Too many levels:
// a/index.ts → b/index.ts → c/index.ts → d/actual-code.ts
// Slows down bundlers, hard to trace

// Better: Flatten structure or use explicit paths

// ============================================
// BEST PRACTICES
// ============================================

/**
 * ✅ DO:
 */

// 1. Use barrels for public API
export { MessageService } from './services';

// 2. Keep internal utilities private
// DON'T export HttpClient, retry logic, etc.

// 3. Document what's public
/**
 * Public API for WhatsApp SDK
 * @public
 */
export { WhatsAppClient } from './client';

// 4. Use type-only exports for types
export type { Message, ClientConfig } from './types';

// 5. Group related exports
export {
  // Main client
  WhatsAppClient,

  // Services
  MessageService,
  MediaService
} from './internal';

/**
 * ❌ DON'T:
 */

// 1. Don't export everything with *
// export * from './utils';  // Too much!

// 2. Don't create deep barrel chains
// index → barrel → barrel → barrel → code

// 3. Don't mix public and internal
// export { HttpClient } from './internal/http';  // Keep private!

// ============================================
// REAL SDK EXAMPLE: FINAL STRUCTURE
// ============================================

/**
 * Production-ready WhatsApp SDK barrel structure
 */

// src/index.ts (Root barrel - SDK entry point)
/*
// ============================================
// WhatsApp SDK - Public API
// ============================================

// Main Client
export { WhatsAppClient } from './client/WhatsAppClient';
export type { ClientConfig } from './client/types';

// Services
export { MessageService } from './services/messages';
export { MediaService } from './services/media';
export { TemplateService } from './services/templates';

// Types (type-only exports)
export type {
  Message,
  MessageResponse,
  MessageStatus
} from './types/messages';

export type {
  Media,
  MediaType,
  UploadResponse
} from './types/media';

// Errors
export {
  APIError,
  ValidationError,
  NetworkError
} from './errors';

// Public utilities only
export { validatePhone, validateMessage } from './utils/validators';

// ============================================
// Internal modules NOT exported:
// - HttpClient (internal implementation)
// - retry utilities (internal implementation)
// - Internal types (not part of public API)
// ============================================
*/

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Barrels provide clean public APIs
 * ✅ Hide internal structure
 * ✅ Single import statement for users
 * ✅ Easy refactoring (change internals, keep exports)
 *
 * Best Practices:
 * ✅ Use explicit exports (not export *)
 * ✅ Keep internal utilities private
 * ✅ Document public API
 * ✅ Use type-only exports for types
 *
 * Avoid:
 * ❌ Exporting everything
 * ❌ Circular dependencies
 * ❌ Deep barrel chains
 * ❌ Mixing public and internal
 */

export {};
