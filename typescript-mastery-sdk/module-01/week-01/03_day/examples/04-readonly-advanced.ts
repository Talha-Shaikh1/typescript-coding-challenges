// Example 4: Readonly Arrays and Advanced Patterns
// Immutable arrays and real-world patterns

console.log("=== Readonly Arrays ===");

// Regular array (mutable)
let mutableNumbers: number[] = [1, 2, 3];
mutableNumbers.push(4);        // OK
mutableNumbers[0] = 10;        // OK
console.log("Mutable array:", mutableNumbers);

// Readonly array (immutable)
let immutableNumbers: readonly number[] = [1, 2, 3];
// immutableNumbers.push(4);      // Error!
// immutableNumbers[0] = 10;      // Error!
console.log("Immutable array:", immutableNumbers);

// But can read values
console.log("First element:", immutableNumbers[0]);
console.log("Length:", immutableNumbers.length);

console.log("\n=== SDK Constants ===");

// Configuration constants (should never change)
const SUPPORTED_MEDIA_TYPES: readonly string[] = [
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mp3",
  "application/pdf"
];

const MAX_FILE_SIZES: readonly number[] = [
  5 * 1024 * 1024,   // 5MB for images
  16 * 1024 * 1024,  // 16MB for videos
  16 * 1024 * 1024,  // 16MB for audio
  100 * 1024 * 1024  // 100MB for documents
];

console.log("Supported types:", SUPPORTED_MEDIA_TYPES);
console.log("Max file sizes:", MAX_FILE_SIZES);

// Can't modify constants
// SUPPORTED_MEDIA_TYPES.push("image/gif");  // Error!

console.log("\n=== Array of Objects ===");

type User = {
  id: string;
  name: string;
  phone: string;
};

let users: User[] = [
  { id: "1", name: "Ali", phone: "+923001234567" },
  { id: "2", name: "Ahmed", phone: "+923001234568" },
  { id: "3", name: "Hassan", phone: "+923001234569" }
];

console.log("Users:", users);

// Find user by ID
let foundUser = users.find(user => user.id === "2");
console.log("Found user:", foundUser);

// Filter users
let usersWithLongNames = users.filter(user => user.name.length > 4);
console.log("Long names:", usersWithLongNames);

// Map to phone numbers only
let phoneNumbers = users.map(user => user.phone);
console.log("Phone numbers:", phoneNumbers);

console.log("\n=== Multi-dimensional Arrays ===");

// 2D array
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

console.log("Matrix:", matrix);
console.log("Element [1][2]:", matrix[1][2]); // 6

// Array of tuples
let coordinates: [number, number][] = [
  [10, 20],
  [30, 40],
  [50, 60]
];

console.log("Coordinates:", coordinates);

console.log("\n=== Advanced Array Methods ===");

let numbers = [1, 2, 3, 4, 5];

// some: check if any element matches
let hasEven = numbers.some(n => n % 2 === 0);
console.log("Has even number:", hasEven);

// every: check if all elements match
let allPositive = numbers.every(n => n > 0);
console.log("All positive:", allPositive);

// find: get first matching element
let firstEven = numbers.find(n => n % 2 === 0);
console.log("First even:", firstEven);

// findIndex: get index of first match
let firstEvenIndex = numbers.findIndex(n => n % 2 === 0);
console.log("First even index:", firstEvenIndex);

console.log("\n=== SDK Message Queue Example ===");

type QueuedMessage = {
  id: string;
  to: string;
  text: string;
  status: "pending" | "sending" | "sent" | "failed";
  retries: number;
};

let messageQueue: QueuedMessage[] = [
  { id: "msg1", to: "+923001234567", text: "Hello 1", status: "pending", retries: 0 },
  { id: "msg2", to: "+923001234568", text: "Hello 2", status: "sending", retries: 1 },
  { id: "msg3", to: "+923001234569", text: "Hello 3", status: "sent", retries: 0 },
  { id: "msg4", to: "+923001234570", text: "Hello 4", status: "failed", retries: 3 }
];

console.log("Message queue:", messageQueue);

// Get pending messages
let pendingMessages = messageQueue.filter(msg => msg.status === "pending");
console.log("Pending messages:", pendingMessages.length);

// Get failed messages with retries left
let retriableMessages = messageQueue.filter(msg =>
  msg.status === "failed" && msg.retries < 3
);
console.log("Retriable messages:", retriableMessages.length);

// Check if all sent
let allSent = messageQueue.every(msg => msg.status === "sent");
console.log("All messages sent:", allSent);

// Total retries
let totalRetries = messageQueue.reduce((sum, msg) => sum + msg.retries, 0);
console.log("Total retries:", totalRetries);

console.log("\n=== Type Safety Benefits ===");

// TypeScript prevents wrong types
let typedArray: string[] = ["a", "b", "c"];
// typedArray.push(123);  // Error! Can't add number to string[]

// Readonly prevents mutations
const config: readonly string[] = ["option1", "option2"];
// config.push("option3");  // Error! Can't modify readonly

console.log("\n✅ Example 4 complete!");
