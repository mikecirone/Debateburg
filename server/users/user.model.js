const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');

// Getting unique email and username to work on MongoDB:
// -------------------------------------------------------------
// http://stackoverflow.com/questions/5535610/mongoose-unique-index-not-working
// 1) remove all docs from collection
//      - db.users.remove({})
// 2) From the mongo shell, execute the command:  db.users.createIndex({email: 1}, {unique: true})

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      minLength: 8
    }
  }
);

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();
  return new Promise((resolve, reject) => {
    resolve(token);
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) {
    //bcrypt keeps track of its own salts, so this is diff
    //than process.env.JWT_SECRET used for generating auth token
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user)
      return Promise.reject(); //will be caught be calling fx

    //bcrypt no work with promises, so must wrap Promise around bcrypt fx
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, result) => {
        if(result) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};
