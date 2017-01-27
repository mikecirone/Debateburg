import React, { PropTypes } from 'react';

var ChatMsg = React.createClass({
  propTypes: {
    message: PropTypes.object.isRequired
  },
  render: function() {
    return(
      <li>
        {this.props.message.text}
      </li>
    );
  }
});

export default ChatMsg;
