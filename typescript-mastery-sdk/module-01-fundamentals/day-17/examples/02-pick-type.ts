/**
 * Day 17 - Example 2: Pick<T, K> Utility Type
 *
 * Demonstrates how Pick selects specific properties from a type
 * Use case: Creating lightweight versions, API response summaries
 */

// ============================================
// Example 1: Basic Pick Usage
// ============================================

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
}

// Pick only essential fields for display
type UserDisplay = Pick<User, 'id' | 'username' | 'firstName' | 'lastName'>;

// Pick only authentication fields
type UserAuth = Pick<User, 'id' | 'email' | 'password'>;

// Pick only metadata fields
type UserMetadata = Pick<User, 'createdAt' | 'updatedAt' | 'lastLogin'>;

function displayUser(user: UserDisplay): void {
  console.log(`${user.firstName} ${user.lastName} (@${user.username})`);
  // Can't access password, email, etc. - not in picked type
}

function authenticateUser(user: UserAuth): boolean {
  console.log(`Authenticating ${user.email}`);
  // Can only access id, email, password
  return true;
}

const fullUser: User = {
  id: '1',
  username: 'john_doe',
  email: 'john@example.com',
  password: 'hashed_password',
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  createdAt: new Date(),
  updatedAt: new Date(),
  lastLogin: new Date()
};

// Pass only picked properties
const displayData: UserDisplay = {
  id: fullUser.id,
  username: fullUser.username,
  firstName: fullUser.firstName,
  lastName: fullUser.lastName
};

displayUser(displayData);

console.log('✅ Example 1: Basic Pick completed\n');


// ============================================
// Example 2: API Response Optimization
// ============================================

interface WhatsAppMessage {
  id: string;
  from: string;
  to: string;
  body: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  type: 'text' | 'image' | 'video' | 'document';
  mediaUrl?: string;
  mediaSize?: number;
  thumbnailUrl?: string;
  metadata: Record<string, any>;
  reactions: Array<{ emoji: string; userId: string }>;
  replyTo?: string;
}

// Lightweight list view (inbox)
type MessageListItem = Pick<WhatsAppMessage, 'id' | 'from' | 'body' | 'timestamp' | 'status'>;

// Notification view (push notifications)
type MessageNotification = Pick<WhatsAppMessage, 'id' | 'from' | 'body'>;

// Analytics data
type MessageAnalytics = Pick<WhatsAppMessage, 'id' | 'timestamp' | 'status' | 'type'>;

// Media-only info
type MessageMedia = Pick<WhatsAppMessage, 'id' | 'mediaUrl' | 'mediaSize' | 'thumbnailUrl'>;

class MessageService {
  private messages: Map<string, WhatsAppMessage> = new Map();

  addMessage(message: WhatsAppMessage): void {
    this.messages.set(message.id, message);
  }

  // Return lightweight data for list views
  getMessageList(): MessageListItem[] {
    return Array.from(this.messages.values()).map(msg => ({
      id: msg.id,
      from: msg.from,
      body: msg.body,
      timestamp: msg.timestamp,
      status: msg.status
    }));
  }

  // Return minimal data for notifications
  getNotifications(): MessageNotification[] {
    return Array.from(this.messages.values()).map(msg => ({
      id: msg.id,
      from: msg.from,
      body: msg.body
    }));
  }

  // Return only analytics-relevant data
  getAnalytics(): MessageAnalytics[] {
    return Array.from(this.messages.values()).map(msg => ({
      id: msg.id,
      timestamp: msg.timestamp,
      status: msg.status,
      type: msg.type
    }));
  }

  // Get full message by ID
  getMessage(id: string): WhatsAppMessage | undefined {
    return this.messages.get(id);
  }
}

const msgService = new MessageService();

msgService.addMessage({
  id: 'msg-1',
  from: '+1234567890',
  to: '+0987654321',
  body: 'Hello, how are you?',
  timestamp: Date.now(),
  status: 'delivered',
  type: 'text',
  metadata: {},
  reactions: [],
});

msgService.addMessage({
  id: 'msg-2',
  from: '+1234567890',
  to: '+0987654321',
  body: 'Check this image',
  timestamp: Date.now(),
  status: 'sent',
  type: 'image',
  mediaUrl: 'https://example.com/image.jpg',
  mediaSize: 1024000,
  thumbnailUrl: 'https://example.com/thumb.jpg',
  metadata: {},
  reactions: []
});

