// Example 03: Interface Constraints
// Shows how to constrain generics to specific object shapes

console.log("=== Interface Constraints ===\n");

// ================================================================
// Pattern 1: Single Property Constraint
// ================================================================

console.log("--- Pattern 1: Single Property ---\n");

interface HasId {
  id: string;
}

function findById<T extends HasId>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);
}

interface User extends HasId {
  name: string;
  email: string;
}

interface Product extends HasId {
  title: string;
  price: number;
}

const users: User[] = [
  { id: "1", name: "Ali", email: "ali@example.com" },
  { id: "2", name: "Sara", email: "sara@example.com" }
];

const products: Product[] = [
  { id: "p1", title: "Phone", price: 500 },
  { id: "p2", title: "Laptop", price: 1000 }
];

console.log("Find user:", findById(users, "1"));
console.log("Find product:", findById(products, "p1"));

// ================================================================
// Pattern 2: Multiple Property Constraint
// ================================================================

console.log("\n--- Pattern 2: Multiple Properties ---\n");

interface Entity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

function updateTimestamp<T extends Entity>(entity: T): T {
  return {
    ...entity,
    updatedAt: Date.now()
  };
}

function isNew<T extends Entity>(entity: T): boolean {
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - entity.createdAt < oneDay;
}

interface Article extends Entity {
  title: string;
  content: string;
}

const article: Article = {
  id: "a1",
  title: "TypeScript Guide",
  content: "...",
  createdAt: Date.now() - 1000000,
  updatedAt: Date.now() - 500000
};

const updated = updateTimestamp(article);
console.log("Updated article:", updated);
console.log("Is new?", isNew(article));

// ================================================================
// Pattern 3: Intersection Constraints (Multiple Interfaces)
// ================================================================

console.log("\n--- Pattern 3: Multiple Interfaces ---\n");

interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// T must have BOTH name and age
function greetPerson<T extends HasName & HasAge>(person: T): string {
  return `Hello ${person.name}, you are ${person.age} years old!`;
}

interface Person extends HasName, HasAge {
  email: string;
}

const person: Person = {
  name: "Ali",
  age: 25,
  email: "ali@example.com"
};

console.log(greetPerson(person));

// Works with any object that has name and age
const student = { name: "Sara", age: 20, grade: "A" };
console.log(greetPerson(student));

// ================================================================
// Pattern 4: Method Constraints
// ================================================================

console.log("\n--- Pattern 4: Method Requirements ---\n");

interface Comparable {
  compareTo(other: this): number;
}

function max<T extends Comparable>(a: T, b: T): T {
  return a.compareTo(b) > 0 ? a : b;
}

function min<T extends Comparable>(a: T, b: T): T {
  return a.compareTo(b) < 0 ? a : b;
}

function sort<T extends Comparable>(items: T[]): T[] {
  return [...items].sort((a, b) => a.compareTo(b));
}

class Version implements Comparable {
  constructor(
    public major: number,
    public minor: number,
    public patch: number
  ) {}

  compareTo(other: Version): number {
    if (this.major !== other.major) return this.major - other.major;
    if (this.minor !== other.minor) return this.minor - other.minor;
    return this.patch - other.patch;
  }

  toString(): string {
    return `${this.major}.${this.minor}.${this.patch}`;
  }
}

const v1 = new Version(1, 2, 3);
const v2 = new Version(2, 0, 0);
const v3 = new Version(1, 5, 0);

console.log("Max version:", max(v1, v2).toString());
console.log("Min version:", min(v1, v2).toString());

const versions = [v2, v1, v3];
const sorted = sort(versions);
console.log("Sorted versions:", sorted.map(v => v.toString()).join(", "));

// ================================================================
// Pattern 5: Generic Repository with Entity Constraint
// ================================================================

console.log("\n--- Pattern 5: Repository Pattern ---\n");

interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

class Repository<T extends BaseEntity> {
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

  update(id: string, updates: Partial<T>): T | null {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated = {
      ...existing,
      ...updates,
      updatedAt: Date.now()
    };

    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }

  findRecent(hours: number = 24): T[] {
    const cutoff = Date.now() - (hours * 60 * 60 * 1000);
    return this.getAll().filter(item => item.createdAt > cutoff);
  }
}

interface Message extends BaseEntity {
  text: string;
  to: string;
  from: string;
}

const messageRepo = new Repository<Message>();

messageRepo.add({
  id: "m1",
  text: "Hello!",
  to: "+1234567890",
  from: "+9876543210",
  createdAt: Date.now(),
  updatedAt: Date.now()
});

messageRepo.add({
  id: "m2",
  text: "How are you?",
  to: "+1234567890",
  from: "+9876543210",
  createdAt: Date.now() - 1000000,
  updatedAt: Date.now()
});

console.log("All messages:", messageRepo.getAll().length);
console.log("Recent messages:", messageRepo.findRecent(1).length);

const updated2 = messageRepo.update("m1", { text: "Hello World!" });
console.log("Updated message:", updated2);

// ================================================================
// Pattern 6: Extends with Type Parameters
// ================================================================

console.log("\n--- Pattern 6: Nested Generics ---\n");

// T must be array, U is the element type that must have 'id'
function extractIds<T extends U[], U extends { id: string }>(items: T): string[] {
  return items.map(item => item.id);
}

const userIds = extractIds(users);
const productIds = extractIds(products);

console.log("User IDs:", userIds);
console.log("Product IDs:", productIds);

// ================================================================
// Pattern 7: Conditional Methods Based on Constraint
// ================================================================

console.log("\n--- Pattern 7: Smart Defaults ---\n");

interface HasDefault {
  getDefault(): this;
}

function getOrDefault<T extends HasDefault>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    // TypeScript knows T has getDefault method!
    const defaultInstance = Object.create(Object.getPrototypeOf(value || {}));
    return defaultInstance.getDefault();
  }
  return value;
}

// ================================================================
// Pattern 8: Builder Pattern with Constraints
// ================================================================

console.log("\n--- Pattern 8: Builder Pattern ---\n");

interface Buildable {
  build(): any;
}

class EntityBuilder<T extends BaseEntity> implements Buildable {
  private entity: Partial<T> = {};

  setId(id: string): this {
    this.entity.id = id;
    return this;
  }

  setTimestamps(): this {
    const now = Date.now();
    this.entity.createdAt = now;
    this.entity.updatedAt = now;
    return this;
  }

  build(): T {
    if (!this.entity.id) {
      throw new Error("ID is required");
    }
    if (!this.entity.createdAt) {
      this.setTimestamps();
    }
    return this.entity as T;
  }
}

class MessageBuilder extends EntityBuilder<Message> {
  setText(text: string): this {
    (this as any).entity.text = text;
    return this;
  }

  setTo(to: string): this {
    (this as any).entity.to = to;
    return this;
  }

  setFrom(from: string): this {
    (this as any).entity.from = from;
    return this;
  }
}

const newMessage = new MessageBuilder()
  .setId("m3")
  .setText("Built message")
  .setTo("+1111111111")
  .setFrom("+2222222222")
  .setTimestamps()
  .build();

console.log("Built message:", newMessage);

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ Interface constraints define required shape");
console.log("✓ T can have MORE properties than constraint");
console.log("✓ Use & for multiple interface constraints");
console.log("✓ Method constraints enable behavior requirements");
console.log("✓ Perfect for repository/service patterns");
console.log("✓ Enables reusable, type-safe code\n");

export {
  HasId,
  Entity,
  Comparable,
  BaseEntity,
  Repository,
  findById,
  updateTimestamp,
  isNew,
  max,
  min,
  sort
};
