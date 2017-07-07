var express = require('express');
var router = express.Router();
var curveController = require('../app/controllers/curveController');

router.route('/:id')
    .get(curveController.find)
    .post(curveController.create)
    .delete(curveController.delete);


module.exports = router;
