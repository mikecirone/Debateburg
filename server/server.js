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


const chatItemsRouter = express.Router();
const usersRouter = express.Router();
const channelsRouter = express.Router();
require('./routes/chatItems.route')(chatItemsRouter);
require('./routes/channels.route')(channelsRouter);
require('./routes/users.route')(usersRouter);
app.use(chatItemsRouter);
app.use(usersRouter);
app.use(channelsRouter);


const server = app.listen(port, () => {
  console.log(`Started on port ${port}.`);
});


const {hookupChatEvents, hookupChannelEvents} = require('./socketEvents');

const chatIo = new SocketIo(server, {path: '/chat'})
hookupChatEvents(chatIo);

const channelsIo = new SocketIo(server, {path: '/channels'})
hookupChannelEvents(channelsIo);


module.exports = {app};
