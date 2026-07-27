/**
 * Day 18 - Example 1: Required<T> Utility Type
 *
 * Demonstrates how Required makes all properties required (removes ?)
 * Use case: Production validation, complete configuration, mandatory fields
 */

// ============================================
// Example 1: Basic Required Usage
// ============================================

interface Config {
  apiKey: string;
  timeout?: number;
  retries?: number;
  debug?: boolean;
}

// Without Required - optional fields can be missing
function initDevelopment(config: Config): void {
  console.log('Dev config:', config);
  // config.timeout might be undefined
  const timeout = config.timeout ?? 5000;
}

// With Required - all fields must be provided
function initProduction(config: Required<Config>): void {
  console.log('Prod config:', config);
  // config.timeout is guaranteed to exist
  const timeout = config.timeout; // number, not number | undefined
}

// Development - partial config OK
initDevelopment({
  apiKey: 'dev-key',
  debug: true
  // timeout and retries optional
});

// Production - all fields required
initProduction({
  apiKey: 'prod-key',
  timeout: 3000,
  retries: 3,
  debug: false
  // Must provide ALL fields
});

console.log('✅ Example 1: Basic Required completed\n');


// ============================================
// Example 2: Config Validator with Required
// ============================================

interface AppSettings {
  apiVersion?: string;
  baseURL?: string;
  timeout?: number;
  maxRetries?: number;
  enableCache?: boolean;
  logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

class ConfigValidator {
  private defaults: Required<AppSettings> = {
    apiVersion: 'v1.0',
    baseURL: 'https://api.example.com',
    timeout: 5000,
    maxRetries: 3,
    enableCache: true,
    logLevel: 'info'
  };

  // Accept partial config, return complete config
  validate(userConfig: AppSettings): Required<AppSettings> {
    // Merge with defaults
    const complete: Required<AppSettings> = {
      apiVersion: userConfig.apiVersion ?? this.defaults.apiVersion,
      baseURL: userConfig.baseURL ?? this.defaults.baseURL,
      timeout: userConfig.timeout ?? this.defaults.timeout,
      maxRetries: userConfig.maxRetries ?? this.defaults.maxRetries,
      enableCache: userConfig.enableCache ?? this.defaults.enableCache,
      logLevel: userConfig.logLevel ?? this.defaults.logLevel
    };

    return complete;
  }

  // Validate that all fields are explicitly set (no defaults)
  validateStrict(config: AppSettings): Required<AppSettings> {
    const missing: string[] = [];

    if (config.apiVersion === undefined) missing.push('apiVersion');
    if (config.baseURL === undefined) missing.push('baseURL');
    if (config.timeout === undefined) missing.push('timeout');
    if (config.maxRetries === undefined) missing.push('maxRetries');
    if (config.enableCache === undefined) missing.push('enableCache');
    if (config.logLevel === undefined) missing.push('logLevel');

    if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
    }

    return config as Required<AppSettings>;
  }

  getDefaults(): Required<AppSettings> {
    return { ...this.defaults };
  }
}

const validator = new ConfigValidator();

// Partial config - filled with defaults
const config1 = validator.validate({
  baseURL: 'https://custom.api.com'
});
console.log('Config with defaults:', config1);

// Complete config - all fields provided
const config2 = validator.validate({
  apiVersion: 'v2.0',
  baseURL: 'https://api.example.com',
  timeout: 10000,
  maxRetries: 5,
  enableCache: false,
  logLevel: 'debug'
});
console.log('Complete config:', config2);

// Strict validation - throws if any field missing
try {
  validator.validateStrict({
    apiVersion: 'v1.0'
    // Missing other fields
  });
} catch (error) {
  console.error('Strict validation failed:', (error as Error).message);
}

console.log('✅ Example 2: Config Validator completed\n');


// ============================================
// Example 3: Environment-Based Required Fields
// ============================================

interface SDKConfig {
  accessToken: string;
  apiEndpoint: string;
  timeout?: number;
  retryAttempts?: number;
  debug?: boolean;
  cacheSize?: number;
}

type Environment = 'development' | 'staging' | 'production';

class EnvironmentConfig {
  // Development allows partial config
  initDevelopment(config: SDKConfig): void {
    console.log('Development mode - partial config OK');
    console.log('Timeout:', config.timeout ?? 'using default');
  }

