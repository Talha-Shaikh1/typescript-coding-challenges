/**
 * Example 3: Circular Dependencies - Problem and Solutions
 * Understanding why circular deps happen and how to fix them
 */

// ============================================
// THE PROBLEM: Circular Dependency
// ============================================

/**
 * Scenario: User has Posts, Posts have an Author (User)
 */

// ❌ BROKEN: Circular dependency

// user.ts
/*
import { Post } from './post';

export class User {
  id: string;
  name: string;
  posts: Post[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}
*/

// post.ts
/*
import { User } from './user';

export class Post {
  id: string;
  content: string;
  author: User;

  constructor(id: string, content: string, author: User) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
*/

/**
 * WHY THIS IS A PROBLEM:
 *
 * 1. user.ts imports Post from post.ts
 * 2. post.ts imports User from user.ts
 * 3. Circular loop: user → post → user → post...
 *
 * WHAT HAPPENS:
 * - ES Modules: Often throws errors or undefined imports
 * - CommonJS: Might work but fragile (partial exports)
 * - Bundlers: Can break or produce wrong output
 * - Refactoring: Nightmare to maintain
 */

// ============================================
// SOLUTION 1: Extract to Shared Types File
// ============================================

/**
 * Best solution: Separate types from implementation
 */

// types.ts - Shared interfaces
export interface User {
  id: string;
  name: string;
  posts: Post[];
}

export interface Post {
  id: string;
  content: string;
  author: User;
}

// user.ts - Implementation (NO circular dep)
import type { User as IUser, Post } from './types';

export class UserImpl implements IUser {
  id: string;
  name: string;
  posts: Post[] = [];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  addPost(post: Post) {
    this.posts.push(post);
  }
}

// post.ts - Implementation (NO circular dep)
import type { Post as IPost, User } from './types';

export class PostImpl implements IPost {
  id: string;
  content: string;
  author: User;

  constructor(id: string, content: string, author: User) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}

/**
 * WHY THIS WORKS:
 * ✅ Both files import from types.ts (one direction)
 * ✅ No file imports the other
 * ✅ Type safety maintained
 * ✅ Easy to refactor
 */

// ============================================
// SOLUTION 2: Type-Only Imports
// ============================================

/**
 * When you only need the TYPE, not the implementation
 */

// user-v2.ts
import type { PostV2 } from './post-v2';  // Type-only import (no runtime circular dep)

export class UserV2 {
  id: string;
  posts: PostV2[] = [];  // Uses type only

  constructor(id: string) {
    this.id = id;
  }
}

// post-v2.ts
import { UserV2 } from './user-v2';  // Regular import (has the class)

export class PostV2 {
  author: UserV2;  // Uses actual class

  constructor(author: UserV2) {
    this.author = author;
  }
}

/**
 * WHY THIS WORKS:
 * ✅ `import type` doesn't create runtime dependency
 * ✅ Only creates type-level reference
 * ✅ Compiled JavaScript has no import
 *
 * WHEN TO USE:
 * ✅ When you only need type information
 * ✅ For interface/type references
 * ❌ NOT when you need the actual class (constructor, static methods)
 */

// ============================================
// SOLUTION 3: Dependency Inversion
// ============================================

/**
 * Invert the dependency - make Post not depend on User directly
 */

// post-v3.ts - No User import at all
export class PostV3 {
  id: string;
  content: string;
  authorId: string;  // Just store ID, not full User object

  constructor(id: string, content: string, authorId: string) {
    this.id = id;
    this.content = content;
    this.authorId = authorId;
  }
}

// user-v3.ts - Can import Post freely
import { PostV3 } from './post-v3';

export class UserV3 {
  id: string;
  posts: PostV3[] = [];

  constructor(id: string) {
    this.id = id;
  }

  getAuthorOfPost(post: PostV3): UserV3 | null {
    return post.authorId === this.id ? this : null;
  }
}

/**
 * WHY THIS WORKS:
 * ✅ Post doesn't need User at all
 * ✅ Stores relationship as ID (relational pattern)
 * ✅ Simpler data model
 *
 * WHEN TO USE:
 * ✅ When relationship can be stored as reference (ID)
 * ✅ When you need database-friendly models
 * ✅ When circular deps keep appearing
 */

