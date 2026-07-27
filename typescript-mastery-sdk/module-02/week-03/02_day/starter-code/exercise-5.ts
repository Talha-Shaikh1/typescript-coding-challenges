// Exercise 5: SDK Application
// Apply constraints in real WhatsApp SDK

console.log("=== Exercise 5: SDK Application ===\n");

// ================================================================
// Task 1: Base Entity Interface
// ================================================================

console.log("--- Task 1: Base Entity Interface ---");

// TODO: Define BaseEntity interface
// Must have: id (string), createdAt (number), updatedAt (number)
interface BaseEntity {
  // TODO: Add properties
}

// TODO: Helper to create new entity with timestamps
function createEntity<T /* TODO: add constraint */>(
  data: /* TODO: Omit timestamps */
): /* TODO: return type with timestamps */ {
  // TODO: Generate ID and timestamps
  // Return complete entity
}

// TODO: Helper to update entity timestamp
function updateEntity<T /* TODO: add constraint */>(
  existing: T,
  updates: /* TODO: Partial, exclude id and createdAt */
): T {
  // TODO: Merge updates and update timestamp
  // Don't allow id or createdAt to change
}

// ================================================================
// Task 2: Constrained Repository
// ================================================================

console.log("\n--- Task 2: Constrained Repository ---");

// TODO: Add constraint - T must extend BaseEntity
class Repository<T /* TODO */> {
  private items: Map<string, T> = new Map();

  add(entity: T): void {
    // TODO: Add to map
  }

  getById(id: string): T | undefined {
    // TODO: Get by ID
  }

  update(id: string, updates: Partial<T>): T | null {
    // TODO: Get existing entity
    // TODO: Update with updateEntity helper
    // TODO: Save and return
  }

  delete(id: string): boolean {
    // TODO: Delete and return success
  }

  // TODO: Add constraint - K must be a key of T
  findBy<K /* TODO */>(key: K, value: /* TODO */): T[] {
    // TODO: Find all entities where entity[key] === value
  }

  getAll(): T[] {
    // TODO: Return all entities
  }
}

// ================================================================
// Task 3: Domain Entities
// ================================================================

console.log("\n--- Task 3: Domain Entities ---");

// TODO: Define Message interface extending BaseEntity
interface Message /* TODO: extends BaseEntity */ {
  // TODO: Add properties: to, from, text, status
}

// TODO: Define User interface extending BaseEntity
interface User /* TODO: extends BaseEntity */ {
  // TODO: Add properties: phone, name, lastSeen
}

// TODO: Define Media interface extending BaseEntity
interface Media /* TODO: extends BaseEntity */ {
  // TODO: Add properties: type, url, size
}

// ================================================================
// Task 4: Service Layer
// ================================================================

console.log("\n--- Task 4: Service Layer ---");

class MessageService {
  private repo = new Repository<Message>();

  async send(to: string, text: string): Promise<Message> {
    // TODO: Create message entity using createEntity
    // TODO: Add to repository
    // TODO: Return message
  }

  async getByPhone(phone: string): Promise<Message[]> {
    // TODO: Find all messages to/from phone
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    // TODO: Update status to 'read'
  }
}

class UserService {
  private repo = new Repository<User>();

  async create(phone: string, name: string): Promise<User> {
    // TODO: Create user entity
    // TODO: Add to repository
  }

  async updateLastSeen(userId: string): Promise<User | null> {
    // TODO: Update lastSeen to now
  }

  async searchByName(name: string): Promise<User[]> {
    // TODO: Find users by name (partial match)
  }
}

// ================================================================
// Task 5: Integration Test
// ================================================================

console.log("\n--- Task 5: Integration Test ---");

async function testSDK() {
  const messageService = new MessageService();
  const userService = new UserService();

  // TODO: Create user
  // const user = await userService.create("+1234567890", "Ali");
  // console.log("User created:", user);

  // TODO: Send message
  // const message = await messageService.send("+9876543210", "Hello!");
  // console.log("Message sent:", message);

  // TODO: Mark as read
  // const updated = await messageService.markAsRead(message.id);
  // console.log("Message marked as read:", updated);

  // TODO: Find messages
  // const messages = await messageService.getByPhone("+9876543210");
  // console.log("Messages found:", messages.length);
}

// Uncomment to run test:
// testSDK();

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] BaseEntity constraint works");
console.log("[ ] Repository is type-safe");
console.log("[ ] Services use constrained repository");
console.log("[ ] All CRUD operations work");
console.log("[ ] keyof constraints for findBy");
console.log("[ ] Integration test passes");
