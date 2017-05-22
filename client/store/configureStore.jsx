var { createStore, combineReducers, applyMiddleware, compose } = require('redux');
var thunk = require('redux-thunk').default;
import io from 'socket.io-client';

import * as actionTypes from 'actionTypes';
import userReducer from 'userReducer';
import activeChannelReducer from 'activeChannelReducer';
import createItemsReducer from 'createItemsReducer';
import debateReducer from 'debateReducer';

var chatReducer = createItemsReducer('chat');
var channelsReducer = createItemsReducer('channels');

export var configure = (initialState = {}) => {
  var reducers = combineReducers({
    user: userReducer,
    chat: chatReducer,
    channels: channelsReducer,
    //TODO: combine channels and activeChannel,
    //      hard to do given createItemsReducer structure...
    activeChannel: activeChannelReducer,
    debate: debateReducer,
    socket: function(socket = null, action) {
      if(!socket)
        return io('', { path: '/lobby' });
      else
        return socket
    }
  });

  var store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk),  //note: must go before line below
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
