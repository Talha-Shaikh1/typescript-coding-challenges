"use strict";
// Exercise 3: Number Operations for SDK
// TODO 1: Create calculateRetryDelay function
// - Exponential backoff: 2^attempt * 1000
// - Use: Math.pow(2, attempt)
function calculateRetryDelay(attempt) {
    const DELAY = 1000;
    return Math.pow(2, attempt) * DELAY;
}
// TODO 2: Create isWithinRateLimit function
// - Return true if messageCount < maxMessages
function isWithinRateLimit(messageCount, timeWindow, maxMessages) {
    return messageCount < maxMessages;
}
// TODO 3: Create calculatePercentage function
// - Calculate percentage: (sent / total) * 100
// - Round to 2 decimals: .toFixed(2)
// - Convert back to number: parseFloat()
function calculatePercentage(sent, total) {
    if (total <= 0) {
        throw new Error("Invalid");
    }
    else {
        return parseFloat(((sent / total) * 100).toFixed(2));
    }
}
console.log(calculatePercentage(2.4, 50));
// TODO: Test your functions
console.log("Retry delay for attempt 0:", calculateRetryDelay(0), "ms");
console.log("Retry delay for attempt 1:", calculateRetryDelay(1), "ms");
console.log("Retry delay for attempt 2:", calculateRetryDelay(2), "ms");
console.log("Within rate limit:", isWithinRateLimit(70, 1000, 80));
console.log("Success rate:", calculatePercentage(75, 100), "%");
