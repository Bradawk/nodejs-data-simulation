// RANDOM VARIABLES RANGES

var variables = {
    'curves':{
        'gauss': Math.random() * (5 - 1) + 1,
        'log': Math.random() * (2 - 1) + 1,
        'sigmoid': Math.random() * (1 - 0) + 0
    },
    'sigma': Math.random() * (0.5 - 0) + 0,
    'mu': Math.random() * (2800 - 1) + 1,
    'lambda': Math.random() * (1 - 0) + 0,
    'coefficient': Math.random() * (10 - 1) + 1
};

exports.variables = variables;
