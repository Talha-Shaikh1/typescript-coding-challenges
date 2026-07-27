// Bonus Challenge: Result Type Pattern
// Goal: Master professional error handling with Result types

// TODO: Task 1 - Create generic Result type
// type Result<T, E = Error> =
//   | { ok: true; value: T }
//   | { ok: false; error: E };

// TODO: Task 2 - Create a function that returns Result
// function sendMessage(phone: string): Result<string, string> {
//   // If phone starts with '+' and length >= 10:
//   //   return { ok: true, value: `Message sent to ${phone}` }
//   // Otherwise:
//   //   return { ok: false, error: "Invalid phone number" }
// }

// TODO: Task 3 - Create unwrap function
// function unwrap<T, E>(result: Result<T, E>): T | never {
//   // If result.ok is true, return result.value
//   // Otherwise, throw new Error(String(result.error))
// }

// TODO: Task 4 - Create a safe function to handle Result
// function handleResult<T, E>(result: Result<T, E>): string {
//   // If ok, return "Success: " + value
//   // Otherwise return "Error: " + error
// }

// Test your code (uncomment after implementation):
// const result1 = sendMessage("+923001234567");
// const result2 = sendMessage("invalid");

// console.log(handleResult(result1));  // Expected: "Success: Message sent to +923001234567"
// console.log(handleResult(result2));  // Expected: "Error: Invalid phone number"

// // This should work:
// try {
//   console.log(unwrap(result1));  // "Message sent to +923001234567"
// } catch (e) {
//   console.log("Error:", e);
// }

// // This should throw:
// try {
//   console.log(unwrap(result2));  // Throws error!
// } catch (e) {
//   console.log("Caught error:", e);
// }

// Expected Output:
// Success: Message sent to +923001234567
// Error: Invalid phone number
// Message sent to +923001234567
// Caught error: Error: Invalid phone number

// This is how Rust handles errors! 🦀
// Professional TypeScript developers love this pattern! 💪
