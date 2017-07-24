var math = require('mathjs');

function getData(exp1, exp2){

    var array1 = [],
        array2 = [];

    for(var x = 0; x <= 2880; x ++){
        var scope = {x};
        array1.push(math.eval(exp1,scope));
        array2.push(math.eval(exp2,scope));
    }

    return [array1, array2];

}

module.exports = getData;