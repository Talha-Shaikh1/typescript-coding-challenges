// Exercise 3: SDK Phone Validator (Real World!)
// This is a real utility for your WhatsApp SDK!

// TODO: Create a function 'validatePhoneNumber' that:
// - Takes phone (string) parameter
// - Returns an object with:
//   - isValid (boolean): true if phone starts with '+'
//   - message (string): "Valid format" or "Must start with +"

// function validatePhoneNumber(phone: string): { isValid: boolean; message: string } {
//   // Your code here
//   // Hint: Use phone.startsWith('+')
// }


// TODO: Test with these phone numbers
// const testNumbers = [
//   "+923001234567",  // Valid
//   "923001234567",   // Invalid
//   "+14155552671"    // Valid
// ];

// testNumbers.forEach(phone => {
//   const result = validatePhoneNumber(phone);
//   console.log(`Phone: ${phone}`);
//   console.log(`Valid: ${result.isValid}, Message: ${result.message}`);
//   console.log("---");
// });


// When complete, run:
// npx tsc exercise-3.ts
// node exercise-3.js
