/**
 * Example 2: Build Configuration Impact
 * How different tsconfig settings affect output
 */

// ============================================
// THE SAME SOURCE CODE
// ============================================

/**
 * We'll compile this code with different configs
 * to see how output changes
 */

interface Message {
  id: string;
  text: string;
  timestamp: number;
}

/**
 * Send a WhatsApp message
 * @param to - Phone number
 * @param text - Message content
 */
export class MessageService {
  private messages: Message[] = [];

  async send(to: string, text: string): Promise<Message> {
    const message: Message = {
      id: Math.random().toString(),
      text,
      timestamp: Date.now()
    };

    this.messages.push(message);
    return message;
  }

  getAll(): Message[] {
    return [...this.messages];
  }
}

// ============================================
// CONFIGURATION 1: Development Build
// ============================================

/**
 * tsconfig-dev.json
 */
const devConfig = {
  "compilerOptions": {
    "target": "ESNext",           // Latest features (fast compile)
    "module": "ESNext",
    "outDir": "./dist-dev",
    "sourceMap": true,            // Debug support
    "declaration": false,         // Skip .d.ts (faster)
    "removeComments": false,      // Keep comments
    "incremental": true,          // Fast rebuilds
    "strict": true
  }
};

/**
 * Output: dist-dev/example.js
 *
 * - Modern JavaScript (ESNext)
 * - Comments preserved
 * - Source maps generated (.js.map)
 * - No .d.ts files
 * - .tsbuildinfo created for incremental
 *
 * Build time: ~500ms (first), ~100ms (incremental)
 * File size: ~2KB (with comments)
 */

// ============================================
// CONFIGURATION 2: Production Build
// ============================================

/**
 * tsconfig-prod.json
 */
const prodConfig = {
  "compilerOptions": {
    "target": "ES2022",           // Specific target
    "module": "ESNext",
    "outDir": "./dist",
    "sourceMap": true,            // Still useful for debugging prod issues
    "declaration": true,          // Generate .d.ts (for npm)
    "declarationMap": true,       // .d.ts source maps
    "removeComments": true,       // Smaller bundle
    "incremental": false,         // Clean builds
    "strict": true,
    "noEmitOnError": true         // Don't ship broken code
  }
};

/**
 * Output: dist/example.js
 *
 * - ES2022 JavaScript
 * - Comments removed (smaller)
 * - Source maps generated
 * - Type definitions generated (.d.ts)
 * - Declaration maps generated (.d.ts.map)
 * - No incremental cache
 *
 * Build time: ~800ms (always full build)
 * File size: ~1.5KB (comments stripped)
 */

// ============================================
// CONFIGURATION 3: Library Build (for npm)
// ============================================

/**
 * tsconfig-lib.json
 */
