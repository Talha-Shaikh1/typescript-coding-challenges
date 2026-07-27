/**
 * Day 18 - Example 2: Readonly<T> Utility Type
 *
 * Demonstrates how Readonly makes all properties immutable
 * Use case: Immutable data, configuration lock, preventing accidental mutations
 */

// ============================================
// Example 1: Basic Readonly Usage
// ============================================

interface User {
  id: string;
  name: string;
  email: string;
}

// Without Readonly - can be mutated
const mutableUser: User = {
  id: '1',
  name: 'John',
  email: 'john@example.com'
};

mutableUser.name = 'Jane'; // ✅ Allowed
console.log('Mutated user:', mutableUser);

// With Readonly - cannot be mutated
const immutableUser: Readonly<User> = {
  id: '2',
  name: 'Alice',
  email: 'alice@example.com'
};

// immutableUser.name = 'Bob'; // ❌ TypeScript Error: Cannot assign to 'name'
console.log('Immutable user:', immutableUser);

console.log('✅ Example 1: Basic Readonly completed\n');


// ============================================
// Example 2: Immutable SDK Configuration
// ============================================

interface SDKConfig {
  accessToken: string;
  apiEndpoint: string;
  timeout: number;
  retryAttempts: number;
  debug: boolean;
}

class WhatsAppSDK {
  // Config is readonly - cannot be changed after initialization
  private readonly config: Readonly<SDKConfig>;

  constructor(config: SDKConfig) {
    // Freeze config for runtime immutability
    this.config = Object.freeze(config);
    console.log('SDK initialized with immutable config');
  }

  // Expose readonly config to external code
  getConfig(): Readonly<SDKConfig> {
    return this.config;
  }

  // Cannot modify config internally
  private someMethod(): void {
    // this.config.timeout = 999; // ❌ Error: Cannot assign to readonly
    console.log('Using timeout:', this.config.timeout);
  }

  // To update config, create new instance
  withTimeout(newTimeout: number): WhatsAppSDK {
    return new WhatsAppSDK({
      ...this.config,
      timeout: newTimeout
    });
  }

  // To update multiple fields, create new instance
  withConfig(updates: Partial<SDKConfig>): WhatsAppSDK {
    return new WhatsAppSDK({
      ...this.config,
      ...updates
    });
  }
}

const sdk = new WhatsAppSDK({
  accessToken: 'token_xxx',
  apiEndpoint: 'https://api.example.com',
  timeout: 5000,
  retryAttempts: 3,
  debug: false
});

const config = sdk.getConfig();
console.log('Config:', config);
// config.timeout = 999; // ❌ Error: readonly

// Create new instance with different timeout
const newSdk = sdk.withTimeout(10000);
console.log('New SDK timeout:', newSdk.getConfig().timeout);

console.log('✅ Example 2: Immutable SDK Config completed\n');


// ============================================
// Example 3: Immutable State Management
// ============================================

interface AppState {
  user: {
    id: string;
    name: string;
  } | null;
  isAuthenticated: boolean;
  theme: 'light' | 'dark';
  notifications: number;
}

class StateManager {
  private state: Readonly<AppState>;
  private listeners: Array<(state: Readonly<AppState>) => void> = [];

  constructor(initialState: AppState) {
    this.state = initialState;
  }

  // Get current state (readonly)
  getState(): Readonly<AppState> {
    return this.state;
  }

  // Update state (creates new state object)
  setState(newState: AppState): void {
    const oldState = this.state;
    this.state = newState;
    this.notifyListeners();
    console.log('State updated:', { old: oldState, new: this.state });
  }

  // Update partial state (immutable pattern)
  updateState(updates: Partial<AppState>): void {
    this.state = { ...this.state, ...updates };
    this.notifyListeners();
    console.log('State updated with:', updates);
  }

