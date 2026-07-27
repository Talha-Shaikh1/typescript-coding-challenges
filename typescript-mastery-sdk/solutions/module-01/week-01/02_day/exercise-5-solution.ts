// Exercise 5 Solution: Boolean Logic for Validation

// Function 1: Validate phone number
function isValidPhoneNumber(phone: string): boolean {
  // Must start with '+'
  if (!phone.startsWith('+')) {
    return false;
  }

  // Must be at least 10 characters
  if (phone.length < 10) {
    return false;
  }

  // Must contain only digits after +
  const phonePattern = /^\+\d+$/;
  return phonePattern.test(phone);
}

// Function 2: Validate message
function isValidMessage(text: string): boolean {
  // Must not be empty
  if (text.length === 0) {
    return false;
  }

  // Must be <= 4096 characters (WhatsApp limit)
  if (text.length > 4096) {
    return false;
  }

  return true;
}

// Function 3: Can send message (all conditions must be true)
function canSendMessage(
  isAuthenticated: boolean,
  hasQuota: boolean,
  isValidPhone: boolean
): boolean {
  return isAuthenticated && hasQuota && isValidPhone;
}

// Testing
console.log("=== Phone Validation ===");
console.log("Valid phone (+923001234567):", isValidPhoneNumber("+923001234567")); // true
console.log("Valid phone (+14155552671):", isValidPhoneNumber("+14155552671"));   // true
console.log("Invalid (no +):", isValidPhoneNumber("923001234567"));               // false
console.log("Invalid (too short):", isValidPhoneNumber("+92300"));                // false
console.log("Invalid (has letters):", isValidPhoneNumber("+92300abc"));           // false

console.log("\n=== Message Validation ===");
console.log("Valid message:", isValidMessage("Hello World"));                     // true
console.log("Empty message:", isValidMessage(""));                                // false
console.log("Too long:", isValidMessage("a".repeat(5000)));                       // false
console.log("Max length (4096):", isValidMessage("a".repeat(4096)));              // true

console.log("\n=== Send Permission ===");
console.log("Can send (all true):", canSendMessage(true, true, true));            // true
console.log("Can't send (not auth):", canSendMessage(false, true, true));         // false
console.log("Can't send (no quota):", canSendMessage(true, false, true));         // false
console.log("Can't send (invalid phone):", canSendMessage(true, true, false));    // false

// ✅ Key Learnings:
// - Boolean logic with && (AND) operator
// - String validation with startsWith, length, regex
// - Regex pattern: /^\+\d+$/ means "starts with + followed by only digits"
// - Multiple validation checks can be combined
// - Return early pattern for cleaner code

// 🎯 SDK Application:
// isValidPhoneNumber: E.164 format validation for WhatsApp
// isValidMessage: Ensure messages meet WhatsApp limits
// canSendMessage: Check all conditions before sending

// Cleaner implementations:

// One-liner versions:
const isValidPhoneCompact = (phone: string): boolean =>
  phone.startsWith('+') && phone.length >= 10 && /^\+\d+$/.test(phone);

const isValidMessageCompact = (text: string): boolean =>
  text.length > 0 && text.length <= 4096;

const canSendMessageCompact = (auth: boolean, quota: boolean, phone: boolean): boolean =>
  auth && quota && phone;

console.log("\n=== Compact Versions ===");
console.log("Compact phone:", isValidPhoneCompact("+923001234567"));
console.log("Compact message:", isValidMessageCompact("Hello"));
console.log("Compact can send:", canSendMessageCompact(true, true, true));

// Enhanced with detailed error messages:
type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

function validatePhoneNumberDetailed(phone: string): ValidationResult {
  const errors: string[] = [];

  if (!phone.startsWith('+')) {
    errors.push("Phone must start with +");
  }

  if (phone.length < 10) {
    errors.push("Phone must be at least 10 characters");
  }

  if (!/^\+\d+$/.test(phone)) {
    errors.push("Phone must contain only digits after +");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

console.log("\n=== Detailed Validation ===");
console.log(validatePhoneNumberDetailed("92300"));
// { isValid: false, errors: ["Phone must start with +", "Phone must be at least 10 characters"] }

console.log(validatePhoneNumberDetailed("+923001234567"));
// { isValid: true, errors: [] }
