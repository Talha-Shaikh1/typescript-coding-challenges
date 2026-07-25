"use strict";
// Exercise 8: Price Calculator
console.log("=== Price Calculator ===\n");
// TODO: Create variables
// - itemPrice = 500
// - quantity = 4
// - taxRate = 0.17 (17%)
let itemPrice = 500;
let quantity = 4;
let taxRate = 0.17;
// TODO: Calculate
// - subtotal = price × quantity
// - tax = subtotal × taxRate
// - total = subtotal + tax
let subTotal = itemPrice * quantity;
let tax = subTotal * taxRate;
let total = subTotal + tax;
// TODO: Print all values nicely
console.log("item price ", itemPrice);
console.log("quantity ", quantity);
console.log("Sub total ", subTotal);
console.log("tax ", tax);
console.log("total ", total);
console.log("\n✅ Exercise 8 complete!");
