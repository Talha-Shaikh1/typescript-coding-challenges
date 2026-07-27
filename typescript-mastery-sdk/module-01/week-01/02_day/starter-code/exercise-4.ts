// Exercise 4: Type Safety with unknown

// TODO: Create parseWebhookData function
// - Parameter: data with type 'unknown'
// - Return type: string
//
// Logic:
// - If data is string, return it
// - If data is number, convert to string
// - If data is object (and not null), return JSON.stringify(data)
// - Otherwise, throw new Error("Invalid data type")

function parseWebhookData(data: unknown): string {
  if (typeof data === "string") {
    return data
  }
  if (typeof data === "number") {
    return data.toString()
  }
  if (typeof data === "object" && data !== null) {
    return JSON.stringify(data)
  }
  else{
    throw new Error("Invalid data type")
  }
}

// TODO: Test with these cases
console.log(parseWebhookData("hello"));              // "hello"
console.log(parseWebhookData(123));                  // "123"
console.log(parseWebhookData({ msg: "hi" }));        // {"msg":"hi"}

// This should throw error (uncomment to test):
// console.log(parseWebhookData(null));                 // Error!

// Hint: Use typeof to check types
// Hint: Check 'data !== null' before checking object
