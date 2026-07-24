// Example 1: Union Types Basics
// Understanding union types and type narrowing

console.log("=== Basic Union Types ===");

// Union of primitives
let id: string | number;

id = "abc123";
console.log("ID as string:", id);

id = 456;
console.log("ID as number:", id);

// id = true;  // Error! boolean not in union

// Union type alias
type Status = "pending" | "success" | "error";

let currentStatus: Status = "pending";
console.log("Status:", currentStatus);

// currentStatus = "completed";  // Error! Not in union

console.log("\n=== Union with null/undefined ===");

type NullableString = string | null;
type OptionalNumber = number | undefined;

let name: NullableString = "Ali";
console.log("Name:", name);

name = null;
console.log("Name is null:", name);

console.log("\n=== Type Narrowing with typeof ===");

function printValue(value: string | number) {
  console.log("Value:", value);
  console.log("Type:", typeof value);

  if (typeof value === "string") {
    // TypeScript knows: value is string
    console.log("Uppercase:", value.toUpperCase());
    console.log("Length:", value.length);
  } else {
    // TypeScript knows: value is number
    console.log("Fixed:", value.toFixed(2));
    console.log("Double:", value * 2);
  }
}

printValue("hello");
printValue(42);

console.log("\n=== Array Union Types ===");

// Array of mixed types
let mixed: (string | number)[] = [1, "two", 3, "four"];
console.log("Mixed array:", mixed);

// Union of array types
let arrayOrString: string[] | string = ["a", "b"];
console.log("Array:", arrayOrString);

arrayOrString = "single string";
console.log("String:", arrayOrString);

console.log("\n=== SDK Status Example ===");

type MessageStatus = "queued" | "sending" | "sent" | "delivered" | "failed";

function handleStatus(status: MessageStatus): string {
  switch (status) {
    case "queued":
      return "⏳ Message in queue";
    case "sending":
      return "📤 Sending...";
    case "sent":
      return "✅ Sent to WhatsApp";
    case "delivered":
      return "✅✅ Delivered to user";
    case "failed":
      return "❌ Failed to send";
  }
}

console.log(handleStatus("queued"));
console.log(handleStatus("delivered"));
console.log(handleStatus("failed"));

console.log("\n=== Union with Objects ===");

interface User {
  type: "user";
  name: string;
  email: string;
}

interface Admin {
  type: "admin";
  name: string;
  role: string;
}

type Person = User | Admin;

function greetPerson(person: Person) {
  console.log(`Hello, ${person.name}!`);

  if (person.type === "user") {
    console.log("Email:", person.email);
  } else {
    console.log("Role:", person.role);
  }
}

let user: User = { type: "user", name: "Ali", email: "ali@test.com" };
let admin: Admin = { type: "admin", name: "Ahmed", role: "Super Admin" };

greetPerson(user);
greetPerson(admin);

console.log("\n=== SDK Message ID Union ===");

type MessageID = string | number;

function trackMessage(id: MessageID, status: MessageStatus): void {
  console.log(`Message ${id}: ${status}`);
}

trackMessage("wamid_abc123", "sent");
trackMessage(456789, "delivered");

console.log("\n=== Union Return Types ===");

function divide(a: number, b: number): number | string {
  if (b === 0) {
    return "Cannot divide by zero";
  }
  return a / b;
}

let result1 = divide(10, 2);
console.log("10 / 2 =", result1);

let result2 = divide(10, 0);
console.log("10 / 0 =", result2);

console.log("\n✅ Example 1 complete!");
