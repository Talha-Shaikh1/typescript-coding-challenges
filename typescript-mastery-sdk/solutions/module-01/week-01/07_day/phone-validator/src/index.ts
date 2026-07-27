// index.ts - Public API - SOLUTION

// Export types
export type {
  PhoneNumber,
  ValidationResult,
  PhoneInfo,
  ValidatorOptions,
  CountryCode
} from "./types";

// Export errors
export {
  PhoneValidationError,
  InvalidFormatError,
  InvalidLengthError,
  InvalidCharactersError
} from "./errors";

// Export validators
export {
  validate,
  validateBatch,
  isValidFormat,
  isValidLength
} from "./validator";

// Export formatters
export {
  addCountryCode,
  extractCountryCode,
  getPhoneInfo,
  formatBatch
} from "./formatter";

// Main class for convenience
import type { PhoneNumber, CountryCode, ValidationResult, PhoneInfo } from "./types";
import { validate } from "./validator";
import { addCountryCode, getPhoneInfo } from "./formatter";

export class PhoneValidator {
  constructor(private defaultCountryCode: CountryCode = "92") {}

  validate(phone: string): ValidationResult {
    return validate(phone);
  }

  format(phone: string): string {
    return addCountryCode(phone, this.defaultCountryCode);
  }

  getInfo(phone: string): PhoneInfo {
    return getPhoneInfo(phone);
  }
}
