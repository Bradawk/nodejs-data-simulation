var Input = require('../models/inputs.js');
var Curve = require('../models/curves.js');
var Output = require('../models/outputs.js');
var isEmptyObject = require('../lib/empty');
var async = require('async');
var curveController = require('./curveController');

exports.index = (req, res) => {
    Input.find({},(err, inputs)=> {
        if(err){
            throw err;
        }else if(isEmptyObject(inputs)){
            res.json({'message':'No inputs registered.'})
        }else{
            res.json(inputs);
        }
    });
};


exports.create = (req, res) => {
    Input.create({
        'created_at' : Date.now(),
        'updated_at': Date.now()
    }, function(err, input){
        if(err) res.send('Error');
        res.json(input);
    });  
};

exports.createRandom = (req, res) => {
    async.times(req.body.iNum, function(n, next){
        Input.create({
            'created_at' : Date.now(),
            'updated_at': Date.now()
        }, function(err, input){
            if(err) throw err;
            next(err, input);
        }); 
    },function(err, inputs) {
        if(err) throw err;
        res.json(inputs);
    });
}


exports.delete = (req, res) => {
    Output.remove({'input_id': req.params.id}, function(err, output){
        if(err) throw err;
        Curve.remove({'input_id': req.params.id}, function(err, curve){
        if(err) throw err;
            Input.remove({'_id': req.params.id}, function (err, curve){
                if(err) throw err;
                res.json({'message':'Input, Output and associated curves deleted'});
            })
        })
    });
    
}

exports.getCurves = (req, res) => {
    Curve.find({'input_id': req.params.id}, function(err, curves){
        if(err){
            throw err;
        }else{
            res.json(curves);
        }
    });
};
