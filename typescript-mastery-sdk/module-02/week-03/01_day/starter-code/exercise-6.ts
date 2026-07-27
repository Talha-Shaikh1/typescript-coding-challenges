// Exercise 6: Cumulative Revision
// Combines Week 1-2 concepts with today's generics

console.log("=== Exercise 6: Cumulative Revision ===\n");
console.log("Combining: Week 1-2 + Today's Generics\n");

// ================================================================
// Task: Build a Generic Validation System
// ================================================================

/*
Goal: Create a reusable validation framework that combines:
- Week 1: Interfaces, types, validation logic
- Week 2: Classes, OOP patterns
- Today: Generics for reusable validators
*/

// ================================================================
// Step 1: Define Generic Validation Result
// ================================================================

console.log("--- Step 1: Generic Validation Result ---");

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

console.log("\n--- Step 2: Generic Validator Interface ---");

// TODO: Define generic Validator interface
interface Validator<T> {
  // TODO: Add method: validate(input: string): ValidationResult<T>
}

// ================================================================
// Step 3: Implement Phone Validator (Week 1 concept)
// ================================================================

console.log("\n--- Step 3: Phone Validator ---");

// TODO: Implement PhoneValidator class
class PhoneValidator implements Validator<string> {
  validate(input: string): ValidationResult<string> {
    // TODO: Validate E.164 format: +[country code][number]
    // Regex from Week 1: /^\+\d{10,15}$/

    // TODO: If valid, return:
    // { isValid: true, value: input }

    // TODO: If invalid, return:
    // { isValid: false, error: 'Invalid phone format. Must be E.164 format (+1234567890)' }
  }
}

// ================================================================
// Step 4: Implement Email Validator
// ================================================================

console.log("\n--- Step 4: Email Validator ---");

// TODO: Implement EmailValidator class
class EmailValidator implements Validator<string> {
  validate(input: string): ValidationResult<string> {
    // TODO: Simple email validation
    // Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    // TODO: Return ValidationResult<string>
  }
}

// ================================================================
// Step 5: Implement Number Validator
// ================================================================

console.log("\n--- Step 5: Number Validator ---");

// TODO: Implement NumberValidator class
class NumberValidator implements Validator<number> {
  constructor(
    private min?: number,
    private max?: number
  ) {}

  validate(input: string): ValidationResult<number> {
    // TODO: Convert string to number
    const num = parseFloat(input);

    // TODO: Check if valid number
    // if (isNaN(num)) return { isValid: false, error: '...' }

    // TODO: Check min/max bounds if provided

    // TODO: Return ValidationResult<number>
  }
}

// ================================================================
// Step 6: Implement URL Validator
// ================================================================

console.log("\n--- Step 6: URL Validator ---");

// TODO: Implement URLValidator class
class URLValidator implements Validator<string> {
  validate(input: string): ValidationResult<string> {
    // TODO: Validate URL format
    // Try using: new URL(input)
    // If it throws, it's invalid

    // TODO: Return ValidationResult<string>
  }
}

// ================================================================
// Step 7: Generic Validation Function
// ================================================================

console.log("\n--- Step 7: Generic Validation Function ---");

// TODO: Implement generic validateInput function
function validateInput<T>(
  input: string,
  validator: Validator<T>
): ValidationResult<T> {
  // TODO: Call validator.validate(input) and return result
}

// ================================================================
// Step 8: Validation Helper Functions
// ================================================================

console.log("\n--- Step 8: Helper Functions ---");

// TODO: Create helper to validate multiple inputs
function validateAll<T>(
  inputs: string[],
  validator: Validator<T>
): ValidationResult<T>[] {
  // TODO: Map over inputs and validate each
  // Return array of ValidationResult<T>
}

// TODO: Create helper to check if all validations passed
function allValid<T>(results: ValidationResult<T>[]): boolean {
  // TODO: Check if every result.isValid is true
}

// TODO: Create helper to get only valid values
function getValidValues<T>(results: ValidationResult<T>[]): T[] {
  // TODO: Filter valid results and map to their values
}

