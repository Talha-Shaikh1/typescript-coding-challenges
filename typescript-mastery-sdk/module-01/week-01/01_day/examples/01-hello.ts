// Example 1: Hello TypeScript
// This is your first TypeScript program!

// Variable with explicit type annotation
const message: string = "Hello TypeScript!";

// TypeScript knows the type even without annotation (type inference)
const inferredMessage = "TypeScript infers this is a string";

// Print to console
console.log(message);
console.log(inferredMessage);

// Let's see what happens when we try wrong types
// Uncomment the line below to see the error:
// const wrongType: string = 12345; // Error: Type 'number' is not assignable to type 'string'

console.log("✅ Example 1 complete!");
