var React = require('react');
var {connect} = require('react-redux');

import io from 'socket.io-client';
const socket = io('', { path: '/lobby' });

var Lobby = React.createClass({

  getInitialState: function() {
    return { users: [] };
  },

  componentDidMount: function() {
    socket.on(`recv new users`, users => {
        this.setState( {users: users.filter((usr)=>usr._id!==this.props.user._id)} );
      }
    );
    socket.emit('new user', this.props.user);
    socket.emit('get users');
  },

  componentWillUnmount: function() {
    socket.emit('remove user', this.props.user);
    socket.removeListener('recv new users');
    //stops further calls to this.setState() callback for socket.on('recv new users')
    //that keep going on after component unmounts...
    //currently no way to have socket match lifecycle of react component..
  },

  render: function() {
    var userList = this.state.users.map(function(user, index) {
                      return <li key={index}>{user.username}</li>;
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
  };
})(Lobby);
