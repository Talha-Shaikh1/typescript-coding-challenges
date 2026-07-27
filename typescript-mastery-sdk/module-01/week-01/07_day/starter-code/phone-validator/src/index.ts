// index.ts - Public API
// Exercise 6: Export everything and create PhoneValidator class

// TODO: Export all types
// export type { ... } from "./types";

// TODO: Export all errors
// export { ... } from "./errors";

// TODO: Export all validators
// export { ... } from "./validator";

// TODO: Export all formatters
// export { ... } from "./formatter";

// Import what you need for the class
import type { PhoneNumber, CountryCode, ValidationResult, PhoneInfo } from "./types";
import { validate } from "./validator";
import { addCountryCode, getPhoneInfo } from "./formatter";

// TODO: Create PhoneValidator class
// Should have:
// - constructor that accepts defaultCountryCode (default "92")
// - validate method
// - format method
// - getInfo method
export class PhoneValidator {
  constructor(private defaultCountryCode: CountryCode = "92") {}

  // TODO: Implement validate method
  validate(phone: string): ValidationResult {
    // Use the validate function
    return validate(phone);
  }

  // TODO: Implement format method
  format(phone: string): string {
    // Use addCountryCode with this.defaultCountryCode
    return phone;
  }

  // TODO: Implement getInfo method
  getInfo(phone: string): PhoneInfo {
    // Use getPhoneInfo function
    return {
      original: "",
      formatted: "",
      countryCode: "",
      nationalNumber: "",
      isValid: false
    };
  }
}
