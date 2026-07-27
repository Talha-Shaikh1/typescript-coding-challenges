// validator.ts - Validation Functions - SOLUTION

import type { PhoneNumber, ValidationResult } from "./types";

export function isValidFormat(phone: string): boolean {
  // Check if starts with + and contains only digits after
  return /^\+\d+$/.test(phone);
}

export function isValidLength(phone: string): boolean {
  // Minimum 10 characters (+XX XXXXXXXX)
  // Maximum 15 characters (E.164 standard)
  return phone.length >= 10 && phone.length <= 15;
}

export function validate(phone: string): ValidationResult {
  if (!phone.startsWith("+")) {
    return {
      isValid: false,
      error: "Phone must start with +"
    };
  }

  if (!isValidFormat(phone)) {
    return {
      isValid: false,
      error: "Phone contains invalid characters"
    };
  }

  if (!isValidLength(phone)) {
    return {
      isValid: false,
      error: "Phone length is invalid (must be 10-15 characters)"
    };
  }

  return {
    isValid: true,
    formatted: phone
  };
}

export function validateBatch(phones: string[]): ValidationResult[] {
  return phones.map(phone => validate(phone));
}
