var Input = require('../models/inputs.js');

exports.index = function(req, res){
    Input.find({}, function(err, inputs){
        if(err) throw err;
        res.json(inputs);
    });
};

exports.create = function(req, res){
    Input.create({
        'created_at' : Date.now(),
        'updated_at': Date.now()
    }, function(err, input){
        if(err) res.send('Error');
        res.json(input);
    });
};