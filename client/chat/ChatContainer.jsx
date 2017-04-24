var React = require('react');
import io from 'socket.io-client';
var {connect} = require('react-redux');

import ChatLogContainer from 'ChatLogContainer';
import ChatItemMakerContainer from 'ChatItemMakerContainer';
import Countdown from 'Countdown';

const socket = io('', { path: '/chat' });
var ChatContainer = React.createClass({

  componentDidMount: function() {
    socket.emit('join channel', this.props.activeChannel.id);
  },
  componentDidUnMount: function() {
    socket.emit('leave channel', this.props.activeChannel.id);
  },
  render: function() {
    const activeChannelId = this.props.activeChannel.id;
    const activeChannelName = this.props.activeChannel.name;
    return (
      <div>
        <Countdown seconds={15} start={true} />
        <h4>Channel - {activeChannelName}</h4>
        <ChatLogContainer socket={socket} activeChannelId={activeChannelId} />
        <ChatItemMakerContainer socket={socket} activeChannelId={activeChannelId} />
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
