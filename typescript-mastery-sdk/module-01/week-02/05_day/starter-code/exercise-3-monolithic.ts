/**
 * Exercise 3: Refactor Monolithic Code
 * Break this 400-line file into proper structure
 */

// ============================================
// MONOLITHIC CODE (Everything in one file)
// ============================================

// Types
interface Message {
  id: string;
  to: string;
  text: string;
  timestamp: number;
}

interface Media {
  id: string;
  url: string;
  type: 'image' | 'video' | 'audio';
}

interface ClientConfig {
  apiKey: string;
  apiUrl?: string;
}

// Errors
class APIError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = 'APIError';
  }
}

class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Utilities
function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

function validateMessage(text: string): boolean {
  return text.length > 0 && text.length <= 4096;
}

function formatPhone(phone: string): string {
  return phone.replace(/\s/g, '');
}

// HTTP Client
class HttpClient {
  constructor(private apiKey: string, private baseUrl: string) {}

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new APIError('Request failed', response.status);
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    return response.json();
  }
}

// Message Service
class MessageService {
  constructor(private http: HttpClient) {}

  async send(to: string, text: string): Promise<Message> {
    if (!validatePhone(to)) {
      throw new ValidationError('Invalid phone number', 'to');
    }

    if (!validateMessage(text)) {
      throw new ValidationError('Invalid message', 'text');
    }

    const formatted = formatPhone(to);

    const response = await this.http.post<any>('/v1/messages', {
      to: formatted,
      text
    });

    return {
      id: response.message_id,
      to: response.recipient,
      text: response.content,
      timestamp: response.created_at
    };
  }

  async get(messageId: string): Promise<Message> {
    return this.http.get<Message>(`/v1/messages/${messageId}`);
  }
}

// Media Service
class MediaService {
  constructor(private http: HttpClient) {}

  async upload(file: Buffer, type: 'image' | 'video' | 'audio'): Promise<Media> {
    const response = await this.http.post<any>('/v1/media', {
      file: file.toString('base64'),
      type
    });

    return {
      id: response.media_id,
      url: response.url,
      type: response.type
    };
  }
}

// Main Client
export class WhatsAppClient {
  public readonly messages: MessageService;
  public readonly media: MediaService;

  constructor(config: ClientConfig) {
    const http = new HttpClient(
      config.apiKey,
      config.apiUrl || 'https://graph.facebook.com'
    );

    this.messages = new MessageService(http);
    this.media = new MediaService(http);
  }
}

// ============================================
// YOUR TASK: Refactor this into proper structure
// ============================================

/**
 * STEP 1: Plan the structure
 *
 * Design the folder structure. For each folder, specify:
 * - Purpose
 * - What files go there
 * - Public or internal?
 *
 * Write your structure plan here:
 */

/*
src/
├── ??? /
│   └── ???.ts
├── ??? /
│   └── ???.ts
└── index.ts
*/

/**
 * STEP 2: Identify components
 *
 * List each class/function and where it should go:
 *
 * WhatsAppClient → ???
 * MessageService → ???
 * MediaService → ???
 * HttpClient → ???
 * Message interface → ???
 * Media interface → ???
 * ClientConfig interface → ???
 * APIError → ???
 * ValidationError → ???
 * validatePhone → ???
 * validateMessage → ???
 * formatPhone → ???
 */

/**
 * STEP 3: Split into files
 *
 * Create the actual folder structure and files.
 * Use the structure you planned in Step 1.
 */

/**
 * STEP 4: Create src/index.ts
 *
 * Define the public API. What should users be able to import?
 *
 * Public:
 * - ???
 * - ???
 *
 * Internal (not exported):
 * - ???
 * - ???
 */

/**
 * STEP 5: Verify
 *
 * Check:
 * ✅ Each file has one responsibility
 * ✅ Related code is grouped together
 * ✅ Clear public vs internal separation
 * ✅ Proper imports between files
 * ✅ No circular dependencies
 */

export {};
