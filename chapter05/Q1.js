//you should only be allowed to create a client through the bank
// theorethically you can intanciate a client, but It shouldn't have any way to get into the bank manually

class Client {
    constructor(accountNo, balance, bank) {
        this.accountNo = accountNo;
        this.balance = balance ?? 0;
        this.bank = bank;
    }

    // for this little app these methods are not useful, but I think they provide a nice layer of abstraction
    viewBalance() {
        this.bank.view(this.accountNo);
    }

    deposit(to) {
        this.bank.deposit(this.accountNo, to);
    }

    retrieve() {
        this.bank.retrieve(this.retrieve(this.accountNo));
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

myBank.view(0);
myBank.view(1);
myBank.view(2);
console.log();

myBank.deposit(2, 0, 1000);
// myBank.deposit(2, 0); // error it is not passing an amount
myBank.view(0);
myBank.view(1);
myBank.view(2);
console.log();

myBank.retrieve(0, 0);
// myBank.retrieve(0, 1); //error out of balance
myBank.retrieve(1, 1000);
myBank.view(0);
myBank.view(1);
myBank.view(2);
console.log();