// Example 4: Methods and Index Signatures
// Advanced interface features

console.log("=== Methods in Interfaces ===");

interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
}

let calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => b !== 0 ? a / b : 0
};

console.log("Add:", calc.add(10, 5));
console.log("Subtract:", calc.subtract(10, 5));
console.log("Multiply:", calc.multiply(10, 5));
console.log("Divide:", calc.divide(10, 5));

console.log("\n=== SDK Client Interface ===");

interface WhatsAppClient {
  sendText(to: string, text: string): Promise<string>;
  sendImage(to: string, imageId: string, caption?: string): Promise<string>;
  uploadMedia(buffer: Buffer): Promise<string>;
  getMediaUrl(mediaId: string): Promise<string>;
}

// Mock implementation
let mockClient: WhatsAppClient = {
  sendText: async (to, text) => {
    console.log(`Sending text to ${to}: ${text}`);
    return "wamid_text_123";
  },
  sendImage: async (to, imageId, caption) => {
    console.log(`Sending image ${imageId} to ${to}`);
    return "wamid_image_456";
  },
  uploadMedia: async (buffer) => {
    console.log(`Uploading media of size ${buffer.length}`);
    return "media_789";
  },
  getMediaUrl: async (mediaId) => {
    return `https://example.com/media/${mediaId}`;
  }
};

// Using the client
mockClient.sendText("+923001234567", "Hello SDK").then(id => {
  console.log("Message ID:", id);
});

console.log("\n=== Index Signatures ===");

// String index signature
interface StringDictionary {
  [key: string]: string;
}

let phonebook: StringDictionary = {
  "Ali": "+923001234567",
  "Ahmed": "+923001234568",
  "Hassan": "+923001234569"
};

console.log("Phonebook:", phonebook);

// Add more dynamically
phonebook["Bilal"] = "+923001234570";
console.log("After adding Bilal:", phonebook);

// Access dynamically
console.log("Ali's phone:", phonebook["Ali"]);

console.log("\n=== Number Index Signature ===");

interface NumberDictionary {
  [index: number]: string;
}

let errorCodes: NumberDictionary = {
  400: "Bad Request",
  401: "Unauthorized",
  404: "Not Found",
  500: "Internal Server Error"
};

console.log("Error codes:", errorCodes);
console.log("Error 404:", errorCodes[404]);

console.log("\n=== Mixed Index Signature ===");

interface MixedData {
  // Specific properties
  name: string;
  age: number;
  // Plus any string key
  [key: string]: string | number;
}

let userData: MixedData = {
  name: "Talha",
  age: 25,
  city: "Karachi",
  country: "Pakistan",
  experience: 5
};

console.log("User data:", userData);

console.log("\n=== SDK Metadata Example ===");

interface MessageMetadata {
  // Known properties
  messageId: string;
  timestamp: number;
  // Dynamic metadata
  [key: string]: string | number | boolean;
}

let metadata: MessageMetadata = {
  messageId: "wamid_123",
  timestamp: Date.now(),
  // Custom fields
  source: "web",
  priority: "high",
  retryCount: 3,
  isUrgent: true,
  campaignId: "campaign_456"
};

console.log("Metadata:", metadata);

// Can add more dynamically
metadata.userId = "user_789";
metadata.channelId = "channel_abc";

console.log("Updated metadata:", metadata);

console.log("\n=== Config with Index Signature ===");

interface FlexibleConfig {
  // Required fields
  apiKey: string;
  phoneNumberId: string;
  // Optional known fields
  timeout?: number;
  retries?: number;
  // Any additional config
  [key: string]: any;
}

let config: FlexibleConfig = {
  apiKey: "key_123",
  phoneNumberId: "phone_456",
  timeout: 30000,
  // Custom configs
  customHeader: "X-Custom-Header",
  region: "us-east-1",
  debugMode: true,
  maxConcurrent: 10
};

console.log("Flexible config:", config);

console.log("\n=== When to Use Index Signatures ===");
console.log("✅ Dynamic keys not known at compile time");
console.log("✅ User-provided metadata");
console.log("✅ Configuration with optional extras");
console.log("✅ Dictionary/Map-like structures");
console.log("❌ Avoid if you know exact properties (use interface instead)");

console.log("\n✅ Example 4 complete!");
