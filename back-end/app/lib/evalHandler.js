

/**
 * Build a mathematical expression according to given curve types.
 * 
 * @param {Array} curve 
 */
function evalHandler(curve){

    var expressions = [],
        types = [];
    
    curve.forEach(function(e){
        types.push(e.value);
        
        if(e.value == "gaussian"){
            //expressions.push('((1/('+e.params.sigma+'*sqrt(2*pi)))*exp(-((x/10-'+e.params.mu+')^2/2*'+e.params.sigma+'^2)))*'+e.params.coef);
            expressions.push('(((1/(Math.sqrt(Math.pow((2*Math.PI*'+e.params.sigma+'),2))))*Math.exp(-Math.pow((x-'+e.params.mu+'),2)/Math.pow((2*'+e.params.sigma+'),2)))*'+e.params.coef+')');
            
        }else if(e.value == "sigmoid"){
            expressions.push('('+e.params.coef+'*(1/(1+Math.exp(-'+e.params.lambda+'*(x-'+e.params.delta+'))))+'+e.params.const+')');
            
        }else if(e.value == "polynomial"){
            expressions.push(e.params.poly);

        }else if(e.value == "noise"){
            expressions.push('Math.random()*('+e.params.max+'-'+e.params.min+')+'+e.params.min);
            
        }else{
            expressions.push('');
            
        }
    });

    var rep = expressions.join("+");

    var handlerRes = {
        'curve': rep,
        'types': types
    };

    return handlerRes;
    
}


module.exports = evalHandler;
