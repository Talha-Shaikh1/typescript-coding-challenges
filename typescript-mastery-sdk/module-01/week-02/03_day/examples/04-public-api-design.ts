/**
 * Example 4: Public API Design for SDK
 * How to create a clean, professional SDK entry point
 */

// ============================================
// THE GOAL: Professional SDK Import Experience
// ============================================

/**
 * GOOD SDK (what we want users to do):
 */

/*
import {
  WhatsAppClient,
  MessageService,
  type Message,
  type ClientConfig,
  APIError
} from '@whatsapp-sdk/core';

const client = new WhatsAppClient({ apiKey: 'xxx' });
client.messages.send({ to: '+123', text: 'Hello' });
*/

/**
 * BAD SDK (what we want to prevent):
 */

/*
import { WhatsAppClient } from '@whatsapp-sdk/core/dist/client/WhatsAppClient';
import { MessageService } from '@whatsapp-sdk/core/dist/services/messages/MessageService';
import { HttpClient } from '@whatsapp-sdk/core/dist/internal/http/HttpClient';  // Shouldn't be public!
import type { Message } from '@whatsapp-sdk/core/dist/types/messages';

// Too complex, exposes internal structure, fragile
*/

// ============================================
// STEP 1: Define What's Public vs Internal
// ============================================

/**
 * Project Structure:
 */

/*
src/
├── client/
│   ├── WhatsAppClient.ts          ← PUBLIC
│   └── ClientConfig.ts            ← INTERNAL (implementation detail)
├── services/
│   ├── MessageService.ts          ← PUBLIC
│   ├── MediaService.ts            ← PUBLIC
│   └── internal/
│       └── HttpClient.ts          ← INTERNAL
├── types/
│   ├── public/
│   │   ├── client.ts              ← PUBLIC
│   │   └── messages.ts            ← PUBLIC
│   └── internal/
│       └── http.ts                ← INTERNAL
├── errors/
│   ├── APIError.ts                ← PUBLIC
│   └── InternalError.ts           ← INTERNAL (for our error handling)
├── utils/
│   ├── validators.ts              ← PUBLIC (useful for users)
│   └── internal/
│       └── retry.ts               ← INTERNAL
└── index.ts                       ← SDK ENTRY POINT
*/

/**
 * PUBLIC vs INTERNAL Decision Guide:
 *
 * ✅ PUBLIC (export to users):
 * - Main client class (WhatsAppClient)
 * - Service classes (MessageService, MediaService)
 * - Types users need (Message, ClientConfig)
 * - Errors users might catch (APIError)
 * - Validators users might want (validatePhone)
 *
 * ❌ INTERNAL (keep private):
 * - HTTP client implementation
 * - Retry logic
 * - Internal config helpers
 * - Internal error types
 * - Low-level utilities
 */

// ============================================
// STEP 2: Create Public Type Exports
// ============================================

// types/public/client.ts
export interface ClientConfig {
  apiKey: string;
  apiVersion?: string;
  timeout?: number;
}

export interface ClientOptions {
  retryAttempts?: number;
  logLevel?: 'debug' | 'info' | 'error';
}

// types/public/messages.ts
export interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

export interface SendMessageRequest {
  to: string;
  text: string;
}

export interface MessageResponse {
  messageId: string;
  status: 'sent' | 'delivered' | 'read';
}

// types/public/index.ts - Type barrel
export type { ClientConfig, ClientOptions } from './client';
export type { Message, SendMessageRequest, MessageResponse } from './messages';

// ============================================
// STEP 3: Create Service Exports
// ============================================

// services/MessageService.ts
import type { Message, SendMessageRequest, MessageResponse } from '../types/public';

export class MessageService {
  async send(request: SendMessageRequest): Promise<MessageResponse> {
    // Implementation
    return {
      messageId: 'msg_123',
      status: 'sent'
    };
  }

  async get(messageId: string): Promise<Message> {
    // Implementation
    return {
      id: messageId,
      to: '+123',
      from: '+456',
      text: 'Hello',
      timestamp: Date.now()
    };
  }
}

// services/MediaService.ts
export class MediaService {
  async upload(file: Buffer): Promise<{ mediaId: string }> {
    return { mediaId: 'media_123' };
  }
}

// services/index.ts - Service barrel
export { MessageService } from './MessageService';
export { MediaService } from './MediaService';

// ============================================
// STEP 4: Create Error Exports
// ============================================

// errors/APIError.ts
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errorCode: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// errors/ValidationError.ts
export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// errors/index.ts - Error barrel
export { APIError } from './APIError';
export { ValidationError } from './ValidationError';

// ============================================
// STEP 5: Create Main Client Export
// ============================================

// client/WhatsAppClient.ts
import type { ClientConfig } from '../types/public';
import { MessageService } from '../services/MessageService';
import { MediaService } from '../services/MediaService';

export class WhatsAppClient {
  public readonly messages: MessageService;
  public readonly media: MediaService;

