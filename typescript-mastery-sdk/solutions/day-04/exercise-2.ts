// Exercise 2: Readonly Properties - SOLUTION

// Task 1: Message interface with readonly properties
interface Message {
  readonly id: string;
  readonly createdAt: number;
  to: string;
  text: string;
  status: "pending" | "sent" | "delivered";
}

// Task 2: Create message function
function createMessage(to: string, text: string): Message {
  return {
    id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    createdAt: Date.now(),
    to,
    text,
    status: "pending"
  };
}

// Task 3: Update message status
function updateMessageStatus(message: Message, status: Message["status"]): void {
  message.status = status;
  console.log("Updated status:", status);
}

// Test cases
console.log("=== Exercise 2: Readonly Properties ===\n");

const message = createMessage("+923001234567", "Hello, World!");
console.log("Created:", message);
// Expected: Created: { id: "msg_...", createdAt: 1234567890, ... }

updateMessageStatus(message, "sent");
// Expected: Updated status: sent

console.log("After update:", message);

// Task 4: Try to modify readonly properties (these would cause compile errors):
// message.id = "new_id"; // Error: Cannot assign to 'id' because it is a read-only property
// message.createdAt = Date.now(); // Error: Cannot assign to 'createdAt' because it is a read-only property

// But mutable properties can be changed:
message.to = "+923009999999";
message.text = "Updated text";
console.log("After modifying mutable properties:", message);

console.log("\n✅ Readonly properties protect critical data from modification!");
