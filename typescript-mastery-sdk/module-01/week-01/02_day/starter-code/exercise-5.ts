// Exercise 5: Boolean Logic for Validation

// TODO 1: Create isValidPhoneNumber function
// - Must start with '+'
// - Must be at least 10 characters
// - Must contain only digits after +

function isValidPhoneNumber(phone: string): boolean {
    let regex = /^\d+$/;
    let remainingPhone = phone.slice(1)
    if (phone.length >= 10 && phone.startsWith("+") && regex.test(remainingPhone)) {
        return true
    } else {
        return false
    }
}

// TODO 2: Create isValidMessage function
// - Must not be empty (length > 0)
// - Must be <= 4096 characters (WhatsApp limit)
function isValidMessage(text: string): boolean {
   return text.trim().length > 0 && text.length <= 4096
}

// TODO 3: Create canSendMessage function
// - Return true only if ALL conditions are true
// - Use && operator
function canSendMessage(
  isAuthenticated: boolean,
  hasQuota: boolean,
  isValidPhone: boolean
): boolean {
    return isAuthenticated && hasQuota && isValidPhone
}

// TODO: Test your functions
console.log("Valid phone:", isValidPhoneNumber("+923001234567"));
console.log("Valid phone:", isValidPhoneNumber("92300"));
console.log("Valid message:", isValidMessage("Hello"));
console.log("Valid message:", isValidMessage("a".repeat(5000)));
console.log("Can send:", canSendMessage(true, true, true));
console.log("Can send:", canSendMessage(false, true, true));
