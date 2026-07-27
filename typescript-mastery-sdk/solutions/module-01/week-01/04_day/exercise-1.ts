// Exercise 1: Basic Interfaces - SOLUTION

// Task 1: User interface
interface User {
  name: string;
  email: string;
  phone: string;
  isVerified: boolean;
}

// Task 2: ClientConfig interface
interface ClientConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion?: string;
  timeout?: number;
}

// Task 3: Create objects using these interfaces
const user1: User = {
  name: "Ali",
  email: "ali@test.com",
  phone: "+923001234567",
  isVerified: true
};

const user2: User = {
  name: "Sara",
  email: "sara@test.com",
  phone: "+923001234568",
  isVerified: false
};

const config: ClientConfig = {
  accessToken: "token123",
  phoneNumberId: "phone123"
  // apiVersion and timeout are optional
};

const fullConfig: ClientConfig = {
  accessToken: "token456",
  phoneNumberId: "phone456",
  apiVersion: "v2.0",
  timeout: 60000
};

// Test output
console.log("=== Exercise 1: Basic Interfaces ===\n");
console.log("User 1:", user1);
console.log("User 2:", user2);
console.log("Config:", config);
console.log("Full Config:", fullConfig);
