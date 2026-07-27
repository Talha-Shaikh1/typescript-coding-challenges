"use strict";
// Example 2: String Type Deep Dive
// All about working with strings in TypeScript
// Basic strings
let name = "Talha";
let city = "Karachi";
// Template literals (better than concatenation)
let greeting = `Hello, ${name} from ${city}!`;
console.log(greeting);
// Multi-line strings
let message = `
  Dear ${name},
  Welcome to our WhatsApp SDK.
  We're glad to have you!
`;
console.log(message);
// String methods - all return strings
let upper = name.toUpperCase(); // "TALHA"
let lower = name.toLowerCase(); // "talha"
let trimmed = "  text  ".trim(); // "text"
let replaced = "hello".replace("h", "H"); // "Hello"
console.log("Upper:", upper);
console.log("Lower:", lower);
console.log("Trimmed:", trimmed);
// String properties
let length = name.length; // 5
console.log("Length:", length);
// String checking
let startsWithT = name.startsWith("T");
let endsWithA = name.endsWith("a");
let includesL = name.includes("l");
console.log("Starts with T:", startsWithT);
console.log("Ends with a:", endsWithA);
console.log("Includes l:", includesL);
// SDK Real-world examples
function formatPhoneNumber(phone) {
    // Remove spaces and dashes
    let cleaned = phone.replace(/[- ]/g, "");
    // Add + if missing
    if (!cleaned.startsWith("+")) {
        cleaned = "+92" + cleaned;
    }
    return cleaned;
}
console.log("\nSDK Examples:");
console.log(formatPhoneNumber("300 1234567")); // +923001234567
console.log(formatPhoneNumber("+92-300-1234567")); // +923001234567
function createWelcomeMessage(name) {
    return `Welcome ${name}! Reply HELP for assistance.`;
}
console.log(createWelcomeMessage("Ahmed"));
console.log("✅ Example 2 complete!");
