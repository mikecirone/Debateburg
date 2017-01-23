const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// Use native promises
mongoose.Promise = global.Promise;

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
      minLength: 6
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

var User = mongoose.model('User', UserSchema);

module.exports = {User};
