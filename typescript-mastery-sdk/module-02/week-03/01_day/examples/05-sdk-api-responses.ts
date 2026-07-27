// Example 05: SDK API Responses with Generics
// Real-world WhatsApp SDK example showing generics in action

console.log("=== SDK API Responses - Real Application ===\n");

// ================================================================
// Base Types & Interfaces
// ================================================================

// Generic API Response wrapper
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

// Generic API Error
interface APIError {
  code: string;
  message: string;
  details?: Record<string, any>;
}

// Generic Result type (Success or Error)
type APIResult<T> = APIResponse<T> | APIError;

// Helper to check if result is error
function isAPIError(result: APIResult<any>): result is APIError {
  return 'code' in result;
}

// ================================================================
// Domain Types
// ================================================================

interface User {
  id: string;
  name: string;
  phone: string;
  createdAt: number;
}

interface Message {
  id: string;
  to: string;
  from: string;
  text: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  timestamp: number;
}

interface Media {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  size: number;
}

interface SendMessageRequest {
  to: string;
  text: string;
}

interface UploadMediaRequest {
  type: Media['type'];
  url: string;
}

// ================================================================
// Generic HTTP Client
// ================================================================

console.log("--- Generic HTTP Client ---\n");

class HTTPClient {
  constructor(private baseURL: string, private apiKey: string) {}

  async get<T>(endpoint: string): Promise<APIResponse<T>> {
    console.log(`GET ${this.baseURL}${endpoint}`);

    // Mock implementation
    return {
      data: {} as T, // In real app, this would be actual API response
      status: 200,
      message: 'Success',
      timestamp: Date.now()
    };
  }

  async post<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    console.log(`POST ${this.baseURL}${endpoint}`, data);

    // Mock implementation
    return {
      data: {} as TResponse,
      status: 201,
      message: 'Created',
      timestamp: Date.now()
    };
  }

  async put<TRequest, TResponse>(
    endpoint: string,
    data: TRequest
  ): Promise<APIResponse<TResponse>> {
    console.log(`PUT ${this.baseURL}${endpoint}`, data);

    return {
      data: {} as TResponse,
      status: 200,
      message: 'Updated',
      timestamp: Date.now()
    };
  }

  async delete<T>(endpoint: string): Promise<APIResponse<T>> {
    console.log(`DELETE ${this.baseURL}${endpoint}`);

    return {
      data: {} as T,
      status: 200,
      message: 'Deleted',
      timestamp: Date.now()
    };
  }
}

// ================================================================
// Generic Base Service
// ================================================================

console.log("--- Generic Base Service ---\n");

abstract class BaseService<T> {
  constructor(
    protected client: HTTPClient,
    protected basePath: string
  ) {}

  async getById(id: string): Promise<APIResponse<T>> {
    return this.client.get<T>(`${this.basePath}/${id}`);
  }

  async getAll(): Promise<APIResponse<T[]>> {
    return this.client.get<T[]>(this.basePath);
  }

  async create(data: Partial<T>): Promise<APIResponse<T>> {
    return this.client.post<Partial<T>, T>(this.basePath, data);
  }

  async update(id: string, data: Partial<T>): Promise<APIResponse<T>> {
    return this.client.put<Partial<T>, T>(
      `${this.basePath}/${id}`,
      data
    );
  }

  async delete(id: string): Promise<APIResponse<void>> {
    return this.client.delete<void>(`${this.basePath}/${id}`);
  }
}

// ================================================================
// Specific Services Extending Base
// ================================================================

console.log("--- Specific Services ---\n");

// Message Service
class MessageService extends BaseService<Message> {
  constructor(client: HTTPClient) {
    super(client, '/messages');
  }

  // Message-specific method
  async send(request: SendMessageRequest): Promise<APIResponse<Message>> {
    console.log('  MessageService.send:', request);

    // Mock response
    const message: Message = {
      id: `msg_${Date.now()}`,
      to: request.to,
      from: '+1234567890', // SDK user's number
      text: request.text,
      status: 'sent',
      timestamp: Date.now()
    };

    return {
      data: message,
      status: 201,
      message: 'Message sent successfully',
      timestamp: Date.now()
    };
  }

  async getStatus(messageId: string): Promise<APIResponse<Message['status']>> {
    return this.client.get<Message['status']>(`${this.basePath}/${messageId}/status`);
  }
}

// User Service
class UserService extends BaseService<User> {
  constructor(client: HTTPClient) {
    super(client, '/users');
  }

  // User-specific method
  async getByPhone(phone: string): Promise<APIResponse<User | null>> {
    console.log('  UserService.getByPhone:', phone);

    // Mock response
    const user: User = {
      id: 'user_1',
      name: 'Ali',
      phone,
      createdAt: Date.now()
    };

    return {
      data: user,
      status: 200,
      message: 'User found',
      timestamp: Date.now()
    };
  }
}

// Media Service
class MediaService extends BaseService<Media> {
  constructor(client: HTTPClient) {
    super(client, '/media');
  }

  // Media-specific method
  async upload(request: UploadMediaRequest): Promise<APIResponse<Media>> {
    console.log('  MediaService.upload:', request);

    // Mock response
    const media: Media = {
      id: `media_${Date.now()}`,
      type: request.type,
      url: request.url,
      size: 1024 * 1024 // 1MB
    };

    return this.client.post<UploadMediaRequest, Media>(
      `${this.basePath}/upload`,
      request
    );
  }
}

