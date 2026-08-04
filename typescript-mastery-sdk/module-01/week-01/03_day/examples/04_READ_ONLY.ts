// Practice 1 — readonly revision
// const ALLOWED_COUNTRIES: readonly string[] banao jisme "PK", "US", "UK" ho. Try karo .push() karna, error dekho, samjho kyun aaya.

const ALLOWED_COUNTRIES: readonly string[] = ["PK", "UK", "US"]

// ALLOWED_COUNTRIES.push("afg") //Property 'push' does not exist on type 'readonly string[]'.


// Practice 2 — find vs filter
// users array (upar wale example se) mein se:

// .find() se "Hassan" naam wala user nikalo
// .filter() se un sab users ko nikalo jinka phone "+92300" se start hota hai

type User = { id: string; name: string; phone: string };

let users: User[] = [
  { id: "1", name: "Ali", phone: "+923001234567" },
  { id: "2", name: "Ahmed", phone: "+923001234568" },
  { id: "3", name: "Hassan", phone: "+923001234569" }
];

let findUser = users.find(user => user.name == "Hassan")

console.log(findUser)

let filterByNo = users.filter(user => user.phone.startsWith("+92300"))

console.log(filterByNo)


// Practice 3 — some/every
// messageQueue array lo aur check karo:

// .some() se — koi message "failed" status wala hai?
// .every() se — kya sab messages ke retries 5 se kam hain?

type QueuedMessage = {
  id: string;
  to: string;
  text: string;
  status: "pending" | "sending" | "sent" | "failed";
  retries: number;
};

let messageQueue: QueuedMessage[] = [
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
  },
  {
    id: "msg5",
    to: "+923001234571",
    text: "Your subscription has been renewed.",
    status: "pending",
    retries: 0
  },
  {
    id: "msg6",
    to: "+923001234572",
    text: "Delivery is on the way.",
    status: "failed",
    retries: 2
  }
];

let hasFailedMessage = messageQueue.some(
  msg => msg.status === "failed"
);

let areRetriesUnderLimit = messageQueue.every(
  msg => msg.retries < 5
);

console.log("Has failed message:", hasFailedMessage);
console.log("All retries under limit:", areRetriesUnderLimit);

// Practice 4 — 2D array
// Ek attendance: boolean[][] banao jisme 3 students ke 5 din ki attendance ho (har row ek student, har column ek din). .reduce() use karke pehle student ke total present days nikalo.

let attendance: boolean[][] = [
  [true, false, true, true, false],  // Student 1
  [true, true, true, false, true],   // Student 2
  [false, true, false, true, true]   // Student 3
]

let studentAttendanceDays = attendance[0].reduce((acc, currVal) => {
    if (currVal === true) {
        return acc + 1
    }
    else {
        return acc;
    }
},0 )

console.log("Student 1 Total Attendance Days: ",studentAttendanceDays)


// Practice 5 — SDK combo (Mushkil)
// messageQueue jaisa apna khud ka array banao 6 messages ka. Phir:

// .filter() se sirf "pending" aur "failed" status wale messages nikalo (hint: || OR operator use karo condition mein)
// .map() se un messages ko sirf { id: string, to: string } shape mein convert karo (baaki fields chhod do)
// .reduce() se total unread/pending count nikalo

let penOrFailed = messageQueue.filter((msg) => msg.status === "failed" || msg.status === "pending").map(({id, to}) => ({id, to}))

let pendingCount = messageQueue.reduce((count, msg) => {
  if (msg.status === "pending") {
    return count + 1
  }
  return count
},0)