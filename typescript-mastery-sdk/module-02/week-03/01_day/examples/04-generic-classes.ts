// Example 04: Generic Classes
// Shows how to build reusable, type-safe data structures

console.log("=== Generic Classes Examples ===\n");

// ================================================================
// Example 1: Stack (LIFO - Last In First Out)
// ================================================================

console.log("--- Example 1: Generic Stack ---\n");

class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// Number stack
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Number stack:");
console.log("  Peek:", numberStack.peek());     // 3
console.log("  Pop:", numberStack.pop());       // 3
console.log("  Size:", numberStack.size());     // 2
console.log("  Array:", numberStack.toArray()); // [1, 2]

// String stack
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
stringStack.push("third");

console.log("\nString stack:");
console.log("  Peek:", stringStack.peek());     // "third"
console.log("  Pop:", stringStack.pop());       // "third"
console.log("  Array:", stringStack.toArray()); // ["first", "second"]

// Type safety in action
// numberStack.push("hello"); // ✗ Error: string not assignable to number

// ================================================================
// Example 2: Queue (FIFO - First In First Out)
// ================================================================

console.log("\n--- Example 2: Generic Queue ---\n");

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): T[] {
    return [...this.items];
  }
}

// Task queue
const taskQueue = new Queue<string>();
taskQueue.enqueue("Task 1");
taskQueue.enqueue("Task 2");
taskQueue.enqueue("Task 3");

console.log("Task queue:");
console.log("  Dequeue:", taskQueue.dequeue()); // "Task 1"
console.log("  Dequeue:", taskQueue.dequeue()); // "Task 2"
console.log("  Peek:", taskQueue.peek());       // "Task 3"
console.log("  Size:", taskQueue.size());       // 1

// ================================================================
// Example 3: Repository Pattern
// ================================================================

console.log("\n--- Example 3: Generic Repository ---\n");

interface Entity {
  id: string;
}

class Repository<T extends Entity> {
  private items: Map<string, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  update(id: string, updates: Partial<T>): boolean {
    const item = this.items.get(id);
    if (!item) return false;

    const updated = { ...item, ...updates };
    this.items.set(id, updated);
    return true;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  exists(id: string): boolean {
    return this.items.has(id);
  }

  count(): number {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }
}

// User repository
interface User extends Entity {
  name: string;
  email: string;
}

const userRepo = new Repository<User>();

userRepo.add({ id: "1", name: "Ali", email: "ali@example.com" });
userRepo.add({ id: "2", name: "Sara", email: "sara@example.com" });
userRepo.add({ id: "3", name: "Ahmed", email: "ahmed@example.com" });

console.log("User repository:");
console.log("  Count:", userRepo.count());
console.log("  Get user 2:", userRepo.getById("2"));
console.log("  Update user 1:", userRepo.update("1", { name: "Ali Updated" }));
console.log("  After update:", userRepo.getById("1"));
console.log("  Delete user 3:", userRepo.delete("3"));
console.log("  Count after delete:", userRepo.count());

// ================================================================
// Example 4: Generic Cache
// ================================================================

console.log("\n--- Example 4: Generic Cache with TTL ---\n");

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

class Cache<T> {
  private store: Map<string, CacheEntry<T>> = new Map();
  private defaultTTL: number;

  constructor(defaultTTLSeconds: number = 60) {
    this.defaultTTL = defaultTTLSeconds * 1000; // Convert to ms
  }

  set(key: string, value: T, ttlSeconds?: number): void {
    const ttl = ttlSeconds ? ttlSeconds * 1000 : this.defaultTTL;
    const expiresAt = Date.now() + ttl;
    this.store.set(key, { value, expiresAt });
  }

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  has(key: string): boolean {
    return this.get(key) !== undefined;
  }

  delete(key: string): boolean {
    return this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  cleanup(): number {
    let removed = 0;
    const now = Date.now();

    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key);
        removed++;
      }
    }

    return removed;
  }

  size(): number {
    this.cleanup(); // Clean expired before counting
    return this.store.size;
  }
}

// User cache
const userCache = new Cache<User>(30); // 30 second TTL

userCache.set("user-1", { id: "1", name: "Ali", email: "ali@example.com" });
userCache.set("user-2", { id: "2", name: "Sara", email: "sara@example.com" }, 60); // Custom 60s TTL

console.log("Cache:");
console.log("  Get user-1:", userCache.get("user-1"));
console.log("  Has user-2:", userCache.has("user-2"));
console.log("  Size:", userCache.size());

// ================================================================
// Example 5: Generic Pair/Tuple Class
// ================================================================

console.log("\n--- Example 5: Generic Pair ---\n");

class Pair<T, U> {
  constructor(
    public readonly first: T,
    public readonly second: U
  ) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }

  toString(): string {
    return `Pair(${this.first}, ${this.second})`;
  }

  toArray(): [T, U] {
    return [this.first, this.second];
  }

  map<V, W>(
    mapFirst: (value: T) => V,
    mapSecond: (value: U) => W
  ): Pair<V, W> {
    return new Pair(mapFirst(this.first), mapSecond(this.second));
  }
}

const pair1 = new Pair("age", 25);
console.log("Pair 1:", pair1.toString());
console.log("  Swapped:", pair1.swap().toString());

const pair2 = new Pair(100, "status");
console.log("\nPair 2:", pair2.toString());

const pair3 = pair1.map(
  str => str.toUpperCase(),
  num => num * 2
);
console.log("\nMapped pair:", pair3.toString());

// ================================================================
// Example 6: Generic Event Emitter (Simple)
// ================================================================

console.log("\n--- Example 6: Generic Event Emitter ---\n");

class EventEmitter<T> {
  private listeners: Array<(data: T) => void> = [];

  on(listener: (data: T) => void): void {
    this.listeners.push(listener);
  }

  emit(data: T): void {
    for (const listener of this.listeners) {
      listener(data);
    }
  }

  off(listener: (data: T) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  clear(): void {
    this.listeners = [];
  }
}

interface MessageEvent {
  id: string;
  text: string;
  from: string;
}

const messageEmitter = new EventEmitter<MessageEvent>();

messageEmitter.on((event) => {
  console.log(`Message received: ${event.text} from ${event.from}`);
});

messageEmitter.emit({
  id: "m1",
  text: "Hello!",
  from: "+1234567890"
});

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ Generic classes = reusable data structures");
console.log("✓ Type parameter <T> in class definition");
console.log("✓ All methods can use T");
console.log("✓ Full type safety for each instance");
console.log("✓ Common patterns: Stack, Queue, Repository, Cache");
console.log("✓ Can have multiple type parameters <T, U>");
console.log("✓ Can use constraints (T extends Something)\n");

export { Stack, Queue, Repository, Cache, Pair, EventEmitter };
