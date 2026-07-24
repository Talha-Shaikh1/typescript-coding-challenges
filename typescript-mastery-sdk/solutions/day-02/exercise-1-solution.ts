// Exercise 1 Solution: Type Inference Practice

// Variables WITHOUT type annotations - TypeScript infers
const userName = "Ahmed";        // TypeScript infers: string
const userAge = 30;              // TypeScript infers: number
const isVerified = true;         // TypeScript infers: boolean

console.log(userName);
console.log(userAge);
console.log(isVerified);

// These would cause errors (uncomment to see):
// userName = 123;       // Error: Type 'number' is not assignable to type 'string'
// userAge = "thirty";   // Error: Type 'string' is not assignable to type 'number'
// isVerified = "yes";   // Error: Type 'string' is not assignable to type 'boolean'

// Function without return type annotation - TypeScript infers return type
function double(n: number) {
  return n * 2;  // TypeScript infers return type is number
}

console.log("Double of 5:", double(5));

// ✅ Key Learnings:
// - TypeScript infers types from initial values
// - Once inferred, the type is enforced
// - Function parameters need types, but return type can be inferred
// - Hover over variables in VS Code to see inferred types

// Explicit vs Inferred comparison:
const explicitName: string = "Ali";  // Explicit
const inferredName = "Ali";          // Inferred - same result!

// When inference is better:
// - Simple assignments (let count = 0)
// - Obvious return types
// - Reduces boilerplate

// When annotation is better:
// - Function parameters (required!)
// - When type isn't obvious
// - For stricter types (union types, etc)
