// Exercise 3 Solution: Number Operations for SDK

// Function 1: Calculate retry delay with exponential backoff
function calculateRetryDelay(attempt: number): number {
  return Math.pow(2, attempt) * 1000;
}

// Function 2: Check if within rate limit
function isWithinRateLimit(
  messageCount: number,
  timeWindow: number,
  maxMessages: number
): boolean {
  return messageCount < maxMessages;
}

// Function 3: Calculate percentage
function calculatePercentage(sent: number, total: number): number {
  if (total === 0) return 0; // Avoid division by zero
  const percentage = (sent / total) * 100;
  return parseFloat(percentage.toFixed(2));
}

// Testing
console.log("Retry delay for attempt 0:", calculateRetryDelay(0), "ms"); // 1000ms
console.log("Retry delay for attempt 1:", calculateRetryDelay(1), "ms"); // 2000ms
console.log("Retry delay for attempt 2:", calculateRetryDelay(2), "ms"); // 4000ms
console.log("Retry delay for attempt 3:", calculateRetryDelay(3), "ms"); // 8000ms

console.log("\nRate limiting:");
console.log("Within rate limit (70/80):", isWithinRateLimit(70, 1000, 80)); // true
console.log("Within rate limit (80/80):", isWithinRateLimit(80, 1000, 80)); // false

console.log("\nSuccess rate:");
console.log("Success rate:", calculatePercentage(75, 100), "%");  // 75.00%
console.log("Success rate:", calculatePercentage(1, 3), "%");     // 33.33%

// ✅ Key Learnings:
// - Math.pow(base, exponent) for exponential calculations
// - Exponential backoff: delays increase exponentially (1s, 2s, 4s, 8s...)
// - Division by zero handling
// - .toFixed(2) returns string, need parseFloat() to convert back
// - Rate limiting is simple comparison

// 🎯 SDK Application:
// calculateRetryDelay: Wait time between retry attempts
// isWithinRateLimit: Check if we can send more messages
// calculatePercentage: Success rate metrics

// Advanced versions:

// Exponential backoff with max cap
function calculateRetryDelayWithCap(attempt: number, maxDelay: number = 30000): number {
  const delay = Math.pow(2, attempt) * 1000;
  return Math.min(delay, maxDelay); // Cap at maxDelay
}

console.log("\nWith cap (max 30s):");
console.log("Attempt 5:", calculateRetryDelayWithCap(5), "ms"); // 30000ms (capped)
console.log("Attempt 10:", calculateRetryDelayWithCap(10), "ms"); // 30000ms (capped)

// Rate limiter with sliding window
class RateLimiter {
  private timestamps: number[] = [];

  constructor(
    private maxMessages: number,
    private windowMs: number
  ) {}

  canSend(): boolean {
    const now = Date.now();
    // Remove old timestamps outside window
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length < this.maxMessages;
  }

  recordSend(): void {
    this.timestamps.push(Date.now());
  }

  getCount(): number {
    const now = Date.now();
    this.timestamps = this.timestamps.filter(t => now - t < this.windowMs);
    return this.timestamps.length;
  }
}

// Example usage
const limiter = new RateLimiter(3, 1000); // 3 messages per second

console.log("\nAdvanced rate limiter:");
console.log("Can send?", limiter.canSend()); // true
limiter.recordSend();
limiter.recordSend();
limiter.recordSend();
console.log("After 3 sends, can send?", limiter.canSend()); // false
console.log("Current count:", limiter.getCount()); // 3
