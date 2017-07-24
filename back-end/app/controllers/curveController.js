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

    var handler = evalHandler(req.body.curve, req.body.delta, req.body.coefficient);
    var objects = getData(handler.firstCurve, handler.secondCurve);

    Curve.create({
        'expression': handler.firstCurve,
        'input_id': req.body.input_id,
        'types': handler.types,
        'data_objects': objects[0],
        'params': handler.params
    }, (err, curve) => {
        if(err) res.json(err);
        Curve.create({
            'expression': handler.secondCurve,
            'input_id': req.body.input_id,
            'types': handler.types,
            'delta': req.body.delta,
            'data_objects': objects[1],
            'params': handler.params
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

    var handler = evalHandler(req.body.curve, req.body.delta, req.body.coefficient);
    var data_objects = [];

    for(var x = 0; x <= 2880; x ++){
        var scope = {x};
        data_objects.push(math.eval(handler.firstCurve,scope));
    }

    Curve.save({
        'expression': handler.secondCurve,
        'input_id': req.body.input_id,
        'types': handler.types,
        'delta': req.body.delta,
        'data_objects': objects[1],
        'params': handler.params 
    }, function(err, curve){
        if(err) res.json(err);
        res.json(curve);
    })
}

