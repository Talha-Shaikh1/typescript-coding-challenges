// Example 2: Tuples
// Fixed-length arrays with specific types at each position

console.log("=== Basic Tuples ===");

// Tuple: [string, number]
let person: [string, number] = ["Talha", 25];

console.log("Person:", person);
console.log("Name:", person[0]);
console.log("Age:", person[1]);

// Order matters!
// let wrongOrder: [string, number] = [25, "Talha"];  // Error!

// Tuple: [boolean, string]
let result: [boolean, string] = [true, "Success"];
console.log("Result:", result);

// Destructuring tuples
let [success, message] = result;
console.log("Success:", success);
console.log("Message:", message);

console.log("\n=== Function Returning Tuple ===");

// Function that returns tuple
function divide(a: number, b: number): [boolean, number] {
  if (b === 0) {
    return [false, 0];
  }
  return [true, a / b];
}

let [divSuccess, quotient] = divide(10, 2);
console.log("Division success:", divSuccess);
console.log("Quotient:", quotient);

let [divFail, _] = divide(10, 0);
console.log("Division with zero:", divFail);

console.log("\n=== Optional Tuple Elements ===");

// Last element is optional
let response: [number, string, boolean?] = [200, "OK"];
console.log("Response without optional:", response);

let fullResponse: [number, string, boolean?] = [200, "OK", true];
console.log("Response with optional:", fullResponse);

console.log("\n=== Readonly Tuples ===");

// Can't modify readonly tuples
let point: readonly [number, number] = [10, 20];
console.log("Point:", point);

// point[0] = 15;  // Error! Can't modify

// But can read
console.log("X coordinate:", point[0]);
console.log("Y coordinate:", point[1]);

console.log("\n=== SDK Examples ===");

// API response as tuple
function sendMessage(phone: string): [boolean, string, string?] {
  if (!phone.startsWith('+')) {
    return [false, "Invalid phone format", undefined];
  }

  return [true, "Message sent", "wamid.12345"];
}

let [sent, msg, messageId] = sendMessage("+923001234567");
console.log("Sent:", sent);
console.log("Message:", msg);
console.log("Message ID:", messageId);

// Error case
let [failed, errorMsg, noId] = sendMessage("923001234567");
console.log("Failed:", failed);
console.log("Error:", errorMsg);

// Coordinate tuple
type Coordinate = [number, number];

let locationKarachi: Coordinate = [24.8607, 67.0011];
console.log("Karachi location:", locationKarachi);

// Rate limiting tuple: [sent, limit]
type RateLimitInfo = [number, number];

function getRateLimit(): RateLimitInfo {
  return [75, 80]; // 75 sent, 80 limit
}

let [currentSent, maxLimit] = getRateLimit();
console.log(`Rate: ${currentSent}/${maxLimit}`);

console.log("\n=== Tuple vs Array ===");

// Array: unknown length, all same type
let dynamicNumbers: number[] = [1, 2, 3];
dynamicNumbers.push(4, 5, 6); // Can add more
console.log("Array (dynamic):", dynamicNumbers);

// Tuple: fixed length, specific types
let fixedPair: [number, number] = [1, 2];
// fixedPair.push(3);  // Still allows push (TypeScript limitation!)
console.log("Tuple (fixed):", fixedPair);

// Best practice: use readonly for strict tuples
let strictPair: readonly [number, number] = [1, 2];
// strictPair.push(3);  // Error! Can't modify
console.log("Readonly tuple:", strictPair);

console.log("\n✅ Example 2 complete!");
