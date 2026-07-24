// types.ts - Type Definitions
// Exercise 2: Complete all type definitions

// TODO: Define PhoneNumber type alias
// This represents a phone number in E.164 format (e.g., "+923001234567")
export type PhoneNumber = string;

// TODO: Define CountryCode type with at least 5 countries
// Use string literal union type
// Example: "92" | "1" | "44" | ...
export type CountryCode = "92" | "1" | "44" | "91" | "86";

// TODO: Define ValidationResult interface
// Should have:
// - isValid: boolean
// - formatted?: string (optional, only if valid)
// - error?: string (optional, only if invalid)
export interface ValidationResult {
  // Add properties here
}

// TODO: Define PhoneInfo interface
// Should have:
// - original: string (the input phone)
// - formatted: string (with country code)
// - countryCode: string (extracted code)
// - nationalNumber: string (without country code)
// - isValid: boolean
export interface PhoneInfo {
  // Add properties here
}

// TODO: Define ValidatorOptions interface
// Should have:
// - defaultCountryCode?: CountryCode (optional)
// - strictMode?: boolean (optional)
export interface ValidatorOptions {
  // Add properties here
}
