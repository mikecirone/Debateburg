var React = require('react');
import io from 'socket.io-client';
var {connect} = require('react-redux');

import ChatLogContainer from 'ChatLogContainer';
import ChatItemMakerContainer from 'ChatItemMakerContainer';
import Countdown from 'Countdown';

const socket = io('', { path: '/chat' });
var ChatContainer = React.createClass({

  componentDidMount: function() {
    const {activeChannelId, isDebate} = this.props;
    if(isDebate)
      socket.emit('join channel', activeChannelId);
  },
  componentDidUnMount: function() {
    const {activeChannelId, isDebate} = this.props;
    if(isDebate)
      socket.emit('leave channel', activeChannelId);
  },
  render: function() {
    const { resolution, activeChannelId, isDebate } = this.props;
    return (
      <div>
        {/* <Countdown seconds={15} start={true} /> */}
        <h4>Resolution: {resolution}</h4>
        <ChatLogContainer socket={socket} activeChannelId={activeChannelId} />
        {isDebate && <ChatItemMakerContainer socket={socket}
                                  activeChannelId={activeChannelId} />}
      </div>
    );
  }
});

export default connect((state) => {
  return {
    resolution: state.activeChannel.resolution,
    activeChannelId: state.activeChannel.id,
    isDebate: state.activeChannel.isDebate
  };
}
)(ChatContainer);
