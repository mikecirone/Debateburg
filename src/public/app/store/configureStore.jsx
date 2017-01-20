var { createStore, combineReducers, applyMiddleware, compose } = require('redux');
var thunk = require('redux-thunk').default;
var {templateReducer, loginReducer, registerReducer} = require('reducers');

export var configure = (initialState = {}) => {
  var reducer = combineReducers({
    templateData: templateReducer,
    login: loginReducer,
    register: registerReducer
  });

  var store = createStore(reducer, initialState, compose(
    applyMiddleware(thunk),  //note: must go before line below
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
