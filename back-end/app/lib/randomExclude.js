
// Exclude a range out of Math.random function

function randomExclude(min, max, min_excluded, max_excluded){
    var n = Math.random() * (max-min) + min;
    if (n >= -min_excluded && n <= max_excluded) n+=0.1;
    return n;
}

module.exports = randomExclude;
