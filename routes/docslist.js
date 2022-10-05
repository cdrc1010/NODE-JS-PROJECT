var express = require('express');
var router = express.Router();

//For Upload
var formidable = require("formidable");
var fs = require("fs");
const Upload = require('../model/Uploads');

const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const jwt = require('jsonwebtoken');

//GET
router.get('/', checkUser, requireAuth, (req, res) => {
    Upload.find({}, (err, uploads) => {
        res.render('docslist', {
            uploadList: uploads
        })
    })

});



//DELETE
router.get('/:id', async (req, res) => {
    let selectedID = req.params.id;
    console.log(req.params.id);

    const response = await Upload.findByIdAndDelete(selectedID).then(async (upload) => {
        var uploadFolder = __dirname + "/uploads/" + upload.fileName;
        console.log(upload.fileName)
        fs.unlink(uploadFolder, (err) => {
            if (err) throw err;
            res.redirect('/docslist');
        })
    })

})

//DOWNLOAD
router.get('/download/:id', (req, res) => {
    let selectedID = req.params.id;
    Upload.findById(selectedID).then(async (upload, err) => {
        if (err) throw err;
        var uploadFolder = __dirname + "/uploads/" + upload.fileName;
        res.download(uploadFolder);
    })
})

//Edit
router.put('/:id', async (req, res) => {
    let selectedID = req.params.id;
    const response = await Upload.findByIdAndUpdate(selectedID, {
        $set: {
            fileDescription: req.body.fileDescription

        }, upsert: true
    })
})





//Create
router.post('/', (req, res) => {
    const token = req.cookies.jwt;
    let decodedToken = jwt.decode(token);
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var oldpath = files.filetoupload.filepath;
        var newpath = __dirname + "/uploads/" + files.filetoupload.originalFilename;
        fs.readFile(oldpath, function (err, data) { // 2nd approach
            if (err) throw err;
            console.log('file read');

            //                uploaderEmail:decodedToken.email,
            Upload.create({
                fileDescription: fields.fileDescription,
                fileName: files.filetoupload.originalFilename,
                uploaderID: decodedToken.id
            })
            // write into the file 
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                // res.write(__dirname); for checking purposes
                res.redirect('/docslist')
            }) //writefile end code


        }) //readfile end code

    })//form.parse end code
});
module.exports = router;
