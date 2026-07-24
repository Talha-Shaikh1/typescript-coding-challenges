// formatter.ts - Formatting Functions
// Exercise 5: Complete all formatting functions

import type { PhoneNumber, CountryCode, PhoneInfo } from "./types";
import { validate } from "./validator";

// TODO: Add country code to phone number
// If phone already starts with '+', return as-is
// Otherwise, add '+{countryCode}' prefix
// Default countryCode is "92"
export function addCountryCode(
  phone: string,
  countryCode: CountryCode = "92"
): string {
  // Implement here
  return phone;
}

// TODO: Extract country code from phone number
// Should extract 1-3 digits after '+'
// Example: "+923001234567" → "92"
// Example: "+14155552671" → "1"
// HINT: Use regex /^\+(\d{1,3})/
export function extractCountryCode(phone: PhoneNumber): string {
  // Implement here
  return "";
}

// TODO: Get complete phone information
// Should return PhoneInfo object with:
// - original: the input phone
// - formatted: phone with country code
// - countryCode: extracted code
// - nationalNumber: phone without country code and '+'
// - isValid: validation result
//
// Steps:
// 1. Add country code (use addCountryCode)
// 2. Extract country code (use extractCountryCode)
// 3. Get national number (everything after '+' and country code)
// 4. Validate (use validate function)
export function getPhoneInfo(phone: string): PhoneInfo {
  // Implement here
  return {
    original: phone,
    formatted: "",
    countryCode: "",
    nationalNumber: "",
    isValid: false
  };
}

// TODO: Format multiple phone numbers
// Should return array of formatted phones
// HINT: Use phones.map()
export function formatBatch(
  phones: string[],
  countryCode?: CountryCode
): string[] {
  // Implement here
  return [];
}
