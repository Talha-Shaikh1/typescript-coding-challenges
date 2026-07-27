// usage.ts - Example Usage
// Exercise 7: Add usage examples for all features

// TODO: Import necessary functions and classes
// import { PhoneValidator, validate, formatBatch, ... } from "../src/index";

console.log("📞 Phone Validator Examples\n");

// TODO: Example 1 - Single Validation
console.log("=== Example 1: Single Validation ===");
// const result = validate("+923001234567");
// console.log(result);

// TODO: Example 2 - Batch Validation
console.log("\n=== Example 2: Batch Validation ===");
// const phones = ["+923001234567", "invalid", "+14155552671"];
// const results = validateBatch(phones);
// results.forEach((result, i) => {
//   console.log(`Phone ${i + 1}:`, result);
// });

// TODO: Example 3 - Formatting
console.log("\n=== Example 3: Formatting ===");
// const unformatted = "3001234567";
// const formatted = addCountryCode(unformatted, "92");
// console.log(`${unformatted} → ${formatted}`);

// TODO: Example 4 - Using PhoneValidator Class
console.log("\n=== Example 4: Using PhoneValidator Class ===");
// const validator = new PhoneValidator("92");
// console.log("Format:", validator.format("3001234567"));
// console.log("Validate:", validator.validate("+923001234567"));
// console.log("Info:", validator.getInfo("+923001234567"));

// TODO: Example 5 - Error Handling
console.log("\n=== Example 5: Error Handling ===");
// const result = validate("invalid");
// if (!result.isValid) {
//   console.log("Error:", result.error);
// }

// TODO: Example 6 - Batch Formatting
console.log("\n=== Example 6: Batch Formatting ===");
// const unformattedList = ["3001234567", "3121234567", "3331234567"];
// const formattedList = formatBatch(unformattedList, "92");
// console.log("Formatted:", formattedList);

console.log("\n✅ All examples complete!");
