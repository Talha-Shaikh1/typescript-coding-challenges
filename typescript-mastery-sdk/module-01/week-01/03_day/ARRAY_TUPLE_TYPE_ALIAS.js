"use strict";
// Practice 1 — Array Basics
// Ek array banao pendingMessages: string[] jisme 3 message IDs ho.
// Usme ek naya message ID add karo (.push)
// Un IDs ko filter karo jo "wamid_" se start hote hain (hint: .startsWith())
let pendingMessages = ["1234", "wamid_1234", "5678"];
pendingMessages.push("wamid_5678");
console.log(pendingMessages);
let filterId = pendingMessages.filter(Id => Id.startsWith("wamid"));
console.log("filter Ids: ", filterId);
// Practice 2 — Tuple for SDK function
// Ek function validatePhone(phone: string) banao jo tuple return kare [boolean, string]:
// Agar phone + se start ho → [true, "Valid"]
// Warna → [false, "Invalid format"]
function validatePhone(phone) {
    if (phone.startsWith("+")) {
        return [true, "Valid"];
    }
    else {
        return [false, 'Invalid format'];
    }
}
console.log(validatePhone("+92312131435"));
function getIcon(type) {
    switch (type) {
        case 'text':
            return '📝';
        case 'document':
            return '📄';
        case 'video':
            return '📽️';
        case 'image':
            return '📷';
        default:
            return '?';
    }
}
console.log(getIcon("text"));
console.log(getIcon("image"));
console.log(getIcon("video"));
console.log(getIcon("document"));
// Practice 5 — readonly Challenge
// const SUPPORTED_LANGUAGES: readonly string[] banao jisme "en", "ur" ho.
// Try karo .push() karna — dekho TypeScript kya error deta hai (screenshot le kar samajhna)
const SUPPORTED_LANGUAGES = ['en', 'ur'];
// SUPPORTED_LANGUAGES.push('latin') // Property 'push' does not exist on type 'readonly string[]'.ts(2339)
// Practice 6 — Bonus (Thoda Mushkil)
// Function sendBulkMessages(phones: string[]) banao jo:
// Har phone ko validatePhone (Practice 2 wala) se check kare
// Valid aur invalid phones ko alag alag arrays mein daale
// Tuple return kare: [validCount: number, invalidCount: number]
// Hint: .filter() + tumhara Practice 2 wala function combine karna hai.
function sendBulkMessages(phones) {
    let validPhones = [];
    let invalidPhones = [];
    validPhones = phones.filter(ph => validatePhone(ph)[0]);
    invalidPhones = phones.filter(ph => !validatePhone(ph)[0]);
    return [validPhones.length, invalidPhones.length];
}
console.log(sendBulkMessages(['031314', '+31414', '42424']));
