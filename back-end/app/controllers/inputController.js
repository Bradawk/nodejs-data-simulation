var Input = require('../models/inputs.js');
var Curve = require('../models/curves.js');
var Output = require('../models/outputs.js');
var outputCalculation = require('../lib/outputCalculation');
var outputController  = require('./outputController');
var randomCurve = require('../lib/randomCurve');
var async = require('async');

/**
 * GET REQUEST '/' retrieves all inputs.
 * @param {Object} req
 * @param {Object} res
 */
exports.index = (req, res) => {
    Input.find({}).lean().exec((err, inputs) => {
        if(err) res.status(500).json({ 'message':'Something went wrong.', 'error': err });
        res.json(inputs);
    });
};

/**
 * GET REQUEST '/input/id' retrieves one inputs.
 * @param {Object} req
 * @param {Object} res
 */
exports.findOne = (req, res) => {
    Input.findOne({'_id': req.params.id},(err, input) => {
        if(err) res.status(400).json({ 'message':'No input with the given ID.', 'error': err });
        res.json(input);
    });
};

/**
 * POST REQUEST '/' creates an input.
 * @param {Object} req
 * @param {Object} res
 */
exports.create = (req, res) => {
    Input.create({
        'created_at' : Date.now(),
        'updated_at': Date.now()
    }, function(err, input){
        if(err) res.status(400).json({ 'message':'Something went wrong during the creation of the input.', 'error': err });
        res.json(input);
    });  
};

/**
 * POST REQUEST '/input' creates a defined number of input.
 * @param {Object} req
 * @param {Object} res
 */
exports.createRandom = (req, res) => {
    var inputCreation = (n, cb) => {
        Input.create({
            'created_at' : Date.now(),
            'updated_at': Date.now()
        }, (err, input) => {
            if(err) res.status(400).json({ 'message': 'Something went wrong during the creation of the input','error': err });
            var randCurve = randomCurve();
            var data = randCurve.data;
            req.body.input_id = input._id;
            Curve.create({
                'expression': randCurve.first_curve,
                'types': randCurve.types,
                'data_objects': data.data1.data,
                'curve': randCurve.curve,
                'input_id': input._id,
                'noise': randCurve.noise[0]
            }, (err, c) => {
                if(err) res.status(400).json({"message":"Something went wrong during the creation of the first curve.","error": err});
                Curve.create({
                    'expression': randCurve.delta_curve,
                    'types': randCurve.types,
                    'lag': randCurve.lag,
                    'data_objects': data.data2.data,
                    'curve': randCurve.curve,
                    'input_id': input._id,
                    'coefficient': randCurve.coefficient,
                    'noise': randCurve.noise[1]
                },(err, d)=>{
                    if(err) res.status(400).json({"message":"Something went wrong during the creation of the second curve.","error": err});
                    var output = outputCalculation(c.data_objects, d.data_objects, d.lag);
                    var data = {'data1':output.d1,'data2':output.d2}
                    Output.create({'input_id': input._id, 'pcorr': output.corr, 'delta': Math.floor(d.lag), 'data':data}, (err, output) => {
                        if(err) res.status(400).json({"message":"Something went wrong during the output creation.","error": err});
                    });
                });
            });
        })
        cb();
    }

    async.times(req.body.iNum, function(n, next){
        inputCreation(n, function(err, input){
            next(err, input);
        });
    }, function(err, inputs){
        if(err) res.status(400).json({"message":"Something went wrong during the random creation.","error": err});
        res.json(inputs);
    })

    // async.times(req.body.iNum, function(n, next){
    //     Input.create({
    //         'created_at' : Date.now(),
    //         'updated_at': Date.now()
    //     }, function(err, input){
    //         if(err) res.status(400).json({ 'message': 'Something went wrong during the creation of the input','error': err });
    //         var randCurve = randomCurve();
    //         var data = randCurve.data;
    //         req.body.input_id = input._id;
    //         // TO DO : REFACTO  
    //         Curve.create({
    //             'expression': randCurve.first_curve,
    //             'types': randCurve.types,
    //             'data_objects': data.data1.data,
    //             'curve': randCurve.curve,
    //             'input_id': input._id,
    //             'noise': randCurve.noise[0]
    //         }, (err, c) => {
    //             if(err) res.status(400).json({"message":"Something went wrong during the creation of the first curve.","error": err});
    //             Curve.create({
    //                 'expression': randCurve.delta_curve,
    //                 'types': randCurve.types,
    //                 'lag': randCurve.lag,
    //                 'data_objects': data.data2.data,
    //                 'curve': randCurve.curve,
    //                 'input_id': input._id,
    //                 'coefficient': randCurve.coefficient,
    //                 'noise': randCurve.noise[1]
    //             },(err, d) => {
    //                 if(err) res.status(400).json({"message":"Something went wrong during the creation of the second curve.","error": err});
    //                 var output = outputCalculation(c.data_objects, d.data_objects, d.lag);
    //                 var data = {'data1':output.d1,'data2':output.d2}
    //                 Output.create({'input_id': input._id, 'pcorr': output.corr, 'delta': Math.floor(d.lag), 'data':data}, (err, output) => {
    //                     if(err) res.status(400).json({"message":"Something went wrong during the output creation.","error": err});
    //                 });
    //             });
    //             next(err, input);
    //         });
    //     }); 
    // },function(err, inputs) {
    //     if(err) res.status(400).json({"message":"Something went wrong during the random creation.","error": err});
    //     res.json(inputs);
    // });
}

/**
 * DELETE REQUEST '/delete/:id' deletes an input.
 * @param {Object} req
 * @param {Object} res
 */
exports.delete = (req, res) => {
    Output.remove({'input_id': req.params.id}, function(err, output){
        if(err) res.status(400).json({"message":"Something went wrong during the deletion of the output.","error": err});
        Curve.remove({'input_id': req.params.id}, function(err, curve){
        if(err) res.status(400).json({"message":"Something went wrong during the deletion of the curves.","error": err});
            Input.remove({'_id': req.params.id}, function (err, input){
                if(err) res.status(400).json({"message":"Something went wrong during the deletion of the input.","error": err});
                res.json(input);
            })
        })
    });
}

/**
 * GET REQUEST '/curves/:id' retrieves curves from an input.
 * @param {Object} req
 * @param {Object} res
 */
exports.getCurves = (req, res) => {
    Curve.find({'input_id': req.params.id}, function(err, curves){
        if(err){
             res.status(400).json({ 'error': 'No curve with the given ID' });
        }else{
            res.json(curves);
        }
    });
};