  constructor(private config: ClientConfig) {
    this.messages = new MessageService();
    this.media = new MediaService();
  }

  getConfig(): ClientConfig {
    return { ...this.config };
  }
}

// ============================================
// STEP 6: Create Root Entry Point (Most Important!)
// ============================================

/**
 * src/index.ts - THE SDK PUBLIC API
 *
 * This is what users import from!
 * Be VERY intentional about what goes here.
 */

// ============================================
// WhatsApp SDK - Public API
// Version: 1.0.0
// ============================================

// ----------------
// Main Client
// ----------------
export { WhatsAppClient } from './client/WhatsAppClient';

// ----------------
// Services
// ----------------
export { MessageService, MediaService } from './services';

// ----------------
// Types (type-only exports)
// ----------------
export type {
  // Client types
  ClientConfig,
  ClientOptions,

  // Message types
  Message,
  SendMessageRequest,
  MessageResponse,
} from './types/public';

// ----------------
// Errors
// ----------------
export { APIError, ValidationError } from './errors';

// ----------------
// Utilities (only public-facing ones)
// ----------------
export { validatePhone, validateMessage } from './utils/validators';

// ============================================
// NOT EXPORTED (Internal Implementation):
// ============================================
// - HttpClient (internal HTTP wrapper)
// - retry utilities (internal implementation)
// - ClientConfig helper functions
// - Internal error types
// - Low-level parsers
// ============================================

// ============================================
// STEP 7: Configure package.json
// ============================================

/**
 * package.json exports configuration
 */

const packageJsonExports = {
  "name": "@whatsapp-sdk/core",
  "version": "1.0.0",
  "type": "module",

  // Main entry point
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",

  // Modern exports field (preferred)
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
    // DON'T add other paths - keeps internal modules private
  },

  // Prevent importing from subpaths
  "files": [
    "dist/index.js",
    "dist/index.d.ts"
    // Only ship the compiled entry point
  ]
};

/**
 * WHY THIS WORKS:
 * ✅ Users can ONLY import from '@whatsapp-sdk/core'
 * ✅ Internal modules stay private
 * ✅ Prevents: import {} from '@whatsapp-sdk/core/dist/internal/...'
 */

// ============================================
// REAL-WORLD EXAMPLE: AWS SDK Pattern
// ============================================

/**
 * AWS SDK uses this pattern:
 */

// Good:
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Bad (prevented by exports field):
// import { HttpClient } from '@aws-sdk/client-s3/dist/internal/http';

/**
 * Stripe SDK pattern:
 */

// Good:
// import Stripe from 'stripe';
// const stripe = new Stripe('key');

// They expose a clean default export + types

// ============================================
// TESTING YOUR PUBLIC API
// ============================================

/**
 * Test checklist:
 */

// 1. Can users import the main things?
// import { WhatsAppClient } from '@whatsapp-sdk/core';  ✅

// 2. Are internal modules hidden?
// import { HttpClient } from '@whatsapp-sdk/core/dist/internal/http';  ❌ Should fail

// 3. Do types work?
// import type { Message } from '@whatsapp-sdk/core';  ✅

// 4. Is autocomplete working?
// const client = new WhatsAppClient({ api  ← Should show apiKey

// 5. Can they tree-shake?
// import { MessageService } from '@whatsapp-sdk/core';
// Unused exports should be removed by bundler

// ============================================
// DOCUMENTATION TEMPLATE
// ============================================

/**
 * README.md example for your SDK
 */

const readmeExample = `
# WhatsApp SDK

## Installation

\`\`\`bash
npm install @whatsapp-sdk/core
\`\`\`

## Quick Start

\`\`\`typescript
import { WhatsAppClient } from '@whatsapp-sdk/core';

const client = new WhatsAppClient({
  apiKey: 'your-api-key'
});

await client.messages.send({
  to: '+1234567890',
  text: 'Hello World'
});
\`\`\`

## API Reference

### \`WhatsAppClient\`
Main client class

### \`MessageService\`
Send and manage messages

### Types
\`\`\`typescript
import type { Message, ClientConfig } from '@whatsapp-sdk/core';
\`\`\`

### Errors
\`\`\`typescript
import { APIError, ValidationError } from '@whatsapp-sdk/core';
\`\`\`
`;

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ PUBLIC API DESIGN:
 * 1. Single entry point (src/index.ts)
 * 2. Export only what users need
 * 3. Hide internal implementation
 * 4. Use type-only exports for types
 * 5. Group exports logically
 * 6. Document public API
 *
 * ✅ package.json SETUP:
 * 1. Set "main" and "types"
 * 2. Use "exports" to lock down entry points
 * 3. Limit "files" to compiled entry
 *
 * ✅ BENEFITS:
 * - Clean user experience
 * - Flexible internal refactoring
 * - Clear public API surface
 * - Better tree-shaking
 * - Professional SDK appearance
 *
 * ❌ AVOID:
 * - Exporting internal utilities
 * - Deep import paths
 * - Circular dependencies
 * - Exposing implementation details
 */

export {};
