const mongoose = require('mongoose');

var channelSchema = mongoose.Schema({
  name: { type:String, unique: true },
  createdAt: Number,
  finishedAt: Number,    //for showing time that debate finished
  id: String
});

var Channel = mongoose.model('Channel', channelSchema);
module.exports = {Channel};
