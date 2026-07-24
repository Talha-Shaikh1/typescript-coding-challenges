// Bonus Challenge: Result Type Pattern - SOLUTION

// Task 1: Create generic Result type
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

// Task 2: Create a function that returns Result
function sendMessage(phone: string): Result<string, string> {
  // Validate phone
  if (phone.startsWith('+') && phone.length >= 10) {
    return { ok: true, value: `Message sent to ${phone}` };
  } else {
    return { ok: false, error: "Invalid phone number" };
  }
}

// Task 3: Create unwrap function
function unwrap<T, E>(result: Result<T, E>): T | never {
  if (result.ok) {
    return result.value;
  } else {
    throw new Error(String(result.error));
  }
}

// Task 4: Create a safe function to handle Result
function handleResult<T, E>(result: Result<T, E>): string {
  if (result.ok) {
    return `Success: ${result.value}`;
  } else {
    return `Error: ${result.error}`;
  }
}

// Additional helper functions
function isOk<T, E>(result: Result<T, E>): result is { ok: true; value: T } {
  return result.ok === true;
}

function isError<T, E>(result: Result<T, E>): result is { ok: false; error: E } {
  return result.ok === false;
}

function map<T, U, E>(result: Result<T, E>, fn: (value: T) => U): Result<U, E> {
  if (result.ok) {
    return { ok: true, value: fn(result.value) };
  } else {
    return result;
  }
}

// Real-world example: API client with Result type
class MessageClient {
  sendText(phone: string, text: string): Result<{ messageId: string; timestamp: number }, string> {
    if (!phone.startsWith('+')) {
      return { ok: false, error: "Phone must start with +" };
    }

    if (phone.length < 10) {
      return { ok: false, error: "Phone number too short" };
    }

    if (text.trim() === "") {
      return { ok: false, error: "Message text cannot be empty" };
    }

    // Success case
    return {
      ok: true,
      value: {
        messageId: `wamid_${Date.now()}`,
        timestamp: Date.now()
      }
    };
  }

  validateAndSend(phone: string, text: string): Result<string, string> {
    const result = this.sendText(phone, text);

    if (result.ok) {
      return { ok: true, value: `Sent: ${result.value.messageId}` };
    } else {
      return result;
    }
  }
}

// Test cases
console.log("=== Bonus: Result Type Pattern ===\n");

const result1 = sendMessage("+923001234567");
const result2 = sendMessage("invalid");

console.log(handleResult(result1));
// Expected: "Success: Message sent to +923001234567"

console.log(handleResult(result2));
// Expected: "Error: Invalid phone number"

console.log("\n--- Testing unwrap ---");

// This should work:
try {
  console.log(unwrap(result1));  // "Message sent to +923001234567"
} catch (e) {
  console.log("Error:", e);
}

// This should throw:
try {
  console.log(unwrap(result2));  // Throws error!
} catch (e) {
  console.log("Caught error:", (e as Error).message);
}

console.log("\n--- Testing with MessageClient ---");

const client = new MessageClient();

const r1 = client.sendText("+923001234567", "Hello!");
console.log(handleResult(r1));

const r2 = client.sendText("invalid", "Hello!");
console.log(handleResult(r2));

const r3 = client.sendText("+92300", "Hello!");
console.log(handleResult(r3));

const r4 = client.sendText("+923001234567", "");
console.log(handleResult(r4));

console.log("\n--- Testing map function ---");

const result3 = sendMessage("+923001234567");
const mapped = map(result3, (msg) => msg.toUpperCase());
console.log(handleResult(mapped));

console.log("\n--- Using type guards ---");

if (isOk(result1)) {
  console.log("Success value:", result1.value);
}

if (isError(result2)) {
  console.log("Error value:", result2.error);
}

console.log("\n✅ This is how Rust handles errors! 🦀");
console.log("Professional TypeScript developers love this pattern! 💪");
console.log("No more try-catch spaghetti - explicit error handling!");
