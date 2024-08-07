#!/usr/bin/env node
import inquirer from "inquirer";
// interface bankaccount
interface BankAccount{
    accountNumber:number,
    balance:number,
    withdraw(amount:number):void,
    deposit(amount:number):void,
    checkBalance():void
}
// bank class
class BankAccount implements BankAccount{
    
    accountNumber: number;
    balance: number;
    constructor(accountNumber:number,balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance
    }
    // debit money
withdraw(amount: number): void {
    if(this.balance >= amount){
this.balance -= amount;
console.log(`Withdrawal of $${amount} successful.Remaining balance:$${this.balance}`);
    }else{
        console.log("Insufficient balance.");
        
    }
}
// credit money
deposit(amount: number): void {
    if(amount > 100){
amount -= 1; // $1 fee charged if more than $100 is deposited
    } this.balance += amount;
    console.log(`Deposit of $${amount} successful.Remaining balance:$${this.balance}`);
    
}
// check balance
checkBalance(): void {
    console.log(`Current balance: $${this.balance}`);
    
}
}

// customer class 
class Customer{
    firstName : string;
    lastName : string;
    age : number;
    mobNum :number;
    gender :String;
    account:BankAccount;

    constructor(firstName:string,lastName:string,gender:string,age:number,mobNum:number,account:BankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobNum = mobNum;
        this.account = account
    }
    }

// create bank account
const accounts:BankAccount[] = [
    new BankAccount (1001,500),
    new BankAccount (1002,1000),
    new BankAccount (1003,2000),

]
// create customers

const customers:Customer[] = [
    new Customer ("Laiba","Siddique","Female",20,34678921345,accounts[0]),
    new Customer ("Kareena","Raju","Female",19,34778921345,accounts[1]),
    new Customer ("Bisma","Ali","Female",18,34888921345,accounts[2])
]
// function to interact with bank account
async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message:"Enter your account number:"
                })
                const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput.accountNumber)
if(customer){
    console.log(`Welcome,${customer.firstName} ${customer.lastName}!\n`);
    const ans = await inquirer.prompt([{
        name:"select",
        type:"list",
        message:"select an operation",
        choices:["Deposit","Withdraw","Check Balance","Exit"]
    }]);
    switch (ans.select){
        case "Deposit":
            const depositAmount = await inquirer.prompt({
                name:"amount",
                type:"number",
                message:"Enter the amount to deposit:"
            })
            customer.account.deposit(depositAmount.amount);
            break;
            case "Withdraw":
                const withdrawAmount = await inquirer.prompt({
                    name:"amount",
                    type:"number",
                    message:"Enter the amount to withdraw:"
                })
                customer.account.withdraw(withdrawAmount.amount);
                break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                    case "Exit":
            
    console.log("Exiting bank program...");
    console.log("\n Thank you for using our bank services.Have a great day!");
    return;
    
            }
    
}else{
    console.log("Invalid account number.Please try again.");
    
}


    } while (true)
}
service()