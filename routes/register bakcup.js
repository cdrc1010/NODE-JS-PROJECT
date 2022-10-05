var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const app = express();


// including .env file in routes
require('dotenv').config();
const bcrypt = require('bcryptjs');
//GET URL AND SECRET
const JWT_SECRET = process.env.jwt;
const MONGODB_URL = process.env.mongodb;
const salt = 10;    
// console.log(JWT_SECRET);
// console.log(MONGODB_URL);
mongoose.connect(MONGODB_URL);


/* GET API*/
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Registration Page' }); // calling register.ejs and passing title
});

// SCHEMA FOR USER
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true }
// }, { collection: 'users' });

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})

//storing schema into Users variable
// const Users = mongoose.model(userSchema);
const Users = mongoose.model("users", userSchema);


app.post('/', async (req, res) => {
  const { name, email, password: plainTextPassword } = req.body;
  const password = await bcrypt.hash(plainTextPassword, salt);
  try{
      //storing to database
      const response = await Users.create({
          name,
          email,
          password
      })
      return res.redirect('/welcome');
  }
  catch(error){
      throw error;
  }
});

module.exports = router;
