var express = require('express');
var router = express.Router();
var outputController = require('../app/controllers/outputController');

router.route('/')
    .get(outputController.find)
    .post(outputController.create);
    

router.route('/:id')
    .get(outputController.findOne)
    .put(outputController.update);

router.route('/input/:id')
    .get(outputController.findByInput);

module.exports = router;
