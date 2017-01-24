const {MongoClient, ObjectID} = require('mongodb');

const {User} = require('./../../models/user.model');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'mike@example.com',
  password: 'userOnePass'
}, {
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass'
}];

MongoClient.connect('mongodb://localhost:27017/GameAppTest', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  //following same process needed to enforce unique email in real testing
  db.collection('users').remove({});
  db.collection('users').createIndex({email: 1}, {unique: true});
});

const populateUsers = (done) => {
  User.remove({}).then(() => {

    var user1 = new User(users[0]).save();
    var user2 = new User(users[1]).save();
    //note: the middleware that does pwd hashing will operate

    //is like then() but for multiple then()-capable fxs in same code block
    return Promise.all([user1, user2])
  }).then(()=> done());
}

module.exports = {users, populateUsers};
