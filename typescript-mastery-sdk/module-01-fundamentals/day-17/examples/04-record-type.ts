/**
 * Day 17 - Example 4: Record<K, V> Utility Type
 *
 * Demonstrates how Record creates type-safe key-value mappings
 * Use case: Caches, lookup tables, configuration maps, dictionaries
 */

// ============================================
// Example 1: Basic Record Usage
// ============================================

// Without Record - no type safety
const userAges1 = {
  'john': 30,
  'jane': 25,
  'bob': 35
};

// userAges1[123] = 'invalid';  // No error, but wrong!
// userAges1['alice'] = 'twenty'; // No error, but wrong!

// With Record - full type safety
const userAges2: Record<string, number> = {
  'john': 30,
  'jane': 25,
  'bob': 35
};

// userAges2['alice'] = 'twenty';  // ✅ TypeScript error!
userAges2['alice'] = 28;  // ✅ Correct

console.log('User ages:', userAges2);
console.log('✅ Example 1: Basic Record completed\n');


// ============================================
// Example 2: Message Cache with Record
// ============================================

interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

class MessageCache {
  // Message ID → Message object
  private cache: Record<string, WhatsAppMessage> = {};

  set(message: WhatsAppMessage): void {
    this.cache[message.id] = message;
    console.log(`Cached message: ${message.id}`);
  }

  get(id: string): WhatsAppMessage | undefined {
    return this.cache[id];
  }

  has(id: string): boolean {
    return id in this.cache;
  }

  getAll(): WhatsAppMessage[] {
    return Object.values(this.cache);
  }

  delete(id: string): boolean {
    if (this.has(id)) {
      delete this.cache[id];
      console.log(`Deleted message: ${id}`);
      return true;
    }
    return false;
  }

  clear(): void {
    this.cache = {};
    console.log('Cache cleared');
  }

  count(): number {
    return Object.keys(this.cache).length;
  }

  // Get messages by status
  getByStatus(status: WhatsAppMessage['status']): WhatsAppMessage[] {
    return this.getAll().filter(msg => msg.status === status);
  }
}

const msgCache = new MessageCache();

msgCache.set({
  id: 'msg-1',
  from: '+1234567890',
  to: '+0987654321',
  body: 'Hello!',
  timestamp: Date.now(),
  status: 'sent'
});

msgCache.set({
  id: 'msg-2',
  from: '+1234567890',
  to: '+0987654321',
  body: 'How are you?',
  timestamp: Date.now(),
  status: 'delivered'
});

console.log('Message count:', msgCache.count());
console.log('Get msg-1:', msgCache.get('msg-1'));
console.log('Delivered messages:', msgCache.getByStatus('delivered'));

msgCache.delete('msg-1');
console.log('Count after delete:', msgCache.count());

console.log('✅ Example 2: Message Cache completed\n');


// ============================================
// Example 3: Status Code Handlers
// ============================================

type HTTPStatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500 | 502 | 503;

interface APIResponse {
  status: HTTPStatusCode;
  data?: any;
  error?: string;
}

type StatusHandler = (response: APIResponse) => void;

// Map each status code to its handler
const statusHandlers: Record<HTTPStatusCode, StatusHandler> = {
  200: (response) => {
    console.log('✅ Success:', response.data);
  },
  201: (response) => {
    console.log('✅ Created:', response.data);
  },
  400: (response) => {
    console.error('❌ Bad Request:', response.error);
  },
  401: (response) => {
    console.error('❌ Unauthorized:', response.error);
    // Trigger re-authentication
  },
  403: (response) => {
    console.error('❌ Forbidden:', response.error);
  },
  404: (response) => {
    console.error('❌ Not Found:', response.error);
  },
  500: (response) => {
    console.error('❌ Server Error:', response.error);
    // Log to error tracking service
  },
  502: (response) => {
    console.error('❌ Bad Gateway:', response.error);
  },
  503: (response) => {
    console.error('❌ Service Unavailable:', response.error);
    // Retry logic
  }
};

