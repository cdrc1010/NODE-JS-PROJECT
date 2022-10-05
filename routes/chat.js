var express = require('express');
var router = express.Router();
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const Chat = require('../model/Chat');
const jwt = require('jsonwebtoken');

router.get('/', checkUser, requireAuth, (req, res) => {
  Chat.find({}, (err, chats) => {
    res.render('chat', {
      chatList: chats
    })
  })
});


router.post('/', (req,res) => {
    let  message  = req.body.message;
    let token = req.cookies.jwt;
    let decodedToken = jwt.decode(token);

     Chat.create({ name:decodedToken.name,
        message
          });
          res.redirect('/chat');

})



module.exports = router;
