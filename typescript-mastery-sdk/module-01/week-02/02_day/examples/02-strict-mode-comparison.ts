/**
 * Example 2: Understanding Strict Mode
 * This file demonstrates WHY strict mode matters
 */

// ============================================
// PROBLEM: Without Strict Mode (strict: false)
// ============================================

/*
// This code would compile fine without strict mode:

function sendWhatsAppMessage(phoneNumber, message) {
  // Problem 1: No type checking
  return phoneNumber.toUpperCase(); // Works even though phoneNumber should be a number!
}

function getMessageStatus(messageId) {
  const statuses = {
    '123': 'sent',
    '456': 'delivered'
  };
  // Problem 2: No null check required
  return statuses[messageId].toUpperCase(); // Runtime crash if messageId not found!
}

function formatMessage(text) {
  // Problem 3: Implicit any
  return text.trim(); // What if text is undefined?
}

// WHY THIS IS DANGEROUS:
// ❌ Bugs only appear at runtime
// ❌ Production crashes
// ❌ Hard to debug
// ❌ No IDE help
*/

// ============================================
// SOLUTION: With Strict Mode (strict: true)
// ============================================

/**
 * 1. strictNullChecks: Forces you to handle null/undefined
 */

// ❌ Without strictNullChecks - compiles but crashes
function getUserNameUnsafe(user: { name: string } | null) {
  // return user.name; // Error: Object is possibly 'null'
}

// ✅ With strictNullChecks - forced to handle null
function getUserNameSafe(user: { name: string } | null): string {
  if (!user) {
    return "Guest";
  }
  return user.name; // TypeScript knows user is not null here
}

/**
 * 2. noImplicitAny: No sneaky 'any' types allowed
 */

// ❌ Without noImplicitAny - dangerous
// function processData(data) { // Implicitly 'any' - no checking!
//   return data.value;
// }

// ✅ With noImplicitAny - must specify type
function processData(data: { value: string }): string {
  return data.value; // TypeScript validates this
}

/**
 * 3. strictFunctionTypes: Prevents wrong function assignments
 */

type MessageHandler = (message: string | null) => void;

// ❌ Without strict - this would be allowed (unsafe!)
// function handleMessage(message: string) { // Doesn't handle null!
//   console.log(message.toUpperCase());
// }
// const handler: MessageHandler = handleMessage; // Runtime crash if message is null

// ✅ With strict - forced to handle all cases
function handleMessageSafe(message: string | null): void {
  if (message === null) {
    console.log("No message");
    return;
  }
  console.log(message.toUpperCase());
}
const handler: MessageHandler = handleMessageSafe; // Safe!

/**
 * 4. Real WhatsApp SDK Example
 */

interface WhatsAppMessage {
  id: string;
  to: string;
  text: string;
  timestamp?: number; // Optional property
}

// ❌ Without strict - potential runtime error
// function getMessageAge(message: WhatsAppMessage) {
//   const now = Date.now();
//   return now - message.timestamp; // Error if timestamp is undefined!
// }

// ✅ With strict - must handle optional property
function getMessageAge(message: WhatsAppMessage): number | null {
  if (message.timestamp === undefined) {
    return null; // Explicit handling
  }
  const now = Date.now();
  return now - message.timestamp;
}

/**
 * 5. strictBindCallApply: Type-safe function calls
 */

function sendMessage(phoneNumber: string, text: string): void {
  console.log(`Sending "${text}" to ${phoneNumber}`);
}

// ❌ Without strict - wrong arguments compile
// sendMessage.call(null, 123, 456); // Both should be strings!

// ✅ With strict - TypeScript catches wrong arguments
sendMessage.call(null, "+1234567890", "Hello"); // Correct types!
// sendMessage.call(null, 123, 456); // Error: Argument of type 'number' not assignable

/**
 * REAL-WORLD IMPACT IN WHATSAPP SDK
 */

interface APIResponse {
  success: boolean;
  data?: {
    messageId: string;
    status: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

// Without strict mode: Dangerous!
// function handleAPIResponse(response: APIResponse) {
//   console.log(response.data.messageId); // Crash if data is undefined!
// }

// With strict mode: Safe!
function handleAPIResponse(response: APIResponse): string {
  if (!response.success || !response.data) {
    const errorMsg = response.error?.message ?? "Unknown error";
    throw new Error(errorMsg);
  }

  // TypeScript knows response.data exists here
  return response.data.messageId;
}

/**
 * KEY TAKEAWAYS:
 *
 * ✅ strict: true catches bugs at COMPILE TIME, not RUNTIME
 * ✅ Forces you to handle edge cases (null, undefined, optional properties)
 * ✅ Better IDE autocomplete and error detection
 * ✅ More maintainable code - explicit about what can be null
 * ✅ Essential for production libraries like WhatsApp SDK
 *
 * ❌ Without strict mode:
 * ❌ Silent bugs
 * ❌ Runtime crashes
 * ❌ Hard to debug
 * ❌ Poor developer experience for SDK users
 */

// Example usage:
const testMessage: WhatsAppMessage = {
  id: "msg123",
  to: "+1234567890",
  text: "Hello World"
  // timestamp is optional
};

console.log(getMessageAge(testMessage)); // Returns null safely

const testMessageWithTimestamp: WhatsAppMessage = {
  id: "msg124",
  to: "+1234567890",
  text: "Hello Again",
  timestamp: Date.now()
};

console.log(getMessageAge(testMessageWithTimestamp)); // Returns number
