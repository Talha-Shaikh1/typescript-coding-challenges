// Bonus Challenge: Retry Mechanism with Callbacks - SOLUTION

type RetryCallback = (attempt: number, success: boolean) => void;

async function sendWithRetry(
  phone: string,
  text: string,
  maxRetries: number = 3,
  onRetry?: RetryCallback
): Promise<boolean> {
  let attempt = 0;

  while (attempt < maxRetries) {
    attempt++;
    console.log(`Attempt ${attempt}/${maxRetries}: Sending to ${phone}...`);

    // Simulate API call with 60% success rate
    const success = Math.random() > 0.4;

    // Call the retry callback if provided
    if (onRetry) {
      onRetry(attempt, success);
    }

    if (success) {
      console.log(`✅ Success on attempt ${attempt}!`);
      return true;
    } else {
      console.log(`❌ Failed on attempt ${attempt}`);

      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 100; // 200ms, 400ms, 800ms...
        console.log(`Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  console.log(`❌ All ${maxRetries} attempts failed`);
  return false;
}

// Helper function to simulate a more realistic API call
async function simulateApiCall(phone: string, shouldFail: boolean = false): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(!shouldFail && Math.random() > 0.3);
    }, 500);
  });
}

// Advanced version with better retry logic
async function sendWithSmartRetry(
  phone: string,
  text: string,
  maxRetries: number = 3,
  onRetry?: RetryCallback
): Promise<{success: boolean, attempts: number, messageId?: string}> {
  let attempt = 0;
  let lastError: string | undefined;

  for (attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries}: Sending to ${phone}...`);

      // Simulate API call
      const success = await simulateApiCall(phone);

      if (onRetry) {
        onRetry(attempt, success);
      }

      if (success) {
        const messageId = `wamid_${Date.now()}`;
        console.log(`✅ Success on attempt ${attempt}! ID: ${messageId}`);
        return { success: true, attempts: attempt, messageId };
      } else {
        lastError = "API returned failure";
        console.log(`❌ Failed on attempt ${attempt}: ${lastError}`);
      }
    } catch (error) {
      lastError = error instanceof Error ? error.message : "Unknown error";
      console.log(`❌ Error on attempt ${attempt}: ${lastError}`);

      if (onRetry) {
        onRetry(attempt, false);
      }
    }

    // Exponential backoff before next retry
    if (attempt < maxRetries) {
      const delay = Math.min(Math.pow(2, attempt) * 100, 5000); // Max 5 seconds
      console.log(`Waiting ${delay}ms before retry...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  console.log(`❌ All ${maxRetries} attempts failed`);
  return { success: false, attempts: maxRetries };
}

// Test cases
console.log("=== Bonus: Retry Mechanism with Callbacks ===\n");

// Test basic retry
async function testBasicRetry() {
  console.log("--- Test 1: Basic Retry ---\n");

  const success = await sendWithRetry(
    "+923001234567",
    "Hello with retry",
    3,
    (attempt, success) => {
      console.log(`  Callback: Attempt ${attempt} - ${success ? 'Success' : 'Failed'}`);
    }
  );

  console.log(`\nFinal result: ${success ? 'Success' : 'Failed'}\n`);
}

// Test smart retry
async function testSmartRetry() {
  console.log("--- Test 2: Smart Retry with Details ---\n");

  const result = await sendWithSmartRetry(
    "+923001234567",
    "Hello with smart retry",
    4,
    (attempt, success) => {
      console.log(`  📊 Retry callback: attempt=${attempt}, success=${success}`);
    }
  );

  console.log(`\nFinal result:`, result);
}

// Run tests
(async () => {
  await testBasicRetry();
  await new Promise(resolve => setTimeout(resolve, 1000));
  await testSmartRetry();

  console.log("\n✅ Retry mechanisms are essential for production SDKs!");
  console.log("This pattern handles network failures, rate limits, and temporary errors!");
})();
