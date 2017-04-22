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

ChatItemSchema.statics.findAndDenormalizeUser = ( filter ) => {
  ChatItem.find(filter).lean()  //lean() changes items to js pojo
    .then((items) => {
      items.forEach((item) => {
        User.findOne({_id: item.user_id}).then((user) => {
          item.username = user.username;
        })
      });
      return items;
    });
};

var ChatItem = mongoose.model('ChatItem', ChatItemSchema);

module.exports = {ChatItem};
