function addRec(arr) {
    if (arr.length === 0) {
        return 0;
    }
    if (arr.length === 1) {
        return arr[0];
    }
    return addRec(arr.slice(0, 1)) + addRec(arr.slice(1));
}

var arr = [ 1, 3, 5, 7];
var sum =  addRec(arr);// 16

console.log(sum);

