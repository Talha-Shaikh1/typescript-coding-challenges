"use strict";
// Practice 1 — readonly revision
// const ALLOWED_COUNTRIES: readonly string[] banao jisme "PK", "US", "UK" ho. Try karo .push() karna, error dekho, samjho kyun aaya.
const ALLOWED_COUNTRIES = ["PK", "UK", "US"];
let users = [
    { id: "1", name: "Ali", phone: "+923001234567" },
    { id: "2", name: "Ahmed", phone: "+923001234568" },
    { id: "3", name: "Hassan", phone: "+923001234569" }
];
let findUser = users.find(user => user.name == "Hassan");
console.log(findUser);
let filterByNo = users.filter(user => user.phone.startsWith("+92300"));
console.log(filterByNo);
let messageQueue = [
    {
        id: "msg1",
        to: "+923001234567",
        text: "Welcome to BotAura!",
        status: "pending",
        retries: 0
    },
    {
        id: "msg2",
        to: "+923001234568",
        text: "Your order has been confirmed.",
        status: "sending",
        retries: 1
    },
    {
        id: "msg3",
        to: "+923001234569",
        text: "Your verification code is 123456.",
        status: "sent",
        retries: 0
    },
    {
        id: "msg4",
        to: "+923001234570",
        text: "Payment failed, please try again.",
        status: "failed",
        retries: 3
    }
];
let hasFailedMessage = messageQueue.some(msg => msg.status === "failed");
let areRetriesUnderLimit = messageQueue.every(msg => msg.retries < 5);
console.log("Has failed message:", hasFailedMessage);
console.log("All retries under limit:", areRetriesUnderLimit);
// Practice 4 — 2D array
// Ek attendance: boolean[][] banao jisme 3 students ke 5 din ki attendance ho (har row ek student, har column ek din). .reduce() use karke pehle student ke total present days nikalo.
let attendance = [
    [true, false, true, true, false], // Student 1
    [true, true, true, false, true], // Student 2
    [false, true, false, true, true] // Student 3
];
let studentAttendanceDays = attendance[0].reduce((acc, currVal) => {
    if (currVal === true) {
        return acc + 1;
    }
    else {
        return acc;
    }
}, 0);
console.log("Student 1 Total Attendance Days: ", studentAttendanceDays);
