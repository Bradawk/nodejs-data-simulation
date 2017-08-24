var pcorrelation = require('./pcorrelation');

function outputCalculation(d1, d2, lag){
    var x = d1
        y = d2;
    
    for(var i = 0; i < x.length; i++){
        x[i] = isFinite(x[i]) ? x[i] : 0.0;
        y[i] = isFinite(y[i]) ? y[i] : 0.0;
    }

    x = x.slice(0, x.length-Math.floor(lag));
    y = y.slice(Math.floor(lag), y.length);

    var corr = pcorrelation(x, y);
    var data = {
        'corr': corr,
        'd1': x,
        'd2': y
    }
    return data;
}

module.exports = outputCalculation;

