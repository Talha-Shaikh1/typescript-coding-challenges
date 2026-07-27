/**
 * Day 17 - Example 1: Partial<T> Utility Type
 *
 * Demonstrates how Partial makes all properties optional
 * Use case: Configuration updates, partial data modifications
 */

// ============================================
// Example 1: Basic Partial Usage
// ============================================

interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  bio: string;
}

// Without Partial - must provide all fields
function createUser(data: UserProfile): UserProfile {
  return data;
}

// With Partial - can provide any subset of fields
function updateUser(id: string, updates: Partial<UserProfile>): void {
  console.log(`Updating user ${id} with:`, updates);
  // In real app: merge updates with existing user data
}

// Usage
const newUser = createUser({
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  bio: 'Software developer'
});

// Update only specific fields
updateUser('1', { name: 'John Smith' });
updateUser('1', { age: 31, bio: 'Senior developer' });
updateUser('1', {}); // Valid - no updates

console.log('✅ Example 1: Basic Partial completed\n');


// ============================================
// Example 2: SDK Configuration Updates
// ============================================

interface WhatsAppSDKConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
  timeout: number;
  retryAttempts: number;
  baseURL: string;
  debug: boolean;
}

class WhatsAppClient {
  private config: WhatsAppSDKConfig;

  constructor(config: WhatsAppSDKConfig) {
    this.config = config;
    console.log('SDK initialized with config');
  }

  // Users can update any config field without providing all
  updateConfig(updates: Partial<WhatsAppSDKConfig>): void {
    this.config = { ...this.config, ...updates };
    console.log('Config updated:', updates);
  }

  getTimeout(): number {
    return this.config.timeout;
  }

  isDebugMode(): boolean {
    return this.config.debug;
  }
}

// Initialize with full config
const client = new WhatsAppClient({
  accessToken: 'EAAxxxxxx',
  phoneNumberId: '123456789',
  apiVersion: 'v17.0',
  timeout: 5000,
  retryAttempts: 3,
  baseURL: 'https://graph.facebook.com',
  debug: false
});

// Update only what changes
client.updateConfig({ timeout: 10000 });
console.log('New timeout:', client.getTimeout());

client.updateConfig({ debug: true, retryAttempts: 5 });
console.log('Debug mode:', client.isDebugMode());

console.log('✅ Example 2: SDK Config Updates completed\n');


// ============================================
// Example 3: Form Data with Defaults
// ============================================

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  agreeToTerms: boolean;
  newsletter: boolean;
  country: string;
  language: string;
}

// Default form values
const defaultFormData: RegistrationForm = {
  username: '',
  email: '',
  password: '',
  agreeToTerms: false,
  newsletter: false,
  country: 'US',
  language: 'en'
};

// Initialize form with defaults and optional overrides
function initializeForm(overrides?: Partial<RegistrationForm>): RegistrationForm {
  return { ...defaultFormData, ...overrides };
}

// Create form with some pre-filled values
const form1 = initializeForm();
console.log('Empty form:', form1);

const form2 = initializeForm({
  country: 'UK',
  language: 'en-GB'
});
console.log('Form with country override:', form2);

const form3 = initializeForm({
  username: 'john_doe',
  email: 'john@example.com',
  newsletter: true
});
console.log('Form with user data:', form3);

console.log('✅ Example 3: Form Defaults completed\n');


// ============================================
// Example 4: Database Entity Updates
// ============================================

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

class ProductRepository {
  private products: Map<string, Product> = new Map();

  create(product: Product): void {
    this.products.set(product.id, product);
    console.log(`Product created: ${product.name}`);
  }

  // Update accepts partial data - only changed fields
  update(id: string, updates: Partial<Product>): Product | undefined {
    const existing = this.products.get(id);

    if (!existing) {
      console.log(`Product ${id} not found`);
      return undefined;
    }

    const updated: Product = {
      ...existing,
      ...updates,
      updatedAt: new Date() // Always update timestamp
    };

    this.products.set(id, updated);
    console.log(`Product updated: ${id}`, updates);
    return updated;
  }

