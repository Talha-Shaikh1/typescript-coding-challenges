// Exercise 5: Number Practice

console.log("=== Exercise 5: Number Practice ===\n");

let itemPrice: number = 200;
let discountAmount: number = 50;
let quantity: number = 3;

// TODO: Calculate final price (itemPrice - discountAmount)
let finalPrice: number = itemPrice - discountAmount;
console.log("Price after discount:", finalPrice);

// TODO: Calculate total (finalPrice * quantity)
let total: number = finalPrice * quantity;
console.log("Total for", quantity, "items:", total);

// TODO: Round 99.7 to nearest integer
let value: number = 99.7;
let rounded: number = Math.round(value);
console.log("Rounded:", rounded);

// TODO: Check if finalPrice is less than 200
let isDiscounted: boolean = finalPrice < 200;
console.log("Is discounted?", isDiscounted);

console.log("\n✅ Exercise 5 complete!");

// Hints:
// - Math: -, *
// - Rounding: Math.round()
// - Comparison: <
