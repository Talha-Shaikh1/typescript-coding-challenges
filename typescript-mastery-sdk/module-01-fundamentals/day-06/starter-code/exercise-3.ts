// Exercise 3: Discriminated Unions
// Goal: Work with discriminated unions

// TODO: Task 1 - Create interfaces with 'type' discriminator
// interface TextMessage {
//   type: "text";
//   to: string;
//   text: string;
// }

// interface ImageMessage {
//   type: "image";
//   to: string;
//   imageId: string;
//   caption?: string;
// }

// interface VideoMessage {
//   type: "video";
//   to: string;
//   videoId: string;
//   caption?: string;
// }

// TODO: Task 2 - Create union type
// type Message = TextMessage | ImageMessage | VideoMessage;

// TODO: Task 3 - Create function sendMessage
// function sendMessage(message: Message): string {
//   // Use switch on message.type
//   // Return appropriate string for each type
//
//   // For text: "Sending text "{text}" to {to}"
//   // For image: "Sending image {imageId} to {to}" (add caption if exists)
//   // For video: "Sending video {videoId} to {to}" (add caption if exists)
// }

// Test your code (uncomment after implementation):
// const msg1: TextMessage = { type: "text", to: "+92300", text: "Hello" };
// const msg2: ImageMessage = { type: "image", to: "+92300", imageId: "img_123" };
// const msg3: VideoMessage = { type: "video", to: "+92300", videoId: "vid_456", caption: "Watch" };

// console.log(sendMessage(msg1));
// console.log(sendMessage(msg2));
// console.log(sendMessage(msg3));

// Expected Output:
// Sending text "Hello" to +92300
// Sending image img_123 to +92300
// Sending video vid_456 to +92300 with caption "Watch"
