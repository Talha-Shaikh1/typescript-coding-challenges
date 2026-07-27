// Exercise 1: Understanding WHY Generics Exist
// This is a conceptual exercise - answer the questions below

console.log("=== Exercise 1: Understanding WHY ===\n");

// ================================================================
// Part A: The Duplication Problem
// ================================================================

console.log("--- Part A: The Duplication Problem ---\n");

// Given these functions:
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstBoolean(arr: boolean[]): boolean | undefined {
  return arr[0];
}

/*
QUESTIONS (write your answers below):

1. What is being duplicated in these three functions?
   YOUR ANSWER:


2. What would happen if we had 10 different types?
   YOUR ANSWER:


3. What problem occurs during maintenance (e.g., fixing a bug)?
   YOUR ANSWER:


4. Why can't we just use 'any' instead?
   YOUR ANSWER:

*/

// ================================================================
// Part B: The Generic Solution
// ================================================================

console.log("\n--- Part B: The Generic Solution ---\n");

// TODO: Rewrite the three functions above as ONE generic function
// function getFirst<T>(...) { ... }

// Test your generic function (uncomment when ready):
// const num = getFirst([1, 2, 3]);        // Should infer: number | undefined
// const str = getFirst(["a", "b", "c"]); // Should infer: string | undefined
// const bool = getFirst([true, false]);  // Should infer: boolean | undefined

// console.log("Number:", num);
// console.log("String:", str);
// console.log("Boolean:", bool);

// ================================================================
// Part C: any vs Generic
// ================================================================

console.log("\n--- Part C: any vs Generic ---\n");

// Version A: Using any
function processA(data: any): any {
  return data;
}

// Version B: Using generic
function processB<T>(data: T): T {
  return data;
}

// Usage comparison:
const resultA = processA("hello");
const resultB = processB("hello");

console.log("Result A type:", typeof resultA); // runtime type
console.log("Result B type:", typeof resultB); // runtime type

/*
QUESTIONS (write your answers below):

1. What is the TypeScript type of resultA?
   YOUR ANSWER:


2. What is the TypeScript type of resultB?
   YOUR ANSWER:


3. Which version provides better type safety and WHY?
   YOUR ANSWER:


4. Try calling resultA.toUpperCase() vs resultB.toUpperCase() - what happens?
   YOUR ANSWER:

*/

// ================================================================
// Part D: Real-World Analogy
// ================================================================

console.log("\n--- Part D: Real-World Analogy ---\n");

/*
Think about a restaurant with different beverages (Coke, Pepsi, Water, Juice).

WITHOUT GENERICS (like having specific glasses):
- Small Coke glass (only for Coke)
- Small Pepsi glass (only for Pepsi)
- Small Water glass (only for Water)
- Medium Coke glass (only for Coke)
- ... infinite combinations!

WITH GENERICS (like having reusable glasses):
- Small glass (works for ANY beverage)
- Medium glass (works for ANY beverage)
- Large glass (works for ANY beverage)

QUESTION:
How does this analogy relate to generic functions in TypeScript?
Write your explanation below:

YOUR ANSWER:




*/

// ================================================================
// Part E: When to Use Generics
// ================================================================

console.log("\n--- Part E: When to Use Generics ---\n");

/*
For each scenario below, mark whether generics are appropriate:

Scenario 1: A function that adds two numbers
[ ] Use generics
[ ] Don't use generics
WHY:


Scenario 2: A function that returns the first element of any array
[ ] Use generics
[ ] Don't use generics
WHY:


Scenario 3: A function that validates email format
[ ] Use generics
[ ] Don't use generics
WHY:


Scenario 4: A storage class that can hold any type of data
[ ] Use generics
[ ] Don't use generics
WHY:


Scenario 5: A function that makes HTTP requests and returns typed responses
[ ] Use generics
[ ] Don't use generics
WHY:

*/

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] Understand the code duplication problem");
console.log("[ ] Can explain why 'any' is not a solution");
console.log("[ ] Can identify when to use generics");
console.log("[ ] Understand the fundamental purpose of generics");
console.log("[ ] Ready to write generic code!");

console.log("\n💡 Once you understand the WHY, the HOW becomes much easier!");
