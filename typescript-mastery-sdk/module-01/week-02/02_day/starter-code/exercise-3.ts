// Exercise 3: Fix Strict Mode Errors
// Goal: Learn to handle null/undefined safely with strict mode enabled

/**
 * INSTRUCTIONS:
 * 1. Enable strict mode in your tsconfig.json
 * 2. Fix each function below by adding proper type annotations
 * 3. Handle null/undefined cases safely
 * 4. Run: tsc --strict exercise-3.ts to check
 */

// ============================================
// Problem 1: No Type Annotations
// ============================================

// TODO: Fix this function
// Add proper parameter types and return type
function sendMessage(phoneNumber, message) {
  return `Sending ${message} to ${phoneNumber}`;
}

// Test cases (uncomment after fixing):
// sendMessage("+1234567890", "Hello");  // Should work
// sendMessage(123, "Hello");  // Should error - phoneNumber must be string

// ============================================
// Problem 2: Possible Null/Undefined
// ============================================

// TODO: Fix this function
// The messageId might not exist in statuses object
function getMessageStatus(messageId) {
  const statuses = {
    '123': 'sent',
    '456': 'delivered'
  };
  return statuses[messageId].toUpperCase();  // Error: Object is possibly 'undefined'
}

// Test cases (uncomment after fixing):
// console.log(getMessageStatus('123'));  // Should return "SENT"
// console.log(getMessageStatus('999'));  // Should handle gracefully (not crash)

// ============================================
// Problem 3: Optional Property Access
// ============================================

interface WhatsAppMessage {
  id: string;
  to: string;
  text: string;
  timestamp?: number;  // Optional!
}

// TODO: Fix this function
// timestamp might be undefined
function getMessageAge(message) {
  const now = Date.now();
  return now - message.timestamp;  // Error: message.timestamp is possibly 'undefined'
}

// Test cases (uncomment after fixing):
// const msg1: WhatsAppMessage = { id: '1', to: '+123', text: 'Hi' };
// const msg2: WhatsAppMessage = { id: '2', to: '+123', text: 'Hi', timestamp: Date.now() };
// console.log(getMessageAge(msg1));  // Should handle missing timestamp
// console.log(getMessageAge(msg2));  // Should return number

// ============================================
// Problem 4: Implicit Any
// ============================================

// TODO: Fix this function
// The 'data' parameter has implicit 'any' type
function processAPIResponse(data) {
  return data.messages.map(msg => msg.text);
}

// Hint: Define a proper interface for the data structure

// ============================================
// Problem 5: Null Parameter
// ============================================

// TODO: Fix this function
// user can be null, but function doesn't handle it
function getUserName(user: { name: string } | null) {
  return user.name;  // Error: Object is possibly 'null'
}

// Test cases (uncomment after fixing):
// console.log(getUserName({ name: "John" }));  // Should return "John"
// console.log(getUserName(null));  // Should handle gracefully

// ============================================
// SOLUTIONS CHECKLIST
// ============================================

/**
 * Your fixes should ensure:
 *
 * ✅ All parameters have explicit types
 * ✅ All return types are explicit
 * ✅ Null/undefined cases are handled
 * ✅ Optional properties are checked before use
 * ✅ No 'any' types (unless absolutely necessary with justification)
 *
 * Success criteria:
 * - tsc --strict exercise-3.ts compiles without errors
 * - All test cases work correctly
 * - Code handles edge cases safely
 */

// ============================================
// HINTS
// ============================================

/**
 * Hint 1: Use type guards
 * if (value === null) { ... }
 * if (value === undefined) { ... }
 * if (!value) { ... }
 *
 * Hint 2: Use optional chaining
 * const age = message.timestamp ?? 0;
 *
 * Hint 3: Define interfaces
 * interface APIResponse {
 *   messages: Array<{ text: string }>;
 * }
 *
 * Hint 4: Explicit return types
 * function fn(): string | null { ... }
 */

export {};
