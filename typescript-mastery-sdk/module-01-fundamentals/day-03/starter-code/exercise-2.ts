// Exercise 2: Tuples for Function Returns

// TODO 1: Create validateAndFormatPhone function
// Return [isValid, formattedPhone]
// If valid, format by adding +92 if missing
// If invalid, return [false, original phone]
// function validateAndFormatPhone(phone: string): [boolean, string] {
//
// }

// TODO 2: Create sendBulkMessages function
// Return [sent, failed, total]
// Assume 80% success rate for simulation
// function sendBulkMessages(recipients: string[]): [number, number, number] {
//   const total = recipients.length;
//   const sent = Math.floor(total * 0.8);
//   const failed = total - sent;
//   return [sent, failed, total];
// }

// TODO 3: Create getRateLimitStatus function
// Return [currentCount, maxLimit, canSend]
// Example: [75, 80, true]
// function getRateLimitStatus(): [number, number, boolean] {
//
// }

// TODO: Test your functions
// const [valid, formatted] = validateAndFormatPhone("+923001234567");
// console.log(`Valid: ${valid}, Formatted: ${formatted}`);

// const [invalid, original] = validateAndFormatPhone("abc123");
// console.log(`Invalid: ${invalid}, Original: ${original}`);

// const recipients = ["phone1", "phone2", "phone3", "phone4", "phone5", "phone6", "phone7", "phone8", "phone9", "phone10"];
// const [sent, failed, total] = sendBulkMessages(recipients);
// console.log(`Bulk send: sent=${sent}, failed=${failed}, total=${total}`);

// const [current, max, canSend] = getRateLimitStatus();
// console.log(`Rate limit: ${current}/${max}, can send: ${canSend}`);