// ============================================
// REAL WHATSAPP SDK EXAMPLE
// ============================================

/**
 * Problem: MessageService and WhatsAppClient circular dependency
 */

// ❌ BROKEN:
/*
// WhatsAppClient.ts
import { MessageService } from './MessageService';

export class WhatsAppClient {
  messageService: MessageService;

  constructor() {
    this.messageService = new MessageService(this);  // Pass self
  }
}

// MessageService.ts
import { WhatsAppClient } from './WhatsAppClient';

export class MessageService {
  constructor(private client: WhatsAppClient) {}

  async send(text: string) {
    // Uses client.apiKey
  }
}
*/

// ✅ FIXED: Extract config interface

// types/client.ts
export interface ClientConfig {
  apiKey: string;
  apiUrl: string;
}

export interface IClient {
  getConfig(): ClientConfig;
}

// MessageService.ts - Depends on interface, not concrete class
import type { IClient } from './types/client';

export class MessageServiceFixed {
  constructor(private client: IClient) {}

  async send(text: string) {
    const config = this.client.getConfig();
    // Use config
  }
}

// WhatsAppClient.ts - Implements interface
import type { ClientConfig, IClient } from './types/client';
import { MessageServiceFixed } from './MessageService';

export class WhatsAppClientFixed implements IClient {
  messageService: MessageServiceFixed;

  constructor(private config: ClientConfig) {
    this.messageService = new MessageServiceFixed(this);
  }

  getConfig(): ClientConfig {
    return this.config;
  }
}

/**
 * WHY THIS PATTERN IS COMMON IN SDKs:
 * ✅ Services depend on interface, not concrete client
 * ✅ Easy to test (mock the interface)
 * ✅ No circular dependencies
 * ✅ Clear contracts
 */

// ============================================
// HOW TO DETECT CIRCULAR DEPENDENCIES
// ============================================

/**
 * Tools to detect:
 * 1. TypeScript compiler warnings
 * 2. ESLint plugin: eslint-plugin-import
 * 3. madge (dependency analyzer)
 * 4. Bundler warnings (webpack, rollup)
 */

/**
 * Manual detection:
 * If you can trace imports in a loop, it's circular:
 * A imports B → B imports C → C imports A
 */

// ============================================
// PREVENTION STRATEGIES
// ============================================

/**
 * 1. Layered Architecture
 */

/*
types/        ← Base layer (no imports)
  ↑
utils/        ← Utilities (import only types)
  ↑
services/     ← Services (import types + utils)
  ↑
client/       ← Client (import everything)
*/

// Rule: Only import from layers below, never above!

/**
 * 2. Shared Types Folder
 */

// Always have a types/ folder with interfaces
// Other modules import from types, not from each other

/**
 * 3. Dependency Injection
 */

// Don't import what you need - receive it as parameter
class ServiceWithDI {
  constructor(private config: ClientConfig) {}
  // config injected, not imported
}

/**
 * 4. Use type-only imports by default
 */

// Always start with:
import type { User } from './user';

// Only switch to regular import if you need runtime value:
import { User } from './user';

// ============================================
// TESTING FOR CIRCULAR DEPENDENCIES
// ============================================

/**
 * Add to package.json:
 */

const packageScripts = {
  "scripts": {
    "check-circular": "madge --circular --extensions ts src/",
    "visualize-deps": "madge --image graph.svg src/"
  }
};

/**
 * ESLint rule:
 */

const eslintConfig = {
  "rules": {
    "import/no-cycle": "error"
  }
};

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ SOLUTIONS (in order of preference):
 * 1. Extract shared types file - BEST
 * 2. Type-only imports - Good for type-only usage
 * 3. Dependency inversion - Store IDs instead of objects
 * 4. Dependency injection - Pass dependencies as params
 *
 * ✅ PREVENTION:
 * - Layered architecture (types → utils → services → client)
 * - Shared types folder
 * - Use import type by default
 * - Lint with import/no-cycle
 *
 * ❌ DON'T:
 * - Import concrete classes that import you back
 * - Create deep import chains without structure
 * - Ignore circular dependency warnings
 *
 * 🎯 FOR WHATSAPP SDK:
 * - types/ folder for all interfaces
 * - Services depend on interfaces, not concrete client
 * - Client imports services (one direction only)
 */

export {};
