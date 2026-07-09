// get values from users
import inquirer from "inquirer";
const answers = await inquirer.prompt([
    {
        type: "number",
        name: "firstNumber",
        message: "Enter first number:",
    },
    {
        type: "number",
        name: "secondNumber",
        message: "Enter second number:",
    },
    {
        type: "select",
        name: "opitions",
        message: "Select operation:",
        choices: ["+", "-", "*", "/"],
    },
]);
if (answers.opitions === "+") {
    console.log("Your answer is " + (answers.firstNumber + answers.secondNumber));
}
else if (answers.opitions === "-") {
    console.log("Your answer is " + (answers.firstNumber - answers.secondNumber));
}
else if (answers.opitions === "*") {
    console.log("Your answer is " + (answers.firstNumber * answers.secondNumber));
}
else if (answers.opitions === "/") {
    if (answers.firstNumber || answers.secondNumber == 0) {
        console.log("cannot divideable");
    }
    else {
        console.log("Your answer is " + (answers.firstNumber / answers.secondNumber));
    }
}
else {
    console.log("invalid option");
}
// const a = Number(answers.a);
// const b = Number(answers.b);
// let result: number;
// switch (answers.op) {
// 	case "+":
// 		result = a + b;
// 		break;
// 	case "-":
// 		result = a - b;
// 		break;
// 	case "*":
// 		result = a * b;
// 		break;
// 	case "/":
// 		result = b === 0 ? NaN : a / b;
// 		break;
// 	default:
// 		result = NaN;
// }
// console.log(`Result: ${result}`);
//# sourceMappingURL=index.js.map