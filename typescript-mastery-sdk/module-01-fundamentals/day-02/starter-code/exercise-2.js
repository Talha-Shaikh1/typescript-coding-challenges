"use strict";
// Exercise 2: String Manipulation for SDK
// TODO 1: Create normalizePhoneNumber function
// - Remove spaces and dashes from phone number
// - Use: phone.replace(/[- ]/g, '')
function normalizePhoneNumber(phone) {
    return phone.replace(/[- ]/g, '');
}
// TODO 2: Create truncateMessage function
// - If message is longer than maxLength, truncate and add "..."
// - Use: string.slice(0, maxLength)
function truncateMessage(message, maxLength) {
    if (message.length > maxLength) {
        return message.slice(0, maxLength) + "...";
    }
    else {
        return message;
    }
}
// TODO 3: Create createMessageId function
// - Generate random message ID
// - Format: "msg_" + timestamp + "_" + random
// - Use: Date.now() and Math.random()
function createMessageId() {
    return `msg_${Date.now().toLocaleString()}_${Math.random()}`;
}
// TODO: Test your functions
console.log("Normalized:", normalizePhoneNumber("+92 300-1234567"));
console.log("Truncated:", truncateMessage("Hello World from SDK", 8));
console.log("Message ID:", createMessageId());
