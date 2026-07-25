/**
 * Example 1: Bad vs Good Project Structure
 * Comparing messy and organized codebases
 */

// ============================================
// ❌ BAD: Monolithic Structure
// ============================================

/**
 * Everything in one file - 800 lines!
 */

// src/everything.ts

// Types (mixed with code)
interface User { id: string; name: string; }
interface Message { id: string; text: string; }
interface Media { id: string; url: string; }

// Errors (random placement)
class APIError extends Error {}
class ValidationError extends Error {}

// Utilities (no organization)
function validatePhone(phone: string) { return true; }
function formatPhone(phone: string) { return phone; }
function validateEmail(email: string) { return true; }
function retry(fn: Function) { /* retry logic */ }

// HTTP stuff
class HttpClient {
  async get(url: string) { }
  async post(url: string, data: any) { }
}

// Services (all in one place)
class MessageService {
  async send(to: string, text: string) { }
  async delete(id: string) { }
}

class MediaService {
  async upload(file: Buffer) { }
}

class UserService {
  async getUser(id: string) { }
}

// Main client
export class WhatsAppClient {
  // Everything coupled together
}

/**
 * PROBLEMS with this approach:
 *
 * 1. Hard to find anything
 *    - "Where's the message validation?" - Search entire 800-line file
 *
 * 2. No clear responsibility
 *    - One file does everything - violates Single Responsibility Principle
 *
 * 3. Testing nightmare
 *    - Can't test MessageService without importing entire file
 *    - Mock setup is complex
 *
 * 4. Merge conflicts
 *    - 5 developers editing same file = constant conflicts
 *
 * 5. No separation of public vs internal
 *    - Users can import HttpClient (should be internal!)
 *
 * 6. Can't scale
 *    - Adding features makes file even longer
 *    - Eventually unmaintainable
 */

// ============================================
// ✅ GOOD: Organized Structure
// ============================================

/**
 * Well-organized SDK structure
 */

/*
whatsapp-sdk/
├── src/
│   ├── client/                    # Main client
│   │   ├── WhatsAppClient.ts      # 50 lines - focused
│   │   └── index.ts               # Barrel export
│   ├── services/                  # Business logic
│   │   ├── messages/
│   │   │   ├── MessageService.ts  # 80 lines - one responsibility
│   │   │   ├── MessageValidator.ts
│   │   │   └── index.ts
│   │   ├── media/
│   │   │   ├── MediaService.ts
│   │   │   └── index.ts
│   │   └── index.ts               # Service barrel
│   ├── api/                       # HTTP layer (internal)
│   │   ├── http/
│   │   │   ├── HttpClient.ts
│   │   │   └── index.ts
│   │   └── endpoints/
│   │       ├── messages.ts
│   │       └── media.ts
│   ├── types/                     # Type definitions
│   │   ├── client.ts
│   │   ├── messages.ts
│   │   ├── media.ts
│   │   └── index.ts
│   ├── errors/                    # Error classes
│   │   ├── APIError.ts
│   │   ├── ValidationError.ts
│   │   └── index.ts
│   ├── utils/                     # Utilities
│   │   ├── validators.ts
│   │   ├── formatters.ts
│   │   └── index.ts
│   └── index.ts                   # Public API
├── tests/                         # Tests mirror src/
│   ├── unit/
│   │   ├── services/
│   │   │   └── messages/
│   │   │       └── MessageService.test.ts
│   │   └── utils/
│   │       └── validators.test.ts
│   └── integration/
│       └── api/
└── package.json
*/

// ============================================
// BENEFITS of Good Structure
// ============================================

/**
 * 1. Easy to find code
 */
// Need MessageService? → src/services/messages/MessageService.ts
// Need phone validator? → src/utils/validators.ts
// Clear, predictable locations!

/**
 * 2. Clear responsibility
 */
// MessageService.ts: Only message-related logic (80 lines)
// HttpClient.ts: Only HTTP communication (100 lines)
// Each file has ONE job

/**
 * 3. Easy to test
 */
/*
// Mock just what you need
import { MessageService } from '@sdk/services/messages';

// Don't need to import entire SDK
// Don't need to mock unrelated code
*/

