// Exercise 5: Complex Union Pattern - SOLUTION

// Task 1: Create interfaces with status discriminator
interface LoadingState {
  status: "loading";
}

interface SuccessState {
  status: "success";
  data: {
    messageId: string;
    timestamp: number;
  };
}

interface ErrorState {
  status: "error";
  error: {
    code: string;
    message: string;
  };
}

// Task 2: Create union type
type APIState = LoadingState | SuccessState | ErrorState;

// Task 3: Create function handleState
function handleState(state: APIState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";

    case "success":
      return `Success! Message ID: ${state.data.messageId}`;

    case "error":
      return `Error: ${state.error.code} - ${state.error.message}`;

    default:
      // Exhaustiveness check
      const _exhaustive: never = state;
      return _exhaustive;
  }
}

// Task 4: Create type guard
function isSuccessState(state: APIState): state is SuccessState {
  return state.status === "success";
}

// Additional helper type guards
function isErrorState(state: APIState): state is ErrorState {
  return state.status === "error";
}

function isLoadingState(state: APIState): state is LoadingState {
  return state.status === "loading";
}

// Test cases
console.log("=== Exercise 5: Complex Union Pattern ===\n");

const loading: LoadingState = { status: "loading" };
const success: SuccessState = {
  status: "success",
  data: { messageId: "wamid_123", timestamp: Date.now() }
};
const error: ErrorState = {
  status: "error",
  error: { code: "INVALID_PHONE", message: "Phone number invalid" }
};

console.log(handleState(loading));
// Expected: Loading...

console.log(handleState(success));
// Expected: Success! Message ID: wamid_123

console.log(handleState(error));
// Expected: Error: INVALID_PHONE - Phone number invalid

console.log("\n--- Testing type guards ---");
console.log("Is success?", isSuccessState(success));  // true
console.log("Is success?", isSuccessState(loading));  // false
console.log("Is error?", isErrorState(error));        // true
console.log("Is loading?", isLoadingState(loading));  // true

// Demonstrate type narrowing
console.log("\n--- Type narrowing with guards ---");

function processState(state: APIState): void {
  if (isSuccessState(state)) {
    // TypeScript knows this is SuccessState
    console.log(`Message ${state.data.messageId} sent at ${new Date(state.data.timestamp).toLocaleTimeString()}`);
  } else if (isErrorState(state)) {
    // TypeScript knows this is ErrorState
    console.log(`Failed with code ${state.error.code}: ${state.error.message}`);
  } else {
    // TypeScript knows this is LoadingState
    console.log("Still loading...");
  }
}

processState(success);
processState(error);
processState(loading);

console.log("\n✅ Complex unions model real-world API states perfectly!");
