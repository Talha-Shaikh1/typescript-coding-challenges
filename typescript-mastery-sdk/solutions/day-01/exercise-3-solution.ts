// Exercise 3 Solution: SDK Phone Validator (Real World!)

// Function to validate phone number format
function validatePhoneNumber(phone: string): { isValid: boolean; message: string } {
  // Check if phone starts with '+'
  if (phone.startsWith('+')) {
    return {
      isValid: true,
      message: "Valid format"
    };
  } else {
    return {
      isValid: false,
      message: "Must start with +"
    };
  }
}

// Alternative: More concise version
function validatePhoneNumberConcise(phone: string): { isValid: boolean; message: string } {
  const isValid = phone.startsWith('+');
  return {
    isValid,
    message: isValid ? "Valid format" : "Must start with +"
  };
}

// Test with provided phone numbers
const testNumbers = [
  "+923001234567",  // Valid - Pakistan
  "923001234567",   // Invalid - missing +
  "+14155552671"    // Valid - USA
];

console.log("Testing validatePhoneNumber:\n");

testNumbers.forEach(phone => {
  const result = validatePhoneNumber(phone);
  console.log(`Phone: ${phone}`);
  console.log(`Valid: ${result.isValid}, Message: ${result.message}`);
  console.log("---");
});

// ✅ Key Learnings:
// - Return type can be an object with specific structure
// - Object literal syntax: { key: value }
// - String methods: startsWith()
// - Ternary operator for concise conditionals
// - This is a real utility function for WhatsApp SDK!

// 🎯 Why this matters for SDK:
// WhatsApp Cloud API requires E.164 format: +[country code][number]
// Example: +923001234567 (Pakistan), +14155552671 (USA)
// Our SDK must validate phone numbers before sending messages

// Bonus: Type alias for better reusability
type ValidationResult = {
  isValid: boolean;
  message: string;
};

function validatePhoneNumberWithAlias(phone: string): ValidationResult {
  const isValid = phone.startsWith('+');
  return {
    isValid,
    message: isValid ? "Valid format" : "Must start with +"
  };
}

console.log("\nUsing type alias:");
const result = validatePhoneNumberWithAlias("+923001234567");
console.log(result);
