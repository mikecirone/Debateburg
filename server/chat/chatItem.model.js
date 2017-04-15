const mongoose = require('mongoose');

var chatItemSchema = mongoose.Schema({
  channelID: String,
  text: String,
  user: Object,
  time: String,
  id: String
});

var ChatItem = mongoose.model('ChatItem', chatItemSchema);

module.exports = {ChatItem};
