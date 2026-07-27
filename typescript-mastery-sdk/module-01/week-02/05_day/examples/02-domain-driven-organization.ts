/**
 * Example 2: Domain-Driven Structure
 * Organizing by feature/domain, not file type
 */

// ============================================
// ❌ BAD: Technical Organization
// ============================================

/**
 * Grouping by file type (controllers, models, services, etc.)
 */

/*
src/
├── controllers/
│   ├── MessageController.ts
│   ├── MediaController.ts
│   └── UserController.ts
├── models/
│   ├── Message.ts
│   ├── Media.ts
│   └── User.ts
├── services/
│   ├── MessageService.ts
│   ├── MediaService.ts
│   └── UserService.ts
├── validators/
│   ├── MessageValidator.ts
│   ├── MediaValidator.ts
│   └── UserValidator.ts
└── types/
    ├── MessageTypes.ts
    ├── MediaTypes.ts
    └── UserTypes.ts
*/

/**
 * PROBLEMS:
 *
 * 1. Related code is scattered
 *    To work on "messages", you need to open 5 different folders
 *
 * 2. Hard to understand boundaries
 *    Which files belong to which feature?
 *
 * 3. Difficult to delete features
 *    Remove "media"? Need to find and delete files from 5 places
 *
 * 4. No clear feature ownership
 *    Who owns "messages"? Code is spread everywhere
 *
 * 5. Can't extract to microservice
 *    Can't isolate one feature cleanly
 */

// ============================================
// ✅ GOOD: Domain-Driven Organization
// ============================================

/**
 * Grouping by business domain/feature
 */

/*
src/
├── messages/                     # Everything message-related
│   ├── MessageService.ts         # Business logic
│   ├── MessageValidator.ts       # Validation
│   ├── types.ts                  # Message types
│   ├── endpoints.ts              # API endpoints
│   └── index.ts                  # Barrel export
├── media/                        # Everything media-related
│   ├── MediaService.ts
│   ├── MediaUploader.ts
│   ├── types.ts
│   ├── endpoints.ts
│   └── index.ts
├── users/                        # Everything user-related
│   ├── UserService.ts
│   ├── types.ts
│   └── index.ts
├── shared/                       # Shared utilities
│   ├── http/
│   │   └── HttpClient.ts
│   └── errors/
│       └── APIError.ts
└── index.ts                      # Public API
*/

/**
 * BENEFITS:
 *
 * 1. Feature cohesion
 *    Everything for "messages" is in one folder
 *
 * 2. Clear boundaries
 *    messages/ folder = message feature
 *
 * 3. Easy to delete
 *    Remove media feature? Delete media/ folder. Done!
 *
 * 4. Clear ownership
 *    Team A owns messages/, Team B owns media/
 *
 * 5. Microservice-ready
 *    Can extract messages/ to separate service easily
 */

// ============================================
// REAL SDK EXAMPLE: WhatsApp
// ============================================

/**
 * Domain-driven structure for WhatsApp SDK
 */

// messages/MessageService.ts
export class MessageService {
  async send(to: string, text: string): Promise<Message> {
    // All message logic in one place
  }

  async delete(messageId: string): Promise<void> {
    // Delete message
  }

  async get(messageId: string): Promise<Message> {
    // Get message
  }
}

// messages/MessageValidator.ts
export class MessageValidator {
  static validatePhone(phone: string): boolean {
    return /^\+\d{10,15}$/.test(phone);
  }

  static validateText(text: string): boolean {
    return text.length > 0 && text.length <= 4096;
  }
}

// messages/types.ts
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

// messages/index.ts (barrel)
export { MessageService } from './MessageService';
export { MessageValidator } from './MessageValidator';
export type { Message, SendMessageRequest } from './types';

// ============================================
// WORKING WITH MESSAGES FEATURE
// ============================================

/**
 * Technical organization: Need to open 5 files
 */
// services/MessageService.ts
// validators/MessageValidator.ts
// types/MessageTypes.ts
// controllers/MessageController.ts
// models/Message.ts

/**
 * Domain organization: Everything in one place
 */
// messages/
//   ├── MessageService.ts      ← Business logic
//   ├── MessageValidator.ts    ← Validation
//   ├── types.ts               ← Types
//   ├── endpoints.ts           ← API
//   └── index.ts               ← Exports

// All message code in one folder!

// ============================================
// WHEN TO USE DOMAIN-DRIVEN
// ============================================

/**
 * ✅ USE domain-driven when:
 */

// 1. Building features/modules
// Example: messages, media, templates, webhooks

// 2. Features have clear boundaries
// Example: Messages don't depend on Media logic

