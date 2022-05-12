class MyNumber {
    constructor(num) {
        this.number = num; 
    }

    get number() {
        return this._number;
    }

    set number(num){
        if ( typeof num !== "number") {
            throw new Error ("You cannot assign non-number variables to MyNumber.number");
        }
        this._number = num;
    }

    toString() {
        return Number.toString(this._number);
    }
}

let mynum = new MyNumber(10);

console.log(mynum);
