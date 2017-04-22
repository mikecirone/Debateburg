import React, { PropTypes } from 'react';

var ChatItem = React.createClass({
  propTypes: {
    item: PropTypes.object.isRequired
  },
  render: function() {

    var username = (this.props.item.username) ? this.props.item.username : //real-time chat messages
                                          this.props.item._user.username;  //chat messages retrieved from db

    return(
      <li>
        <strong>{username}</strong> {this.props.item.text}
      </li>
    );
  }
});

export default ChatItem;
