// Exercise 5: Function Overloading - SOLUTION

// Task 1 & 2: Overload signatures
function sendMessage(phone: string, text: string): string;
function sendMessage(phone: string, mediaId: string, caption: string): string;

// Task 3: Implementation that handles both cases
function sendMessage(
  phone: string,
  textOrMediaId: string,
  caption?: string
): string {
  if (caption === undefined) {
    // First overload: text message
    return `Text message sent to ${phone}: ${textOrMediaId}`;
  } else {
    // Second overload: media message
    return `Media message sent to ${phone}: ${textOrMediaId} with caption "${caption}"`;
  }
}

// Task 4: Test both overloads
console.log("=== Exercise 5: Function Overloading ===\n");

// Test text message (first overload)
const result1 = sendMessage("+92300", "Hello");
console.log(result1);
// Expected: Text message sent to +92300: Hello

// Test media message (second overload)
const result2 = sendMessage("+92300", "media_123", "Check this");
console.log(result2);
// Expected: Media message sent to +92300: media_123 with caption "Check this"

// More examples
console.log("\n--- More examples ---\n");

console.log(sendMessage("+923001234567", "Welcome to our service!"));
console.log(sendMessage("+923001234567", "img_456", "Beautiful sunset"));
console.log(sendMessage("+923001234567", "video_789", "Tutorial video"));

console.log("\n✅ Function overloading provides multiple call signatures!");

// Note: TypeScript ensures type safety
// These would cause compile errors:
// sendMessage("+92300"); // Error: Expected 2-3 arguments
// sendMessage("+92300", "text", "extra", "params"); // Error: Expected 2-3 arguments
