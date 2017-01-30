const mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  channelID: String,
  text: String,
  user: Object,
  time: String,
  id: String
});

var Message = mongoose.model('Message', messageSchema);

module.exports = {Message};
