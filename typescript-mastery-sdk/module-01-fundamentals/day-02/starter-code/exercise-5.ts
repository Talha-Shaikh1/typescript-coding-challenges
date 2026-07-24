// Exercise 5: Boolean Logic for Validation

// TODO 1: Create isValidPhoneNumber function
// - Must start with '+'
// - Must be at least 10 characters
// - Must contain only digits after +
// function isValidPhoneNumber(phone: string): boolean {
//   // Check starts with +
//   // Check length >= 10
//   // Check only digits after + using: /^\+\d+$/.test(phone)
//
// }

// TODO 2: Create isValidMessage function
// - Must not be empty (length > 0)
// - Must be <= 4096 characters (WhatsApp limit)
// function isValidMessage(text: string): boolean {
//
// }

// TODO 3: Create canSendMessage function
// - Return true only if ALL conditions are true
// - Use && operator
// function canSendMessage(
//   isAuthenticated: boolean,
//   hasQuota: boolean,
//   isValidPhone: boolean
// ): boolean {
//
// }

// TODO: Test your functions
// console.log("Valid phone:", isValidPhoneNumber("+923001234567"));
// console.log("Valid phone:", isValidPhoneNumber("92300"));
// console.log("Valid message:", isValidMessage("Hello"));
// console.log("Valid message:", isValidMessage("a".repeat(5000)));
// console.log("Can send:", canSendMessage(true, true, true));
// console.log("Can send:", canSendMessage(false, true, true));
