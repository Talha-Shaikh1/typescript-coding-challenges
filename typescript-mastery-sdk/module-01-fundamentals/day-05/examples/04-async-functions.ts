// Example 4: Async Functions and Promises
// Modern asynchronous patterns

console.log("=== Basic Async Function ===");

async function fetchUser(id: string): Promise<{ name: string; age: number }> {
  console.log("Fetching user", id);

  // Simulate API delay
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ name: "Ali", age: 25 });
    }, 1000);
  });
}

// Using async/await
async function main1() {
  console.log("Start");
  let user = await fetchUser("123");
  console.log("User:", user);
  console.log("Done");
}

main1();

console.log("\n=== Error Handling with Try-Catch ===");

async function fetchDataWithError(
  shouldFail: boolean
): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Failed to fetch data"));
      } else {
        resolve("Data loaded");
      }
    }, 500);
  });
}

async function main2() {
  try {
    let data = await fetchDataWithError(false);
    console.log("✅", data);
  } catch (error) {
    console.log("❌", (error as Error).message);
  }

  try {
    let data = await fetchDataWithError(true);
    console.log("✅", data);
  } catch (error) {
    console.log("❌", (error as Error).message);
  }
}

setTimeout(() => main2(), 2000);

console.log("\n=== SDK Async Example ===");

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

async function sendText(
  to: string,
  text: string
): Promise<SendResult> {
  console.log(`Sending to ${to}: ${text}`);

  // Simulate API call
  return new Promise(resolve => {
    setTimeout(() => {
      if (to.startsWith('+')) {
        resolve({
          success: true,
          messageId: `wamid_${Date.now()}`
        });
      } else {
        resolve({
          success: false,
          error: "Invalid phone number format"
        });
      }
    }, 500);
  });
}

async function main3() {
  let result1 = await sendText("+923001234567", "Hello");
  console.log("Result 1:", result1);

  let result2 = await sendText("invalid", "Hello");
  console.log("Result 2:", result2);
}

setTimeout(() => main3(), 3500);

console.log("\n=== Promise.all for Parallel Operations ===");

async function sendToMultiple(...phones: string[]): Promise<SendResult[]> {
  // Send to all phones in parallel
  let promises = phones.map(phone => sendText(phone, "Bulk message"));
  return Promise.all(promises);
}

async function main4() {
  console.log("Sending to multiple recipients...");
  let results = await sendToMultiple(
    "+923001234567",
    "+923001234568",
    "+923001234569"
  );

  console.log("All results:", results);
  let successful = results.filter(r => r.success).length;
  console.log(`Sent: ${successful}/${results.length}`);
}

setTimeout(() => main4(), 5000);

console.log("\n=== Sequential vs Parallel ===");

async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sequentialOperations() {
  console.log("Sequential: Start");
  let start = Date.now();

  await delay(500);
  await delay(500);
  await delay(500);

  let elapsed = Date.now() - start;
  console.log(`Sequential: Done in ${elapsed}ms`);
}

async function parallelOperations() {
  console.log("Parallel: Start");
  let start = Date.now();

  await Promise.all([
    delay(500),
    delay(500),
    delay(500)
  ]);

  let elapsed = Date.now() - start;
  console.log(`Parallel: Done in ${elapsed}ms`);
}

setTimeout(async () => {
  await sequentialOperations();
  await parallelOperations();
}, 7000);

console.log("\n=== Real SDK Pattern: Retry Logic ===");

async function sendWithRetry(
  phone: string,
  text: string,
  maxRetries: number = 3
): Promise<SendResult> {
  let lastError: string = "";

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Attempt ${attempt}/${maxRetries}`);

    try {
      let result = await sendText(phone, text);
      if (result.success) {
        return result;
      }
      lastError = result.error || "Unknown error";
    } catch (error) {
      lastError = (error as Error).message;
    }

    // Wait before retry (exponential backoff)
    if (attempt < maxRetries) {
      await delay(Math.pow(2, attempt) * 1000);
    }
  }

  return {
    success: false,
    error: `Failed after ${maxRetries} attempts: ${lastError}`
  };
}

setTimeout(async () => {
  console.log("\n=== Testing Retry Logic ===");
  let result = await sendWithRetry("+923001234567", "Retry test");
  console.log("Final result:", result);
}, 9000);

console.log("\n✅ Example 4 complete!");
