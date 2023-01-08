#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
const toDoList = [];
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let title = await chalkAnimation.rainbow(`|||     ATM MACHINE    |||`);
    await sleep();
    title.stop();
}
await welcome();
async function questions() {
    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'username',
            message: 'username',
        },
        {
            type: 'number',
            name: 'userpin',
            message: 'pin',
        },
        {
            type: 'list',
            name: 'accountType',
            choices: ["Current", "Saving"],
            message: 'select your account type',
        },
        {
            type: 'list',
            name: 'transactionType',
            choices: ["Fast Cash", "Withdraw cash", "Balance inquirey"],
            message: 'select your transaction  type',
            when(answers) {
                return answers.accountType;
            }
        },
        {
            type: 'list',
            name: 'amount',
            choices: [1000, 2000, 10000, 20000],
            message: 'select your amount',
            when(answers) {
                return answers.transactionType === "Fast Cash";
            }
        },
        {
            type: 'number',
            name: 'amount',
            message: 'enter your amount',
            when(answers) {
                return answers.transactionType === "Withdraw cash";
            }
        }
    ]);
    const { username, userpin, transactionType, accountType, amount } = answers;
    if (username && userpin) {
        const randomBalance = Math.floor(Math.random() * 100000000);
        if (transactionType === "Balance inquirey") {
            console.log(chalk.grey('Your Balance is ', randomBalance));
        }
        else {
            if (randomBalance > amount) {
                const remainingBalance = randomBalance - amount;
                console.log('Your ramaining Balance is ', randomBalance);
            }
            else {
                console.log(chalk.red('insuffient Balance'));
            }
        }
    }
}
questions();
