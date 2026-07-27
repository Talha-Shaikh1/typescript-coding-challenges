// Exercise 6: Cumulative Revision
// Combine Days 15-16 concepts

console.log("=== Exercise 6: Cumulative Revision ===\n");
console.log("Combining: Day 15 (Generics) + Day 16 (Constraints)\n");

// ================================================================
// Task: Generic Validator with Constraints
// ================================================================

/*
Goal: Build a type-safe validation system that combines:
- Day 15: Generic interfaces and functions
- Day 16: Constraints to ensure type safety
*/

// ================================================================
// Step 1: Define Generic Validation Result
// ================================================================

console.log("--- Step 1: Validation Result ---");

// TODO: Define generic ValidationResult interface
interface ValidationResult<T> {
  // TODO: Add properties:
  // - isValid (boolean)
  // - value (optional T)
  // - error (optional string)
}

// ================================================================
// Step 2: Define Generic Validator Interface
// ================================================================

console.log("\n--- Step 2: Validator Interface ---");

// TODO: Define generic Validator interface
// TInput = what goes in, TOutput = what comes out
interface Validator<TInput, TOutput> {
  // TODO: Add method: validate(input: TInput): ValidationResult<TOutput>
}

// ================================================================
// Step 3: Type Validator with Type Guard
// ================================================================

console.log("\n--- Step 3: Type Validator ---");

// TODO: Implement TypeValidator class
// This validates that unknown input is of specific type T
class TypeValidator<T> implements Validator<unknown, T> {
  constructor(
    private typeName: string,
    private checker: (value: unknown) => value is T
  ) {}

  validate(input: unknown): ValidationResult<T> {
    // TODO: Use type guard (checker) to validate
    // TODO: If valid, return { isValid: true, value: input as T }
    // TODO: If invalid, return { isValid: false, error: `Expected ${typeName}` }
  }
}

// ================================================================
// Step 4: Range Validator with Constraint
// ================================================================

console.log("\n--- Step 4: Range Validator ---");

// TODO: Implement RangeValidator
// T must be comparable (number, string, etc.)
class RangeValidator<T /* TODO: add constraint */> implements Validator<T, T> {
  constructor(
    private min?: T,
    private max?: T
  ) {}

  validate(input: T): ValidationResult<T> {
    // TODO: Check if input is within range [min, max]
    // TODO: Return appropriate ValidationResult
  }
}

// ================================================================
// Step 5: Object Validator with Constraints
// ================================================================

console.log("\n--- Step 5: Object Validator ---");

// TODO: Implement ObjectValidator
// T must be an object (Record<string, any>)
class ObjectValidator<T /* TODO: add constraint */>
  implements Validator<unknown, T> {

  constructor(
    // Schema maps each property to its validator
    private schema: { [K in keyof T]: Validator<any, T[K]> }
  ) {}

  validate(input: unknown): ValidationResult<T> {
    // TODO: Check if input is an object
    // TODO: Validate each property using its validator
    // TODO: If any property fails, return error
    // TODO: If all pass, return validated object
  }
}

// ================================================================
// Step 6: Array Validator with Constraints
// ================================================================

console.log("\n--- Step 6: Array Validator ---");

// TODO: Implement ArrayValidator
// Validates that input is array of T
class ArrayValidator<T> implements Validator<unknown, T[]> {
  constructor(
    private itemValidator: Validator<unknown, T>
  ) {}

  validate(input: unknown): ValidationResult<T[]> {
    // TODO: Check if input is an array
    // TODO: Validate each item
    // TODO: Return ValidationResult<T[]>
  }
}

// ================================================================
// Step 7: Usage Example
// ================================================================

console.log("\n--- Step 7: Usage Example ---");

// Define domain types
interface User {
  name: string;
  age: number;
  email: string;
}

// Create validators (uncomment when ready):
// const stringValidator = new TypeValidator<string>(
//   "string",
//   (v): v is string => typeof v === "string"
// );

// const numberValidator = new TypeValidator<number>(
//   "number",
//   (v): v is number => typeof v === "number"
// );

