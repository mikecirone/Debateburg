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
          {function() {     //note: have to use 'function' here
              var items = [];
              for(var i=0; i < messages.length; ++i)
                items.push(<ChatMsg message={messages[i]} key={i} />);
              return items;
          }()}
        </ul>
      </div>
    );
  }
});

export default ChatLog;
