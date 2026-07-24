// Example 2: String Type Deep Dive
// All about working with strings in TypeScript

// Basic strings
let name: string = "Talha";
let city: string = "Karachi";

// Template literals (better than concatenation)
let greeting: string = `Hello, ${name} from ${city}!`;
console.log(greeting);

// Multi-line strings
let message: string = `
  Dear ${name},
  Welcome to our WhatsApp SDK.
  We're glad to have you!
`;
console.log(message);

// String methods - all return strings
let upper: string = name.toUpperCase();     // "TALHA"
let lower: string = name.toLowerCase();     // "talha"
let trimmed: string = "  text  ".trim();    // "text"
let replaced: string = "hello".replace("h", "H"); // "Hello"

console.log("Upper:", upper);
console.log("Lower:", lower);
console.log("Trimmed:", trimmed);

// String properties
let length: number = name.length;  // 5
console.log("Length:", length);

// String checking
let startsWithT: boolean = name.startsWith("T");
let endsWithA: boolean = name.endsWith("a");
let includesL: boolean = name.includes("l");

console.log("Starts with T:", startsWithT);
console.log("Ends with a:", endsWithA);
console.log("Includes l:", includesL);

// SDK Real-world examples
function formatPhoneNumber(phone: string): string {
  // Remove spaces and dashes
  let cleaned: string = phone.replace(/[- ]/g, "");

  // Add + if missing
  if (!cleaned.startsWith("+")) {
    cleaned = "+92" + cleaned;
  }

  return cleaned;
}

console.log("\nSDK Examples:");
console.log(formatPhoneNumber("300 1234567"));    // +923001234567
console.log(formatPhoneNumber("+92-300-1234567")); // +923001234567

function createWelcomeMessage(name: string): string {
  return `Welcome ${name}! Reply HELP for assistance.`;
}

console.log(createWelcomeMessage("Ahmed"));

console.log("✅ Example 2 complete!");
