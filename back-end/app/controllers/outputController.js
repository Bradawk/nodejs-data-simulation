var Output = require('../models/outputs.js');
var isEmptyObject = require('../lib/empty');
var Curve = require('../models/curves.js');
var pcorr = require('compute-pcorr');
var pcorrelation = require('../lib/pcorrelation');



exports.findOne = (req, res) => {
    Output.findOne({'_id': req.params.id}, function(err, output){
        if(err) res.json(err);
        res.json(output);
    });
};

exports.find = (req, res) => {
    Output.find({}, function(err, outputs){
        if(err){
            throw err;
        }else if(isEmptyObject(outputs)){
            res.json({'message':'No output registered.'})
        }else{
            res.json(outputs);
        }
    });
};

exports.findByInput = (req, res) => {
    Output.findOne({'input_id': req.params.id}, function(err, output){
        if(err) res.json(err);
        res.json(output);
    });
};

exports.create = (req, res) => {
    Curve.find({'input_id': req.body.input_id}, (err, curves) => {
        if(err) res.json(err);

        // ################ A REFACTO
        var x = []
            y = [];
        for(var i in curves[0].data_objects){
            x.push(curves[0].data_objects[i]);
        }
        for(var i in curves[1].data_objects){
            y.push(curves[1].data_objects[i]);
        }
        // ################
        var corr = pcorrelation(x,y);
        Output.create({'input_id': req.body.input_id,"pcorr":corr}, (err, output) => {
            if(err) res.json(err);
            res.json(output);
        });
    })
}