// 3. Want to scale team
// Example: Team A owns messages/, Team B owns media/

// 4. Might extract to microservices
// Example: Each domain could become separate service

/**
 * ❌ DON'T use domain-driven when:
 */

// 1. Very small project (<5 files)
// Overhead not worth it

// 2. No clear domain boundaries
// Everything depends on everything

// 3. Single developer
// Less important, but still good practice

// ============================================
// MIXED APPROACH: Hybrid Structure
// ============================================

/**
 * For SDKs: Mix domain-driven with layered
 */

/*
src/
├── client/                    # Entry point (layer)
│   └── WhatsAppClient.ts
├── services/                  # Business logic (layer + domains)
│   ├── messages/              # Domain
│   │   ├── MessageService.ts
│   │   └── types.ts
│   ├── media/                 # Domain
│   │   ├── MediaService.ts
│   │   └── types.ts
│   └── index.ts
├── api/                       # HTTP layer (layer)
│   ├── http/
│   │   └── HttpClient.ts
│   └── endpoints/
│       ├── messages.ts        # Domain endpoint
│       └── media.ts           # Domain endpoint
├── types/                     # Shared types (layer)
│   ├── client.ts
│   └── common.ts
└── utils/                     # Utilities (layer)
    └── validators.ts
*/

/**
 * This combines:
 * - Layered architecture (client → services → API)
 * - Domain-driven (messages, media as domains)
 */

// ============================================
// PRACTICAL COMPARISON
// ============================================

/**
 * Scenario: Add new message format (rich text)
 */

// Technical organization:
// 1. Update MessageTypes.ts (in types/)
// 2. Update MessageService.ts (in services/)
// 3. Update MessageValidator.ts (in validators/)
// 4. Update MessageController.ts (in controllers/)
// Files touched: 4 folders, 4 files

// Domain organization:
// 1. Update messages/types.ts
// 2. Update messages/MessageService.ts
// 3. Update messages/MessageValidator.ts
// Files touched: 1 folder, 3 files

// Easier to review, easier to test!

// ============================================
// FEATURE DELETION EXAMPLE
// ============================================

/**
 * Delete "templates" feature
 */

// Technical organization:
// git rm services/TemplateService.ts
// git rm validators/TemplateValidator.ts
// git rm types/TemplateTypes.ts
// git rm controllers/TemplateController.ts
// git rm models/Template.ts
// Update 5 different index.ts files
// Check for dependencies in 10+ files

// Domain organization:
// git rm -rf templates/
// Update src/index.ts
// Done!

// ============================================
// TEAM OWNERSHIP
// ============================================

/**
 * With domain structure, clear ownership:
 */

const teamOwnership = {
  "messages/": "Team A",
  "media/": "Team B",
  "templates/": "Team C",
  "webhooks/": "Team A",
  "shared/": "Platform Team"
};

/**
 * Benefits:
 * - Clear responsibility
 * - Fewer merge conflicts
 * - Faster reviews (team experts)
 * - Better code quality (ownership pride)
 */

// ============================================
// SCALABILITY: EXTRACT TO MICROSERVICE
// ============================================

/**
 * If messages/ grows too large, extract it:
 */

// Before: Monolithic SDK
/*
whatsapp-sdk/
└── src/
    ├── messages/
    ├── media/
    └── templates/
*/

// After: Microservices
/*
whatsapp-messages-service/       # Extracted!
└── src/
    └── (everything from messages/)

whatsapp-sdk/                    # Core SDK
└── src/
    ├── media/
    └── templates/
*/

// Domain structure makes extraction clean!

// ============================================
// KEY PRINCIPLES
// ============================================

/**
 * 1. Organize by WHAT, not HOW
 *    - WHAT: messages, media, users (domain)
 *    - HOW: services, validators, types (technical)
 *
 * 2. Colocation over separation
 *    - Keep related code together
 *    - Don't spread feature across folders
 *
 * 3. Feature independence
 *    - messages/ shouldn't depend on media/
 *    - Shared code goes in shared/
 *
 * 4. Easy to delete
 *    - Remove feature = Delete one folder
 *    - If hard to delete, organization is wrong
 */

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Domain-driven = Group by feature/domain
 * ✅ Everything for "messages" in messages/ folder
 * ✅ Clear boundaries and ownership
 * ✅ Easy to delete features
 * ✅ Scales to teams and microservices
 *
 * ❌ Technical organization = Spread across folders
 * ❌ Hard to understand feature boundaries
 * ❌ Difficult to delete features
 * ❌ No clear ownership
 * ❌ Can't scale easily
 */

export {};
