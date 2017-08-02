var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outputSchema = new Schema({
    pcorr : Number,
    delta: Number,
    input_id : String,
    data: Object
});

var Output = mongoose.model('Output', outputSchema);
module.exports = Output;
