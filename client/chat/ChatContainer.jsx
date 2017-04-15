var React = require('react');
import io from 'socket.io-client';
var {connect} = require('react-redux');

import ChatLogContainer from 'ChatLogContainer';
import ChatItemMakerContainer from 'ChatItemMakerContainer';

const socket = io('', { path: '/chat' });
var ChatContainer = React.createClass({

  componentDidMount: function() {
    socket.emit('join channel', this.props.activeChannel);
  },
  componentDidUnMount: function() {
    socket.emit('leave channel', this.props.activeChannel);
  },
  render: function() {
    const {activeChannel} = this.props;
    return (
      <div>
        <ChatLogContainer socket={socket} activeChannel={activeChannel} />
        <ChatItemMakerContainer socket={socket} activeChannel={activeChannel} />
      </div>
    );
  }
});

export default connect((state) => {
  return {
    activeChannel: state.activeChannel
  };
}
)(ChatContainer);
