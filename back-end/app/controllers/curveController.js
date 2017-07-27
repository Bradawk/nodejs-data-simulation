var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');
var evalHandler = require('../lib/evalHandler');
var getData = require('../lib/getData');
var randoms = require('../lib/randoms');

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

    var delta_curve = '';
    var handler = evalHandler(req.body.curve);

    if(req.body.lag ||  req.body.coefficient){
        delta_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+req.body.lag+")");
        delta_curve = delta_curve+'*'+req.body.coefficient;
    }else{
        delta_curve = handler.curve;
    }
    
    var data_1 = getData(handler.curve);
    var data_2 = getData(delta_curve);
    
    Curve.create({
        'expression': handler.curve,
        'input_id': req.body.input_id,
        'types': handler.types,
        'data_objects': data_1,
        'curve': req.body.curve
    }, (err, curve) => {
        if(err) res.json(err);
        Curve.create({
            'expression': delta_curve,
            'input_id': req.body.input_id,
            'types': handler.types,
            'lag': req.body.lag,
            'data_objects': data_2,
            'curve': req.body.curve
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
    var handler = evalHandler(req.body.curve);
    var new_curve = '';

    if(req.body.lag && req.body.coefficient){
        new_curve = handler.curve.replace(/x(?!p)/g, "x+("+req.body.lag+")");
        new_curve = new_curve+'*'+req.body.coefficient
    }else{
        new_curve = handler.curve;
    }

    var data = getData(new_curve);

    Curve.findOneAndUpdate({'_id': req.body.id},{$set:{"expression":new_curve,"data_objects": data}}, function(err, curve){
        if(err) throw err;
        res.json(curve);
    });
}


// ## RANDOMIZER

exports.createRandom = (req, res) => {
    var curve = [];
    var lag = Math.random() * (1400 - 1) + 1;
    var coefficient = Math.floor(Math.random() * (10 + 10) -10);
    var delta_curve = '';

    for(var i = 0; i < Math.floor(Math.random() * (6 - 2) + 2); i ++){
        curve.push({value: 'gaussian', params:{'sigma': Math.random() * (0.6 - 0) + 0, 'mu': Math.random() * (1400 - 1) + 1,'coef':Math.random() * (100 + 10) -10}});
    }
    for(var i = 0; i < Math.floor(Math.random()); i ++){
        curve.push({value: 'logarithmic', params:{'delta': Math.random()*(1400 - 1) + 1, 'coef':Math.random() * (100 + 10) -10}});
    }
    for(var i = 0; i < Math.floor(Math.random() * (2 - 0) + 0); i ++){
        curve.push({value: 'sigmoid', params:{'lambda':Math.random() * (2 - 0) + 0,'delta': Math.random()*(1400 - 1) + 1,'coef':Math.random() * (100 + 10) -10}});
    }

    var handler = evalHandler(curve);
    handler.curve = handler.curve +'*'+coefficient;
    delta_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+lag+")");

    var data_1 = getData(handler.curve);
    var data_2 = getData(delta_curve);

    Curve.create({
        'expression': handler.curve,
        'input_id': req.body.input_id,
        'types': handler.types,
        'data_objects': data_1,
        'curve': curve
    }, (err, curve) => {
        if(err) res.json(err);
        Curve.create({
            'expression': delta_curve,
            'input_id': req.body.input_id,
            'types': handler.types,
            'lag': lag,
            'data_objects': data_2,
            'curve': curve
        },(err, d) => {
            if(err) console.log(err);
            res.json(d);
        })
    });
    
}
