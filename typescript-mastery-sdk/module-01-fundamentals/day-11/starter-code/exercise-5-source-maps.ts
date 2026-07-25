/**
 * Exercise 5: Debug with Source Maps
 * This code has a bug - practice debugging with source maps
 */

// src/validators.ts

export function validatePhone(phone: string): boolean {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  // TODO: There's a bug here - this regex doesn't allow + at the start
  // But phone numbers like "+1234567890" should be valid
  const isValid = /^\d{10,15}$/.test(phone);

  if (!isValid) {
    throw new Error(`Invalid phone: ${phone}`);
  }

  return isValid;
}

export function validateMessage(message: string): boolean {
  // TODO: Bug - should check if message exists first!
  return message.trim().length > 0;
}

// ============================================
// YOUR TASKS
// ============================================

/**
 * TASK 1: Build WITHOUT source maps
 *
 * 1. Create tsconfig.json with sourceMap: false
 * 2. Compile this file
 * 3. Run: node dist/validators.js
 * 4. Trigger the error by calling with invalid input
 *
 * QUESTIONS:
 * - What line number does the error point to?
 * - Does it point to .ts or .js file?
 * - Is it easy to find the bug?
 */

/**
 * TASK 2: Build WITH source maps
 *
 * 1. Create tsconfig.json with sourceMap: true
 * 2. Recompile
 * 3. Run: node --enable-source-maps dist/validators.js
 * 4. Trigger the same error
 *
 * QUESTIONS:
 * - What line number does the error point to now?
 * - Does it point to .ts or .js file?
 * - Is it easier to find the bug?
 * - What .map file was created?
 */

/**
 * TASK 3: Fix the bugs
 *
 * 1. Fix validatePhone to allow + at start
 * 2. Fix validateMessage to check for null/undefined
 * 3. Recompile and test
 */

/**
 * TASK 4: Analysis
 *
 * Answer these questions:
 *
 * 1. Why are source maps important?
 * (Your answer)
 *
 * 2. When would you disable source maps?
 * (Your answer)
 *
 * 3. Should you ship source maps to production?
 * (Your answer)
 */

export {};
