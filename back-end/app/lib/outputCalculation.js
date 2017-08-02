var pcorrelation = require('./pcorrelation');

function outputCalculation(d1, d2){

    var x = d1
        y = d2;
    
    for(var i = 0; i < x.length; i++){
        x[i] = isFinite(x[i]) ? x[i] : 0.0;
        y[i] = isFinite(y[i]) ? y[i] : 0.0;
    }

    var corr = pcorrelation(x, y);

    return corr;
}

module.exports = outputCalculation;

