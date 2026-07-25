/**
 * Example 1: Basic TypeScript Compilation
 * Understanding what happens when TypeScript compiles to JavaScript
 */

// ============================================
// INPUT: TypeScript Code
// ============================================

/**
 * This is the code you write (TypeScript)
 */

// 1. Interface (TypeScript-only)
interface User {
  id: string;
  name: string;
  email: string;
  age?: number;  // Optional property
}

// 2. Type alias (TypeScript-only)
type UserRole = 'admin' | 'user' | 'guest';

// 3. Class with types
class UserService {
  private users: User[] = [];

  constructor(private apiKey: string) {}

  addUser(user: User): void {
    this.users.push(user);
  }

  getUser(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  getUserRole(user: User): UserRole {
    // Some logic to determine role
    return 'user';
  }
}

// 4. Function with type annotations
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// 5. Const with type annotation
const MAX_USERS: number = 1000;

// 6. Arrow function with types
const formatUser = (user: User): string => {
  return `${user.name} (${user.email})`;
};

// ============================================
// OUTPUT: Compiled JavaScript (target: ES2022)
// ============================================

/**
 * What TypeScript compiler generates:
 */

/*
// ❌ Interface - REMOVED (compile-time only)

// ❌ Type alias - REMOVED (compile-time only)

// ✅ Class - KEPT (runtime construct)
class UserService {
  users = [];

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  addUser(user) {
    this.users.push(user);
  }

  getUser(id) {
    return this.users.find(u => u.id === id);
  }

  getUserRole(user) {
    return 'user';
  }
}

// ✅ Function - KEPT (types removed)
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ✅ Const - KEPT (type removed)
const MAX_USERS = 1000;

// ✅ Arrow function - KEPT (types removed)
const formatUser = (user) => {
  return `${user.name} (${user.email})`;
};
*/

// ============================================
// KEY OBSERVATIONS
// ============================================

/**
 * WHAT GETS REMOVED:
 * ❌ Interfaces (User) - Compile-time only
 * ❌ Type aliases (UserRole) - Compile-time only
 * ❌ Type annotations (: string, : boolean) - Compile-time only
 * ❌ Return type annotations (: void, : User | undefined) - Compile-time only
 * ❌ Optional markers (?) - Compile-time only
 * ❌ Union types (string | number) - Compile-time only
 *
 * WHAT STAYS:
 * ✅ Classes - Runtime construct
 * ✅ Functions - Runtime construct
 * ✅ Variables - Runtime construct
 * ✅ Logic and code - Runtime behavior
 * ✅ Comments (unless removeComments: true)
 */

// ============================================
// WHY THIS MATTERS
// ============================================

/**
 * Understanding what disappears helps you:
 *
 * 1. Know what's checked at compile-time vs runtime
 *    const user: User = getData();  // Type checked at compile-time
 *    if (user.id === "123") { }     // Works at runtime
 *
 * 2. Understand bundle size
 *    Interfaces don't add to bundle size (removed at compile)
 *    Classes DO add to bundle size (stay in output)
 *
 * 3. Debug effectively
 *    Error says "line 45 in index.js"
 *    But you wrote "line 50 in index.ts" (with types)
 *    Source maps bridge this gap!
 *
 * 4. Write better code
 *    Use interfaces for type safety (free at runtime)
 *    Use classes only when needed (cost at runtime)
 */

// ============================================
// COMPILATION FOR DIFFERENT TARGETS
// ============================================

/**
 * Same TypeScript code compiles differently for different targets
 */

// Input:
const greet = (name: string): string => `Hello ${name}`;

/**
 * target: "ES2022" (modern):
 */
// const greet = (name) => `Hello ${name}`;

/**
 * target: "ES2015":
 */
// const greet = (name) => `Hello ${name}`;  // Same, arrow functions in ES2015

/**
 * target: "ES5" (old browsers):
 */
// var greet = function(name) { return "Hello " + name; };
// ^ Arrow function converted to traditional function
// ^ Template literal converted to concatenation

// ============================================
// PRACTICAL EXAMPLE: WhatsApp SDK
// ============================================

/**
 * Real SDK code compilation
 */

// TypeScript input:
export interface ClientConfig {
  apiKey: string;
  timeout?: number;
}

export class WhatsAppClient {
  constructor(private config: ClientConfig) {}

  async sendMessage(to: string, text: string): Promise<void> {
    console.log(`Sending "${text}" to ${to}`);
  }
}

/**
 * JavaScript output (dist/index.js):
 *
 * export class WhatsAppClient {
 *   constructor(config) {
 *     this.config = config;
 *   }
 *
 *   async sendMessage(to, text) {
 *     console.log(`Sending "${text}" to ${to}`);
 *   }
 * }
 */

/**
 * Type definitions output (dist/index.d.ts):
 *
 * export interface ClientConfig {
 *   apiKey: string;
 *   timeout?: number;
 * }
 *
 * export declare class WhatsAppClient {
 *   private config;
 *   constructor(config: ClientConfig);
 *   sendMessage(to: string, text: string): Promise<void>;
 * }
 */

// ============================================
// HOW TO TEST THIS
// ============================================

/**
 * Try it yourself:
 *
 * 1. Save this file as example.ts
 * 2. Compile: tsc example.ts
 * 3. Check example.js - see what changed!
 * 4. Try different targets:
 *    tsc --target ES5 example.ts
 *    tsc --target ES2022 example.ts
 * 5. Compare outputs!
 */

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ TypeScript = Development tool (compile-time)
 * ✅ JavaScript = Runtime language (what actually runs)
 * ✅ Types are REMOVED during compilation (zero runtime cost)
 * ✅ Classes/functions STAY (runtime constructs)
 * ✅ Different targets = different JavaScript output
 * ✅ For SDKs: Generate .d.ts so users get types back!
 */

export {};
