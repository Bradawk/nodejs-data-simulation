var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var curveSchema = new Schema({
    expression: String,
    delta: Number,
    data_objects: Array,
    input_id: String,
    types: Array

});

var Curve = mongoose.model('Curve', curveSchema);

module.exports = Curve;