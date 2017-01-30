import React, { PropTypes } from 'react';

import ChatMsg from 'ChatMsg';

var ChatLog = React.createClass({

  propTypes: {
    messages: PropTypes.array.isRequired
  },

  render: function() {
    const {messages} = this.props;

    return (
      <div id="chat-log">
        <ul>
          {messages.map(message =>
            <ChatMsg message={message} key={message.id} />
          )}
        </ul>
      </div>
    );
  }
});

export default ChatLog;
