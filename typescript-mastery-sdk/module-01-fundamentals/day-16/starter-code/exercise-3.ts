// Exercise 3: Interface Constraints
// Practice constraining generics to specific object shapes

console.log("=== Exercise 3: Interface Constraints ===\n");

// ================================================================
// Task 1: Entity Operations
// ================================================================

console.log("--- Task 1: Entity Operations ---");

interface Entity {
  id: string;
  createdAt: number;
}

// TODO: Add constraint - T must extend Entity
function findEntityById<T /* TODO */>(
  entities: T[],
  id: string
): T | undefined {
  // TODO: Implement
}

// TODO: Add constraint - T must extend Entity
function getAllIds<T /* TODO */>(entities: T[]): string[] {
  // TODO: Return array of all entity IDs
}

// TODO: Add constraint - T must extend Entity
function sortByDate<T /* TODO */>(entities: T[]): T[] {
  // TODO: Sort by createdAt (oldest first)
}

// Test with different entity types (uncomment when ready):
// interface User extends Entity {
//   name: string;
//   email: string;
// }

// interface Product extends Entity {
//   title: string;
//   price: number;
// }

// const users: User[] = [
//   { id: "1", name: "Ali", email: "ali@example.com", createdAt: 2000 },
//   { id: "2", name: "Sara", email: "sara@example.com", createdAt: 1000 }
// ];

// const products: Product[] = [
//   { id: "p1", title: "Phone", price: 500, createdAt: 1500 }
// ];

// console.log("Find user:", findEntityById(users, "1"));
// console.log("All user IDs:", getAllIds(users));
// console.log("Sorted users:", sortByDate(users));

// ================================================================
// Task 2: Comparable Objects
// ================================================================

console.log("\n--- Task 2: Comparable Objects ---");

interface Comparable {
  compareTo(other: this): number;
}

// TODO: Add constraint - T must implement Comparable
function sort<T /* TODO */>(items: T[]): T[] {
  // TODO: Use item.compareTo() to sort
}

// Test class (uncomment when ready):
// class Version implements Comparable {
//   constructor(
//     public major: number,
//     public minor: number,
//     public patch: number
//   ) {}

//   compareTo(other: Version): number {
//     if (this.major !== other.major) return this.major - other.major;
//     if (this.minor !== other.minor) return this.minor - other.minor;
//     return this.patch - other.patch;
//   }

//   toString(): string {
//     return `${this.major}.${this.minor}.${this.patch}`;
//   }
// }

// const versions = [
//   new Version(2, 0, 0),
//   new Version(1, 5, 3),
//   new Version(1, 6, 0)
// ];
// const sorted = sort(versions);
// console.log("Sorted:", sorted.map(v => v.toString()));

// ================================================================
// Task 3: Multiple Property Constraints
// ================================================================

console.log("\n--- Task 3: Multiple Property Constraints ---");

interface HasId {
  id: string;
}

interface HasName {
  name: string;
}

interface HasTimestamp {
  createdAt: number;
  updatedAt: number;
}

// TODO: Add constraint - T must have id, name, AND timestamps
function logFullEntity<T /* TODO */>(entity: T): void {
  // TODO: Log formatted string with all required properties
  // Format: "[id] name (created: ..., updated: ...)"
}

// TODO: Add constraint - T must have timestamps
function touch<T /* TODO */>(entity: T): T {
  // TODO: Update updatedAt to current time
  // Return the updated entity
}

// Test (uncomment when ready):
// interface Article extends HasId, HasName, HasTimestamp {
//   content: string;
// }

// const article: Article = {
//   id: "a1",
//   name: "TypeScript Guide",
//   content: "...",
//   createdAt: Date.now() - 10000,
//   updatedAt: Date.now() - 5000
// };

// logFullEntity(article);
// const touched = touch(article);
// console.log("After touch:", touched);

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All interface constraints work");
console.log("[ ] Functions accept correct types");
console.log("[ ] Invalid types rejected");
console.log("[ ] Test cases pass");
