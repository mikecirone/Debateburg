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

const {channelsRouter} = require('./channels/channels.route.js');
app.use(channelsRouter);

const {chatItemsRouter} = require('./chat/chatItems.route.js');
app.use(chatItemsRouter);


const server = app.listen(port);


const {hookupChatEvents} = require('./chat/chat.socketEvents');
const {hookupChannelEvents} = require('./channels/channel.socketEvents');

const chatIo = new SocketIo(server, {path: '/chat'})
hookupChatEvents(chatIo);

const channelsIo = new SocketIo(server, {path: '/channels'})
hookupChannelEvents(channelsIo);


require('./users/users.route.js')(app, channelsIo);
//note: needing to hook up users route a diff way because ioServer
//      and express server do not play nice with each other


module.exports = {app};
