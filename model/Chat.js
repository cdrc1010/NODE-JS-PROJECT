const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String
    },
    message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  } 
});

const Chat = mongoose.model("chats", chatSchema);
module.exports = Chat;
