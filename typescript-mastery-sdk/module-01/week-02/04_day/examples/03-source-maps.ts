/**
 * Example 3: Source Maps for Debugging
 * Understanding how source maps connect compiled JavaScript to original TypeScript
 */

// ============================================
// THE PROBLEM: Lost in Translation
// ============================================

/**
 * Scenario: You write TypeScript, but errors point to JavaScript
 */

// Your TypeScript (src/validators.ts):
export function validatePhone(phone: string): boolean {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  // Bug: Should allow + at start
  const isValid = /^\d{10,15}$/.test(phone);

  if (!isValid) {
    throw new Error(`Invalid phone: ${phone}`);
  }

  return isValid;
}

export function processMessage(to: string, text: string): void {
  validatePhone(to);  // This might throw
  console.log(`Sending "${text}" to ${to}`);
}

// ============================================
// WITHOUT SOURCE MAPS
// ============================================

/**
 * tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "sourceMap": false
 *   }
 * }
 */

/**
 * Compiled JavaScript (dist/validators.js):
 */
/*
export function validatePhone(phone) {
  if (!phone) {
    throw new Error("Phone number is required");
  }
  const isValid = /^\d{10,15}$/.test(phone);
  if (!isValid) {
    throw new Error(`Invalid phone: ${phone}`);
  }
  return isValid;
}

export function processMessage(to, text) {
  validatePhone(to);
  console.log(`Sending "${text}" to ${to}`);
}
*/

/**
 * Run the code with invalid input:
 */
// processMessage("+1234567890", "Hello");

/**
 * ERROR WITHOUT SOURCE MAPS:
 *
 * Error: Invalid phone: +1234567890
 *     at validatePhone (dist/validators.js:8:11)
 *     at processMessage (dist/validators.js:14:3)
 *     at Object.<anonymous> (dist/index.js:2:1)
 *
 * PROBLEM:
 * ❌ Points to dist/validators.js line 8
 * ❌ You need to mentally map: "dist/validators.js:8 = what line in src/validators.ts?"
 * ❌ If code is minified/transformed, almost impossible to trace
 * ❌ Debugging compiled code, not your actual code
 */

// ============================================
// WITH SOURCE MAPS
// ============================================

/**
 * tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "sourceMap": true
 *   }
 * }
 */

/**
 * Now generates:
 * dist/
 * ├── validators.js
 * └── validators.js.map  ← Source map file
 */

/**
 * validators.js.map content:
 */
const sourceMap = {
  "version": 3,
  "file": "validators.js",
  "sourceRoot": "",
  "sources": ["../src/validators.ts"],
  "names": [],
  "mappings": "AAAA,MAAM,UAAU,aAAa,CAAC,KAAa..."
};

/**
 * "mappings" is a Base64 VLQ encoded string that maps:
 * - Line 8 in validators.js → Line 10 in src/validators.ts
 * - Column 11 in validators.js → Column 5 in src/validators.ts
 */

/**
 * Run with source maps enabled:
 */
// node --enable-source-maps dist/index.js

/**
 * ERROR WITH SOURCE MAPS:
 *
 * Error: Invalid phone: +1234567890
 *     at validatePhone (src/validators.ts:10:11)  ← Points to TypeScript!
 *     at processMessage (src/validators.ts:16:3)   ← Your actual code!
 *     at Object.<anonymous> (src/index.ts:3:1)
 *
 * BENEFITS:
 * ✅ Points to src/validators.ts line 10 - your actual code!
 * ✅ Can open that file and see the problem immediately
 * ✅ Debugger shows TypeScript code, not JavaScript
 * ✅ Stack trace makes sense
 */

// ============================================
// HOW SOURCE MAPS WORK
// ============================================

/**
 * STEP 1: Compiler generates mapping
 *
 * TypeScript tracks:
 * - Each symbol's position in source (line, column)
 * - Each symbol's position in output (line, column)
 * - Creates mapping: output position → source position
 */

/**
 * Example mapping:
 *
 * validators.js line 8 col 11 → validators.ts line 10 col 5
 * validators.js line 14 col 3 → validators.ts line 16 col 3
 */

/**
 * STEP 2: Runtime loads source map
 *
 * When error occurs at validators.js:8:11:
 * 1. Runtime checks if validators.js.map exists
 * 2. Reads mapping for line 8, col 11
 * 3. Finds: maps to validators.ts:10:5
 * 4. Shows validators.ts:10:5 in stack trace
 */

/**
 * STEP 3: Debugger uses source map
 *
 * When you set breakpoint in VS Code:
 * 1. You set it in src/validators.ts line 10
 * 2. Debugger reads source map
 * 3. Finds corresponding line in validators.js
 * 4. Sets actual breakpoint in validators.js
 * 5. When hit, shows you validators.ts code!
 */

// ============================================
// SOURCE MAPS IN DIFFERENT ENVIRONMENTS
// ============================================

/**
 * Node.js:
 */
// node --enable-source-maps dist/index.js
// ^ Automatically uses .js.map files

