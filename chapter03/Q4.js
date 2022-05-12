class Image {
    constructor(data, height, width, name) {
        this.width = width;
        this.height = height;
        this.name = name;
        if (data.length != width*height) throw new Error("Data can't be arranged within the specified shape");
        this.data = data;
    }

    pixelData(row, col) {
        if (row >= width || col >= height ) {
            throw new Error("Out of bounds");
        }
        return this.data[this.width*row + col];
    }
}

let myImage = new Image([1, 2, 3, 4, 5, 6], 2, 3, "image");
let myImage2 = [[1, 2, 3], [4, 5, 6]];

let row = 1;
let col = 1;
console.log(myImage.pixelData(row, col));
console.log(myImage2[row][col]);

