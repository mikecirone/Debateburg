const mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  resolution: String,
  createdAt: String,
  finishedAt: Number,    //for showing time that debate finished
  sides: Object,    //pro and con for user ids
  id: { type:String, unique: true }
});

var Channel = mongoose.model('Channel', channelSchema);
module.exports = {Channel};
