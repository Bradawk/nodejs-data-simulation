var r = require('./marsaglia-polar');

function noiseGenerator(state,d1,d2){
    var randomNumbers = [];
    for(var i = 0; i < d1.length; i++){
        randomNumbers.push((r.normalRandomInRange(-5,5))*10);
    }

    switch(state){
        case 1:
            d1 = d1.map(function (num, idx) {
                return num + randomNumbers[idx];
            });
        break;
        case 2:
            d2 = d2.map(function (num, idx) {
                return num + randomNumbers[idx];
            });
        break;
        case 3:
            d1 = d1.map(function (num, idx) {
                return num + randomNumbers[idx];
            });
            d2 = d2.map(function (num, idx) {
                return num + randomNumbers[idx];
            });
        break;
        default:
            return
    }

    var result = {
        "d1": d1,
        "d2": d2
    }

    return result;
}


module.exports = noiseGenerator;
