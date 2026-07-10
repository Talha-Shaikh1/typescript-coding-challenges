# TypeScript Practice — 50 Questions
### Variables | If-Else | Functions

Rule: khud solve karna, AI ki help mat lena — muscle memory build karni hai. Har question k neeche example diya hai taake samajh aaye kya karna hai.

---

## SECTION 1: Variables & Data Types (Q1–10)

**Q1.** Ek variable `age` banao (type: `number`) aur usay console mein print karo.
```
Example output: 25
```

**Q2.** `name` (string) aur `isStudent` (boolean) variables banao, dono ko print karo.
```
Example output: "Talha" true
```

**Q3.** Do numbers ke liye variables banao aur unka sum print karo.
```
Input: a = 10, b = 20
Output: 30
```

**Q4.** Ek string variable `city` banao aur uski `.length` print karo.
```
Input: city = "Karachi"
Output: 7
```

**Q5.** `let` vs `const` ka farq dikhane k liye: ek `const` variable banao aur usay reassign karne ki koshish karo (error dekho, comment mein likho kyun aya).

**Q6.** Type annotation k saath ek array banao (`number[]`) jisme 5 numbers hon, print karo.
```
Example output: [1, 2, 3, 4, 5]
```

**Q7.** `any` type ka ek variable banao jisme pehle number, phir string assign karo. Print karke dikhao ye kaise change ho raha hai.

**Q8.** Do variables `a` aur `b` banao, unki values swap karo (bina third variable use kiye, tuple trick se).
```
Input: a = 5, b = 10
Output: a = 10, b = 5
```

**Q9.** Ek `union type` variable banao jo `string | number` ho. Pehle string assign karo, phir number.

**Q10.** Template literal use karke ek sentence print karo jisme naam aur age dono ho.
```
Input: name = "Ali", age = 22
Output: "Ali is 22 years old"
```

---

## SECTION 2: If-Else (Q11–25)

**Q11.** Ek number check karo ke even hai ya odd.
```
Input: 7 → Output: "Odd"
Input: 4 → Output: "Even"
```

**Q12.** Ek number check karo positive, negative ya zero hai.
```
Input: -5 → Output: "Negative"
```

**Q13.** Do numbers compare karo aur bataao konsa bara hai.
```
Input: a=10, b=20 → Output: "b is greater"
```

**Q14.** Age check karo aur bataao "Minor" (< 18), "Adult" (18–59), ya "Senior" (60+).
```
Input: 65 → Output: "Senior"
```

**Q15.** Grade calculator: marks lo aur grade do.
```
90+ = A, 80-89 = B, 70-79 = C, <70 = F
Input: 85 → Output: "B"
```

**Q16.** Check karo year leap year hai ya nahi.
```
Input: 2024 → Output: "Leap Year"
```

**Q17.** Teen numbers do, sabse bara wala nikalo (if-else chain se).
```
Input: 3, 9, 5 → Output: 9
```

**Q18.** Password length check karo — agar 8 se kam hai to "Weak", warna "Strong".

**Q19.** Ek number lo aur bataao ye 5 se divisible hai ya nahi.
```
Input: 25 → Output: "Divisible by 5"
```

**Q20.** Traffic light color lo (string: "red"/"yellow"/"green") aur action print karo ("Stop"/"Wait"/"Go").

**Q21.** BMI category: weight aur height se BMI calculate karo, phir category batao (Underweight/Normal/Overweight).
```
Formula: weight / (height * height)
```

**Q22.** Ek number lo, check karo ye single digit hai, double digit hai, ya usse zyada.

**Q23.** Discount calculator: agar bill 5000 se zyada hai to 10% discount, warna 0%. Final amount print karo.

**Q24.** Nested if-else: student ka pass/fail check karo do subjects ki marks se (dono mein 40+ chahiye pass hone k liye).

**Q25.** Character check: ek letter lo aur batao vowel hai ya consonant.
```
Input: 'e' → Output: "Vowel"
```

