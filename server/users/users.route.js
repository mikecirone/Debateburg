const express = require('express');
const _ = require('lodash');

var {User} = require('./user.model.js');

module.exports = (server, ioServer) => {
  server.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'username', 'password']);
    var user = new User(body);

    user.save().then((/*|user|*/) => {
      // res.send(user);   // |user| in callback param and above are same in memory!
      return user.generateAuthToken(); //async call, then...
    }).then((token) => {               //can call then() upon return obj of first then()
      res.header('x-auth', token).send(user);
    })
    .catch( (e)=>res.status(400).send(e) );
  });

  server.post('/users/login', (req, res) => {

    User.findByCredentials(req.body.usernameOrEmail, req.body.password).then((user) => {
      return user.generateAuthToken().then((token) => {
        res.header('x-auth', token).send(user);
      });
    }).catch((e) => {
      res.status(400).send();
    });
  });

  server.post('/users/logout', (req, res) => {
    ioServer.to('lobby').emit('recv new item', {name: "shaka"});
    res.send();
  });
};
