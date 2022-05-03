class Bank {
    constructor(clients) {
        this.clients = clients ?? {};
    }

    addClient(client, accountNo) {
       this.clients[accountNo] = client;
    }

    deposit(from, to, amount) {
        if (amount > clients[from].balance) {
            console.log("invalid transaction, not enough balance");
        } else {
            let oldFrom = this.clients[from].balance;
            let oldTo = this.clients[to].balance;
            try {
                this.clients[from].balance -= amount;
                this.clients[to].balance += amount;
            } catch(error) {
                console.log("Something went wrong");
                this.clients[from].balance = oldFrom;
                this.clients[to].balance = oldTo;
            } 
        }
    }

    retrieve(amount, accountNo) {
        if (this.clients[accountNo].balance > accountNo) {
            this.clients[accountNo].balance -= amount;
        } else {
            console.log("not enough balance");
        }
    }

    view(accountNo) {
        console.log(`balance: ${this.clients[accountNo].balance}`);
    }

}