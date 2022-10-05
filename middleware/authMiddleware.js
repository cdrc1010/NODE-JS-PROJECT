const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWT_SECRET = process.env.jwt;


const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;


  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log('this is decoded', decodedToken.email);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        //res.locals.user it means .user or user variable is ready to access in front end which the ejs
        res.locals.user = user;
        next();
      }
    })
  }
  else{
    res.locals.user = null;
    next();
  }
}

module.exports = { requireAuth, checkUser };