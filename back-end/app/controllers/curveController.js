var Curve = require('../models/curves.js')
var isEmptyObject = require('../lib/empty');
var evalHandler = require('../lib/evalHandler');
var getData = require('../lib/getData');

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
    if(req.body.delta &&  req.body.coefficient){
        delta_curve = handler.curve.replace(/x(?!p)/g, "x+("+req.body.delta+")");
        delta_curve = delta_curve+'*'+req.body.coefficient
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
            'delta': req.body.delta,
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

    if(req.body.delta && req.body.coefficient){
        new_curve = handler.curve.replace(/x(?!p)/g, "x+("+req.body.delta+")");
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

