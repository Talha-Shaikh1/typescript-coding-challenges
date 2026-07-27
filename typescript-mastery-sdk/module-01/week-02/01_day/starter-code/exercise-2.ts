// Exercise 2: Dependencies vs devDependencies
// Goal: Correctly categorize package dependencies

/**
 * TODO: Categorize these packages
 *
 * Given packages:
 * 1. axios - HTTP client for API requests
 * 2. typescript - TypeScript compiler
 * 3. vitest - Testing framework
 * 4. zod - Runtime validation library
 * 5. eslint - Code linting tool
 * 6. dotenv - Environment variable loader
 * 7. tsup - Build tool
 * 8. @types/node - Node.js type definitions
 *
 * Create a package.json snippet below with correct categories
 */

const packageJson = {
  "dependencies": {
    // TODO: Add production dependencies here
    // Hint: Which packages does the SDK need to run?
  },
  "devDependencies": {
    // TODO: Add development dependencies here
    // Hint: Which packages are only needed during development?
  }
}

// TODO: Export your answer
export { packageJson }

// Questions to ask yourself:
// 1. Will this package be used at runtime when the SDK is running?
//    → If YES: dependency
//    → If NO: devDependency
//
// 2. Does the user of my SDK need this package installed?
//    → If YES: dependency
//    → If NO: devDependency
//
// 3. Is this a build tool, testing tool, or type definition?
//    → Always: devDependency
