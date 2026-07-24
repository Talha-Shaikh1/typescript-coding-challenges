// types.ts - Type Definitions - SOLUTION

// Phone number in E.164 format
export type PhoneNumber = string;

// Country codes - can be extended
export type CountryCode = "92" | "1" | "44" | "91" | "86";

// Validation result
export interface ValidationResult {
  isValid: boolean;
  formatted?: string;
  error?: string;
}

// Phone information
export interface PhoneInfo {
  original: string;
  formatted: string;
  countryCode: string;
  nationalNumber: string;
  isValid: boolean;
}

// Options for validator
export interface ValidatorOptions {
  defaultCountryCode?: CountryCode;
  strictMode?: boolean;
}
