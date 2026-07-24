// Exercise 2: Type Guards - SOLUTION

// Task 1: Create custom type guard for string
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Task 2: Create custom type guard for valid phone
function isValidPhone(value: unknown): value is string {
  // Must be a string
  if (typeof value !== "string") {
    return false;
  }

  // Must start with '+'
  if (!value.startsWith('+')) {
    return false;
  }

  // Must have length >= 10
  if (value.length < 10) {
    return false;
  }

  return true;
}

// Task 3: Create function processInput
function processInput(value: unknown): string {
  // If valid phone, return formatted
  if (isValidPhone(value)) {
    return `Valid phone: ${value}`;
  }

  // If string (but not valid phone), return uppercase
  if (isString(value)) {
    return value.toUpperCase();
  }

  // Otherwise return error message
  return "Invalid input";
}

// Test cases
console.log("=== Exercise 2: Type Guards ===\n");

console.log(processInput("+923001234567"));
// Expected: Valid phone: +923001234567

console.log(processInput("hello"));
// Expected: HELLO

console.log(processInput(123));
// Expected: Invalid input

console.log(processInput("+92300"));
// Expected: +92300 (too short, treated as string, so uppercase)

// More tests
console.log("\n--- Additional tests ---");
console.log(processInput("+14155552671"));      // Valid phone
console.log(processInput("TypeScript"));         // String -> uppercase
console.log(processInput(true));                 // Invalid
console.log(processInput(null));                 // Invalid
console.log(processInput(undefined));            // Invalid
console.log(processInput({ phone: "+92300" })); // Invalid (object)

console.log("\n✅ Type guards enable safe type narrowing!");
