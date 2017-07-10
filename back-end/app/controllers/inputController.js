var Input = require('../models/inputs.js');
var Curve = require('../models/curves.js');
var isEmptyObject = require('../lib/empty');

exports.index = (req, res) => {
    Input.find({}, function(err, inputs){
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

exports.delete = (req, res) => {
    Curve.remove({'input_id': req.params.id}, function(err, curve){
        if(err) throw err;
        Input.remove({'_id': req.params.id}, function (err, curve){
            if(err) throw err;
            res.json({'message':'Input and associated curves deleted'});
        })
    })
}

exports.getCurves = (req, res) => {
    Curve.find({'input_id': req.params.id}, function(err, curves){
        if(err){
            throw err;
        }else if(isEmptyObject(curves)){
            res.json({'message':'No curves for that input id.'});
        }else{
            res.json(curves);
        }
    });
};