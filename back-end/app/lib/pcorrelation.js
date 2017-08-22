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

    return corrCoef;
}

/* TEST
var tab1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
var tab2 = tab1.map(function(a){return a*1.7054689});

var lag = 10;
var d1 = tab1.splice(0,tab1.length-lag);
var d2 = tab2.splice(lag, tab2.length);

var foo = pcorrelation(d1, d2);
console.log(foo);
*/

module.exports = pcorrelation;
