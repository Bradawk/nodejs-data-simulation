var colors = require('colors');
var mongoose = require('mongoose');
var dbname = 'datasetdb';
var host = 'ds143201.mlab.com:43201'
mongoose.connect('mongodb://adrien:adrienlegrand@'+host+'/'+dbname);

var db = mongoose.connection;

db.on('error', function(err) {
  console.error('✘ CANNOT CONNECT TO MongoDB DATABASE !'.red, dbname.blue, err);
});
db.on('disconnected', function() {
  console.log('✘ DISCONNECTED from MongoDB DATABASE !'.red);
});
db.on('parseError', function(err) {
  console.log('✘ parseError... '.red, err);
});
db.on('open', function(err) {
  console.log('✔ CONNECTED TO'.green+' '+host.green);
});
