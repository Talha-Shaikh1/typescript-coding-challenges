/**
 * Day 18 - Example 4: Extract<T, U> Utility Type
 *
 * Demonstrates how Extract selects types from a union that are assignable to U
 * Use case: Selecting specific types from unions, pattern matching, type narrowing
 */

// ============================================
// Example 1: Basic Extract Usage
// ============================================

type AllColors = 'red' | 'blue' | 'green' | 'yellow' | 'orange';

// Extract warm colors
type WarmColors = Extract<AllColors, 'red' | 'yellow' | 'orange'>;
// Result: 'red' | 'yellow' | 'orange'

// Extract cool colors
type CoolColors = Extract<AllColors, 'blue' | 'green'>;
// Result: 'blue' | 'green'

function applyWarmColor(color: WarmColors): void {
  console.log(`Applying warm color: ${color}`);
}

function applyCoolColor(color: CoolColors): void {
  console.log(`Applying cool color: ${color}`);
}

applyWarmColor('red'); // ✅ OK
applyWarmColor('orange'); // ✅ OK
// applyWarmColor('blue'); // ❌ Error: blue not in WarmColors

applyCoolColor('blue'); // ✅ OK
// applyCoolColor('red'); // ❌ Error: red not in CoolColors

console.log('✅ Example 1: Basic Extract completed\n');


// ============================================
// Example 2: String Pattern Matching
// ============================================

type SDKEvent =
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'message.failed'
  | 'webhook.received'
  | 'webhook.failed'
  | 'auth.success'
  | 'auth.failed';

// Extract all message events (using template literal pattern)
type MessageEvent = Extract<SDKEvent, `message.${string}`>;
// Result: 'message.sent' | 'message.delivered' | 'message.read' | 'message.failed'

// Extract all webhook events
type WebhookEvent = Extract<SDKEvent, `webhook.${string}`>;
// Result: 'webhook.received' | 'webhook.failed'

// Extract all failure events
type FailureEvent = Extract<SDKEvent, `${string}.failed`>;
// Result: 'message.failed' | 'webhook.failed' | 'auth.failed'

// Extract all success events
type SuccessEvent = Extract<SDKEvent, `${string}.success` | `${string}.sent` | `${string}.delivered` | `${string}.read` | `${string}.received`>;

type EventHandler<T extends SDKEvent = SDKEvent> = (event: T, data: any) => void;

class EventBus {
  private handlers: Map<string, EventHandler[]> = new Map();

  // Register handler for message events only
  onMessage(handler: EventHandler<MessageEvent>): void {
    const messageEvents: MessageEvent[] = [
      'message.sent',
      'message.delivered',
      'message.read',
      'message.failed'
    ];
    messageEvents.forEach(event => this.on(event, handler));
    console.log('Message handler registered');
  }

  // Register handler for webhook events only
  onWebhook(handler: EventHandler<WebhookEvent>): void {
    const webhookEvents: WebhookEvent[] = ['webhook.received', 'webhook.failed'];
    webhookEvents.forEach(event => this.on(event, handler));
    console.log('Webhook handler registered');
  }

  // Register handler for failure events only
  onFailure(handler: EventHandler<FailureEvent>): void {
    const failureEvents: FailureEvent[] = [
      'message.failed',
      'webhook.failed',
      'auth.failed'
    ];
    failureEvents.forEach(event => this.on(event, handler));
    console.log('Failure handler registered');
  }

  on<T extends SDKEvent>(event: T, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler as EventHandler);
  }

  emit(event: SDKEvent, data: any): void {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach(handler => handler(event, data));
  }
}

const eventBus = new EventBus();

eventBus.onMessage((event, data) => {
  console.log(`  📨 Message event: ${event}`, data);
});

eventBus.onWebhook((event, data) => {
  console.log(`  🔗 Webhook event: ${event}`, data);
});

eventBus.onFailure((event, data) => {
  console.error(`  ❌ Failure event: ${event}`, data);
});

eventBus.emit('message.sent', { id: 'msg-1' });
eventBus.emit('webhook.received', { payload: 'data' });
eventBus.emit('message.failed', { id: 'msg-2', error: 'Timeout' });

console.log('✅ Example 2: String Pattern Matching completed\n');


// ============================================
// Example 3: Message Type Selection
// ============================================

type MessageType =
  | 'text'
  | 'image'
  | 'video'
  | 'audio'
  | 'document'
  | 'location'
  | 'contact'
  | 'sticker';

// Extract only media types
type MediaType = Extract<MessageType, 'image' | 'video' | 'audio' | 'document'>;
// Result: 'image' | 'video' | 'audio' | 'document'

