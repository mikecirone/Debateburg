require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user.model');
var {Game} = require('./models/game.model');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //converts sent JSON to JS obj literal


app.use(express.static('client/public'));


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


app.post('/games', authenticate, (req, res) => {

  var game = new Game({
    characters: req.body.characters,
    _creator: req.user._id
  });

  game.save().then(() => {
    res.send(game);
  })
  .catch( (e)=>res.status(500).send(e) );
});

//future TODO: maybe have GET /games get all games user is participating in

//service: allows user to get game data for game they left / no longer have session for
app.get('/games/:id', authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send();
  }

  Game.findOne({
    _id: id
  }).then((game) => {
    if(!game)
      return res.status(404).send();  //game/page not found, a.k.a. 404 error
    res.send({game});
  });
});

//TODO: add authentication
app.post('/games/:gameId/character/:charId/:move', (req, res) => {
  var gameId = req.params.gameId;
  var charId = req.params.charId;
  var moveStr = req.params.move;

  if (!ObjectID.isValid(gameId) || !ObjectID.isValid(charId)) {
    return res.status(400).send();
  }

  Game.findOne({
    _id: gameId
  }).then((game) => {   //mongoose query - returns then()-only promise
    if(!game)
      return res.status(404).send();

    var move = parseInt(moveStr);
    if(move > 2) move = 2;
    if(move < -2) move = -2;

    //TODO: use mongoose's builtin method for doing below fxality, for clarity/DRY
    var newChars = game.characters.map((char) => {
      if(char._id == charId) {
        char.health = char.health + parseInt(move);
        return char;
      }
      return char;
    });
    game.characters = newChars;

    game.save().then(() => {
      return res.send(game);
    })
    .catch( (e) => res.status(500).send() );

  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

module.exports = {app};
