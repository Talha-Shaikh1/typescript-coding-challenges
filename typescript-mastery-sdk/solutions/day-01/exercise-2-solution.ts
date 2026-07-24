// Exercise 2 Solution: Basic Functions

// Function 1: Multiply two numbers
function multiply(a: number, b: number): number {
  return a * b;
}

// Function 2: Get full name
function getFullName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

// Function 3: Check if adult
function isAdult(age: number): boolean {
  return age >= 18;
}

// Testing all functions
console.log("Product:", multiply(5, 3));               // 15
console.log("Full Name:", getFullName("Talha", "Shaikh")); // Talha Shaikh
console.log("Is Adult:", isAdult(25));                 // true
console.log("Is Adult:", isAdult(15));                 // false

// ✅ Key Learnings:
// - Function parameter types: (param: type)
// - Return type annotation: ): returnType {
// - Boolean expressions can be returned directly
// - Template literals for string concatenation

// Alternative: Arrow function syntax
const multiplyArrow = (a: number, b: number): number => a * b;
const getFullNameArrow = (firstName: string, lastName: string): string =>
  `${firstName} ${lastName}`;
const isAdultArrow = (age: number): boolean => age >= 18;

console.log("\nUsing arrow functions:");
console.log("Product:", multiplyArrow(4, 5));
console.log("Full Name:", getFullNameArrow("Ahmed", "Khan"));
console.log("Is Adult:", isAdultArrow(20));
