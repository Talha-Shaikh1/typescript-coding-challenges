"use strict";
// Exercise 2: Readonly Properties
// TODO 2: Create createMessage function
// Generate random ID using Date.now()
// Set createdAt to Date.now()
// Set status to "pending"
function createMessage(to, text) {
    const id = Date.now().toString();
    const createdAt = Date.now();
    const message = {
        id,
        createdAt,
        to,
        text,
        status: "pending",
    };
    return message;
}
// TODO 3: Create updateMessageStatus function
// Update the status property
function updateMessageStatus(message, status) {
    message.status = status;
}
// TODO: Test your code
const msg = createMessage("+923001234567", "Hello World");
console.log("Created:", msg);
updateMessageStatus(msg, "sent");
console.log("Updated:", msg);
// Try uncommenting (should error):
// msg.id = "new_id"; // Error! readonly
// msg.createdAt = Date.now(); // Error! readonly
