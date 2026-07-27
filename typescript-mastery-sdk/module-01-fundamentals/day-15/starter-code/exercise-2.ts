// Exercise 2: Generic Functions
// Complete the TODOs below

console.log("=== Exercise 2: Generic Functions ===\n");

// ================================================================
// Task 1: Get Last Element
// ================================================================

console.log("--- Task 1: Get Last Element ---");

// TODO: Implement this generic function
function getLast<T>(/* TODO: add parameters */): /* TODO: add return type */ {
  // TODO: Your implementation here
  // Hint: Use array length - 1
}

// Test cases (uncomment when ready):
// console.log(getLast([1, 2, 3]));           // Should output: 3
// console.log(getLast(["a", "b", "c"]));     // Should output: "c"
// console.log(getLast([]));                  // Should output: undefined

// ================================================================
// Task 2: Reverse Array
// ================================================================

console.log("\n--- Task 2: Reverse Array ---");

// TODO: Implement this generic function
function reverse<T>(/* TODO: add parameters */): /* TODO: add return type */ {
  // TODO: Your implementation here
  // Hint: Create a copy first to avoid mutation
  // Bonus: Try without using .reverse() method!
}

// Test cases (uncomment when ready):
// console.log(reverse([1, 2, 3]));        // Should output: [3, 2, 1]
// console.log(reverse(["a", "b"]));       // Should output: ["b", "a"]
// console.log(reverse([]));               // Should output: []

// ================================================================
// Task 3: Find by Predicate
// ================================================================

console.log("\n--- Task 3: Find by Predicate ---");

// TODO: Implement this generic function
function findItem<T>(
  // TODO: add parameters
): /* TODO: add return type */ {
  // TODO: Your implementation here
  // Hint: Loop through array and test each item with predicate
}

// Test cases (uncomment when ready):
// const numbers = [1, 2, 3, 4, 5];
// console.log(findItem(numbers, n => n > 3));        // Should output: 4

// const users = [
//   { id: "1", name: "Ali" },
//   { id: "2", name: "Sara" }
// ];
// console.log(findItem(users, u => u.name === "Sara")); // Should output: { id: "2", name: "Sara" }

// ================================================================
// Task 4: Pair Function
// ================================================================

console.log("\n--- Task 4: Pair Function ---");

// TODO: Implement this generic function with TWO type parameters
function makePair<T, U>(/* TODO: add parameters */): /* TODO: add return type */ {
  // TODO: Your implementation here
  // Hint: Return a tuple [T, U]
}

// Test cases (uncomment when ready):
// const pair1 = makePair("age", 25);           // Type should be [string, number]
// const pair2 = makePair(true, "active");      // Type should be [boolean, string]
// console.log("Pair 1:", pair1);
// console.log("Pair 2:", pair2);

// ================================================================
// Task 5: Swap Function
// ================================================================

console.log("\n--- Task 5: Swap Function ---");

// TODO: Implement this generic function that swaps tuple elements
function swap<T, U>(/* TODO: add parameters */): /* TODO: add return type */ {
  // TODO: Your implementation here
  // Hint: Destructure the tuple and return in reversed order
}

// Test cases (uncomment when ready):
// const original: [string, number] = ["age", 25];
// const swapped = swap(original);
// console.log("Original:", original);  // Should output: ["age", 25]
// console.log("Swapped:", swapped);    // Should output: [25, "age"]

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All functions compile without errors");
console.log("[ ] All test cases pass");
console.log("[ ] Type inference works correctly");
console.log("[ ] No 'any' types used");
