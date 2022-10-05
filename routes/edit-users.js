var express = require('express');
var router = express.Router();
const User = require('../model/User');

//GET Specific User base on the ID
router.get('/:id', (req, res) => {
  let selectedID = req.params.id;

  console.log(selectedID);
  User.findById(selectedID).then((user) => {
    res.render('edit-users', { user });
  });

})

//POST request this is for edit
router.post('/:id', async (req, res) => {
  let selectedID = req.params.id;
  const response = await User.findByIdAndUpdate(selectedID, {
    $set: {
      name: req.body.name,
      email: req.body.email

    }, upsert: true
  })
  res.redirect('/user-list');
})


module.exports = router;
