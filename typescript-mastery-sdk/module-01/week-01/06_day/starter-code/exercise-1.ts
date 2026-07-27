// Exercise 1: Basic Union Types
// Goal: Practice union types and type narrowing

// TODO: Task 1 - Create type MessageID that can be string OR number
// type MessageID = ???

// TODO: Task 2 - Create type Status with literal values
// type Status = ???

// TODO: Task 3 - Create function logMessage
// function logMessage(id: MessageID, status: Status): void {
//   console.log(`Message ${id}: ${status}`);
// }

// TODO: Task 4 - Create function formatID
// function formatID(id: MessageID): string {
//   // If string, return as-is
//   // If number, return as "msg_${id}"
//   // HINT: Use typeof to check type
// }

// Test your code (uncomment after implementation):
// logMessage("abc123", "sent");
// logMessage(456, "delivered");
// console.log(formatID("abc123"));  // Expected: "abc123"
// console.log(formatID(456));       // Expected: "msg_456"

// Expected Output:
// Message abc123: sent
// Message 456: delivered
// abc123
// msg_456
