var React = require('react');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import createItemMakerContainer from 'createItemMakerContainer';
import createItemLogContainer from 'createItemLogContainer';
import ChatItem from 'ChatItem';

var chatStr = 'chat';

var ChatLogContainer = createItemLogContainer(chatStr, ChatItem);

var ChatItemMakerContainer = createItemMakerContainer(chatStr, () => {
  return {
    text: jQuery(`#${chatStr}-input`).val(),
    channelID: "debatehall1",
    user: 'mike',
    time: moment.utc().format('lll'),
    id: `${Date.now()}${uuid.v4()}`
  };
});

import io from 'socket.io-client';
const socket = io('', { path: '/chat' });

var ChatContainer = React.createClass({
  render: function() {
    return (
      <div>
        <ChatLogContainer socket={socket} />
        <ChatItemMakerContainer socket={socket} />
      </div>
    );
  }
});

export default ChatContainer;
