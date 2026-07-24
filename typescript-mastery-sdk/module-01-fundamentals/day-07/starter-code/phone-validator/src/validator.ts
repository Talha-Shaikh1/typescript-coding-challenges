// validator.ts - Validation Functions
// Exercise 4: Complete all validation functions

import type { PhoneNumber, ValidationResult } from "./types";

// TODO: Check if phone has valid format
// Should return true if:
// - Starts with '+'
// - Contains only digits after '+'
// HINT: Use regex /^\+\d+$/
export function isValidFormat(phone: string): boolean {
  // Implement here
  return false;
}

// TODO: Check if phone has valid length
// Should return true if:
// - Length >= 10 characters
// - Length <= 15 characters
export function isValidLength(phone: string): boolean {
  // Implement here
  return false;
}

// TODO: Validate a phone number
// Should return ValidationResult object with:
// - isValid: true/false
// - formatted: phone (if valid)
// - error: error message (if invalid)
//
// Check in order:
// 1. Must start with '+'
// 2. Must have valid format (use isValidFormat)
// 3. Must have valid length (use isValidLength)
export function validate(phone: string): ValidationResult {
  // Implement here
  return {
    isValid: false,
    error: "Not implemented"
  };
}

// TODO: Validate multiple phone numbers
// Should return array of ValidationResult
// HINT: Use phones.map()
export function validateBatch(phones: string[]): ValidationResult[] {
  // Implement here
  return [];
}
