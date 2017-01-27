var React = require('react');

import ChatLogContainer from 'ChatLogContainer';
import ChatMsgMakerContainer from 'ChatMsgMakerContainer';

import io from 'socket.io-client';
const socket = io('', { path: '/api/chat' });

var ChatContainer = React.createClass({
  render: function() {
    return (
      <div>
        <ChatLogContainer socket={socket} />
        <ChatMsgMakerContainer socket={socket} />
      </div>
    );
  }
});

export default ChatContainer;
