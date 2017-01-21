const {ObjectID} = require('mongodb');

const {User} = require('./../../models/user');

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
