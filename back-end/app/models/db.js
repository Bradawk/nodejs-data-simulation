var colors = require('colors');
var mongoose = require('mongoose');

var config = require('../../conf/config');

mongoose.connect('mongodb://'+config.db_user_name+':'+config.db_user_password+'@'+config.host+'/'+config.db_name);

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
  console.log('✔ CONNECTED TO'.green+' '+config.host.green);
  console.log('Connected as : '.green+ config.db_user_name.green);
});
