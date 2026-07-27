/**
 * Example 3: Layered Architecture & Separation of Concerns
 * Understanding responsibility layers in SDK
 */

// ============================================
// THE CONCEPT: Layered Architecture
// ============================================

/**
 * Think of a building:
 * - Foundation (utilities, types)
 * - Ground floor (API/HTTP layer)
 * - Upper floors (services)
 * - Roof (client/entry point)
 *
 * Each layer can use layers below, but NOT above!
 */

/*
┌─────────────────────────────────┐
│   CLIENT LAYER                  │  ← Entry point (top)
│   WhatsAppClient                │
├─────────────────────────────────┤
│   SERVICE LAYER                 │  ← Business logic
│   MessageService, MediaService  │
├─────────────────────────────────┤
│   API LAYER                     │  ← HTTP communication
│   HttpClient, Endpoints         │
├─────────────────────────────────┤
│   UTILITY LAYER                 │  ← Shared helpers (foundation)
│   validators, formatters        │
└─────────────────────────────────┘
*/

// ============================================
// LAYER 1: UTILITY LAYER (Foundation)
// ============================================

/**
 * Purpose: Shared, reusable utilities
 * Depends on: Nothing
 * Used by: Everyone
 */

// src/utils/validators.ts
export function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

export function validateMessage(text: string): boolean {
  return text.length > 0 && text.length <= 4096;
}

// src/utils/formatters.ts
export function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '');
}

/**
 * Characteristics:
 * ✅ Pure functions (no side effects)
 * ✅ No external dependencies
 * ✅ Highly reusable
 * ✅ Easy to test
 */

// ============================================
// LAYER 2: API LAYER (HTTP)
// ============================================

/**
 * Purpose: HTTP communication with WhatsApp API
 * Depends on: Utils
 * Used by: Services
 */

// src/api/http/HttpClient.ts
export class HttpClient {
  constructor(private config: { apiKey: string; baseUrl: string }) {}

