// Exercise 4: Async Functions - SOLUTION

// Task 1: Fetch user async
async function fetchUser(id: string): Promise<{name: string, phone: string}> {
  console.log(`Fetching user ${id}...`);

  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = {
        name: "Ali",
        phone: "+92300"
      };
      console.log("User fetched:", user);
      resolve(user);
    }, 500);
  });
}

// Task 2: Send message async
async function sendMessage(
  to: string,
  text: string
): Promise<{success: boolean, id?: string}> {
  console.log(`Sending message to ${to}: "${text}"`);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = {
        success: true,
        id: "wamid_123"
      };
      console.log("Message sent:", result);
      resolve(result);
    }, 500);
  });
}

// Task 3: Send to user (combine both operations)
async function sendToUser(userId: string, text: string): Promise<void> {
  try {
    // Fetch user first
    const user = await fetchUser(userId);

    // Then send message
    const result = await sendMessage(user.phone, text);

    // Log final result
    console.log(`✅ Successfully sent to ${user.name}: ${result.id}`);
  } catch (error) {
    console.error("Error sending to user:", error);
  }
}

// Test cases
console.log("=== Exercise 4: Async Functions ===\n");

// Test individual functions
async function testIndividual() {
  console.log("--- Test 1: Individual functions ---\n");

  const user = await fetchUser("user_123");
  console.log(`Got user: ${user.name}, ${user.phone}\n`);

  const result = await sendMessage("+923001234567", "Hello!");
  console.log(`Got result: success=${result.success}, id=${result.id}\n`);
}

// Test combined function
async function testCombined() {
  console.log("--- Test 2: Combined function ---\n");
  await sendToUser("user_456", "Hello from async function!");
}

// Run tests
(async () => {
  await testIndividual();
  await testCombined();
  console.log("\n✅ Async/await makes async code look synchronous!");
})();
