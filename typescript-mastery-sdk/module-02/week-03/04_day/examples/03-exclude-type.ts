/**
 * Day 18 - Example 3: Exclude<T, U> Utility Type
 *
 * Demonstrates how Exclude removes types from a union
 * Use case: Filtering union types, separating error codes from success codes
 */

// ============================================
// Example 1: Basic Exclude Usage
// ============================================

type AllColors = 'red' | 'blue' | 'green' | 'yellow' | 'orange';

// Remove specific colors
type WarmColors = Exclude<AllColors, 'blue' | 'green'>;
// Result: 'red' | 'yellow' | 'orange'

type CoolColors = Exclude<AllColors, 'red' | 'yellow' | 'orange'>;
// Result: 'blue' | 'green'

function paintWarm(color: WarmColors): void {
  console.log(`Painting with warm color: ${color}`);
  // Only accepts 'red', 'yellow', 'orange'
}

function paintCool(color: CoolColors): void {
  console.log(`Painting with cool color: ${color}`);
  // Only accepts 'blue', 'green'
}

paintWarm('red'); // ✅ OK
paintWarm('orange'); // ✅ OK
// paintWarm('blue'); // ❌ Error: blue is not a warm color

paintCool('blue'); // ✅ OK
// paintCool('red'); // ❌ Error: red is not a cool color

console.log('✅ Example 1: Basic Exclude completed\n');


// ============================================
// Example 2: HTTP Status Code Filtering
// ============================================

type HTTPStatusCode =
  | 200 | 201 | 204  // Success codes
  | 400 | 401 | 403 | 404  // Client error codes
  | 500 | 502 | 503;  // Server error codes

// Separate success from errors
type SuccessCode = 200 | 201 | 204;
type ErrorCode = Exclude<HTTPStatusCode, SuccessCode>;
// Result: 400 | 401 | 403 | 404 | 500 | 502 | 503

// Further separate client errors from server errors
type ClientErrorCode = 400 | 401 | 403 | 404;
type ServerErrorCode = Exclude<ErrorCode, ClientErrorCode>;
// Result: 500 | 502 | 503

interface APIResponse<T = any> {
  status: HTTPStatusCode;
  data?: T;
  error?: string;
}

class ResponseHandler {
  handle(response: APIResponse): void {
    if (this.isSuccess(response.status)) {
      this.handleSuccess(response);
    } else {
      this.handleError(response);
    }
  }

  private isSuccess(status: HTTPStatusCode): status is SuccessCode {
    return status === 200 || status === 201 || status === 204;
  }

  private handleSuccess(response: APIResponse & { status: SuccessCode }): void {
    console.log(`✅ Success ${response.status}:`, response.data);
  }

  private handleError(response: APIResponse & { status: ErrorCode }): void {
    if (this.isClientError(response.status)) {
      console.error(`❌ Client Error ${response.status}:`, response.error);
    } else {
      console.error(`❌ Server Error ${response.status}:`, response.error);
    }
  }

  private isClientError(status: ErrorCode): status is ClientErrorCode {
    return status >= 400 && status < 500;
  }
}

const handler = new ResponseHandler();

handler.handle({ status: 200, data: { message: 'Success' } });
handler.handle({ status: 404, error: 'Not Found' });
handler.handle({ status: 500, error: 'Internal Server Error' });

console.log('✅ Example 2: HTTP Status Code Filtering completed\n');


// ============================================
// Example 3: Message Type Filtering
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

// Separate media types from non-media
type MediaType = 'image' | 'video' | 'audio' | 'document';
type NonMediaType = Exclude<MessageType, MediaType>;
// Result: 'text' | 'location' | 'contact' | 'sticker'

// Separate interactive types
type InteractiveType = 'location' | 'contact';
type BasicType = Exclude<MessageType, MediaType | InteractiveType>;
// Result: 'text' | 'sticker'

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

interface TextMessage extends Message<'text'> {
  body: string;
}

class MessageRouter {
  route(message: Message): void {
    if (this.isMedia(message.type)) {
      this.handleMedia(message as MediaMessage);
    } else if (this.isInteractive(message.type)) {
      this.handleInteractive(message);
    } else {
      this.handleBasic(message);
    }
  }

  private isMedia(type: MessageType): type is MediaType {
    const mediaTypes: MediaType[] = ['image', 'video', 'audio', 'document'];
    return mediaTypes.includes(type as MediaType);
  }

  private isInteractive(type: MessageType): type is InteractiveType {
    const interactiveTypes: InteractiveType[] = ['location', 'contact'];
    return interactiveTypes.includes(type as InteractiveType);
  }

  private handleMedia(message: MediaMessage): void {
    console.log(`📎 Media message: ${message.type}`);
  }

  private handleInteractive(message: Message<InteractiveType>): void {
    console.log(`🔗 Interactive message: ${message.type}`);
  }

  private handleBasic(message: Message<BasicType>): void {
    console.log(`💬 Basic message: ${message.type}`);
  }
}

const router = new MessageRouter();

