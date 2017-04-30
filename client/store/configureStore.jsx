var { createStore, combineReducers, applyMiddleware, compose } = require('redux');
var thunk = require('redux-thunk').default;

import * as actionTypes from 'actionTypes';
import userReducer from 'userReducer';
import lobbyReducer from 'lobbyReducer';
import errorReducer from 'errorReducer';
import activeChannelReducer from 'activeChannelReducer';
import createItemsReducer from 'createItemsReducer';

var chatReducer = createItemsReducer('chat');
var channelsReducer = createItemsReducer('channels');

export var configure = (initialState = {}) => {
  var reducers = combineReducers({
    user: userReducer,
    lobby: lobbyReducer,
    error: errorReducer,
    chat: chatReducer,
    channels: channelsReducer,
    //TODO: combine channels and activeChannel,
    //      hard to do given createItemsReducer structure...
    activeChannel: activeChannelReducer
  });

  var store = createStore(reducers, initialState, compose(
    applyMiddleware(thunk),  //note: must go before line below
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