// TODO: Create helper to get all errors
function getErrors<T>(results: ValidationResult<T>[]): string[] {
  // TODO: Filter invalid results and map to their errors
}

// ================================================================
// Step 9: Usage Tests
// ================================================================

console.log("\n--- Step 9: Usage Tests ---");

// Uncomment to test:

// Test 1: Phone validation
// const phoneValidator = new PhoneValidator();
// const phoneResult = validateInput('+1234567890', phoneValidator);
// console.log("Phone validation:", phoneResult);

// Test 2: Email validation
// const emailValidator = new EmailValidator();
// const emailResult = validateInput('user@example.com', emailValidator);
// console.log("Email validation:", emailResult);

// Test 3: Number validation with range
// const numberValidator = new NumberValidator(0, 100);
// const numResult1 = validateInput('42', numberValidator);
// const numResult2 = validateInput('150', numberValidator);
// console.log("Number validation (42):", numResult1);
// console.log("Number validation (150):", numResult2);

// Test 4: Multiple validations
// const phones = ['+1234567890', '1234567890', '+9876543210'];
// const phoneResults = validateAll(phones, phoneValidator);
// console.log("All phone results:", phoneResults);
// console.log("All valid?", allValid(phoneResults));
// console.log("Valid values:", getValidValues(phoneResults));
// console.log("Errors:", getErrors(phoneResults));

// ================================================================
// Step 10: Advanced - Form Validation
// ================================================================

console.log("\n--- Step 10: Advanced - Form Validation ---");

// TODO: Define a generic Form interface
interface Form {
  [key: string]: string;
}

// TODO: Define validation rules map
interface ValidationRules<T extends Form> {
  [K in keyof T]: Validator<any>;
}

// TODO: Define form validation result
interface FormValidationResult<T extends Form> {
  isValid: boolean;
  values: Partial<T>;
  errors: Partial<Record<keyof T, string>>;
}

// TODO: Implement generic form validator
function validateForm<T extends Form>(
  form: T,
  rules: ValidationRules<T>
): FormValidationResult<T> {
  // TODO: Validate each form field using its validator
  // TODO: Collect valid values and errors
  // TODO: Return FormValidationResult
}

// Test form validation (uncomment when ready):
// interface UserForm {
//   phone: string;
//   email: string;
//   age: string;
// }

// const userForm: UserForm = {
//   phone: '+1234567890',
//   email: 'user@example.com',
//   age: '25'
// };

// const formRules: ValidationRules<UserForm> = {
//   phone: new PhoneValidator(),
//   email: new EmailValidator(),
//   age: new NumberValidator(18, 100)
// };

// const formResult = validateForm(userForm, formRules);
// console.log("Form validation:", formResult);

// ================================================================
// Concepts Applied Checklist
// ================================================================

console.log("\n=== Concepts Applied ===");
console.log("\nWeek 1 Concepts:");
console.log("  [ ] Interfaces (ValidationResult, Validator)");
console.log("  [ ] Type annotations");
console.log("  [ ] Union types (T | undefined)");
console.log("  [ ] Validation logic (regex)");

console.log("\nWeek 2 Concepts:");
console.log("  [ ] Classes (validators)");
console.log("  [ ] Implements keyword");
console.log("  [ ] Constructor parameters");
console.log("  [ ] OOP patterns");

console.log("\nToday's Concepts:");
console.log("  [ ] Generic interfaces");
console.log("  [ ] Generic functions");
console.log("  [ ] Generic classes");
console.log("  [ ] Type parameters <T>");
console.log("  [ ] Type safety with generics");

// ================================================================
// Success Criteria
// ================================================================

console.log("\n=== Success Criteria ===");
console.log("[ ] All validators implemented");
console.log("[ ] Generic interfaces work");
console.log("[ ] Helper functions implemented");
console.log("[ ] Type safety maintained");
console.log("[ ] All tests pass");
console.log("[ ] Form validation works (bonus)");

console.log("\n🎉 You've combined 3 weeks of learning in one exercise!");
