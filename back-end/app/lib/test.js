var r = require('./marsaglia-polar');

var tab = [120,125,169,180,190,230,300,305,310,315,315,320,280,260,240,200,180,160,150,120];
var new_tab = [];

for(var i = 0; i < 30; i++){
    new_tab.push((r.normalRandomInRange(-5,5))*10);
}

var sum = tab.map(function (num, idx) {
  return num + new_tab[idx];
});
