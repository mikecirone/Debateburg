import React, { PropTypes } from 'react';

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
            <ChatMessage message={message} />
          )}
        </ul>
      </div>
    );
  }
});

export default ChatLog;
