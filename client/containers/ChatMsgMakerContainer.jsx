import React, { PropTypes } from 'react';
var {connect} = require('react-redux');
import jQuery from 'jQuery';
import moment from 'moment';
import uuid from 'node-uuid';

import ChatMsgMaker from 'ChatMsgMaker';
import {changeChatInput, submitChatInput} from 'chatActions';
import ItemsActions from 'ItemsActions';

var chatActions = new ItemsActions('chat');

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
    // value: state.chat.msgMaker.text
    value: state.chat2.itemMaker.text
  };
};

const mapDispatchToProps = function(dispatch, props) {
  return {
    handleSubmit: function(event) {
      //note: having presentational component have '#chat-input' coupling
      //      was path of least resistance for separating fxality,
      //      while also achieving fxality
      dispatch(chatActions.submitItemInput({
                                text: jQuery('#chat-input').val(),
                                channelID: "debatehall1",
                                user: 'mike',
                                time: moment.utc().format('lll'),
                                id: `${Date.now()}${uuid.v4()}`
                              }, props.socket)
      );
    },
    handleChange: function(event) {
      dispatch(chatActions.changeItemInput(event.target.value));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatMsgMakerContainer);
