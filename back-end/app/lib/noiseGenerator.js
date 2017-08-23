var r = require('./marsaglia-polar');

function noiseGenerator(state,data){
    var randomNumbers = [];
    
    for(var i = 0; i < data.length; i++){
        randomNumbers.push((r.normalRandomInRange(-5,5))*10);
    }

    if(state == 1){
        data = data.map(function (num, idx) {
            return num + randomNumbers[idx];
        });
    }
    
    var result = {
        "data": data
    }

    return result;
}


module.exports = noiseGenerator;
