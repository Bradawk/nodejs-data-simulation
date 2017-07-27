var express = require('express');
var router = express.Router();
var curveController = require('../app/controllers/curveController');

router.route('/:id')
    .get(curveController.find)
    .delete(curveController.delete);

router.route('/')
    .get(curveController.findAll)
    .post(curveController.create);

router.route('/update')
    .post(curveController.update);

router.route('/random')
    .post(curveController.createRandom);

module.exports = router;
