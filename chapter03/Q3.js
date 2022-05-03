class myMath {
    static add(...params) {
        return params.reduce((a, b) => a + b, 0);
    }

    static mul(...params) {
        return params.reduce((a, b) => a*b, 1);
    }

    static fact(n) {
        let out = 1;
        for (let i = 1; i <= n; i++) {
            out *= i;
        }
        return out;
    }

}


var a = myMath.add (1, 2, 3); //6
var b = myMath.mul (1, 2, 3); // 6
var c = myMath.fact (7); // 6

console.log(a);
console.log(b);
console.log(c);