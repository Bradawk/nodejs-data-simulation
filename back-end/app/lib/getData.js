var math = require('mathjs');

function getData(exp){

    var array = [];

    for(var x = 0; x <= 2880; x ++){
        var scope = {x};
        array.push(math.eval(exp,scope));
    }

    return array;

}

module.exports = getData;