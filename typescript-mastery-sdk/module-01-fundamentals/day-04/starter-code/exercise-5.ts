// Exercise 5: Complete SDK Config

// TODO 1: Create interface LoggerConfig
// interface LoggerConfig {
//   level: "debug" | "info" | "warn" | "error";
//   enabled: boolean;
// }

// TODO 2: Create interface RetryConfig
// interface RetryConfig {
//   maxAttempts: number;
//   backoffMs: number;
// }

// TODO 3: Create interface SDKConfig
// interface SDKConfig {
//   readonly apiKey: string;
//   readonly phoneNumberId: string;
//   apiVersion?: string;  // optional, default "v1.0"
//   timeout?: number;     // optional, default 30000
//   logger?: LoggerConfig;
//   retry?: RetryConfig;
// }

// TODO 4: Create getDefaultConfig function
// function getDefaultConfig(
//   apiKey: string,
//   phoneNumberId: string
// ): SDKConfig {
//   return {
//     apiKey,
//     phoneNumberId,
//     apiVersion: "v1.0",
//     timeout: 30000
//   };
// }

// TODO 5: Create validateConfig function
// Check if apiKey and phoneNumberId exist and are not empty
// function validateConfig(config: SDKConfig): boolean {
//
// }

// TODO: Test your code
// const config = getDefaultConfig("key123", "phone123");
// console.log("Default config:", config);
// console.log("Valid:", validateConfig(config));

// const invalidConfig: SDKConfig = {
//   apiKey: "",
//   phoneNumberId: "phone123"
// };
// console.log("Invalid config valid:", validateConfig(invalidConfig)); // false
