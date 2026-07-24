// Exercise 2: Rest Parameters - SOLUTION

// Task 1: Send to multiple recipients
function sendBulk(text: string, ...phones: string[]): number {
  console.log(`Sending "${text}" to ${phones.length} recipients`);
  phones.forEach(phone => {
    console.log(`  → ${phone}`);
  });
  return phones.length;
}

// Task 2: Calculate statistics
function calculateStats(...numbers: number[]): {
  sum: number;
  average: number;
  min: number;
  max: number;
} {
  if (numbers.length === 0) {
    return { sum: 0, average: 0, min: 0, max: 0 };
  }

  const sum = numbers.reduce((acc, n) => acc + n, 0);
  const average = sum / numbers.length;
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);

  return { sum, average, min, max };
}

// Task 3: Log with timestamp
function logWithTimestamp(level: string, ...messages: string[]): void {
  const timestamp = new Date().toISOString();
  const combinedMessage = messages.join(' ');
  console.log(`[${timestamp}] [${level}] ${combinedMessage}`);
}

// Test cases
console.log("=== Exercise 2: Rest Parameters ===\n");

const count = sendBulk("Hello everyone!", "+923001234567", "+923001234568", "+923001234569");
console.log(`Sent to ${count} recipients`);
// Expected: Sent to 3 recipients

console.log("\n");
const stats = calculateStats(1, 5, 9);
console.log("Stats:", stats);
// Expected: Stats: { sum: 15, average: 5, min: 1, max: 9 }

console.log("\n");
logWithTimestamp("INFO", "Server", "started", "successfully");
// Expected: [2024-01-01T10:00:00] [INFO] Server started successfully

logWithTimestamp("ERROR", "Connection", "failed");

console.log("\n✅ Rest parameters handle variable-length arguments!");
