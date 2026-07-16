// Ek number check karo ke even hai ya odd.

let number: number = 2
if (number % 2 == 0){
    console.log(number + " is even")
} else{
    console.log(number + ' is odd');   
}

// Q12. Ek number check karo positive, negative ya zero hai.

// Input: -5 → Output: "Negative"

let num1: number = -2
if(num1 === 0){
    console.log(`${num1} is zero`);
} else if(num1 > 0) {
    console.log(`${num1} is positive`);
    
} else{
    console.log(`${num1} is negative`);
    
}

// Q13. Do numbers compare karo aur bataao konsa bara hai.

// Input: a=10, b=20 → Output: "b is greater"

let a: number = 34
let b: number = 42

if(a>b){
    console.log(`${a} is greater than ${b}`);
    
} else {
    console.log(`${b} is greater than ${a}`);
    
}

// Q14. Age check karo aur bataao "Minor" (< 18), "Adult" (18–59), ya "Senior" (60+).

// Input: 65 → Output: "Senior"

let age: number = 32
if(age < 18){
    console.log("Minor");
    
} else if(age >= 18 && age < 60){
    console.log("Adult");
    
} else if(age >= 60){
    console.log("Senior");
    
}else{
    console.log("Invalid Age");
    
}

// Q15. Grade calculator: marks lo aur grade do.

// 90+ = A, 80-89 = B, 70-79 = C, <70 = F
// Input: 85 → Output: "B"

let percentage: number = 44
if(percentage >= 90 && percentage < 101){
    console.log("Your Grade is A");
    
} else if(percentage < 90 && percentage >= 80){
    console.log("Your Grade is B");
    
}else if(percentage >= 70 && percentage < 80){
    console.log("Your Grade is C");
    
} else if(percentage < 70 && percentage > 0){
    console.log("Your Grade is F");
    
} else {
    console.log("invalid percentage");
    
}


// Q16. Check karo year leap year hai ya nahi.

// Input: 2024 → Output: "Leap Year"

let year: number = 2001
if (year % 4 === 0) {
    console.log("Leap Year");
    
} else {
    console.log("Not Leap Year");
    
}

// Q17. Teen numbers do, sabse bara wala nikalo (if-else chain se).

// Input: 3, 9, 5 → Output: 9

let number1: number = 6
let number2: number = 4
let number3: number = 5

if (number1 > number2) {
    console.log(number1);
    
} else if(number2 > number3) {
    console.log(number2);
    
}else {
    console.log(number3);
    
}

// Q18. Password length check karo — agar 8 se kam hai to "Weak", warna "Strong".

let pass: string = "myPassword"

if (pass.length < 8) {
    console.log("Weak Password")
} else {
    console.log("Strong Password")
}


// Q19. Ek number lo aur bataao ye 5 se divisible hai ya nahi.

// Input: 25 → Output: "Divisible by 5"

function isDivisible (number: number) {
    if (number % 5 == 0) {
        console.log(`${number} divisible by 5`)
    } else{
        console.log(`${number} not divisible by 5`)
    }
}

isDivisible(20)


// Q20. Traffic light color lo (string: "red"/"yellow"/"green") aur action print karo ("Stop"/"Wait"/"Go").

let color: string = "red"

if (color == "red") {
    console.log("Stop")
} else if(color == "yellow"){
    console.log("Wait")
} else if(color == "green"){
    console.log("Go")
}


// Q21. BMI category: weight aur height se BMI calculate karo, phir category batao (Underweight/Normal/Overweight).

// Formula: weight / (height * height)

let height: number = 3.5
let weight: number = 60

let BMI: number = weight / (height * height)

if (BMI <= 18.5) {
    console.log("UnderWeight")
} else if(BMI > 18.5 && BMI <= 24.9){
   console.log("Normal") 
} else if(BMI >=25 ){
    console.log("Overweight")
}

// Q22. Ek number lo, check karo ye single digit hai, double digit hai, ya usse zyada.

let num3: number = -3
// convert no into string for checking length
let numString: string = Math.abs(num3).toString()

console.log(typeof(numString));

if (numString.length === 1) {
    console.log("single digit")
} else if(numString.length ===2){
    console.log("Double Digit")
} else if(numString.length >= 3){
    console.log("Multiple Digit")
} else{
    console.log("not a number")
}

// Q23. Discount calculator: agar bill 5000 se zyada hai to 10% discount, warna 0%. Final amount print karo.

let totalPrice: number = 5500
let discountedPrice: number = totalPrice * 0.9 
if (totalPrice <= 5000) {
    console.log(`no discount available your total is ${totalPrice}`)
} else{
        console.log(`Wow you got 10% discount your total is ${discountedPrice}`)
}


// Q24. Nested if-else: student ka pass/fail check karo do subjects ki marks se (dono mein 40+ chahiye pass hone k liye).

let sub1Marks: number = 32
let sub2Marks: number = 45

if(sub1Marks > 40 && sub2Marks > 40){
    console.log("You are pass")
} else{
    console.log("You failed")
}


// Q25. Character check: ek letter lo aur batao vowel hai ya consonant.

// Input: 'e' → Output: "Vowel"

let character: string = "e"
let vowel: string = "aeiou"

if (vowel.includes(character)){
    console.log("Vowel")
}else{
    console.log("Constant")
}

