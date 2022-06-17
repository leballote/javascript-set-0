// I don't really see how setiting balance as private is of any help here. 
// The API is the same in the end, the bank has full control over the clients balance through is setter


//I thought the true protection was that the clients variable is private within the bank, so only the bank of a client can access and modify the client's information.

class Client {
    #balance;
    constructor(accountNo, balance) {
        this.accountNo = accountNo;
        this.#balance = balance ?? 0;
    }

    get balance() {
        return this.#balance;
    }

    set balance(newBalance) {
        this.#balance = newBalance;
    }
}

class Bank {
    #clients;

    constructor() {
        this.#clients = {};             
        this.currentClientId = 0;
    }

    newClient(initialBalance) {
        const client = new Client(this.currentClientId, initialBalance, this);
        this.#clients[client.accountNo] = client;
        this.currentClientId++;
    }

    deposit(from, to, amount) {
        if (typeof amount !== "number" || Number.isNaN(amount)) {
            throw new Error("Invalid amount. It must be a number");
        }
        if (amount > this.#clients[from].balance) {
            throw new Error("Invalid operation: not enough Balance");
        } else {
            let oldFrom = this.#clients[from].balance;
            let oldTo = this.#clients[to].balance;
            try {
                this.#clients[from].balance -= amount;
                this.#clients[to].balance += amount;
                if (oldFrom + oldTo !== this.#clients[from].balance + this.#clients[to].balance) {
                    throw new Error("Something went wrong");
                }
            } catch(error) {
                this.#clients[from].balance = oldFrom;
                this.#clients[to].balance = oldTo;
                throw new Error("Something Went wrong"); 
            } 
        }
    }

    retrieve(accountNo, amount) {
        if (this.#clients[accountNo].balance >= amount) {
            this.#clients[accountNo].balance -= amount;
        } else {
            throw new Error("Not enough balance");
        }
    }

    view(accountNo) {
        console.log(`client ${accountNo}. Balance: ${this.#clients[accountNo].balance}`);
    }
}

const myBank = new Bank();

myBank.newClient();
myBank.newClient(3000);
myBank.newClient(5000);

console.group("Viewing initial clients state");
myBank.view(0);
myBank.view(1);
myBank.view(2);
console.groupEnd();

console.group("Making a deposit of 1000 coins from client 2 to client 0");
myBank.deposit(2, 0, 1000);
// myBank.deposit(2, 0); // error it is not passing an amount
myBank.view(0);
myBank.view(1);
myBank.view(2);
console.groupEnd();

console.group(`Client 0 retrieving 0 coins (checking the corner case).
Client 1 retrieving 1000 coins`);
myBank.retrieve(0, 0);
// myBank.retrieve(0, 1); //error out of balance
myBank.retrieve(1, 1000);
myBank.view(0);
myBank.view(1);
myBank.view(2);
console.log();