// Extract only visual media
type VisualMedia = Extract<MediaType, 'image' | 'video'>;
// Result: 'image' | 'video'

// Extract only audio media
type AudioMedia = Extract<MediaType, 'audio'>;
// Result: 'audio'

interface Message<T extends MessageType = MessageType> {
  id: string;
  type: T;
  timestamp: number;
}

interface MediaMessage extends Message<MediaType> {
  mediaUrl: string;
  mediaSize: number;
  mimeType: string;
}

interface VisualMessage extends Message<VisualMedia> {
  mediaUrl: string;
  width: number;
  height: number;
  thumbnailUrl: string;
}

class MediaHandler {
  // Process only media messages
  processMedia(message: Message): boolean {
    if (this.isMedia(message.type)) {
      console.log(`Processing ${message.type} media`);
      return true;
    }
    return false;
  }

  // Process only visual media
  generateThumbnail(message: Message): boolean {
    if (this.isVisual(message.type)) {
      console.log(`Generating thumbnail for ${message.type}`);
      return true;
    }
    return false;
  }

  // Download media
  downloadMedia(message: Message<MediaType>): void {
    console.log(`Downloading ${message.type} from URL`);
    // Type ensures message is media type
  }

  // Compress visual media
  compressVisual(message: Message<VisualMedia>): void {
    console.log(`Compressing ${message.type} media`);
    // Type ensures message is image or video only
  }

  private isMedia(type: MessageType): type is MediaType {
    const mediaTypes: MediaType[] = ['image', 'video', 'audio', 'document'];
    return mediaTypes.includes(type as MediaType);
  }

  private isVisual(type: MessageType): type is VisualMedia {
    const visualTypes: VisualMedia[] = ['image', 'video'];
    return visualTypes.includes(type as VisualMedia);
  }
}

const mediaHandler = new MediaHandler();

mediaHandler.processMedia({ id: '1', type: 'image', timestamp: Date.now() });
mediaHandler.processMedia({ id: '2', type: 'text', timestamp: Date.now() });
mediaHandler.generateThumbnail({ id: '3', type: 'video', timestamp: Date.now() });

console.log('✅ Example 3: Message Type Selection completed\n');


// ============================================
// Example 4: HTTP Status Code Selection
// ============================================

type HTTPStatusCode =
  | 200 | 201 | 204
  | 400 | 401 | 403 | 404
  | 500 | 502 | 503;

// Extract only success codes (2xx)
type SuccessCode = Extract<HTTPStatusCode, 200 | 201 | 204>;
// Result: 200 | 201 | 204

// Extract only client error codes (4xx)
type ClientErrorCode = Extract<HTTPStatusCode, 400 | 401 | 403 | 404>;
// Result: 400 | 401 | 403 | 404

// Extract only server error codes (5xx)
type ServerErrorCode = Extract<HTTPStatusCode, 500 | 502 | 503>;
// Result: 500 | 502 | 503

// Extract authentication-related codes
type AuthCode = Extract<HTTPStatusCode, 200 | 401 | 403>;
// Result: 200 | 401 | 403

interface APIResponse<T = any> {
  status: HTTPStatusCode;
  data?: T;
  error?: string;
}

class StatusHandler {
  // Handle only success responses
  handleSuccess(response: APIResponse & { status: SuccessCode }): void {
    console.log(`✅ Success ${response.status}:`, response.data);
  }

  // Handle only client errors
  handleClientError(response: APIResponse & { status: ClientErrorCode }): void {
    console.error(`❌ Client Error ${response.status}:`, response.error);
  }

  // Handle only server errors
  handleServerError(response: APIResponse & { status: ServerErrorCode }): void {
    console.error(`❌ Server Error ${response.status}:`, response.error);
  }

  // Handle authentication-specific codes
  handleAuth(response: APIResponse & { status: AuthCode }): void {
    if (response.status === 200) {
      console.log('✅ Authenticated successfully');
    } else if (response.status === 401) {
      console.error('❌ Authentication required');
    } else {
      console.error('❌ Access forbidden');
    }
  }

  // Route to appropriate handler
  route(response: APIResponse): void {
    if (this.isSuccess(response.status)) {
      this.handleSuccess({ ...response, status: response.status as SuccessCode });
    } else if (this.isClientError(response.status)) {
      this.handleClientError({ ...response, status: response.status as ClientErrorCode });
    } else {
      this.handleServerError({ ...response, status: response.status as ServerErrorCode });
    }
  }

  private isSuccess(status: HTTPStatusCode): status is SuccessCode {
    return status >= 200 && status < 300;
  }

