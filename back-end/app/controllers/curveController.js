var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');

var math = require('mathjs');

// ### FIND
exports.find = (req, res) => {
    Curve.findOne({'_id': req.params.id}, function(err, curve){
        if(err) res.json(err);
        res.json(curve);
    });
};

exports.findAll = (req, res) => {
    Curve.find({}, function(err, curves){
        if(err) res.json(err);
        res.json(curves);
    });
};

// ### CREATE
exports.create = (req, res) => {

    var submittedCurve = req.body.curve;
    var expressions = [];
    var f_data_objects = [];
    var s_data_objects = [];
    var delta = req.body.delta;
    var coefficient = req.body.coefficient;
    var types = [];
    var params = [];
    

    submittedCurve.forEach(function(e){
        types.push(e.value);
        params.push(e.params)
        
        if(e.value == "gaussian"){
            expressions.push('((1/('+e.params.sigma+'*sqrt(2*pi)))*exp(-((x-'+e.params.mu+')^2/2*'+e.params.sigma+'^2)))');
        }else if(e.value == "sigmoid"){
            expressions.push('(1/(1+exp(-'+e.params.lambda+'*x)))');

        }else if(e.value == "logarithmic"){
            expressions.push('log(x)');

        }else if(e.value == "polynomial"){
            expressions.push('x^4+x^3+x^2+x');

        }else{
            expressions.push('');
            
        }
    });

    var expression = expressions.join();
    var rep = expression.replace(/,/g,'+').toString();
    var rep_delta = '';

    if(delta && coefficient){
        rep_delta = rep.replace(/x(?!p)/g, "x+("+delta+")");
        rep_delta = rep_delta+'*'+coefficient
    }else{
        rep_delta = rep;
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
        'data_objects': f_data_objects,
        'params': params
    }, (err, curve) => {
        if(err) res.json(err);
        Curve.create({
            'expression': rep_delta,
            'input_id': req.body.input_id,
            'types': types,
            'delta': delta,
            'data_objects': s_data_objects,
            'params': params
        },(err, d) => {
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

// ## UPDATE
exports.update = (req, res) => {
    Curve.save({'input_id': req.body.input_id, }, function(err, curve){
        if(err) res.json(err);
        res.send({"message":"Curve deleted"});
    })
}

