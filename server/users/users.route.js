const _ = require('lodash');

var {User} = require('./user.model.js');

module.exports = (router) => {
  router.post('/users', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then((/*|user|*/) => {
      // res.send(user);   // |user| in callback param and above are same in memory!
      return user.generateAuthToken(); //async call, then...
    }).then((token) => {               //can call then() upon return obj of first then()
      res.header('x-auth', token).send(user);
    })
    .catch( (e)=>res.status(400).send(e) );
  });
}
