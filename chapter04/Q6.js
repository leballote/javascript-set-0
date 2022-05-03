function distance(x1, y1, z1, x2, y2, z2) {
    if (arguments.length === 2) {
        return distance(...x1, ...y1);
    }
    if (arguments.length === 4) {
        x2 = z1;
        y2 = x2;
        z1 = 0;
        z2 = 0;
        return distance(x1, y1, z1, x2, y2, z2);
    } else if (arguments.length < 6) {
        console.log(arguments.length);
        throw new Error("Incompatible point data");
    }
    return Math.sqrt( (x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2 );
}

let d1 = distance(1, 2, 2, 2); // returns 1 (done as part of exercise 5)
let d2 = distance([1,2], [2,2]); // returns 1
// let d3 = distance([1,2], [2,2,4]); // error: incompatible point data

console.log(d1);
console.log(d2);
// console.log(d3);
