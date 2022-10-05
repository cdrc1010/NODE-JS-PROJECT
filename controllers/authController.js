const { requireAuth,checkUser } = require('../middleware/authMiddleware');
//REGISTRATION
const User = require('../model/User');
const Chat = require('../model/Chat');

const bcrypt = require('bcryptjs');


//LOGIN
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwt;




/* REGISTER GET */
module.exports.register_get = (req, res) => {
    res.render('register'); // calling register.ejs
}
/* REGISTER GET */

/* ------------------------------------------------------------- */



// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //email not registered
    if(err.message === 'incorrect email'){
        errors.email = "Account not found!";
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Password was incorrect';
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('users validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}
// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id, email, name) => {
    return jwt.sign({ id, email, name}, JWT_SECRET, {
        expiresIn: maxAge
    });
};

//POST LOGIN
module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id, user.email, user.name);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }

}

module.exports.login_get = (req, res) => {
    res.render('login'); // calling login.ejs
}
/* LOGIN GET AND POST REQUEST */


//LOGOUT

module.exports.logout_get = (req,res) => {
    res.cookie('jwt', '', {maxAge:1});
    res.render('logout');
}

module.exports.chat_get = (req, res) => {
   
  }

  module.exports.docslist_get = (req, res) => {
    res.render('docslist');
  }


module.exports.delete_users = async (req, res) =>{
        let selectedID = req.params.id;
        // console.log(selectedID);
        // const { name, email } = req.body;
        console.log(req.params.id);
      
        const response = await User.findByIdAndDelete(selectedID)
        
}