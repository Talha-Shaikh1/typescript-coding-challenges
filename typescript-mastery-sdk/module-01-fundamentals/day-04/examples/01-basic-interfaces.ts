// Example 1: Basic Objects and Interfaces
// Understanding object types in TypeScript

console.log("=== Inline Object Types ===");

// Inline object type (not reusable)
let user1: { name: string; age: number; email: string } = {
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

console.log("User 1:", user1);

// Problem: have to repeat type for every user
let user2: { name: string; age: number; email: string } = {
  name: "Ahmed",
  age: 30,
  email: "ahmed@example.com"
};

console.log("User 2:", user2);

console.log("\n=== Using Interfaces (Better!) ===");

// Define interface once, reuse everywhere
interface User {
  name: string;
  age: number;
  email: string;
}

let user3: User = {
  name: "Hassan",
  age: 28,
  email: "hassan@example.com"
};

let user4: User = {
  name: "Bilal",
  age: 32,
  email: "bilal@example.com"
};

console.log("User 3:", user3);
console.log("User 4:", user4);

console.log("\n=== Type Safety ===");

// TypeScript enforces all properties
// let incomplete: User = { name: "Test" };  // Error! Missing age and email

// Can't add extra properties
// let extra: User = { name: "Test", age: 25, email: "test@test.com", phone: "123" };  // Error!

// Can't use wrong types
// let wrongType: User = { name: "Test", age: "twenty", email: "test@test.com" };  // Error!

console.log("\n=== SDK Example ===");

interface ClientConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
}

let config: ClientConfig = {
  accessToken: "EAAtoken123...",
  phoneNumberId: "1234567890",
  apiVersion: "v18.0"
};

console.log("Config:", config);

// Function using interface
function initializeClient(config: ClientConfig): void {
  console.log("Initializing client with config:", config);
  console.log("API Version:", config.apiVersion);
}

initializeClient(config);

console.log("\n=== Arrays of Objects ===");

let users: User[] = [
  { name: "Ali", age: 25, email: "ali@test.com" },
  { name: "Ahmed", age: 30, email: "ahmed@test.com" },
  { name: "Hassan", age: 28, email: "hassan@test.com" }
];

console.log("All users:", users);

// Find user by name
let foundUser = users.find(u => u.name === "Ahmed");
console.log("Found user:", foundUser);

// Filter users over 26
let olderUsers = users.filter(u => u.age > 26);
console.log("Users over 26:", olderUsers);

console.log("\n✅ Example 1 complete!");
