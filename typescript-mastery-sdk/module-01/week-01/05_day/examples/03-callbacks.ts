// Example 3: Function Types and Callbacks
// Functions as first-class citizens

console.log("=== Function Type Variables ===");

// Function type annotation
let add: (a: number, b: number) => number;

// Assign function
add = (a, b) => a + b;
console.log("Add:", add(5, 3));

// Reassign
add = (a, b) => a * b;
console.log("Multiply:", add(5, 3));

console.log("\n=== Type Aliases for Functions ===");

type MathOperation = (a: number, b: number) => number;

let subtract: MathOperation = (a, b) => a - b;
let divide: MathOperation = (a, b) => b !== 0 ? a / b : 0;

console.log("Subtract:", subtract(10, 3));
console.log("Divide:", divide(10, 2));

console.log("\n=== Callback Functions ===");

function processNumbers(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  return numbers.map(callback);
}

let doubled = processNumbers([1, 2, 3], n => n * 2);
let squared = processNumbers([1, 2, 3], n => n * n);

console.log("Doubled:", doubled);
console.log("Squared:", squared);

console.log("\n=== SDK Callback Example ===");

type MessageCallback = (success: boolean, messageId?: string, error?: string) => void;

function sendMessage(
  phone: string,
  text: string,
  callback: MessageCallback
): void {
  console.log(`Sending to ${phone}: ${text}`);

  // Simulate async operation
  setTimeout(() => {
    if (phone.startsWith('+')) {
      callback(true, "wamid_12345");
    } else {
      callback(false, undefined, "Invalid phone format");
    }
  }, 1000);
}

// Using the callback
sendMessage("+923001234567", "Hello", (success, id, error) => {
  if (success) {
    console.log("✅ Message sent! ID:", id);
  } else {
    console.log("❌ Failed:", error);
  }
});

console.log("\n=== Higher Order Functions ===");

function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

let double = createMultiplier(2);
let triple = createMultiplier(3);

console.log("Double 5:", double(5));
console.log("Triple 5:", triple(5));

console.log("\n=== SDK Transform Pattern ===");

type TransformFunction = (text: string) => string;

function sendTransformed(
  phone: string,
  text: string,
  transform: TransformFunction
): object {
  let transformed = transform(text);
  return {
    to: phone,
    text: transformed,
    original: text
  };
}

let uppercase: TransformFunction = (text) => text.toUpperCase();
let addPrefix: TransformFunction = (text) => `[SDK] ${text}`;

console.log(sendTransformed("+92300", "hello", uppercase));
console.log(sendTransformed("+92300", "message", addPrefix));

console.log("\n=== Array of Functions ===");

type Validator = (phone: string) => boolean;

let validators: Validator[] = [
  (phone) => phone.startsWith('+'),
  (phone) => phone.length >= 10,
  (phone) => /^\+\d+$/.test(phone)
];

function isValid(phone: string): boolean {
  return validators.every(validate => validate(phone));
}

console.log("Valid +923001234567:", isValid("+923001234567"));
console.log("Invalid 92300:", isValid("92300"));

console.log("\n=== Promise Callbacks ===");

type PromiseCallback<T> = (value: T) => void;
type ErrorCallback = (error: Error) => void;

function fetchData(
  onSuccess: PromiseCallback<string>,
  onError: ErrorCallback
): void {
  setTimeout(() => {
    let success = Math.random() > 0.5;
    if (success) {
      onSuccess("Data loaded successfully");
    } else {
      onError(new Error("Failed to load data"));
    }
  }, 1000);
}

fetchData(
  (data) => console.log("✅", data),
  (error) => console.log("❌", error.message)
);

console.log("\n✅ Example 3 complete!");
