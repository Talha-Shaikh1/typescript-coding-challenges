/**
 * Exercise 2b: Default Export for Main Class
 * Create WhatsAppClient class with default export + named helpers
 */

// TODO: Create WhatsAppClient class
// Should be the DEFAULT export (main export of this file)

interface ClientConfig {
  apiKey: string;
  apiUrl?: string;
}

// TODO: Create class with:
// - Constructor that takes ClientConfig
// - Method: async sendMessage(to: string, text: string): Promise<void>
// - Method: getConfig(): ClientConfig

// TODO: Add NAMED exports for helpers:

// 1. createClient(apiKey: string): WhatsAppClient
//    - Factory function that creates a client

// 2. VERSION constant = "1.0.0"

// Usage should be:
// import WhatsAppClient, { createClient, VERSION } from './exercise-2b';

export {};
