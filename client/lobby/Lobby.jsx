var React = require('react');
var {connect} = require('react-redux');

import io from 'socket.io-client';
const socket = io('', { path: '/lobby' });

import ProposalContainer from 'ProposalContainer';

var Lobby = React.createClass({

  getInitialState: function() {
    return { users: [] };
  },

  componentDidMount: function() {
    socket.on(`recv new users`, users => {
        this.setState( {users: users.filter((usr)=>usr._id!==this.props.user._id)} );
      }
    );
    socket.emit('new user', Object.assign({}, this.props.user, {socketid: socket.id}));
    socket.emit('get users');
  },

  componentWillUnmount: function() {
    socket.emit('remove user', this.props.user);
    socket.removeListener('recv new users');
    //stops further calls to this.setState() callback for socket.on('recv new users')
    //that keep going on after component unmounts...
    //currently no way to have socket match lifecycle of react component..
  },

  handleSelectUser: function(user) {
    this.setState({ proposing: true, challengee: user });
  },

  render: function() {
    const challenger = Object.assign({}, this.props.user, {socketid: socket.id});
    var thisRef = this;
    var userList = this.state.users.map(function(user, index) {
                      return (<li onClick={ ()=>thisRef.handleSelectUser(user) }
                                  key={index}>{user.username}</li>
                                );
                    });
    return (
      <div>
        <h2>Lobby</h2>
        <ul>
          {userList}
        </ul>
        {this.state.proposing && <ProposalContainer socket={socket}
            challengee={this.state.challengee} challenger={challenger} />}
      </div>
    );
  }
});


export default connect((state) => {
  return {
    user: state.user,
  };
})(Lobby);