console.log('Message list (lightweight):', msgService.getMessageList());
console.log('Notifications (minimal):', msgService.getNotifications());
console.log('Analytics data:', msgService.getAnalytics());

console.log('✅ Example 2: API Response Optimization completed\n');


// ============================================
// Example 3: Form Field Selection
// ============================================

interface ProductForm {
  // Basic info
  name: string;
  description: string;
  category: string;

  // Pricing
  price: number;
  compareAtPrice?: number;
  costPerItem?: number;

  // Inventory
  sku: string;
  barcode?: string;
  trackQuantity: boolean;
  quantity: number;

  // Shipping
  weight?: number;
  weightUnit?: 'kg' | 'lb';
  requiresShipping: boolean;

  // SEO
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

// Admin can edit all fields
type AdminProductForm = ProductForm;

// Vendor can only edit specific fields
type VendorProductForm = Pick<
  ProductForm,
  'name' | 'description' | 'price' | 'quantity' | 'weight' | 'requiresShipping'
>;

// Customer can only view basic info
type CustomerProductView = Pick<ProductForm, 'name' | 'description' | 'price' | 'category'>;

// SEO manager can only edit SEO fields
type SEOProductForm = Pick<ProductForm, 'seoTitle' | 'seoDescription' | 'seoKeywords'>;

function validateVendorForm(form: VendorProductForm): boolean {
  console.log('Validating vendor form...');
  // Vendor can't set SKU, barcode, cost, etc.
  return form.name.length > 0 && form.price > 0;
}

function displayToCustomer(product: CustomerProductView): void {
  console.log(`Product: ${product.name}`);
  console.log(`Price: $${product.price}`);
  console.log(`Category: ${product.category}`);
  // Customer can't see inventory, costs, SKU, etc.
}

const vendorForm: VendorProductForm = {
  name: 'Wireless Mouse',
  description: 'Ergonomic wireless mouse',
  price: 29.99,
  quantity: 100,
  weight: 0.2,
  requiresShipping: true
};

validateVendorForm(vendorForm);

const customerView: CustomerProductView = {
  name: 'Wireless Mouse',
  description: 'Ergonomic wireless mouse',
  price: 29.99,
  category: 'Electronics'
};

displayToCustomer(customerView);

console.log('✅ Example 3: Form Field Selection completed\n');


// ============================================
// Example 4: Database Query Projections
// ============================================

interface Order {
  id: string;
  userId: string;
  items: Array<{ productId: string; quantity: number; price: number }>;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  billingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
}

// Different query projections for different use cases
type OrderSummary = Pick<Order, 'id' | 'total' | 'status' | 'createdAt'>;
type OrderFinancial = Pick<Order, 'id' | 'subtotal' | 'tax' | 'shipping' | 'total' | 'paymentStatus'>;
type OrderShipping = Pick<Order, 'id' | 'status' | 'shippingAddress' | 'shippedAt' | 'deliveredAt'>;
type OrderTimestamps = Pick<Order, 'id' | 'createdAt' | 'updatedAt' | 'shippedAt' | 'deliveredAt'>;

class OrderRepository {
  private orders: Map<string, Order> = new Map();

  add(order: Order): void {
    this.orders.set(order.id, order);
  }

  // Query with projection - return only needed fields
  findSummaries(): OrderSummary[] {
    console.log('Fetching order summaries (lightweight)...');
    return Array.from(this.orders.values()).map(order => ({
      id: order.id,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt
    }));
  }

  // Financial report projection
  getFinancialReport(): OrderFinancial[] {
    console.log('Fetching financial data...');
    return Array.from(this.orders.values()).map(order => ({
      id: order.id,
      subtotal: order.subtotal,
      tax: order.tax,
      shipping: order.shipping,
      total: order.total,
      paymentStatus: order.paymentStatus
    }));
  }

  // Shipping manifest projection
  getShippingManifest(): OrderShipping[] {
    console.log('Fetching shipping manifest...');
    return Array.from(this.orders.values())
      .filter(order => order.status === 'processing' || order.status === 'shipped')
      .map(order => ({
        id: order.id,
        status: order.status,
        shippingAddress: order.shippingAddress,
        shippedAt: order.shippedAt,
        deliveredAt: order.deliveredAt
      }));
  }
}

const orderRepo = new OrderRepository();

orderRepo.add({
  id: 'order-1',
  userId: 'user-1',
  items: [{ productId: 'prod-1', quantity: 2, price: 29.99 }],
  subtotal: 59.98,
  tax: 5.40,
  shipping: 10.00,
  total: 75.38,
  status: 'shipped',
  paymentMethod: 'credit_card',
  paymentStatus: 'paid',
  shippingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA'
  },
  billingAddress: {
    street: '123 Main St',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'USA'
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  shippedAt: new Date()
});

const summaries = orderRepo.findSummaries();
console.log('Order summaries:', summaries);

const financials = orderRepo.getFinancialReport();
console.log('Financial report:', financials);

console.log('✅ Example 4: Database Query Projections completed\n');


// ============================================
// Example 5: SDK Configuration Subsets
// ============================================

interface CompleteSDKConfig {
  // Authentication
  accessToken: string;
  refreshToken?: string;
  apiKey: string;

