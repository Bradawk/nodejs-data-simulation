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

exports.create = (req, res, item) => {
    Curve.find({'input_id': item.input_id}, (err, curves) => {
        if(err) res.json(err);
        // CALC
        var output = outputCalculation(item.d1, item.d2, item.lag)
        var data = {'data1':output.d1,'data2':output.d2}

        Output.create({'input_id': item.input_id, 'pcorr': output.corr, 'delta': item.lag, 'data':data}, (err, output) => {
            if(err) res.json(err);
            console.log(output)
        });
    })
}

exports.update = (req, res, item) => {
    Curve.find({'input_id': req.body.input_id}, (err, curves) => {
        if(err) res.json(err);
        var output = outputCalculation(curves[0].data_objects, item.d2, Math.floor(item.lag));
        var data = {'data1':output.d1,'data2':output.d2};
        Output.findOneAndUpdate({'input_id': req.body.input_id},{$set:{'pcorr': output.corr, 'delta': Math.floor(item.lag), 'data':data}}, (err, output) => {
            if(err) res.json(err);
            res.json(output);
        });
    })
}

