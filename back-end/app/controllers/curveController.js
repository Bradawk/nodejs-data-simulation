var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');
var math = require('mathjs');

// ### FIND
exports.find = function(req, res){
    Curve.findOne({'_id': req.params.id}, function(err, curve){
        if(err) res.json(err);
        res.json(curve);
    });
};

exports.findAll = function(req, res){
    Curve.find({}, function(err, curves){
        if(err) res.json(err);
        res.json(curves);
    });
};

// ### CREATE
exports.create = function(req, res){

    var submittedCurve = req.body.curve;
    var types = [];
    var expressions = [];
    var f_data_objects = [];
    var s_data_objects = [];
    var delta = req.body.delta;
    
    submittedCurve.forEach(function(e){
        types.push(e.value);
    });
    
    types.forEach(function(type){
        if(type == "gaussian"){
            var sigma = Math.random() * (5.0 - 1.0) + 1.0;
            var mu = Math.random() * (3.0 - 0) + 0;
            expressions.push('((1/('+sigma+'*sqrt(2*pi)))*exp(-((x-'+mu+')^2/2*'+sigma+'^2)))');

        }else if(type == "sigmoid"){
            var d = Math.random() * (1.0 - 0) + 0;
            expressions.push('(1/(1+exp(-'+d+'*x)))');

        }else if(type == "logarithmic"){
            expressions.push('log(x)');

        }else{
            expressions.push('');
            
        }
    });
    
    

    var expression = expressions.join();
    var rep = expression.replace(/,/g,'+').toString();
    var rep_delta = '';

    if(delta){
        rep_delta = rep.replace(/x(?!p)/g, "x+("+delta+")");
    }

    for(var x = 0; x <= 2880; x ++){
        var scope = {x};
        f_data_objects.push(math.eval(rep,scope));
        s_data_objects.push(math.eval(rep_delta,scope));
    }

    Curve.create({
        'expression': rep,
        'input_id': req.body.input_id,
        'types': types,
        'data_objects': f_data_objects
    }, function(err, curve){
        if(err) res.json(err);
        Curve.create({
            'expression': rep_delta,
            'input_id': req.body.input_id,
            'types': types,
            'delta': delta,
            'data_objects': s_data_objects
        }, function(err, d){
            if(err) console.log(err);
            res.json(d);
        })
    });
};


// ## DELETE
exports.delete = (req, res) => {
    Curve.remove({'input_id': req.params.id}, function(err, curve){
        if(err) res.json(err);
        res.send({"message":"Curve deleted"});
    })
}
