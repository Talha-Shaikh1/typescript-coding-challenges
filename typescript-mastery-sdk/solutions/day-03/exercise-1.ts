// Exercise 1: Array Operations - SOLUTION

// Task 1: Filter valid phone numbers
function filterValidPhoneNumbers(phones: string[]): string[] {
  return phones.filter(phone => phone.startsWith('+') && phone.length >= 10);
}

// Task 2: Extract phone numbers from user objects
function getPhoneNumbersFromUsers(users: Array<{name: string, phone: string}>): string[] {
  return users.map(user => user.phone);
}

// Task 3: Count successful messages
function countSuccessfulMessages(messages: Array<{status: string}>): number {
  return messages.filter(msg => msg.status === "sent").length;

  // Alternative using reduce:
  // return messages.reduce((count, msg) => msg.status === "sent" ? count + 1 : count, 0);
}

// Test cases
console.log("=== Exercise 1: Array Operations ===\n");

const phones = ["+923001234567", "invalid", "+14155552671", "123", "+1"];
const validPhones = filterValidPhoneNumbers(phones);
console.log("Valid phones:", validPhones);
// Expected: ["+923001234567", "+14155552671"]

const users = [
  { name: "Ali", phone: "+923001234567" },
  { name: "Sara", phone: "+923001234568" }
];
const userPhones = getPhoneNumbersFromUsers(users);
console.log("User phones:", userPhones);
// Expected: ["+923001234567", "+923001234568"]

const messages = [
  { status: "sent" },
  { status: "failed" },
  { status: "sent" },
  { status: "sent" },
  { status: "pending" }
];
const successCount = countSuccessfulMessages(messages);
console.log("Successful count:", successCount);
// Expected: 3
