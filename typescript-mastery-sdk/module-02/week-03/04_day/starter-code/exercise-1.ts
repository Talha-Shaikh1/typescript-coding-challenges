/**
 * Day 18 - Exercise 1: Production Config Validator (Required)
 *
 * Task: Create a configuration validation system with Required<T>
 *
 * Requirements:
 * 1. Define AppConfig with required and optional fields
 * 2. Create ProductionConfig using Required<T>
 * 3. Implement ConfigValidator class
 * 4. Create validateForProduction() function
 */

// TODO: Define AppConfig interface
// Include:
// - Required: apiKey (string)
// - Optional: timeout (number), retries (number), debug (boolean), logLevel (string)

interface AppConfig {
  // Add properties here
}


// TODO: Create ProductionConfig type using Required
type ProductionConfig = // Use Required here


// TODO: Implement ConfigValidator class
class ConfigValidator {
  // Default values for production
  private productionDefaults: Required<AppConfig> = {
    // Add all fields with production defaults
  };

  // Validate and fill config for development (allows partial)
  validateForDevelopment(config: AppConfig): AppConfig {
    // Return config as-is for dev (partial OK)
    return config;
  }

  // Validate and fill config for production (all fields required)
  validateForProduction(config: AppConfig): Required<AppConfig> {
    // Merge with defaults to ensure all fields exist
    // Return complete config
  }

  // Strict validation - throws if any field missing
  validateStrict(config: AppConfig): Required<AppConfig> {
    // Check for missing fields
    // Throw error if any required field is missing
    // Return config if all fields present
  }

  // Check if config is complete
  isComplete(config: AppConfig): config is Required<AppConfig> {
    // Return true if all fields are defined
  }
}


// TODO: Implement standalone validation function
function validateForProduction(config: AppConfig): Required<AppConfig> {
  // Validate and return complete config
}


// TODO: Test your implementation
// Example usage:
/*
const validator = new ConfigValidator();

// Development - partial config OK
const devConfig = validator.validateForDevelopment({
  apiKey: 'dev-key',
  debug: true
});
console.log('Dev config:', devConfig);

// Production - all fields required
const prodConfig = validator.validateForProduction({
  apiKey: 'prod-key',
  timeout: 5000,
  retries: 3,
  debug: false,
  logLevel: 'error'
});
console.log('Prod config:', prodConfig);

// Strict validation
try {
  validator.validateStrict({
    apiKey: 'key'
    // Missing fields - should throw
  });
} catch (error) {
  console.error('Validation failed:', error.message);
}

// Check if complete
const isComplete = validator.isComplete({
  apiKey: 'key',
  timeout: 5000,
  retries: 3,
  debug: false,
  logLevel: 'info'
});
console.log('Config complete?', isComplete);
*/
