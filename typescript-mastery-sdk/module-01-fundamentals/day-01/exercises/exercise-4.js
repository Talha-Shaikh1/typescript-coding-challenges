"use strict";
// Exercise 4: String Practice
console.log("=== Exercise 4: String Practice ===\n");
let firstName = "Muhammad";
let lastName = "Ahmed";
// TODO: Combine firstName + space + lastName
let fullName = firstName + " " + lastName;
console.log("Full name:", fullName);
// TODO: Create greeting with template literal
let greeting = `Hello, ${firstName} ${lastName}!`;
console.log("Greeting:", greeting);
// TODO: Convert to UPPERCASE
let upperName = fullName.toUpperCase();
console.log("Uppercase:", upperName);
// TODO: Check if fullName includes "Ahmed"
let hasAhmed = fullName.includes("Ahmed");
console.log("Contains Ahmed?", hasAhmed);
console.log("\n✅ Exercise 4 complete!");
// Hints:
// - Space: " "
// - Template: ${variable}
// - Methods: .toUpperCase(), .includes()
