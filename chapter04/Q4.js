function aux(el) {
    if (Array.isArray(el)) return "array";
    if (typeof el === "number") {
        if (el % 1 === 0) return "number";
        else return "float";
    } else return typeof el; 
}
function dataType(...args) {
    out = "";
    for (let el of args) {
        out += aux(el) + ", ";
    }
    console.log(out.slice(0, -2));
}

dataType (1, 6.2831, "pi*2", [function(){}, 1], {}, function () {}); 

dataType(5);