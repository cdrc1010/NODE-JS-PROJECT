const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  fileDescription: {
    type: String,
    required: [true, 'File Required']
  },
  fileName: {
    type: String,
    required: [true, 'File is Required'],
  },
  uploaderID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  sharedTo: [{
    uploaderID: {
      type: String,
      required: true
    },
    uploaderEmail: {
      type: String
    },
    fileName: {
      type: String
    },
    fileDescription: {
      type: String
    },
    receiverName: {
      type: String
    }
  }]
});

const Upload = mongoose.model("uploads", uploadSchema);
module.exports = Upload;
