import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import uuid from 'node-uuid';
import jQuery from 'jQuery';

import ChatMsgMaker from 'ChatMsgMaker';

var ChatMsgMakerContainer = React.createClass({

  propTypes: {
    socket: PropTypes.object.isRequired
  },

  render: function() {
    const {handleSubmit} = this.props;
    return (
      <ChatMsgMaker onSubmit={handleSubmit} />
    );
  }
});

const mapStateToProps = function(state) {
  return {

  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    handleSubmit: function(event) {
      var msg = {
        id: `${Date.now()}${uuid.v4()}`,
        text: jQuery('#chat-input').val(),
        // text: "foo",
        channelID: "debatehall1"
      };
      props.socket.emit('new message', msg);
    }
  };
};

export default connect(null, mapDispatchToProps)(ChatMsgMakerContainer);

// export default ChatMsgMakerContainer;
