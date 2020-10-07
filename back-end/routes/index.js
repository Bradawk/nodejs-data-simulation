var express = require('express');
var router = express.Router();
var inputController = require('../app/controllers/inputController');

router.route('/')
  .get(inputController.index)
  .post(inputController.create);

router.get('/hello', (req, res) => {
    res.json({
        text: "Hello"
    })
});

module.exports = router;
