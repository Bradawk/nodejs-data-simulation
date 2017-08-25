## Nodejs data simulation application.

### Random :

#### Sigmoid - coeff(sigmoid(x+delta))+constante
  constante : [20-60]  
  coeff : [20-90]  
  coeff+constante : [0-100]  
  delta : [500-2300]  
  lambda : [0.01-0.4]
  
#### Log - KO

#### Polynomial -
  degré : [1er - 3ème]
  

#### Gaussian
  coeff : [1000-500000]  
  sigma : [20-500]  
  mu : [0-2880]


### CONFIGURATION FILE

Create back-end/app/conf/config.js
Copy - Paste :
<pre>
  var config = {};

  config.db_name =  '';
  config.db_user_name = '';
  config.db_user_password = '';
  config.host = '';

  module.exports = config;

</pre>
