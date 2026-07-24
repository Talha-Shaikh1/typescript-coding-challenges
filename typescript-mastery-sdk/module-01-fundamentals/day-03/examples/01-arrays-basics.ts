// Example 1: Arrays Basics
// Understanding typed arrays in TypeScript

// Basic array declarations
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Ali", "Ahmed", "Hassan"];
let flags: boolean[] = [true, false, true];

console.log("Numbers:", numbers);
console.log("Names:", names);
console.log("Flags:", flags);

// Alternative syntax (generic)
let cities: Array<string> = ["Karachi", "Lahore", "Islamabad"];
console.log("Cities:", cities);

// Type inference
let ages = [20, 25, 30];  // TypeScript infers: number[]
console.log("Ages type inferred:", ages);

// Array methods
console.log("\n=== Array Methods ===");

// Adding elements
numbers.push(6);           // Add to end
console.log("After push:", numbers);

numbers.unshift(0);        // Add to beginning
console.log("After unshift:", numbers);

// Removing elements
let last = numbers.pop();  // Remove from end
console.log("Popped:", last);
console.log("After pop:", numbers);

let first = numbers.shift(); // Remove from beginning
console.log("Shifted:", first);
console.log("After shift:", numbers);

// Accessing elements
console.log("\n=== Accessing Elements ===");
console.log("First name:", names[0]);
console.log("Last name:", names[names.length - 1]);

// Length
console.log("Array length:", names.length);

// Finding elements
console.log("\n=== Finding Elements ===");
let index = names.indexOf("Ahmed");
console.log("Index of 'Ahmed':", index);

let exists = names.includes("Ali");
console.log("Includes 'Ali':", exists);

// Transforming arrays
console.log("\n=== Transforming Arrays ===");

// Map: transform each element
let doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

let uppercased = names.map(name => name.toUpperCase());
console.log("Uppercased:", uppercased);

// Filter: keep elements that match condition
let evens = numbers.filter(n => n % 2 === 0);
console.log("Even numbers:", evens);

let longNames = names.filter(name => name.length > 4);
console.log("Long names:", longNames);

// Reduce: combine all elements into one value
let sum = numbers.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

let concatenated = names.reduce((acc, name) => acc + name + " ", "");
console.log("Concatenated:", concatenated);

// SDK Real-world example
console.log("\n=== SDK Example ===");

let recipients: string[] = ["+923001234567", "+923001234568", "invalid"];

// Filter valid phone numbers
let validRecipients = recipients.filter(phone =>
  phone.startsWith('+') && phone.length >= 10
);

console.log("Valid recipients:", validRecipients);
console.log("Total valid:", validRecipients.length);

// Map to create message objects
type Message = { to: string; text: string };
let messages: Message[] = validRecipients.map(phone => ({
  to: phone,
  text: "Hello from SDK"
}));

console.log("Messages:", messages);

console.log("\n✅ Example 1 complete!");
