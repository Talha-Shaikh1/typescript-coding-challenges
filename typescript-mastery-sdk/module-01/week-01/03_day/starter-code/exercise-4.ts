// Exercise 4: Readonly Configuration

// TODO 1: Create readonly array SUPPORTED_MESSAGE_TYPES
// Values: ["text", "image", "video", "audio", "document"]
// const SUPPORTED_MESSAGE_TYPES: readonly string[] = [
//
// ];

// TODO 2: Create isSupportedMessageType function
// Check if type is in SUPPORTED_MESSAGE_TYPES
// Use includes() method
// function isSupportedMessageType(type: string): boolean {
//
// }

// TODO 3: Create readonly array API_VERSIONS
// Type: readonly [number, number][]
// Values: [[1, 0], [1, 1], [2, 0]]
// const API_VERSIONS: readonly [number, number][] = [
//
// ];

// TODO 4: Create getLatestVersion function
// Return last element from API_VERSIONS
// Use array.length - 1
// function getLatestVersion(): [number, number] {
//
// }

// TODO: Test your code
// console.log("Supported type 'text':", isSupportedMessageType("text"));
// console.log("Supported type 'sticker':", isSupportedMessageType("sticker"));
// console.log("Latest version:", getLatestVersion());

// Try uncommenting to see readonly errors:
// SUPPORTED_MESSAGE_TYPES.push("sticker"); // Error!
// API_VERSIONS[0] = [3, 0]; // Error!
