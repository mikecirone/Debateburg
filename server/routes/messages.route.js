var {Message} = require('./../models/message.model');

module.exports = (router) => {

  router.get('/chat_items', (req, res) => {
    Message.find({})
      .then((items) => {
        res.send({items});
      })
      .catch((e) => res.status(500).send(e));
  });

  router.post('/chat_items', (req, res) => {
    var message = new Message(req.body);
    message.save()
      .then((doc) => {
        res.send({doc});
      })
      .catch((e) => res.status(500).send(e));
  });
};
