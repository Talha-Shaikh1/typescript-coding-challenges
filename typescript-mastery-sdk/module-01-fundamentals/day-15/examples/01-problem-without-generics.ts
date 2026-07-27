// Example 01: The Problem Without Generics
// This shows WHY we need generics - code duplication!

console.log("=== Problem: Code Duplication ===\n");

// ❌ WITHOUT GENERICS: Repetitive code for each type

// Get first number from array
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

// Get first string from array
function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

// Get first boolean from array
function getFirstBoolean(arr: boolean[]): boolean | undefined {
  return arr[0];
}

interface User {
  id: string;
  name: string;
}

// Get first user from array
function getFirstUser(arr: User[]): User | undefined {
  return arr[0];
}

// Testing the duplication
const numbers = [1, 2, 3, 4, 5];
const strings = ["hello", "world"];
const booleans = [true, false, true];
const users: User[] = [
  { id: "1", name: "Ali" },
  { id: "2", name: "Sara" }
];

console.log("First number:", getFirstNumber(numbers));
console.log("First string:", getFirstString(strings));
console.log("First boolean:", getFirstBoolean(booleans));
console.log("First user:", getFirstUser(users));

console.log("\n❌ Problem: 4 functions that do EXACTLY the same thing!");
console.log("❌ If we have 10 types = 10 functions!");
console.log("❌ Bug fix = update all 10 functions!\n");

// ================================================================

console.log("=== Solution: ONE Generic Function ===\n");

// ✅ WITH GENERICS: Write once, use for ANY type
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// Same tests with ONE function
console.log("First number:", getFirst(numbers));        // T = number
console.log("First string:", getFirst(strings));        // T = string
console.log("First boolean:", getFirst(booleans));      // T = boolean
console.log("First user:", getFirst(users));            // T = User

console.log("\n✅ Solution: ONE function works for ALL types!");
console.log("✅ Type inference works automatically");
console.log("✅ Full type safety maintained");
console.log("✅ Bug fix = update ONE function!\n");

// ================================================================

console.log("=== Why Not Use 'any'? ===\n");

// ❌ Using 'any' loses type information
function getFirstAny(arr: any[]): any {
  return arr[0];
}

const resultAny = getFirstAny([1, 2, 3]);
// resultAny is 'any' - NO type safety!
console.log("With 'any', result type:", typeof resultAny);
// You can do anything - no TypeScript protection:
// resultAny.toUpperCase(); // No error, but crashes at runtime!

// ✅ Using generics preserves type information
const resultGeneric = getFirst([1, 2, 3]);
// resultGeneric is 'number | undefined' - FULL type safety!
console.log("With generics, TypeScript knows it's a number");
// resultGeneric.toUpperCase(); // ✓ TypeScript ERROR - caught at compile time!

console.log("\n✅ Generics = Type safety + Reusability!");

// ================================================================

export { getFirst };
