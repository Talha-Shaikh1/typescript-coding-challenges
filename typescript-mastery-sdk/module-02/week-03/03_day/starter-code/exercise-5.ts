/**
 * Day 17 - Exercise 5: SDK Client Builder (Combining Utilities)
 *
 * Task: Build a complete SDK configuration system using all utility types
 *
 * Requirements:
 * 1. Define SDKConfig with required and optional fields
 * 2. Create specialized types using Partial, Pick, Omit, Record
 * 3. Implement SDKClient with config management
 * 4. Support environment-specific defaults
 */

// TODO: Define SDKConfig interface
interface SDKConfig {
  // Required fields
  accessToken: string;
  phoneNumberId: string;

  // Optional fields with defaults
  apiVersion: string;
  baseURL: string;
  timeout: number;
  retryAttempts: number;
  debug: boolean;

  // Sensitive optional
  webhookSecret?: string;
}


// TODO: Create specialized config types

// RequiredConfig - Only required fields using Pick
type RequiredConfig = // Use Pick here


// OptionalConfig - Only optional fields, made partial using Partial + Omit
type OptionalConfig = // Use Partial and Omit here


// UserProvidedConfig - Required + Partial optional (what users pass to constructor)
type UserProvidedConfig = // Combine RequiredConfig with Partial<OptionalConfig>


// SafeConfig - Config without sensitive fields using Omit
type SafeConfig = // Use Omit here


// Environment type
type Environment = 'development' | 'staging' | 'production';


// ConfigDefaults - Record mapping environment to default configs
type ConfigDefaults = // Use Record here


// TODO: Implement SDKClient class
class SDKClient {
  private config: SDKConfig;
  private environment: Environment;

  constructor(userConfig: UserProvidedConfig, env: Environment = 'development') {
    this.environment = env;
    // Merge user config with environment defaults
    this.config = this.buildConfig(userConfig);
    this.logInitialization();
  }

  // Build complete config from user input and defaults
  private buildConfig(userConfig: UserProvidedConfig): SDKConfig {
    const defaults = this.getEnvironmentDefaults(this.environment);
    // Merge defaults with user config
    // User config should override defaults
    return {} as SDKConfig; // Replace with actual implementation
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

  // Update config with partial updates
  updateConfig(updates: Partial<SDKConfig>): void {
    // Merge updates into existing config
    // Don't allow updating accessToken for security
    if ('accessToken' in updates) {
      console.warn('Cannot update accessToken after initialization');
      delete updates.accessToken;
    }

    // Implement merge logic
  }

  // Get safe config (without sensitive data)
  getConfig(): SafeConfig {
    // Return config without sensitive fields
    return {} as SafeConfig; // Replace with actual implementation
  }

  // Validate that required config is present
  validateConfig(): boolean {
    // Check that accessToken and phoneNumberId exist and are non-empty
    return false; // Replace with actual implementation
  }

  // Get specific config value
  getConfigValue<K extends keyof SDKConfig>(key: K): SDKConfig[K] {
    return this.config[key];
  }

  // Log initialization without secrets
  private logInitialization(): void {
    if (this.config.debug) {
      const safeConfig = this.getConfig();
      console.log(`[${this.environment.toUpperCase()}] SDK initialized:`, safeConfig);
    }
  }

  // Check if SDK is in debug mode
  isDebugMode(): boolean {
    return this.config.debug;
  }

  // Get current environment
  getEnvironment(): Environment {
    return this.environment;
  }
}


// TODO: Test your implementation
// Example usage:
/*
// Development environment
const devClient = new SDKClient({
  accessToken: 'EAAxxxxxxxxxxxxx',
  phoneNumberId: '123456789',
  debug: true,
  timeout: 15000  // Override default
}, 'development');

console.log('Dev config (safe):', devClient.getConfig());
console.log('Is valid?', devClient.validateConfig());
console.log('Debug mode?', devClient.isDebugMode());
console.log('Timeout:', devClient.getConfigValue('timeout'));

// Update config
devClient.updateConfig({
  retryAttempts: 5,
  debug: false
});

console.log('Updated config:', devClient.getConfig());

// Production environment
const prodClient = new SDKClient({
  accessToken: 'EAAyyyyyyyyyyyyy',
  phoneNumberId: '987654321'
}, 'production');

console.log('Prod config:', prodClient.getConfig());
console.log('Environment:', prodClient.getEnvironment());

// Try to update accessToken (should fail)
prodClient.updateConfig({ accessToken: 'new_token' });
*/


// TODO: Bonus - Implement config validation with specific rules
interface ConfigValidationRules {
  accessToken: {
    minLength: number;
    pattern: RegExp;
  };
  timeout: {
    min: number;
    max: number;
  };
  retryAttempts: {
    min: number;
    max: number;
  };
}

const validationRules: ConfigValidationRules = {
  accessToken: {
    minLength: 20,
    pattern: /^EAA[a-zA-Z0-9]+$/
  },
  timeout: {
    min: 1000,
    max: 60000
  },
  retryAttempts: {
    min: 0,
    max: 10
  }
};

// Bonus: Add validation method to SDKClient
// validateWithRules(): { valid: boolean; errors: string[] }
