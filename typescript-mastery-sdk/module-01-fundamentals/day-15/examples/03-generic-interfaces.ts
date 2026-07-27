// Example 03: Generic Interfaces
// Shows how to create reusable interface contracts

console.log("=== Generic Interfaces Examples ===\n");

// ================================================================
// Pattern 1: API Response
// ================================================================

console.log("--- Pattern 1: Generic API Response ---\n");

interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: number;
}

// Define types
interface User {
  id: string;
  name: string;
  email: string;
}

interface Message {
  id: string;
  text: string;
  to: string;
}

// Create specific response types
type UserResponse = APIResponse<User>;
type MessageResponse = APIResponse<Message>;
type UsersListResponse = APIResponse<User[]>;

// Mock responses
const userResponse: UserResponse = {
  data: { id: "1", name: "Ali", email: "ali@example.com" },
  status: 200,
  message: "User fetched successfully",
  timestamp: Date.now()
};

const messageResponse: MessageResponse = {
  data: { id: "m1", text: "Hello World", to: "+1234567890" },
  status: 200,
  message: "Message sent",
  timestamp: Date.now()
};

const usersListResponse: UsersListResponse = {
  data: [
    { id: "1", name: "Ali", email: "ali@example.com" },
    { id: "2", name: "Sara", email: "sara@example.com" }
  ],
  status: 200,
  message: "Users fetched",
  timestamp: Date.now()
};

console.log("User response:", userResponse);
console.log("Message response:", messageResponse);
console.log("Users list response:", usersListResponse.data.length, "users");

// ================================================================
// Pattern 2: Container/Box
// ================================================================

console.log("\n--- Pattern 2: Generic Container ---\n");

interface Box<T> {
  value: T;
  isEmpty: boolean;
}

const numberBox: Box<number> = {
  value: 42,
  isEmpty: false
};

const stringBox: Box<string> = {
  value: "hello",
  isEmpty: false
};

const emptyBox: Box<string> = {
  value: "",
  isEmpty: true
};

console.log("Number box:", numberBox);
console.log("String box:", stringBox);
console.log("Empty box:", emptyBox);

// ================================================================
// Pattern 3: Key-Value Pair
// ================================================================

console.log("\n--- Pattern 3: Generic Key-Value Pair ---\n");

interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = {
  key: "age",
  value: 25
};

const pair2: KeyValuePair<number, string> = {
  key: 404,
  value: "Not Found"
};

const pair3: KeyValuePair<string, User> = {
  key: "user-1",
  value: { id: "1", name: "Ali", email: "ali@example.com" }
};

console.log("Pair 1:", pair1);
console.log("Pair 2:", pair2);
console.log("Pair 3:", pair3);

// ================================================================
// Pattern 4: Result/Either Pattern
// ================================================================

console.log("\n--- Pattern 4: Result Type (Success or Failure) ---\n");

interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
  error: string;
  code?: string;
}

type Result<T> = Success<T> | Failure;

// Helper functions
function success<T>(data: T): Success<T> {
  return { success: true, data };
}

function failure(error: string, code?: string): Failure {
  return { success: false, error, code };
}

// Example: Division function
function divide(a: number, b: number): Result<number> {
  if (b === 0) {
    return failure("Division by zero", "MATH_ERROR");
  }
  return success(a / b);
}

const result1 = divide(10, 2);
const result2 = divide(10, 0);

if (result1.success) {
  console.log("Division result:", result1.data);
} else {
  console.log("Error:", result1.error);
}

if (result2.success) {
  console.log("Division result:", result2.data);
} else {
  console.log("Error:", result2.error, `(${result2.code})`);
}

// ================================================================
// Pattern 5: Paginated Response
// ================================================================

console.log("\n--- Pattern 5: Paginated Response ---\n");

interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

type UsersPaginated = PaginatedResponse<User>;
type MessagesPaginated = PaginatedResponse<Message>;

const usersPage: UsersPaginated = {
  items: [
    { id: "1", name: "Ali", email: "ali@example.com" },
    { id: "2", name: "Sara", email: "sara@example.com" }
  ],
  total: 50,
  page: 1,
  pageSize: 2,
  totalPages: 25
};

console.log("Users page:", usersPage);
console.log(`Showing ${usersPage.items.length} of ${usersPage.total} users`);

// ================================================================
// Pattern 6: Config with Defaults
// ================================================================

console.log("\n--- Pattern 6: Generic Configuration ---\n");

interface Config<T> {
  value: T;
  defaultValue: T;
  isRequired: boolean;
}

interface AppConfig {
  apiKey: Config<string>;
  timeout: Config<number>;
  debug: Config<boolean>;
}

const appConfig: AppConfig = {
  apiKey: {
    value: "abc123",
    defaultValue: "",
    isRequired: true
  },
  timeout: {
    value: 5000,
    defaultValue: 3000,
    isRequired: false
  },
  debug: {
    value: true,
    defaultValue: false,
    isRequired: false
  }
};

console.log("App config:", appConfig);

// ================================================================
// Pattern 7: Promise-like Interface
// ================================================================

console.log("\n--- Pattern 7: Promise-like Interface ---\n");

interface Thenable<T> {
  then<TResult>(
    onSuccess: (value: T) => TResult,
    onError?: (error: Error) => TResult
  ): Thenable<TResult>;
}

// This is similar to how Promise<T> works!
// Promise is a built-in generic interface

const promise: Promise<number> = Promise.resolve(42);
promise.then(value => {
  console.log("Promise resolved with:", value);
});

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ Generic interfaces = reusable contracts");
console.log("✓ Define structure once, use with any type");
console.log("✓ Multiple type parameters supported");
console.log("✓ Common patterns: Response, Container, Result, Pagination");
console.log("✓ Built-in generics: Promise<T>, Array<T>, Map<K,V>");
console.log("✓ Type aliases can use generic interfaces\n");

export type {
  APIResponse,
  Box,
  KeyValuePair,
  Result,
  Success,
  Failure,
  PaginatedResponse,
  Config
};
