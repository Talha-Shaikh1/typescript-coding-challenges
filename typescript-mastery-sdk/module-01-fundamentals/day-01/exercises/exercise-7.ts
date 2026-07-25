// Exercise 7: Phone Validator (Real SDK Task!)
// Validate E.164 phone number format

console.log("=== Phone Number Validator ===\n");

let phone: string = "+923001234567";

// TODO: Check if phone starts with "+" → startsWithPlus (boolean)
let isPhoneStartWithPlus: boolean = phone.startsWith("+")

// TODO: Get phone length → phoneLength (number)
let phoneNumberLenght: number = phone.length
// TODO: Check if length >= 10 → hasValidLength (boolean)
let hasValidLength: boolean = phoneNumberLenght >= 10

// TODO: Both checks must pass → isValid (boolean)
let isValid: boolean = isPhoneStartWithPlus && hasValidLength

// TODO: Print all results
console.log("Phone:", phone);
console.log("isPhoneStartWithPlus", isPhoneStartWithPlus)
console.log("phoneNumberLenght", phoneNumberLenght)
console.log("hasValidLength", hasValidLength)
console.log("isValid", isValid)
console.log("\n✅ Exercise 7 complete!");

// Hints:
// - Use .startsWith("+")
// - Use .length property
// - Use && for "both must be true"
