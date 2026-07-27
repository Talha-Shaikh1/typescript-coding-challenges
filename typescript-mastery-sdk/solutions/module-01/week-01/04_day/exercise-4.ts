// Exercise 4: Methods in Interfaces - SOLUTION

// Task 1: PhoneValidator interface with methods
interface PhoneValidator {
  isValid(phone: string): boolean;
  format(phone: string): string;
  getCountryCode(phone: string): string;
}

// Task 2: Implement the interface
const phoneValidator: PhoneValidator = {
  isValid(phone: string): boolean {
    // Check if starts with + and length >= 10
    return phone.startsWith('+') && phone.length >= 10;
  },

  format(phone: string): string {
    // Add +92 if missing
    if (phone.startsWith('+')) {
      return phone;
    }
    return `+92${phone}`;
  },

  getCountryCode(phone: string): string {
    // Extract first 2-3 digits after +
    if (!phone.startsWith('+')) {
      return '';
    }

    // Match 1-3 digits after +
    const match = phone.match(/^\+(\d{1,3})/);
    return match ? match[1] : '';
  }
};

// Task 3: Test all methods
console.log("=== Exercise 4: Methods in Interfaces ===\n");

const validPhone = "+923001234567";
console.log("Is valid:", phoneValidator.isValid(validPhone));
// Expected: Is valid: true

const unformattedPhone = "3001234567";
console.log("Formatted:", phoneValidator.format(unformattedPhone));
// Expected: Formatted: +923001234567

console.log("Country code:", phoneValidator.getCountryCode(validPhone));
// Expected: Country code: 92

// Test with different country codes
console.log("\nTesting with different countries:");
console.log("US +1:", phoneValidator.getCountryCode("+14155552671")); // 1
console.log("UK +44:", phoneValidator.getCountryCode("+442071234567")); // 44
console.log("India +91:", phoneValidator.getCountryCode("+919876543210")); // 91

console.log("\nTesting validation:");
console.log("Valid +92300..:", phoneValidator.isValid("+923001234567")); // true
console.log("Invalid 92300..:", phoneValidator.isValid("923001234567")); // false
console.log("Invalid +92:", phoneValidator.isValid("+92")); // false (too short)

console.log("\n✅ Interface methods define contracts for implementations!");