const libConfig = {
  "compilerOptions": {
    "target": "ES2020",           // Wide compatibility
    "module": "ESNext",
    "outDir": "./dist",
    "declaration": true,          // REQUIRED for npm packages
    "declarationMap": true,       // "Go to Definition" support
    "sourceMap": false,           // Don't ship source maps (optional)
    "removeComments": true,
    "strict": true,
    "noEmitOnError": true,

    // Library-specific
    "composite": true,            // Project references support
    "skipLibCheck": true          // Faster builds, trust deps
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts", "**/*.spec.ts"]  // Don't ship tests
};

/**
 * Output: dist/example.js + dist/example.d.ts
 *
 * - ES2020 JavaScript (Node 14+ compatible)
 * - Type definitions for consumers
 * - Declaration maps for IDE support
 * - Tests excluded
 * - No source maps (keep package small)
 *
 * Usage by consumers:
 * npm install @whatsapp-sdk/core
 * import { MessageService } from '@whatsapp-sdk/core';
 * ^ Gets full TypeScript autocomplete!
 */

// ============================================
// SIDE-BY-SIDE COMPARISON
// ============================================

/**
 * Same source, different outputs:
 */

// SOURCE (TypeScript):
/*
export class MessageService {
  private messages: Message[] = [];

  async send(to: string, text: string): Promise<Message> {
    // Implementation
  }
}
*/

// OUTPUT with target: ES2022
/*
export class MessageService {
  messages = [];

  async send(to, text) {
    // Implementation (if removeComments: false)
  }
}
*/

// OUTPUT with target: ES5
/*
"use strict";
var MessageService = (function () {
  function MessageService() {
    this.messages = [];
  }

  MessageService.prototype.send = function (to, text) {
    return __awaiter(this, void 0, void 0, function () {
      // Transformed async/await to generator
    });
  };

  return MessageService;
}());
exports.MessageService = MessageService;
*/

// ============================================
// DECLARATION FILE OUTPUT
// ============================================

/**
 * When declaration: true
 */

// dist/example.d.ts:
/*
interface Message {
  id: string;
  text: string;
  timestamp: number;
}

export declare class MessageService {
  private messages;
  send(to: string, text: string): Promise<Message>;
  getAll(): Message[];
}
*/

/**
 * WHY THIS MATTERS:
 * - npm users import your package
 * - TypeScript reads .d.ts file
 * - Gets full type information
 * - Autocomplete and type checking work!
 */

// ============================================
// REAL SDK EXAMPLE: Multiple Configs
// ============================================

/**
 * Professional SDK setup uses 3 configs:
 */

// 1. tsconfig.json (base)
const baseConfig = {
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
};

// 2. tsconfig.build.json (extends base)
const buildConfig = {
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.ts"]
};

// 3. tsconfig.dev.json (extends base)
const devConfigFile = {
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist-dev",
    "declaration": false,
    "sourceMap": true,
    "incremental": true
  },
  "include": ["src/**/*"]
};

/**
 * package.json scripts:
 */
const packageScripts = {
  "scripts": {
    "dev": "tsc -p tsconfig.dev.json --watch",
    "build": "tsc -p tsconfig.build.json",
    "typecheck": "tsc --noEmit"
  }
};

// ============================================
// PERFORMANCE COMPARISON
// ============================================

/**
 * Build times for WhatsApp SDK (50 files):
 *
 * Development (incremental: true, declaration: false):
 * - First build: 3 seconds
 * - Incremental: 0.5 seconds
 *
 * Production (incremental: false, declaration: true):
 * - Every build: 5 seconds
 * - Includes .d.ts generation
 *
 * Type check only (noEmit: true):
 * - Check: 2 seconds
 * - Fast CI/CD validation
 */

// ============================================
// WHICH CONFIG TO USE WHEN?
// ============================================

/**
 * USE CASE: Local Development
 * Config: tsconfig.dev.json
 * Settings:
 * - incremental: true (fast rebuilds)
 * - declaration: false (skip type gen)
 * - sourceMap: true (debug support)
 * - removeComments: false (keep context)
 *
 * USE CASE: CI/CD Type Check
 * Command: tsc --noEmit
 * Settings:
 * - No output files
 * - Just validate types
 * - Fast pipeline step
 *
 * USE CASE: npm Package Build
 * Config: tsconfig.build.json
 * Settings:
 * - declaration: true (users need types!)
 * - declarationMap: true (IDE support)
 * - removeComments: true (smaller package)
 * - noEmitOnError: true (don't ship bugs)
 *
 * USE CASE: Production App
 * Config: tsconfig.prod.json
 * Settings:
 * - target: ES2020 (balance compatibility/features)
 * - sourceMap: true (debug prod issues)
 * - strict: true (catch all bugs)
 * - removeComments: true (smaller bundle)
 */

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Different configs for different purposes
 * ✅ Development: Fast feedback (incremental, no .d.ts)
 * ✅ Production: Optimized output (remove comments)
 * ✅ Library: Type definitions required (declaration: true)
 * ✅ Use extends to share common settings
 * ✅ Match target to your runtime (Node 18 = ES2022)
 */

export {};
