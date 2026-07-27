// Exercise 3: Discriminated Unions - SOLUTION

// Task 1: Create interfaces with 'type' discriminator
interface TextMessage {
  type: "text";
  to: string;
  text: string;
}

interface ImageMessage {
  type: "image";
  to: string;
  imageId: string;
  caption?: string;
}

interface VideoMessage {
  type: "video";
  to: string;
  videoId: string;
  caption?: string;
}

// Task 2: Create union type
type Message = TextMessage | ImageMessage | VideoMessage;

// Task 3: Create function sendMessage
function sendMessage(message: Message): string {
  switch (message.type) {
    case "text":
      return `Sending text "${message.text}" to ${message.to}`;

    case "image":
      const imageCaption = message.caption ? ` with caption "${message.caption}"` : "";
      return `Sending image ${message.imageId} to ${message.to}${imageCaption}`;

    case "video":
      const videoCaption = message.caption ? ` with caption "${message.caption}"` : "";
      return `Sending video ${message.videoId} to ${message.to}${videoCaption}`;

    default:
      // Exhaustiveness check
      const _exhaustive: never = message;
      return _exhaustive;
  }
}

// Test cases
console.log("=== Exercise 3: Discriminated Unions ===\n");

const msg1: TextMessage = {
  type: "text",
  to: "+92300",
  text: "Hello"
};
console.log(sendMessage(msg1));
// Expected: Sending text "Hello" to +92300

const msg2: ImageMessage = {
  type: "image",
  to: "+92300",
  imageId: "img_123"
};
console.log(sendMessage(msg2));
// Expected: Sending image img_123 to +92300

const msg3: VideoMessage = {
  type: "video",
  to: "+92300",
  videoId: "vid_456",
  caption: "Watch"
};
console.log(sendMessage(msg3));
// Expected: Sending video vid_456 to +92300 with caption "Watch"

// More tests
console.log("\n--- Additional tests ---");

const msg4: ImageMessage = {
  type: "image",
  to: "+923001234567",
  imageId: "img_789",
  caption: "Beautiful sunset!"
};
console.log(sendMessage(msg4));

const msg5: VideoMessage = {
  type: "video",
  to: "+14155552671",
  videoId: "vid_999"
};
console.log(sendMessage(msg5));

console.log("\n✅ Discriminated unions enable type-safe polymorphism!");
