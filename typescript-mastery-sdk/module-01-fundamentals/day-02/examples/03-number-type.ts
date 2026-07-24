// Example 3: Number Type Deep Dive
// All about working with numbers in TypeScript

// All numbers are same type (no int/float distinction)
let integer: number = 42;
let decimal: number = 3.14;
let negative: number = -10;

console.log("Integer:", integer);
console.log("Decimal:", decimal);
console.log("Negative:", negative);

// Different number formats
let hex: number = 0xff;        // 255 in hexadecimal
let binary: number = 0b1010;   // 10 in binary
let octal: number = 0o744;     // 484 in octal

console.log("Hex:", hex);
console.log("Binary:", binary);
console.log("Octal:", octal);

// Special number values
let infinity: number = Infinity;
let negInfinity: number = -Infinity;
let notANumber: number = NaN;

console.log("Infinity:", infinity);
console.log("NaN:", notANumber);

// Math operations
let sum: number = 10 + 5;      // 15
let diff: number = 10 - 5;     // 5
let product: number = 10 * 5;  // 50
let quotient: number = 10 / 5; // 2
let remainder: number = 10 % 3; // 1

console.log("\nMath operations:");
console.log("Sum:", sum);
console.log("Remainder:", remainder);

// Math object methods
let rounded: number = Math.round(3.7);    // 4
let floored: number = Math.floor(3.7);    // 3
let ceiled: number = Math.ceil(3.2);      // 4
let random: number = Math.random();       // 0 to 1

console.log("\nMath methods:");
console.log("Rounded:", rounded);
console.log("Random:", random);

// Number methods
let fixed: string = (3.14159).toFixed(2);     // "3.14" (returns string!)
let fixedNum: number = parseFloat(fixed);     // 3.14 (convert back)

console.log("Fixed:", fixed, "- Type:", typeof fixed);
console.log("Fixed Num:", fixedNum, "- Type:", typeof fixedNum);

// SDK Real-world examples
console.log("\nSDK Examples:");

// Retry delay calculation (exponential backoff)
function calculateRetryDelay(attempt: number): number {
  return Math.pow(2, attempt) * 1000; // 2^attempt seconds
}

console.log("Retry attempt 0:", calculateRetryDelay(0), "ms"); // 1000ms
console.log("Retry attempt 1:", calculateRetryDelay(1), "ms"); // 2000ms
console.log("Retry attempt 2:", calculateRetryDelay(2), "ms"); // 4000ms

// Rate limiting
const MESSAGES_PER_SECOND: number = 80;
const RATE_LIMIT_WINDOW: number = 1000; // milliseconds

function canSendMessage(sentInWindow: number): boolean {
  return sentInWindow < MESSAGES_PER_SECOND;
}

console.log("Can send (70 sent):", canSendMessage(70));  // true
console.log("Can send (80 sent):", canSendMessage(80));  // false

// Success rate calculation
function calculateSuccessRate(sent: number, total: number): number {
  if (total === 0) return 0;
  return parseFloat(((sent / total) * 100).toFixed(2));
}

console.log("Success rate:", calculateSuccessRate(75, 100), "%");

console.log("✅ Example 3 complete!");
