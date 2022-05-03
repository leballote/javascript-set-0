function A() {
    console.log("Calling A");    
}

function B() {
    console.log("Calling B");
}

function C() {
    console.log("Calling C");
}

function createCaller() {
    let count = 0; 
    return function() {
        count += 15;
        if (count % 30 == 0) A();
        if (count % 60 == 0) B(); 
        if (count % 75 == 0) C(); 
    };
}

let caller = createCaller();

setInterval(caller, 15*1000);