// ================================================================
// Main SDK Client
// ================================================================

console.log("--- WhatsApp SDK Client ---\n");

class WhatsAppSDK {
  private httpClient: HTTPClient;

  public readonly messages: MessageService;
  public readonly users: UserService;
  public readonly media: MediaService;

  constructor(config: { apiKey: string; baseURL?: string }) {
    this.httpClient = new HTTPClient(
      config.baseURL || 'https://api.whatsapp.com',
      config.apiKey
    );

    this.messages = new MessageService(this.httpClient);
    this.users = new UserService(this.httpClient);
    this.media = new MediaService(this.httpClient);
  }
}

// ================================================================
// Usage Examples
// ================================================================

console.log("--- Usage Examples ---\n");

async function demonstrateSDK() {
  const sdk = new WhatsAppSDK({
    apiKey: 'test-api-key-12345'
  });

  console.log("1. Send a message:");
  const messageResponse = await sdk.messages.send({
    to: '+1234567890',
    text: 'Hello from TypeScript SDK!'
  });
  console.log('   Response:', messageResponse.data);
  console.log('   Type of response.data:', 'Message');

  console.log("\n2. Get user by phone:");
  const userResponse = await sdk.users.getByPhone('+1234567890');
  console.log('   Response:', userResponse.data);
  console.log('   Type of response.data:', 'User | null');

  console.log("\n3. Upload media:");
  const mediaResponse = await sdk.media.upload({
    type: 'image',
    url: 'https://example.com/image.jpg'
  });
  console.log('   Response:', mediaResponse);
  console.log('   Type of response.data:', 'Media');

  console.log("\n4. Get all messages:");
  const messagesResponse = await sdk.messages.getAll();
  console.log('   Response status:', messagesResponse.status);
  console.log('   Type of response.data:', 'Message[]');

  console.log("\n5. Get message by ID:");
  const singleMessageResponse = await sdk.messages.getById('msg_123');
  console.log('   Response status:', singleMessageResponse.status);
  console.log('   Type of response.data:', 'Message');
}

demonstrateSDK();

// ================================================================
// Benefits Demonstrated
// ================================================================

console.log("\n=== Benefits of Generics in SDK ===");
console.log("\n1. Type Safety:");
console.log("   ✓ response.data has correct type");
console.log("   ✓ No casting needed");
console.log("   ✓ IDE autocomplete works");

console.log("\n2. Code Reusability:");
console.log("   ✓ BaseService works for ANY resource");
console.log("   ✓ HTTPClient works for ANY request/response");
console.log("   ✓ No code duplication");

console.log("\n3. Maintainability:");
console.log("   ✓ Change once in BaseService");
console.log("   ✓ All services benefit");
console.log("   ✓ Easy to add new services");

console.log("\n4. Developer Experience:");
console.log("   ✓ Clear API");
console.log("   ✓ Type inference works");
console.log("   ✓ Errors caught at compile time");

// ================================================================
// Comparison: Without Generics
// ================================================================

console.log("\n=== Without Generics (BAD) ===\n");

// ❌ Would need separate service for each type:
class MessageServiceWithoutGenerics {
  async getById(id: string): Promise<APIResponse<Message>> { return {} as any; }
  async getAll(): Promise<APIResponse<Message[]>> { return {} as any; }
  async create(data: Partial<Message>): Promise<APIResponse<Message>> { return {} as any; }
  // ... duplicate all methods
}

class UserServiceWithoutGenerics {
  async getById(id: string): Promise<APIResponse<User>> { return {} as any; }
  async getAll(): Promise<APIResponse<User[]>> { return {} as any; }
  async create(data: Partial<User>): Promise<APIResponse<User>> { return {} as any; }
  // ... duplicate all methods AGAIN
}

class MediaServiceWithoutGenerics {
  async getById(id: string): Promise<APIResponse<Media>> { return {} as any; }
  async getAll(): Promise<APIResponse<Media[]>> { return {} as any; }
  async create(data: Partial<Media>): Promise<APIResponse<Media>> { return {} as any; }
  // ... duplicate all methods YET AGAIN
}

console.log("❌ Duplicated code across 3 services");
console.log("❌ Bug fix needs 3 updates");
console.log("❌ New service = copy-paste everything");
console.log("❌ Maintenance nightmare!");

console.log("\n=== With Generics (GOOD) ===\n");
console.log("✅ ONE BaseService<T>");
console.log("✅ Bug fix = one update");
console.log("✅ New service = extend BaseService");
console.log("✅ Maintainable and scalable!");

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ Generics eliminate code duplication in SDKs");
console.log("✓ BaseService<T> pattern is industry standard");
console.log("✓ Generic HTTP client handles any request/response");
console.log("✓ Full type safety from API to user code");
console.log("✓ Easy to extend with new resources");
console.log("✓ This is HOW professional SDKs are built!\n");

export {
  APIResponse,
  APIError,
  APIResult,
  HTTPClient,
  BaseService,
  MessageService,
  UserService,
  MediaService,
  WhatsAppSDK
};