  // Production requires all fields
  initProduction(config: Required<SDKConfig>): void {
    console.log('Production mode - all fields required');
    console.log('Timeout:', config.timeout); // Always defined
    console.log('Debug:', config.debug); // Always defined
  }

  // Smart initialization based on environment
  init(config: SDKConfig, env: Environment): Required<SDKConfig> {
    const productionDefaults: Required<SDKConfig> = {
      accessToken: config.accessToken,
      apiEndpoint: config.apiEndpoint,
      timeout: config.timeout ?? 3000,
      retryAttempts: config.retryAttempts ?? 3,
      debug: config.debug ?? false,
      cacheSize: config.cacheSize ?? 1000
    };

    const developmentDefaults: Required<SDKConfig> = {
      accessToken: config.accessToken,
      apiEndpoint: config.apiEndpoint,
      timeout: config.timeout ?? 10000,
      retryAttempts: config.retryAttempts ?? 1,
      debug: config.debug ?? true,
      cacheSize: config.cacheSize ?? 100
    };

    const stagingDefaults: Required<SDKConfig> = {
      accessToken: config.accessToken,
      apiEndpoint: config.apiEndpoint,
      timeout: config.timeout ?? 5000,
      retryAttempts: config.retryAttempts ?? 2,
      debug: config.debug ?? true,
      cacheSize: config.cacheSize ?? 500
    };

    switch (env) {
      case 'production':
        return productionDefaults;
      case 'staging':
        return stagingDefaults;
      case 'development':
        return developmentDefaults;
    }
  }
}

const envConfig = new EnvironmentConfig();

const devConfig = envConfig.init({
  accessToken: 'dev-token',
  apiEndpoint: 'http://localhost:3000'
}, 'development');
console.log('Dev config:', devConfig);

const prodConfig = envConfig.init({
  accessToken: 'prod-token',
  apiEndpoint: 'https://api.production.com',
  timeout: 2000
}, 'production');
console.log('Prod config:', prodConfig);

console.log('✅ Example 3: Environment-Based Required completed\n');


// ============================================
// Example 4: Database Entity Validation
// ============================================

interface UserEntity {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  address?: string;
  city?: string;
  country?: string;
}

class UserRepository {
  private users: Map<string, Required<UserEntity>> = new Map();

  // Create user - all fields must be provided
  create(user: Required<UserEntity>): void {
    this.users.set(user.id, user);
    console.log(`User created: ${user.firstName} ${user.lastName}`);
  }

  // Update allows partial updates
  update(id: string, updates: Partial<UserEntity>): Required<UserEntity> | undefined {
    const user = this.users.get(id);
    if (!user) {
      console.log(`User ${id} not found`);
      return undefined;
    }

    const updated: Required<UserEntity> = { ...user, ...updates };
    this.users.set(id, updated);
    console.log(`User ${id} updated`);
    return updated;
  }

  // Get user - returns complete entity
  get(id: string): Required<UserEntity> | undefined {
    return this.users.get(id);
  }

  // Validate that entity has all required fields before saving
  validateComplete(user: UserEntity): user is Required<UserEntity> {
    return (
      user.id !== undefined &&
      user.email !== undefined &&
      user.firstName !== undefined &&
      user.lastName !== undefined &&
      user.phoneNumber !== undefined &&
      user.address !== undefined &&
      user.city !== undefined &&
      user.country !== undefined
    );
  }
}

const userRepo = new UserRepository();

// Create with all fields
userRepo.create({
  id: '1',
  email: 'john@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+1234567890',
  address: '123 Main St',
  city: 'New York',
  country: 'USA'
});

// Update only specific fields
userRepo.update('1', {
  phoneNumber: '+0987654321',
  address: '456 Oak Ave'
});

const user = userRepo.get('1');
console.log('User:', user);

console.log('✅ Example 4: Database Entity Validation completed\n');


// ============================================
// Example 5: API Request Validation
// ============================================

interface APIRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

class APIClient {
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  // Build complete request from partial input
  private buildRequest(request: APIRequest): Required<APIRequest> {
    return {
      endpoint: request.endpoint,
      method: request.method,
      headers: { ...this.defaultHeaders, ...request.headers },
      body: request.body ?? null,
      timeout: request.timeout ?? 5000,
      retries: request.retries ?? 3
    };
  }

