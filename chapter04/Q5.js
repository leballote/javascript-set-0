function distance(x1, y1, z1, x2, y2, z2) {
    if (arguments.length === 4) {
        y2 = x2;
        x2 = z1;
        z1 = 0;
        z2 = 0;
        return distance(x1, y1, z1, x2, y2, z2);
    } else if (arguments.length < 5) {
        throw new Error("Insuficient parameters");
    }
    return Math.sqrt( (x1 - x2)**2 + (y1 - y2)**2 + (z1 - z2)**2 );
}

var x1 = 1, y1 = 2, z1 = 1;
var x2 = 2, y2 = 2, z2 = 4;
var delta1 = distance (x1, y1, x2, y2); // delta = 1
var delta2 = distance (x1, y1, z1, x2, y2, z2); // delta = 3.1622…
// distance(x1, x2);

console.log(delta1);
console.log(delta2);
console.log(distance(1, 1, 1, 5));
