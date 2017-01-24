const {MongoClient, ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Game} = require('./../../models/game.model');
const {User} = require('./../../models/user.model');

const userOneId = new ObjectID();
const game = {
  characters: [
    {name: "Mary", health: 10, _id: new ObjectID().toString()},
    {name: "Rob", health: 10, _id: new ObjectID().toString()},
    {name: "Jen", health: 10, _id: new ObjectID().toString()},
    {name: "Mike", health: 10, _id: new ObjectID().toString()}
  ],
  _creator: userOneId,
  _id: new ObjectID().toString()
};

const user = {
  _id: userOneId,
  email: 'mike@bar.com',
  password: 'userOnePass'
};
const userToken = jwt.sign({_id: userOneId.toHexString()}, process.env.JWT_SECRET).toString();

MongoClient.connect('mongodb://localhost:27017/GameAppTest', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
});

const populateGamesAndUsers = (done) => {
  User.remove({}).then(() => {
    return new User(user).save();
  }).then(() => {
    return Game.remove({}).then(() => {
      return new Game(game).save();
    });
  }).then(() => done());
};

module.exports = {game, populateGamesAndUsers, userToken};
