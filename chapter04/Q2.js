// l is inclusive and r is exclusive
function addRec(arr, l=0, r=null) {
    if (l == null || l < 0) l = 0;
    if (r == null || r > arr.length) r = arr.length; 

    if (r - l === 0) return 0; 
    if (r - l === 1) return arr[l]; 
    return arr[l] + addRec(arr, l + 1, r);
}

var arr = [ 20, 3, 5, 7];
var sum =  addRec(arr);// 35

console.log(sum);