// TypeScript ensures ALL status codes have handlers
function handleResponse(response: APIResponse): void {
  const handler = statusHandlers[response.status];
  handler(response);
}

// Test different responses
handleResponse({ status: 200, data: { message: 'Success' } });
handleResponse({ status: 404, error: 'Resource not found' });
handleResponse({ status: 500, error: 'Internal server error' });

console.log('✅ Example 3: Status Handlers completed\n');


// ============================================
// Example 4: Environment-Specific Configuration
// ============================================

type Environment = 'development' | 'staging' | 'production';

interface EnvConfig {
  apiURL: string;
  timeout: number;
  debug: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  maxRetries: number;
}

// Each environment MUST have a config
const environmentConfigs: Record<Environment, EnvConfig> = {
  development: {
    apiURL: 'http://localhost:3000',
    timeout: 10000,
    debug: true,
    logLevel: 'debug',
    maxRetries: 1
  },
  staging: {
    apiURL: 'https://staging-api.example.com',
    timeout: 5000,
    debug: true,
    logLevel: 'info',
    maxRetries: 2
  },
  production: {
    apiURL: 'https://api.example.com',
    timeout: 3000,
    debug: false,
    logLevel: 'error',
    maxRetries: 3
  }
};

function getConfig(env: Environment): EnvConfig {
  return environmentConfigs[env];
}

function initializeApp(env: Environment): void {
  const config = getConfig(env);
  console.log(`Initializing app in ${env} mode:`, config);
}

initializeApp('development');
initializeApp('production');

console.log('✅ Example 4: Environment Configs completed\n');


// ============================================
// Example 5: Translation/Localization
// ============================================

type Locale = 'en' | 'es' | 'fr' | 'de' | 'ur';

interface Translations {
  welcome: string;
  goodbye: string;
  error: string;
  success: string;
  loading: string;
}

// Each locale must have complete translations
const translations: Record<Locale, Translations> = {
  en: {
    welcome: 'Welcome',
    goodbye: 'Goodbye',
    error: 'An error occurred',
    success: 'Success!',
    loading: 'Loading...'
  },
  es: {
    welcome: 'Bienvenido',
    goodbye: 'Adiós',
    error: 'Ocurrió un error',
    success: '¡Éxito!',
    loading: 'Cargando...'
  },
  fr: {
    welcome: 'Bienvenue',
    goodbye: 'Au revoir',
    error: 'Une erreur est survenue',
    success: 'Succès!',
    loading: 'Chargement...'
  },
  de: {
    welcome: 'Willkommen',
    goodbye: 'Auf Wiedersehen',
    error: 'Ein Fehler ist aufgetreten',
    success: 'Erfolg!',
    loading: 'Laden...'
  },
  ur: {
    welcome: 'خوش آمدید',
    goodbye: 'الوداع',
    error: 'ایک خرابی پیش آئی',
    success: 'کامیابی!',
    loading: 'لوڈ ہو رہا ہے...'
  }
};

function translate(key: keyof Translations, locale: Locale): string {
  return translations[locale][key];
}

class LocalizationService {
  constructor(private currentLocale: Locale) {}

  setLocale(locale: Locale): void {
    this.currentLocale = locale;
    console.log(`Locale changed to: ${locale}`);
  }

  t(key: keyof Translations): string {
    return translations[this.currentLocale][key];
  }

  getAll(): Translations {
    return translations[this.currentLocale];
  }
}

const i18n = new LocalizationService('en');
console.log(i18n.t('welcome'));

i18n.setLocale('ur');
console.log(i18n.t('welcome'));

i18n.setLocale('es');
console.log(i18n.t('success'));

console.log('✅ Example 5: Localization completed\n');


// ============================================
// Example 6: Error Code Mappings
// ============================================

