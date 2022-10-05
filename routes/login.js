var express = require('express');
var router = express.Router();

//REFERENCE TO THE CONTROLLER
const authController = require('../controllers/authController');


//GET REQUEST
router.get('/login', authController.login_get);

//POST REQUEST
router.post('/login', authController.login_post);


module.exports = router;
