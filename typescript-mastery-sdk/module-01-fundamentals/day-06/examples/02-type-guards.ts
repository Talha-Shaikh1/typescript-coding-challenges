// Example 2: Type Guards
// Advanced type narrowing techniques

console.log("=== typeof Type Guard ===");

function processValue(value: string | number | boolean) {
  if (typeof value === "string") {
    console.log("String:", value.toUpperCase());
  } else if (typeof value === "number") {
    console.log("Number:", value.toFixed(2));
  } else {
    console.log("Boolean:", value ? "YES" : "NO");
  }
}

processValue("hello");
processValue(42.5678);
processValue(true);

console.log("\n=== in Type Guard ===");

interface TextMessage {
  to: string;
  text: string;
}

interface ImageMessage {
  to: string;
  imageId: string;
  caption?: string;
}

type Message = TextMessage | ImageMessage;

function sendMessage(message: Message): void {
  console.log(`Sending to: ${message.to}`);

  if ("text" in message) {
    // message is TextMessage
    console.log("Text:", message.text);
  } else if ("imageId" in message) {
    // message is ImageMessage
    console.log("Image ID:", message.imageId);
    if (message.caption) {
      console.log("Caption:", message.caption);
    }
  }
}

sendMessage({ to: "+92300", text: "Hello" });
sendMessage({ to: "+92301", imageId: "img_123", caption: "Check this!" });

console.log("\n=== Custom Type Guards ===");

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    console.log("String length:", value.length);
  } else if (isNumber(value)) {
    console.log("Number squared:", value * value);
  } else {
    console.log("Unknown type");
  }
}

processUnknown("TypeScript");
processUnknown(42);
processUnknown(true);

console.log("\n=== SDK Type Guard Example ===");

interface SuccessResponse {
  success: true;
  messageId: string;
}

interface ErrorResponse {
  success: false;
  error: string;
}

type APIResponse = SuccessResponse | ErrorResponse;

function isSuccessResponse(response: APIResponse): response is SuccessResponse {
  return response.success === true;
}

function handleResponse(response: APIResponse): void {
  if (isSuccessResponse(response)) {
    console.log("✅ Success! Message ID:", response.messageId);
  } else {
    console.log("❌ Error:", response.error);
  }
}

handleResponse({ success: true, messageId: "wamid_123" });
handleResponse({ success: false, error: "Invalid phone number" });

console.log("\n=== instanceof Type Guard ===");

class User {
  constructor(public name: string, public email: string) {}

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Admin extends User {
  constructor(name: string, email: string, public role: string) {
    super(name, email);
  }

  greet() {
    return `Hello, I'm ${this.name} (${this.role})`;
  }
}

function greetPerson(person: User | Admin): void {
  console.log(person.greet());

  if (person instanceof Admin) {
    console.log("Admin role:", person.role);
  }
}

let user = new User("Ali", "ali@test.com");
let admin = new Admin("Ahmed", "ahmed@test.com", "Super Admin");

greetPerson(user);
greetPerson(admin);

console.log("\n=== Truthiness Narrowing ===");

function processOptional(value: string | null | undefined): void {
  if (value) {
    // TypeScript knows: value is string (truthy)
    console.log("Value:", value.toUpperCase());
  } else {
    console.log("No value provided");
  }
}

processOptional("hello");
processOptional(null);
processOptional(undefined);

console.log("\n=== Array Type Guard ===");

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(item => typeof item === "string");
}

function processArray(value: unknown): void {
  if (isStringArray(value)) {
    console.log("String array:", value.join(", "));
    console.log("All uppercase:", value.map(s => s.toUpperCase()));
  } else {
    console.log("Not a string array");
  }
}

processArray(["a", "b", "c"]);
processArray([1, 2, 3]);
processArray("not an array");

console.log("\n✅ Example 2 complete!");
