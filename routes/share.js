var express = require('express');
var router = express.Router();
const Upload = require('../model/Uploads');
const User = require('../model/User');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

//GET BY ID 
router.get('/:id', checkUser, requireAuth, (req, res) => {
  let selectedID = req.params.id;
  Upload.findById(selectedID).then((upload) => {
    User.find({}, (err, myusers) => {
      res.render('share', {
        myUsers: myusers,
        upload
      })
    })
  }).catch((error) => {
    console.log(error);
  });

})

//DELETE
router.get('/:id1/:id', async (req, res) => {
  let selectedID = req.params.id1;
  let selectedID2 = req.params.id;
  //console.log(typeof(selectedID2));

  try {
    const upload = await Upload.findByIdAndUpdate(
      { _id: selectedID },
      {
        $pull: {
          sharedTo: { _id: selectedID2 }
        }
      },
      { new: true, useFindAndModify: false }
    );
    res.redirect(`/share/${selectedID}`)
  }
  catch (error) {
    console.log(error);
  }

})

router.post('/:id', async (req, res) => {
  const token = req.cookies.jwt;
  let decodedToken = jwt.decode(token);
  let selectedId = req.params.id;
  console.log(req.body);

  try {
    const upload = await Upload.findByIdAndUpdate(
      { _id: selectedId },
      {
        $push: {
          sharedTo: {
            uploaderID: decodedToken.id,
            uploaderEmail: decodedToken.email,
            receiverName: req.body.receiver,
            fileName: req.body.myfile,
            fileDescription: req.body.myLabel
          }
        }
      },
      { new: true, useFindAndModify: true }
    );
    res.redirect(`/share/${selectedId}`);
  }
  catch (error) {
    console.log(error);
  }

})

module.exports = router;
