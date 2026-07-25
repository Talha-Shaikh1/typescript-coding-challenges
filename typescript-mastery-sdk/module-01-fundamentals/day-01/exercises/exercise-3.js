"use strict";
// Exercise 3: let vs const
// Choose: let or const?
console.log("=== Exercise 3: let vs const ===\n");
// TODO: This will change - use let or const?
let score = 0;
console.log("Initial score:", score);
score = 10; // Changing value
console.log("Updated score:", score);
// TODO: This should NEVER change - use let or const?
const MAX_USERS = 100;
console.log("Max users:", MAX_USERS);
// TODO: Which one for these?
const apiKey = "sk_test_123"; // Fixed, never changes
let currentPage = 1; // Will change
const PI = 3.14159; // Mathematical constant
console.log("API Key:", apiKey);
console.log("Page:", currentPage);
console.log("PI:", PI);
console.log("\n✅ Exercise 3 complete!");
// Hints:
// - Value changes? → let
// - Value fixed? → const
