/**
 * Example 3: Path Mapping (Clean Imports)
 * Understanding WHY path mapping improves code quality
 */

// ============================================
// PROBLEM: Without Path Mapping
// ============================================

/**
 * Imagine this file structure:
 *
 * src/
 * ├── client/
 * │   └── WhatsAppClient.ts
 * ├── services/
 * │   ├── messages/
 * │   │   └── MessageService.ts
 * │   └── media/
 * │       └── MediaService.ts
 * ├── utils/
 * │   ├── validators/
 * │   │   └── phone.ts
 * │   └── formatters/
 * │       └── message.ts
 * └── app.ts (you are here)
 */

// ❌ UGLY: Relative imports from deeply nested files
/*
import { WhatsAppClient } from './client/WhatsAppClient';
import { MessageService } from './services/messages/MessageService';
import { MediaService } from './services/media/MediaService';
import { validatePhone } from './utils/validators/phone';
import { formatMessage } from './utils/formatters/message';

// Now imagine you're in services/messages/handlers/webhook.ts:
import { validatePhone } from '../../../utils/validators/phone';
import { WhatsAppClient } from '../../../client/WhatsAppClient';

// PROBLEMS:
// 1. Ugly to read - lots of ../../../
// 2. Brittle - if you move webhook.ts, all imports break
// 3. Hard to refactor - find/replace is risky
// 4. No clear structure visibility
// 5. Easy to make mistakes with wrong relative paths
*/

// ============================================
// SOLUTION: Path Mapping in tsconfig.json
// ============================================

/**
 * tsconfig.json configuration:
 *
 * {
 *   "compilerOptions": {
 *     "baseUrl": ".",
 *     "paths": {
 *       "@client/*": ["src/client/*"],
 *       "@services/*": ["src/services/*"],
 *       "@utils/*": ["src/utils/*"],
 *       "@types/*": ["src/types/*"]
 *     }
 *   }
 * }
 */

// ✅ BEAUTIFUL: Clean imports from anywhere
/*
import { WhatsAppClient } from '@client/WhatsAppClient';
import { MessageService } from '@services/messages/MessageService';
import { MediaService } from '@services/media/MediaService';
import { validatePhone } from '@utils/validators/phone';
import { formatMessage } from '@utils/formatters/message';

// BENEFITS:
// 1. Clean and readable
// 2. File location doesn't matter - same import everywhere
// 3. Easy to refactor - clear aliases
// 4. Clear project structure at a glance
// 5. Auto-import suggestions work better in IDE
*/

// ============================================
// REAL WHATSAPP SDK EXAMPLE
// ============================================

/**
 * Project structure for WhatsApp SDK:
 *
 * whatsapp-sdk/
 * ├── src/
 * │   ├── client/
 * │   │   └── WhatsAppClient.ts
 * │   ├── api/
 * │   │   ├── http/
 * │   │   │   └── HttpClient.ts
 * │   │   └── endpoints/
 * │   │       └── messages.ts
 * │   ├── services/
 * │   │   ├── MessageService.ts
 * │   │   ├── MediaService.ts
 * │   │   └── TemplateService.ts
 * │   ├── types/
 * │   │   ├── client.ts
 * │   │   ├── messages.ts
 * │   │   └── errors.ts
 * │   ├── utils/
 * │   │   ├── validators.ts
 * │   │   ├── formatters.ts
 * │   │   └── retry.ts
 * │   └── errors/
 * │       ├── APIError.ts
 * │       └── ValidationError.ts
 * └── tsconfig.json
 */

/**
 * Recommended tsconfig.json paths for WhatsApp SDK:
 */

const recommendedPaths = {
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      // Root-level SDK imports
      "@whatsapp-sdk/*": ["src/*"],

      // Domain-specific imports
      "@client/*": ["src/client/*"],
      "@api/*": ["src/api/*"],
      "@services/*": ["src/services/*"],
      "@types/*": ["src/types/*"],
      "@utils/*": ["src/utils/*"],
      "@errors/*": ["src/errors/*"],

      // Test utilities
      "@test/*": ["tests/*"]
    }
  }
};

// ============================================
// USAGE EXAMPLES
// ============================================

/**
 * Example 1: Main client file
 * File: src/client/WhatsAppClient.ts
 */

