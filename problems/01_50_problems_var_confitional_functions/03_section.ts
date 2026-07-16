// Q26. Ek function banao add(a: number, b: number) jo dono ka sum return kare.

// add(3, 4) → 7

function addTwoNumbers(a: number, b: number){
    return a + b
}

console.log(addTwoNumbers(4, 5))

// Q27. Function banao isEven(num: number): boolean jo true/false return kare.

function isEven(num: number): boolean {
    if (num % 2 === 0) {
        return true
    } else {
        return false
    }
    
}

console.log(isEven(5))


// Q28. Function banao greet(name: string): string jo "Hello, {name}!" return kare.

function greet(name: string){
    return `hello ${name}`
}

console.log("talha")


// Q29. Function banao square(num: number) jo number ka square return kare.

// square(5) → 25

function square(num: number){
    return num * num
}

console.log(square(5))

// Q30. Optional parameter wala function banao: greetUser(name: string, age?: number). Agar age di hai to age k saath greet karo, warna sirf naam se.

function greeting(name: string, age?: number){
    if(age){
        return`hello ${name} your age is ${age}`
    } else{
        return `hello ${name}`
    }
}


// Q31. Default parameter wala function: multiply(a: number, b: number = 2).

// multiply(5) → 10
// multiply(5, 3) → 15

function multiply(a: number, b: number = 3){
    return a * b
}


console.log(multiply(4))
console.log(multiply(4, 5))


// Q32. Function banao jo array of numbers le aur unka average return kare.

// average([10, 20, 30]) → 20

function average(arr:number[]){
    let average = arr.reduce((acc, num) => {
        return acc + num
    }, 0) / arr.length

    return average
}

console.log(average([10, 20, 30]))

let array = [2,40,5,6,]
console.log(Math.max(...array))