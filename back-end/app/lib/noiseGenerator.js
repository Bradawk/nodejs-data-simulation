var r = require('./marsaglia-polar');

/**
 * Add noise to a data.
 * @param {Integer} state 
 * @param {Array} data 
 */
function noiseGenerator(state,data){
    var randomNumbers = [];

    for(var i = 0; i < data.length; i++){
        randomNumbers.push((r.normalRandomInRange(-5,5))*10);
    }

    if(state == 1){
        data = data.map(function (num, idx) {
            return num + randomNumbers[idx];
        });
        var noise = true;
    }else{
        var noise = false;
    }
    
    var result = {
        "data": data,
        "noise": noise
    }

    return result;
}


module.exports = noiseGenerator;
