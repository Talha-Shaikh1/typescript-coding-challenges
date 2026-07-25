// Example 3: npm Scripts in Action
// This demonstrates how npm scripts automate development tasks

/**
 * COMMON NPM SCRIPTS FOR SDK DEVELOPMENT
 */

const npmScripts = {
  // Development: Watch for changes and rebuild
  "dev": "tsx watch src/index.ts",

  // Build: Compile TypeScript to JavaScript
  "build": "tsc",

  // Alternative build with bundler
  "build:bundle": "tsup",

  // Test: Run test suite
  "test": "vitest",

  // Test with watch mode
  "test:watch": "vitest --watch",

  // Type checking without emitting files
  "type-check": "tsc --noEmit",

  // Linting: Check code quality
  "lint": "eslint src --ext .ts",

  // Lint and auto-fix
  "lint:fix": "eslint src --ext .ts --fix",

  // Format code
  "format": "prettier --write \"src/**/*.ts\"",

  // Clean build artifacts
  "clean": "rm -rf dist",

  // Full rebuild
  "rebuild": "npm run clean && npm run build",

  // Pre-publish checks (runs automatically before npm publish)
  "prepublishOnly": "npm run type-check && npm test && npm run build"
}

/**
 * RUNNING SCRIPTS
 */

// Most scripts need 'npm run':
// npm run dev
// npm run build
// npm run lint

// Some scripts have shortcuts:
// npm test    (shortcut for 'npm run test')
// npm start   (shortcut for 'npm run start')

/**
 * LIFECYCLE SCRIPTS
 * These run automatically at specific times
 */

const lifecycleScripts = {
  // Before installing dependencies
  "preinstall": "echo 'About to install...'",

  // After installing dependencies
  "postinstall": "echo 'Installation complete!'",

  // Before publishing to npm
  "prepublish": "npm run build",
  "prepublishOnly": "npm run test && npm run build",

  // Before running 'npm version'
  "preversion": "npm test",
  "postversion": "git push && git push --tags"
}

/**
 * CHAINING SCRIPTS
 * Run multiple scripts in sequence or parallel
 */

const chainedScripts = {
  // Sequential: Run one after another (&&)
  "check": "npm run lint && npm run type-check && npm test",

  // Parallel: Run at the same time (using npm-run-all or &)
  "validate": "npm run lint & npm run type-check & npm test",

  // Fallback: Run next if first fails (||)
  "test:fallback": "npm test || echo 'Tests failed but continuing...'"
}

/**
 * PRACTICAL EXAMPLE FOR WHATSAPP SDK
 */

export const whatsappSdkScripts = {
  "scripts": {
    // Development workflow
    "dev": "tsx watch src/index.ts",
    "dev:example": "tsx watch examples/basic.ts",

    // Building
    "build": "tsup",
    "build:types": "tsc --emitDeclarationOnly",

    // Testing
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",

    // Quality checks
    "lint": "eslint src",
    "lint:fix": "eslint src --fix",
    "format": "prettier --write src",
    "type-check": "tsc --noEmit",

    // Pre-publish validation
    "prepublishOnly": "npm run lint && npm run type-check && npm test && npm run build",

    // Complete check
    "validate": "npm run lint && npm run type-check && npm test",

    // Release workflow
    "release": "npm run validate && npm version patch && npm publish"
  }
}

/**
 * RUNNING THE SCRIPTS
 */

console.log("🚀 npm Scripts Examples\n")

console.log("Development:")
console.log("  npm run dev         # Start development mode")
console.log("  npm run dev:example # Run example file\n")

console.log("Build:")
console.log("  npm run build       # Build the package\n")

console.log("Testing:")
console.log("  npm test            # Run tests")
console.log("  npm run test:watch  # Watch mode\n")

console.log("Quality:")
console.log("  npm run lint        # Check code quality")
console.log("  npm run type-check  # Check types\n")

console.log("✅ All scripts configured and ready!")

export { npmScripts, lifecycleScripts, chainedScripts }
