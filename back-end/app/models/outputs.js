var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Output model schema.
 */
var outputSchema = new Schema({
    pcorr : Number,
    delta: Number,
    input_id : String,
    data: Array
});

var Output = mongoose.model('Output', outputSchema);
module.exports = Output;
