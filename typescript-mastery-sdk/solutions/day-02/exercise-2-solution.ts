// Exercise 2 Solution: String Manipulation for SDK

// Function 1: Normalize phone number
function normalizePhoneNumber(phone: string): string {
  // Remove spaces and dashes using regex
  return phone.replace(/[- ]/g, '');
}

// Function 2: Truncate message
function truncateMessage(message: string, maxLength: number): string {
  if (message.length <= maxLength) {
    return message;
  }
  // Slice to maxLength - 3 (for "...") and add "..."
  return message.slice(0, maxLength - 3) + "...";
}

// Function 3: Create message ID
function createMessageId(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `msg_${timestamp}_${random}`;
}

// Testing
console.log("Normalized:", normalizePhoneNumber("+92 300-1234567"));
// Output: +923001234567

console.log("Truncated:", truncateMessage("Hello World from SDK", 8));
// Output: Hello...

console.log("Message ID:", createMessageId());
// Output: msg_1234567890_4567 (numbers will vary)

// ✅ Key Learnings:
// - String.replace() with regex for pattern matching
// - String.slice() for substring extraction
// - Template literals for string construction
// - Date.now() for timestamp
// - Math.random() for random numbers

// 🎯 SDK Application:
// normalizePhoneNumber: Clean user input before validation
// truncateMessage: Ensure messages fit WhatsApp limits
// createMessageId: Generate unique IDs for tracking

// Alternative implementations:

// More robust truncate (respects words)
function truncateMessageSmart(message: string, maxLength: number): string {
  if (message.length <= maxLength) return message;

  const truncated = message.slice(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(' ');

  // Cut at last space to avoid breaking words
  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + "...";
}

console.log("\nSmart truncate:", truncateMessageSmart("Hello World from SDK", 15));
// Output: Hello World...

// More unique message ID with prefix
function createMessageIdAdvanced(prefix: string = "msg"): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8); // alphanumeric
  return `${prefix}_${timestamp}_${random}`;
}

console.log("Advanced ID:", createMessageIdAdvanced("wa"));
// Output: wa_1234567890_x7f2g9
