var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import Main from 'Main';
import Login from 'Login';
import RegisterContainer from 'RegisterContainer';
import Home from 'Home';
import ChatContainer from 'ChatContainer';
import ChatMsgMakerContainer from 'ChatMsgMakerContainer';

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
        <Route path="register" component={RegisterContainer} />
        <Route path="home" component={Home} />
        <Route path="chat" component={ChatContainer} />
        <Route path="chatmsg_maker" component={ChatMsgMakerContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
