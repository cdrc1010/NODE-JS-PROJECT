var express = require('express');
var router = express.Router();
const { requireAuth, checkUser } = require('../middleware/authMiddleware');


router.get('/', requireAuth, checkUser, function (req, res, next) {
    res.render('login-success'); // displaying home page
});

module.exports = router;
