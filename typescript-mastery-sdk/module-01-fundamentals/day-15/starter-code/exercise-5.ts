// Exercise 5: SDK Application
// Complete the TODOs below to build a real SDK with generics

console.log("=== Exercise 5: SDK Application ===\n");

// ================================================================
// Step 1: Define Core Types
// ================================================================

// TODO: Define generic APIResponse interface
interface APIResponse<T> {
  // TODO: Add properties (data, status, message, timestamp)
}

interface HTTPConfig {
  baseURL: string;
  timeout: number;
  headers?: Record<string, string>;
}

// Domain types
interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  timestamp: number;
}

interface User {
  id: string;
  name: string;
  phone: string;
}

interface SendMessageRequest {
  to: string;
  text: string;
}

// ================================================================
// Step 2: Generic HTTP Client
// ================================================================

console.log("--- Step 2: Generic HTTP Client ---");

class HTTPClient {
  constructor(private config: HTTPConfig) {}

  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    // TODO: Implement mock GET request
    // Return a mock APIResponse<T>
    console.log(`GET ${this.config.baseURL}${endpoint}`);

    // Hint: Return mock response like this:
    // return {
    //   data: {} as T,
    //   status: 200,
    //   message: 'Success',
    //   timestamp: Date.now()
    // };
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    // TODO: Implement mock POST request
    // Return a mock APIResponse<TResponse>
    console.log(`POST ${this.config.baseURL}${endpoint}`, data);
  }

  async put<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    // TODO: Implement mock PUT request
    console.log(`PUT ${this.config.baseURL}${endpoint}`, data);
  }

  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    // TODO: Implement mock DELETE request
    console.log(`DELETE ${this.config.baseURL}${endpoint}`);
  }
}

// ================================================================
// Step 3: Generic Base Service
// ================================================================

console.log("\n--- Step 3: Generic Base Service ---");

abstract class BaseService<T> {
  constructor(
    protected client: HTTPClient,
    protected basePath: string
  ) {}

  async getById(id: string): Promise<APIResponse<T>> {
    // TODO: Use this.client.get<T>() to fetch by id
    // Endpoint: `${this.basePath}/${id}`
  }

  async getAll(): Promise<APIResponse<T[]>> {
    // TODO: Use this.client.get<T[]>() to fetch all
    // Endpoint: `${this.basePath}`
  }

  async create(data: Partial<T>): Promise<APIResponse<T>> {
    // TODO: Use this.client.post<Partial<T>, T>() to create
    // Endpoint: `${this.basePath}`
  }

  async update(id: string, data: Partial<T>): Promise<APIResponse<T>> {
    // TODO: Use this.client.put<Partial<T>, T>() to update
    // Endpoint: `${this.basePath}/${id}`
  }

  async delete(id: string): Promise<APIResponse<void>> {
    // TODO: Use this.client.delete<void>() to delete
    // Endpoint: `${this.basePath}/${id}`
  }
}

// ================================================================
// Step 4: Specific Services
// ================================================================

console.log("\n--- Step 4: Specific Services ---");

// TODO: MessageService extending BaseService<Message>
class MessageService /* TODO: extends BaseService<Message> */ {
  constructor(client: HTTPClient) {
    // TODO: Call super with client and '/messages' path
  }

  // TODO: Add message-specific method
  async sendText(to: string, text: string): Promise<APIResponse<Message>> {
    // TODO: Create a SendMessageRequest and call this.create()
    // Or use this.client.post() directly
  }
}

// TODO: UserService extending BaseService<User>
class UserService /* TODO: extends BaseService<User> */ {
  constructor(client: HTTPClient) {
    // TODO: Call super with client and '/users' path
  }

  // TODO: Add user-specific method
  async getByPhone(phone: string): Promise<APIResponse<User | null>> {
    // TODO: Use this.client.get() with query parameter
    // Endpoint: `${this.basePath}/search?phone=${phone}`
  }
}

// ================================================================
// Step 5: Main SDK Client
// ================================================================

console.log("\n--- Step 5: Main SDK Client ---");

class WhatsAppSDK {
  private httpClient: HTTPClient;

  // TODO: Add public properties for services
  // public readonly messages: MessageService;
  // public readonly users: UserService;

  constructor(config: { apiKey: string; baseURL?: string }) {
    // TODO: Initialize httpClient with config

    // TODO: Initialize services with httpClient
  }
}

// ================================================================
// Step 6: Usage Test
// ================================================================

console.log("\n--- Step 6: Usage Test ---");

async function testSDK() {
  // TODO: Create SDK instance
  // const sdk = new WhatsAppSDK({ apiKey: 'test-key' });

  // TODO: Test sending a message
  // const messageResponse = await sdk.messages.sendText('+1234567890', 'Hello!');
  // console.log('Message sent:', messageResponse);

  // TODO: Test getting a user
  // const userResponse = await sdk.users.getByPhone('+1234567890');
  // console.log('User found:', userResponse);

  // TODO: Test getting all messages
  // const allMessages = await sdk.messages.getAll();
  // console.log('All messages:', allMessages);
}

// Uncomment to run test:
// testSDK();

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] HTTPClient generic methods work");
console.log("[ ] BaseService reusable for any type");
console.log("[ ] Specific services extend properly");
console.log("[ ] Full type safety maintained");
console.log("[ ] SDK integration works");
console.log("[ ] Test function runs successfully");
