// Example 4: any vs unknown vs never
// Understanding special types in TypeScript

console.log("=== ANY TYPE (Avoid This!) ===");

// any disables ALL type checking
let anything: any = "hello";
anything = 42;              // OK
anything = true;            // OK
anything = { x: 1 };        // OK

// The danger of any
let dangerous: any = "hello";
dangerous.toUpperCase();    // OK
dangerous.nonExistent();    // OK at compile time, ERROR at runtime!
console.log("Any is dangerous - it allows anything!");

console.log("\n=== UNKNOWN TYPE (Use This Instead!) ===");

// unknown is safe - requires type checking
let value: unknown = "hello";

// Can't use directly
// value.toUpperCase(); // ERROR: Object is of type 'unknown'

// Must check type first
if (typeof value === "string") {
  console.log("Uppercase:", value.toUpperCase()); // OK! TypeScript knows it's string
}

// Type checking pattern
function processUnknown(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }
  if (typeof data === "number") {
    return data.toString();
  }
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data);
  }
  return "Unknown type";
}

console.log(processUnknown("text"));        // "text"
console.log(processUnknown(123));           // "123"
console.log(processUnknown({ key: "val" })); // {"key":"val"}

console.log("\n=== NEVER TYPE (Functions That Never Return) ===");

// Function that always throws
function throwError(message: string): never {
  throw new Error(message);
}

// Function with infinite loop
function infiniteLoop(): never {
  while (true) {
    // Never exits
  }
}

// Exhaustive type checking with never
type Status = "pending" | "success" | "error";

function handleStatus(status: Status): string {
  switch (status) {
    case "pending":
      return "Processing...";
    case "success":
      return "Done!";
    case "error":
      return "Failed!";
    default:
      // If we add a new status and forget to handle it, this will error
      const exhaustiveCheck: never = status;
      throw new Error(`Unhandled status: ${status}`);
  }
}

console.log(handleStatus("pending"));
console.log(handleStatus("success"));

console.log("\n=== SDK Real-world Examples ===");

// Parsing webhook data safely
function parseWebhookPayload(data: unknown): object {
  if (typeof data === "object" && data !== null) {
    return data;
  }
  throw new Error("Invalid webhook payload");
}

// Type guard for validation
function isValidConfig(config: unknown): config is { token: string; phone: string } {
  return (
    typeof config === "object" &&
    config !== null &&
    "token" in config &&
    "phone" in config &&
    typeof (config as any).token === "string" &&
    typeof (config as any).phone === "string"
  );
}

const testConfig: unknown = { token: "abc123", phone: "+923001234567" };

if (isValidConfig(testConfig)) {
  console.log("Valid config - Token:", testConfig.token);
  console.log("Valid config - Phone:", testConfig.phone);
}

console.log("\n✅ Example 4 complete!");

// Key Takeaways:
// - Avoid 'any' - it disables type safety
// - Use 'unknown' for values you're not sure about
// - Always check type before using 'unknown'
// - 'never' is for functions that never return
