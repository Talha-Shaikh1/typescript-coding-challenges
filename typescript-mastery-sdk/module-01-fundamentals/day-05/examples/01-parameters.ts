// Example 1: Function Parameters - Required, Optional, Default
// Understanding different parameter types

console.log("=== Required Parameters ===");

function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Ali"));
// console.log(greet()); // Error! Required parameter missing

console.log("\n=== Optional Parameters ===");

function greetWithTitle(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greetWithTitle("Ali"));              // "Hello, Ali!"
console.log(greetWithTitle("Ali", "Mr."));       // "Hello, Mr. Ali!"

// Optional parameters are undefined if not provided
function logOptional(message: string, prefix?: string): void {
  console.log("Prefix:", prefix);  // undefined if not provided
  if (prefix) {
    console.log(`${prefix}: ${message}`);
  } else {
    console.log(message);
  }
}

logOptional("Hello");
logOptional("Hello", "INFO");

console.log("\n=== Default Parameters ===");

function createMessage(
  text: string,
  priority: string = "normal",
  urgent: boolean = false
): object {
  return { text, priority, urgent };
}

console.log(createMessage("Hello"));
// { text: "Hello", priority: "normal", urgent: false }

console.log(createMessage("Alert!", "high"));
// { text: "Alert!", priority: "high", urgent: false }

console.log(createMessage("Emergency!", "critical", true));
// { text: "Emergency!", priority: "critical", urgent: true }

console.log("\n=== Optional vs Default ===");

function compare(
  value: number,
  optional?: number,
  withDefault: number = 10
): void {
  console.log("Optional:", optional);         // undefined or provided value
  console.log("With default:", withDefault);  // 10 or provided value
}

compare(5);                  // optional: undefined, withDefault: 10
compare(5, 20);             // optional: 20, withDefault: 10
compare(5, 20, 30);         // optional: 20, withDefault: 30

console.log("\n=== SDK Example ===");

interface SendOptions {
  preview_url?: boolean;
  notification?: boolean;
}

function sendText(
  to: string,
  text: string,
  options: SendOptions = {}
): object {
  const preview = options.preview_url ?? false;
  const notify = options.notification ?? true;

  return {
    to,
    text,
    preview_url: preview,
    notification: notify
  };
}

console.log(sendText("+923001234567", "Hello"));
// Default options

console.log(sendText("+923001234567", "Check link", {
  preview_url: true
}));
// Custom options

console.log("\n=== Multiple Optional Parameters ===");

function initClient(
  apiKey: string,
  phoneId: string,
  timeout?: number,
  retries?: number,
  logging?: boolean
): void {
  console.log("API Key:", apiKey);
  console.log("Phone ID:", phoneId);
  console.log("Timeout:", timeout ?? 30000);
  console.log("Retries:", retries ?? 3);
  console.log("Logging:", logging ?? false);
}

initClient("key123", "phone456");
initClient("key123", "phone456", 60000);
initClient("key123", "phone456", 60000, 5);
initClient("key123", "phone456", 60000, 5, true);

console.log("\n✅ Example 1 complete!");
