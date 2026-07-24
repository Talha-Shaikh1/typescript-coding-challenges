// Exercise 2: Readonly Properties

// TODO 1: Create interface Message
// Properties:
// - id: string (readonly)
// - createdAt: number (readonly)
// - to: string (mutable)
// - text: string (mutable)
// - status: "pending" | "sent" | "delivered" (mutable)

// interface Message {
//
// }

// TODO 2: Create createMessage function
// Generate random ID using Date.now()
// Set createdAt to Date.now()
// Set status to "pending"

// function createMessage(to: string, text: string): Message {
//
// }

// TODO 3: Create updateMessageStatus function
// Update the status property

// function updateMessageStatus(
//   message: Message,
//   status: Message["status"]
// ): void {
//
// }

// TODO: Test your code
// const msg = createMessage("+923001234567", "Hello World");
// console.log("Created:", msg);

// updateMessageStatus(msg, "sent");
// console.log("Updated:", msg);

// Try uncommenting (should error):
// msg.id = "new_id"; // Error! readonly
// msg.createdAt = Date.now(); // Error! readonly
