// Example 4: Intersection Types
// Combining multiple types into one

console.log("=== Basic Intersection ===");

interface Person {
  name: string;
  age: number;
}

interface Employee {
  employeeId: string;
  department: string;
}

// Has ALL properties from both types
type Staff = Person & Employee;

let staff: Staff = {
  name: "Ali",
  age: 25,
  employeeId: "EMP001",
  department: "Engineering"
};

console.log("Staff:", staff);

console.log("\n=== Mixins Pattern ===");

interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Identifiable {
  id: string;
}

interface Taggable {
  tags: string[];
}

// Combine multiple concerns
type Entity = Timestamped & Identifiable & Taggable;

interface Article extends Entity {
  title: string;
  content: string;
}

let article: Article = {
  id: "article_123",
  createdAt: Date.now(),
  updatedAt: Date.now(),
  tags: ["typescript", "tutorial"],
  title: "TypeScript Guide",
  content: "Learn TypeScript..."
};

console.log("Article:", article);

console.log("\n=== SDK Message Pattern ===");

interface BaseMessage {
  to: string;
}

interface WithMetadata {
  metadata: {
    source: string;
    priority: "low" | "normal" | "high";
  };
}

interface WithRetry {
  retryCount: number;
  maxRetries: number;
}

type TrackedMessage = BaseMessage & WithMetadata & WithRetry;

let message: TrackedMessage = {
  to: "+923001234567",
  metadata: {
    source: "web",
    priority: "high"
  },
  retryCount: 0,
  maxRetries: 3
};

console.log("Tracked message:", message);

console.log("\n=== Intersection with Type Aliases ===");

type Name = {
  firstName: string;
  lastName: string;
};

type Contact = {
  email: string;
  phone: string;
};

type User = Name & Contact & {
  userId: string;
  isActive: boolean;
};

let user: User = {
  firstName: "Ali",
  lastName: "Khan",
  email: "ali@test.com",
  phone: "+923001234567",
  userId: "user_123",
  isActive: true
};

console.log("User:", user);

console.log("\n=== Intersection vs Extension ===");

// Using intersection
type PersonWithEmail1 = Person & { email: string };

// Using interface extension
interface PersonWithEmail2 extends Person {
  email: string;
}

// Both are equivalent!
let person1: PersonWithEmail1 = {
  name: "Ahmed",
  age: 30,
  email: "ahmed@test.com"
};

let person2: PersonWithEmail2 = {
  name: "Hassan",
  age: 28,
  email: "hassan@test.com"
};

console.log("Using intersection:", person1);
console.log("Using extension:", person2);

console.log("\n=== Intersection with Conflicts ===");

type A = {
  value: string;
  count: number;
};

type B = {
  value: string; // Same type - OK
  total: number;
};

type Combined = A & B;

let combined: Combined = {
  value: "hello",
  count: 5,
  total: 10
};

console.log("Combined:", combined);

// If types conflict (different types for same property),
// the intersection becomes 'never' - impossible to satisfy!

console.log("\n=== SDK Config Pattern ===");

interface BaseConfig {
  apiKey: string;
  phoneNumberId: string;
}

interface LoggingConfig {
  logging: {
    enabled: boolean;
    level: "debug" | "info" | "warn" | "error";
  };
}

interface RetryConfig {
  retry: {
    enabled: boolean;
    maxAttempts: number;
    backoffMs: number;
  };
}

type FullConfig = BaseConfig & LoggingConfig & RetryConfig;

let config: FullConfig = {
  apiKey: "key_123",
  phoneNumberId: "phone_456",
  logging: {
    enabled: true,
    level: "info"
  },
  retry: {
    enabled: true,
    maxAttempts: 3,
    backoffMs: 1000
  }
};

console.log("Full config:", config);

console.log("\n=== Practical Use: Merge Defaults ===");

type DefaultConfig = {
  timeout: number;
  retries: number;
};

type UserConfig = {
  apiKey: string;
  phoneNumberId: string;
};

function createConfig(
  userConfig: UserConfig,
  defaults: DefaultConfig
): UserConfig & DefaultConfig {
  return { ...defaults, ...userConfig };
}

let finalConfig = createConfig(
  { apiKey: "key", phoneNumberId: "phone" },
  { timeout: 30000, retries: 3 }
);

console.log("Final config:", finalConfig);

console.log("\n✅ Example 4 complete!");
