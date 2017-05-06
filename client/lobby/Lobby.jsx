var React = require('react');
var {connect} = require('react-redux');

import io from 'socket.io-client';
const socket = io('', { path: '/lobby' });

import ProposalContainer from 'ProposalContainer';
import ReceiveProposalContainer from 'ReceiveProposalContainer';

var Lobby = React.createClass({

  getInitialState: function() {
    return { users: [], proposing: false,
             receivingPropsal: false, socketChallenger: null,
              resolution: '' };
  },

  componentDidMount: function() {
    socket.on(`recv new users`, users => {
        this.setState( {users: users.filter((usr)=>usr._id!==this.props.user._id)} );
      }
    );
    socket.on('recv challenge', ({challenger, resolution}) => {
      this.setState( {receivingProposal: true, socketChallenger: challenger,
                      resolution } );
    });
    socket.emit('new user', Object.assign({}, this.props.user, {socketid: socket.id}));
    socket.emit('get users');
  },

  componentWillUnmount: function() {
    socket.emit('remove user', this.props.user);
    socket.removeListener('recv new users');
    //stops further calls to this.setState() callback for socket.on('recv new users')
    //that keep going on after component unmounts...
    //currently no way to have socket match lifecycle of react component..
    socket.removeListener('recv challenge');
    //TODO: have 'recv challenge' also be removed for when user is
    //      in receivingProposal state
  },

  handleSelectUser: function(user) {
    this.setState({ proposing: true, socketChallengee: user });
  },

  handleCloseProposal: function() {
    this.setState({ proposing: false });
  },
  handleCloseReceiveProposal: function() {
    this.setState({ receivingProposal: false });
  },

  render: function() {
    var thisRef = this;
    var userList = this.state.users.map(function(user, index) {
                      return (<li onClick={ ()=>thisRef.handleSelectUser(user) }
                                  key={index}>{user.username}</li>
                                );
                    });
    const user = Object.assign({}, this.props.user, {socketid: socket.id});
    const { state: {proposing, receivingProposal, resolution,
                    socketChallengee, socketChallenger} } = this;
    return (
      <div>
        <h2>Lobby</h2>
        <ul>
          {userList}
        </ul>
        {proposing && <ProposalContainer socket={socket}
            challengee={socketChallengee} challenger={user}
             onClose={this.handleCloseProposal} />}

        {receivingProposal && <ReceiveProposalContainer socket={socket}
           challenger={socketChallenger} challengee={user} resolution={resolution}
           onClose={this.handleCloseReceiveProposal} />
        }
      </div>
    );
  }
});


export default connect((state) => {
  return {
    user: state.user,
  };
})(Lobby);
