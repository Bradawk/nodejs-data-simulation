
/**
 * Exclude a range of numbers in the results of Math.random
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} min_excluded 
 * @param {Number} max_excluded 
 */
function randomExclude(min, max, min_excluded, max_excluded){
    var n = Math.random() * (max-min) + min;
    if (n >= -min_excluded && n <= max_excluded) n+=0.1;
    return n;
}

module.exports = randomExclude;
