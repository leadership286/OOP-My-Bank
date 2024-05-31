#!/usr/bin/env node
import inquirer from 'inquirer'
import chalk from 'chalk'
console.log(chalk.bold.italic.magenta("Welcome To My Bank"));


//Bank Account Interface
interface BankAccount{
    accountnumber:number;
    balance:number;
    withdraw(amount: number): void
    deposit(amount:number): void
    checkBalance() : void
}

//Bank Account Class
class BankAccount implements BankAccount{
    accountnumber: number;
    balance: number;
    constructor(accountNumber: number, balance: number){
        this.accountnumber = accountNumber;
        this.balance = balance
    }

//Debit Money
withdraw(amount: number): void {
    if(this.balance >= amount){
       this.balance -= amount;
       console.log(chalk.magenta(`$${amount} Withdrawal Successfully.The Remaining Balance is $${this.balance}.`));
    }else{
        console.log(chalk.red('Your Balance is Insufficient for this Withdraw.'));
        
    }
}
//Credit Money
deposit(amount: number): void {
    if(amount > 100){
        amount -= 1
    }this.balance += amount;
    console.log(chalk.cyan(`The $${amount} has been Deposit Successfully.Your New balance is $${this.balance}.`)); 
}
//Check Balance
checkBalance(): void {
    console.log(chalk.greenBright(`Your Current Balance is $${this.balance}`));
    
}
}

//Customer Class
class Customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;
    constructor(firstName:string,lastName:string,gender:string,age:number,mobileNumber:number,account: BankAccount){
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age = age
        this.mobileNumber = mobileNumber
        this.account = account
    }
}
//Creat Bank Accounts
const accounts: BankAccount[] =  [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000)
];
//Create Customers
const Customers :Customer [] = [
   new Customer("Laiba","Ansari","Female",20,3122233367, accounts[0]),
   new Customer("Ayaz","Ansari","Male",34,3142223357, accounts[1]),
   new Customer("Ayan","Ansari","Male",50,3192283360, accounts[2])
]
//Function to interact with bank account
async function service() {
    do{
        const accountNumberInput = await inquirer.prompt(
            [
                {
                  name: 'accountNumber',
                  type:"number",
                  message:chalk.cyan('Kindly Enter your Account Number:')
                }
            ]
        );
        const customer = Customers.find(customer => customer.account.accountnumber === accountNumberInput.accountNumber)
   if(customer){
    console.log(chalk.magenta(`Welcome! Dear ${customer.firstName} ${customer.lastName}`))
    const answer = await inquirer.prompt([
        {
            name:"select",
            type:"list",
            message:chalk.green("Select an Operation"),
            choices:['Deposit','Withdraw','Check Balance','Exit']
        }
    ]);
    switch (answer.select){
        case 'Deposit':
            const depositAmount = await inquirer.prompt([{
                name:"amount",
                type:"number",
                message:chalk.cyanBright("Kindly Enter the Amount to Deposit:")

            }]);
            customer.account.deposit(depositAmount.amount)
            break;
            case 'Withdraw':
                const withdrawAmount = await inquirer.prompt([{
                    name:"amount",
                    type:"number",
                    message:chalk.magentaBright("Kindly Enter the Amount You want to Withdraw")
                }]);
                customer.account.withdraw(withdrawAmount.amount)
                break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                    case "Exit":
                        console.log(chalk.red("Exitting Bank Program..."));
                        console.log(chalk.cyan("Thanks for using Our Bank Services.Have a Beautiful and Energetic Day."));
                        return;             
                        
        }
   }else{
    console.log(chalk.red("Sorry! Invalid Account Number.Kindly Try Again later.."));
    
   }
   
   
    }while(true)
} 
service()