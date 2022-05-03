function add(...params) {
   return params.reduce((a, b) => a+b, 0); 
}

var answer = add (1, 2) + add ( 1, 4, 6, 7, 2);
console.log(answer);
