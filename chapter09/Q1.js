function dataParse(str) {
    let obj;
    return eval("obj =" + str);
}

var str = "{prop1: 42, myFn: function(a, b) { return a+b+this.prop1;}}";
var obj = dataParse(str);
console.log(obj);