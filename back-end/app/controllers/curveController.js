var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');
var evalHandler = require('../lib/evalHandler');
var getData = require('../lib/getData');
var randoms = require('../lib/randoms');
var carrier = require('../lib/getCarrier');

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
    console.log(new_curve);
    Curve.findOneAndUpdate({'_id': req.body.id},{$set:{"expression":new_curve,"data_objects": data, "curve": req.body.curve}}, function(err, curve){
        if(err) throw err;
        res.json(curve);
    });
}


// ## RANDOMIZER

exports.createRandom = (req, res) => {

    var curve = [];
    var base_delta = Math.random() * (10 - 1) + 1;
    var mu = 1.0;
    var lag = Math.random() * (1400 - 1) + 1;
    var coefficient = Math.floor(Math.random() * (10 + 10) -10);
    var delta_curve = '';


    var carrier_curves = carrier.getCarrier(); 

    if(carrier_curves[0] == 'sigmoid'){
        curve.push({value: 'sigmoid', params:{'lambda':Math.random() * (2 - 0) + 0,'delta': base_delta,'coef':Math.random() * (20 + 10) -10}});
        curve.push({value: carrier_curves[1], params:{'coef': Math.random() * (25 + 10) -10}, 'delta': base_delta+1400});
    }else{
        curve.push({value: carrier_curves[0], params:{'coef': 1, 'delta': base_delta}});
        curve.push({value: 'sigmoid', params:{'lambda':Math.random() * (2 - 0) + 0,'delta': base_delta,'coef':Math.random() * (20 + 10) -10}});
    }
    

    for(var i = 0; i < Math.floor(Math.random() * (8 - 2) + 2); i ++){
        curve.push({value: 'gaussian', params:{'sigma': Math.random() * (1.0 - 0.7) + 0.7, 'mu': mu,'coef':Math.random() * (30 + 10) -10}});
        mu += 400.0;
    }

    var handler = evalHandler(curve);
    handler.curve = handler.curve +'*'+coefficient;
    delta_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+lag+")");

    var data_1 = getData(handler.curve);
    var data_2 = getData(delta_curve);

    Curve.create({
        'expression': handler.curve,
        'types': handler.types,
        'data_objects': data_1,
        'curve': curve
    }, (err, curve) => {
        if(err) res.json(err);
        Curve.create({
            'expression': delta_curve,
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
