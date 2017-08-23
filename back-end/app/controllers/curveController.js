var Curve = require('../models/curves.js');
var Output = require('../models/outputs.js');
var isEmptyObject = require('../lib/empty');
var evalHandler = require('../lib/evalHandler');
var getData = require('../lib/getData');
var carrier = require('../lib/getCarrier');
var poly = require('../lib/randomPolynomial');
var outputCalculation = require('../lib/outputCalculation');
var outputController = require('./outputController');
var randomCurve = require('../lib/randomCurve')


var math = require('mathjs');

// ### FIND VOIR STREAM
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

    delta_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+req.body.lag+")");
    delta_curve = '('+delta_curve+')*'+req.body.coefficient;
    
    var data_1 = getData(handler.curve);
    var data_2 = getData(delta_curve);

    for(var propName in req.body.curve[0].params){
        if(req.body.curve[0].params[propName] == null || req.body.curve[0].params[propName] == undefined || req.body.curve[0].params[propName] == ''){
            delete req.body.curve[0].params[propName]
        }
    }

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
            'coefficient': req.body.coefficient,
            'data_objects': data_2,
            'curve': req.body.curve
        },(err, d) => {
            if(err) console.log(err);
            var outputItems = {
                'd1': data_1,
                'd2': data_2,
                'lag': Math.floor(d.lag),
                'coefficient': d.coefficient,
                'input_id': d.input_id
            };
            outputController.create(req, res, outputItems);
            res.json({'d1':curve,'d2':d});
        })
    }); 
};

// ## DELETE
exports.delete = (req, res) => {
    Curve.remove({'input_id': req.params.id},(err, curve) => {
        if(err) res.json(err);
        res.send({"message":"Curve deleted"});
    })
}

// ## UPDATE
exports.update = (req, res) => {

    Curve.findOne({'_id': req.body.id}, (err, curve) => {
        var handler = evalHandler(req.body.curve);
        var new_curve = '';
        var state = 0;
        new_curve = handler.curve.replace(/x(?!p)/g, "x+(-"+req.body.lag+")");
        new_curve = '('+new_curve+')*'+req.body.coefficient;
        if(curve.noise == true){
            state = 1;
        }
        console.log(state)
        var data = getData(new_curve, state);

        Curve.findOneAndUpdate({'_id': req.body.id},{$set:{"expression":new_curve,"data_objects": data.data, "curve": req.body.curve,'coefficient':req.body.coefficient,'lag': req.body.lag}}, function(err){
            if(err) throw err;
            var outputItems = {
                'd2': data.data,
                'lag': curve.lag
            };
            outputController.update(req,res, outputItems);
        });
    });  
}


// ## RANDOMIZER

exports.createRandom = (req, res) => {

    var randCurve = randomCurve();  
    var data = randCurve.data
    // TO DO : REFACTO 
    Curve.create({
        'expression': randCurve.first_curve,
        'types': randCurve.types,
        'data_objects': data.data1.data,
        'curve': randCurve.curve,
        'input_id': req.body.input_id,
        'noise': randCurve.data.data2.noise
    }, (err, c) => {
        if(err) throw err;
        Curve.create({
            'expression': randCurve.delta_curve,
            'types': randCurve.types,
            'lag': randCurve.lag,
            'data_objects': data.data2.data,
            'curve': randCurve.curve,
            'input_id': req.body.input_id,
            'coefficient': randCurve.coefficient,
            'noise': randCurve.data.data2.noise
        },(err, d) => {
            if(err) throw err;
            var item = {
                'input_id': req.body.input_id,
                'lag': randCurve.lag,
                'coefficient': randCurve.coefficient,
                'd1':c.data_objects,
                'd2':d.data_objects
            }
            try {
                outputController.create(req, res, item);
                res.json({"curve 1 :": c, "curve 2 :": d});
            } catch (error) {
                console.log(error);
            }
        })
    });
}
