var React = require('react');
var {connect} = require('react-redux');

import io from 'socket.io-client';
const socket = io('', { path: '/lobby' });

import {receiveNewUser} from 'lobbyActions';

var Lobby = React.createClass({

  getInitialState: function() {
    return { users: [] };
  },

  componentDidMount: function() {
    const { dispatch } = this.props;
    socket.on(`recv new user`, user => {
        var newUsers = this.state.users;
        newUsers.push(user);
        this.setState({users: newUsers});
        dispatch(receiveNewUser(user));
      }
    );
    socket.emit('new user', {username: this.props.username});
  },

  render: function() {
    var userList = this.state.users.map(function(user) {
                      return <li key={user.username}>{user.username}</li>;
                    });
    return (
      <ul>
        {userList}
      </ul>
    );
  }
});


export default connect((state) => {
  return {
    username: state.user.username,
    users: state.lobby.users
  };
})(Lobby);
