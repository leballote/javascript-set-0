class MyNumber {
    #number;
    constructor(num) {
        this.number = num; 
    }

    get number() {
        return this.#number;
    }

    set number(num){
        if ( typeof num !== "number") {
            throw new Error ("You cannot assign non-number variables to MyNumber.number");
        }
        this.#number = num;
    }

    toString() {
        return Number.toString(this.number);
    }
}


const mynum = new MyNumber(10);
console.log(mynum.number);

// console.log(mynum.#number); //error
// const mynum2 = new MyNumber("10"); //error

