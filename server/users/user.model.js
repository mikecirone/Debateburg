const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const validator = require('validator');

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true,
      index: {
        unique: true,
        dropDups: true,
      },
      validate: {
        validator: validator.isEmail, //validation fx
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minLength: 8
    }
  }
);

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();
  return token;
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

var User = mongoose.model('User', UserSchema);

module.exports = {User};
