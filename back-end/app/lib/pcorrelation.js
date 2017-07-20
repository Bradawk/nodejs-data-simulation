var math = require('mathjs');


function mean(array){
    var sum = 0;
    var mean = 0;

    for(var i = 0; i < array.length; i ++){
        sum += array[i];
    }

    mean = sum/array.length
    return mean;
}

function cov(array1, array2){
    var covariance = 0;
    var sum = 0;
    var ar1_avg = mean(array1);
    var ar2_avg = mean(array2);

    for(var i = 0; i < array1.length; i++){
        sum += (array1[i] - ar1_avg)*(array2[i] - ar2_avg)
    }

    covariance = sum/(array1.length -1);
    return covariance;
}

function pcorrelation(array1, array2){
    var covariance = cov(array1, array2);
    var corrCoef = covariance/(math.std(array1)*math.std(array2));
    console.log(typeof(covariance));
    return corrCoef;
}

var a = [1,2]
var b = [2,4]
var r = pcorrelation(a,b);

module.exports = pcorrelation;