/**
 * 4. No merge conflicts
 */
// Developer A: Works on MessageService.ts
// Developer B: Works on MediaService.ts
// Different files = no conflicts!

/**
 * 5. Clear public vs internal
 */
/*
// src/index.ts exports ONLY public API
export { WhatsAppClient } from './client';
export { MessageService } from './services/messages';

// HttpClient stays internal - users can't import it
*/

/**
 * 6. Scales perfectly
 */
// Add TemplateService? Create services/templates/
// Add WebhookService? Create services/webhooks/
// Structure stays clean, no refactoring needed

// ============================================
// REAL-WORLD COMPARISON
// ============================================

/**
 * BAD: User trying to find message validation
 */
// Step 1: Open src/everything.ts
// Step 2: Search through 800 lines
// Step 3: Find validateMessage() somewhere in middle
// Step 4: Notice it uses validatePhone() from same file
// Step 5: Scroll to find validatePhone()
// Time wasted: 5 minutes

/**
 * GOOD: User trying to find message validation
 */
// Step 1: Check src/utils/validators.ts
// Step 2: See validateMessage() at line 15
// Time wasted: 30 seconds

/**
 * That's a 10x improvement!
 */

// ============================================
// ORGANIZATION PRINCIPLES
// ============================================

/**
 * 1. Domain-Driven (Not Technical)
 */

// ❌ BAD: Group by technical type
/*
types/
  Message.ts
  Media.ts
  User.ts
services/
  MessageService.ts
  MediaService.ts
  UserService.ts
validators/
  MessageValidator.ts
  MediaValidator.ts
*/

// ✅ GOOD: Group by domain
/*
messages/
  MessageService.ts
  MessageValidator.ts
  types.ts
media/
  MediaService.ts
  types.ts
users/
  UserService.ts
  types.ts
*/

/**
 * 2. Layered Architecture
 */
/*
CLIENT LAYER     → WhatsAppClient (entry point)
    ↓
SERVICE LAYER    → MessageService, MediaService (business logic)
    ↓
API LAYER        → HttpClient, endpoints (HTTP details)
    ↓
UTILITY LAYER    → validators, formatters (shared helpers)
*/

// Top layers use bottom layers, not vice versa!

/**
 * 3. Public vs Internal Separation
 */
/*
PUBLIC (exported from src/index.ts):
- WhatsAppClient
- MessageService
- Types
- Errors

INTERNAL (not exported):
- HttpClient
- Retry logic
- Internal utilities
*/

// ============================================
// MIGRATION PATH: Bad → Good
// ============================================

/**
 * If you have messy codebase:
 *
 * Step 1: Don't rewrite everything at once!
 *         Create new structure alongside old code
 *
 * Step 2: Move one feature at a time
 *         Start with most independent module
 *
 * Step 3: Update imports gradually
 *         Each feature migration is one PR
 *
 * Step 4: Deprecate old exports
 *         Keep backward compatibility temporarily
 *
 * Step 5: Remove old code
 *         After users migrated
 */

/**
 * Example migration:
 */
/*
// Week 1: Create new structure
src/
├── services/
│   └── messages/
│       └── MessageService.ts  (NEW)
└── everything.ts              (OLD - still works)

// Week 2: Deprecate old export
export { MessageService } from './services/messages';
/** @deprecated Use named import instead *\/
export const MessageService_OLD = MessageService;

// Week 3: Users migrate their code
// Old: import { MessageService_OLD } from 'sdk';
// New: import { MessageService } from 'sdk';

// Week 4: Remove old code
// Delete everything.ts, keep only new structure
*/

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Good structure = Easy to navigate
 * ✅ One responsibility per file
 * ✅ Domain-driven organization
 * ✅ Clear layering (client → service → API)
 * ✅ Public vs internal separation
 * ✅ Scales without refactoring
 *
 * ❌ Bad structure = Lost time
 * ❌ Everything in one file
 * ❌ No clear organization
 * ❌ Can't test in isolation
 * ❌ Merge conflicts
 * ❌ Can't scale
 */

export {};
