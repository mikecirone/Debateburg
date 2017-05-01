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
    socket.on(`recv new users`, users => {
        console.log(users);
        this.setState( {users: users.filter((usr)=>usr._id!==this.props.user._id)} );
      }
    );
    socket.emit('new user', this.props.user);
  },

  componentWillUnmount: function() {
    socket.emit('remove user', this.props.user);
  },

  render: function() {
    var userList = this.state.users.map(function(user) {
                      return <li key={user.username}>{user.username}</li>;
                    });
    return (
      <div>
        <h2>Lobby</h2>
        <ul>
          {userList}
        </ul>
      </div>
    );
  }
});


export default connect((state) => {
  return {
    user: state.user,
    // users: state.lobby.users
  };
})(Lobby);
