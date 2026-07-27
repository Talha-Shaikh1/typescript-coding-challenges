// Exercise 4: Intersection Types - SOLUTION

// Task 1: Create three separate interfaces
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Message {
  to: string;
  text: string;
}

// Task 2: Create intersection type
type TrackedMessage = Message & Identifiable & Timestamped;

// Task 3: Create function that returns TrackedMessage
function createTrackedMessage(to: string, text: string): TrackedMessage {
  const timestamp = Date.now();

  return {
    // Message properties
    to,
    text,

    // Identifiable properties
    id: `msg_${timestamp}_${Math.floor(Math.random() * 1000)}`,

    // Timestamped properties
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

// Helper function to update a tracked message
function updateTrackedMessage(message: TrackedMessage, newText: string): TrackedMessage {
  return {
    ...message,
    text: newText,
    updatedAt: Date.now()
  };
}

// Test cases
console.log("=== Exercise 4: Intersection Types ===\n");

const msg = createTrackedMessage("+923001234567", "Hello World");
console.log("Tracked message:", msg);
// Expected: { id: "msg_12345", to: "+923001234567", text: "Hello World", createdAt: ..., updatedAt: ... }

// Demonstrate that all properties are accessible
console.log("\nAccessing individual properties:");
console.log("ID:", msg.id);
console.log("To:", msg.to);
console.log("Text:", msg.text);
console.log("Created:", new Date(msg.createdAt).toISOString());
console.log("Updated:", new Date(msg.updatedAt).toISOString());

// Test update
console.log("\n--- Testing update ---");
const updatedMsg = updateTrackedMessage(msg, "Updated message text");
console.log("Updated message:", updatedMsg);
console.log("Created timestamp unchanged:", updatedMsg.createdAt === msg.createdAt);
console.log("Updated timestamp changed:", updatedMsg.updatedAt > msg.updatedAt);

console.log("\n✅ Intersection types combine multiple type definitions!");
