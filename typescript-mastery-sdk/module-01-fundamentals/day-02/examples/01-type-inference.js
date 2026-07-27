"use strict";
// Example 1: Type Inference
// TypeScript automatically guesses (infers) types
// Explicit type annotation
let explicitName = "Talha";
// Type inference - TypeScript knows it's a string
let inferredName = "Ahmed"; // Hover over this in VS Code!
// TypeScript infers from the value
let age = 25; // number
let isStudent = true; // boolean
let price = 99.99; // number
console.log("Explicit:", explicitName);
console.log("Inferred:", inferredName);
console.log("Age:", age, "- Type:", typeof age);
// Function return type inference
function add(a, b) {
    return a + b; // TypeScript infers return type is number
}
const result = add(5, 3); // result is inferred as number
console.log("Result:", result);
// Array inference
let numbers = [1, 2, 3]; // number[]
let names = ["Ali", "Ahmed"]; // string[]
let mixed = [1, "two", true]; // (string | number | boolean)[]
console.log("Numbers type:", numbers);
console.log("Names type:", names);
// TypeScript prevents wrong assignments
// Uncomment to see errors:
// inferredName = 123; // Error! TypeScript remembers it's string
// age = "twenty"; // Error! TypeScript remembers it's number
console.log("✅ Example 1 complete!");