/**
 * Browser:
 */
/*
<!-- Browser automatically loads source maps -->
<script src="dist/bundle.js"></script>
<!-- If bundle.js.map exists, DevTools will use it -->
*/

/**
 * VS Code Debugger:
 */
const vscodeLaunchJson = {
  "type": "node",
  "request": "launch",
  "name": "Debug TypeScript",
  "program": "${workspaceFolder}/dist/index.js",
  "sourceMaps": true,  // Enable source map support
  "outFiles": ["${workspaceFolder}/dist/**/*.js"]
};

// ============================================
// SOURCE MAP TYPES
// ============================================

/**
 * 1. Inline Source Maps
 */
const inlineConfig = {
  "compilerOptions": {
    "inlineSourceMap": true,  // Embed map in .js file
    "inlineSources": true     // Embed .ts source in map
  }
};

/**
 * Result: validators.js contains embedded source map
 *
 * //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9...
 *
 * Pros: Single file (no .map file needed)
 * Cons: Larger .js files
 * Use: Development only
 */

/**
 * 2. External Source Maps (default)
 */
const externalConfig = {
  "compilerOptions": {
    "sourceMap": true  // Separate .map files
  }
};

/**
 * Result: validators.js + validators.js.map (separate files)
 *
 * Pros: .js stays small
 * Cons: Need to ship .map files too
 * Use: Production (optional to ship .map)
 */

// ============================================
// PRODUCTION CONSIDERATIONS
// ============================================

/**
 * Should you ship source maps to production?
 */

/**
 * ✅ SHIP SOURCE MAPS IF:
 * - You want to debug production issues
 * - Your code is already public (open source)
 * - Benefits of debugging > risk of exposing code
 * - You can restrict .map files to authenticated users
 */

/**
 * ❌ DON'T SHIP SOURCE MAPS IF:
 * - Code contains proprietary logic
 * - Security through obscurity matters
 * - Source maps are very large (bandwidth cost)
 * - You have good error monitoring (Sentry, etc.)
 */

/**
 * HYBRID APPROACH:
 * - Generate source maps during build
 * - Upload to error tracking service (Sentry)
 * - Don't serve .map files to users
 * - Sentry uses maps to show you original code
 */

// ============================================
// DEBUGGING WITH SOURCE MAPS
// ============================================

/**
 * Example debug session:
 */

// 1. Set breakpoint in VS Code on this line:
export function debugExample(phone: string): void {
  const cleaned = phone.replace(/\s/g, '');  // ← Breakpoint here
  validatePhone(cleaned);
}

/**
 * 2. VS Code does:
 *    - Reads dist/validators.js.map
 *    - Finds line in validators.js that corresponds to this line
 *    - Sets breakpoint in validators.js
 *
 * 3. When hit:
 *    - Debugger shows you src/validators.ts
 *    - Variables show TypeScript names
 *    - Stack trace shows TypeScript files
 *    - You debug as if JavaScript doesn't exist!
 */

// ============================================
// REAL WHATSAPP SDK EXAMPLE
// ============================================

/**
 * Development: Use source maps
 */
const devSourceMaps = {
  "scripts": {
    "dev": "tsc --watch --sourceMap",
    "debug": "node --enable-source-maps dist/index.js"
  }
};

/**
 * Production: Optional source maps
 */
const prodSourceMaps = {
  "scripts": {
    "build": "tsc --sourceMap",
    "build:no-maps": "tsc"  // Skip source maps for production
  }
};

/**
 * Testing: Always use source maps
 */
const testSourceMaps = {
  "scripts": {
    "test": "vitest"  // Vitest automatically uses source maps
  }
};

// ============================================
// SOURCE MAP VALIDATION
// ============================================

/**
 * Check if source maps work:
 */

// 1. Compile with source maps
// tsc --sourceMap

// 2. Check files exist
// ls dist/
// validators.js
// validators.js.map  ← Should exist

// 3. Run with source maps
// node --enable-source-maps dist/index.js

// 4. Check error points to .ts file
// Error should show: src/validators.ts:10
// Not: dist/validators.js:8

/**
 * Common source map issues:
 *
 * ❌ Source map exists but not used:
 * - Forgot --enable-source-maps in Node.js
 * - Browser DevTools source maps disabled
 *
 * ❌ Source map points to wrong file:
 * - sourceRoot in tsconfig is wrong
 * - Moved files after compilation
 *
 * ❌ Source map not generated:
 * - sourceMap: false in tsconfig
 * - tsc compiled without --sourceMap flag
 */

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Source maps connect JavaScript output to TypeScript source
 * ✅ Enable debugging TypeScript directly (not compiled JavaScript)
 * ✅ Stack traces show original line numbers
 * ✅ Essential for development (always enable)
 * ✅ Optional for production (security vs debuggability)
 * ✅ Node.js needs --enable-source-maps flag
 * ✅ Browsers use source maps automatically
 * ✅ Zero runtime cost (only used when debugging)
 */

export {};
