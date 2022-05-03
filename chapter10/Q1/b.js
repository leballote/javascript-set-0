var myLib = {
	math: {
		real: {
			add: function (a, b){ /*code goes here*/},
			sub: function (a, b){ /*code goes here*/},
			mul: function (a, b){ /*code goes here*/}
		},
		complex: {
			Num: function (real, img){/*code goes here*/},
			add: function (a, b){ /*code goes here*/},
			sub: function (a, b){ /*code goes here*/},
			mul: function (a, b){ /*code goes here*/}
        },
        matrix: {
            add: function (a, b){ /*matrix addition*/},
            sub: function (a, b){ /*matrix subtraction*/},
            mul: function (a, b){ /*matrix multiplication*/},
            eye: function (size){ /*identity matrix*/},
            dot: function (m, a){ /*dot product*/},
            times:function(a, b){ /*element-wise multiplication*/}
        }
	}
};

let {real, complex, matrix} = myLib.math;
var answer = real.sub(
    real.add(20, 20),
    real.mul(2, 5)
);

var ans = matrix.times(
    matrix.eye(4),
    complex.sub(
        new complex.Num(real.add(5, 2), -3),
        new complex.Num(3, 4)
    )
);