  get(id: string): Product | undefined {
    return this.products.get(id);
  }
}

const repo = new ProductRepository();

// Create product with all fields
repo.create({
  id: 'prod-1',
  name: 'Laptop',
  description: 'Gaming laptop',
  price: 1299.99,
  stock: 50,
  category: 'Electronics',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Update only price and stock
repo.update('prod-1', {
  price: 1199.99,
  stock: 45
});

// Update only description
repo.update('prod-1', {
  description: 'High-performance gaming laptop with RTX 4080'
});

const product = repo.get('prod-1');
console.log('Final product:', product);

console.log('✅ Example 4: Entity Updates completed\n');


// ============================================
// Example 5: Partial with Nested Objects
// ============================================

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Company {
  name: string;
  address: Address;
  employees: number;
  founded: number;
}

// Note: Partial only makes first level optional, not nested
function updateCompany(id: string, updates: Partial<Company>): void {
  console.log(`Updating company ${id}`);

  // If updating address, must provide full Address object
  // Partial doesn't make nested properties optional
  if (updates.address) {
    console.log('Address update:', updates.address);
  }

  if (updates.name) {
    console.log('Name update:', updates.name);
  }
}

// ✅ Valid: Update top-level field
updateCompany('comp-1', {
  name: 'TechCorp Inc.'
});

// ✅ Valid: Update nested object (must be complete)
updateCompany('comp-1', {
  address: {
    street: '123 Main St',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA'
  }
});

// ❌ Invalid: Partial address not allowed
// updateCompany('comp-1', {
//   address: { city: 'New York' }  // Error: missing required fields
// });

// For nested partials, you need custom type:
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function updateCompanyDeep(id: string, updates: DeepPartial<Company>): void {
  console.log(`Deep update company ${id}:`, updates);
}

// ✅ Now partial nested updates work
updateCompanyDeep('comp-1', {
  address: { city: 'New York' } // Only city, rest optional
});

console.log('✅ Example 5: Nested Partial completed\n');


// ============================================
// Example 6: Real-World SDK Example
// ============================================

interface MessageTemplate {
  id: string;
  name: string;
  language: string;
  category: 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
  components: Array<{
    type: string;
    text: string;
  }>;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

class TemplateManager {
  private templates: Map<string, MessageTemplate> = new Map();

  create(template: MessageTemplate): void {
    this.templates.set(template.id, template);
    console.log(`Template created: ${template.name}`);
  }

  // Partial update for template modifications
  update(id: string, updates: Partial<MessageTemplate>): boolean {
    const template = this.templates.get(id);

    if (!template) {
      console.log(`Template ${id} not found`);
      return false;
    }

    // Some fields shouldn't be updated after creation
    if (updates.id && updates.id !== id) {
      console.log('Cannot change template ID');
      return false;
    }

    const updated = { ...template, ...updates };
    this.templates.set(id, updated);
    console.log(`Template updated: ${id}`);
    return true;
  }

  // Approve template (specific update)
  approve(id: string): boolean {
    return this.update(id, { status: 'APPROVED' });
  }

  // Reject template (specific update)
  reject(id: string): boolean {
    return this.update(id, { status: 'REJECTED' });
  }
}

const templateMgr = new TemplateManager();

templateMgr.create({
  id: 'tmpl-1',
  name: 'welcome_message',
  language: 'en',
  category: 'MARKETING',
  components: [
    { type: 'BODY', text: 'Welcome {{1}}!' }
  ],
  status: 'PENDING'
});

// Update just the name
templateMgr.update('tmpl-1', {
  name: 'welcome_new_user'
});

// Approve template
templateMgr.approve('tmpl-1');

console.log(' Example 6: Template Manager completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Partial<T> Summary:
-------------------
✓ Makes all properties optional
✓ Perfect for update functions
✓ Enables flexible configuration
✓ Only affects first level (not nested)
✓ Maintains type safety

Common use cases:
- Configuration updates
- Partial form data
- Entity updates in database
- Optional overrides for defaults
- PATCH API endpoints
`);
