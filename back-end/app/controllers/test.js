var async = require('async');
var Input = require('../models/inputs');


var curve = [];
var output = [];
var input = [];

var addInput = function(id, callback) {
    input.push({
        'created_at': Date.now(),
        'updated_at': Date.now()
    });
};

async.times(4, function(n, next){
    addInput(n, function(err, input){
        next(err, input);
    });
}, function(err,e){
    if(err) throw err;
    console.log(e);
});
