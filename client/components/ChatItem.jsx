import React, { PropTypes } from 'react';

var ChatItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  render: function() {
    return(
      <li>
        {this.props.item.text}
      </li>
    );
  }
});

export default ChatItem;
