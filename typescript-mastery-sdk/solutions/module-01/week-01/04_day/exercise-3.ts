// Exercise 3: Extending Interfaces - SOLUTION

// Task 1: Base interface
interface BaseMessage {
  to: string;
  type: string;
}

// Task 2: TextMessage extending BaseMessage
interface TextMessage extends BaseMessage {
  text: string;
  preview_url?: boolean;
}

// Task 3: ImageMessage extending BaseMessage
interface ImageMessage extends BaseMessage {
  imageId: string;
  caption?: string;
}

// Task 4: Create message objects
const textMessage: TextMessage = {
  to: "+923001234567",
  type: "text",
  text: "Hello, this is a text message!"
};

const textMessageWithPreview: TextMessage = {
  to: "+923001234567",
  type: "text",
  text: "Check out this link: https://example.com",
  preview_url: true
};

const imageMessage: ImageMessage = {
  to: "+923001234567",
  type: "image",
  imageId: "img_123"
};

const imageMessageWithCaption: ImageMessage = {
  to: "+923001234567",
  type: "image",
  imageId: "img_456",
  caption: "Check out this beautiful sunset!"
};

// Test output
console.log("=== Exercise 3: Extending Interfaces ===\n");
console.log("Text message:", textMessage);
// Expected: { to: "+923001234567", type: "text", text: "Hello..." }

console.log("Image message:", imageMessage);
// Expected: { to: "+923001234567", type: "image", imageId: "img_123" }

console.log("\nWith optional properties:");
console.log("Text with preview:", textMessageWithPreview);
console.log("Image with caption:", imageMessageWithCaption);

console.log("\n✅ Interface inheritance keeps code DRY!");
