// Exercise 3: Type Aliases for SDK

// TODO 1: Create type aliases
// type PhoneNumber = string;
// type MessageID = string;
// type Timestamp = number;
// type MessageStatus = "queued" | "sent" | "delivered" | "failed";

// TODO 2: Create WhatsAppMessage type
// type WhatsAppMessage = {
//   id: MessageID;
//   to: PhoneNumber;
//   text: string;
//   status: MessageStatus;
//   sentAt: Timestamp;
// };

// TODO 3: Create createMessage function
// Generate a new message with:
// - Random ID (use Date.now())
// - Given phone and text
// - Status: "queued"
// - Current timestamp
// function createMessage(to: PhoneNumber, text: string): WhatsAppMessage {
//
// }

// TODO 4: Create isDelivered function
// Check if message status is "delivered"
// function isDelivered(message: WhatsAppMessage): boolean {
//
// }

// TODO: Test your code
// const message = createMessage("+923001234567", "Hello World");
// console.log("Message created:", message);
// console.log("Is delivered:", isDelivered(message));

// const deliveredMessage: WhatsAppMessage = {
//   id: "msg_123",
//   to: "+923001234567",
//   text: "Test",
//   status: "delivered",
//   sentAt: Date.now()
// };
// console.log("Is delivered:", isDelivered(deliveredMessage));
