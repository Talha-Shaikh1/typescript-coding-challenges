"use strict";
// Exercise 5: Number Practice
console.log("=== Exercise 5: Number Practice ===\n");
let itemPrice = 200;
let discountAmount = 50;
let quantity = 3;
// TODO: Calculate final price (itemPrice - discountAmount)
let finalPrice = itemPrice - discountAmount;
console.log("Price after discount:", finalPrice);
// TODO: Calculate total (finalPrice * quantity)
let total = finalPrice * quantity;
console.log("Total for", quantity, "items:", total);
// TODO: Round 99.7 to nearest integer
let value = 99.7;
let rounded = Math.round(value);
console.log("Rounded:", rounded);
// TODO: Check if finalPrice is less than 200
let isDiscounted = finalPrice < 200;
console.log("Is discounted?", isDiscounted);
console.log("\n✅ Exercise 5 complete!");
// Hints:
// - Math: -, *
// - Rounding: Math.round()
// - Comparison: <
