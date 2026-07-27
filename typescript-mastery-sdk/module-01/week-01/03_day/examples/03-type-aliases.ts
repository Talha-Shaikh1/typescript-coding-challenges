// Example 3: Type Aliases
// Creating reusable type definitions

console.log("=== Basic Type Aliases ===");

// Instead of repeating complex types
let user1: { name: string; age: number; email: string } = {
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

// Create a type alias for reusability
type User = {
  name: string;
  age: number;
  email: string;
};

let user2: User = {
  name: "Ahmed",
  age: 30,
  email: "ahmed@example.com"
};

console.log("User 1:", user1);
console.log("User 2:", user2);

console.log("\n=== Primitive Type Aliases ===");

// Alias for primitive types
type UserID = string;
type Age = number;
type IsActive = boolean;

let userId: UserID = "user_12345";
let userAge: Age = 25;
let isActive: IsActive = true;

console.log("User ID:", userId);
console.log("Age:", userAge);
console.log("Active:", isActive);

console.log("\n=== Union Type Aliases ===");

// Union types with alias
type Status = "pending" | "success" | "error";
type ID = string | number;

let currentStatus: Status = "pending";
let messageId: ID = "msg_123";
let numericId: ID = 456;

console.log("Status:", currentStatus);
console.log("Message ID:", messageId);
console.log("Numeric ID:", numericId);

console.log("\n=== Array Type Aliases ===");

// Array types
type PhoneNumbers = string[];
type Scores = number[];

let recipients: PhoneNumbers = ["+923001234567", "+923001234568"];
let testScores: Scores = [85, 90, 78, 92];

console.log("Recipients:", recipients);
console.log("Scores:", testScores);

console.log("\n=== Tuple Type Aliases ===");

// Tuple types
type Coordinate = [number, number];
type Response = [boolean, string];

let point: Coordinate = [10, 20];
let apiResponse: Response = [true, "Success"];

console.log("Point:", point);
console.log("API Response:", apiResponse);

console.log("\n=== Function Type Aliases ===");

// Function types
type MathOperation = (a: number, b: number) => number;
type StringTransformer = (text: string) => string;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

const uppercase: StringTransformer = (text) => text.toUpperCase();
const lowercase: StringTransformer = (text) => text.toLowerCase();

console.log("Add:", add(5, 3));
console.log("Multiply:", multiply(5, 3));
console.log("Uppercase:", uppercase("hello"));
console.log("Lowercase:", lowercase("WORLD"));

console.log("\n=== Complex Type Aliases ===");

// Complex nested types
type MessageType = "text" | "image" | "video" | "audio" | "document";

type MessagePayload = {
  to: string;
  type: MessageType;
  content: string;
  timestamp: number;
};

type APIResponse = {
  success: boolean;
  data?: MessagePayload;
  error?: string;
};

let textMessage: MessagePayload = {
  to: "+923001234567",
  type: "text",
  content: "Hello World",
  timestamp: Date.now()
};

let successResponse: APIResponse = {
  success: true,
  data: textMessage
};

let errorResponse: APIResponse = {
  success: false,
  error: "Invalid phone number"
};

console.log("Message:", textMessage);
console.log("Success:", successResponse);
console.log("Error:", errorResponse);

console.log("\n=== SDK Type Aliases ===");

// Real SDK types
type PhoneNumber = string;
type MessageID = string;
type Timestamp = number;

type MessageStatus = "queued" | "sent" | "delivered" | "read" | "failed";

type WhatsAppMessage = {
  id: MessageID;
  to: PhoneNumber;
  text: string;
  status: MessageStatus;
  sentAt: Timestamp;
};

type SendMessageOptions = {
  to: PhoneNumber;
  text: string;
  preview?: boolean;
};

type ClientConfig = {
  accessToken: string;
  phoneNumberId: string;
  maxRetries?: number;
  enableLogging?: boolean;
};

// Using SDK types
let config: ClientConfig = {
  accessToken: "token_12345",
  phoneNumberId: "phone_67890",
  maxRetries: 3,
  enableLogging: true
};

let sendOptions: SendMessageOptions = {
  to: "+923001234567",
  text: "Hello from SDK",
  preview: false
};

let message: WhatsAppMessage = {
  id: "wamid_12345",
  to: "+923001234567",
  text: "Hello from SDK",
  status: "sent",
  sentAt: Date.now()
};

console.log("Config:", config);
console.log("Send options:", sendOptions);
console.log("Message:", message);

console.log("\n=== Benefits of Type Aliases ===");
console.log("✅ Reusability: Define once, use everywhere");
console.log("✅ Readability: Descriptive names");
console.log("✅ Maintainability: Change in one place");
console.log("✅ Documentation: Self-documenting code");

console.log("\n✅ Example 3 complete!");
