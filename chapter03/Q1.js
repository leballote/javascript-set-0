function log13(x) {
    return Math.log(x)/Math.log(13);
}

function getSymbol(number) {
    if (number > 9) return String.fromCharCode(97 + number - 10);
    return number.toString();
}

function mul(a, b) {
    //handle negative outputs
    if (a < 0 || b < 0) {
        return `-${mul(-a, b)}`;
    } 
    if ( a === 0 || b  === 0) {
        return "0";
    }

    let mul10 = a*b;

    let highestPow = Math.floor(log13(mul10));
    let remaining = mul10;
    let out = "";
    for (let pow = highestPow; pow >= 0; pow--) {
        console.log("pow", pow);
        console.log(remaining/13**pow);
        sub = Math.floor(remaining/13**pow);
        console.log("sub", sub);
        out += getSymbol(sub);
        console.log("out", out);
        remaining -= 13*sub;
        console.log("remaining", remaining);
    }
    return out;
}

// //this one is boring but is optimal
// function mul(a, b) {
//     ans = a*b;
//     return ans.toString(13);
// }

//tests
console.log(mul(13, 13));
