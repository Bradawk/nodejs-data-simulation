var Output = require('../models/outputs.js');
var isEmptyObject = require('../lib/empty');
var Curve = require('../models/curves.js');
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
        var x = curves[0].data_objects
            y = curves[1].data_objects;
        
        for(var i = 0; i < x.length; i++){
            x[i] = isFinite(x[i]) ? x[i] : 0.0;
            y[i] = isFinite(y[i]) ? y[i] : 0.0;
        }

        var corr = pcorrelation(x, y);
        var delta = curves[1].delta
        
        // ################

        Output.create({'input_id': req.body.input_id, 'pcorr': corr, 'delta': delta}, (err, output) => {
            if(err) res.json(err);
            res.json(output);
        });
    })
}
