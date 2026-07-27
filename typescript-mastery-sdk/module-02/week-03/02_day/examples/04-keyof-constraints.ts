// Example 04: keyof Constraints
// Shows how to constrain generic keys for type-safe property access

console.log("=== keyof Constraints ===\n");

// ================================================================
// Understanding keyof
// ================================================================

console.log("--- Understanding keyof ---\n");

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
}

// keyof creates a union of all property keys
type UserKeys = keyof User; // "id" | "name" | "age" | "email"

const key1: UserKeys = "name";    // ✅ Valid
const key2: UserKeys = "age";     // ✅ Valid
// const key3: UserKeys = "invalid"; // ❌ Error

console.log("Valid user keys:", key1, key2);

// ================================================================
// Pattern 1: Safe Property Access
// ================================================================

console.log("\n--- Pattern 1: Type-Safe Property Access ---\n");

// K must be a key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user: User = {
  id: "1",
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

const name = getProperty(user, "name");   // Type: string
const age = getProperty(user, "age");     // Type: number
const email = getProperty(user, "email"); // Type: string

console.log("Name:", name);
console.log("Age:", age);
console.log("Email:", email);

// This won't compile:
// const invalid = getProperty(user, "invalid"); // ❌ Error!

// ================================================================
// Pattern 2: Safe Property Update
// ================================================================

console.log("\n--- Pattern 2: Type-Safe Property Update ---\n");

function setProperty<T, K extends keyof T>(
  obj: T,
  key: K,
  value: T[K]
): void {
  obj[key] = value;
}

setProperty(user, "name", "Ali Updated");  // ✅ Valid
setProperty(user, "age", 26);              // ✅ Valid

// These won't compile:
// setProperty(user, "age", "26");         // ❌ Wrong type
// setProperty(user, "invalid", "value");  // ❌ Invalid key

console.log("After updates:", user);

// ================================================================
// Pattern 3: Pick Multiple Properties
// ================================================================

console.log("\n--- Pattern 3: Extract Properties ---\n");

function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    result[key] = obj[key];
  }
  return result;
}

const publicUser = pick(user, "id", "name");
console.log("Public user:", publicUser);
// Type: { id: string; name: string }

const credentials = pick(user, "email");
console.log("Credentials:", credentials);
// Type: { email: string }

// ================================================================
// Pattern 4: Exclude Properties
// ================================================================

console.log("\n--- Pattern 4: Exclude Properties ---\n");

function omit<T, K extends keyof T>(obj: T, ...keys: K[]): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

const userWithoutEmail = omit(user, "email");
console.log("User without email:", userWithoutEmail);
// Type: Omit<User, "email">

// ================================================================
// Pattern 5: Sort by Property
// ================================================================

console.log("\n--- Pattern 5: Type-Safe Sorting ---\n");

function sortBy<T, K extends keyof T>(
  items: T[],
  key: K,
  direction: 'asc' | 'desc' = 'asc'
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal < bVal) return direction === 'asc' ? -1 : 1;
    if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}

interface Product {
  id: string;
  title: string;
  price: number;
  rating: number;
}

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500, rating: 4.5 },
  { id: "p2", title: "Laptop", price: 1000, rating: 4.8 },
  { id: "p3", title: "Mouse", price: 20, rating: 4.2 }
];

const byPrice = sortBy(products, "price");
const byRating = sortBy(products, "rating", "desc");

console.log("By price:", byPrice.map(p => `${p.title}: $${p.price}`));
console.log("By rating:", byRating.map(p => `${p.title}: ${p.rating}⭐`));

// This won't compile:
// sortBy(products, "invalid"); // ❌ Error!

// ================================================================
// Pattern 6: Group By Property
// ================================================================

console.log("\n--- Pattern 6: Group By Property ---\n");

function groupBy<T, K extends keyof T>(
  items: T[],
  key: K
): Map<T[K], T[]> {
  const groups = new Map<T[K], T[]>();

  for (const item of items) {
    const keyValue = item[key];
    const group = groups.get(keyValue) || [];
    group.push(item);
    groups.set(keyValue, group);
  }

  return groups;
}

interface Order {
  id: string;
  status: 'pending' | 'shipped' | 'delivered';
  amount: number;
}

const orders: Order[] = [
  { id: "o1", status: "pending", amount: 100 },
  { id: "o2", status: "shipped", amount: 200 },
  { id: "o3", status: "pending", amount: 150 },
  { id: "o4", status: "delivered", amount: 300 }
];

const byStatus = groupBy(orders, "status");

console.log("\nOrders by status:");
for (const [status, statusOrders] of byStatus) {
  console.log(`  ${status}: ${statusOrders.length} orders`);
}

// ================================================================
// Pattern 7: Filter by Property
// ================================================================

console.log("\n--- Pattern 7: Filter by Property Value ---\n");

function filterBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T[] {
  return items.filter(item => item[key] === value);
}

const pendingOrders = filterBy(orders, "status", "pending");
console.log("Pending orders:", pendingOrders.length);

const highValue = filterBy(orders, "amount", 300);
console.log("$300 orders:", highValue.length);

// ================================================================
// Pattern 8: Update Property for All Items
// ================================================================

console.log("\n--- Pattern 8: Bulk Update ---\n");

function updateAll<T, K extends keyof T>(
  items: T[],
  key: K,
  updater: (value: T[K]) => T[K]
): T[] {
  return items.map(item => ({
    ...item,
    [key]: updater(item[key])
  }));
}

// Increase all prices by 10%
const withIncreasedPrices = updateAll(products, "price", price => price * 1.1);
console.log("\nWith 10% price increase:");
withIncreasedPrices.forEach(p => {
  console.log(`  ${p.title}: $${p.price.toFixed(2)}`);
});

// ================================================================
// Pattern 9: Has Property Check
// ================================================================

console.log("\n--- Pattern 9: Property Existence Check ---\n");

function hasProperty<T, K extends keyof T>(
  obj: T,
  key: K
): obj is T & Record<K, NonNullable<T[K]>> {
  return obj[key] !== null && obj[key] !== undefined;
}

interface OptionalUser {
  id: string;
  name: string;
  email?: string;
}

const optUser: OptionalUser = { id: "1", name: "Ali" };

if (hasProperty(optUser, "email")) {
  // TypeScript knows email is defined here
  console.log("Email:", optUser.email.toLowerCase());
} else {
  console.log("No email provided");
}

// ================================================================
// Pattern 10: Pluck Property from Array
// ================================================================

console.log("\n--- Pattern 10: Extract Property Values ---\n");

function pluck<T, K extends keyof T>(items: T[], key: K): T[K][] {
  return items.map(item => item[key]);
}

const productTitles = pluck(products, "title");
const productPrices = pluck(products, "price");
const productIds = pluck(products, "id");

console.log("Titles:", productTitles);
console.log("Prices:", productPrices);
console.log("IDs:", productIds);

// ================================================================
// Pattern 11: Sum Property Values
// ================================================================

console.log("\n--- Pattern 11: Aggregate Numeric Properties ---\n");

// K must be a key whose value is a number
function sum<T, K extends keyof T>(
  items: T[],
  key: K
): T[K] extends number ? number : never {
  return items.reduce((total, item) => {
    const value = item[key];
    return (total as any) + (value as any);
  }, 0 as any);
}

const totalRevenue = sum(orders, "amount");
console.log("Total revenue:", totalRevenue);

const totalPrice = sum(products, "price");
console.log("Total product price:", totalPrice);

// ================================================================
// Pattern 12: Find by Property Value
// ================================================================

console.log("\n--- Pattern 12: Find with Property Matching ---\n");

function findBy<T, K extends keyof T>(
  items: T[],
  key: K,
  value: T[K]
): T | undefined {
  return items.find(item => item[key] === value);
}

const phoneProduct = findBy(products, "title", "Phone");
const expensiveProduct = findBy(products, "price", 1000);

console.log("Found by title:", phoneProduct);
console.log("Found by price:", expensiveProduct);

// ================================================================
// Real-World: Query Builder with keyof
// ================================================================

console.log("\n--- Real-World: Query Builder ---\n");

class QueryBuilder<T> {
  private items: T[];
  private filters: Array<(item: T) => boolean> = [];

  constructor(items: T[]) {
    this.items = items;
  }

  where<K extends keyof T>(key: K, value: T[K]): this {
    this.filters.push(item => item[key] === value);
    return this;
  }

  whereNot<K extends keyof T>(key: K, value: T[K]): this {
    this.filters.push(item => item[key] !== value);
    return this;
  }

  orderBy<K extends keyof T>(key: K, direction: 'asc' | 'desc' = 'asc'): this {
    this.items = sortBy(this.items, key, direction);
    return this;
  }

  execute(): T[] {
    return this.items.filter(item =>
      this.filters.every(filter => filter(item))
    );
  }
}

const query = new QueryBuilder(products);
const results = query
  .where("rating", 4.5)
  .orderBy("price", "desc")
  .execute();

console.log("Query results:", results);

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ keyof T = union of all keys of T");
console.log("✓ K extends keyof T = K must be a valid key");
console.log("✓ T[K] = type of property K in T");
console.log("✓ Enables completely type-safe property access");
console.log("✓ Perfect for generic data manipulation");
console.log("✓ Powers utility types like Pick, Omit");
console.log("✓ Essential for building flexible, type-safe APIs\n");

export {
  getProperty,
  setProperty,
  pick,
  omit,
  sortBy,
  groupBy,
  filterBy,
  updateAll,
  pluck,
  sum,
  findBy,
  QueryBuilder
};
