// Example 05: SDK with Constraints
// Real-world WhatsApp SDK using generic constraints

console.log("=== SDK with Generic Constraints ===\n");

// ================================================================
// Base Types with Constraints
// ================================================================

console.log("--- Base Entity Definition ---\n");

// All SDK entities must extend this
interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

// Helper to create entity with timestamps
function createEntity<T extends Omit<BaseEntity, 'createdAt' | 'updatedAt'>>(
  data: T
): T & BaseEntity {
  const now = Date.now();
  return {
    ...data,
    createdAt: now,
    updatedAt: now
  };
}

// Helper to update entity timestamp
function touchEntity<T extends BaseEntity>(entity: T): T {
  return {
    ...entity,
    updatedAt: Date.now()
  };
}

console.log("✓ Base entity helpers created");

// ================================================================
// Generic Repository with Constraints
// ================================================================

console.log("\n--- Generic Repository ---\n");

class Repository<T extends BaseEntity> {
  private items: Map<string, T> = new Map();

  add(entity: T): void {
    this.items.set(entity.id, entity);
  }

  getById(id: string): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  update(id: string, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | null {
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

  findBy<K extends keyof T>(key: K, value: T[K]): T[] {
    return this.getAll().filter(item => item[key] === value);
  }

  sortBy<K extends keyof T>(key: K, direction: 'asc' | 'desc' = 'asc'): T[] {
    return [...this.getAll()].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  count(): number {
    return this.items.size;
  }

  clear(): void {
    this.items.clear();
  }
}

console.log("✓ Generic repository created");

// ================================================================
// Domain Entities
// ================================================================

console.log("\n--- Domain Entities ---\n");

interface Message extends BaseEntity {
  to: string;
  from: string;
  text: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
}

interface User extends BaseEntity {
  phone: string;
  name: string;
  lastSeen: number;
  isActive: boolean;
}

interface Media extends BaseEntity {
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  size: number;
  mimeType: string;
}

console.log("✓ Domain entities defined");

// ================================================================
// Service Layer with Constraints
// ================================================================

console.log("\n--- Service Layer ---\n");

abstract class BaseService<T extends BaseEntity> {
  protected repository: Repository<T>;

  constructor() {
    this.repository = new Repository<T>();
  }

  async getById(id: string): Promise<T | undefined> {
    return this.repository.getById(id);
  }

  async getAll(): Promise<T[]> {
    return this.repository.getAll();
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async findBy<K extends keyof T>(key: K, value: T[K]): Promise<T[]> {
    return this.repository.findBy(key, value);
  }

  count(): number {
    return this.repository.count();
  }
}

// Message Service
class MessageService extends BaseService<Message> {
  async send(to: string, from: string, text: string): Promise<Message> {
    const message = createEntity<Omit<Message, 'createdAt' | 'updatedAt'>>({
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      to,
      from,
      text,
      status: 'sent'
    });

    this.repository.add(message);
    console.log(`  ✉️  Message sent to ${to}`);
    return message;
  }

  async markAsDelivered(messageId: string): Promise<Message | null> {
    return this.repository.update(messageId, { status: 'delivered' });
  }

  async markAsRead(messageId: string): Promise<Message | null> {
    return this.repository.update(messageId, { status: 'read' });
  }

  async getByPhone(phone: string): Promise<Message[]> {
    const toMessages = await this.findBy('to', phone);
    const fromMessages = await this.findBy('from', phone);
    return [...toMessages, ...fromMessages];
  }

  async getByStatus(status: Message['status']): Promise<Message[]> {
    return this.findBy('status', status);
  }
}

// User Service
class UserService extends BaseService<User> {
  async create(phone: string, name: string): Promise<User> {
    const user = createEntity<Omit<User, 'createdAt' | 'updatedAt'>>({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      phone,
      name,
      lastSeen: Date.now(),
      isActive: true
    });

    this.repository.add(user);
    console.log(`  👤 User created: ${name}`);
    return user;
  }

  async updateLastSeen(userId: string): Promise<User | null> {
    return this.repository.update(userId, { lastSeen: Date.now() });
  }

  async setActive(userId: string, isActive: boolean): Promise<User | null> {
    return this.repository.update(userId, { isActive });
  }

  async getByPhone(phone: string): Promise<User | undefined> {
    const users = await this.findBy('phone', phone);
    return users[0];
  }

  async getActiveUsers(): Promise<User[]> {
    return this.findBy('isActive', true);
  }

  async searchByName(query: string): Promise<User[]> {
    return this.repository.getAll().filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}

// Media Service
class MediaService extends BaseService<Media> {
  async upload(
    type: Media['type'],
    url: string,
    size: number,
    mimeType: string
  ): Promise<Media> {
    const media = createEntity<Omit<Media, 'createdAt' | 'updatedAt'>>({
      id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      url,
      size,
      mimeType
    });

    this.repository.add(media);
    console.log(`  📎 Media uploaded: ${type} (${size} bytes)`);
    return media;
  }

  async getByType(type: Media['type']): Promise<Media[]> {
    return this.findBy('type', type);
  }

  async getTotalSize(): Promise<number> {
    const allMedia = await this.getAll();
    return allMedia.reduce((total, media) => total + media.size, 0);
  }
}

console.log("✓ Services created");

// ================================================================
// Main SDK Client
// ================================================================

console.log("\n--- WhatsApp SDK Client ---\n");

class WhatsAppSDK {
  public readonly messages: MessageService;
  public readonly users: UserService;
  public readonly media: MediaService;

  constructor() {
    this.messages = new MessageService();
    this.users = new UserService();
    this.media = new MediaService();
  }

  // Get statistics
  getStats() {
    return {
      totalMessages: this.messages.count(),
      totalUsers: this.users.count(),
      totalMedia: this.media.count()
    };
  }
}

console.log("✓ SDK client initialized");

// ================================================================
// Usage Examples
// ================================================================

console.log("\n--- Usage Examples ---\n");

async function demonstrateSDK() {
  const sdk = new WhatsAppSDK();

  console.log("1️⃣  Creating users...");
  const user1 = await sdk.users.create("+1234567890", "Ali");
  const user2 = await sdk.users.create("+9876543210", "Sara");

  console.log("\n2️⃣  Sending messages...");
  const msg1 = await sdk.messages.send(user2.phone, user1.phone, "Hello Sara!");
  const msg2 = await sdk.messages.send(user1.phone, user2.phone, "Hi Ali!");

  console.log("\n3️⃣  Marking messages as read...");
  await sdk.messages.markAsDelivered(msg1.id);
  await sdk.messages.markAsRead(msg1.id);

  console.log("\n4️⃣  Uploading media...");
  await sdk.media.upload("image", "https://example.com/photo.jpg", 1024000, "image/jpeg");
  await sdk.media.upload("video", "https://example.com/video.mp4", 5120000, "video/mp4");

  console.log("\n5️⃣  Querying data...");
  const ali = await sdk.users.getByPhone("+1234567890");
  console.log("  Found user:", ali?.name);

  const aliMessages = await sdk.messages.getByPhone(user1.phone);
  console.log("  Ali's messages:", aliMessages.length);

  const images = await sdk.media.getByType("image");
  console.log("  Images uploaded:", images.length);

  const readMessages = await sdk.messages.getByStatus("read");
  console.log("  Read messages:", readMessages.length);

  const activeUsers = await sdk.users.getActiveUsers();
  console.log("  Active users:", activeUsers.length);

  console.log("\n6️⃣  Statistics:");
  const stats = sdk.getStats();
  console.log("  Total messages:", stats.totalMessages);
  console.log("  Total users:", stats.totalUsers);
  console.log("  Total media:", stats.totalMedia);
}

demonstrateSDK();

// ================================================================
// Benefits Demonstrated
// ================================================================

console.log("\n=== Benefits of Constraints ===\n");

console.log("✅ Type Safety:");
console.log("   - Can't add entity without required fields");
console.log("   - Can't update 'id' or 'createdAt' (prevented by Omit)");
console.log("   - Property access is type-checked");

console.log("\n✅ Code Reusability:");
console.log("   - One Repository<T> works for all entities");
console.log("   - BaseService<T> provides common functionality");
console.log("   - No code duplication");

console.log("\n✅ Maintainability:");
console.log("   - Add new entity = extend BaseEntity + create service");
console.log("   - Change to BaseEntity = affects all entities");
console.log("   - Consistent patterns across SDK");

console.log("\n✅ Developer Experience:");
console.log("   - IDE autocomplete for all methods");
console.log("   - Compile-time error checking");
console.log("   - Clear API surface");

console.log("\n✅ Flexibility with Safety:");
console.log("   - findBy<K> works with any entity property");
console.log("   - sortBy<K> type-checks property types");
console.log("   - Update prevents modifying immutable fields");

// ================================================================
// Comparison: Without Constraints
// ================================================================

console.log("\n=== Without Constraints (BAD) ===\n");

console.log("❌ Would need separate repository for each entity:");
console.log("   - MessageRepository with duplicated code");
console.log("   - UserRepository with duplicated code");
console.log("   - MediaRepository with duplicated code");

console.log("\n❌ No type safety:");
console.log("   - Could accidentally modify 'id' or 'createdAt'");
console.log("   - findBy('invalidKey', value) would compile");
console.log("   - Type errors only at runtime");

console.log("\n❌ Maintenance nightmare:");
console.log("   - Bug fix needs update in 3+ places");
console.log("   - Inconsistent implementations");
console.log("   - Hard to add new entities");

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ BaseEntity constraint ensures all entities have required fields");
console.log("✓ Repository<T extends BaseEntity> is fully reusable");
console.log("✓ keyof constraints enable type-safe property operations");
console.log("✓ Omit in constraints prevents unwanted modifications");
console.log("✓ Service layer builds on constrained repository");
console.log("✓ This is HOW professional SDKs are built!");
console.log("✓ Constraints = Type safety + Reusability + Maintainability\n");

export {
  BaseEntity,
  createEntity,
  touchEntity,
  Repository,
  BaseService,
  MessageService,
  UserService,
  MediaService,
  WhatsAppSDK
};