// const ageValidator = new RangeValidator<number>(0, 120);

// const userValidator = new ObjectValidator<User>({
//   name: stringValidator,
//   age: ageValidator,
//   email: stringValidator
// });

// Test validation:
// const validUser = {
//   name: "Ali",
//   age: 25,
//   email: "ali@example.com"
// };

// const result1 = userValidator.validate(validUser);
// console.log("Valid user:", result1);

// const invalidUser = {
//   name: "Sara",
//   age: 150,  // Invalid age
//   email: "sara@example.com"
// };

// const result2 = userValidator.validate(invalidUser);
// console.log("Invalid user:", result2);

// ================================================================
// Step 8: Constrained Helper Functions
// ================================================================

console.log("\n--- Step 8: Helper Functions ---");

// TODO: Generic function to validate array of items
function validateAll<TInput, TOutput>(
  items: TInput[],
  validator: Validator<TInput, TOutput>
): ValidationResult<TOutput>[] {
  // TODO: Map over items and validate each
}

// TODO: Check if all validations passed
function allValid<T>(results: ValidationResult<T>[]): boolean {
  // TODO: Check if every result.isValid is true
}

// TODO: Extract only valid values
function getValidValues<T>(results: ValidationResult<T>[]): T[] {
  // TODO: Filter valid results and extract values
}

// TODO: Extract all error messages
function getErrors<T>(results: ValidationResult<T>[]): string[] {
  // TODO: Filter invalid results and extract errors
}

// ================================================================
// Step 9: Advanced - Conditional Validator
// ================================================================

console.log("\n--- Step 9: Conditional Validator ---");

// TODO: Validator that chooses validation based on condition
class ConditionalValidator<T> implements Validator<T, T> {
  constructor(
    private condition: (input: T) => boolean,
    private ifTrue: Validator<T, T>,
    private ifFalse: Validator<T, T>
  ) {}

  validate(input: T): ValidationResult<T> {
    // TODO: Choose validator based on condition
  }
}

// ================================================================
// Step 10: Entity Validator with BaseEntity Constraint
// ================================================================

console.log("\n--- Step 10: Entity Validator ---");

// TODO: Constraint from Day 16
interface BaseEntity {
  id: string;
  createdAt: number;
  updatedAt: number;
}

// TODO: Generic entity validator
// T must extend BaseEntity
class EntityValidator<T /* TODO: add constraint */>
  implements Validator<unknown, T> {

  constructor(
    private baseValidator: ObjectValidator<T>
  ) {}

  validate(input: unknown): ValidationResult<T> {
    // TODO: Use baseValidator to validate
    // TODO: Additional check: ensure createdAt <= updatedAt
  }
}

// ================================================================
// Concepts Applied Checklist
// ================================================================

console.log("\n=== Concepts Applied ===");
console.log("\nDay 15 Concepts:");
console.log("  [ ] Generic interfaces (ValidationResult, Validator)");
console.log("  [ ] Generic functions (validateAll, getValidValues)");
console.log("  [ ] Generic classes (all validator classes)");
console.log("  [ ] Type parameters <T, TInput, TOutput>");

console.log("\nDay 16 Concepts:");
console.log("  [ ] extends constraint (RangeValidator, EntityValidator)");
console.log("  [ ] Interface constraint (T extends BaseEntity)");
console.log("  [ ] Object constraint (T extends Record<string, any>)");
console.log("  [ ] keyof in schema ({ [K in keyof T]: ... })");

console.log("\nWeek 1-2 Concepts:");
console.log("  [ ] Interfaces and types");
console.log("  [ ] Classes and OOP");
console.log("  [ ] Type guards (value is T)");

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All validators implemented");
console.log("[ ] Generic interfaces work");
console.log("[ ] Constraints properly applied");
console.log("[ ] Helper functions implemented");
console.log("[ ] Type safety maintained throughout");
console.log("[ ] All tests pass");

console.log("\n🎉 Combining 3 weeks of learning!");