type ErrorCode =
  | 'AUTH_FAILED'
  | 'INVALID_TOKEN'
  | 'RATE_LIMITED'
  | 'RESOURCE_NOT_FOUND'
  | 'VALIDATION_ERROR'
  | 'SERVER_ERROR';

interface ErrorInfo {
  message: string;
  statusCode: number;
  retryable: boolean;
  userMessage: string;
}

// Map each error code to its info
const errorMappings: Record<ErrorCode, ErrorInfo> = {
  AUTH_FAILED: {
    message: 'Authentication failed',
    statusCode: 401,
    retryable: true,
    userMessage: 'Please check your credentials and try again'
  },
  INVALID_TOKEN: {
    message: 'Invalid or expired token',
    statusCode: 401,
    retryable: false,
    userMessage: 'Your session has expired. Please log in again'
  },
  RATE_LIMITED: {
    message: 'Rate limit exceeded',
    statusCode: 429,
    retryable: true,
    userMessage: 'Too many requests. Please try again later'
  },
  RESOURCE_NOT_FOUND: {
    message: 'Resource not found',
    statusCode: 404,
    retryable: false,
    userMessage: 'The requested resource could not be found'
  },
  VALIDATION_ERROR: {
    message: 'Validation failed',
    statusCode: 400,
    retryable: false,
    userMessage: 'Please check your input and try again'
  },
  SERVER_ERROR: {
    message: 'Internal server error',
    statusCode: 500,
    retryable: true,
    userMessage: 'Something went wrong. Please try again'
  }
};

class ErrorHandler {
  handle(code: ErrorCode): void {
    const info = errorMappings[code];

    console.error(`[${code}] ${info.message}`);
    console.log(`Status: ${info.statusCode}`);
    console.log(`Retryable: ${info.retryable}`);
    console.log(`User message: ${info.userMessage}`);

    if (info.retryable) {
      console.log('→ Attempting retry...');
    }
  }

  shouldRetry(code: ErrorCode): boolean {
    return errorMappings[code].retryable;
  }

  getUserMessage(code: ErrorCode): string {
    return errorMappings[code].userMessage;
  }
}

const errorHandler = new ErrorHandler();

errorHandler.handle('AUTH_FAILED');
console.log('---');
errorHandler.handle('RATE_LIMITED');
console.log('---');
errorHandler.handle('RESOURCE_NOT_FOUND');

console.log('✅ Example 6: Error Mappings completed\n');


// ============================================
// Example 7: Feature Flags
// ============================================

type FeatureFlag =
  | 'enableNewUI'
  | 'enableBetaFeatures'
  | 'enableAnalytics'
  | 'enableNotifications'
  | 'enableDarkMode';

// All feature flags with their default values
const featureFlags: Record<FeatureFlag, boolean> = {
  enableNewUI: false,
  enableBetaFeatures: false,
  enableAnalytics: true,
  enableNotifications: true,
  enableDarkMode: true
};

class FeatureFlagService {
  private flags: Record<FeatureFlag, boolean>;

  constructor(overrides?: Partial<Record<FeatureFlag, boolean>>) {
    this.flags = { ...featureFlags, ...overrides };
  }

  isEnabled(flag: FeatureFlag): boolean {
    return this.flags[flag];
  }

  enable(flag: FeatureFlag): void {
    this.flags[flag] = true;
    console.log(`Feature enabled: ${flag}`);
  }

  disable(flag: FeatureFlag): void {
    this.flags[flag] = false;
    console.log(`Feature disabled: ${flag}`);
  }

  getAll(): Record<FeatureFlag, boolean> {
    return { ...this.flags };
  }
}

const features = new FeatureFlagService({
  enableBetaFeatures: true
});

console.log('New UI enabled?', features.isEnabled('enableNewUI'));
console.log('Beta features enabled?', features.isEnabled('enableBetaFeatures'));

