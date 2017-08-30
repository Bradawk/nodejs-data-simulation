var math = require('mathjs');

/**
 * Computes the mean of an array of numbers.
 * @param {Array} array 
 */
function mean(array){
    var sum = 0;
    var mean = 0;

    for(var i = 0; i < array.length; i ++){
        sum += array[i];
    }

    mean = sum/array.length
    return mean;
}

/**
 * Computes the covariance between arrays of numbers.
 * @param {Array} array1 
 * @param {Array} array2 
 */
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

/**
 * Computes the Pearson correlation coefficient between two datasets.
 * @param {Array} array1 
 * @param {Array} array2 
 */
function pcorrelation(array1, array2){
    var covariance = cov(array1, array2);
    var corrCoef = Math.round(   (covariance/(math.std(array1)*math.std(array2))) * 1000   ) / 1000;

    return corrCoef;
}


module.exports = pcorrelation;
