// errors.ts - Custom Error Classes - SOLUTION

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

export class InvalidFormatError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number must start with +",
      "INVALID_FORMAT",
      phone
    );
  }
}

export class InvalidLengthError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number must be between 10 and 15 characters",
      "INVALID_LENGTH",
      phone
    );
  }
}

export class InvalidCharactersError extends PhoneValidationError {
  constructor(phone: string) {
    super(
      "Phone number contains invalid characters",
      "INVALID_CHARACTERS",
      phone
    );
  }
}
