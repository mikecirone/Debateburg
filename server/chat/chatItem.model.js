const mongoose = require('mongoose');
const {Schema} = require('mongoose');

var {User} = require('./../users/user.model.js');

var ChatItemSchema = mongoose.Schema({
  channelID: String,
  text: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  time: String,
  id: String
});

var ChatItem = mongoose.model('ChatItem', ChatItemSchema);

module.exports = {ChatItem};
