// Exercise 1: Type Inference Practice

// TODO: Create these variables WITHOUT type annotations
// Let TypeScript infer the types

const userName = "Talha Shaikh"
const userAge = 21
const isVerified = true

// TODO: Print them
console.log(userName);
console.log(userAge);
console.log(isVerified);

// TODO: Try uncommenting these to see errors:
// userName = 123;
// userAge = "thirty";
// isVerified = "yes";

// TODO: Create a function 'double' that takes a number
// Don't annotate the return type - let TypeScript infer it
function double(n: number) {
    return n * n
}

// Test your function
console.log("Double of 5:", double(5));

// Hint: Hover over variables in VS Code to see inferred types!
