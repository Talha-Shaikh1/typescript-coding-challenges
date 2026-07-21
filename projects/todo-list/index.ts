import inquirer from "inquirer";

let todos: string[] = [];
let condition = true;

while (condition) {
    let userInput = await inquirer.prompt([
        {
            name: 'userSelection',
            type: 'rawlist',
            message: 'what you want to do? ',
            choices: ["add todo", "view todo", "delete todo", "update todo", "exit"]
        }
    ]);

    if (userInput.userSelection === "add todo") {
        await addTodos();
    } else if (userInput.userSelection === "view todo") {
        viewTodos();
    } else if (userInput.userSelection === "exit") {
        condition = false;
    } else if (userInput.userSelection === "delete todo") {
       await deleteTodo();
    } else if (userInput.userSelection === "update todo") {
       await updateTodo();
    }
}

async function addTodos() {
    let addMore = true;

    while (addMore) {
        let askTodos = await inquirer.prompt([
            {
                name: 'forAddTodos',
                type: 'input',
                message: 'what you would like to add in your todos? '
            },
            {
                name: 'confirmationForMore',
                type: 'confirm',
                message: 'do you want to add more? ',
                default: true
            }
        ]);

        todos.push(askTodos.forAddTodos);
        addMore = askTodos.confirmationForMore;
    }

    console.log(todos);
}

function viewTodos() {
    todos.forEach((todo, index) => {
        console.log(`${index + 1}: ${todo}`)
    })
}

async function deleteTodo(){
    viewTodos()
    let askDelete = await inquirer.prompt([{
        name: 'deleteIndex',
        type: 'input',
        message: 'enter the no you want to delete'
    }])

    let deleteIndex = Number(askDelete.deleteIndex) -1;
    if (deleteIndex >= 0 && deleteIndex < todos.length) {
        todos.splice(deleteIndex, 1)
        console.log("Deleted Sucessfully")
        viewTodos()
    } else {
        console.log("Invalid Todo Select")
    }
}

async function updateTodo(){
    viewTodos()
    let askTodoToUpdate = await inquirer.prompt([
        {
         name: 'updateTodo',
         type: 'input',
         message: 'enter the no of todo want to delete. '
        },
        {
            name: 'updatedTodo',
            type: 'input',
            message: 'What would you lie to add in your todos'
        }
])

    let updateTodoNumber = Number(askTodoToUpdate.updateTodo) -1;
        if (updateTodoNumber >= 0 && updateTodoNumber < todos.length) {
        todos[updateTodoNumber] = askTodoToUpdate.updatedTodo
        console.log("updated Sucessfully")
        viewTodos()
    } else {
        console.log("Invalid Todo Select")
    }
}