router.route({ id: '1', type: 'text', timestamp: Date.now() });
router.route({ id: '2', type: 'image', timestamp: Date.now() } as MediaMessage);
router.route({ id: '3', type: 'location', timestamp: Date.now() });

console.log('✅ Example 3: Message Type Filtering completed\n');


// ============================================
// Example 4: Event Type Filtering
// ============================================

type SDKEvent =
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'message.failed'
  | 'webhook.received'
  | 'webhook.failed'
  | 'auth.success'
  | 'auth.failed'
  | 'connection.open'
  | 'connection.close';

// Extract failure events using pattern
type SuccessEvent =
  | 'message.sent'
  | 'message.delivered'
  | 'message.read'
  | 'webhook.received'
  | 'auth.success'
  | 'connection.open';

type FailureEvent = Exclude<SDKEvent, SuccessEvent>;
// Result: 'message.failed' | 'webhook.failed' | 'auth.failed' | 'connection.close'

// Exclude connection events
type ConnectionEvent = 'connection.open' | 'connection.close';
type NonConnectionEvent = Exclude<SDKEvent, ConnectionEvent>;

type EventHandler<T extends SDKEvent = SDKEvent> = (event: T, data: any) => void;

class EventBus {
  private handlers: Map<SDKEvent, EventHandler[]> = new Map();

  on<T extends SDKEvent>(event: T, handler: EventHandler<T>): void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, []);
    }
    this.handlers.get(event)!.push(handler as EventHandler);
    console.log(`Handler registered for: ${event}`);
  }

  // Register handler for all failure events
  onFailure(handler: EventHandler<FailureEvent>): void {
    const failureEvents: FailureEvent[] = [
      'message.failed',
      'webhook.failed',
      'auth.failed',
      'connection.close'
    ];
    failureEvents.forEach(event => this.on(event, handler));
  }

  // Register handler for all success events
  onSuccess(handler: EventHandler<SuccessEvent>): void {
    const successEvents: SuccessEvent[] = [
      'message.sent',
      'message.delivered',
      'message.read',
      'webhook.received',
      'auth.success',
      'connection.open'
    ];
    successEvents.forEach(event => this.on(event, handler));
  }

  emit(event: SDKEvent, data: any): void {
    const handlers = this.handlers.get(event) || [];
    handlers.forEach(handler => handler(event, data));
  }
}

const eventBus = new EventBus();

eventBus.onSuccess((event, data) => {
  console.log(`✅ Success event: ${event}`, data);
});

eventBus.onFailure((event, data) => {
  console.error(`❌ Failure event: ${event}`, data);
});

eventBus.emit('message.sent', { id: 'msg-1' });
eventBus.emit('message.failed', { id: 'msg-2', error: 'Timeout' });

console.log('✅ Example 4: Event Type Filtering completed\n');


// ============================================
// Example 5: Primitive Type Filtering
// ============================================

type Primitive = string | number | boolean | null | undefined;

// Remove null and undefined
type NonNullable<T> = Exclude<T, null | undefined>;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;
// Result: string

type MaybeNumber = number | null;
type DefiniteNumber = Exclude<MaybeNumber, null>;
// Result: number

function processString(value: MaybeString): void {
  if (value !== null && value !== undefined) {
    const definite: DefiniteString = value;
    console.log('Processing string:', definite.toUpperCase());
  }
}

function requireString(value: DefiniteString): void {
  console.log('String length:', value.length);
  // value is guaranteed to be string, not null or undefined
}

processString('hello');
processString(null);
requireString('world');
// requireString(null); // ❌ Error: null not allowed

console.log('✅ Example 5: Primitive Type Filtering completed\n');


// ============================================
// Example 6: Permission System
// ============================================

type Permission =
  | 'read'
  | 'write'
  | 'delete'
  | 'admin'
  | 'super_admin';

// Regular user permissions (exclude admin permissions)
type AdminPermission = 'admin' | 'super_admin';
type UserPermission = Exclude<Permission, AdminPermission>;
// Result: 'read' | 'write' | 'delete'

// Read-only permissions (exclude write operations)
type WritePermission = 'write' | 'delete';
type ReadOnlyPermission = Exclude<UserPermission, WritePermission>;
// Result: 'read'

interface User {
  id: string;
  name: string;
  permissions: Permission[];
}

class AccessControl {
  hasPermission(user: User, permission: Permission): boolean {
    return user.permissions.includes(permission);
  }

  // Check if user has admin access
  isAdmin(user: User): boolean {
    const adminPerms: AdminPermission[] = ['admin', 'super_admin'];
    return user.permissions.some(p => adminPerms.includes(p as AdminPermission));
  }

  // Check if user has only read-only access
  isReadOnly(user: User): boolean {
    const readOnlyPerms: ReadOnlyPermission[] = ['read'];
    return user.permissions.every(p => readOnlyPerms.includes(p as ReadOnlyPermission));
  }

  // Grant user-level permissions only
  grantUserPermission(user: User, permission: UserPermission): void {
    if (!user.permissions.includes(permission)) {
      user.permissions.push(permission);
      console.log(`Granted ${permission} to ${user.name}`);
    }
  }