  async send(request: APIRequest): Promise<any> {
    const complete = this.buildRequest(request);
    console.log('Sending request:', complete);

    // All fields guaranteed to exist
    console.log(`${complete.method} ${complete.endpoint}`);
    console.log(`Timeout: ${complete.timeout}ms`);
    console.log(`Retries: ${complete.retries}`);
    console.log('Headers:', complete.headers);

    return { status: 200, data: 'Success' };
  }
}

const apiClient = new APIClient();

// Minimal request
apiClient.send({
  endpoint: '/users',
  method: 'GET'
});

// Request with custom options
apiClient.send({
  endpoint: '/users',
  method: 'POST',
  headers: { 'Authorization': 'Bearer token' },
  body: { name: 'John' },
  timeout: 10000
});

console.log('✅ Example 5: API Request Validation completed\n');


// ============================================
// Example 6: Form Validation
// ============================================

interface RegistrationForm {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  agreeToTerms?: boolean;
  newsletter?: boolean;
}

interface ValidationError {
  field: string;
  message: string;
}

class FormValidator {
  // Validate that all required fields are present
  validateRegistration(form: RegistrationForm): {
    valid: boolean;
    errors: ValidationError[];
    data?: Required<RegistrationForm>;
  } {
    const errors: ValidationError[] = [];

    // Check required fields
    if (!form.username) {
      errors.push({ field: 'username', message: 'Username is required' });
    }
    if (!form.email) {
      errors.push({ field: 'email', message: 'Email is required' });
    }
    if (!form.password) {
      errors.push({ field: 'password', message: 'Password is required' });
    }

    // Fill optional fields with defaults
    const complete: Required<RegistrationForm> = {
      username: form.username,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword ?? form.password,
      agreeToTerms: form.agreeToTerms ?? false,
      newsletter: form.newsletter ?? false
    };

    // Additional validations
    if (complete.confirmPassword !== complete.password) {
      errors.push({ field: 'confirmPassword', message: 'Passwords must match' });
    }

    if (!complete.agreeToTerms) {
      errors.push({ field: 'agreeToTerms', message: 'Must agree to terms' });
    }

    return {
      valid: errors.length === 0,
      errors,
      data: errors.length === 0 ? complete : undefined
    };
  }
}

const formValidator = new FormValidator();

// Invalid form
const result1 = formValidator.validateRegistration({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'password123'
  // Missing confirmPassword and agreeToTerms
});

console.log('Validation result 1:', result1);

// Valid form
const result2 = formValidator.validateRegistration({
  username: 'jane_doe',
  email: 'jane@example.com',
  password: 'secure_pass',
  confirmPassword: 'secure_pass',
  agreeToTerms: true,
  newsletter: true
});

console.log('Validation result 2:', result2);

console.log('✅ Example 6: Form Validation completed\n');


// ============================================
// Example 7: Required with Nested Objects
// ============================================

interface Address {
  street?: string;
  city?: string;
  country?: string;
}

interface Company {
  name: string;
  address?: Address;
  employees?: number;
}

// Required only makes first level required, not nested
type RequiredCompany = Required<Company>;
// Result: { name: string; address: Address; employees: number }
// Note: address properties are still optional!

const company: RequiredCompany = {
  name: 'TechCorp',
  address: {
    city: 'NYC' // street and country still optional
  },
  employees: 100
};

console.log('Company:', company);
console.log('Street:', company.address?.street); // Still optional

// For deep required, use custom type:
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

type DeepRequiredCompany = DeepRequired<Company>;
// Result: All nested properties are required

console.log('✅ Example 7: Required with Nested Objects completed\n');


// ============================================
// Summary
// ============================================

console.log(`
📚 Required<T> Summary:
--------------------
✓ Makes all optional properties required
✓ Removes ? from all properties
✓ Opposite of Partial<T>
✓ Perfect for validation and production configs
✓ Only affects first level (not nested objects)

Common use cases:
- Production configuration validation
- Ensuring complete data before processing
- Database entity creation
- API request building with defaults
- Form validation before submission

How it works:
type Required<T> = {
  [P in keyof T]-?: T[P]
}

The -? modifier removes the optional flag

Partial vs Required:
- Partial<T> adds ? to all properties
- Required<T> removes ? from all properties
- They are opposites
`);
