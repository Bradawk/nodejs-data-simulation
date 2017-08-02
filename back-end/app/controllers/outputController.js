var Output = require('../models/outputs.js');
var isEmptyObject = require('../lib/empty');
var Curve = require('../models/curves.js');
var pcorrelation = require('../lib/pcorrelation');
var outputCalculation = require('../lib/outputCalculation');



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
        var corr = outputCalculation(curves[0].data_objects, curves[1].data_objects)
        var delta = curves[1].lag
        
        Output.create({'input_id': req.body.input_id, 'pcorr': corr, 'delta': delta}, (err, output) => {
            if(err) res.json(err);
            res.json(output);
        });
    })
}
