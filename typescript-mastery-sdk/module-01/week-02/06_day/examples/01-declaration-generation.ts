/**
 * Example 1: Declaration File Generation
 * Understanding what TypeScript generates
 */

// ============================================
// TYPESCRIPT SOURCE CODE
// ============================================

/**
 * This is what you write (TypeScript)
 */

// 1. Interface (Type-only)
export interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

// 2. Type Alias (Type-only)
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

// 3. Class (Runtime + Types)
export class MessageService {
  private messages: Message[] = [];

  constructor(private apiKey: string) {}

  async send(to: string, text: string): Promise<Message> {
    const message: Message = {
      id: Math.random().toString(),
      to,
      from: '+1234567890',
      text,
      timestamp: Date.now()
    };

    this.messages.push(message);
    return message;
  }

  getAll(): Message[] {
    return [...this.messages];
  }

  private validatePhone(phone: string): boolean {
    return /^\+\d{10,15}$/.test(phone);
  }
}

// 4. Function (Runtime + Types)
export function formatMessage(text: string): string {
  return text.trim().substring(0, 4096);
}

// 5. Const (Runtime + Types)
export const MAX_MESSAGE_LENGTH = 4096;

// ============================================
// COMPILED JAVASCRIPT (dist/example.js)
// ============================================

/**
 * What TypeScript outputs (JavaScript):
 */

/*
export class MessageService {
  messages = [];

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async send(to, text) {
    const message = {
      id: Math.random().toString(),
      to,
      from: '+1234567890',
      text,
      timestamp: Date.now()
    };

    this.messages.push(message);
    return message;
  }

  getAll() {
    return [...this.messages];
  }

  validatePhone(phone) {
    return /^\+\d{10,15}$/.test(phone);
  }
}

export function formatMessage(text) {
  return text.trim().substring(0, 4096);
}

export const MAX_MESSAGE_LENGTH = 4096;
*/

/**
 * NOTICE:
 * ❌ No Message interface
 * ❌ No MessageStatus type
 * ❌ No type annotations (: string, : Promise<Message>)
 * ❌ No private keyword
 * ✅ Only runtime code remains
 */

// ============================================
// DECLARATION FILE (dist/example.d.ts)
// ============================================

/**
 * What TypeScript generates for types:
 */

/*
export interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';

export declare class MessageService {
  private messages;
  private apiKey;

  constructor(apiKey: string);

  send(to: string, text: string): Promise<Message>;
  getAll(): Message[];
  private validatePhone;
}

export declare function formatMessage(text: string): string;

export declare const MAX_MESSAGE_LENGTH: 4096;
*/

/**
 * NOTICE:
 * ✅ Interfaces stay (type-only construct)
 * ✅ Types stay (type-only construct)
 * ✅ Class signature (no implementation)
 * ✅ "declare" keyword added
 * ✅ Private members shown (but no implementation)
 * ✅ Function signature (no body)
 * ✅ Const type (but not value)
 */

// ============================================
// KEY OBSERVATIONS
// ============================================

/**
 * 1. TYPE-ONLY CONSTRUCTS (Interfaces, Types)
 */

// Source:
interface User { name: string; }
type Status = 'active' | 'inactive';

// JavaScript: NOTHING (removed completely)
// Declaration: EXACT COPY (stays as-is)

/**
 * WHY: These only exist at compile-time
 * They have no runtime representation
 * But consumers need them for type checking
 */

/**
 * 2. CLASSES
 */

// Source:
class Service {
  private data: string;
  constructor(data: string) { this.data = data; }
  getData(): string { return this.data; }
}

// JavaScript:
class Service {
  constructor(data) { this.data = data; }
  getData() { return this.data; }
}

// Declaration:
declare class Service {
  private data;
  constructor(data: string);
  getData(): string;
}

/**
 * WHY: Class exists at runtime (JavaScript needs it)
 * But type information removed from JavaScript
 * Declaration file restores type information
 */

/**
 * 3. FUNCTIONS
 */

// Source:
function validate(input: string): boolean {
  return input.length > 0;
}

// JavaScript:
function validate(input) {
  return input.length > 0;
}

// Declaration:
declare function validate(input: string): boolean;

/**
 * WHY: Function exists at runtime
 * But type annotations removed
 * Declaration file provides types for consumers
 */

/**
 * 4. CONST VALUES
 */

// Source:
const API_URL: string = "https://api.com";

// JavaScript:
const API_URL = "https://api.com";

// Declaration:
declare const API_URL: "https://api.com";

/**
 * NOTICE: Declaration shows literal type, not just string
 * This gives consumers more specific type information
 */

// ============================================
// HOW CONSUMERS USE THIS
// ============================================

/**
 * When someone imports your SDK:
 */

// User's TypeScript code:
// import { MessageService, Message } from '@whatsapp-sdk/core';

/**
 * At compile time:
 * - TypeScript reads dist/example.d.ts
 * - Gets type information for MessageService
 * - Provides autocomplete, type checking
 */

/**
 * At runtime:
 * - JavaScript executes dist/example.js
 * - Actual MessageService class runs
 * - No .d.ts involved (it's compile-time only)
 */

// ============================================
// THE MAGIC: TWO FILES WORK TOGETHER
// ============================================

/**
 * File 1: dist/example.js (Runtime)
 */
// export class MessageService { ... }  ← Executes

/**
 * File 2: dist/example.d.ts (Compile-time)
 */
// export declare class MessageService { ... }  ← Types

/**
 * Result: Users get:
 * ✅ Working code (from .js)
 * ✅ Type safety (from .d.ts)
 * ✅ Autocomplete (from .d.ts)
 * ✅ Error detection (from .d.ts)
 */

// ============================================
// PRACTICAL EXAMPLE: USER EXPERIENCE
// ============================================

/**
 * WITHOUT .d.ts files:
 */

// import { MessageService } from '@whatsapp-sdk/core';
// const service = new MessageService('key');
// service.  ← No autocomplete! TypeScript doesn't know what methods exist

/**
 * WITH .d.ts files:
 */

// import { MessageService } from '@whatsapp-sdk/core';
// const service = new MessageService('key');
// service.  ← Autocomplete shows: send(), getAll()
// service.send('', '')  ← Parameter hints!
// service.send(123, '')  ← Error: number not assignable to string

// ============================================
// GENERATION PROCESS
// ============================================

/**
 * Step 1: Write TypeScript (src/example.ts)
 */
// export class MessageService { ... }

/**
 * Step 2: Configure tsconfig.json
 */
// {
//   "compilerOptions": {
//     "declaration": true
//   }
// }

/**
 * Step 3: Compile
 */
// $ tsc

/**
 * Step 4: Output generated
 */
// dist/
// ├── example.js      ← Runtime code
// └── example.d.ts    ← Type definitions

/**
 * Step 5: Configure package.json
 */
// {
//   "main": "./dist/example.js",
//   "types": "./dist/example.d.ts"
// }

/**
 * Step 6: Publish to npm
 */
// $ npm publish

/**
 * Step 7: Users install and get types!
 */
// $ npm install @whatsapp-sdk/core
// TypeScript automatically finds .d.ts files via "types" field

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ .d.ts files = Type information for JavaScript
 * ✅ Generated automatically by TypeScript compiler
 * ✅ Contain signatures, not implementations
 * ✅ Type-only constructs (interfaces, types) stay as-is
 * ✅ Runtime constructs (classes, functions) get "declare" keyword
 * ✅ Enables autocomplete and type checking for consumers
 * ✅ Essential for npm packages
 * ✅ Two files work together: .js (runtime) + .d.ts (types)
 */

export {};
