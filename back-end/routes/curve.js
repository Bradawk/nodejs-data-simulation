var express = require('express');
var router = express.Router();
var curveController = require('../app/controllers/curveController');

router.route('/:id')
    .get(curveController.find)
    .delete(curveController.delete)
    .put(curveController.update);

router.route('/')
    .get(curveController.findAll)
    .post(curveController.create);

router.route('/random')
    .post(curveController.createRandom);

module.exports = router;
