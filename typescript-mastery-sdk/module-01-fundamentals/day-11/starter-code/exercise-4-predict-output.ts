/**
 * Exercise 4: Predict Build Output
 *
 * Given this TypeScript code, predict what the compiled output will look like
 */

// SOURCE CODE (TypeScript):

/**
 * Main WhatsApp SDK client
 */
export class WhatsAppClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Send a message
   */
  async sendMessage(to: string, text: string): Promise<void> {
    console.log(`Sending "${text}" to ${to}`);
  }
}

export interface ClientConfig {
  apiKey: string;
  timeout?: number;
}

// ============================================
// YOUR TASK: Predict the outputs
// ============================================

/**
 * PART 1: Predict JavaScript Output (dist/client.js)
 *
 * What will this look like after compilation with target: ES2022?
 * Write your prediction below:
 */

/*
YOUR PREDICTION for dist/client.js:


*/

/**
 * PART 2: Predict Type Definition (dist/client.d.ts)
 *
 * What will the .d.ts file look like?
 * Write your prediction below:
 */

/*
YOUR PREDICTION for dist/client.d.ts:


*/

/**
 * PART 3: Fill in the comparison table
 */

/**
 * | Feature              | TypeScript Input | JavaScript Output |
 * |---------------------|------------------|-------------------|
 * | Types (: string)    | Present          | ???               |
 * | Interfaces          | Present          | ???               |
 * | JSDoc comments      | Present          | ???               |
 * | private keyword     | Present          | ???               |
 * | async/await         | Present          | ???               |
 */

/**
 * PART 4: Verification
 *
 * After making predictions:
 * 1. Create this file as client.ts
 * 2. Run: tsc client.ts --declaration
 * 3. Check dist/client.js and dist/client.d.ts
 * 4. Compare with your predictions
 *
 * Were you correct? What surprised you?
 * (Write your observations here)
 */

export {};
