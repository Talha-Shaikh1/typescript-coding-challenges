// Exercise 2: Basic Constraints
// Practice using extends keyword with different constraint types

console.log("=== Exercise 2: Basic Constraints ===\n");

// ================================================================
// Task 1: Length Property
// ================================================================

console.log("--- Task 1: Length Property ---");

// TODO: Add constraint - T must have a length property
function getLength<T /* TODO */>(value: T): number {
  // TODO: Return value.length
}

// Test cases (uncomment when ready):
// console.log(getLength("hello"));          // Should output: 5
// console.log(getLength([1, 2, 3]));        // Should output: 3
// console.log(getLength({ length: 10 }));   // Should output: 10
// console.log(getLength(123));              // Should NOT compile!

// ================================================================
// Task 2: Numeric Operations
// ================================================================

console.log("\n--- Task 2: Numeric Operations ---");

// TODO: Add constraint - T must be a number
function double<T /* TODO */>(value: T): number {
  // TODO: Return value * 2
}

// Test cases (uncomment when ready):
// console.log(double(5));       // Should output: 10
// console.log(double(3.5));     // Should output: 7
// console.log(double("5"));     // Should NOT compile!

// ================================================================
// Task 3: String Operations
// ================================================================

console.log("\n--- Task 3: String Operations ---");

// TODO: Add constraint - T must be a string
function shout<T /* TODO */>(text: T): string {
  // TODO: Return text.toUpperCase() + "!!!"
}

// Test cases (uncomment when ready):
// console.log(shout("hello"));  // Should output: "HELLO!!!"
// console.log(shout(123));      // Should NOT compile!

// ================================================================
// Task 4: Array Operations
// ================================================================

console.log("\n--- Task 4: Array Operations ---");

// TODO: Add constraint - T must be an array
function firstAndLast<T /* TODO */>(arr: T): [T[0], T[number]] | undefined {
  // TODO: Return tuple of first and last elements
  // Return undefined if array is empty
}

// Test cases (uncomment when ready):
// console.log(firstAndLast([1, 2, 3]));     // Should output: [1, 3]
// console.log(firstAndLast(["a", "b"]));    // Should output: ["a", "b"]
// console.log(firstAndLast([]));            // Should output: undefined
// console.log(firstAndLast(123));           // Should NOT compile!

// ================================================================
// Task 5: Union Constraints
// ================================================================

console.log("\n--- Task 5: Union Constraints ---");

// TODO: Add constraint - T must be string OR number
function stringify<T /* TODO */>(value: T): string {
  // TODO: Return string representation
}

// Test cases (uncomment when ready):
// console.log(stringify(42));       // Should output: "42"
// console.log(stringify("hello"));  // Should output: "hello"
// console.log(stringify(true));     // Should NOT compile!

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All functions implemented with constraints");
console.log("[ ] Invalid types rejected at compile time");
console.log("[ ] All test cases pass");