  // Subscribe to state changes
  subscribe(listener: (state: Readonly<AppState>) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}

const stateManager = new StateManager({
  user: null,
  isAuthenticated: false,
  theme: 'light',
  notifications: 0
});

// Subscribe to state changes
const unsubscribe = stateManager.subscribe((state) => {
  console.log('  [Subscriber] State changed:', state);
});

const currentState = stateManager.getState();
console.log('Initial state:', currentState);

// Can't mutate state directly
// currentState.theme = 'dark'; // ❌ Error: readonly

// Update state immutably
stateManager.updateState({
  user: { id: '1', name: 'John' },
  isAuthenticated: true
});

stateManager.updateState({
  notifications: 5
});

unsubscribe();

console.log('✅ Example 3: Immutable State Management completed\n');


// ============================================
// Example 4: Readonly Function Parameters
// ============================================

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

// Accept readonly parameter to prevent mutations
function displayProduct(product: Readonly<Product>): void {
  console.log(`Product: ${product.name} - $${product.price}`);
  // product.price = 999; // ❌ Error: Cannot modify readonly
}

// Function that needs to modify should accept regular type
function applyDiscount(product: Product, discount: number): Product {
  product.price = product.price * (1 - discount);
  return product;
}

// Safe logging function - won't mutate products
function logProducts(products: ReadonlyArray<Readonly<Product>>): void {
  console.log('Products:', products.length);
  products.forEach(p => console.log(`  - ${p.name}`));

  // products.push({...}); // ❌ Error: readonly array
  // products[0].price = 999; // ❌ Error: readonly product
}

const product: Product = {
  id: '1',
  name: 'Laptop',
  price: 1000,
  stock: 50
};

displayProduct(product); // Safe - won't mutate
applyDiscount(product, 0.1); // Mutates product
console.log('After discount:', product.price);

const products: Product[] = [product];
logProducts(products);

console.log('✅ Example 4: Readonly Parameters completed\n');


// ============================================
// Example 5: Readonly Arrays and Objects
// ============================================

// Readonly array - can't add/remove/modify elements
const numbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];

console.log('Numbers:', numbers);
console.log('First:', numbers[0]);
console.log('Filtered:', numbers.filter(n => n > 2));

// numbers.push(6); // ❌ Error: no push method
// numbers[0] = 999; // ❌ Error: readonly
// numbers.sort(); // ❌ Error: sort mutates array

// To modify, create new array
const newNumbers = [...numbers, 6];
console.log('New numbers:', newNumbers);

// Readonly record/object
const config: Readonly<Record<string, number>> = {
  timeout: 5000,
  retries: 3
};

console.log('Config:', config);
console.log('Timeout:', config.timeout);

// config.timeout = 999; // ❌ Error: readonly
// config.newField = 123; // ❌ Error: readonly

// To modify, create new object
const newConfig = { ...config, timeout: 10000 };
console.log('New config:', newConfig);

console.log('✅ Example 5: Readonly Arrays and Objects completed\n');


// ============================================
// Example 6: Deep vs Shallow Readonly
// ============================================

interface Company {
  name: string;
  address: {
    street: string;
    city: string;
  };
  employees: string[];
}

const company: Readonly<Company> = {
  name: 'TechCorp',
  address: {
    street: '123 Main St',
    city: 'NYC'
  },
  employees: ['John', 'Jane']
};

// Shallow readonly - top level is readonly
// company.name = 'NewCorp'; // ❌ Error: readonly

// But nested objects are still mutable!
company.address.city = 'LA'; // ✅ No error - nested is mutable
company.employees.push('Bob'); // ✅ No error - array is mutable

console.log('Company after mutations:', company);

// For deep readonly, use custom type
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P];
};

const deepReadonlyCompany: DeepReadonly<Company> = {
  name: 'TechCorp',
  address: {
    street: '123 Main St',
    city: 'NYC'
  },
  employees: ['John', 'Jane']
};

// Now everything is readonly
// deepReadonlyCompany.name = 'NewCorp'; // ❌ Error
// deepReadonlyCompany.address.city = 'LA'; // ❌ Error
// deepReadonlyCompany.employees.push('Bob'); // ❌ Error (but type doesn't catch array methods)

console.log('Deep readonly company:', deepReadonlyCompany);

console.log('✅ Example 6: Deep vs Shallow Readonly completed\n');


// ============================================
// Example 7: Readonly with Object.freeze()
// ============================================

interface Config {
  apiKey: string;
  endpoint: string;
  timeout: number;
}

// TypeScript readonly - compile-time only
const tsConfig: Readonly<Config> = {
  apiKey: 'key_xxx',
  endpoint: 'https://api.example.com',
  timeout: 5000
};

// tsConfig.timeout = 999; // ❌ TypeScript error

// But at runtime, can still be mutated!
// (tsConfig as any).timeout = 999; // Would work at runtime

// Object.freeze() - runtime immutability
const frozenConfig: Readonly<Config> = Object.freeze({
  apiKey: 'key_xxx',
  endpoint: 'https://api.example.com',
  timeout: 5000
});

// frozenConfig.timeout = 999; // ❌ TypeScript error