  // Prevent granting admin permissions through regular method
  // grantUserPermission cannot accept AdminPermission types
}

const regularUser: User = {
  id: '1',
  name: 'John',
  permissions: ['read', 'write']
};

const adminUser: User = {
  id: '2',
  name: 'Admin',
  permissions: ['read', 'write', 'delete', 'admin']
};

const acl = new AccessControl();

console.log('John is admin?', acl.isAdmin(regularUser));
console.log('Admin user is admin?', acl.isAdmin(adminUser));

acl.grantUserPermission(regularUser, 'delete');
// acl.grantUserPermission(regularUser, 'admin'); // ❌ Error: admin not in UserPermission

console.log('✅ Example 6: Permission System completed\n');


// ============================================
// Example 7: Form Field Filtering
// ============================================

type FormFieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'select'
  | 'textarea'
  | 'file'
  | 'date';

// Input types
type InputType = 'text' | 'email' | 'password' | 'number' | 'file' | 'date';
type NonInputType = Exclude<FormFieldType, InputType>;
// Result: 'checkbox' | 'radio' | 'select' | 'textarea'

// Text-based inputs
type TextInputType = 'text' | 'email' | 'password' | 'textarea';
type NonTextInputType = Exclude<FormFieldType, TextInputType>;

interface FormField<T extends FormFieldType = FormFieldType> {
  name: string;
  type: T;
  label: string;
  required: boolean;
}

interface InputField extends FormField<InputType> {
  placeholder?: string;
  maxLength?: number;
}

interface SelectField extends FormField<'select'> {
  options: Array<{ value: string; label: string }>;
}

class FormBuilder {
  private fields: FormField[] = [];

  addInput(field: InputField): this {
    this.fields.push(field);
    console.log(`Added input field: ${field.name} (${field.type})`);
    return this;
  }

  addSelect(field: SelectField): this {
    this.fields.push(field);
    console.log(`Added select field: ${field.name}`);
    return this;
  }

  addField(field: FormField<NonInputType>): this {
    this.fields.push(field);
    console.log(`Added ${field.type} field: ${field.name}`);
    return this;
  }

  build(): FormField[] {
    return this.fields;
  }
}

const formBuilder = new FormBuilder();

formBuilder
  .addInput({
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
    placeholder: 'Enter your email'
  })
  .addInput({
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true
  })
  .addField({
    name: 'terms',
    type: 'checkbox',
    label: 'Accept Terms',
    required: true
  });

const form = formBuilder.build();
console.log('Form fields:', form.length);

console.log('✅ Example 7: Form Field Filtering completed\n');


// ============================================
// Example 8: API Method Filtering
// ============================================

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';

// Safe methods (no side effects)
type SafeMethod = 'GET' | 'HEAD' | 'OPTIONS';
type UnsafeMethod = Exclude<HTTPMethod, SafeMethod>;
// Result: 'POST' | 'PUT' | 'PATCH' | 'DELETE'

// Methods that send body
type BodyMethod = 'POST' | 'PUT' | 'PATCH';
type NoBodyMethod = Exclude<HTTPMethod, BodyMethod>;

interface Request<M extends HTTPMethod = HTTPMethod> {
  method: M;
  url: string;
  headers: Record<string, string>;
}

interface RequestWithBody extends Request<BodyMethod> {
  body: any;
}

function canCache(method: HTTPMethod): method is SafeMethod {
  const safeMethods: SafeMethod[] = ['GET', 'HEAD', 'OPTIONS'];
  return safeMethods.includes(method as SafeMethod);
}

function requiresBody(method: HTTPMethod): method is BodyMethod {
  const bodyMethods: BodyMethod[] = ['POST', 'PUT', 'PATCH'];
  return bodyMethods.includes(method as BodyMethod);
}

function sendRequest(request: Request): void {
  console.log(`${request.method} ${request.url}`);

  if (canCache(request.method)) {
    console.log('  → Response can be cached');
  }

  if (requiresBody(request.method)) {
    console.log('  → Request requires body');
  }
}

sendRequest({ method: 'GET', url: '/api/users', headers: {} });
sendRequest({ method: 'POST', url: '/api/users', headers: {} });
sendRequest({ method: 'DELETE', url: '/api/users/1', headers: {} });

console.log('✅ Example 8: API Method Filtering completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Exclude<T, U> Summary:
----------------------
✓ Removes types from union that are assignable to U
✓ Works on union types (not object properties)
✓ Returns never for excluded types
✓ Perfect for categorizing and filtering unions

Common use cases:
- Separating success codes from error codes
- Filtering event types by category
- Creating complementary type sets
- Permission systems
- Message type routing
- Removing null/undefined from types

How it works:
type Exclude<T, U> = T extends U ? never : T

For each type in T:
- If it extends U (matches), return never (exclude it)
- Otherwise, keep it

Exclude vs Omit:
- Exclude: Works on union types
- Omit: Works on object properties

Exclude vs Extract:
- Exclude: Remove matching types
- Extract: Keep only matching types
- They are opposites for union types
`);
