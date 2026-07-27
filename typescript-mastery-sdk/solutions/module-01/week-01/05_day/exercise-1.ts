// Exercise 1: Parameter Types - SOLUTION

// Task 1: sendMessage with default parameters
function sendMessage(
  to: string,
  text: string,
  preview_url: boolean = false,
  notification: boolean = true
) {
  return {
    to,
    text,
    preview_url,
    notification
  };
}

// Task 2: initClient with optional parameters
function initClient(
  apiKey: string,
  phoneId: string,
  timeout?: number,
  retries?: number
): void {
  const finalTimeout = timeout ?? 30000;
  const finalRetries = retries ?? 3;

  console.log(`Client: apiKey: "${apiKey}", phoneId: "${phoneId}", timeout: ${finalTimeout}, retries: ${finalRetries}`);
}

// Task 3: Test both functions
console.log("=== Exercise 1: Parameter Types ===\n");

// Test sendMessage with defaults
const msg1 = sendMessage("+92300", "Hello");
console.log("Message (defaults):", msg1);
// Expected: { to: "+92300", text: "Hello", preview_url: false, notification: true }

// Test sendMessage with custom values
const msg2 = sendMessage("+92300", "Check this link", true, false);
console.log("Message (custom):", msg2);

// Test initClient with defaults
console.log("\n");
initClient("key123", "phone123");
// Expected: Client: apiKey: "key123", phoneId: "phone123", timeout: 30000, retries: 3

// Test initClient with custom values
initClient("key456", "phone456", 60000, 5);
// Expected: Client: apiKey: "key456", phoneId: "phone456", timeout: 60000, retries: 5

console.log("\n✅ Default and optional parameters make APIs flexible!");
