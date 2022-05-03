//distance from chapter 4, Q6 
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

class Shape {
    constructor(...points) {
        this.points = points;
    }
    pEdges() {
        let edges = [];
        points = this.points;
        for (let i = 0; i < points.length; i++) {
            edges.push_back(`${points[i]}-${points[(i + 1) % points.length]}`);
        }
        console.log(edges); 
    }

    fnDisplay() {
        console.log("A shape with points: " + this.points);
    }

    fnArea() {
        if (this._area != null) {
            this._area = fnArea();        
        }
        let area = 0;
        for (let i = 0; i < this.points.length; i++) {
            area += (
                this.points[i][0]*this.points[(i + 1) % this.points.length][1] 
                - this.points[i][1]*this.points[(i + 1) % this.points.length][0]
            ) 
        }
        area = Math.abs(area/2);
        return area;
    }

    fnPerimeter() {
        let perimeter = 0;
        for (let i = 0; i < this.points.length; i++) {
            perimeter += distance(this.points[i], this.points[(i + 1)% this.points.length]);
        }
    }
}

class Quadrilateral extends Shape {
    constructor(points) {
        if (points.length == 4) {
            super(...points);
        } else {
            throw new Error("A Quadrilateral must have 4 vertices");
        }
    }
}

class Square extends Quadrilateral {
    constructor(topLeftVertex, width, height) {
        super([
            topLeftVertex,
            [topLeftVertex[0] + width, topLeftVertex[1]], 
            [topLeftVertex[0] + width, topLeftVertex[1] - height],
            [topLeftVertex[0], topLeftVertex[1] - height]
        ]);
    }
}

class Triangle extends Shape {
    constructor(points) {
        if (points.length === 3) {
            super(...points);
        } else {
            throw new Error("A Triangle must have 3 vertices");
        }
    }
}