  private isClientError(status: HTTPStatusCode): status is ClientErrorCode {
    return status >= 400 && status < 500;
  }
}

const statusHandler = new StatusHandler();

statusHandler.route({ status: 200, data: { message: 'OK' } });
statusHandler.route({ status: 404, error: 'Not Found' });
statusHandler.route({ status: 500, error: 'Internal Server Error' });

console.log('✅ Example 4: HTTP Status Code Selection completed\n');


// ============================================
// Example 5: Permission Extraction
// ============================================

type Permission =
  | 'read'
  | 'write'
  | 'delete'
  | 'admin'
  | 'super_admin'
  | 'moderator';

// Extract only admin permissions
type AdminPermission = Extract<Permission, 'admin' | 'super_admin'>;
// Result: 'admin' | 'super_admin'

// Extract only content permissions
type ContentPermission = Extract<Permission, 'read' | 'write' | 'delete'>;
// Result: 'read' | 'write' | 'delete'

// Extract only elevated permissions
type ElevatedPermission = Extract<Permission, 'admin' | 'super_admin' | 'moderator'>;
// Result: 'admin' | 'super_admin' | 'moderator'

interface User {
  id: string;
  name: string;
  permissions: Permission[];
}

class PermissionChecker {
  // Check if user has admin access
  hasAdminAccess(user: User): boolean {
    const adminPerms: AdminPermission[] = ['admin', 'super_admin'];
    return user.permissions.some(p => adminPerms.includes(p as AdminPermission));
  }

  // Check if user has content permissions
  hasContentAccess(user: User): boolean {
    const contentPerms: ContentPermission[] = ['read', 'write', 'delete'];
    return user.permissions.some(p => contentPerms.includes(p as ContentPermission));
  }

  // Check if user has elevated permissions
  hasElevatedAccess(user: User): boolean {
    const elevatedPerms: ElevatedPermission[] = ['admin', 'super_admin', 'moderator'];
    return user.permissions.some(p => elevatedPerms.includes(p as ElevatedPermission));
  }

  // Get user's admin permissions only
  getAdminPermissions(user: User): AdminPermission[] {
    const adminPerms: AdminPermission[] = ['admin', 'super_admin'];
    return user.permissions.filter(p =>
      adminPerms.includes(p as AdminPermission)
    ) as AdminPermission[];
  }

  // Get user's content permissions only
  getContentPermissions(user: User): ContentPermission[] {
    const contentPerms: ContentPermission[] = ['read', 'write', 'delete'];
    return user.permissions.filter(p =>
      contentPerms.includes(p as ContentPermission)
    ) as ContentPermission[];
  }
}

const checker = new PermissionChecker();

const user1: User = {
  id: '1',
  name: 'John',
  permissions: ['read', 'write']
};

const user2: User = {
  id: '2',
  name: 'Admin',
  permissions: ['read', 'write', 'delete', 'admin']
};

console.log('John has admin access?', checker.hasAdminAccess(user1));
console.log('Admin has admin access?', checker.hasAdminAccess(user2));
console.log('Admin permissions:', checker.getAdminPermissions(user2));
console.log('Content permissions:', checker.getContentPermissions(user2));

console.log('✅ Example 5: Permission Extraction completed\n');


// ============================================
// Example 6: Numeric Type Extraction
// ============================================

type StatusCode = 200 | 201 | 400 | 401 | 404 | 500 | 'pending' | 'unknown';

// Extract only numeric status codes
type NumericStatus = Extract<StatusCode, number>;
// Result: 200 | 201 | 400 | 401 | 404 | 500

// Extract only string status codes
type StringStatus = Extract<StatusCode, string>;
// Result: 'pending' | 'unknown'

function processNumericStatus(status: NumericStatus): void {
  console.log(`Processing numeric status: ${status}`);
  // status is guaranteed to be a number
}

function processStringStatus(status: StringStatus): void {
  console.log(`Processing string status: ${status}`);
  // status is guaranteed to be a string
}

function handleStatus(status: StatusCode): void {
  if (typeof status === 'number') {
    processNumericStatus(status);
  } else {
    processStringStatus(status);
  }
}

handleStatus(200);
handleStatus('pending');
handleStatus(404);

console.log('✅ Example 6: Numeric Type Extraction completed\n');


// ============================================
// Example 7: Function Type Extraction
// ============================================

type Handler =
  | ((data: string) => void)
  | ((data: number) => void)
  | ((data: boolean) => void)
  | string
  | number;

// Extract only function types
type FunctionHandler = Extract<Handler, Function>;
// Result: ((data: string) => void) | ((data: number) => void) | ((data: boolean) => void)

