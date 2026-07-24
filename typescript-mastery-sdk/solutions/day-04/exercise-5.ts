// Exercise 5: Complete SDK Config - SOLUTION

// Task 1: LoggerConfig interface
interface LoggerConfig {
  level: "debug" | "info" | "warn" | "error";
  enabled: boolean;
}

// Task 2: RetryConfig interface
interface RetryConfig {
  maxAttempts: number;
  backoffMs: number;
}

// Task 3: SDKConfig interface
interface SDKConfig {
  readonly apiKey: string;
  readonly phoneNumberId: string;
  apiVersion?: string;
  timeout?: number;
  logger?: LoggerConfig;
  retry?: RetryConfig;
}

// Task 4: Get default config
function getDefaultConfig(apiKey: string, phoneNumberId: string): SDKConfig {
  return {
    apiKey,
    phoneNumberId,
    apiVersion: "v1.0",
    timeout: 30000,
    logger: {
      level: "info",
      enabled: true
    },
    retry: {
      maxAttempts: 3,
      backoffMs: 1000
    }
  };
}

// Task 5: Validate config
function validateConfig(config: SDKConfig): boolean {
  // Check required fields exist
  if (!config.apiKey || !config.phoneNumberId) {
    return false;
  }

  // Check apiKey is not empty
  if (config.apiKey.trim() === '') {
    return false;
  }

  // Check phoneNumberId is not empty
  if (config.phoneNumberId.trim() === '') {
    return false;
  }

  return true;
}

// Test cases
console.log("=== Exercise 5: Complete SDK Config ===\n");

const defaultConfig = getDefaultConfig("key123", "phone123");
console.log("Default config:", defaultConfig);
// Expected: { apiKey: "key123", phoneNumberId: "phone123", apiVersion: "v1.0", ... }

console.log("Valid:", validateConfig(defaultConfig));
// Expected: Valid: true

// Test with minimal config
const minimalConfig: SDKConfig = {
  apiKey: "key456",
  phoneNumberId: "phone456"
};
console.log("\nMinimal config:", minimalConfig);
console.log("Valid:", validateConfig(minimalConfig));

// Test with invalid configs
const invalidConfig1: SDKConfig = {
  apiKey: "",
  phoneNumberId: "phone789"
};
console.log("\nInvalid config (empty apiKey):");
console.log("Valid:", validateConfig(invalidConfig1)); // false

const invalidConfig2: SDKConfig = {
  apiKey: "key789",
  phoneNumberId: ""
};
console.log("\nInvalid config (empty phoneNumberId):");
console.log("Valid:", validateConfig(invalidConfig2)); // false

// Test with custom config
const customConfig: SDKConfig = {
  apiKey: "custom_key",
  phoneNumberId: "custom_phone",
  apiVersion: "v2.0",
  timeout: 60000,
  logger: {
    level: "debug",
    enabled: true
  },
  retry: {
    maxAttempts: 5,
    backoffMs: 2000
  }
};
console.log("\nCustom config:", customConfig);
console.log("Valid:", validateConfig(customConfig));

console.log("\n✅ Production-ready config with validation!");
