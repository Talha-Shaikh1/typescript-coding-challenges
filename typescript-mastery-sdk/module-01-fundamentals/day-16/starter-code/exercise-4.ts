// Exercise 4: keyof Constraints
// Practice property key constraints for type-safe property access

console.log("=== Exercise 4: keyof Constraints ===\n");

// ================================================================
// Task 1: Safe Property Access
// ================================================================

console.log("--- Task 1: Safe Property Access ---");

// TODO: Add constraints - K must be a key of T
function getProperty<T, K /* TODO: add constraint */>(
  obj: T,
  key: K
): /* TODO: return type */ {
  // TODO: Return obj[key]
}

// Test (uncomment when ready):
// const user = {
//   id: "1",
//   name: "Ali",
//   age: 25,
//   email: "ali@example.com"
// };

// const name = getProperty(user, "name");    // Should be: string
// const age = getProperty(user, "age");      // Should be: number
// const x = getProperty(user, "invalid");    // Should NOT compile!

// ================================================================
// Task 2: Safe Property Update
// ================================================================

console.log("\n--- Task 2: Safe Property Update ---");

// TODO: Add constraints - K must be a key of T
function setProperty<T, K /* TODO */>(
  obj: T,
  key: K,
  value: /* TODO: correct type */
): void {
  // TODO: Set obj[key] = value
}

// Test (uncomment when ready):
// const product = {
//   id: "p1",
//   title: "Phone",
//   price: 500
// };

// setProperty(product, "title", "New Phone"); // ✅ Should work
// setProperty(product, "price", 600);         // ✅ Should work
// setProperty(product, "price", "600");       // ❌ Should NOT compile!

// ================================================================
// Task 3: Pick Multiple Properties
// ================================================================

console.log("\n--- Task 3: Pick Multiple Properties ---");

// TODO: Add constraints - K must be keys of T
function pick<T, K /* TODO */>(
  obj: T,
  ...keys: K[]
): /* TODO: return type Pick<T, K> */ {
  // TODO: Create object with only specified keys
}

// Test (uncomment when ready):
// const user = {
//   id: "1",
//   name: "Ali",
//   age: 25,
//   email: "ali@example.com",
//   password: "hashed"
// };

// const publicUser = pick(user, "id", "name", "email");
// Type should be: { id: string; name: string; email: string }

// ================================================================
// Task 4: Sort by Property
// ================================================================

console.log("\n--- Task 4: Sort by Property ---");

// TODO: Add constraints - K must be a key of T
function sortBy<T, K /* TODO */>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  // TODO: Sort by specified property
  // Handle both ascending and descending
}

// Test (uncomment when ready):
// interface Product {
//   id: string;
//   title: string;
//   price: number;
//   rating: number;
// }

// const products: Product[] = [
//   { id: "p1", title: "Phone", price: 500, rating: 4.5 },
//   { id: "p2", title: "Laptop", price: 1000, rating: 4.8 },
//   { id: "p3", title: "Mouse", price: 20, rating: 4.2 }
// ];

// const byPrice = sortBy(products, "price");           // Ascending
// const byRating = sortBy(products, "rating", "desc"); // Descending
// const byInvalid = sortBy(products, "invalid");       // Should NOT compile!

// ================================================================
// Task 5: Group by Property
// ================================================================

console.log("\n--- Task 5: Group by Property ---");

// TODO: Add constraints - K must be a key of T
function groupBy<T, K /* TODO */>(
  items: T[],
  key: K
): /* TODO: return Map<T[K], T[]> */ {
  // TODO: Group items by property value
  // Return Map where key is property value, value is array of items
}

// Test (uncomment when ready):
// interface Order {
//   id: string;
//   status: 'pending' | 'shipped' | 'delivered';
//   amount: number;
// }

// const orders: Order[] = [
//   { id: "o1", status: "pending", amount: 100 },
//   { id: "o2", status: "shipped", amount: 200 },
//   { id: "o3", status: "pending", amount: 150 }
// ];

// const byStatus = groupBy(orders, "status");
// console.log("Pending:", byStatus.get("pending")?.length); // 2
// console.log("Shipped:", byStatus.get("shipped")?.length); // 1

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All keyof constraints work correctly");
console.log("[ ] Property access is type-safe");
console.log("[ ] Return types are inferred correctly");
console.log("[ ] Invalid keys rejected at compile time");
