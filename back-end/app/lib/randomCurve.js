var evalHandler = require('./evalHandler');
var getData = require('./getData');
var randomExclude = require('./randomExclude');

function randomCurve(){
    var curve = [];
    var lag = Math.random() * (1400 - 1) + 1;
    var coefficient = randomExclude(-2,2,-0.2,0.2);
    var delta_curve = '';
    
    curve.push({value:'sigmoid', params:{'lambda':(Math.random()*(0.02 - 0.0005) + 0.005).toFixed(2), 'coef':(Math.random()*(80 - 20)+20).toFixed(2),'const':(Math.random()*(20-10)+10).toFixed(2),'delta':(Math.random()*(700-100)+100).toFixed(2)}})
    curve.push({value:'sigmoid', params:{'lambda':(Math.random()*(0.02 - 0.0005) + 0.005).toFixed(2), 'coef':(Math.random()*(-80)).toFixed(2),'const':(Math.random()*(15-0)+0).toFixed(2),'delta':(Math.random()*(2300-1900)+1900).toFixed(2)}})

    for(var i = 0; i < Math.floor(Math.random() * (10 - 2) + 2); i ++){
        curve.push({value: 'gaussian', params:{'sigma': (Math.random() * (200 - 20.0) + 20.0).toFixed(2), 'mu': (Math.random() * (2300 - 800) + 800).toFixed(2),'coef':(Math.random() * (3001) - 1500).toFixed(2)}});
    }

    var handler = evalHandler(curve);
    var first_curve = handler.curve;
    var types = handler.types;
    delta_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+lag.toFixed(2)+")");
    delta_curve = '('+delta_curve +')*'+coefficient.toFixed(2);

    var data_1 = getData(first_curve);
    var data_2 = getData(delta_curve);

    var randCurve = {
        'curve': curve,
        'types': types,
        'data': {'data1':data_1, 'data2': data_2},
        'delta_curve': delta_curve,
        'first_curve': first_curve,
        'lag': lag,
        'coefficient': coefficient
    };

    return randCurve;
}

module.exports = randomCurve;
