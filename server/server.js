require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //converts sent JSON to JS obj literal


app.use(express.static('public'));

app.post('/users', (req, res) => {
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

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = {app};
