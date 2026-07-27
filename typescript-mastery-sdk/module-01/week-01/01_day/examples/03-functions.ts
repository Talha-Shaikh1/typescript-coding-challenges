// Example 3: Functions with Types
// Functions can have typed parameters and return types

// Function with typed parameters and return type
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Function that returns a number
function add(a: number, b: number): number {
  return a + b;
}

// Function that returns nothing (void)
function logMessage(message: string): void {
  console.log(message);
}

// Using the functions
const greeting = greet("Talha");
console.log(greeting);

const sum = add(10, 20);
console.log("Sum:", sum);

logMessage("This is a log message");

// Try uncommenting these to see errors:
// greet(123); // Error! Expected string, got number
// add("10", "20"); // Error! Expected numbers, got strings

// Arrow functions with types
const multiply = (a: number, b: number): number => {
  return a * b;
};

// Short arrow function
const square = (n: number): number => n * n;

console.log("Multiply:", multiply(5, 3));
console.log("Square:", square(4));

// SDK Related Example: Phone Validation
function isValidPhoneFormat(phone: string): boolean {
  // Check if phone starts with '+'
  return phone.startsWith('+');
}

console.log("Valid phone:", isValidPhoneFormat("+923001234567")); // true
console.log("Invalid phone:", isValidPhoneFormat("923001234567")); // false

console.log("✅ Example 3 complete!");
