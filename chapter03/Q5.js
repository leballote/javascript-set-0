function printObjProp(obj, onlyOwned) {
    let out = "";
    if (onlyOwned) {
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                out += key + ", ";
            }
        }
    } else {
        for (const key in obj) {
            out += key + ", ";
        }
    }
    console.log(out.slice(0, out.length - 2));
}

function CustomObject (a, b) {
    this.a = a;
    this.b = b;
}
CustomObject.prototype.c = function () { return this.a + this.b; };
var obj = new CustomObject (1, 2);
printObjProp (obj); // output: a, b, c
printObjProp (obj, false); // output: a, b, c
printObjProp (obj, true); // output: a, b