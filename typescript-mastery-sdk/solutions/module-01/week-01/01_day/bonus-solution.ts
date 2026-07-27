// Bonus Challenge Solution: Format Phone Number

function formatPhoneNumber(phone: string): string {
  // If phone already starts with '+', return as is
  if (phone.startsWith('+')) {
    return phone;
  }

  // Otherwise, add Pakistan country code (+92)
  return `+92${phone}`;
}

// Test cases
console.log(formatPhoneNumber("3001234567"));    // +923001234567
console.log(formatPhoneNumber("+923001234567")); // +923001234567
console.log(formatPhoneNumber("3121234567"));    // +923121234567
console.log(formatPhoneNumber("+14155552671"));  // +14155552671

// ✅ Key Learnings:
// - Conditional logic in functions
// - String manipulation with template literals
// - Early return pattern (if condition, return early)

// 🎯 Real SDK Usage:
// This will be part of our phone utilities module
// User can pass "3001234567" and we auto-format to "+923001234567"

// Advanced version: Detect country code
function formatPhoneNumberAdvanced(
  phone: string,
  defaultCountryCode: string = "92"
): string {
  if (phone.startsWith('+')) {
    return phone;
  }
  return `+${defaultCountryCode}${phone}`;
}

console.log("\nAdvanced version:");
console.log(formatPhoneNumberAdvanced("3001234567"));           // +923001234567
console.log(formatPhoneNumberAdvanced("4155552671", "1"));      // +14155552671
console.log(formatPhoneNumberAdvanced("447700900123", "44"));   // +44447700900123

// ✅ Bonus Learnings:
// - Default parameter values
// - Function parameters with defaults
// - Making functions more flexible and reusable
