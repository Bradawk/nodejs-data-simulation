
/**
 * Exclude a range of numbers in the results of Math.random
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} min_excluded 
 * @param {Number} max_excluded 
 */
function randomExclude(min, max, min_excluded, max_excluded){
    var n = Math.round((Math.random() * (max-min) + min) * 100) / 100;
		if(n >= min_excluded && n <= 0){
    	n -=  0.2;
    }else if(n <= max_excluded && n >= 0){
    	n += 0.2;
    }
    return n;
}

module.exports = randomExclude;
