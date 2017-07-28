// RANDOM VARIABLES RANGES

var randoms = {
    'curves':{
        'gauss_num': Math.floor(Math.random() * (6 - 1) + 1),
        'log_num': Math.floor(Math.random() * (3 - 1) + 1),
        'sigmoid_num': Math.floor(Math.random() * (2 - 0) + 0)
    },
    'params':{
        'sigma': Math.random() * (0.6 - 0) + 0,
        'mu': Math.random() * (2800 - 1) + 1,
        'lambda': Math.random() * (2 - 0) + 0,
        'coefficient': Math.random() * (11 - 1) + 1,
        'delta': Math.random() * (2800 - 1) + 1
    }
};


exports.randoms = randoms;
