// Example 01: The Problem Without Constraints
// Shows WHY we need generic constraints

console.log("=== Problem Without Constraints ===\n");

// ================================================================
// Scenario: Finding items by ID
// ================================================================

console.log("--- Attempt 1: Unconstrained Generic ---\n");

// ❌ This doesn't work!
function findById<T>(items: T[], id: string): T | undefined {
  // ERROR: Property 'id' does not exist on type 'T'
  // return items.find(item => item.id === id);

  // We're forced to use unsafe cast
  return items.find((item: any) => item.id === id);
}

// The problem: T can be ANYTHING
const numbers = [1, 2, 3, 4, 5];
const result1 = findById(numbers, "1"); // Compiles but crashes at runtime!
console.log("Finding in numbers array:", result1); // undefined (no error, just wrong)

// What we really wanted to do:
interface User {
  id: string;
  name: string;
}

const users: User[] = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Sara" }
];

const result2 = findById(users, "1");
console.log("Finding in users array:", result2); // Works, but no type safety!

console.log("\n❌ Problem: TypeScript can't guarantee T has 'id' property");
console.log("❌ We lost type safety by using 'any' cast");

// ================================================================
// Attempt 2: Specific Types (loses generics benefit)
// ================================================================

console.log("\n--- Attempt 2: Specific Types ---\n");

interface HasId {
  id: string;
}

// Only works with HasId - not generic!
function findByIdSpecific(items: HasId[], id: string): HasId | undefined {
  return items.find(item => item.id === id);
}

const foundUser = findByIdSpecific(users, "1");
console.log("Found user:", foundUser);

console.log("\n❌ Problem: Lost generics - return type is HasId, not User");
console.log("❌ Can't access user.name without casting");
// console.log(foundUser.name); // Error: Property 'name' does not exist on type 'HasId'

// ================================================================
// The Solution Preview (with constraints)
// ================================================================

console.log("\n--- Solution: Generic Constraints ---\n");

// ✅ Best of both worlds!
function findByIdConstrained<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id); // Type-safe!
}

const foundUser2 = findByIdConstrained(users, "1");
console.log("Found user with constraint:", foundUser2);
if (foundUser2) {
  console.log("User name:", foundUser2.name); // ✅ Type-safe access!
}

// Won't compile for wrong types:
// const wrongResult = findByIdConstrained(numbers, "1"); // ❌ Error!

console.log("\n✅ Solution: T extends HasId");
console.log("✅ T must have 'id', but can have more properties");
console.log("✅ Full type safety maintained");
console.log("✅ Generic flexibility retained");

// ================================================================
// Real-World Impact
// ================================================================

console.log("\n=== Real-World Impact ===\n");

interface Product {
  id: string;
  title: string;
  price: number;
}

interface Order {
  id: string;
  total: number;
  items: string[];
}

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500 },
  { id: "p2", title: "Laptop", price: 1000 }
];

const orders: Order[] = [
  { id: "o1", total: 500, items: ["p1"] },
  { id: "o2", total: 1500, items: ["p1", "p2"] }
];

// Same function works for both, with full type safety!
const product = findByIdConstrained(products, "p1");
const order = findByIdConstrained(orders, "o1");

if (product) {
  console.log("Product:", product.title, "-", product.price); // ✅ Type-safe!
}

if (order) {
  console.log("Order total:", order.total); // ✅ Type-safe!
}

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("❌ Without constraints: Can't access properties on T");
console.log("❌ With 'any': Type safety lost");
console.log("❌ Specific types: Lose generic flexibility");
console.log("✅ With constraints: Type safety + Flexibility!");
console.log("✅ T extends Interface = Best solution\n");

export { findByIdConstrained };
