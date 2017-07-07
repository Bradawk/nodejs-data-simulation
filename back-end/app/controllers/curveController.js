var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');

// ### FIND
exports.find = function(req, res){
    Curve.findOne({'_id': req.params.id}, function(err, curve){
        if(err) throw err;
        res.json(curve);
        
    });
};

// ### CREATE
exports.create = function(req, res){
    var expression = '';
    var data_objects = [];

    switch(req.body.func_type){
        case 'gaussian':
            expression = '((1/('+req.body.sigma+'*sqrt(2*pi)))*exp(-((x-'+req.body.mu+')^2/2*'+req.body.sigma+'^2)))';
        break;
        case 'noise':
            expression = 'random('+req.body.amp_min+','+req.body.amp_max+')'; // A REDEFINIR
        break;
        case 'logarithmic':
            expression = 'log(x)'; // A REDEFINIR
        break;
        default:
            expression = req.body.expression;
    }
    
    
    // INSERT DELTA 
    var delta = req.body.delta;
    var rep = expression.replace(/x(?!p)/i, "x+("+delta+")"); 
    
    // EVAL MATH FUNCTION
    for(var x = 0; x <= 2880; x ++){
        var scope = {x};
        data_objects.push(math.eval(rep,scope));
    }

    Curve.create({
        'input_id': req.body.input_id,
        'expression': rep,
        'label': req.body.label,
        'delta': req.body.delta,
        'data_objects': data_objects
    }, function(err, curve){
        if(err) throw err;
        res.json(curve);
    });
};


// ## DELETE
exports.delete = (req, res) => {
    Curve.remove({'input_id': req.params.id}, function(err, curve){
        if(err) throw err;
        res.send({"message":"Curve deleted"});
    })
}
