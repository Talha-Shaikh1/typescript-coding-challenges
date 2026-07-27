// Exercise 4: Generic Classes
// Complete the TODOs below

console.log("=== Exercise 4: Generic Classes ===\n");

// ================================================================
// Task 1: Stack (LIFO - Last In First Out)
// ================================================================

console.log("--- Task 1: Generic Stack ---");

class Stack<T> {
  // TODO: Add private items array of type T[]

  push(item: T): void {
    // TODO: Add item to end of array
  }

  pop(): T | undefined {
    // TODO: Remove and return last item
  }

  peek(): T | undefined {
    // TODO: Return last item without removing
  }

  isEmpty(): boolean {
    // TODO: Check if array is empty
  }

  size(): number {
    // TODO: Return array length
  }

  clear(): void {
    // TODO: Empty the array
  }
}

// Test cases (uncomment when ready):
// const numStack = new Stack<number>();
// numStack.push(1);
// numStack.push(2);
// numStack.push(3);
// console.log("Pop:", numStack.pop());      // Should output: 3
// console.log("Peek:", numStack.peek());    // Should output: 2
// console.log("Size:", numStack.size());    // Should output: 2

// ================================================================
// Task 2: Queue (FIFO - First In First Out)
// ================================================================

console.log("\n--- Task 2: Generic Queue ---");

class Queue<T> {
  // TODO: Add private items array of type T[]

  enqueue(item: T): void {
    // TODO: Add item to end of array
  }

  dequeue(): T | undefined {
    // TODO: Remove and return first item
    // Hint: Use shift() method
  }

  peek(): T | undefined {
    // TODO: Return first item without removing
  }

  isEmpty(): boolean {
    // TODO: Check if array is empty
  }

  size(): number {
    // TODO: Return array length
  }
}

// Test cases (uncomment when ready):
// const taskQueue = new Queue<string>();
// taskQueue.enqueue("Task 1");
// taskQueue.enqueue("Task 2");
// taskQueue.enqueue("Task 3");
// console.log("Dequeue:", taskQueue.dequeue());  // Should output: "Task 1"
// console.log("Dequeue:", taskQueue.dequeue());  // Should output: "Task 2"
// console.log("Size:", taskQueue.size());        // Should output: 1

// ================================================================
// Task 3: Generic Repository
// ================================================================

console.log("\n--- Task 3: Generic Repository ---");

// NOTE: T extends { id: string } means T must have an 'id' property
// You'll learn more about constraints tomorrow (Day 16)!

class Repository<T extends { id: string }> {
  // TODO: Add private items Map<string, T>
  // Hint: private items: Map<string, T> = new Map();

  add(item: T): void {
    // TODO: Add item to Map using item.id as key
  }

  getById(id: string): T | undefined {
    // TODO: Get item from Map by id
  }

  getAll(): T[] {
    // TODO: Return all items as array
    // Hint: Array.from(this.items.values())
  }

  update(id: string, updates: Partial<T>): boolean {
    // TODO: Get existing item
    // TODO: If not found, return false
    // TODO: Merge updates with existing item
    // TODO: Save back to Map
    // TODO: Return true
  }

  delete(id: string): boolean {
    // TODO: Delete item from Map
    // TODO: Return whether deletion was successful
  }

  exists(id: string): boolean {
    // TODO: Check if id exists in Map
  }

  count(): number {
    // TODO: Return Map size
  }
}

// Test cases (uncomment when ready):
// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// const userRepo = new Repository<User>();

// userRepo.add({ id: "1", name: "Ali", email: "ali@example.com" });
// userRepo.add({ id: "2", name: "Sara", email: "sara@example.com" });

// console.log("Get user 1:", userRepo.getById("1"));
// console.log("Count:", userRepo.count());

// userRepo.update("1", { name: "Ali Updated" });
// console.log("After update:", userRepo.getById("1"));

// userRepo.delete("2");
// console.log("Count after delete:", userRepo.count());

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All three classes implemented");
console.log("[ ] Type safety works correctly");
console.log("[ ] All methods functional");
console.log("[ ] All test cases pass");
