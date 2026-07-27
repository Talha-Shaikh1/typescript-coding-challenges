/**
 * Example 1: Named Exports vs Default Exports
 * Understanding when to use each pattern
 */

// ============================================
// PATTERN 1: Named Exports (Multiple exports)
// ============================================

/**
 * Use Case: Utility functions
 * When: Multiple related functions in one file
 */

// validators.ts - Named exports
export function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

export function validateMessage(message: string): boolean {
  return message.length > 0 && message.length <= 4096;
}

export function validateMessageId(id: string): boolean {
  return /^[a-zA-Z0-9_-]+$/.test(id);
}

// Constants can also be named exports
export const MAX_MESSAGE_LENGTH = 4096;
export const MIN_PHONE_LENGTH = 10;

/**
 * WHY Named Exports Here?
 * ✅ Multiple utilities in one file
 * ✅ Clear what you're importing
 * ✅ Can import only what you need
 * ✅ Tree-shaking friendly
 */

// Usage:
// import { validatePhone, validateMessage } from './validators';
// import { validatePhone as checkPhone } from './validators';
// import * as Validators from './validators';

// ============================================
// PATTERN 2: Default Export (Single main export)
// ============================================

/**
 * Use Case: Main class of a file
 * When: File is named after the thing it exports
 */

// WhatsAppClient.ts - Default export
export default class WhatsAppClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(to: string, text: string): Promise<void> {
    console.log(`Sending "${text}" to ${to}`);
  }
}

/**
 * WHY Default Export Here?
 * ✅ This IS the file - WhatsAppClient.ts exports WhatsAppClient
 * ✅ There's one clear "main" thing
 * ✅ Users expect: import Client from './WhatsAppClient'
 * ✅ Cleaner for classes that are the star of the file
 */

// Usage:
// import WhatsAppClient from './WhatsAppClient';
// import Client from './WhatsAppClient';  // Can rename freely

// ============================================
// PATTERN 3: Mix Both (Default + Named)
// ============================================

/**
 * Use Case: Main export + helper utilities
 */

// MessageService.ts - Mix both
export default class MessageService {
  async send(text: string): Promise<string> {
    return `Message sent: ${text}`;
  }
}

// Helper function (named export)
export function createMessageService(apiKey: string): MessageService {
  return new MessageService();
}

// Constants (named exports)
export const MESSAGE_STATUS = {
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
} as const;

/**
 * WHY Mix Both?
 * ✅ MessageService is the main thing (default)
 * ✅ createMessageService is a helper (named)
 * ✅ MESSAGE_STATUS is a related constant (named)
 */

// Usage:
// import MessageService, { createMessageService, MESSAGE_STATUS } from './MessageService';

// ============================================
// REAL WHATSAPP SDK EXAMPLE
// ============================================

/**
 * Practical structure for SDK
 */

// src/client/WhatsAppClient.ts
export default class SDKWhatsAppClient {
  constructor(private config: ClientConfig) {}

  // Main client methods
}

export interface ClientConfig {
  apiKey: string;
  apiVersion?: string;
}

export function createClient(apiKey: string): SDKWhatsAppClient {
  return new SDKWhatsAppClient({ apiKey });
}

/**
 * SDK Structure Decision Guide:
 *
 * Default Export:
 * ✅ Main SDK class (WhatsAppClient)
 * ✅ Primary service class (MessageService)
 * ✅ Main function of a module
 *
 * Named Export:
 * ✅ Utility functions (validatePhone)
 * ✅ Helper functions (createClient)
 * ✅ Types and interfaces
 * ✅ Constants
 * ✅ Multiple related functions
 */

// ============================================
// ANTI-PATTERNS (Don't Do This!)
// ============================================

/**
 * ❌ BAD: Default export for utilities
 */

// Don't do this:
// export default {
//   validatePhone,
//   validateMessage,
//   validateMessageId
// };
// Why bad? Forces users to import entire object

/**
 * ❌ BAD: Named export when there's only one thing
 */

// If your file ONLY exports WhatsAppClient, default is cleaner:
// export { WhatsAppClient };  // ❌ Unnecessary ceremony
// export default WhatsAppClient;  // ✅ Better

/**
 * ❌ BAD: Too many default exports in SDK
 */

// Don't make everything default - mix is hard:
// import Client from './client';
// import Service from './service';
// import Validator from './validator';
// What are these? Names don't tell you!

// Better:
// import { WhatsAppClient, MessageService, validatePhone } from './sdk';

// ============================================
// DECISION FLOWCHART
// ============================================

/**
 * Use Default Export When:
 * - File has ONE main thing
 * - File is named after the export
 * - It's a class that represents the module
 * - Example: WhatsAppClient.ts exports WhatsAppClient
 *
 * Use Named Exports When:
 * - Multiple utilities
 * - Helper functions
 * - Types and interfaces
 * - Constants
 * - When tree-shaking matters
 *
 * Mix Both When:
 * - Main class/function (default)
 * - Plus helpers and constants (named)
 * - Example: MessageService + createMessageService + constants
 */

// ============================================
// SUMMARY
// ============================================

/**
 * KEY TAKEAWAYS:
 *
 * ✅ Named exports = Multiple things, clear imports, tree-shakeable
 * ✅ Default export = One main thing, cleaner for primary exports
 * ✅ Mix = Best of both (main + helpers)
 *
 * For WhatsApp SDK:
 * - WhatsAppClient: Default (it's THE client)
 * - Services: Default (main service class) + named helpers
 * - Utilities: Named (multiple functions)
 * - Types: Named (always)
 * - Constants: Named (always)
 */

export {};
