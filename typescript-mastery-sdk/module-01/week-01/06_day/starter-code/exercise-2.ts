// Exercise 2: Type Guards
// Goal: Create type guards for safe type checking

// TODO: Task 1 - Create custom type guard for string
// function isString(value: unknown): value is string {
//   // Return true if value is a string
// }

// TODO: Task 2 - Create custom type guard for valid phone
// function isValidPhone(value: unknown): value is string {
//   // Check if:
//   // 1. value is a string
//   // 2. starts with '+'
//   // 3. length >= 10
// }

// TODO: Task 3 - Create function processInput
// function processInput(value: unknown): string {
//   // If valid phone, return "Valid phone: " + value
//   // If string (but not valid phone), return uppercase
//   // Otherwise return "Invalid input"
// }

// Test your code (uncomment after implementation):
// console.log(processInput("+923001234567"));  // Expected: "Valid phone: +923001234567"
// console.log(processInput("hello"));          // Expected: "HELLO"
// console.log(processInput(123));              // Expected: "Invalid input"
// console.log(processInput("+92300"));         // Expected: "+92300" (too short, so just uppercase)

// Expected Output:
// Valid phone: +923001234567
// HELLO
// Invalid input