try {
  (frozenConfig as any).timeout = 999; // Runtime: silently fails in non-strict, throws in strict
  console.log('Timeout after mutation:', frozenConfig.timeout); // Still 5000
} catch (error) {
  console.log('Cannot mutate frozen object');
}

// Best practice: Use both TypeScript readonly and Object.freeze()
function createImmutableConfig(config: Config): Readonly<Config> {
  return Object.freeze(config);
}

const immutableConfig = createImmutableConfig({
  apiKey: 'key_xxx',
  endpoint: 'https://api.example.com',
  timeout: 5000
});

console.log('Immutable config:', immutableConfig);

console.log('✅ Example 7: Readonly with Object.freeze completed\n');


// ============================================
// Example 8: Readonly in Classes
// ============================================

class User {
  // Readonly properties can only be set in constructor
  readonly id: string;
  readonly createdAt: Date;

  // Regular properties can be changed
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id;
    this.createdAt = new Date();
    this.name = name;
    this.email = email;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail; // ✅ OK
    // this.id = 'new-id'; // ❌ Error: readonly
    // this.createdAt = new Date(); // ❌ Error: readonly
  }

  getProfile(): Readonly<{ id: string; name: string; email: string; createdAt: Date }> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt
    };
  }
}

const user = new User('1', 'John', 'john@example.com');
console.log('User:', user);

user.updateEmail('john.doe@example.com');
console.log('Updated email:', user.email);

// user.id = '2'; // ❌ Error: readonly

const profile = user.getProfile();
console.log('Profile:', profile);
// profile.name = 'Jane'; // ❌ Error: readonly

console.log('✅ Example 8: Readonly in Classes completed\n');


// ============================================
// Example 9: Practical SDK Example
// ============================================

interface MessageTemplate {
  id: string;
  name: string;
  language: string;
  body: string;
  createdAt: Date;
}

class TemplateManager {
  private templates: Map<string, Readonly<MessageTemplate>> = new Map();

  // Add template (stored as readonly)
  add(template: MessageTemplate): void {
    const immutable = Object.freeze(template);
    this.templates.set(template.id, immutable);
    console.log(`Template added: ${template.name}`);
  }

  // Get template (returns readonly)
  get(id: string): Readonly<MessageTemplate> | undefined {
    return this.templates.get(id);
  }

  // Get all templates (returns readonly array)
  getAll(): ReadonlyArray<Readonly<MessageTemplate>> {
    return Array.from(this.templates.values());
  }

  // Update template (creates new immutable copy)
  update(id: string, updates: Partial<MessageTemplate>): boolean {
    const existing = this.templates.get(id);
    if (!existing) {
      return false;
    }

    // Create new immutable template
    const updated = Object.freeze({
      ...existing,
      ...updates
    });

    this.templates.set(id, updated);
    console.log(`Template updated: ${id}`);
    return true;
  }

  // Delete template
  delete(id: string): boolean {
    const deleted = this.templates.delete(id);
    if (deleted) {
      console.log(`Template deleted: ${id}`);
    }
    return deleted;
  }
}

const templateMgr = new TemplateManager();

templateMgr.add({
  id: 'tmpl-1',
  name: 'welcome',
  language: 'en',
  body: 'Welcome {{name}}!',
  createdAt: new Date()
});

const template = templateMgr.get('tmpl-1');
if (template) {
  console.log('Template:', template.name);
  // template.body = 'Changed'; // ❌ Error: readonly
}

templateMgr.update('tmpl-1', {
  body: 'Welcome back {{name}}!'
});

const allTemplates = templateMgr.getAll();
console.log('All templates:', allTemplates.length);

console.log('✅ Example 9: Practical SDK Example completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Readonly<T> Summary:
--------------------
✓ Makes all properties read-only
✓ Prevents accidental mutations
✓ Compile-time type safety
✓ Use with Object.freeze() for runtime safety
✓ Only affects first level (shallow readonly)

Common use cases:
- Immutable configuration
- State management (Redux-like patterns)
- Function parameters that shouldn't mutate
- Protecting shared data structures
- Preventing accidental modifications

How it works:
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

Important notes:
1. Shallow readonly - nested objects are mutable
2. TypeScript only - add Object.freeze() for runtime
3. ReadonlyArray<T> for immutable arrays
4. Use readonly keyword in classes for properties

Best practices:
- Use readonly for config after initialization
- Use Readonly<T> for function parameters
- Combine with Object.freeze() for runtime safety
- Create new objects for updates (immutable pattern)
`);
