const express = require('express');

var {Channel} = require('./channel.model.js');

var channelsRouter = express.Router();

channelsRouter.get('/channels_items', (req, res) => {
  Channel.find({})
    .then((items) => {
      res.send({items});
    })
    .catch((e) => res.status(500).send(e));
});

channelsRouter.post('/channels_items', (req, res) => {
  var channel = new Channel(req.body);
  channel.save()
    .then((doc) => {
      res.send({doc});
    })
    .catch((e) => res.status(500).send(e));
});

module.exports = {channelsRouter};
