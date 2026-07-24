// Exercise 3: Type Aliases for SDK - SOLUTION

// Task 1-4: Create type aliases
type PhoneNumber = string;
type MessageID = string;
type Timestamp = number;
type MessageStatus = "queued" | "sent" | "delivered" | "failed";

// Task 5: Create WhatsAppMessage type
type WhatsAppMessage = {
  id: MessageID;
  to: PhoneNumber;
  text: string;
  status: MessageStatus;
  sentAt: Timestamp;
};

// Function 1: Create message
function createMessage(to: PhoneNumber, text: string): WhatsAppMessage {
  return {
    id: `msg_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
    to,
    text,
    status: "queued",
    sentAt: Date.now()
  };
}

// Function 2: Check if delivered
function isDelivered(message: WhatsAppMessage): boolean {
  return message.status === "delivered";
}

// Test cases
console.log("=== Exercise 3: Type Aliases for SDK ===\n");

const message = createMessage("+923001234567", "Hello, World!");
console.log("Message created:", message);
// Expected: Message created: { id: "msg_...", to: "+923001234567", ... }

console.log("Is delivered:", isDelivered(message));
// Expected: Is delivered: false

// Test with delivered message
const deliveredMessage: WhatsAppMessage = {
  ...message,
  status: "delivered"
};
console.log("Is delivered (after delivery):", isDelivered(deliveredMessage));
// Expected: Is delivered (after delivery): true
