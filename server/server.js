require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
//TODO: try to remove ObjectID
const {ObjectID} = require('mongodb');
const SocketIo = require('socket.io');

var {authenticate} = require('./users/authenticate');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //converts sent JSON to JS obj literal


app.use(express.static('client/public'));


const chatItemsRouter = express.Router();
const usersRouter = express.Router();
const channelsRouter = express.Router();
require('./chat/chatItems.route.js')(chatItemsRouter);
require('./channels/channels.route.js')(channelsRouter);
require('./users/users.route.js')(usersRouter);
app.use(chatItemsRouter);
app.use(usersRouter);
app.use(channelsRouter);


const server = app.listen(port);


const {hookupChatEvents} = require('./chat/chat.socketEvents');
const {hookupChannelEvents} = require('./channels/channel.socketEvents');

const chatIo = new SocketIo(server, {path: '/chat'})
hookupChatEvents(chatIo);

const channelsIo = new SocketIo(server, {path: '/channels'})
hookupChannelEvents(channelsIo);


module.exports = {app};
