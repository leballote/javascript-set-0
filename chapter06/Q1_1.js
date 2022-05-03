class Candy {
    constructor(color) {
        this.color = color;
    }
}

class Chocolate extends Candy {
    constructor(flavor, color) {
        super(color);
        this.flavor = flavor;
    }
}

class CottonCandy {
    constructor(color) {
        super(color);
    }
}

//DISCLAIMER: this doesn't aim to be the factory pattern nor useful
class Factory {
    constructor(ToMake) {
        this.ToMake = ToMake;
    }

    make(args) {
        return new this.ToMake(args);
    }
}

class ChocolateFactory extends Factory {
    constructor() {
        super(Chocolate);
    }
}

class CottonCandyFactory extends Factory {
    constructor() {
        super(CottonCandy)
    }
}