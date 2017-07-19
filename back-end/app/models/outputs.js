var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var outputSchema = new Schema({
    pcorr : Array,
    input_id : String
});

var Output = mongoose.model('Output', outputSchema);
module.exports = Output;