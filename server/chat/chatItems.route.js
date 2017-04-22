var {ChatItem} = require('./chatItem.model.js');

module.exports = (router) => {

  router.get('/chat_items', (req, res) => {

    ChatItem.find(req.query).populate('_user')
      .then((items) => {
        console.log(items);
        res.send({items});
      })
      .catch((e) => res.status(500).send(e));
  });

  router.post('/chat_items', (req, res) => {
    var chatItem = new ChatItem(req.body);
    chatItem.save()
      .then((doc) => {
        res.send({doc});
      })
      .catch((e) => res.status(500).send(e));
  });
};
