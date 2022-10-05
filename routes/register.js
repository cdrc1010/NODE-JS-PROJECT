var express = require('express');
var router = express.Router();
//REFERENCE TO THE CONTROLLER
const authController = require('../controllers/authController');
const { check, body, validationResult } = require('express-validator');

const salt = 10;
const bcrypt = require('bcryptjs');
const User = require('../model/User');



/* GET API */
router.get('/register', authController.register_get);

/* POST API */
router.post('/register', [
    //checking if name has a 5 characters
    check('name', 'This field must be 5 characters long')
        .isLength({ min: 5 }),
    //checking email if it is valid
    check('email', 'Email is not Valid')
        .isEmail(),
    //checking password if it has a 5 characters
    body('password', 'Password must have 3 characters')
        .isLength({ min: 3 }),
    //checking confirm password if it is match on the password field
    body('cpass')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                //value  is the value of cpass
                throw new Error('Password and Confirm Pass does not match');
            }

            // Indicates the success of this synchronous custom validator
            return true;
        })
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // return res.status(422).jsonp(errors.array());
        const alert = errors.array();
        res.render('register', { alert });
    }
    else {
        const { name, email, password:plainTextPassword } = req.body;
         const password = await bcrypt.hash(plainTextPassword, salt);
            console.log(password);

            try {
                const user = await User.create({ name, email, password });
                // res.status(201).json(user);
                return res.redirect('/register-successful');
              }
              catch(err) {
               console.log(err);

              }
    }
});



module.exports = router;
