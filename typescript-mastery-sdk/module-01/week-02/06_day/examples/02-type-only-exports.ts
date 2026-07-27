/**
 * Example 2: Type-Only Exports (export type)
 * Understanding when and why to use export type
 */

// ============================================
// THE PROBLEM: Unnecessary Bundling
// ============================================

/**
 * Scenario: You have types that are ONLY used at compile-time
 */

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

// ============================================
// APPROACH 1: Regular Export (Suboptimal)
// ============================================

// src/index.ts
export { Message, MessageResponse } from './types/messages';

/**
 * PROBLEM:
 * TypeScript might include these in JavaScript bundle
 * Even though they're compile-time only constructs
 * Result: Slightly larger bundle (minimal impact, but unnecessary)
 */

// ============================================
// APPROACH 2: Type-Only Export (Optimal)
// ============================================

// src/index.ts
export type { Message, MessageResponse } from './types/messages';

/**
 * BENEFITS:
 * ✅ Explicitly marks as compile-time only
 * ✅ Never included in JavaScript bundle
 * ✅ Prevents accidental value imports
 * ✅ Clearer intent
 */

// ============================================
// WHEN TO USE export type
// ============================================

/**
 * ✅ USE export type FOR:
 */

// 1. Interfaces (always type-only)
export type { Message } from './types';

// 2. Type aliases (always type-only)
export type { MessageStatus } from './types';

// 3. Types from type-only modules
export type { ClientConfig } from './types';

/**
 * ❌ DON'T USE export type FOR:
 */

// 1. Classes (have runtime representation)
export { WhatsAppClient } from './client';  // Regular export

// 2. Functions (have runtime representation)
export { validatePhone } from './utils';  // Regular export

// 3. Constants (have runtime values)
export { MAX_MESSAGE_LENGTH } from './constants';  // Regular export

// ============================================
// REAL SDK EXAMPLE: Mixed Exports
// ============================================

// src/index.ts

// ============================================
// RUNTIME EXPORTS (Regular export)
// ============================================

// Main client class
export { WhatsAppClient } from './client/WhatsAppClient';

// Services
export { MessageService } from './services/messages/MessageService';
export { MediaService } from './services/media/MediaService';

// Error classes
export { APIError } from './errors/APIError';
export { ValidationError } from './errors/ValidationError';

// Utility functions
export { validatePhone, validateMessage } from './utils/validators';

// Constants
export { VERSION } from './constants';

// ============================================
// TYPE-ONLY EXPORTS (export type)
// ============================================

// Type definitions
export type {
  Message,
  MessageResponse,
  SendMessageRequest
} from './types/messages';

export type {
  Media,
  MediaType,
  UploadResponse
} from './types/media';

export type {
  ClientConfig,
  ClientOptions
} from './types/client';

// ============================================
// WHY THIS PATTERN MATTERS
// ============================================

/**
 * Clarity for developers:
 */

// Looking at imports, clear what's runtime vs compile-time:
// import { WhatsAppClient } from '@sdk';  // Runtime class
// import type { Message } from '@sdk';    // Compile-time type

/**
 * Bundle size optimization:
 */

// Types are guaranteed NOT in JavaScript bundle
// Only runtime code shipped

/**
 * Prevents circular dependency issues:
 */

// Type-only imports don't create runtime circular dependencies
import type { User } from './user';  // No circular runtime dependency
import type { Post } from './post';

// ============================================
// CONSUMER PERSPECTIVE
// ============================================

/**
 * Users can import both ways:
 */

// Import runtime value
import { WhatsAppClient } from '@whatsapp-sdk/core';
const client = new WhatsAppClient({ apiKey: 'xxx' });

// Import type-only (explicit)
import type { Message } from '@whatsapp-sdk/core';
const msg: Message = { id: '1', to: '+123', text: 'Hi' };

// Import both
import { WhatsAppClient, type Message } from '@whatsapp-sdk/core';

// ============================================
// DECLARATION FILE OUTPUT
// ============================================

/**
 * Both export and export type produce same .d.ts:
 */

// Source:
// export type { Message } from './types';
// OR
// export { Message } from './types';

// Both generate:
// export type { Message } from './types';

/**
 * So why use export type in source?
 *
 * 1. Intent clarity - explicitly type-only
 * 2. Build optimization - TypeScript knows to skip
 * 3. Consistency - match what .d.ts will show
 */

// ============================================
// ADVANCED: Mixing Value and Type Exports
// ============================================

/**
 * Scenario: File exports both value and type
 */

// src/client/WhatsAppClient.ts
export class WhatsAppClient {  // Value export
  // Implementation
}

export interface ClientConfig {  // Type export
  apiKey: string;
}

// src/index.ts - Re-export both:
export { WhatsAppClient } from './client/WhatsAppClient';  // Value
export type { ClientConfig } from './client/WhatsAppClient';  // Type

// Or in one line:
export { WhatsAppClient, type ClientConfig } from './client/WhatsAppClient';

// ============================================
// COMMON MISTAKES
// ============================================

/**
 * ❌ MISTAKE 1: Using export type for classes
 */
// export type { WhatsAppClient } from './client';  // WRONG!
// Classes have runtime representation, use regular export

/**
 * ❌ MISTAKE 2: Using regular export for all types
 */
// export { Message, ClientConfig, MessageStatus } from './types';  // Suboptimal
// These are types only, use export type

/**
 * ❌ MISTAKE 3: Inconsistent usage
 */
// export type { Message } from './types/messages';
// export { ClientConfig } from './types/client';  // Inconsistent!
// Use export type for all type-only exports

// ============================================
// TYPE-ONLY IMPORTS
// ============================================

/**
 * Related concept: import type
 */

// Regular import (value + type)
import { Message } from './types';

// Type-only import
import type { Message } from './types';

/**
 * When to use import type:
 */

// 1. You only use it as a type annotation
import type { User } from './user';
const user: User = { id: '1', name: 'John' };

// 2. Avoid circular dependencies
import type { Post } from './post';  // No runtime circular dep

// 3. Explicit intent
import type { Message } from './types';  // Clear: type-only

// ============================================
// TSCONFIG OPTION: importsNotUsedAsValues
// ============================================

/**
 * Control how TypeScript handles type-only imports
 */

// tsconfig.json
const tsconfigOption = {
  "compilerOptions": {
    "importsNotUsedAsValues": "error"  // Force explicit import type
  }
};

/**
 * Options:
 * - "remove" (default): Removes imports only used as types
 * - "preserve": Keeps all imports (even type-only)
 * - "error": Forces you to use import type for type-only imports
 */

// ============================================
// PRACTICAL CHECKLIST
// ============================================

/**
 * For each export, ask:
 *
 * QUESTION: Does this have runtime representation?
 *
 * YES → Regular export
 * - Classes: export { WhatsAppClient }
 * - Functions: export { validatePhone }
 * - Constants: export { VERSION }
 *
 * NO → Type-only export
 * - Interfaces: export type { Message }
 * - Type aliases: export type { MessageStatus }
 * - Types: export type { ClientConfig }
 */

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ export type = Explicitly type-only
 * ✅ Use for interfaces, type aliases, types
 * ✅ DON'T use for classes, functions, constants
 * ✅ Clearer intent, better optimization
 * ✅ Prevents accidental value imports
 * ✅ Same .d.ts output, better source clarity
 *
 * PATTERN:
 * export { RuntimeThings } from './module';      // Classes, functions, values
 * export type { TypeThings } from './module';   // Interfaces, types
 */

export {};
