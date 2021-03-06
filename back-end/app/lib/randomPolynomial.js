
/**
 * Build a string of a random polynomial expression.
 * @param {Number} degree 
 */
function randomPolynomial(degree){
    var poly = '';
    for(var i = degree; i > 0; i--){
        poly += Math.floor(Math.random()*(10 - 1) + 1)+"x^"+i+"+";
    }
    poly = poly.slice(0, -1);
    return poly;
}

module.exports = randomPolynomial;
