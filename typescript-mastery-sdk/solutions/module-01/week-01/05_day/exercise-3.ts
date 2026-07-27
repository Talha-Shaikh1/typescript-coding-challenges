// Exercise 3: Function Types and Callbacks - SOLUTION

// Task 1: Create MessageCallback type
type MessageCallback = (success: boolean, messageId?: string) => void;

// Task 2: sendWithCallback function
function sendWithCallback(
  phone: string,
  text: string,
  callback: MessageCallback
): void {
  console.log(`Sending message to ${phone}...`);

  // Simulate async operation
  setTimeout(() => {
    if (phone.startsWith('+')) {
      callback(true, "wamid_123");
    } else {
      callback(false);
    }
  }, 1000);
}

// Task 3: TransformFunction type
type TransformFunction = (text: string) => string;

// Task 4: sendTransformed function
function sendTransformed(
  phone: string,
  text: string,
  transform: TransformFunction
): void {
  const transformedText = transform(text);
  console.log(`Sending "${transformedText}" to ${phone}`);
}

// Test cases
console.log("=== Exercise 3: Function Types and Callbacks ===\n");

// Test callback with valid phone
sendWithCallback("+92300", "Hello", (success, messageId) => {
  if (success) {
    console.log(`Callback: Success! ID: ${messageId}`);
    // Expected: Callback: Success! ID: wamid_123
  } else {
    console.log("Callback: Failed!");
  }
});

// Test callback with invalid phone
sendWithCallback("invalid", "Hello", (success, messageId) => {
  if (success) {
    console.log(`Callback: Success! ID: ${messageId}`);
  } else {
    console.log("Callback: Failed - invalid phone format");
  }
});

// Test transform functions
console.log("\n");

const upperCaseTransform: TransformFunction = (text) => text.toUpperCase();
sendTransformed("+92300", "hello world", upperCaseTransform);
// Expected: Sending "HELLO WORLD" to +92300

const prefixTransform: TransformFunction = (text) => `[URGENT] ${text}`;
sendTransformed("+92300", "Server is down", prefixTransform);

const shortenTransform: TransformFunction = (text) =>
  text.length > 10 ? text.substring(0, 10) + "..." : text;
sendTransformed("+92300", "This is a very long message", shortenTransform);

console.log("\n✅ Callbacks enable flexible async patterns!");
