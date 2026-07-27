// Example 02: Generic Functions
// Shows different patterns of generic functions

console.log("=== Generic Functions Examples ===\n");

// ================================================================
// Pattern 1: Single Type Parameter
// ================================================================

console.log("--- Pattern 1: Single Type Parameter ---\n");

// Identity function - returns what you pass
function identity<T>(value: T): T {
  return value;
}

const num = identity(42);           // T = number
const str = identity("hello");      // T = string
const bool = identity(true);        // T = boolean

console.log("Identity number:", num);
console.log("Identity string:", str);
console.log("Identity boolean:", bool);

// ================================================================
// Pattern 2: Array Operations
// ================================================================

console.log("\n--- Pattern 2: Array Operations ---\n");

// Get last element
function getLast<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

// Reverse array (without mutating)
function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

// Filter array
function filterItems<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  return arr.filter(predicate);
}

const numbers = [1, 2, 3, 4, 5];
console.log("Last number:", getLast(numbers));
console.log("Reversed:", reverse(numbers));
console.log("Filtered (> 3):", filterItems(numbers, n => n > 3));

// ================================================================
// Pattern 3: Multiple Type Parameters
// ================================================================

console.log("\n--- Pattern 3: Multiple Type Parameters ---\n");

// Create a pair
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Map function (transform one type to another)
function map<TInput, TOutput>(
  arr: TInput[],
  mapper: (item: TInput) => TOutput
): TOutput[] {
  return arr.map(mapper);
}

const pair1 = makePair("age", 25);              // [string, number]
const pair2 = makePair(true, "active");         // [boolean, string]

console.log("Pair 1:", pair1);
console.log("Pair 2:", pair2);

const nums = [1, 2, 3];
const strings = map(nums, n => `Number: ${n}`); // number[] -> string[]
console.log("Mapped to strings:", strings);

// ================================================================
// Pattern 4: Type Inference
// ================================================================

console.log("\n--- Pattern 4: Type Inference ---\n");

function wrap<T>(value: T): { value: T; timestamp: number } {
  return {
    value,
    timestamp: Date.now()
  };
}

// TypeScript infers T automatically
const wrapped1 = wrap(42);          // T = number (inferred)
const wrapped2 = wrap("hello");     // T = string (inferred)

console.log("Wrapped number:", wrapped1);
console.log("Wrapped string:", wrapped2);

// Can also be explicit when needed
const wrapped3 = wrap<boolean>(true);
console.log("Wrapped boolean (explicit):", wrapped3);

// ================================================================
// Pattern 5: Constraints Preview (will learn more tomorrow!)
// ================================================================

console.log("\n--- Pattern 5: Working with Object Properties ---\n");

// For now, we work with what we know T can do
function getLength<T>(arr: T[]): number {
  return arr.length; // Safe - all arrays have .length
}

function stringify<T>(value: T): string {
  return JSON.stringify(value); // Safe - JSON.stringify works with any type
}

console.log("Array length:", getLength([1, 2, 3, 4]));
console.log("Stringified:", stringify({ name: "Ali", age: 25 }));

// ================================================================
// Real-World Example: Find by ID
// ================================================================

console.log("\n--- Real-World: Find by ID ---\n");

interface User {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  price: number;
}

// Generic function that works with any object that has 'id'
// (Tomorrow you'll learn how to enforce this with constraints!)
function findById<T>(items: T[], id: string): T | undefined {
  return items.find((item: any) => item.id === id);
}

const users: User[] = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Sara" }
];

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500 },
  { id: "p2", title: "Laptop", price: 1000 }
];

const foundUser = findById(users, "2");
const foundProduct = findById(products, "p1");

console.log("Found user:", foundUser);
console.log("Found product:", foundProduct);

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ Generic functions work with ANY type");
console.log("✓ Type parameter <T> acts as a placeholder");
console.log("✓ TypeScript infers T from usage");
console.log("✓ Can have multiple type parameters <T, U, V>");
console.log("✓ Full type safety maintained");
console.log("✓ Write once, use everywhere!\n");

export { identity, getLast, reverse, makePair, map, wrap, findById };
