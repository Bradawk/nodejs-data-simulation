var math = require('mathjs');
var noiseGenerator = require('./noiseGenerator');

/**
 * Return an Array of data objects according to a given mathematical expression.
 * 
 * @param {String} math_exp 
 * @param {Integer} state 
 */
function getData(math_exp, state){
    
    if (typeof state === 'undefined') { state = 0; }
    var array = [];
	var f=Function('x', 'return '+math_exp);

    for(var x = 0; x <= 2880; x ++){
        array.push(f(x));
    }

    var data = noiseGenerator(state, array);

    return data;

}

module.exports = getData;
