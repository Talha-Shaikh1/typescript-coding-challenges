/**
 * Day 18 - Exercise 5: Complete SDK Config System (Combining All)
 *
 * Task: Build a production-grade SDK configuration system using ALL utility types
 *
 * This exercise combines:
 * - Day 17: Partial, Pick, Omit, Record
 * - Day 18: Required, Readonly, Exclude, Extract
 *
 * Requirements:
 * 1. Define comprehensive SDKConfig interface
 * 2. Create environment system with type-safe configs
 * 3. Use at least 6 different utility types
 * 4. Implement validation and immutability
 * 5. Safe logging without secrets
 */

// TODO: Define SDKConfig interface
interface SDKConfig {
  // Required fields
  accessToken: string;
  phoneNumberId: string;

  // Optional fields with defaults
  apiVersion?: string;
  baseURL?: string;
  timeout?: number;
  retryAttempts?: number;
  debug?: boolean;

  // Sensitive optional
  webhookSecret?: string;
}


// TODO: Define Environment type
type Environment = 'development' | 'staging' | 'production';


// TODO: Create specialized config types using utility types

// RequiredConfig - Only required fields (use Pick)
type RequiredConfig = // Use Pick here


// OptionalConfig - Only optional fields (use Partial + Omit)
type OptionalConfig = // Use Partial and Omit here


// UserProvidedConfig - Required + Partial optional (what users pass)
type UserProvidedConfig = // Combine RequiredConfig with Partial<OptionalConfig>


// SafeConfig - Remove sensitive fields (use Omit)
type SafeConfig = // Use Omit here


// ProductionConfig - All fields required (use Required)
type ProductionConfig = // Use Required here


// ReadonlyConfig - Immutable config (use Readonly)
type ReadonlyConfig = // Use Readonly here


// ConfigDefaults - Map environments to default configs (use Record)
type ConfigDefaults = // Use Record here


// TODO: Define validation result type
interface ValidationResult {
  valid: boolean;
  errors: string[];
  config?: Required<SDKConfig>;
}


// TODO: Implement SDK class
class SDK {
  // Config is readonly and complete after initialization
  private readonly config: Readonly<Required<SDKConfig>>;
  private readonly environment: Environment;

  constructor(userConfig: UserProvidedConfig, env: Environment = 'development') {
    // Build complete config from user input and defaults
    // Make it readonly
    // Store environment
  }

  // Build complete config from user input and defaults
  private buildConfig(userConfig: UserProvidedConfig): Required<SDKConfig> {
    const defaults = this.getEnvironmentDefaults(this.environment);
    // Merge defaults with user config
    // User config should override defaults
    // Return complete config
  }

  // Get environment-specific defaults
  private getEnvironmentDefaults(env: Environment): Partial<SDKConfig> {
    const defaults: ConfigDefaults = {
      development: {
        apiVersion: 'v17.0',
        baseURL: 'https://graph.facebook.com',
        timeout: 10000,
        retryAttempts: 1,
        debug: true
      },
      staging: {
        apiVersion: 'v17.0',
        baseURL: 'https://graph.facebook.com',
        timeout: 5000,
        retryAttempts: 2,
        debug: true
      },
      production: {
        apiVersion: 'v17.0',
        baseURL: 'https://graph.facebook.com',
        timeout: 3000,
        retryAttempts: 3,
        debug: false
      }
    };

    return defaults[env];
  }

  // Get safe config (no secrets)
  getConfig(): SafeConfig {
    // Remove sensitive fields and return
  }

  // Get specific config value
  getConfigValue<K extends keyof SDKConfig>(key: K): SDKConfig[K] {
    // Return specific config value
  }

  // Validate config
  validateConfig(): ValidationResult {
    // Check that all required fields exist
    // Check that values are valid
    // Return validation result
  }

  // Update config (creates new SDK instance - immutable pattern)
  withConfig(updates: Partial<SDKConfig>): SDK {
    // Create new SDK with updated config
    // Don't allow updating accessToken
  }

  // Log config safely
  private logConfig(): void {
    // Log config without sensitive data
  }

  // Get current environment
  getEnvironment(): Environment {
    // Return environment
  }

  // Check if in debug mode
  isDebugMode(): boolean {
    // Return debug flag
  }

  // Check if production environment
  isProduction(): boolean {
    // Check if environment is production
  }
}


// TODO: Implement standalone validation function
function validateSDKConfig(
  config: UserProvidedConfig,
  env: Environment
): ValidationResult {
  // Validate config for given environment
  // Production requires all fields
  // Development allows partial
}


// TODO: Implement config comparison function
// Uses Readonly to prevent mutation during comparison
function compareConfigs(
  config1: Readonly<SDKConfig>,
  config2: Readonly<SDKConfig>
): boolean {
  // Compare two configs
  // Return true if identical
}


// TODO: Create type-safe config builder
class ConfigBuilder {
  private config: Partial<SDKConfig> = {};

  setAccessToken(token: string): this {
    this.config.accessToken = token;
    return this;
  }

  setPhoneNumberId(id: string): this {
    this.config.phoneNumberId = id;
    return this;
  }

  setTimeout(timeout: number): this {
    this.config.timeout = timeout;
    return this;
  }

  setDebug(debug: boolean): this {
    this.config.debug = debug;
    return this;
  }

  // Build config (validates required fields)
  build(): Required<SDKConfig> {
    // Validate that required fields exist
    // Fill optional fields with defaults
    // Return complete config
  }

  // Build for specific environment
  buildForEnvironment(env: Environment): Required<SDKConfig> {
    // Apply environment-specific defaults
    // Return complete config
  }
}


// TODO: Test your implementation
// Example usage:
/*
// Create SDK for development
const devSDK = new SDK({
  accessToken: 'dev_token_xxx',
  phoneNumberId: '123456789',
  timeout: 15000
}, 'development');

console.log('Dev config:', devSDK.getConfig());
console.log('Is debug mode?', devSDK.isDebugMode());
console.log('Environment:', devSDK.getEnvironment());

// Create SDK for production
const prodSDK = new SDK({
  accessToken: 'prod_token_xxx',
  phoneNumberId: '987654321'
}, 'production');

console.log('Prod config:', prodSDK.getConfig());
console.log('Is production?', prodSDK.isProduction());

// Validate config
const validation = prodSDK.validateConfig();
console.log('Valid?', validation.valid);

// Create new SDK with updated config (immutable)
const updatedSDK = devSDK.withConfig({ timeout: 20000 });
console.log('Updated timeout:', updatedSDK.getConfigValue('timeout'));

// Use ConfigBuilder
const builder = new ConfigBuilder();
const config = builder
  .setAccessToken('token_xxx')
  .setPhoneNumberId('123')
  .setTimeout(5000)
  .setDebug(false)
  .buildForEnvironment('production');

console.log('Built config:', config);
*/


// TODO: Bonus - Implement config preset system
type ConfigPreset = 'minimal' | 'standard' | 'maximum';

const configPresets: Record<ConfigPreset, Partial<SDKConfig>> = {
  minimal: {
    timeout: 3000,
    retryAttempts: 1,
    debug: false
  },
  standard: {
    timeout: 5000,
    retryAttempts: 3,
    debug: false
  },
  maximum: {
    timeout: 10000,
    retryAttempts: 5,
    debug: true
  }
};

function createSDKWithPreset(
  required: RequiredConfig,
  preset: ConfigPreset,
  env: Environment
): SDK {
  // Merge required fields with preset
  // Create SDK
}
