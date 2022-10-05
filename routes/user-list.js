var express = require('express');
var router = express.Router();
const User = require('../model/User');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController')

router.get('/', checkUser,requireAuth, (req, res) => {
  User.find({}, (err, users) => {
    res.render('user-list', {
      usersList: users
    })
  })
});

router.delete('/:id', authController.delete_users)



module.exports = router;
