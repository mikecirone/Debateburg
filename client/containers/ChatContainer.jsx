var React = require('react');

import ChatLogContainer2 from 'ChatLogContainer2';
import ChatMsgMakerContainer from 'ChatMsgMakerContainer';

import io from 'socket.io-client';
const socket = io('', { path: '/chat' });

var ChatContainer = React.createClass({
  render: function() {
    return (
      <div>
        <ChatLogContainer2 socket={socket} />
        <ChatMsgMakerContainer socket={socket} />
      </div>
    );
  }
});

export default ChatContainer;
