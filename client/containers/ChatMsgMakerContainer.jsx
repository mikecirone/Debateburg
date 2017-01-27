import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import jQuery from 'jQuery';

import ChatMsgMaker from 'ChatMsgMaker';
import {changeChatInput, submitChatInput} from 'chatActions';

var ChatMsgMakerContainer = React.createClass({

  propTypes: {
    socket: PropTypes.object.isRequired
  },

  render: function() {
    const {handleSubmit, handleChange, value} = this.props;
    return (
      <ChatMsgMaker value={value} onSubmit={handleSubmit} onChange={handleChange} />
    );
  }
});

const mapStateToProps = function(state) {
  return {
    value: state.chat.msgMaker.text
  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    handleSubmit: function(event) {
      //note: having presentational component have '#chat-input' coupling
      //      was path of least resistance for separating fxality,
      //      while also achieving fxality
      dispatch(submitChatInput(jQuery('#chat-input').val(), props.socket));
    },
    handleChange: function(event) {
      dispatch(changeChatInput(event.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMsgMakerContainer);