// Without path mapping:
// import { HttpClient } from '../api/http/HttpClient';
// import { MessageService } from '../services/MessageService';
// import { ClientConfig } from '../types/client';

// With path mapping:
// import { HttpClient } from '@api/http/HttpClient';
// import { MessageService } from '@services/MessageService';
// import type { ClientConfig } from '@types/client';

/**
 * Example 2: Deep nested file
 * File: src/services/messages/handlers/TextMessageHandler.ts
 */

// Without path mapping - nightmare!
// import { WhatsAppClient } from '../../../client/WhatsAppClient';
// import { validatePhone } from '../../../utils/validators';
// import { Message } from '../../../types/messages';

// With path mapping - clean!
// import { WhatsAppClient } from '@client/WhatsAppClient';
// import { validatePhone } from '@utils/validators';
// import type { Message } from '@types/messages';

/**
 * Example 3: Test file
 * File: tests/unit/MessageService.test.ts
 */

// Without path mapping:
// import { MessageService } from '../../src/services/MessageService';
// import { mockClient } from '../helpers/mocks';

// With path mapping:
// import { MessageService } from '@services/MessageService';
// import { mockClient } from '@test/helpers/mocks';

// ============================================
// IMPORTANT: Runtime Consideration
// ============================================

/**
 * ⚠️ CRITICAL: Path mapping is TypeScript ONLY
 *
 * TypeScript compiles:
 *   import { X } from '@client/X'
 *
 * To JavaScript:
 *   import { X } from '@client/X'  // This won't work in Node.js!
 *
 * SOLUTION: Use a bundler or path resolver:
 * - Option 1: tsconfig-paths (for Node.js runtime)
 * - Option 2: tsx (development)
 * - Option 3: Bundler (esbuild, rollup) for production
 */

/**
 * package.json scripts with tsconfig-paths:
 */

const packageScripts = {
  "scripts": {
    // Development with tsx (supports path mapping)
    "dev": "tsx watch src/index.ts",

    // Build (compile TypeScript)
    "build": "tsc",

    // Runtime with tsconfig-paths
    "start": "node -r tsconfig-paths/register dist/index.js",

    // Tests with path mapping support
    "test": "vitest"
  }
};

/**
 * Alternative: Build-time resolution with esbuild
 */

const esbuildConfig = {
  "scripts": {
    // Build with esbuild (resolves paths at build time)
    "build": "esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js",

    // Then run normally
    "start": "node dist/index.js"
  }
};

// ============================================
// COMMON PATTERNS FOR DIFFERENT SCALES
// ============================================

/**
 * Small Library (<10 files):
 */
const smallLibraryPaths = {
  "paths": {
    "@lib/*": ["src/*"]
  }
};
// Usage: import { X } from '@lib/utils';

/**
 * Medium SDK (10-50 files):
 */
const mediumSDKPaths = {
  "paths": {
    "@sdk/*": ["src/*"],
    "@types/*": ["src/types/*"],
    "@utils/*": ["src/utils/*"]
  }
};
// Usage: import { X } from '@sdk/client';

/**
 * Large SDK (50+ files):
 */
const largeSDKPaths = {
  "paths": {
    "@whatsapp-sdk/*": ["src/*"],
    "@client/*": ["src/client/*"],
    "@api/*": ["src/api/*"],
    "@services/*": ["src/services/*"],
    "@types/*": ["src/types/*"],
    "@utils/*": ["src/utils/*"],
    "@errors/*": ["src/errors/*"],
    "@internal/*": ["src/internal/*"],
    "@test/*": ["tests/*"]
  }
};
// Usage: import { MessageService } from '@services/MessageService';

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ BENEFITS:
 * - Clean, readable imports
 * - Location-independent (move files freely)
 * - Better refactoring experience
 * - IDE autocomplete improvements
 * - Clear project structure
 *
 * ⚠️ CONSIDERATIONS:
 * - TypeScript-only (needs runtime support)
 * - Requires additional tooling for Node.js
 * - Team must understand the aliases
 *
 * 🎯 WHEN TO USE:
 * - Medium to large codebases
 * - Deep folder nesting (3+ levels)
 * - SDKs and libraries
 * - Projects with clear domain separation
 *
 * ❌ WHEN NOT TO USE:
 * - Tiny projects (<5 files)
 * - Flat folder structure
 * - When team is unfamiliar with concept
 */

export {};
