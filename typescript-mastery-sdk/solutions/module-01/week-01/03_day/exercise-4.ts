// Exercise 4: Readonly Configuration - SOLUTION

// Task 1: Readonly array of supported message types
const SUPPORTED_MESSAGE_TYPES = ["text", "image", "video", "audio", "document"] as const;

// Task 2: Check if message type is supported
function isSupportedMessageType(type: string): boolean {
  return SUPPORTED_MESSAGE_TYPES.includes(type as any);
}

// Task 3: Readonly array of API versions
const API_VERSIONS: readonly [number, number][] = [
  [1, 0],
  [1, 1],
  [2, 0]
] as const;

// Task 4: Get latest version
function getLatestVersion(): [number, number] {
  return API_VERSIONS[API_VERSIONS.length - 1] as [number, number];
}

// Test cases
console.log("=== Exercise 4: Readonly Configuration ===\n");

console.log("Supported type 'text':", isSupportedMessageType("text"));
// Expected: Supported type 'text': true

console.log("Supported type 'sticker':", isSupportedMessageType("sticker"));
// Expected: Supported type 'sticker': false

const latestVersion = getLatestVersion();
console.log("Latest version:", latestVersion);
// Expected: Latest version: [2, 0]

// Demonstrate immutability (these would cause compile errors):
// SUPPORTED_MESSAGE_TYPES.push("sticker"); // Error!
// SUPPORTED_MESSAGE_TYPES[0] = "newtype"; // Error!
// API_VERSIONS.push([3, 0]); // Error!

console.log("\n✅ Arrays are readonly and cannot be modified!");
