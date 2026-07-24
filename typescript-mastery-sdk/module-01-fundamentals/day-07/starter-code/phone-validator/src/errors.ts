// errors.ts - Custom Error Classes
// Exercise 3: Complete all error classes

// TODO: Base error class
// Should extend Error and have:
// - message: string
// - code: string
// - phone: string
export class PhoneValidationError extends Error {
  constructor(
    message: string,
    public code: string,
    public phone: string
  ) {
    super(message);
    this.name = "PhoneValidationError";
  }
}

// TODO: Error for invalid format
// Should call parent with appropriate message and code "INVALID_FORMAT"
export class InvalidFormatError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number must start with +",
      "INVALID_FORMAT",
      phone
    );
  }
}

// TODO: Error for invalid length
// Should call parent with appropriate message and code "INVALID_LENGTH"
export class InvalidLengthError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      // Add your error message here
      "Phone number must be between 10 and 15 characters",
      "INVALID_LENGTH",
      phone
    );
  }
}

// BONUS TODO: Add one more error class of your choice
// Example: InvalidCountryCodeError, InvalidCharactersError, etc.
