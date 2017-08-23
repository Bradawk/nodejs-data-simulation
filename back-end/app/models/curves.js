var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var curveSchema = new Schema({
    expression: String,
    lag: Number,
    coefficient: Number,
    data_objects: Array,
    input_id: String,
    types: Array,
    curve: Array,
    noise: Boolean
});

var Curve = mongoose.model('Curve', curveSchema);

module.exports = Curve;
