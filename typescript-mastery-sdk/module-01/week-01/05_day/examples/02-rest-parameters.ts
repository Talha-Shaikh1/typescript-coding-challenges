// Example 2: Rest Parameters and Spread
// Handling variable number of arguments

console.log("=== Basic Rest Parameters ===");

function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log("Sum of 1, 2, 3:", sum(1, 2, 3));
console.log("Sum of 1, 2, 3, 4, 5:", sum(1, 2, 3, 4, 5));
console.log("Sum of nothing:", sum());

function multiply(...numbers: number[]): number {
  return numbers.reduce((product, n) => product * n, 1);
}

console.log("Multiply 2, 3, 4:", multiply(2, 3, 4));

console.log("\n=== Rest with Other Parameters ===");

function logMessage(level: string, ...messages: string[]): void {
  console.log(`[${level.toUpperCase()}]`, messages.join(" "));
}

logMessage("info", "Server", "started", "successfully");
logMessage("error", "Failed", "to", "connect");

console.log("\n=== SDK Bulk Send Example ===");

function sendToMultiple(text: string, ...recipients: string[]): object[] {
  return recipients.map(phone => ({
    to: phone,
    text: text,
    status: "queued"
  }));
}

let messages = sendToMultiple(
  "Hello from SDK",
  "+923001234567",
  "+923001234568",
  "+923001234569"
);

console.log("Bulk messages:", messages);
console.log("Total recipients:", messages.length);

console.log("\n=== Combining Required, Optional, and Rest ===");

function createMessages(
  text: string,
  priority: string = "normal",
  ...recipients: string[]
): object[] {
  return recipients.map(phone => ({
    to: phone,
    text,
    priority
  }));
}

console.log(createMessages("Alert!", "high", "+92300", "+92301"));
console.log(createMessages("Info", undefined, "+92300", "+92301", "+92302"));

console.log("\n=== Type Safety with Rest Parameters ===");

function concatenate(...strings: string[]): string {
  return strings.join("");
}

console.log(concatenate("Hello", " ", "World"));

// Type error if wrong type
// concatenate("Hello", 123, "World"); // Error!

console.log("\n=== Rest Parameters with Objects ===");

interface Message {
  to: string;
  text: string;
}

function queueMessages(...messages: Message[]): number {
  console.log("Queuing", messages.length, "messages");
  messages.forEach((msg, i) => {
    console.log(`${i + 1}. To ${msg.to}: ${msg.text}`);
  });
  return messages.length;
}

let count = queueMessages(
  { to: "+92300", text: "Hello 1" },
  { to: "+92301", text: "Hello 2" },
  { to: "+92302", text: "Hello 3" }
);

console.log("Queued:", count);

console.log("\n=== Spread Operator with Rest ===");

let numbers1 = [1, 2, 3];
let numbers2 = [4, 5, 6];

console.log("Sum array 1:", sum(...numbers1));
console.log("Sum array 2:", sum(...numbers2));
console.log("Sum both arrays:", sum(...numbers1, ...numbers2));

console.log("\n=== Real SDK Pattern ===");

type MessagePayload = {
  to: string;
  text: string;
  type: "text";
};

function sendBatch(
  options: { priority: string },
  ...payloads: MessagePayload[]
): object {
  return {
    batch_id: `batch_${Date.now()}`,
    priority: options.priority,
    message_count: payloads.length,
    messages: payloads
  };
}

let batch = sendBatch(
  { priority: "high" },
  { to: "+92300", text: "Msg 1", type: "text" },
  { to: "+92301", text: "Msg 2", type: "text" }
);

console.log("Batch:", batch);

console.log("\n✅ Example 2 complete!");
