// Exercise 1: Understanding WHY Constraints
// This is a conceptual exercise - answer the questions

console.log("=== Exercise 1: Understanding WHY Constraints ===\n");

// ================================================================
// Part A: The Problem
// ================================================================

console.log("--- Part A: The Problem ---\n");

// Without constraints
function findById<T>(items: T[], id: string): T | undefined {
  // ❌ This gives an error - why?
  // return items.find(item => item.id === id);

  // We're forced to use unsafe cast
  return items.find((item: any) => item.id === id);
}

/*
QUESTIONS (write your answers below):

1. Why does TypeScript give an error on `item.id`?
   YOUR ANSWER:


2. What could T be that doesn't have an 'id' property?
   YOUR ANSWER:


3. How would this crash at runtime if we used `any`?
   YOUR ANSWER:


4. What information does TypeScript need to make this safe?
   YOUR ANSWER:

*/

// ================================================================
// Part B: The Solution
// ================================================================

console.log("\n--- Part B: The Solution ---\n");

interface HasId {
  id: string;
}

// TODO: Add constraint to this function
function findByIdConstrained<T /* TODO: add constraint */>(
  items: T[],
  id: string
): T | undefined {
  // TODO: Implement safely without 'any' cast
}

/*
QUESTIONS (write your answers below):

1. What does `T extends HasId` mean?
   YOUR ANSWER:


2. Can T have MORE properties than just 'id'?
   YOUR ANSWER:


3. What happens if you try: `findByIdConstrained([1, 2, 3], "1")`?
   YOUR ANSWER:


4. Why is this better than using `any`?
   YOUR ANSWER:

*/

// Test your constrained function (uncomment when ready):
// interface User {
//   id: string;
//   name: string;
// }

// const users: User[] = [
//   { id: "1", name: "Ali" },
//   { id: "2", name: "Sara" }
// ];

// const found = findByIdConstrained(users, "1");
// console.log("Found:", found);

// This should not compile:
// findByIdConstrained([1, 2, 3], "1");

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] Understand why unconstrained T can't access properties");
console.log("[ ] Know what extends keyword does");
console.log("[ ] Can explain compile-time vs runtime safety");
console.log("[ ] Constrained function works correctly");
