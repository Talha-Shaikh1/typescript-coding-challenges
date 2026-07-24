// Exercise 4 Solution: Type Safety with unknown

function parseWebhookData(data: unknown): string {
  // Check if string
  if (typeof data === "string") {
    return data;
  }

  // Check if number
  if (typeof data === "number") {
    return data.toString();
  }

  // Check if object (and not null)
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data);
  }

  // Invalid type
  throw new Error("Invalid data type");
}

// Testing
console.log("String:", parseWebhookData("hello"));                 // "hello"
console.log("Number:", parseWebhookData(123));                     // "123"
console.log("Object:", parseWebhookData({ msg: "hi" }));           // {"msg":"hi"}
console.log("Object:", parseWebhookData({ id: 1, text: "test" })); // {"id":1,"text":"test"}

// This will throw error:
try {
  console.log(parseWebhookData(null));
} catch (error) {
  console.log("Error for null:", (error as Error).message); // "Invalid data type"
}

try {
  console.log(parseWebhookData(undefined));
} catch (error) {
  console.log("Error for undefined:", (error as Error).message); // "Invalid data type"
}

// ✅ Key Learnings:
// - 'unknown' is type-safe - must check before using
// - Use 'typeof' for primitive type checking
// - Check 'data !== null' before checking object (typeof null === "object"!)
// - JSON.stringify() converts objects to string
// - Throw errors for invalid cases

// 🎯 SDK Application:
// Safely parse incoming webhook data from Meta
// Handle different payload formats
// Prevent runtime errors from unexpected data

// Advanced version with better error handling:

type ParsedData = {
  type: "string" | "number" | "object";
  value: string;
};

function parseWebhookDataAdvanced(data: unknown): ParsedData {
  if (typeof data === "string") {
    return { type: "string", value: data };
  }

  if (typeof data === "number") {
    return { type: "number", value: data.toString() };
  }

  if (typeof data === "object" && data !== null) {
    return { type: "object", value: JSON.stringify(data) };
  }

  throw new Error(`Invalid data type: ${typeof data}`);
}

console.log("\nAdvanced version:");
console.log(parseWebhookDataAdvanced("text"));
console.log(parseWebhookDataAdvanced(42));
console.log(parseWebhookDataAdvanced({ key: "value" }));

// Type guard pattern
function isValidWebhookData(data: unknown): data is { message: string; from: string } {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    "from" in data &&
    typeof (data as any).message === "string" &&
    typeof (data as any).from === "string"
  );
}

const testData: unknown = { message: "Hello", from: "+923001234567" };

if (isValidWebhookData(testData)) {
  // TypeScript now knows testData has message and from properties
  console.log("\nValid webhook:", testData.message, "from", testData.from);
}
