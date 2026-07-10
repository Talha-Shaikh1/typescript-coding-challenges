// Q1. Ek variable age banao (type: number) aur usay console mein print karo.

let age: number = 23
console.log(age) // output 23

// Q2. name (string) aur isStudent (boolean) variables banao, dono ko print karo.

let studentName: string = "Talha"
let isStudent: boolean = true

console.log(studentName, isStudent);

// Q3. Do numbers ke liye variables banao aur unka sum print karo.

let num1: number = 34
let num2: number = 32

console.log(num1 + num2)

// Q4. Ek string variable city banao aur uski .length print karo.

let cityName: string = "Karachi"
console.log(cityName.length)

// Q5. let vs const ka farq dikhane k liye: ek const variable banao aur usay reassign karne ki koshish karo (error dekho, comment mein likho kyun aya).

const myId: number = 2324
// myId = 234 error Cannot assign to 'myId' because it is a constant.
console.log(myId)

// Q6. Type annotation k saath ek array banao (number[]) jisme 5 numbers hon, print karo.

let numbers: number[] = [2,34,5, 6]
console.log(numbers)

// Q7. any type ka ek variable banao jisme pehle number, phir string assign karo. Print karke dikhao ye kaise change ho raha hai.

let variable: any = 1234
console.log(variable)
variable = "hekk"
console.log(variable);


// Q8. Do variables a aur b banao, unki values swap karo (bina third variable use kiye, tuple trick se).

let a: number = 5;
let b: number = 10;

[a, b] = [b, a];

console.log("a =", a);
console.log("b =", b);

// Q9. Ek union type variable banao jo string | number ho. Pehle string assign karo, phir number.

let unionVariable: string | number = "Talha Shaikh";
console.log(unionVariable);
unionVariable = 2341
console.log(unionVariable);


// Q10. Template literal use karke ek sentence print karo jisme naam aur age dono ho.

// Input: name = "Ali", age = 22
// Output: "Ali is 22 years old"

let name2: string = "Ali"
let age2: number = 22
console.log(`${name2} is ${age2} years old`);
