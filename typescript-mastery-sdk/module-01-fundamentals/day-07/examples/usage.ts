// Phone Validator - Example Usage
// This shows how to use the phone validator utility

import {
  validate,
  validateBatch,
  addCountryCode,
  extractCountryCode,
  getPhoneInfo,
  formatBatch,
  PhoneValidator
} from "../src/index";

console.log("=== Phone Validator Example Usage ===\n");

// Single validation
console.log("--- Single Validation ---");
let result1 = validate("+923001234567");
console.log("+923001234567:", result1);

let result2 = validate("923001234567");
console.log("923001234567:", result2);

let result3 = validate("+92300");
console.log("+92300:", result3);

// Formatting
console.log("\n--- Formatting ---");
let formatted1 = addCountryCode("3001234567", "92");
console.log("Format 3001234567:", formatted1);

let formatted2 = addCountryCode("+923001234567");
console.log("Already formatted:", formatted2);

// Extract country code
console.log("\n--- Extract Country Code ---");
let code1 = extractCountryCode("+923001234567");
console.log("Country code from +923001234567:", code1);

let code2 = extractCountryCode("+14155552671");
console.log("Country code from +14155552671:", code2);

// Phone info
console.log("\n--- Phone Information ---");
let info = getPhoneInfo("+923001234567");
console.log("Phone info:", info);

// Batch operations
console.log("\n--- Batch Operations ---");
let phones = [
  "+923001234567",
  "invalid",
  "+14155552671",
  "92300",
  "+442071234567"
];

let results = validateBatch(phones);
console.log("Batch validation:");
results.forEach((result, i) => {
  console.log(`  ${phones[i]}: ${result.isValid ? "✅" : "❌"}`);
});

let toFormat = ["3001234567", "3121234567", "3331234567"];
let formatted = formatBatch(toFormat, "92");
console.log("\nBatch formatting:", formatted);

// Using PhoneValidator class
console.log("\n--- Using PhoneValidator Class ---");
let validator = new PhoneValidator("92");

console.log("Validate:", validator.validate("+923001234567"));
console.log("Format:", validator.format("3001234567"));
console.log("Get info:", validator.getInfo("+923001234567"));

console.log("\n✅ Example complete!");
