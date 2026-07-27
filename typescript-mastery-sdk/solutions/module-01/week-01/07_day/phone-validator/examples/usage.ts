// usage.ts - Example Usage - SOLUTION

import {
  PhoneValidator,
  validate,
  validateBatch,
  formatBatch,
  addCountryCode,
  getPhoneInfo
} from "../src/index";

console.log("📞 Phone Validator Examples\n");

// Example 1 - Single Validation
console.log("=== Example 1: Single Validation ===");
const result = validate("+923001234567");
console.log(result);
// Output: { isValid: true, formatted: "+923001234567" }

const invalidResult = validate("923001234567");
console.log(invalidResult);
// Output: { isValid: false, error: "Phone must start with +" }

// Example 2 - Batch Validation
console.log("\n=== Example 2: Batch Validation ===");
const phones = ["+923001234567", "invalid", "+14155552671"];
const results = validateBatch(phones);
results.forEach((result, i) => {
  console.log(`Phone ${i + 1}:`, result);
});

// Example 3 - Formatting
console.log("\n=== Example 3: Formatting ===");
const unformatted = "3001234567";
const formatted = addCountryCode(unformatted, "92");
console.log(`${unformatted} → ${formatted}`);

// Example 4 - Using PhoneValidator Class
console.log("\n=== Example 4: Using PhoneValidator Class ===");
const validator = new PhoneValidator("92");
console.log("Format:", validator.format("3001234567"));
console.log("Validate:", validator.validate("+923001234567"));
console.log("Info:", validator.getInfo("+923001234567"));

// Example 5 - Error Handling
console.log("\n=== Example 5: Error Handling ===");
const validationResult = validate("invalid");
if (!validationResult.isValid) {
  console.log("Error:", validationResult.error);
}

// Example 6 - Batch Formatting
console.log("\n=== Example 6: Batch Formatting ===");
const unformattedList = ["3001234567", "3121234567", "3331234567"];
const formattedList = formatBatch(unformattedList, "92");
console.log("Formatted:", formattedList);

// Example 7 - Extract Phone Information
console.log("\n=== Example 7: Extract Phone Information ===");
const info = getPhoneInfo("+923001234567");
console.log("Original:", info.original);
console.log("Formatted:", info.formatted);
console.log("Country Code:", info.countryCode);
console.log("National Number:", info.nationalNumber);
console.log("Is Valid:", info.isValid);

// Example 8 - Multiple Country Codes
console.log("\n=== Example 8: Multiple Country Codes ===");
const countries = [
  { code: "92" as const, phone: "3001234567" },
  { code: "1" as const, phone: "4155552671" },
  { code: "44" as const, phone: "2071234567" }
];

countries.forEach(({ code, phone }) => {
  const formatted = addCountryCode(phone, code);
  const info = getPhoneInfo(formatted);
  console.log(`${code}: ${phone} → ${formatted} (Valid: ${info.isValid})`);
});

console.log("\n✅ All examples complete!");
