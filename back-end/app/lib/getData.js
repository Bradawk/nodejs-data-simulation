var math = require('mathjs');

function getData(math_exp){

    var array = [];

	var f=Function('x', 'return '+math_exp);

    for(var x = 0; x <= 2880; x ++){
        array.push(f(x));
    }

    return array;

}

module.exports = getData;