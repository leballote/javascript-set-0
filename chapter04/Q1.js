function fibonacci(n) {
    if (n< 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

//I made this version with a little memory in the closure which remembers the last calls, but in the end its just imitating the iterative version, I guess it is simply not a good idea to compute fibonacci with recursion. 
function fibonacciMemo(n) {
    let memory = Object.create(null); 
    return (function rec(m) {
        if (m < 2) return 1;
        if (m in memory) return memory[m];
        let ans = rec(m - 1) + rec(m - 2);
        memory[m] = ans;
        delete memory[m - 2];
        return ans;
    })(n);
}

let x = fibonacci(5);
let y = fibonacciMemo(5);

console.log(x);
console.log(y);
console.log(z);