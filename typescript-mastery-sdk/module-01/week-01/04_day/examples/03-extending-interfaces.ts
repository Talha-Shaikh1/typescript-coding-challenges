// Example 3: Extending Interfaces and Inheritance
// Building complex types through extension

console.log("=== Basic Extension ===");

interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
  salary: number;
}

let employee: Employee = {
  // From Person
  name: "Talha",
  age: 25,
  // From Employee
  employeeId: "EMP001",
  department: "Engineering",
  salary: 100000
};

console.log("Employee:", employee);

console.log("\n=== Multiple Extension ===");

interface Timestamped {
  createdAt: number;
  updatedAt: number;
}

interface Identifiable {
  id: string;
}

interface Message extends Timestamped, Identifiable {
  to: string;
  text: string;
  status: string;
}

let message: Message = {
  // From Identifiable
  id: "msg_123",
  // From Timestamped
  createdAt: Date.now(),
  updatedAt: Date.now(),
  // From Message
  to: "+923001234567",
  text: "Hello World",
  status: "sent"
};

console.log("Message:", message);

console.log("\n=== SDK Message Hierarchy ===");

// Base message interface
interface BaseMessage {
  to: string;
  type: string;
}

// Text message extends base
interface TextMessage extends BaseMessage {
  text: string;
  preview_url?: boolean;
}

// Media message extends base
interface MediaMessage extends BaseMessage {
  mediaId: string;
  caption?: string;
}

// Image message extends media message
interface ImageMessage extends MediaMessage {
  type: "image";
}

// Video message extends media message
interface VideoMessage extends MediaMessage {
  type: "video";
}

let textMsg: TextMessage = {
  to: "+923001234567",
  type: "text",
  text: "Hello from TypeScript",
  preview_url: false
};

let imageMsg: ImageMessage = {
  to: "+923001234567",
  type: "image",
  mediaId: "media_12345",
  caption: "Check this out!"
};

let videoMsg: VideoMessage = {
  to: "+923001234567",
  type: "video",
  mediaId: "media_67890",
  caption: "Watch this!"
};

console.log("Text message:", textMsg);
console.log("Image message:", imageMsg);
console.log("Video message:", videoMsg);

console.log("\n=== Overriding Properties ===");

interface Animal {
  name: string;
  age: number;
  sound: string;
}

// Can make properties more specific
interface Dog extends Animal {
  sound: "bark" | "woof"; // More specific than string
  breed: string;
}

let myDog: Dog = {
  name: "Max",
  age: 3,
  sound: "bark", // Must be "bark" or "woof"
  breed: "Labrador"
};

console.log("Dog:", myDog);

console.log("\n=== Real SDK Example ===");

// Base configuration
interface BaseConfig {
  apiKey: string;
  environment: "development" | "production";
}

// Development config extends base
interface DevelopmentConfig extends BaseConfig {
  environment: "development";
  debugMode: boolean;
  mockData?: boolean;
}

// Production config extends base
interface ProductionConfig extends BaseConfig {
  environment: "production";
  rateLimitPerSecond: number;
  enableLogging: boolean;
}

let devConfig: DevelopmentConfig = {
  apiKey: "dev_key_123",
  environment: "development",
  debugMode: true,
  mockData: true
};

let prodConfig: ProductionConfig = {
  apiKey: "prod_key_456",
  environment: "production",
  rateLimitPerSecond: 80,
  enableLogging: true
};

console.log("Dev config:", devConfig);
console.log("Prod config:", prodConfig);

console.log("\n=== Benefits of Extension ===");
console.log("✅ Code reuse: Don't repeat common properties");
console.log("✅ Hierarchy: Build complex types from simple ones");
console.log("✅ Maintainability: Change base affects all extensions");
console.log("✅ Type safety: All properties are checked");

console.log("\n✅ Example 3 complete!");