// Extract only primitive types
type PrimitiveHandler = Extract<Handler, string | number>;
// Result: string | number

type HandlerMap = {
  onString: Extract<Handler, (data: string) => void>;
  onNumber: Extract<Handler, (data: number) => void>;
  onBoolean: Extract<Handler, (data: boolean) => void>;
};

class EventProcessor {
  private handlers: HandlerMap = {
    onString: (data: string) => console.log('String:', data),
    onNumber: (data: number) => console.log('Number:', data),
    onBoolean: (data: boolean) => console.log('Boolean:', data)
  };

  setStringHandler(handler: Extract<Handler, (data: string) => void>): void {
    this.handlers.onString = handler;
  }

  setNumberHandler(handler: Extract<Handler, (data: number) => void>): void {
    this.handlers.onNumber = handler;
  }

  processString(data: string): void {
    this.handlers.onString(data);
  }

  processNumber(data: number): void {
    this.handlers.onNumber(data);
  }

  processBoolean(data: boolean): void {
    this.handlers.onBoolean(data);
  }
}

const processor = new EventProcessor();

processor.setStringHandler((data) => {
  console.log('Custom string handler:', data.toUpperCase());
});

processor.processString('hello');
processor.processNumber(42);
processor.processBoolean(true);

console.log('✅ Example 7: Function Type Extraction completed\n');


// ============================================
// Example 8: Complex Type Filtering
// ============================================

type APIEndpoint =
  | '/api/users'
  | '/api/users/:id'
  | '/api/posts'
  | '/api/posts/:id'
  | '/api/comments'
  | '/api/comments/:id'
  | '/public/assets'
  | '/public/images';

// Extract only API endpoints
type APIRoute = Extract<APIEndpoint, `/api/${string}`>;
// Result: '/api/users' | '/api/users/:id' | '/api/posts' | '/api/posts/:id' | '/api/comments' | '/api/comments/:id'

// Extract only public endpoints
type PublicRoute = Extract<APIEndpoint, `/public/${string}`>;
// Result: '/public/assets' | '/public/images'

// Extract only dynamic routes (with :id)
type DynamicRoute = Extract<APIEndpoint, `${string}/:id`>;
// Result: '/api/users/:id' | '/api/posts/:id' | '/api/comments/:id'

type RouteHandler = (req: any, res: any) => void;

class Router {
  private apiHandlers: Map<APIRoute, RouteHandler> = new Map();
  private publicHandlers: Map<PublicRoute, RouteHandler> = new Map();

  // Register API route
  api(route: APIRoute, handler: RouteHandler): void {
    this.apiHandlers.set(route, handler);
    console.log(`API route registered: ${route}`);
  }

  // Register public route
  public(route: PublicRoute, handler: RouteHandler): void {
    this.publicHandlers.set(route, handler);
    console.log(`Public route registered: ${route}`);
  }

  // Check if route is dynamic
  isDynamic(route: APIEndpoint): route is DynamicRoute {
    return route.includes(':id');
  }
}

const router = new Router();

router.api('/api/users', (req, res) => {
  console.log('  Handling GET /api/users');
});

router.api('/api/users/:id', (req, res) => {
  console.log('  Handling GET /api/users/:id');
});

router.public('/public/assets', (req, res) => {
  console.log('  Serving public assets');
});

console.log('Is /api/users/:id dynamic?', router.isDynamic('/api/users/:id'));
console.log('Is /api/users dynamic?', router.isDynamic('/api/users'));

console.log('✅ Example 8: Complex Type Filtering completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Extract<T, U> Summary:
----------------------
✓ Selects types from union T that are assignable to U
✓ Opposite of Exclude<T, U>
✓ Works on union types (not object properties)
✓ Perfect for pattern matching with template literals

Common use cases:
- Selecting specific event types
- Pattern matching on string literals
- Extracting media types from message types
- Filtering HTTP methods or status codes
- Type narrowing with type guards
- Permission categorization

How it works:
type Extract<T, U> = T extends U ? T : never

For each type in T:
- If it extends U (matches), keep it
- Otherwise, return never (exclude it)

Extract vs Pick:
- Extract: Works on union types
- Pick: Works on object properties

Extract vs Exclude:
- Extract: Keep matching types
- Exclude: Remove matching types
- They are opposites

Pattern matching power:
- Extract<Event, \`message.\${string}\`> // All message events
- Extract<Route, \`/api/\${string}\`> // All API routes
- Extract<Status, \`\${string}.failed\`> // All failure statuses
`);