  // API Settings
  baseURL: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;

  // Features
  enableWebhooks: boolean;
  webhookSecret?: string;
  enableCaching: boolean;
  cacheSize: number;
  enableLogging: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';

  // Performance
  maxConcurrentRequests: number;
  requestsPerSecond: number;
  batchSize: number;
}

// Pick only authentication fields for auth module
type AuthConfig = Pick<CompleteSDKConfig, 'accessToken' | 'refreshToken' | 'apiKey'>;

// Pick only API settings for HTTP client
type HTTPConfig = Pick<CompleteSDKConfig, 'baseURL' | 'apiVersion' | 'timeout' | 'retryAttempts'>;

// Pick only feature flags
type FeatureConfig = Pick<
  CompleteSDKConfig,
  'enableWebhooks' | 'webhookSecret' | 'enableCaching' | 'cacheSize' | 'enableLogging' | 'logLevel'
>;

// Pick only performance settings
type PerformanceConfig = Pick<
  CompleteSDKConfig,
  'maxConcurrentRequests' | 'requestsPerSecond' | 'batchSize'
>;

class AuthManager {
  constructor(private config: AuthConfig) {
    console.log('Auth manager initialized');
  }

  getAccessToken(): string {
    return this.config.accessToken;
  }
}

class HTTPClient {
  constructor(private config: HTTPConfig) {
    console.log(`HTTP client initialized: ${config.baseURL}`);
  }

  getEndpoint(path: string): string {
    return `${this.config.baseURL}/${this.config.apiVersion}${path}`;
  }
}

class FeatureManager {
  constructor(private config: FeatureConfig) {
    console.log('Feature manager initialized');
  }

  isCachingEnabled(): boolean {
    return this.config.enableCaching;
  }

  getLogLevel(): string {
    return this.config.logLevel;
  }
}

// Each module receives only the config subset it needs
const fullConfig: CompleteSDKConfig = {
  accessToken: 'token_xxx',
  apiKey: 'key_xxx',
  baseURL: 'https://api.example.com',
  apiVersion: 'v17.0',
  timeout: 5000,
  retryAttempts: 3,
  enableWebhooks: true,
  enableCaching: true,
  cacheSize: 1000,
  enableLogging: true,
  logLevel: 'info',
  maxConcurrentRequests: 10,
  requestsPerSecond: 50,
  batchSize: 100
};

const authMgr = new AuthManager({
  accessToken: fullConfig.accessToken,
  refreshToken: fullConfig.refreshToken,
  apiKey: fullConfig.apiKey
});

const httpClient = new HTTPClient({
  baseURL: fullConfig.baseURL,
  apiVersion: fullConfig.apiVersion,
  timeout: fullConfig.timeout,
  retryAttempts: fullConfig.retryAttempts
});

const featureMgr = new FeatureManager({
  enableWebhooks: fullConfig.enableWebhooks,
  webhookSecret: fullConfig.webhookSecret,
  enableCaching: fullConfig.enableCaching,
  cacheSize: fullConfig.cacheSize,
  enableLogging: fullConfig.enableLogging,
  logLevel: fullConfig.logLevel
});

console.log('Access token:', authMgr.getAccessToken());
console.log('API endpoint:', httpClient.getEndpoint('/messages'));
console.log('Caching enabled:', featureMgr.isCachingEnabled());

console.log('✅ Example 5: SDK Config Subsets completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Pick<T, K> Summary:
-------------------
✓ Selects specific properties from a type
✓ Creates lightweight versions of heavy types
✓ Perfect for API response optimization
✓ Type-safe property selection
✓ Can't pick non-existent properties

Common use cases:
- API response summaries
- Database query projections
- Form field restrictions by role
- Module-specific configuration
- Public API surface from internal types

Pick vs Omit:
- Use Pick when selecting FEW from MANY
- Use Omit when excluding FEW from MANY
`);
