var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import AccountInterface from 'AccountInterface';
import Main from 'Main';
import Login from 'Login';
import Register from 'Register';
import Lobby from 'Lobby';
import ChatContainer from 'ChatContainer';

var store = require('configureStore').configure();

store.subscribe(() => {
  var state = store.getState();
  console.log('New state', state);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={Main}>
        <IndexRoute component={Login} />
        <Route path="register" component={Register} />
        <Route path="login" component={Login} />
        <Route component={AccountInterface}>
          <Route path="lobby" component={Lobby} />
          <Route path="debate" component={ChatContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
