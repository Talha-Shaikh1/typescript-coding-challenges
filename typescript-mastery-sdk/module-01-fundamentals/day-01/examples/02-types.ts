// Example 2: Basic Types
// TypeScript has several basic types

// String type
const name: string = "Talha";
const city: string = "Karachi";

// Number type (integers and decimals both)
const age: number = 25;
const price: number = 99.99;
const negative: number = -10;

// Boolean type
const isStudent: boolean = true;
const hasTypeScript: boolean = false;

// Print all
console.log("Name:", name);
console.log("City:", city);
console.log("Age:", age);
console.log("Price:", price);
console.log("Is Student:", isStudent);

// Type inference (TypeScript guesses the type)
const autoName = "Ahmed"; // TypeScript knows this is string
const autoAge = 30; // TypeScript knows this is number

// Try uncommenting these to see errors:
// autoName = 123; // Error! TypeScript remembers it's a string
// autoAge = "twenty"; // Error! TypeScript remembers it's a number

console.log("✅ Example 2 complete!");