  async get<T>(endpoint: string): Promise<T> {
    // HTTP GET implementation
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${this.config.apiKey}` }
    });
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    // HTTP POST implementation
    const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

// src/api/endpoints/messages.ts
export class MessageEndpoints {
  constructor(private http: HttpClient) {}

  async send(payload: { to: string; text: string }): Promise<any> {
    return this.http.post('/v1/messages', payload);
  }

  async get(messageId: string): Promise<any> {
    return this.http.get(`/v1/messages/${messageId}`);
  }
}

/**
 * Characteristics:
 * ✅ Knows HTTP details (fetch, headers, auth)
 * ✅ Doesn't know business logic
 * ✅ Can use utilities (like formatters)
 * ❌ Should NOT use services
 */

// ============================================
// LAYER 3: SERVICE LAYER (Business Logic)
// ============================================

/**
 * Purpose: Business logic and domain rules
 * Depends on: API layer, Utils
 * Used by: Client
 */

// src/services/messages/MessageService.ts
import { MessageEndpoints } from '../../api/endpoints/messages';
import { validatePhone, validateMessage } from '../../utils/validators';
import type { Message, SendMessageRequest } from './types';

export class MessageService {
  constructor(private api: MessageEndpoints) {}

  async send(request: SendMessageRequest): Promise<Message> {
    // 1. Business validation (service responsibility)
    if (!validatePhone(request.to)) {
      throw new ValidationError('Invalid phone number');
    }

    if (!validateMessage(request.text)) {
      throw new ValidationError('Invalid message text');
    }

    // 2. Call API layer (delegates HTTP details)
    const response = await this.api.send({
      to: request.to,
      text: request.text
    });

    // 3. Transform API response to domain model
    return {
      id: response.message_id,       // API uses snake_case
      to: response.recipient,
      from: response.sender,
      text: response.content,
      timestamp: response.created_at
    };
  }

  async delete(messageId: string): Promise<void> {
    // Business logic: Check permissions, log deletion, etc.
    await this.api.delete(messageId);
  }
}

/**
 * Characteristics:
 * ✅ Contains business rules
 * ✅ Validates input
 * ✅ Transforms data
 * ✅ Uses API layer (doesn't know HTTP details)
 * ❌ Should NOT do HTTP directly
 */

// ============================================
// LAYER 4: CLIENT LAYER (Entry Point)
// ============================================

/**
 * Purpose: User-facing entry point
 * Depends on: Services
 * Used by: End users
 */

// src/client/WhatsAppClient.ts
import { MessageService } from '../services/messages/MessageService';
import { MediaService } from '../services/media/MediaService';
import { HttpClient } from '../api/http/HttpClient';
import { MessageEndpoints } from '../api/endpoints/messages';

export class WhatsAppClient {
  public readonly messages: MessageService;
  public readonly media: MediaService;

  constructor(config: { apiKey: string }) {
    // Wire up dependencies (Dependency Injection)
    const http = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: 'https://graph.facebook.com'
    });

    const messageEndpoints = new MessageEndpoints(http);
    this.messages = new MessageService(messageEndpoints);

    // Similar for media
    this.media = new MediaService(/* ... */);
  }
}

/**
 * Characteristics:
 * ✅ Wires up all dependencies
 * ✅ Exposes services to users
 * ✅ Simple, focused on initialization
 * ❌ Shouldn't contain business logic
 */

// ============================================
// DEPENDENCY FLOW (Bottom to Top)
// ============================================

/**
 * User code:
 */
const client = new WhatsAppClient({ apiKey: 'xxx' });

// User calls service
await client.messages.send({ to: '+123', text: 'Hello' });

/**
 * What happens internally:
 *
 * 1. CLIENT LAYER: WhatsAppClient receives call
 *    ↓
 * 2. SERVICE LAYER: MessageService.send()
 *    - Validates with utils (validatePhone)
 *    - Calls API layer
 *    ↓
 * 3. API LAYER: MessageEndpoints.send()
 *    - Makes HTTP POST
 *    - Returns response
 *    ↓
 * 4. SERVICE LAYER: Transforms response
 *    - API response → Domain model (Message)
 *    ↓
 * 5. CLIENT LAYER: Returns to user
 */

// ============================================
// WHY LAYERS MATTER
// ============================================

/**
 * 1. SEPARATION OF CONCERNS
 */

// ❌ WITHOUT layers (everything mixed):
class MessyMessageService {
  async send(to: string, text: string) {
    // Validation
    if (!to.match(/^\+\d{10,15}$/)) throw new Error('Invalid');

    // HTTP details mixed with business logic
    const response = await fetch('https://api.com/messages', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer xxx' },
      body: JSON.stringify({ to, text })
    });

    // More logic...
  }
}

// ✅ WITH layers (clear responsibilities):
class MessageService {
  async send(request: SendMessageRequest) {
    // Uses validator (utility layer)
    validatePhone(request.to);

    // Uses API (API layer)
    const response = await this.api.send(request);

    // Business logic only
    return this.transformResponse(response);
  }
}

/**
 * 2. EASY TO TEST
 */

// ❌ Can't test service without HTTP
// ✅ Can mock API layer, test business logic in isolation

/**
 * 3. EASY TO SWAP IMPLEMENTATIONS
 */

// Want to switch from fetch to axios?
// Only change HttpClient (API layer)
// Services don't need to change!

/**
 * 4. CLEAR DEPENDENCIES
 */

// Service depends on API layer (clear)
// Not mixed with HTTP details

// ============================================
// ANTI-PATTERNS (Wrong Direction)
// ============================================

/**
 * ❌ WRONG: API layer depends on Service
 */
class BadHttpClient {
  constructor(private messageService: MessageService) {}  // WRONG DIRECTION!

  async post(url: string) {
    // Why does HTTP know about MessageService?
    // This breaks layering!
  }
}

/**
 * ❌ WRONG: Utility depends on Service
 */
function badValidator(message: string, service: MessageService) {  // WRONG!
  // Validator shouldn't know about services
  // Utilities are foundation layer!
}

/**
 * ❌ WRONG: Service does HTTP directly
 */
class BadMessageService {
  async send(to: string, text: string) {
    // Services shouldn't know HTTP details!
    const response = await fetch('https://api.com', {
      headers: { 'Authorization': 'Bearer xxx' }  // WRONG LAYER!
    });
  }
}

/**
 * ✅ RIGHT: Dependencies flow downward
 */
/*
Client     → depends on Services
Services   → depends on API
API        → depends on Utils
Utils      → depends on nothing
*/

// ============================================
// TESTING WITH LAYERS
// ============================================

/**
 * Layer isolation = Easy testing
 */

// Test utilities (no dependencies)
describe('validatePhone', () => {
  it('validates phone numbers', () => {
    expect(validatePhone('+1234567890')).toBe(true);
  });
});

// Test services (mock API layer)
describe('MessageService', () => {
  it('sends message', async () => {
    const mockApi = {
      send: jest.fn().mockResolvedValue({ message_id: '123' })
    };

    const service = new MessageService(mockApi as any);
    await service.send({ to: '+123', text: 'Hello' });

    expect(mockApi.send).toHaveBeenCalled();
  });
});

// Test API layer (mock HTTP)
describe('HttpClient', () => {
  it('makes POST request', async () => {
    // Mock fetch
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ success: true })
    });

    const http = new HttpClient({ apiKey: 'xxx', baseUrl: 'http://test' });
    await http.post('/test', { data: 'value' });

    expect(global.fetch).toHaveBeenCalled();
  });
});

// ============================================
// KEY TAKEAWAYS
// ============================================

/**
 * ✅ Layers = Clear responsibilities
 * ✅ Dependencies flow downward (never upward)
 * ✅ Each layer can be tested in isolation
 * ✅ Easy to swap implementations
 * ✅ Forces good architecture
 *
 * LAYERS:
 * 1. Utility (foundation) - Pure functions, no dependencies
 * 2. API (HTTP) - Technical communication layer
 * 3. Service (business) - Domain logic and rules
 * 4. Client (entry) - User-facing interface
 *
 * RULE: Upper layers use lower layers, NEVER reverse!
 */

export {};
