// Example 2: Optional and Readonly Properties
// Modifying interface behavior with ? and readonly

console.log("=== Optional Properties ===");

interface ClientConfig {
  accessToken: string;        // Required
  phoneNumberId: string;      // Required
  apiVersion?: string;        // Optional (notice ?)
  maxRetries?: number;        // Optional
  timeout?: number;           // Optional
}

// Valid - without optional properties
let minConfig: ClientConfig = {
  accessToken: "token123",
  phoneNumberId: "phone123"
};

console.log("Minimal config:", minConfig);

// Valid - with some optional properties
let fullConfig: ClientConfig = {
  accessToken: "token123",
  phoneNumberId: "phone123",
  apiVersion: "v18.0",
  maxRetries: 3
};

console.log("Full config:", fullConfig);

// Accessing optional properties
console.log("API Version:", fullConfig.apiVersion);       // "v18.0"
console.log("API Version:", minConfig.apiVersion);        // undefined
console.log("Max Retries:", fullConfig.maxRetries ?? 1);  // 3
console.log("Max Retries:", minConfig.maxRetries ?? 1);   // 1 (default)

console.log("\n=== Readonly Properties ===");

interface Message {
  readonly id: string;           // Can't change after creation
  readonly createdAt: number;    // Can't change after creation
  to: string;                    // Can change
  text: string;                  // Can change
  status: string;                // Can change
}

let message: Message = {
  id: "msg_123456",
  createdAt: Date.now(),
  to: "+923001234567",
  text: "Hello World",
  status: "pending"
};

console.log("Message:", message);

// Can update mutable properties
message.status = "sent";
message.text = "Hello TypeScript";
console.log("Updated message:", message);

// Can't update readonly properties
// message.id = "msg_789";              // Error!
// message.createdAt = Date.now();      // Error!

console.log("\n=== Combined: Optional + Readonly ===");

interface APIResponse {
  readonly requestId: string;      // Readonly + Required
  readonly timestamp: number;      // Readonly + Required
  success: boolean;                // Mutable + Required
  data?: any;                      // Mutable + Optional
  error?: string;                  // Mutable + Optional
}

let successResponse: APIResponse = {
  requestId: "req_12345",
  timestamp: Date.now(),
  success: true,
  data: { messageId: "wamid_67890" }
};

let errorResponse: APIResponse = {
  requestId: "req_12346",
  timestamp: Date.now(),
  success: false,
  error: "Invalid phone number"
};

console.log("Success:", successResponse);
console.log("Error:", errorResponse);

// Can't modify readonly fields
// successResponse.requestId = "req_99999";  // Error!

// Can modify mutable fields
successResponse.success = false;
console.log("Modified success:", successResponse);

console.log("\n=== SDK Real Example ===");

interface WhatsAppMessage {
  readonly id: string;
  readonly timestamp: number;
  to: string;
  text: string;
  status: "queued" | "sent" | "delivered" | "read" | "failed";
  attempts?: number;
  error?: string;
}

function createMessage(to: string, text: string): WhatsAppMessage {
  return {
    id: `wamid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    to,
    text,
    status: "queued",
    attempts: 0
  };
}

function updateMessageStatus(
  message: WhatsAppMessage,
  status: WhatsAppMessage["status"]
): void {
  message.status = status;  // OK - mutable
  if (status === "failed") {
    message.attempts = (message.attempts || 0) + 1;
  }
}

let msg = createMessage("+923001234567", "Hello from SDK");
console.log("Created:", msg);

updateMessageStatus(msg, "sent");
console.log("After send:", msg);

updateMessageStatus(msg, "delivered");
console.log("After delivery:", msg);

console.log("\n✅ Example 2 complete!");
