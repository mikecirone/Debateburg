var { createStore, combineReducers, applyMiddleware, compose } = require('redux');
var thunk = require('redux-thunk').default;
import loginReducer from 'loginReducer';
import registerReducer from 'registerReducer';
import errorReducer from 'errorReducer';
import { reducer as formReducer } from 'redux-form';
import ItemsReducer from 'ItemsReducer';

var chatReducer = new ItemsReducer('chat');
var channelsReducer = new ItemsReducer('channels');

export var configure = (initialState = {}) => {
  var reducer = combineReducers({
    login: loginReducer,
    register: registerReducer,
    error: errorReducer,
    form: formReducer,
    chat: chatReducer.reducer,
    channels: channelsReducer.reducer
  });

  var store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),  //note: must go before line below
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
