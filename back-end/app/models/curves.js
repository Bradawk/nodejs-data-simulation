var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var curveSchema = new Schema({
    curve_type: String,
    label: String,
    delta: Number,
    data_objects: Array,
    input_id: String
});

var Curve = mongoose.model('Curve', curveSchema);

module.exports = Curve;