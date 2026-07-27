// Example 02: Basic Constraints with extends
// Shows different ways to constrain generic types

console.log("=== Basic Constraints with extends ===\n");

// ================================================================
// Pattern 1: Constraining to Primitive Types
// ================================================================

console.log("--- Pattern 1: Primitive Type Constraints ---\n");

// Only accept numbers
function double<T extends number>(value: T): number {
  return value * 2;
}

console.log("Double 5:", double(5));
console.log("Double 3.14:", double(3.14));
// double("5"); // ❌ Error: string doesn't extend number

// Only accept strings
function shout<T extends string>(text: T): string {
  return text.toUpperCase() + "!!!";
}

console.log("Shout:", shout("hello"));
// shout(123); // ❌ Error: number doesn't extend string

// ================================================================
// Pattern 2: Constraining to Built-in Interfaces
// ================================================================

console.log("\n--- Pattern 2: Built-in Interface Constraints ---\n");

// Anything with length property (string, array, etc.)
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

console.log("String length:", getLength("hello"));
console.log("Array length:", getLength([1, 2, 3, 4, 5]));
console.log("Custom length:", getLength({ length: 42, other: "data" }));
// getLength(123); // ❌ Error: number doesn't have length

// ================================================================
// Pattern 3: Constraining to Array Type
// ================================================================

console.log("\n--- Pattern 3: Array Constraints ---\n");

// T must be an array
function firstAndLast<T extends any[]>(arr: T): [T[0], T[number]] | undefined {
  if (arr.length === 0) return undefined;
  return [arr[0], arr[arr.length - 1]];
}

console.log("Numbers:", firstAndLast([1, 2, 3, 4, 5]));
console.log("Strings:", firstAndLast(["a", "b", "c"]));
console.log("Mixed:", firstAndLast([true, 42, "hello"]));
console.log("Empty:", firstAndLast([]));
// firstAndLast(123); // ❌ Error: not an array

// ================================================================
// Pattern 4: Constraining to Object Type
// ================================================================

console.log("\n--- Pattern 4: Object Constraints ---\n");

// T must be an object (not primitive)
function clone<T extends object>(obj: T): T {
  return { ...obj };
}

const user = { id: "1", name: "Ali" };
const cloned = clone(user);
console.log("Original:", user);
console.log("Cloned:", cloned);
console.log("Are they same reference?", user === cloned); // false

// clone(123);     // ❌ Error: number is not an object
// clone("hello"); // ❌ Error: string is not an object

// ================================================================
// Pattern 5: Union Type Constraints
// ================================================================

console.log("\n--- Pattern 5: Union Constraints ---\n");

// T can be string OR number (but nothing else)
function format<T extends string | number>(value: T): string {
  if (typeof value === "string") {
    return `"${value}"`;
  }
  return value.toFixed(2);
}

console.log("Format string:", format("hello"));
console.log("Format number:", format(42.123));
// format(true); // ❌ Error: boolean not in union

// ================================================================
// Pattern 6: Constraining to Specific Values
// ================================================================

console.log("\n--- Pattern 6: Literal Type Constraints ---\n");

// T must be one of these specific strings
function getConfig<T extends 'development' | 'production' | 'test'>(
  env: T
): string {
  return `Running in ${env} mode`;
}

console.log(getConfig('development'));
console.log(getConfig('production'));
// getConfig('staging'); // ❌ Error: not in allowed values

// ================================================================
// Pattern 7: Constraining Function Parameters
// ================================================================

console.log("\n--- Pattern 7: Function Type Constraints ---\n");

// T must be a function that takes string and returns any type
function callWith<T extends (input: string) => any>(
  fn: T,
  input: string
): ReturnType<T> {
  return fn(input);
}

const toUpper = (s: string) => s.toUpperCase();
const toLength = (s: string) => s.length;

console.log("Call toUpper:", callWith(toUpper, "hello"));
console.log("Call toLength:", callWith(toLength, "hello"));

// ================================================================
// Pattern 8: Constructor Constraints
// ================================================================

console.log("\n--- Pattern 8: Constructor Constraints ---\n");

// T must be a class (constructor)
function create<T extends { new(...args: any[]): any }>(
  constructor: T,
  ...args: any[]
): InstanceType<T> {
  return new constructor(...args);
}

class User {
  constructor(public name: string, public age: number) {}
}

const user2 = create(User, "Ali", 25);
console.log("Created user:", user2);

// ================================================================
// Comparison: Constrained vs Unconstrained
// ================================================================

console.log("\n=== Comparison ===\n");

// Unconstrained: Maximum flexibility, but unsafe
function processUnconstrained<T>(value: T): void {
  // Can't do much with T
  console.log("Type:", typeof value);
  // value.toUpperCase(); // ❌ Error: might not exist
}

// Constrained to string: Less flexible, but safe
function processString<T extends string>(value: T): void {
  console.log("Uppercase:", value.toUpperCase()); // ✅ Safe!
  console.log("Length:", value.length); // ✅ Safe!
}

processUnconstrained(123);
processUnconstrained("hello");
processUnconstrained(true);

processString("hello");
// processString(123); // ❌ Error: not a string

// ================================================================
// When to Use Constraints
// ================================================================

console.log("\n=== When to Use Constraints ===\n");

console.log("✅ Use constraints when:");
console.log("   - You need to access properties/methods on T");
console.log("   - You want to limit valid types");
console.log("   - You need specific behavior from T");

console.log("\n❌ Don't use constraints when:");
console.log("   - T is truly any type (identity function)");
console.log("   - You don't access T's properties");
console.log("   - Constraint would be too restrictive");

// ================================================================
// Key Takeaways
// ================================================================

console.log("\n=== Key Takeaways ===");
console.log("✓ extends keyword adds constraints to generics");
console.log("✓ Constraint = minimum requirements for T");
console.log("✓ T can be the constraint type or any subtype");
console.log("✓ Multiple patterns: primitives, objects, unions, literals");
console.log("✓ Balance: flexibility vs type safety");
console.log("✓ Constrain only what you actually use\n");

export {
  double,
  shout,
  getLength,
  firstAndLast,
  clone,
  format,
  getConfig,
  callWith,
  create
};
