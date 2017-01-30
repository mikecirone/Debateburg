var {Channel} = require('./../models/channel.model');

module.exports = (router) => {

  router.get('/channels', (req, res) => {
    Channel.find({})
      .then((channels) => {
        res.send({channels});
      })
      .catch((e) => res.status(500).send(e));
  });

  router.post('/channels', (req, res) => {
    var channel = new Channel(req.body);
    channel.save()
      .then((doc) => {
        res.send({doc});
      })
      .catch((e) => res.status(500).send(e));
  });
};
