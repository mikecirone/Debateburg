var {Message} = require('./../models/message.model');

module.exports = (router) => {

  router.get('/messages', (req, res) => {
    Message.find({})
      .then((messages) => {
        res.send({messages});
      })
      .catch((e) => res.status(500).send(e));
  });

  router.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save()
      .then((doc) => {
        res.send({doc});
      })
      .catch((e) => res.status(500).send(e));
  });
};
