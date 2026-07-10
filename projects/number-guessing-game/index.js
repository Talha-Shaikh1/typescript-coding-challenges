import inquirer from "inquirer";
let computerNum = Math.floor(Math.random() * 10 + 1);
let userNum = await inquirer.prompt([
    {
        name: "userGuessNumber",
        type: "number",
        message: "Guess a no 1 - 10: "
    }
]);
if (userNum.userGuessNumber === computerNum) {
    console.log("You won");
}
else {
    console.log("You loose guess Wrong no");
}
//# sourceMappingURL=index.js.map