---

## SECTION 3: Functions (Q26–50)

**Q26.** Ek function banao `add(a: number, b: number)` jo dono ka sum return kare.
```
add(3, 4) → 7
```

**Q27.** Function banao `isEven(num: number): boolean` jo true/false return kare.

**Q28.** Function banao `greet(name: string): string` jo "Hello, {name}!" return kare.

**Q29.** Function banao `square(num: number)` jo number ka square return kare.
```
square(5) → 25
```

**Q30.** Optional parameter wala function banao: `greetUser(name: string, age?: number)`. Agar age di hai to age k saath greet karo, warna sirf naam se.

**Q31.** Default parameter wala function: `multiply(a: number, b: number = 2)`.
```
multiply(5) → 10
multiply(5, 3) → 15
```

**Q32.** Function banao jo array of numbers le aur unka average return kare.
```
average([10, 20, 30]) → 20
```

**Q33.** Function banao `findMax(arr: number[]): number` jo array ka largest number return kare.

**Q34.** Function banao `factorial(n: number)` jo n ka factorial calculate kare (loop se).
```
factorial(5) → 120
```

**Q35.** Function banao `isPrime(num: number): boolean`.

**Q36.** Function banao `reverseString(str: string): string`.
```
reverseString("hello") → "olleh"
```

**Q37.** Function banao `countVowels(str: string): number`.
```
countVowels("typescript") → 2
```

**Q38.** Arrow function banao `isPalindrome(str: string): boolean`.
```
isPalindrome("madam") → true
```

**Q39.** Function banao `sumArray(arr: number[]): number` jo array ke sab elements ka sum kare.

**Q40.** Function banao `celsiusToFahrenheit(c: number): number`.
```
Formula: (c * 9/5) + 32
```

**Q41.** Function banao `getGrade(marks: number): string` (Q15 wala logic function ki shakal mein).

**Q42.** Void return type wala function banao `printTable(num: number): void` jo us number ki multiplication table print kare (1 se 10 tak).

**Q43.** Function banao `countWords(sentence: string): number` jo sentence mein words count kare.
```
countWords("I love TypeScript") → 3
```

**Q44.** Function banao `isLeapYear(year: number): boolean` (Q16 wala function ki shakal mein).

**Q45.** Function banao `fizzBuzz(n: number): string` — agar 3 se divisible hai "Fizz", 5 se "Buzz", dono se "FizzBuzz", warna number khud return kare.
```
fizzBuzz(15) → "FizzBuzz"
fizzBuzz(9) → "Fizz"
```

**Q46.** Function banao `removeDuplicates(arr: number[]): number[]`.
```
removeDuplicates([1,2,2,3,3,3]) → [1,2,3]
```

**Q47.** Rest parameters wala function banao `sumAll(...nums: number[]): number` jo kitne bhi numbers le kar sum kare.
```
sumAll(1,2,3,4) → 10
```

**Q48.** Function banao `capitalize(str: string): string` jo pehla letter capital kare.
```
capitalize("hello") → "Hello"
```

**Q49.** Function banao `calculateBMI(weight: number, height: number): { bmi: number, category: string }` jo object return kare (BMI aur category dono).

**Q50.** Challenge question: Function banao `checkPassword(password: string): string` jo check kare:
- Length 8+ honi chahiye
- Kam se kam ek number honi chahiye
- Kam se kam ek uppercase letter honi chahiye
Return kare "Strong", "Medium", ya "Weak" in rules k combination se.

---

## Tips
- Har question khud se pehle bina dekhe solve karne ki koshish karo.
- Agar stuck ho jao to sirf concept dobara padho (variables/if-else/functions ka), answer mat dekho.
- Types explicitly likhna practice karo (`: number`, `: string`, `: boolean`) — TypeScript ka asal maza yahi hai.
- Q26 se aage jahan possible ho, arrow function syntax bhi try karo alag se.

Good luck! 🚀