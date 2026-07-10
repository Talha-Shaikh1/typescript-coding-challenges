"use strict";
// Ek number check karo ke even hai ya odd.
let number = 2;
if (number % 2 == 0) {
    console.log(number + " is even");
}
else {
    console.log(number + ' is odd');
}
// Q12. Ek number check karo positive, negative ya zero hai.
// Input: -5 → Output: "Negative"
let num1 = -2;
if (num1 === 0) {
    console.log(`${num1} is zero`);
}
else if (num1 > 0) {
    console.log(`${num1} is positive`);
}
else {
    console.log(`${num1} is negative`);
}
// Q13. Do numbers compare karo aur bataao konsa bara hai.
// Input: a=10, b=20 → Output: "b is greater"
let a = 34;
let b = 42;
if (a > b) {
    console.log(`${a} is greater than ${b}`);
}
else {
    console.log(`${b} is greater than ${a}`);
}
// Q14. Age check karo aur bataao "Minor" (< 18), "Adult" (18–59), ya "Senior" (60+).
// Input: 65 → Output: "Senior"
let age = 32;
if (age < 18) {
    console.log("Minor");
}
else if (age >= 18 && age < 60) {
    console.log("Adult");
}
else if (age >= 60) {
    console.log("Senior");
}
else {
    console.log("Invalid Age");
}
// Q15. Grade calculator: marks lo aur grade do.
// 90+ = A, 80-89 = B, 70-79 = C, <70 = F
// Input: 85 → Output: "B"
let percentage = 44;
if (percentage >= 90 && percentage < 101) {
    console.log("Your Grade is A");
}
else if (percentage < 90 && percentage >= 80) {
    console.log("Your Grade is B");
}
else if (percentage >= 70 && percentage < 80) {
    console.log("Your Grade is C");
}
else if (percentage < 70 && percentage > 0) {
    console.log("Your Grade is F");
}
else {
    console.log("invalid percentage");
}
