require('./config/config');

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

// Use native promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minLength: 1,
      trim: true,
      unique: true,
      validate: {
        validator: validator.isEmail, //validation fx
        message: '{VALUE} is not a valid email'
      }
    },
    password: {
      type: String,
      require: true,
      minLength: 6
      //TODO: minLength doesn't seem to be working
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  }
);

//override
UserSchema.methods.toJSON = function() {
//is called during express's send(user) fx
  var user = this;
  var userObject = user.toObject();

//lets make sure we don't return back the password!
  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.pre('save', function (next) {
  var user = this;

  if(user.isModified('password')) {
  //happens first time user is being saved;
  //goes something like user.password is first null, then password string

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
  //dealing with subsequent operations where password is encrypted hash,
  //before and after, so no modification
    next();
  }
});

var User = mongoose.model('User', UserSchema);

//client example:
//------------------------------------------------------
var newUser = new User({
  email: 'mark43@bar.com',
  password: '123456'
});

console.log('bar');

newUser.save().then((doc) => {
  console.log(JSON.stringify(doc, undefined, 2));
  console.log('fox');
}, (e)=> {
  console.log(e);
  console.log('foo');
});


// var mongoose = require('mongoose');
//
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');
//
// var Todo = mongoose.model('Todo', {
//   text: {
//     type: String
//   },
//   completed: {
//     type: Boolean
//   },
//   completedAt: {
//     type: Number
//   }
// });
//
//
// var otherTodo = new Todo({
//   text: 'Feed the dog',
//   completed: true,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
