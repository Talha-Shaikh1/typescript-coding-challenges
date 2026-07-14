import inquirer from "inquirer";
let myBalance = 30000;
let myPin = 12345;
let pinAnswer = await inquirer.prompt([
    {
        name: "userAnswer",
        type: "number",
        message: "Enter Your Pin"
    }
]);
if (pinAnswer.userAnswer === myPin) {
    let optionAns = await inquirer.prompt([
        {
            name: "options",
            type: 'select',
            message: "how much you want ? or choose any option.",
            choices: ['fast cash', 'withdraw', 'balance']
        }
    ]);
    if (optionAns.options === 'fast cash') {
        let cashAmount = await inquirer.prompt([
            {
                name: "amount",
                type: 'select',
                message: "select your cash",
                choices: [500, 1000, 1500, 2000, 2500]
            }
        ]);
        let amount = cashAmount.amount;
        if (amount <= myBalance) {
            myBalance -= amount;
            console.log("Cash Withdraw Sucessfullt");
            console.log("Your remaining balance " + myBalance);
        }
        else {
            console.log("Insufficient Balance");
        }
    }
    else if (optionAns.options === 'withdraw') {
        let userAmount = await inquirer.prompt([
            {
                name: "userAmount",
                type: 'number',
                message: "enter your amount want to withdraw: "
            }
        ]);
        if (userAmount.userAmount < myBalance) {
            myBalance -= userAmount.userAmount;
            console.log("you withdraw " + userAmount.userAmount);
            console.log("your current balance is " + myBalance);
        }
        else {
            console.log("Insuficient Balance");
        }
    }
    else if (optionAns.options === 'balance') {
        console.log("Your balance is" + myBalance);
    }
}
else {
    console.log("Incorrect pin code!");
}
//# sourceMappingURL=index.js.map