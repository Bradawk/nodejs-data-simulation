var express = require('express');
var router = express.Router();
var inputController = require('../app/controllers/inputController');

router.route('/')
  .get(inputController.index)
  .post(inputController.create);

router.get('/hello', (req, res) => {
    res.json({
        text: "Hello Brad"
    })
});

router.post('/users', (req, res) => {
    let {
        password,
        confirm_password
    } = req.body
    if (password !== confirm_password) {
        return res.status(400).json({
            msg: "Le mot de passe ne correspond pas."
        });
    }
})

module.exports = router;
