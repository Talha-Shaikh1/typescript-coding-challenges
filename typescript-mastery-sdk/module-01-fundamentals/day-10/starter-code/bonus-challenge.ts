/**
 * Bonus Challenge: Fix Mixed Module Syntax
 * This code mixes CommonJS and ES Modules - fix it!
 */

// ============================================
// BROKEN CODE (Don't use this pattern!)
// ============================================

// mystery-file.ts
const utils = require('./utils');  // ❌ CommonJS

export function processMessage(text) {  // ❌ ES Module
  return utils.format(text);
}

module.exports.processMessage = processMessage;  // ❌ CommonJS again!

// ============================================
// PART 1: Identify Problems
// ============================================

/**
 * TODO: List all the problems with this code:
 *
 * 1. (Your answer)
 * 2. (Your answer)
 * 3. (Your answer)
 *
 * What will happen if you run this?
 * (Your answer)
 */

// ============================================
// PART 2: Fix #1 - Convert to ES Modules
// ============================================

// TODO: Rewrite using only ES Module syntax (import/export)

// ============================================
// PART 3: Fix #2 - Convert to CommonJS
// ============================================

// TODO: Rewrite using only CommonJS syntax (require/module.exports)

// ============================================
// PART 4: Analysis
// ============================================

/**
 * TODO: Answer these questions:
 *
 * 1. Which solution (ES Modules or CommonJS) would you choose?
 * (Your answer)
 *
 * 2. Why?
 * (Your answer)
 *
 * 3. For WhatsApp SDK, which is better and why?
 * (Your answer)
 *
 * 4. When would you still use CommonJS?
 * (Your answer)
 */

// ============================================
// PART 5: Real-World Scenario
// ============================================

/**
 * You're reviewing a pull request and see this:
 */

// file.ts
import axios from 'axios';  // ES Module
const fs = require('fs');   // CommonJS

export async function fetchData() {
  const response = await axios.get('...');
  fs.writeFileSync('data.json', JSON.stringify(response.data));
}

/**
 * TODO:
 * 1. What's wrong?
 * 2. How would you fix it?
 * 3. What would you say in code review?
 */

export {};
