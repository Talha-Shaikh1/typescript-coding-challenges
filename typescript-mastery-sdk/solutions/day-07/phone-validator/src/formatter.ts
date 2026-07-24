// formatter.ts - Formatting Functions - SOLUTION

import type { PhoneNumber, CountryCode, PhoneInfo } from "./types";
import { validate } from "./validator";

export function addCountryCode(
  phone: string,
  countryCode: CountryCode = "92"
): string {
  if (phone.startsWith("+")) {
    return phone;
  }
  return `+${countryCode}${phone}`;
}

export function extractCountryCode(phone: PhoneNumber): string {
  // Extract first 1-3 digits after +
  const match = phone.match(/^\+(\d{1,3})/);
  return match ? match[1] : "";
}

export function getPhoneInfo(phone: string): PhoneInfo {
  const formatted = addCountryCode(phone);
  const countryCode = extractCountryCode(formatted);
  const nationalNumber = formatted.substring(countryCode.length + 1);
  const validationResult = validate(formatted);

  return {
    original: phone,
    formatted,
    countryCode,
    nationalNumber,
    isValid: validationResult.isValid
  };
}

export function formatBatch(
  phones: string[],
  countryCode?: CountryCode
): string[] {
  return phones.map(phone => addCountryCode(phone, countryCode));
}
