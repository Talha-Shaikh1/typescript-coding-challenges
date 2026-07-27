/**
 * Exercise 2a: Named Exports
 * Convert default export to named exports and add more functions
 */

// TODO: Convert this default export to named export
export default function validatePhone(phone: string): boolean {
  return /^\+\d{10,15}$/.test(phone);
}

// TODO: Add these functions with named exports:

// 1. validateMessage(message: string): boolean
//    - Check if message is not empty
//    - Check if message length is <= 4096 characters

// 2. validateMessageId(id: string): boolean
//    - Check if id matches pattern: alphanumeric, underscore, dash only

// TODO: Create a usage example at the bottom
// import { validatePhone, validateMessage, validateMessageId } from './exercise-2a';

export {};
