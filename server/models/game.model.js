const mongoose = require('mongoose');

//Decided not to make a Character schema,
//keeping things de-normalized makes sense as each game
//and character changes are unique

var GameSchema = new mongoose.Schema(
  {
    characters: [{
      name: {
        type: String,
        required: true
      },
      health: {
        type: Number,
        required: true
      }
    }],
    _creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
    }
  }
);

var Game = mongoose.model('Game', GameSchema);

module.exports = {Game};
