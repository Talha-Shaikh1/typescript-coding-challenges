// Exercise 8: Price Calculator

console.log("=== Price Calculator ===\n");

// TODO: Create variables
// - itemPrice = 500
// - quantity = 4
// - taxRate = 0.17 (17%)

let itemPrice: number = 500
let quantity: number = 4
let taxRate: number = 0.17



// TODO: Calculate
// - subtotal = price × quantity
// - tax = subtotal × taxRate
// - total = subtotal + tax

let subTotal: number = itemPrice * quantity;
let tax: number = subTotal * taxRate;
let total: number = subTotal + tax

// TODO: Print all values nicely
console.log("item price ",itemPrice )
console.log("quantity ", quantity)
console.log("Sub total ", subTotal)
console.log("tax ", tax)
console.log("total ", total)
console.log("\n✅ Exercise 8 complete!");
