"use strict";
// Exercise 9: Message Formatter
console.log("=== Message Formatter ===\n");
// TODO: Create variables
// - sender = "Ali"
// - recipient = "Ahmed"
// - messageText = "Hello, how are you?"
// - timestamp = 1234567890
let sender = "Ali";
let recipient = "Ahmed";
let messageText = "Hello, how are you? ";
let timestamp = 1234567890;
// TODO: Format message
// Format: [timestamp] sender → recipient: "message"
console.log(`${[timestamp]} sender ${sender} -> ${recipient}: ${messageText}`);
// TODO: Also show
// - Uppercase version
// - Message length
console.log(`${[timestamp]} sender ${sender} -> ${recipient}: ${messageText.toUpperCase()} message length ${messageText.length}`);
console.log("\n✅ Exercise 9 complete!");
// Hints:
// - Use template literals `text ${variable}`
// - .toUpperCase() for uppercase
// - .length for string length
