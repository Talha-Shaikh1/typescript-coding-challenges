"use strict";
// Practice 1 — Basic tuple
// type ApiKey = [string, number] banao jisme [key: string, expiryDays: number] ho. Ek variable banao is type ka, phir destructure karke dono values print karo.
let apiKey = ["key", 23];
let [key, number] = apiKey;
console.log(key, number);
// Practice 2 — Function returning tuple
// validateOTP(otp: string): [boolean, string] function likho:
// Agar otp.length === 6 → [true, "Valid OTP"]
// Warna → [false, "OTP must be 6 digits"]
function validateOTP(otp) {
    if (otp.length === 6) {
        return [true, "Valid OTP"];
    }
    else {
        return [false, "OTP must be 6 digits"];
    }
}
let [_, message] = validateOTP("00984");
console.log(message);
let arr = [
    ["event 1", 100, "hello"],
    ["event 02", 200]
];
// Practice 4 — readonly trap
// let version: [number, number] = [1, 0] banao (bina readonly). Try karo .push(2) karna — dekho error aata hai ya nahi. Phir readonly laga kar dobara try karo aur farq dekho.
let version = [1, 0];
// version.push(2) //error
console.log(version);
// Practice 5 — SDK combo (Bonus)
// Function checkRateLimit(sent: number, limit: number): [boolean, number] banao jo:
// Agar sent >= limit → [false, 0] return kare (remaining = 0)
// Warna → [true, limit - sent] return kare (kitne messages aur bhej sakte ho)
// Phir getRateLimit() (upar wale example se) ka output isme pass karke result nikalo.
function checkRateLimit(sent, limit) {
    if (sent >= limit) {
        return [false, 0];
    }
    return [true, limit - sent];
}
console.log(checkRateLimit(2, 4));
