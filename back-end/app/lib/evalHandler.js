
/* CONDITION + ENTIRE EVAL */

function evalHandler(curve){

    var expressions = [],
        types = [];
    
    curve.forEach(function(e){
        types.push(e.value);
        
        if(e.value == "gaussian"){
            //expressions.push('((1/('+e.params.sigma+'*sqrt(2*pi)))*exp(-((x/10-'+e.params.mu+')^2/2*'+e.params.sigma+'^2)))*'+e.params.coef);
            expressions.push('((1/(sqrt((2*pi*'+e.params.sigma+')^2)))*exp(-(x-'+e.params.mu+')^2/(2*'+e.params.sigma+')^2))*'+e.params.coef);
            
        }else if(e.value == "sigmoid"){
            expressions.push(e.params.coef+'*(1/(1+exp(-'+e.params.lambda+'*(x-'+e.params.delta+'))))+'+e.params.const);
            
        }else if(e.value == "polynomial"){
            expressions.push('-0.05*x+40');

        }else if(e.value == "noise"){
            expressions.push('random('+e.params.min+','+e.params.max+')');

        }else{
            expressions.push('');
            
        }
    });

    var expression = expressions.join();
    var rep = expression.replace(/,/g,'+').toString();

    var handlerRes = {
        'curve': rep,
        'types': types
    };

    return handlerRes;
    
}


module.exports = evalHandler;
