require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
//TODO: try to remove ObjectID
const {ObjectID} = require('mongodb');
const SocketIo = require('socket.io');

//TODO: try to remove mongoose
var {mongoose} = require('./db/mongoose');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //converts sent JSON to JS obj literal


app.use(express.static('client/public'));


const messagesRouter = express.Router();
const usersRouter = express.Router();
const channelsRouter = express.Router();
require('./routes/messages.route')(messagesRouter);
require('./routes/channels.route')(channelsRouter);
require('./routes/users.route')(usersRouter);
app.use(messagesRouter);
app.use(usersRouter);
app.use(channelsRouter);


const server = app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});

const io = new SocketIo(server, {path: '/chat'})
const socketEvents = require('./socketEvents')(io);

module.exports = {app};
