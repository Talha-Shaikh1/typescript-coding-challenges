// Exercise 2: Tuples for Function Returns - SOLUTION

// Task 1: Validate and format phone
function validateAndFormatPhone(phone: string): [boolean, string] {
  // Check if valid
  const isValid = phone.startsWith('+') && phone.length >= 10;

  if (!isValid) {
    return [false, phone];
  }

  // Already formatted
  if (phone.startsWith('+')) {
    return [true, phone];
  }

  // Add +92 if missing
  return [true, `+92${phone}`];
}

// Task 2: Simulate bulk send
function sendBulkMessages(recipients: string[]): [number, number, number] {
  const total = recipients.length;
  const sent = Math.floor(total * 0.8); // 80% success rate
  const failed = total - sent;

  return [sent, failed, total];
}

// Task 3: Rate limit status
function getRateLimitStatus(): [number, number, boolean] {
  const currentCount = 75;
  const maxLimit = 80;
  const canSend = currentCount < maxLimit;

  return [currentCount, maxLimit, canSend];
}

// Test cases
console.log("=== Exercise 2: Tuples for Function Returns ===\n");

const [valid1, formatted1] = validateAndFormatPhone("+923001234567");
console.log(`Valid: ${valid1}, Formatted: ${formatted1}`);
// Expected: Valid: true, Formatted: +923001234567

const [valid2, formatted2] = validateAndFormatPhone("abc123");
console.log(`Invalid: ${valid2}, Original: ${formatted2}`);
// Expected: Invalid: false, Original: abc123

const [sent, failed, total] = sendBulkMessages(Array(10).fill("+92300"));
console.log(`Bulk send: sent=${sent}, failed=${failed}, total=${total}`);
// Expected: Bulk send: sent=8, failed=2, total=10

const [current, max, canSend] = getRateLimitStatus();
console.log(`Rate limit: ${current}/${max}, can send: ${canSend}`);
// Expected: Rate limit: 75/80, can send: true
