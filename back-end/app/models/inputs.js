var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inputSchema = new Schema({
    created_at: Date,
    updated_at: Date
});

var Input = mongoose.model('Input', inputSchema);
module.exports = Input;
