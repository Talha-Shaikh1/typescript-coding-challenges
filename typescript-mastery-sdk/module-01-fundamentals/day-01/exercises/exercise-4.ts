// Exercise 4: String Practice

console.log("=== Exercise 4: String Practice ===\n");

let firstName: string = "Muhammad";
let lastName: string = "Ahmed";

// TODO: Combine firstName + space + lastName
let fullName: string = firstName + " " + lastName;
console.log("Full name:", fullName);

// TODO: Create greeting with template literal
let greeting: string = `Hello, ${firstName} ${lastName}!`;
console.log("Greeting:", greeting);

// TODO: Convert to UPPERCASE
let upperName: string = fullName.toUpperCase();
console.log("Uppercase:", upperName);

// TODO: Check if fullName includes "Ahmed"
let hasAhmed: boolean = fullName.includes("Ahmed");
console.log("Contains Ahmed?", hasAhmed);

console.log("\n✅ Exercise 4 complete!");

// Hints:
// - Space: " "
// - Template: ${variable}
// - Methods: .toUpperCase(), .includes()
