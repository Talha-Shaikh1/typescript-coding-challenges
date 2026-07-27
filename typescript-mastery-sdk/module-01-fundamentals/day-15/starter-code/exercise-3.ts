// Exercise 3: Generic Interfaces
// Complete the TODOs below

console.log("=== Exercise 3: Generic Interfaces ===\n");

// ================================================================
// Task 1: API Response Interface
// ================================================================

console.log("--- Task 1: API Response Interface ---");

// TODO: Define generic APIResponse interface
interface APIResponse<T> {
  // TODO: Add properties:
  // - data (type T)
  // - status (number)
  // - message (string)
  // - timestamp (number)
}

// Test types:
interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
}

// TODO: Create type aliases using APIResponse
// type UserResponse = ?
// type MessageResponse = ?
// type UsersListResponse = ?

// Usage test (uncomment when ready):
// const userResp: UserResponse = {
//   data: { id: "1", name: "Ali" },
//   status: 200,
//   message: "Success",
//   timestamp: Date.now()
// };
// console.log("User response:", userResp);

// ================================================================
// Task 2: Result/Either Pattern
// ================================================================

console.log("\n--- Task 2: Result/Either Pattern ---");

// TODO: Define Success interface
interface Success<T> {
  // TODO: Add properties for success case
}

// TODO: Define Failure interface
interface Failure {
  // TODO: Add properties for failure case
}

// TODO: Define Result type (union of Success and Failure)
// type Result<T> = ?

// TODO: Implement divide function
function divide(a: number, b: number): /* TODO: return type */ {
  // TODO: Return Failure if b is 0
  // TODO: Return Success with result otherwise
}

// Usage test (uncomment when ready):
// const result1 = divide(10, 2);
// if (result1.success) {
//   console.log("Result:", result1.data);
// } else {
//   console.log("Error:", result1.error);
// }

// const result2 = divide(10, 0);
// if (result2.success) {
//   console.log("Result:", result2.data);
// } else {
//   console.log("Error:", result2.error);
// }

// ================================================================
// Task 3: Box/Container Interface
// ================================================================

console.log("\n--- Task 3: Box/Container Interface ---");

// TODO: Define Box interface
interface Box<T> {
  // TODO: Add properties and methods:
  // - value (type T)
  // - isEmpty (boolean)
  // - getValue(): T
  // - setValue(newValue: T): void
  // - map<U>(fn: (value: T) => U): Box<U>
}

// TODO: Implement createBox function
function createBox<T>(initialValue: T): Box<T> {
  // TODO: Your implementation
  // Hint: Return an object that implements Box<T>
}

// Test (uncomment when ready):
// const numBox = createBox(42);
// console.log("Initial value:", numBox.getValue());
// numBox.setValue(100);
// console.log("After setValue:", numBox.getValue());

// const strBox = numBox.map(n => `Number: ${n}`);
// console.log("Mapped box:", strBox.getValue());

// ================================================================
// Task 4: Key-Value Storage
// ================================================================

console.log("\n--- Task 4: Key-Value Storage ---");

// TODO: Define KeyValueStore interface
interface KeyValueStore<K, V> {
  // TODO: Add methods:
  // - set(key: K, value: V): void
  // - get(key: K): V | undefined
  // - has(key: K): boolean
  // - delete(key: K): boolean
  // - size(): number
}

// TODO: Implement Store class
class Store<K, V> /* TODO: implements KeyValueStore<K, V> */ {
  // TODO: Add private storage (use Map<K, V>)

  // TODO: Implement all methods from KeyValueStore
}

// Test (uncomment when ready):
// interface User {
//   id: string;
//   name: string;
// }

// const userStore = new Store<string, User>();
// userStore.set("1", { id: "1", name: "Ali" });
// console.log("Get user 1:", userStore.get("1"));
// console.log("Has user 2:", userStore.has("2"));
// console.log("Store size:", userStore.size());

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All interfaces defined correctly");
console.log("[ ] All implementations work");
console.log("[ ] Type safety maintained");
console.log("[ ] All test cases pass");
