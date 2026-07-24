// Exercise 1: Basic Union Types - SOLUTION

// Task 1: Create type MessageID
type MessageID = string | number;

// Task 2: Create type Status
type Status = "pending" | "sent" | "delivered" | "failed";

// Task 3: Create function logMessage
function logMessage(id: MessageID, status: Status): void {
  console.log(`Message ${id}: ${status}`);
}

// Task 4: Create function formatID
function formatID(id: MessageID): string {
  if (typeof id === "string") {
    return id;
  } else {
    return `msg_${id}`;
  }
}

// Test cases
console.log("=== Exercise 1: Basic Union Types ===\n");

logMessage("abc123", "sent");
// Expected: Message abc123: sent

logMessage(456, "delivered");
// Expected: Message 456: delivered

console.log(formatID("abc123"));
// Expected: abc123

console.log(formatID(456));
// Expected: msg_456

// More tests
console.log("\n--- Additional tests ---");
logMessage("wamid_789", "pending");
logMessage(12345, "failed");
console.log(formatID("custom_id_999"));
console.log(formatID(0));

console.log("\n✅ Union types allow multiple type possibilities!");