features.enable('enableNewUI');
console.log('New UI enabled now?', features.isEnabled('enableNewUI'));

console.log('All flags:', features.getAll());

console.log('✅ Example 7: Feature Flags completed\n');


// ============================================
// Example 8: Event Handlers Registry
// ============================================

type EventType =
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'message.sent'
  | 'message.received';

type EventHandler<T = any> = (data: T) => void;

class EventBus {
  // Each event type maps to array of handlers
  private handlers: Record<EventType, EventHandler[]> = {
    'user.created': [],
    'user.updated': [],
    'user.deleted': [],
    'message.sent': [],
    'message.received': []
  };

  on(event: EventType, handler: EventHandler): void {
    this.handlers[event].push(handler);
    console.log(`Handler registered for: ${event}`);
  }

  emit(event: EventType, data: any): void {
    console.log(`Emitting event: ${event}`);
    this.handlers[event].forEach(handler => handler(data));
  }

  off(event: EventType, handler: EventHandler): void {
    this.handlers[event] = this.handlers[event].filter(h => h !== handler);
    console.log(`Handler removed for: ${event}`);
  }

  clear(event: EventType): void {
    this.handlers[event] = [];
    console.log(`All handlers cleared for: ${event}`);
  }
}

const eventBus = new EventBus();

// Register handlers
eventBus.on('user.created', (user) => {
  console.log('  → Send welcome email to:', user.email);
});

eventBus.on('user.created', (user) => {
  console.log('  → Log user creation:', user.id);
});

eventBus.on('message.sent', (message) => {
  console.log('  → Update message status:', message.id);
});

// Emit events
eventBus.emit('user.created', { id: '1', email: 'john@example.com' });
eventBus.emit('message.sent', { id: 'msg-1', body: 'Hello' });

console.log('✅ Example 8: Event Handlers completed\n');


// ============================================
// Example 9: Validation Rules
// ============================================

type ValidationRule = 'required' | 'email' | 'minLength' | 'maxLength' | 'numeric';

type Validator = (value: any, params?: any) => boolean;

const validators: Record<ValidationRule, Validator> = {
  required: (value) => value !== null && value !== undefined && value !== '',
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  minLength: (value, params) => value.length >= params,
  maxLength: (value, params) => value.length <= params,
  numeric: (value) => !isNaN(Number(value))
};

interface FieldValidation {
  rule: ValidationRule;
  params?: any;
  message: string;
}

function validateField(value: any, validations: FieldValidation[]): string[] {
  const errors: string[] = [];

  for (const validation of validations) {
    const validator = validators[validation.rule];
    if (!validator(value, validation.params)) {
      errors.push(validation.message);
    }
  }

  return errors;
}

// Validate email field
const emailErrors = validateField('invalid-email', [
  { rule: 'required', message: 'Email is required' },
  { rule: 'email', message: 'Invalid email format' }
]);

console.log('Email errors:', emailErrors);

// Validate password field
const passwordErrors = validateField('123', [
  { rule: 'required', message: 'Password is required' },
  { rule: 'minLength', params: 8, message: 'Password must be at least 8 characters' }
]);

console.log('Password errors:', passwordErrors);

console.log('✅ Example 9: Validation Rules completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Record<K, V> Summary:
---------------------
✓ Creates type-safe key-value mappings
✓ All keys must be of type K
✓ All values must be of type V
✓ Perfect for dictionaries and lookup tables
✓ TypeScript ensures type consistency

Common use cases:
- Caching (ID → Object)
- Configuration maps (Environment → Config)
- Status/Error code mappings
- Event handlers registry
- Translation/localization
- Feature flags
- Validation rules
- Any key-value dictionary

Signature:
type Record<K extends keyof any, T> = {
  [P in K]: T
}

Key points:
- K must be valid key type (string, number, symbol, or union of them)
- All keys of type K map to values of type T
- Type-safe access and modification
- Better than plain objects for dictionaries
`);
